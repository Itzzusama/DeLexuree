import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import CustomText from "../../../components/CustomText";
import { className } from "../../../global-styles";
import fonts from "../../../assets/fonts";
import { COLORS } from "../../../utils/COLORS";
const OrderStatusCard = ({ name, selected, onSelect, isFirst }) => {
  const handlePress = () => {
    onSelect && onSelect(name);
  };
  return (
    <TouchableOpacity
      style={[
        className(" align-center justify-center p-2 rounded-6 w-25 py-2"),
        {
          backgroundColor: selected ? COLORS.primaryColor : "transparent",
        },
      ]}
      onPress={handlePress}
    >
      <CustomText
        label={name}
        color={selected ? COLORS.white : COLORS.gray2}
        fontSize={14}
        lineHeight={20}
        fontFamily={fonts.semiBold}
        textStyle={className("my-1")}
      />
    </TouchableOpacity>
  );
};

export default OrderStatusCard;

const styles = StyleSheet.create({});
