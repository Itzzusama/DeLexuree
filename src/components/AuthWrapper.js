import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StyleSheet, View } from "react-native";
import React from "react";

import ImageFast from "./ImageFast";
import { Images } from "../assets/images";
import CustomText from "./CustomText";
import fonts from "../assets/fonts";
import { COLORS } from "../utils/COLORS";
import { className } from "../global-styles";

const AuthWrapper = ({
  children,
  scrollEnabled = false,
  heading = "",
  desc = "",
  index = 0,
  showStatus = false,
  marginBottom,
}) => {
  return (
    <KeyboardAwareScrollView
      scrollEnabled={scrollEnabled}
      style={{ flex: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {/* <ImageFast
        style={styles.logo}
        resizeMode="contain"
        source={Images.logoIcon}
      /> */}
      {showStatus && (
        <View
          style={[
            className("flex mt-7  align-center justify-center"),
            { width: "98%" },
          ]}
        >
          <View
            style={[
              className("rounded-1 h-1 bg-DD flex-1"),
              {
                backgroundColor:
                  index == 0 || index == 1 || index == 2 || index == 3
                    ? COLORS.primaryColor
                    : COLORS.DD,
              },
            ]}
          />
          {/* <View
            style={[
              className(" rounded-1 h-1 bg-DD mx-2"),
              {
                backgroundColor:
                  index == 1 || index == 2 || index == 3
                    ? COLORS.primaryColor
                    : COLORS.DD,
                width: "23%",
              },
            ]}
          /> */}
          <View
            style={[
              className(" rounded-1 h-1 bg-DD flex-1 mx-2"),
              {
                backgroundColor:
                  index == 2 || index == 3 ? COLORS.primaryColor : COLORS.DD,
              },
            ]}
          />
          <View
            style={[
              className("rounded-1 h-1 bg-DD flex-1"),
              {
                backgroundColor: index == 3 ? COLORS.primaryColor : COLORS.DD,
              },
            ]}
          />
        </View>
      )}

      <CustomText
        label={heading}
        fontFamily={fonts.bold}
        fontSize={24}
        marginTop={showStatus ? 10 : 20}
      />
      <CustomText
        label={desc}
        fontSize={14}
        // color={COLORS.authText}
        marginBottom={marginBottom || 30}
      />

      {children}
    </KeyboardAwareScrollView>
  );
};

export default AuthWrapper;
const styles = StyleSheet.create({
  logo: {
    width: 42,
    height: 42,
    marginTop: 20,
    alignSelf: "center",
  },
});
