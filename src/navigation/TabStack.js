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

const Tab = createBottomTabNavigator();
const TabStack = () => {
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
          tabBarIcon: ({ focused }) => (
            <Image
              source={tabIcons.home}
              style={[
                styles.icon,
                { tintColor: focused ? COLORS.primaryColor : COLORS.tabIcon },
              ]}
            />
          ),
        }}
        // name={'Home'}
        name={i18n.t("Home")}
        component={Home}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={tabIcons.message}
              style={[
                styles.icon,
                { tintColor: focused ? COLORS.primaryColor : COLORS.tabIcon },
              ]}
            />
          ),
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
    width: 22,
    height: 22,
    resizeMode: "contain",
    marginBottom: -8,
  },
});
