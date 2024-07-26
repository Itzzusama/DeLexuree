import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { className } from "../global-styles";
import CustomText from "./CustomText";
import fonts from "../assets/fonts";
import ImageFast from "./ImageFast";
import { Images } from "../assets/images";
import { useNavigation } from "@react-navigation/native";
const CustomHeader = ({
  lable,
  showIcon = true,
  showLable = true,
  customStyle,
  customImg,
}) => {
  const navigation = useNavigation();
  return (
    <View style={[className("flex align-center my-2 px-4 py-4"), customStyle]}>
      {showIcon && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ImageFast
            source={Images.rightIcon}
            style={[className("h-4 w-6 mr-3")]}
          />
        </TouchableOpacity>
      )}
      {showLable && (
        <CustomText
          label={lable}
          fontSize={16}
          fontFamily={fonts.regular}
          lineHeight={20}
          fontWeight={700}
        />
      )}
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({});
