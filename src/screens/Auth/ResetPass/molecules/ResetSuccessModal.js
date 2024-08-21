import { StyleSheet, View } from "react-native";
import React from "react";

import CustomButton from "../../../../components/CustomButton";
import CustomModal from "../../../../components/CustomModal";
import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";

import { Images } from "../../../../assets/images";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const ResetSuccessModal = ({ isVisible, onDisable }) => {
  return (
    <CustomModal isVisible={isVisible} onDisable={onDisable}>
      <View style={styles.mainContainer}>
        <ImageFast
          source={Images.success}
          style={styles.image}
          resizeMode="contain"
        />
        <CustomText
          label="resSuccess"
          fontFamily={fonts.bold}
          fontSize={22}
          textAlign="center"
          marginTop={20}
          marginBottom={20}
        />
        <CustomButton
          title="Go To Home"
          marginBottom={10}
          onPress={onDisable}
        />
      </View>
    </CustomModal>
  );
};

export default ResetSuccessModal;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.white,
    padding: 30,
    borderRadius: 20,
    width: "94%",
    alignSelf: "center",
    // borderTopRightRadius: 20,
    // borderTopLeftRadius: 20,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    tintColor: COLORS.primaryColor,
  },
});
