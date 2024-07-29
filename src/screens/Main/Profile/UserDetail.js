import { StyleSheet, View } from "react-native";
import React from "react";
import ImageFast from "../../../components/ImageFast";
import CustomText from "../../../components/CustomText";
import { className } from "../../../global-styles";
import fonts from "../../../assets/fonts";
import { COLORS } from "../../../utils/COLORS";

const UserDetail = ({ name, email, avatar }) => {
  return (
    <View style={styles.container}>
      <ImageFast isView source={avatar} style={styles.avatar} />
      <View style={{marginLeft:12}}>
        <CustomText
          label={name}
          fontSize={18}
          fontFamily={fonts.bold}
          color={COLORS[22]}
          style={styles.name}
        />
        <CustomText
          label={email}
          fontSize={14}
          fontFamily={fonts.medium}
          color={COLORS.authText}
          style={styles.email}
        />
      </View>
    </View>
  );
};

export default UserDetail;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    marginTop: 26,
  },
  avatar: {
    height: 58,
    width: 58,
    borderRadius: 99,
  },
  name: {
    marginTop: 10,
  },
  email: {
    marginTop: 4,
  },
});
