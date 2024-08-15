import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import CustomText from "./CustomText";
import fonts from "../assets/fonts";
import { COLORS } from "../utils/COLORS";

const TextSpaceBetween = ({
  leftText,
  leftImage,
  rightText,
  light,
  marginTop,
  rightColor,
  rightImage,
  customStyle,
}) => {
  return (
    <View style={[styles.container, customStyle, { marginTop: marginTop }]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {leftImage && <Image source={leftImage} style={styles.leftImage} />}
        <CustomText
          label={leftText}
          fontFamily={light ? fonts.semiBold : fonts.bold}
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {rightImage && <Image source={rightImage} style={styles.leftImage} />}
        <CustomText
          label={rightText}
          numberOfLines={1}
          alignSelf={"flex-end"}
          fontFamily={light ? fonts.semiBold : fonts.bold}
          color={rightColor}
          textTransform={"capitalize"}
        />
      </View>
    </View>
  );
};

export default TextSpaceBetween;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  leftImage: {
    width: 18,
    height: 18,
    marginRight: 6,
  },
});
