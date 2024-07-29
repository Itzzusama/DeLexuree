import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

import fonts from "../assets/fonts";
import { COLORS } from "../utils/COLORS";
import Icons from "./Icons";
import CustomText from "./CustomText";

const ServiceCard = ({
  imageSource,
  title,
  description,
  date,
  onOpenMaps,
  past,
}) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.footer}>
          <Text style={styles.date}>{date}</Text>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.mapContainer}
            onPress={onOpenMaps}
          >
            <Icons
              name={past ? "text-document" : "map"}
              family={"Entypo"}
              color={COLORS.white}
            />
            <CustomText
              fontFamily={fonts.bold}
              color={COLORS.white}
              marginLeft={4}
              fontSize={12}
            >
              {past ? "Details" : "Open Maps"}
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    elevation: 0.4,
    marginBottom: 8,
  },
  image: {
    width: 88,
    height: 88,
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 14,
    fontFamily: fonts.bold,
    color: COLORS.black,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: COLORS.black,
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    fontSize: 12,
    fontFamily: fonts.semiBold,
    color: "#5C7D72",
  },
  openMaps: {
    fontSize: 12,
    fontFamily: fonts.medium,
    color: COLORS.primary,
  },
  mapContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#769C8F",
    padding: 4,
    borderRadius: 6,
    paddingHorizontal: 8,
  },
});
