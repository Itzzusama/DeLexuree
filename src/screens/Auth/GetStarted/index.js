import {
  StyleSheet,
  View,
  ImageBackground,
  StatusBar,
  Platform,
} from "react-native";
import React, { useState } from "react";

import CustomText from "../../../components/CustomText";
import CustomButton from "../../../components/CustomButton";

import { Images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import { signInWithApple, signInWithGoogle } from "../../../utils/authUtils";
import { GoogleIcon, AppleIcon, Email } from "../../../assets/images";
import { useDispatch } from "react-redux";
import { className } from "../../../global-styles";

const GetStarted = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState({
    email: false,
    google: false,
    apple: false,
  });
  const socialLogin = [
    {
      id: "email",
      name: "Continue with Email",
      icon: <Email />,
    },
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
    } else if (id === "email") {
      navigation.navigate("Signup");
    } else {
      await signInWithApple(navigation, dispatch, setLoading);
    }
  };
  return (
    <ImageBackground source={Images.getStarted} style={styles.imgContainer}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={"light-content"}
      />

      <View style={styles.overlay} />

      <View
        style={{ paddingHorizontal: 12, justifyContent: "flex-end", flex: 1 }}
      >
        {[...socialLogin, ...(Platform.OS == "ios" ? AppleCard : [])].map(
          (item) => (
            <CustomButton
              title={item?.name}
              ImageIcon={item?.icon}
              customStyle={styles.socialButton}
              customText={styles.socialText}
              onPress={() => handleSocialLogin(item.id)}
              disabled={loading[item.id]}
              loading={loading[item.id]}
              customStyle={className("mb-3 bg-white")}
            />
          )
        )}
      </View>
      <CustomText
        onPress={() => navigation.navigate("Login")}
        label={"Already have an Account?  Login"}
        color={COLORS.white}
        marginTop={26}
        marginBottom={30}
        textAlign={"center"}
        alignSelf={"center"}
      />
    </ImageBackground>
  );
};
export default GetStarted;

const styles = StyleSheet.create({
  imgContainer: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
    opacity: 0.6,
  },
  img: {
    width: "100%",
    height: "100%",
    flex: 1,
  },
  socialButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderRadius: 12,
  },
  socialText: {
    color: COLORS.black,
  },
});
