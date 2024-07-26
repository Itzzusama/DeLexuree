import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { className } from "../global-styles";

import { COLORS } from "../utils/COLORS";
import CustomText from "../components/CustomText";
import fonts from "../assets/fonts";
const TextContentCard = ({ title, content }) => {
  return (
    <View style={[className(" p-4 px-6 ")]}>
      <View style={styles.header}>
        <View style={className("w-75")}>
          <CustomText
            label={title}
            fontSize={16}
            color={COLORS[22]}
            fontFamily={fonts.medium}
          />
        </View>
      </View>

      <View style={className("mt-3")}>
        <CustomText
          label={content}
          fontSize={14}
          color={COLORS[75]}
          fontFamily={fonts.regular}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "rgba(0,0,0,0.3)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.65,
    elevation: 14,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  arrowIcon: {
    width: 24,
    height: 24,
  },
  contentContainer: {
    padding: 10,
    backgroundColor: "#fff",
  },
});

export default TextContentCard;
