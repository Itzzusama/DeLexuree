import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Icons from "../../../../components/Icons";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import TextSpaceBetween from "../../../../components/TextSpaceBetween";

const DetailCard = ({ imageUrl, orderName, review, totalRating }) => {
  return (
    <View
      style={{
        padding: 12,
        borderWidth: 0.5,
        borderRadius: 8,
        borderColor: COLORS.gray,
        marginTop: 12,
      }}
    >
      <View style={styles.container}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View style={styles.textContainer}>
          <CustomText
            style={styles.orderName}
            label={orderName}
            fontFamily={fonts.bold}
          />
          <View style={styles.reviewContainer}>
            <Icons name="star" size={16} color="gold" style={styles.starIcon} />
            <CustomText
              style={styles.review}
              label={review}
              color={COLORS.gold}
            />
            <CustomText
              style={styles.review}
              label={totalRating}
              color={COLORS.gray}
            />
          </View>
        </View>
      </View>
      <TextSpaceBetween
        light
        leftText={"Date Booking"}
        rightText={"Package"}
        marginTop={12}
      />
      <TextSpaceBetween leftText={"July 29, 2022"} rightText={"Standard"} />
      <TextSpaceBetween
        light
        leftText={"Worker"}
        rightText={"Status"}
        marginTop={18}
      />
      <TextSpaceBetween
        leftText={"Mrs. Dorothy Wiegand"}
        rightText={"Completed"}
        rightColor={COLORS.green}
      />
      <View style={styles.line} />

      <TextSpaceBetween light leftText={"Price"} rightText={"$39.00"} />
      <TextSpaceBetween
        light
        leftText={"Apps fee"}
        rightText={"$2.50"}
        marginTop={6}
      />
      <TextSpaceBetween
        leftText={"Total price"}
        rightText={"$41.50"}
        marginTop={6}
      />
      <View style={styles.line} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CustomText
          label={"Review for Service Provier"}
          fontFamily={fonts.bold}
        />
        <Icons name={"chevron-forward"} family={"Ionicons"} />
      </View>
      <View style={styles.reviewContainer}>
        <Icons name="star" size={16} color="gold" style={styles.starIcon} />
        <CustomText
          style={styles.review}
          label={review}
          color={COLORS.gold}
          fontSize={12}
        />
        <CustomText
          style={styles.review}
          label={totalRating}
          color={COLORS.gray}
          fontSize={12}
        />
      </View>
      <CustomText
        marginTop={4}
        label={
          "Delivered exceptional cleaning services tailored to your specific needs."
        }
      />
    </View>
  );
};

export default DetailCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  image: {
    width: 66,
    height: 66,
    marginRight: 10,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },

  reviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginTop: 4,
  },

  starIcon: {
    marginRight: 5,
  },
  rating: {
    fontSize: 14,
    color: "#555",
  },
  line: {
    height: 0.4,
    marginVertical: 26,
    backgroundColor: COLORS.gray,
  },
});
