import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet } from "react-native";
import React from "react";

// screens
import Profile from "../screens/Main/Profile";
import Order from "../screens/Main/Orders";
import Home from "../screens/Main/Home";
import Chat from "../screens/Main/Chat";

import { tabIcons } from "../assets/images/tabIcons";
import { COLORS } from "../utils/COLORS";
import i18n from "../Language/i18n";
import Wallet from "../screens/Main/ProfileScreens/Wallet";
import { Images } from "../assets/images";

import HomeIcon from "../assets/images/homeIcon";
import ChatIcon from "../assets/images/chatIcon";
import { useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { fetchNoti } from "../store/reducer/unseenNotiSlice";
import { get } from "../Services/ApiRequest";
import { setUserData } from "../store/reducer/usersSlice";

const Tab = createBottomTabNavigator();
const TabStack = () => {
  const dispatch = useDispatch();

  const getProfile = async () => {
    try {
      const response = await get("users/me");
      dispatch(setUserData(response.data?.user));
    } catch (error) {
      console.log(error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getProfile();
      dispatch(fetchNoti());
      return () => {};
    }, [])
  );
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarStyle: {
          height: 70,
          backgroundColor: "white",
          elevation: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingBottom: 12,
          position: "absolute",
        },
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: COLORS.primaryColor,
        headerShown: false,
      })}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => <HomeIcon focused={focused} />,
        }}
        // name={'Home'}
        name={i18n.t("Home")}
        component={Home}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => <ChatIcon focused={focused} />,
        }}
        name={i18n.t("Message")}
        component={Chat}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={Images.wallet}
              style={[
                styles.icon,
                { tintColor: focused ? COLORS.primaryColor : COLORS.tabIcon },
              ]}
            />
          ),
        }}
        name={i18n.t("Wallet")}
        component={Wallet}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={tabIcons.profile}
              style={[
                styles.icon,
                { tintColor: focused ? COLORS.primaryColor : COLORS.tabIcon },
              ]}
            />
          ),
        }}
        name={i18n.t("Account")}
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default TabStack;
const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
});
