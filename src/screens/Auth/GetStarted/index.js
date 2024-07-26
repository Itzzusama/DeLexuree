import {
  StyleSheet,
  Dimensions,
  View,
  ImageBackground,
  StatusBar,
} from "react-native";
import React from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomText from "../../../components/CustomText";
import CustomButton from "../../../components/CustomButton";

import { Images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";

const GetStarted = ({ navigation }) => {
  return (
    <ImageBackground source={Images.getStarted} style={styles.imgContainer}>
      <StatusBar translucent backgroundColor="transparent" />

      <View
        style={{ paddingHorizontal: 12, justifyContent: "flex-end", flex: 1 }}
      >
        <CustomButton
          title={"Continue with Email"}
          image={Images.apple}
          customStyle={styles.socialButton}
          customText={styles.socialText}
        />
        <CustomButton
          title={"Continue with Google"}
          image={Images.google}
          customStyle={styles.socialButton}
          customText={styles.socialText}
          marginTop={12}
          // onPress={onGoogleButtonPress}
        />
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
