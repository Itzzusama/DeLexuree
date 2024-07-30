import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import CustomText from "../../../components/CustomText";
import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomHeader from "../../../components/CustomHeader";
import { className } from "../../../global-styles";
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

const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLogoutModal, setLogoutModal] = useState(false);
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
    {
      id: 3,
      name: "Past Bookings",
      screen: "PastBooking",
      image: Images.pastBook,
    },
  ];
  const general = [
    {
      id: 1,
      name: "Language",
      image: Images.language,
      screen: "PersonalInfo",
    },
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
      id: 3,
      name: "About App",
      screen: "Education",
      image: Images.about,
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
      backgroundColor={COLORS.white}
      scrollEnabled={true}
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

      <LogoutModal
        isVisible={isLogoutModal}
        onDisable={async () => {
          setLogoutModal(false);
          dispatch(setToken(""));
          // Remove token from AsyncStorage
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
    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({});
