import { TouchableOpacity, ActivityIndicator, Image, View } from "react-native";
import React from "react";

import CustomText from "./CustomText";

import { COLORS } from "../utils/COLORS";
import fonts from "../assets/fonts";

const CustomButton = ({
  onPress,
  title,
  disabled,
  loading,
  customStyle,
  customText,
  marginBottom,
  marginTop,
  backgroundColor,
  color,
  width = "100%",
  height = 56,
  borderRadius = 8,
  justifyContent = "center",
  alignItems = "center",
  flexDirection = "row",
  alignSelf = "center",
  fontSize,
  indicatorcolor,
  image,
  imageStyle,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.6}
      style={[
        {
          backgroundColor: disabled
            ? COLORS.gray
            : backgroundColor
            ? backgroundColor
            : COLORS.primaryColor,
          marginTop,
          marginBottom,
          width,
          height,
          borderRadius,
          flexDirection,
          alignItems,
          justifyContent,
          alignSelf,
        },
        customStyle,
      ]}
      onPress={onPress}
    >
      {loading && (
        <ActivityIndicator
          size={25}
          color={indicatorcolor ? indicatorcolor : COLORS.white}
        />
      )}
      {!loading && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {image && (
            <Image
              source={image}
              style={[{ marginRight: 10, height: 20, width: 20 }, imageStyle]}
            />
          )}
          <CustomText
            textStyle={customText}
            label={title}
            color={color ? color : COLORS.white}
            fontFamily={fonts.bold}
            fontSize={fontSize || 18}
            // lineHeight={22}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
