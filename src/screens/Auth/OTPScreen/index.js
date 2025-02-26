import { StyleSheet } from "react-native";
import React, { useState } from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import AuthWrapper from "../../../components/AuthWrapper";
import OTPComponent from "../../../components/OTP";
import { post } from "../../../Services/ApiRequest";
import { ToastMessage } from "../../../utils/ToastMessage";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../../store/reducer/AuthConfig";
import { setUserData } from "../../../store/reducer/usersSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../../components/Header";

const OTPScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isAccountCreated = route?.params?.isAccountCreated;
  const bodySignUp = route?.params?.bodySignUp;
  const category = route?.params?.category;
  const token = route?.params?.token;
  const dob = route?.params?.dob;
  const gender = route?.params?.gender;
  const image = route?.params?.image;
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const body = {
        code: otp,
        token: token,
      };
      // const url =
      //   from === 'forgot' ? 'users/forget-password' : 'users/send-code';
      const response = await post("users/verify-otp/forget-password", body);
      console.log("this is respppppp"), response.data;
      if (response.data.success) {
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "ResetPass",
              params: {
                token: token,
              },
            },
          ],
        });
      } else {
        ToastMessage(response.data?.message);
      }
    } catch (error) {
      ToastMessage(error.response?.data?.error);
      console.log(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOtp = async () => {
    setLoading(true);
    try {
      const body = {
        email: bodySignUp?.email,
        code: otp,
      };
      const response = await post("users/verify-otp/registration", body);
      console.log(response.data);
      if (response.data.success) {
        handleRegisterUser();
        ToastMessage(response.data?.message);
      } else {
        ToastMessage(response.data?.message);
      }
    } catch (error) {
      ToastMessage(error.response?.data?.error);
      console.log(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterUser = async () => {
    const fcmToken = await AsyncStorage.getItem("fcmToken");
    const body = {
      email: bodySignUp?.email,
      phone: bodySignUp?.phone,
      password: bodySignUp?.password,
      fcmtoken: fcmToken,
      name: bodySignUp?.fName,
      dob: dob,
      category: category,
      gender: gender,
      profilePicture: image,
    };

    navigation.reset({
      index: 0,
      routes: [
        {
          name: "Information",
          params: { body },
        },
      ],
    });
  };
  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header />}
      footerUnScrollable={() => (
        <CustomButton
          title={isAccountCreated ? "Done" : "Continue"}
          marginTop={40}
          width="90%"
          marginBottom={30}
          loading={loading}
          disabled={loading || otp.length < 4}
          onPress={isAccountCreated ? handleVerifyOtp : handleCheckOtp}
        />
      )}
    >
      <AuthWrapper
        heading="Enter Verification Code"
        desc="We have sent you an OTP, check your email and put the code down below."
      >
        <OTPComponent value={otp} setValue={setOtp} />
      </AuthWrapper>
    </ScreenWrapper>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({});
