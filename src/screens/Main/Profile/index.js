import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
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
import { get } from "../../../Services/ApiRequest";
import { setUserData } from "../../../store/reducer/usersSlice";

import Item from "./Item";
import { tabIcons } from "../../../assets/images/tabIcons";
import CustomButton from "../../../components/CustomButton";
import DeleteAccModal from "./DeleteAccModal";

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
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
  const general = [
    {
      id: 2,
      name: "Availability",
      screen: "Availability",
      image: Images.activity,
    },
    {
      id: 3,
      name: "Instructional Material",
      screen: "Education",
      image: Images.pastBook,
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

    {
      id: 4,
      name: "Term & Condition",
      screen: "TermsCondition",
      image: Images.terms,
    },
  ];

  const getProfile = async () => {
    try {
      const response = await get("users/me");
      dispatch(setUserData(response.data?.user));
    } catch (error) {}
  };

  useFocusEffect(
    useCallback(() => {
      getProfile();
    }, [])
  );

  return (
    <ScreenWrapper
      paddingHorizontal={18}
      paddingBottom={70}
      backgroundColor={COLORS.white}
      scrollEnabled
    >
      <UserDetail
        avatar={Images.user}
        name={"Aaron Ramsdale"}
        email={"aaronramsdale@gmail.com"}
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
          dispatch(setToken(""));
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
          setDeleteModal(false);
        }}
      />
    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({});
