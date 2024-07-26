import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";

import CustomButton from "../../../components/CustomButton";
import CustomModal from "../../../components/CustomModal";
import CustomText from "../../../components/CustomText";
import ImageFast from "../../../components/ImageFast";

import { Images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import { className } from "../../../global-styles";

const LogoutModal = ({ isVisible, onDisable, StayLoggedIn }) => {
  return (
    <CustomModal isChange isVisible={isVisible} onDisable={StayLoggedIn}>
      <View style={styles.mainContainer}>
        <View style={className("flex align-center justify-between mt-2 mb-10")}>
          <View />
          <CustomText
            label="On-Site/Remote"
            fontFamily={fonts.boldExtra}
            fontSize={16}
            textAlign="center"
          />
          <TouchableOpacity onPress={StayLoggedIn}>
            <ImageFast
              source={Images.cross}
              style={styles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <CustomButton
          title="No,Stay Logged In"
          marginBottom={10}
          onPress={StayLoggedIn}
        />
        <CustomButton
          title="Yes, Log out"
          marginBottom={10}
          onPress={onDisable}
          customStyle={className("bg-white bor-1 border-danger h-14")}
          customText={className("text-danger")}
        />
      </View>
    </CustomModal>
  );
};

export default LogoutModal;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    //alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 25,
    height: 25,
  },
});
