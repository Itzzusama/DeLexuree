import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

import ImageFast from "../../../../components/ImageFast";
import { Images } from "../../../../assets/images";
import { COLORS } from "../../../../utils/COLORS";
import { useSelector } from "react-redux";
import { className } from "../../../../global-styles";

const Header = ({ isNotification, userName }) => {
  const { userData } = useSelector((state) => state.users);
  const navigation = useNavigation();
  const unseen = useSelector((state) => state.noti.noti);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <ImageFast
          isView
          source={
            userData?.profilePicture
              ? { uri: userData?.profilePicture }
              : Images.user
          }
          style={styles.leftRightIcon}
        />
        <Image source={Images.logo} style={styles.middleIcon} />
        <View style={[styles.notiBg]}>
          {unseen > 0 && (
            <View
              style={[
                className(" align-center justify-center rounded-2 h-1.5 w-1.5"),
                {
                  right: 11,
                  bottom: 22,
                  position: "absolute",
                  zIndex: 10000,
                  backgroundColor: COLORS.red,
                },
              ]}
            />
          )}
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
          >
            <Image source={Images.noti} style={styles.noti} />
          </TouchableOpacity>
        </View>
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
    width: 40,
    height: 40,
    resizeMode: "contain",
    borderRadius: 40,
  },
  middleIcon: {
    width: 130,
    height: 73,
    resizeMode: "contain",
  },
  noti: {
    width: 19,
    height: 19,
    resizeMode: "contain",
  },
  notiBg: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    borderColor: "#ECEFF3",
    borderWidth: 1,
  },
});
