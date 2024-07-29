import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";

import CustomText from "./CustomText";

import { COLORS } from "../utils/COLORS";
import fonts from "../assets/fonts";

const TopTab = ({ tab, setTab, tabNames }) => {
  return (
    <View style={styles.mainContainer}>
      {tabNames.map((tabName, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setTab(index)}
          style={[styles.item, tab === index && styles.activeTab]}
        >
          <CustomText
            textTransform="capitalize"
            fontFamily={tab == index ? fonts.bold : fonts.medium}
            label={tabName}
            color={tab == index ? COLORS.white : COLORS.gray}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TopTab;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderWidth: 0.4,
    borderRadius: 12,
    borderColor: COLORS.gray,
    paddingHorizontal: 6,
    marginVertical:16
  },
  item: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 4,
  },
  activeTab: {
    backgroundColor: COLORS.primaryColor,
    borderRadius: 4,
  },
  indicator: {
    width: "90%",
    height: 3,
    borderRadius: 100,
    backgroundColor: COLORS.primaryColor,
    marginTop: 3,
  },
});
