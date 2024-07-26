import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { className } from "../global-styles";
import { COLORS } from "../utils/COLORS";
import CustomText from "../components/CustomText";
import fonts from "../assets/fonts";
const CategoryCard = ({ name, selected, onSelect, isFirst }) => {
  const handlePress = () => {
    onSelect && onSelect(name);
  };

  return (
    <TouchableOpacity
      style={[
        className(
          "my-3  align-center justify-center rounded-4 h-7 bor-1 border-pm px-3 "
        ),
        {
          backgroundColor: selected ? COLORS.primaryColor : COLORS.F0,
          marginLeft: isFirst ? 15 : 0,
          marginRight: 3,
        },
      ]}
      onPress={handlePress}
    >
      <CustomText
        label={name}
        fontSize={10}
        fontFamily={fonts.regular}
        lineHeight={12.13}
        fontWeight={"400"}
        color={selected ? "white" : COLORS.primaryColor}
      />
    </TouchableOpacity>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({});
