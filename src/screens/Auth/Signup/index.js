import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useMemo, useState } from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import AuthWrapper from "../../../components/AuthWrapper";
import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";

import CountryPhoneInput from "../../../components/CountryPhoneInput";
import { passwordRegex, regEmail } from "../../../utils/constants";
import { ToastMessage } from "../../../utils/ToastMessage";
import { post } from "../../../Services/ApiRequest";
import DatePicker from "react-native-date-picker";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import { View } from "react-native";
import moment from "moment";
import CustomDropDown from "../../../components/CustomDropDown";

const Signup = ({ navigation }) => {
  const init = {
    fName: "",
    email: "",
    phone: "",
    password: "",
    acc_title: "",
    acc_numb: "",
  };
  const [state, setState] = useState(init);
  const inits = {
    fNameError: "",
    emailError: "",
    phoneError: "",
    passwordError: "",
    categoryError: "",
    acc_titleError: "",
    acc_numbError: "",
  };

  const [errors, setErrors] = useState(inits);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const formattedDate = moment(birthdate).format("DD-MM-YYYY");

  const array = [
    {
      id: 1,
      placeholder: "First Name",
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
    {
      id: 7,
      placeholder: "Account Title",
      label: "Account Title",
      value: state.acc_title,
      onChange: (text) => setState({ ...state, acc_title: text }),
      error: errors.acc_titleError,
    },
    {
      id: 8,
      placeholder: "Account Number",
      label: "Account Number",
      value: state.acc_numb,
      onChange: (text) => setState({ ...state, acc_numb: text }),
      error: errors.acc_numbError,
    },
    { id: 6 },
  ];

  const checkEmail = async () => {
    try {
      setLoading(true);
      const body = {
        email: state.email,
      };
      const response = await post("users/check-email", body);
      // console.log('res===========?', response.data);
      if (!response.data?.success) {
        ToastMessage("Email Already Exists");
      } else {
        handleSendOtp();
      }
    } catch (error) {
      console.log(error.response.data);
      ToastMessage(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const body = {
        email: state?.email,
      };
      const response = await post("users/send-code", body);
      console.log("response", response.data);
      ToastMessage(response.data?.message);
      if (response.data) {
        navigation.navigate("OTPScreen", {
          isAccountCreated: false,
          bodySignUp: state,
          category: category,
          dob: birthdate,
        });
      }
    } catch (error) {
      ToastMessage(error.response?.data?.error);
      console.log(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const errorCheck = useMemo(() => {
    return () => {
      let newErrors = {};
      if (!state.fName) newErrors.fNameError = "Please enter first name";
      else if (!state.email)
        newErrors.emailError = "Please enter Email address";
      else if (!regEmail.test(state.email))
        newErrors.emailError = "Please enter valid email";
      else if (!state.phone)
        newErrors.phoneError = "Please enter store phone number";
      else if (state.phone.length < 12)
        newErrors.phoneError = "Phone number must be at least 8 digits";
      else if (!state.password)
        newErrors.passwordError = "Please enter Password";
      else if (!passwordRegex.test(state.password))
        newErrors.passwordError =
          "Password must contain 1 number, 1 special character, Uppercase and 8 digits";
      else if (!state.acc_title)
        newErrors.acc_titleError = "Please enter Account Title";
      else if (!state.acc_numb)
        newErrors.acc_numbError = "Please enter Account Number";
      else if (!category) newErrors.categoryError = "Please select a category";

      setErrors(newErrors);
    };
  }, [state, category]);

  useEffect(() => {
    errorCheck();
  }, [errorCheck]);
  return (
    <ScreenWrapper scrollEnabled footerUnScrollable={() => <></>}>
      <AuthWrapper heading="Create Account" desc="signUpDesc" showStatus={true}>
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
          ) : item?.id == 6 ? (
            <CustomDropDown
              options={["floor", "laundry", "bathroom", "shoe"]}
              value={category}
              setValue={setCategory}
              placeholder={"Select a category"}
              error={errors.categoryError}
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
          title="Create Account"
          marginTop={50}
          onPress={checkEmail}
          // onPress={() =>
          //   navigation.navigate("Information", {
          //     user: state,
          //     dob: birthdate,
          //   })
          // }
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
