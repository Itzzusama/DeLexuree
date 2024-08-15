import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import React from "react";

//screens
import OnBoarding from "../screens/Auth/OnBoarding";
import GetStarted from "../screens/Auth/GetStarted";
import OTPScreen from "../screens/Auth/OTPScreen";
import Signup from "../screens/Auth/Signup";
import Login from "../screens/Auth/Login";
import Success from "../screens/Main/Success";
import ForgetPass from "../screens/Auth/ForgetPass";
import ResetPass from "../screens/Auth/ResetPass";
import Category from "../screens/Auth/Availability";

import BankDetail from "../screens/Auth/BankDetail";
import Information from "../screens/Auth/Information";
import Availability from "../screens/Auth/Availability";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const isOnBoarding = useSelector((state) => state.authConfigs.isOnBoarding);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isOnBoarding ? (
        <>
          <Stack.Screen name="GetStarted" component={GetStarted} />
          <Stack.Screen name="Category" component={Category} />
          <Stack.Screen name="OnBoarding" component={OnBoarding} />
        </>
      ) : (
        <>
          <Stack.Screen name="OnBoarding" component={OnBoarding} />
          <Stack.Screen name="GetStarted" component={GetStarted} />
        </>
      )}

      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="OTPScreen" component={OTPScreen} />
      <Stack.Screen name="Success" component={Success} />
      <Stack.Screen name="ForgetPass" component={ForgetPass} />
      <Stack.Screen name="ResetPass" component={ResetPass} />
      <Stack.Screen name="BankDetail" component={BankDetail} />
      <Stack.Screen name="Availability" component={Availability} />
      <Stack.Screen name="Information" component={Information} />
    </Stack.Navigator>
  );
};

export default AuthStack;
