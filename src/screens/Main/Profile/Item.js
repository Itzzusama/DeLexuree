import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../../../utils/COLORS";
import { Images } from "../../../assets/images";
import Icons from "../../../components/Icons";

const Item = ({ name, source, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={styles.container}
    >
      <Image source={source} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <TouchableOpacity>
        <Icons
          name={"chevron-forward"}
          family={"Ionicons"}
          size={20}
          color={COLORS.gray}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 10,
    tintColor: COLORS.black,
  },
  name: {
    flex: 1,
    fontSize: 16,
    color: COLORS.black,
  },
  forwardIcon: {
    width: 24,
    height: 24,
  },
});
