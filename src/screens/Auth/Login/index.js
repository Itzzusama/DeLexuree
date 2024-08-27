import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import AuthWrapper from "../../../components/AuthWrapper";
import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";

import fonts from "../../../assets/fonts";
import { passwordRegex, regEmail } from "../../../utils/constants";
import { ToastMessage } from "../../../utils/ToastMessage";
import { post } from "../../../Services/ApiRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../../store/reducer/usersSlice";
import { setToken } from "../../../store/reducer/AuthConfig";
import { COLORS } from "../../../utils/COLORS";
import { AppleIcon, GoogleIcon, Images } from "../../../assets/images";
import { signInWithApple, signInWithGoogle } from "../../../utils/authUtils";
import { className } from "../../../global-styles";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState({
    google: false,
    apple: false,
  });
  const socialLogin = [
    {
      id: "google",
      name: "Sign in with Google",
      icon: <GoogleIcon />,
    },
  ];
  const AppleCard = [
    {
      id: "apple",
      name: "Sign in with Apple",
      icon: <AppleIcon />,
    },
  ];
  const handleSocialLogin = async (id) => {
    if (id === "google") {
      await signInWithGoogle(navigation, dispatch, setLoading);
    } else {
      await signInWithApple(navigation, dispatch, setLoading);
    }
  };
  const [isloading, setisLoading] = useState(false);

  const init = {
    email: "",
    password: "",
  };
  const inits = {
    emailError: "",
    passwordError: "",
  };
  const [errors, setErrors] = useState(inits);
  const [state, setState] = useState(init);
  const array = [
    {
      id: 1,
      placeholder: "Email",
      value: state.email,
      label: "Email Address",
      onChange: (text) => setState({ ...state, email: text }),
      error: errors?.emailError,
    },

    {
      id: 2,
      placeholder: "Password",
      value: state.password,
      label: "Password",
      onChange: (text) => setState({ ...state, password: text }),
      error: errors?.passwordError,
    },
  ];
  const handleLogin = async () => {
    try {
      setisLoading(true);
      const fcmToken = await AsyncStorage.getItem("fcmToken");
      const body = {
        email: state.email,
        password: state.password,
        fcmtoken: "fcmToken",
        user_type: "employee",
      };
      const response = await post("auth/", body);
      if (response.data?.success) {
        await AsyncStorage.setItem("token", response.data?.token);
        dispatch(setToken(response.data?.token));
        dispatch(setUserData(response.data?.user));
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "MainStack",
            },
          ],
        });
      }
      // }
    } catch (error) {
      console.log(error.response.data);
      ToastMessage(error?.response?.data?.message);
    } finally {
      setisLoading(false);
    }
  };

  const errorCheck = useMemo(() => {
    return () => {
      let newErrors = {};
      if (!state.email) newErrors.emailError = "Please enter Email address";
      else if (!regEmail.test(state.email))
        newErrors.emailError = "Please enter valid email";
      else if (!state.password)
        newErrors.passwordError = "Please enter Password";
      else if (!passwordRegex.test(state.password))
        newErrors.passwordError =
          "Password must contain 1 number, 1 special character, Uppercase and 8 digits";
      setErrors(newErrors);
    };
  }, [state]);

  useEffect(() => {
    errorCheck();
  }, [errorCheck]);
  return (
    <ScreenWrapper scrollEnabled>
      <AuthWrapper heading="Login" desc="signUpDesc">
        {array.map((item) => (
          <CustomInput
            key={item?.id}
            placeholder={item.placeholder}
            value={item.value}
            onChangeText={item.onChange}
            error={item.error}
            withLabel={item.label}
            secureTextEntry={item.id === 2}
          />
        ))}

        <CustomText
          label="Forgot Password?"
          fontSize={16}
          fontFamily={fonts.semiBold}
          color={COLORS.darkGreen}
          alignSelf="flex-end"
          onPress={() => navigation.navigate("ForgetPass")}
        />
        <CustomButton
          title="Sign In"
          marginTop={40}
          onPress={handleLogin}
          loading={isloading}
          disabled={
            isloading || !Object.values(errors).every((error) => error === "")
          }
        />

        <View style={styles.orContinueWithContainer}>
          <View style={styles.line} />
          <CustomText
            label="Or continue with"
            fontSize={14}
            fontFamily={fonts.medium}
            color={COLORS.gray}
          />
          <View style={styles.line} />
        </View>

        {[...socialLogin, ...(Platform.OS == "ios" ? AppleCard : [])].map(
          (item) => (
            <TouchableOpacity
              key={item.id}
              style={className(
                "flex flex-row align-center justify-center bg-white p-4 mb-3 rounded-2 border-gray2 bor-1"
              )}
              activeOpacity={0.8}
              onPress={() => handleSocialLogin(item.id)}
              disabled={loading[item.id]}
            >
              {loading[item.id] ? (
                <ActivityIndicator size="small" color={COLORS.primaryColor} />
              ) : (
                <>
                  {item?.icon}
                  <CustomText
                    label={item?.name}
                    textStyle={className("ml-2")}
                    fontSize={16}
                    color={COLORS.blk2}
                    fontFamily={fonts.medium}
                  />
                </>
              )}
            </TouchableOpacity>
          )
        )}
        <CustomText
          label="Don’t have an account? Sign Up"
          fontSize={16}
          fontFamily={fonts.semiBold}
          alignSelf="center"
          marginTop={20}
          onPress={() => navigation.navigate("Signup")}
        />
      </AuthWrapper>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  orContinueWithContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginHorizontal: 2,
  },
  orContinueWithText: {
    marginHorizontal: 10,
  },
});

// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const Login = () => {
//   return (
//     <View>
//       <Text>login</Text>
//     </View>
//   )
// }

// export default Login

// const styles = StyleSheet.create({})
