import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import Icons from "../../../../components/Icons";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import TextSpaceBetween from "../../../../components/TextSpaceBetween";
import { Images } from "../../../../assets/images";

const CustomerCard = ({
  imageUrl = "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
  name = "Alicent Hightower",
  description = "Standard Package (Home Cleaning)",
  onChatPress,
}) => {
  return (
    <View
      style={{
        padding: 12,
        borderWidth: 0.5,
        borderRadius: 8,
        borderColor: COLORS.gray,
        marginTop: 18,
      }}
    >
      <View style={styles.container}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <View style={styles.textContainer}>
          <CustomText
            style={styles.name}
            label={name}
            fontFamily={fonts.bold}
          />
          <CustomText
            style={styles.description}
            label={description}
            color={COLORS.gray}
            fontSize={12}
          />
        </View>
        <TouchableOpacity onPress={onChatPress} style={styles.chatButton}>
          <Icons
            name="message-square"
            family={"Feather"}
            size={24}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
      <TextSpaceBetween
        light
        customStyle={styles.timeContainer}
        leftImage={Images.calender}
        rightImage={Images.clock}
        leftText={"Monday, May 12"}
        rightText={"11:00 - 12:00 Am"}
      />
      <CustomText
        label={"Address"}
        marginTop={12}
        fontFamily={fonts.bold}
        fontSize={12}
      />
      <CustomText
        label={"5th avenue, apartment 456, New York, USA"}
        fontSize={12}
      />
      <CustomText
        label={"Details"}
        marginTop={18}
        fontFamily={fonts.bold}
        fontSize={12}
      />
      <CustomText
        label={
          "Clean home is a happy home, and we take pride in delivering exceptional cleaning services tailored to your specific needs."
        }
        fontSize={12}
      />
    </View>
  );
};

export default CustomerCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 99,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
  chatButton: {
    padding: 8,
  },
  timeContainer: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#E5F1ED",
  },
});