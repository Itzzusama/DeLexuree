import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";

import CustomText from "./CustomText";

import { COLORS } from "../utils/COLORS";
import fonts from "../assets/fonts";

const TopTab = ({ tab, setTab, tabNames, getOrders }) => {
  return (
    <View style={styles.mainContainer}>
      {tabNames.map((tabName, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            setTab(tabName);
          }}
          style={[styles.item, tab === tabName && styles.activeTab]}
        >
          <CustomText
            textTransform="capitalize"
            fontFamily={tab == tabName ? fonts.bold : fonts.medium}
            label={tabName}
            color={tab == tabName ? COLORS.white : COLORS.gray}
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
    borderWidth: 0.1,
    borderRadius: 99,
    borderColor: COLORS.gray,
    paddingHorizontal: 6,
    marginVertical: 16,
    backgroundColor: "#F8F8F8",
  },
  item: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 5,
  },
  activeTab: {
    backgroundColor: COLORS.primaryColor,
    borderRadius: 99,
  },
  indicator: {
    width: "90%",
    height: 3,
    borderRadius: 100,
    backgroundColor: COLORS.primaryColor,
    marginTop: 3,
  },
});
