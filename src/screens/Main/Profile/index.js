import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import CustomText from "../../../components/CustomText";
import ScreenWrapper from "../../../components/ScreenWrapper";

import { Images } from "../../../assets/images";
import UserDetail from "./UserDetail";
import fonts from "../../../assets/fonts";
import { COLORS } from "../../../utils/COLORS";
import LogoutModal from "./LogoutModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../../store/reducer/AuthConfig";
import { del, get } from "../../../Services/ApiRequest";
import { setUserData, userLogout } from "../../../store/reducer/usersSlice";

import Item from "./Item";
import { tabIcons } from "../../../assets/images/tabIcons";
import CustomButton from "../../../components/CustomButton";
import DeleteAccModal from "./DeleteAccModal";
import Header from "../../../components/Header";
import { notiLogout } from "../../../store/reducer/unseenNotiSlice";
import { ToastMessage } from "../../../utils/ToastMessage";

GoogleSignin.configure({
  webClientId:
    "40372426505-gad73g4168ia8h2qhsru726uc42bv9b2.apps.googleusercontent.com", // From Firebase Console
});
const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.users);
  const [isLogoutModal, setLogoutModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const personal = [
    {
      id: 1,
      name: "Personal Data",
      image: tabIcons.profile,
      screen: "EditProfile",
    },
    {
      id: 2,
      name: "Wallet",
      screen: "Wallet",
      image: Images.wallet,
    },
  ];
  const security = [
    {
      id: 1,
      name: "Change Password",
      image: Images.lock,
      screen: "ChangePassword",
    },
  ];
  const general = [
    {
      id: 2,
      name: "Availability",
      screen: "Availability",
      image: Images.activity,
    },
  ];
  const About = [
    {
      id: 1,
      name: "Help Center",
      image: Images.help,
      screen: "HelpCenter",
    },
    {
      id: 2,
      name: "Privacy & Policy",
      screen: "PrivacyPolicy",
      image: Images.lock,
    },

    // {
    //   id: 4,
    //   name: "Term & Condition",
    //   screen: "TermsCondition",
    //   image: Images.terms,
    // },
  ];

  return (
    <ScreenWrapper
      paddingHorizontal={18}
      paddingBottom={70}
      backgroundColor={COLORS.white}
      scrollEnabled
      headerUnScrollable={() => <Header title="Settings" />}
    >
      <UserDetail
        avatar={
          userData?.profilePicture
            ? { uri: userData?.profilePicture }
            : Images.user
        }
        name={userData?.name}
        email={userData?.email}
      />

      <CustomText
        label={"Personal Info"}
        fontSize={12}
        fontFamily={fonts.medium}
        marginTop={32}
      />

      {personal.map((item, index) => (
        <Item
          name={item.name}
          source={item.image}
          onPress={() => navigation.navigate(item.screen)}
        />
      ))}
      <CustomText
        label={"Security"}
        fontSize={12}
        fontFamily={fonts.medium}
        marginTop={32}
      />

      {security.map((item, index) => (
        <Item
          name={item.name}
          source={item.image}
          onPress={() => navigation.navigate(item.screen)}
        />
      ))}
      <CustomText
        label={"General"}
        fontSize={12}
        fontFamily={fonts.medium}
        marginTop={14}
      />

      {general.map((item, index) => (
        <Item
          name={item.name}
          source={item.image}
          onPress={() => navigation.navigate(item.screen)}
        />
      ))}
      <CustomText
        label={"About"}
        fontSize={12}
        fontFamily={fonts.medium}
        marginTop={14}
      />

      {About.map((item, index) => (
        <Item
          name={item.name}
          source={item.image}
          onPress={() => navigation.navigate(item.screen)}
        />
      ))}
      <CustomButton
        title={"Delete Account"}
        marginTop={14}
        backgroundColor={"transparent"}
        customStyle={{ borderWidth: 0.7, borderColor: COLORS.red }}
        color={COLORS.red}
        onPress={() => setDeleteModal(true)}
      />
      <CustomButton
        title={"Logout"}
        marginTop={14}
        marginBottom={6}
        onPress={() => setLogoutModal(true)}
      />

      <LogoutModal
        isVisible={isLogoutModal}
        onDisable={async () => {
          setLogoutModal(false);
          dispatch(setToken(""));
          dispatch(userLogout());
          GoogleSignin.signOut();
          try {
            await AsyncStorage.removeItem("token");
          } catch (error) {
            console.log("Error removing token from AsyncStorage:", error);
          }
          navigation.reset({
            index: 0,
            routes: [
              {
                name: "AuthStack",
                state: {
                  routes: [
                    {
                      name: "Login",
                    },
                  ],
                },
              },
            ],
          });
        }}
        StayLoggedIn={() => {
          setLogoutModal(false);
        }}
      />
      <DeleteAccModal
        isVisible={deleteModal}
        onDisable={async () => {
          setDeleteModal(false);
          try {
            const res = await del("users/");
            if (res.data.success) {
              ToastMessage("The account has been successfully deleted!");
            }
            await AsyncStorage.removeItem("token");
            GoogleSignin.signOut();
            dispatch(setToken(""));
            dispatch(userLogout());
            dispatch(notiLogout());
          } catch (error) {
            console.log("Error removing token from AsyncStorage:", error);
          }
          navigation.reset({
            index: 0,
            routes: [
              {
                name: "AuthStack",
                state: {
                  routes: [
                    {
                      name: "Login",
                    },
                  ],
                },
              },
            ],
          });
        }}
        StayLoggedIn={() => {
          setDeleteModal(false);
        }}
      />
    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({});
