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
import PreviousWork from "../screens/Auth/PreviousWork";
import Category from "../screens/Auth/Category";
import AddAccomodation from "../screens/Main/AddAccomodation";
import Accommodation from "../screens/Main/AddAccomodation";
import NewAccommodation from "../screens/Main/AddAccomodation/NewAccommodation";


const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const isOnBoarding = useSelector((state) => state.authConfigs.isOnBoarding);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      // initialRouteName="Accommodation"
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
      <Stack.Screen name="PreviousWork" component={PreviousWork} />
      <Stack.Screen name="Accommodation" component={Accommodation} />
      <Stack.Screen name="NewAccommodation" component={NewAccommodation} />


    </Stack.Navigator>
  );
};

export default AuthStack;
