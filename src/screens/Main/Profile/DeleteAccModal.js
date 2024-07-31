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

const DeleteAccModal = ({ isVisible, onDisable, StayLoggedIn }) => {
  return (
    <CustomModal isChange isVisible={isVisible} onDisable={StayLoggedIn}>
      <View style={styles.mainContainer}>
        <View style={className("flex align-center align-self-center justify-between mt-4 mb-6")}>
          <CustomText
            label="Are you sure you want to Delete Account?"
            fontFamily={fonts.boldExtra}
            fontSize={16}
            textAlign="center"
          />
        </View>

        <CustomButton
          title="No,Go Back"
          marginBottom={10}
          onPress={StayLoggedIn}
        />
        <CustomButton
          title="Yes, Delete Account"
          marginBottom={10}
          onPress={onDisable}
          customStyle={className("bg-white bor-1 border-danger h-14")}
          customText={className("text-danger")}
        />
      </View>
    </CustomModal>
  );
};

export default DeleteAccModal;

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
