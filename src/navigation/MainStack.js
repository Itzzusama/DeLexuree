import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

//screens
import Notifications from "../screens/Main/Notifications";
import TabStack from "./TabStack";
import EditProfile from "../screens/Main/ProfileScreens/EditProfile";
import ChangePassword from "../screens/Main/ProfileScreens/ChangePassword";
import TermsCondition from "../screens/Main/ProfileScreens/TermsCondition";
import PrivacyPolicy from "../screens/Main/ProfileScreens/PrivacyPolicy";
import HelpCenter from "../screens/Main/ProfileScreens/HelpCenter";
import AllOrders from "../screens/Main/AllOrders";
import OrderDetail from "../screens/Main/OrderDetail";
import InboxScreen from "../screens/Main/Chat/InboxScreen";
import ForgetPass from "../screens/Auth/ForgetPass";
import Success from "../screens/Main/Success";
import OTPScreen from "../screens/Auth/OTPScreen";
import NewAccommodation from "../screens/Main/AddAccomodation/NewAccommodation";
import Accommodation from "../screens/Main/AddAccomodation";
import Review from "../screens/Main/Orders/Review";
import Reviews from "../screens/Main/ProfileScreens/Reviews";
import UserProfile from "../screens/Main/UserProfile";
import Wallet from "../screens/Main/ProfileScreens/Wallet";
import PastBooking from "../screens/Main/ProfileScreens/PastBooking";
import Availability from "../screens/Auth/Availability";
const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
      // initialRouteName='Accommodation'
    >
      <Stack.Screen name="TabStack" component={TabStack} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="ForgetPass" component={ForgetPass} />
      <Stack.Screen name="TermsCondition" component={TermsCondition} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="HelpCenter" component={HelpCenter} />
      <Stack.Screen name="AllOrders" component={AllOrders} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
      <Stack.Screen name="InboxScreen" component={InboxScreen} />
      <Stack.Screen name="Success" component={Success} />
      <Stack.Screen name="OTPScreen" component={OTPScreen} />
      <Stack.Screen name="Accommodation" component={Accommodation} />
      <Stack.Screen name="NewAccommodation" component={NewAccommodation} />
      <Stack.Screen name="Review" component={Review} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="Reviews" component={Reviews} />
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="PastBooking" component={PastBooking} />
      <Stack.Screen name="Availability" component={Availability} />

    </Stack.Navigator>
  );
};

export default MainStack;
