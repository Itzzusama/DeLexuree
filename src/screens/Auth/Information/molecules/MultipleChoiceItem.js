import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const MultipleChoiceItem = ({ question, options, value, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.option, value === option && styles.selectedOption]}
          onPress={() => onChange(option)}
        >
          <Text
            style={[
              styles.optionText,
              value === option && styles.selectedOptionText,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MultipleChoiceItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  question: {
    fontSize: 15,
    fontFamily: fonts.regular,
    marginBottom: 8,
    color: COLORS.black,
    marginTop: 28,
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: COLORS.white,
  },
  selectedOption: {
    borderColor: COLORS.primaryColor,
    backgroundColor: COLORS.F1,
  },
  optionText: {
    fontSize: 14,
    color: COLORS.authText,
    fontFamily: fonts.regular,
  },
  selectedOptionText: {
    color: COLORS.primaryColor,
  },
});
