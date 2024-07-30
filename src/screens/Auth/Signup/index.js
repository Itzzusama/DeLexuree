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

const Signup = ({ navigation }) => {
  const init = {
    fName: "",
    email: "",
    phone: "",
    password: "",
    DoorNum: "",
  };
  const [state, setState] = useState(init);
  const inits = {
    fNameError: "",
    emailError: "",
    phoneError: "",
    passwordError: "",
    addressError: "",
    DoorNumError: "",
  };

  const [errors, setErrors] = useState(inits);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const formattedDate = moment(birthdate).format("DD-MM-YYYY");

  // console.log('birthdate', birthdate);
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
        navigation.navigate("PreviousWork", {
          user: state,
          location: address,
          dob: birthdate,
        });
      }
    } catch (error) {
      console.log(error.response.data);
      ToastMessage(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }; //navigation.navigate('OTPScreen', {isAccountCreated: true})

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

      setErrors(newErrors);
    };
  }, [state, address]);

  useEffect(() => {
    errorCheck();
  }, [errorCheck]);
  return (
    <ScreenWrapper
      scrollEnabled
      footerUnScrollable={() => (
        <>
          <CustomButton
            title="Create Account"
            marginTop={50}
            // onPress={checkEmail}
            onPress={() =>
              navigation.navigate("Information", {
                user: state,
                dob: birthdate,
              })
            }
            disabled={!Object.values(errors).every((error) => error === "")}
            loading={loading}
            width="90%"
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
        </>
      )}
    >
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
          ) : (
            <CustomInput
              key={item?.id}
              placeholder={item.placeholder}
              value={item.value}
              onChangeText={item.onChange}
              error={item.error}
              secureTextEntry={item?.id == 5}
              withLabel={item.label}
              keyboardType={item?.id == 4 ? "number-pad" : "default"}
            />
          )
        )}
      </AuthWrapper>
    </ScreenWrapper>
  );
};

export default Signup;

const styles = StyleSheet.create({});
