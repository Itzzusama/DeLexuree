import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import AuthWrapper from "../../../components/AuthWrapper";
import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";
import CountryPhoneInput from "../../../components/CountryPhoneInput";
import { passwordRegex, phoneRegex, regEmail } from "../../../utils/constants";
import { ToastMessage } from "../../../utils/ToastMessage";
import { get, post } from "../../../Services/ApiRequest";
import DatePicker from "react-native-date-picker";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import { View } from "react-native";
import moment from "moment";
import CustomDropDown from "../../../components/CustomDropDown";
import { useFocusEffect } from "@react-navigation/native";
import Header from "../../../components/Header";
import ImageFast from "../../../components/ImageFast";
import { Images } from "../../../assets/images";
import UploadImage from "../../../components/UploadImage";
import { className } from "../../../global-styles";
import { endPoints } from "../../../Services/ENV";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Signup = ({ navigation }) => {
  const [allCat, setAllCat] = useState([]);
  const init = {
    fName: "",
    email: "",
    phone: "",
    password: "",
  };
  const phoneInput = useRef(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [image, setImage] = useState("");
  const [state, setState] = useState(init);
  const inits = {
    fNameError: "",
    emailError: "",
    phoneError: "",
    passwordError: "",
    categoryError: "",
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchAllCat();
      return () => {};
    }, [])
  );

  const fetchAllCat = async () => {
    try {
      const res = await get("cat/all");
      if (res.data.success) {
        const categories = res?.data?.categories.map((cat) => ({
          label: cat.name,
          value: cat._id,
        }));
        setAllCat(categories); // Store categories with label and value for dropdown
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [errors, setErrors] = useState(inits);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);

  const [birthdate, setBirthdate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const formattedDate = moment(birthdate).format("DD-MM-YYYY");
  const [gender, setGender] = useState("male");
  const array = [
    {
      id: 1,
      placeholder: "Full Name",
      label: "Full Name",
      value: state.fName,
      onChange: (text) => setState({ ...state, fName: text }),
      error: errors.fNameError,
    },
    {
      id: 3,
      placeholder: "Email",
      label: "Email Address",
      value: state.email,
      onChange: (text) => setState({ ...state, email: text }),
      error: errors.emailError,
    },
    { id: 2.1 },
    { id: 2.2 },
    {
      id: 4,
      placeholder: "Phone Number",
      label: "Phone Number",
      value: state.phone,
      onChange: (text) => setState({ ...state, phone: text }),
      error: errors.phoneError,
    },
    {
      id: 5,
      placeholder: "Password",
      label: "Password",
      value: state.password,
      onChange: (text) => setState({ ...state, password: text }),
      error: errors.passwordError,
    },
    { id: 6 },
  ];

  const checkEmail = async () => {
    try {
      const body = {
        email: state.email,
        user_type: "employee",
      };
      const response = await post("users/check-email", body);
      if (!response.data?.success) {
        ToastMessage("Email Already Exists");
        return false;
      }
      return true;
    } catch (error) {
      if (error?.response?.data?.message == "Email already existed") {
        setErrors((prev) => ({ ...prev, emailError: "Email Already Exists" }));
      }

      //ToastMessage("Email Already Exists");
      //ToastMessage(error?.response?.data?.message);
      return false;
    }
  };

  const checkPhone = async () => {
    try {
      const {
        formattedNumber,
      } = phoneInput.current.getNumberAfterPossiblyEliminatingZero();
      const data = {
        phone: formattedNumber,
      };
      const response = await post("users/check-phone", data);
      if (!response.data?.success) {
        ToastMessage("Phone Already Exists");
        return false;
      }
      return true;
    } catch (error) {
      if (error?.response?.data?.message == "Phone already existed") {
        setErrors((prev) => ({ ...prev, phoneError: "Phone Already Exists" }));
      }
      return false;
    }
  };

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const body = {
        email: state?.email,
        user_type: "employee",
      };
      const response = await post("users/send-code", body);
      ToastMessage(response.data?.message);
      console.log(response.data);
      const {
        formattedNumber,
      } = phoneInput.current.getNumberAfterPossiblyEliminatingZero();
      const apiBody = {
        ...state,
        phone: formattedNumber,
      };
      if (response?.data) {
        navigation.navigate("OTPScreen", {
          isAccountCreated: false,
          bodySignUp: apiBody,
          category: category,
          dob: birthdate,
          gender: gender,
          image: image,
        });
      }
    } catch (error) {
      ToastMessage(error.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  const errorCheck = useMemo(() => {
    return () => {
      let newErrors = {};
      if (!state.email) newErrors.emailError = "Please enter Email address";
      else if (!regEmail.test(state.email))
        newErrors.emailError = "Please enter valid email";
      else if (!state.phone) newErrors.phoneError = "Please enter phone number";
      else if (
        phoneInput.current &&
        !phoneInput.current.isValidNumber(state.phone)
      ) {
        newErrors.phoneError = "Enter a valid phone number";
      } else if (!state.password)
        newErrors.passwordError = "Please enter Password";
      else if (!passwordRegex.test(state.password))
        newErrors.passwordError =
          "Password must contain 1 number, 1 special character, Uppercase and 8 digits";
      else if (!category || category.length === 0)
        newErrors.categoryError = "Please select a category";

      setErrors(newErrors);
    };
  }, [state, category]);

  useEffect(() => {
    errorCheck();
  }, [errorCheck]);

  useEffect(() => {
    if (state.email != "") {
      checkEmail();
    }
  }, [state.email]);
  useEffect(() => {
    if (state.phone != "") {
      checkPhone();
    }
  }, [state.phone]);

  const handlePress = async () => {
    setLoading(true);
    const checkEmailRes = await checkEmail();
    const checkPhoneRes = await checkPhone();
    if (!checkEmailRes) {
      ToastMessage("Email already Exist");
      setLoading(false);
      return;
    } else if (!checkPhoneRes) {
      ToastMessage("Phone already Exist");
      setLoading(false);
      return;
    } else {
      handleSendOtp();
    }
  };
  const uploadAndGetUrl = async (file) => {
    setImageLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", {
        uri: file?.path || file?.fileCopyUri || "",
        type: "image/jpeg",
        name: "photo.jpg",
      });
      const res = await axios.post(
        `${endPoints.BASE_URL}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // "x-auth-token": token,
          },
        }
      );
      setImage(res?.data?.image);
      return res?.data?.image;
    } catch (err) {
      ToastMessage("Upload Again");
    } finally {
      setImageLoading(false);
    }
  };
  return (
    <ScreenWrapper
      scrollEnabled
      footerUnScrollable={() => <></>}
      headerUnScrollable={() => <Header hideBackArrow />}
    >
      <AuthWrapper heading="Create Account" desc="signUpDesc" showStatus={true}>
        {imageLoading ? (
          <ActivityIndicator size={"small"} />
        ) : (
          <UploadImage
            handleChange={async (res) => {
              const url = await uploadAndGetUrl(res);
              // setImage(url);
            }}
            renderButton={(res) => (
              <View style={className("align-center justify-center")}>
                <Pressable
                  onPress={res}
                  style={className("align-center justify-center mb-4 ")}
                >
                  <ImageFast
                    source={image ? { uri: image } : Images.sampleProfile}
                    style={{ height: 90, width: 90, borderRadius: 50 }}
                  />
                  <CustomText
                    label={"Choose Profile Picture"}
                    fontSize={14}
                    fontFamily={fonts.semiBold}
                  />
                </Pressable>
              </View>
            )}
          />
        )}
        {array.map((item) =>
          item.id === 4 ? (
            <>
              <CustomText
                label={"Phone Number"}
                marginBottom={5}
                fontSize={14}
                fontFamily={fonts.semiBold}
              />
              <CountryPhoneInput
                phoneInput={phoneInput}
                key={item.id}
                setValue={item.onChange}
                value={item.value}
                error={item.error}
              />
            </>
          ) : item.id === 2.1 ? (
            <View>
              <CustomText
                label={"Date of Birth"}
                marginBottom={5}
                fontSize={14}
                fontFamily={fonts.semiBold}
              />
              <TouchableOpacity
                onPress={() => setOpen(true)}
                style={{
                  justifyContent: "center",
                  height: 55,
                  marginBottom: 18,
                  paddingHorizontal: 15,
                  borderRadius: 4,
                  backgroundColor: COLORS.white,
                  borderWidth: 0.2,
                  borderColor: COLORS.gray,
                }}
              >
                <CustomText
                  label={formattedDate ? formattedDate : " Date Of Birth"}
                  fontSize={14}
                />
              </TouchableOpacity>
              <DatePicker
                modal
                open={open}
                mode="date"
                maximumDate={new Date()}
                date={birthdate}
                onConfirm={(date) => {
                  setOpen(false);
                  setBirthdate(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </View>
          ) : item?.id == 2.2 ? (
            <View style={{ marginBottom: 20 }}>
              <CustomText
                label={"Gender"}
                marginBottom={5}
                fontSize={14}
                fontFamily={fonts.semiBold}
              />
              <CustomDropDown
                placeholder={"Select your Gender"}
                value={gender}
                setValue={setGender}
                options={["male", "female"]}
              />
            </View>
          ) : item?.id == 6 ? (
            <CustomDropDown
              withLabel={"Select a category"}
              options={allCat.map((cat) => cat.label)} // Map labels for displaying in dropdown
              value={category.map(
                (catId) => allCat.find((cat) => cat.value === catId)?.label
              )} // Display selected category names
              setValue={(selectedLabels) => {
                const selectedIds = selectedLabels
                  .map((label) => {
                    const selectedCat = allCat.find(
                      (cat) => cat.label === label
                    );
                    return selectedCat ? selectedCat.value : null;
                  })
                  .filter(Boolean); // Filter out any null or undefined values
                setCategory(selectedIds); // Store the selected category IDs
              }}
              placeholder={"Select a category"}
              error={errors.categoryError}
              multiSelect={true}
            />
          ) : (
            <CustomInput
              key={item?.id}
              placeholder={item.placeholder}
              value={item.value}
              onChangeText={item.onChange}
              error={item.error}
              secureTextEntry={item?.id == 5}
              withLabel={item.label}
              keyboardType={
                item?.id == 4 || item.id == 8 ? "number-pad" : "default"
              }
            />
          )
        )}
        <CustomButton
          title="Continue"
          marginTop={50}
          onPress={handlePress}
          disabled={
            loading || !Object.values(errors).every((error) => error === "")
          }
          loading={loading}
        />
        <CustomText
          label="I already have an account"
          fontSize={16}
          fontFamily={fonts.semiBold}
          alignSelf="center"
          marginTop={20}
          marginBottom={30}
          onPress={() => navigation.navigate("Login")}
        />
      </AuthWrapper>
    </ScreenWrapper>
  );
};

export default Signup;

const styles = StyleSheet.create({});
