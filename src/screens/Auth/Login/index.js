import { StyleSheet, View } from "react-native";
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
import { Images } from "../../../assets/images";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      const fcmToken = await AsyncStorage.getItem("fcmToken");
      const body = {
        email: state.email,
        password: state.password,
        fcmtoken: fcmToken,
      };
      const response = await post("auth/", body);

      console.log("res-------", response.data);
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
      setLoading(false);
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
          loading={loading}
          disabled={
            loading || !Object.values(errors).every((error) => error === "")
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

        <CustomButton
          image={Images.google}
          title={"Sign in with Google"}
          customStyle={{
            borderWidth: 1,
            borderColor: COLORS.lightGray,
            backgroundColor: COLORS.white,
          }}
          customText={{ color: COLORS.black, fontFamily: fonts.semiBold }}
          marginTop={12}
        />
        <CustomButton
          image={Images.apple}
          title={"Sign in with Google"}
          customStyle={{
            borderWidth: 1,
            borderColor: COLORS.lightGray,
            backgroundColor: COLORS.white,
          }}
          customText={{ color: COLORS.black, fontFamily: fonts.semiBold }}
          marginTop={12}
        />
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
