import { StyleSheet } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { ToastMessage } from "../../../utils/ToastMessage";

import { put } from "../../../Services/ApiRequest";
import Header from "../../../components/Header";
import DetailCard from "./molecules/DetailCard";
import CustomerCard from "./molecules/CustomerCard";
const OrderDetail = ({ route, navigation }) => {
  const details = route.params?.details;

  const updateOrderStatus = async (key) => {
    console.log("key--", key);
    try {
      const response = await put(
        "order/employee/update/" + key + "/" + details?._id
      );
      if (response.data?.success) {
        ToastMessage(response.data?.message);
        navigation.goBack();
      }
      console.log("res=====>", response.data);
    } catch (error) {
      console.log("errr---------", error);
    }
  };

  const handleNavigation = async (item) => {
    const dataToSend = {
      id: item?.user?._id,
      img: item?.user?.profilePicture,
      name: item?.user?.fname + " " + item?.user?.lname,
      type: item?.user?.type,
    };
    navigation.navigate("InboxScreen", { data: dataToSend });
  };
  return (
    <ScreenWrapper
      scrollEnabled={true}
      paddingHorizontal={18}
      paddingBottom={12}
      headerUnScrollable={() => <Header title={"Details"} />}
    >
      <DetailCard
        orderName={"Home Cleaning Service"}
        review={"4.4 "}
        totalRating={"(532)"}
        imageUrl={
          "https://scrubnbubbles.com/wp-content/uploads/2020/07/how-to-keep-your-house-clean.jpg"
        }
      />
      <CustomerCard />

      {/* {details?.status == "pending" ? (
        <View style={className("mx-5 mt-10")}>
          <CustomButton
            title={"Accept"}
            onPress={() => updateOrderStatus("accepted")}
            textStyle={{ fontSize: 16, fontFamily: fonts.regular }}
          />
          <CustomButton
            title={"Reject"}
            textStyle={{ fontSize: 16, fontFamily: fonts.regular }}
            customStyle={className("bg-9F mt-2")}
            onPress={() => updateOrderStatus("rejected")}
          />
        </View>
      ) : null} */}
    </ScreenWrapper>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({});
