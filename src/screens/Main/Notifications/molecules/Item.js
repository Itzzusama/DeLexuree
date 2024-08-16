import { StyleSheet, View, Image, Pressable } from "react-native";
import React from "react";

import CustomText from "../../../../components/CustomText";

import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";
import { useNavigation } from "@react-navigation/native";

const Item = ({ source, title, description, time }) => {
  const navigation = useNavigation();
  const onPress = () => {
    if (title == "Job Offer") {
      navigation.navigate("TabStack");
    } else if (title == "New Message") {
      navigation.navigate("TabStack", { screen: "Message" });
    }
  };
  return (
    <Pressable style={styles.mainContainer} onPress={onPress}>
      <Image source={source} style={styles.image} resizeMode="contain" />

      <View style={{ width: "87%" }}>
        <View style={styles.container}>
          <CustomText label={title} fontFamily={fonts.medium} />
        </View>
        <CustomText label={description} fontSize={14} color={COLORS.authText} />
        <CustomText
          label={time}
          marginTop={10}
          fontSize={12}
          color={COLORS.authText}
        />
      </View>
    </Pressable>
  );
};

export default Item;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    padding: 20,
    paddingHorizontal: 1,
    borderBottomWidth: 0.5,
    borderBlockColor: COLORS.gray,
    flexDirection: "row",
    //alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 37,
    height: 37,
    tintColor: COLORS.primaryColor,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
