import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React from "react";

import CustomText from "../../../../components/CustomText";

import { Images } from "../../../../assets/images";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const Item = ({
  source = Images.user,
  count = "",
  onPress,
  lastMsg,
  name,
  userName,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={styles.mainContainer}
    >
      <View style={styles.imageContainer}>
        <Image source={source} style={styles.image} resizeMode="contain" />
      </View>

      <View style={{ width: "83%" }}>
        <View style={styles.container}>
          <CustomText label={userName} fontFamily={fonts.medium} />
          <CustomText label="12.45" fontSize={12} color={COLORS.authText} />
        </View>
        <View style={{ flexDirection: "row", width: "97%", marginTop: 3 }}>
          <CustomText
            label={lastMsg}
            fontFamily={fonts.medium}
            fontSize={12}
            numberOfLines={1}
          />
          {count && (
            <View style={styles.countStyle}>
              <CustomText
                label={count}
                fontFamily={fonts.semiBold}
                fontSize={12}
                color={COLORS.white}
              />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Item;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBlockColor: COLORS.lightGray,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
  },
  imageContainer: {
    width: 48,
    height: 48,
    borderRadius: 100,
    backgroundColor: COLORS.lightGray,
    // padding: 2,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  countStyle: {
    width: 20,
    height: 20,
    borderRadius: 100,
    backgroundColor: "#5C7D72",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 22,
  },
});
