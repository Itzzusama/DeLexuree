import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

import ImageFast from "../../../../components/ImageFast";
import { Images } from "../../../../assets/images";
import { COLORS } from "../../../../utils/COLORS";

const Header = ({ isNotification, userName }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <ImageFast isView source={Images.user} style={styles.leftRightIcon} />
        <Image source={Images.logo} style={styles.middleIcon} />
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.navigate("Notifications")}
        >
          {/* {isNotification && <View style={styles.dot} />} */}
          <Image source={Images.notification} style={styles.leftRightIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 16,
    paddingHorizontal: 18,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 14,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 100,
    borderWidth: 2,
    backgroundColor: COLORS.notification,
    borderColor: "#DEFCFE",
    position: "absolute",
    right: 0,
    zIndex: 99,
    top: -3,
  },
  leftRightIcon: {
    width: 48,
    height: 48,
    resizeMode: "contain",
  },
  middleIcon: {
    width: 130,
    height: 73,
    resizeMode: "contain",
  },
});
