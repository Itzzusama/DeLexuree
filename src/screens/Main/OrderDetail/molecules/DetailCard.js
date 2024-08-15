import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import Icons from "../../../../components/Icons";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import TextSpaceBetween from "../../../../components/TextSpaceBetween";
import CustomButton from "../../../../components/CustomButton";
import { post, put } from "../../../../Services/ApiRequest";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { className } from "../../../../global-styles";
import { ToastMessage } from "../../../../utils/ToastMessage";

const DetailCard = ({
  imageUrl,
  orderName,
  review,
  totalRating,
  date,
  status,
  price,
  note,
  id,
}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const { userData } = useSelector((state) => state.users);
  const handlePress = async () => {
    setLoading(true);
    const order_status = status == "pending" ? "accepted" : "complete_request";
    console.log(order_status);
    try {
      const res = await put(`order/employee/update/${order_status}/${id}`);
      if (res.data.success) {
        navigation.goBack();
        ToastMessage(res.data.message);
      } else {
        ToastMessage(res.data.message);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const handleReject = async () => {
    setRejecting(true);
    try {
      const res = await put(`order/employee/update/rejected/${id}`);
      if (res.data.success) {
        navigation.goBack();
      } else {
        ToastMessage(res.data.message);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setRejecting(false);
    }
  };
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
        rightText={"Status"}
        marginTop={12}
      />
      <TextSpaceBetween
        leftText={date}
        rightText={status}
        rightColor={
          status == "pending"
            ? COLORS.primaryColor
            : status == "cancelled"
            ? COLORS.red
            : COLORS.green
        }
      />
      <TextSpaceBetween light leftText={"Customer Note"} marginTop={18} />
      <TextSpaceBetween leftText={note || "No provided note"} />
      <View style={styles.line} />

      <TextSpaceBetween light leftText={"Price"} rightText={`$${price}`} />
      <TextSpaceBetween
        light
        leftText={"Apps fee"}
        rightText={"$3"}
        marginTop={6}
      />
      <TextSpaceBetween
        leftText={"Total price"}
        rightText={`$${3 + price}`}
        marginTop={6}
      />
      <View style={className("flex align-center justify-between")}>
        {(status == "pending" || status == "accepted") && (
          <CustomButton
            title={status == "pending" ? "Accept" : "Complete Request"}
            marginTop={14}
            backgroundColor={"transparent"}
            customStyle={{
              borderWidth: 0.7,
              borderColor: COLORS.primaryColor,
              height: 50,
            }}
            color={COLORS.primaryColor}
            onPress={handlePress}
            loading={loading}
            disabled={loading}
            width={status == "pending" ? "47%" : "100%"}
          />
        )}
        {status == "pending" && (
          <CustomButton
            title={"Reject"}
            marginTop={14}
            backgroundColor={"transparent"}
            customStyle={{
              borderWidth: 0.7,
              borderColor: COLORS.red,
              height: 50,
            }}
            color={COLORS.red}
            onPress={handleReject}
            loading={rejecting}
            disabled={rejecting}
            width="47%"
          />
        )}
      </View>
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
