import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomText from "../../../../components/CustomText";
import CustomInput from "../../../../components/CustomInput";
import { COLORS } from "../../../../utils/COLORS";

const InformationItem = ({
  question,
  placeholder,
  value,
  onChangeText,
  error,
}) => {
  return (
    <View style={{ borderBottomWidth: 0.2, borderColor:COLORS.gray }}>
      <CustomText label={question} marginBottom={8}marginTop={28} fontSize={15} />
      <CustomInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        error={error}
      />
    </View>
  );
};

export default InformationItem;

const styles = StyleSheet.create({});
