import { StyleSheet } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { ToastMessage } from "../../../utils/ToastMessage";

import { put } from "../../../Services/ApiRequest";
import Header from "../../../components/Header";
import DetailCard from "./molecules/DetailCard";
import CustomerCard from "./molecules/CustomerCard";
import { useRoute } from "@react-navigation/native";
import { COLORS } from "../../../utils/COLORS";
import { formatDate, formatTime } from "../../../utils/dateUtils";
const OrderDetail = ({ navigation }) => {
  const route = useRoute();
  const { detail } = route.params;

  const onChatPress = async (item) => {
    const dataToSend = {
      id: detail?.user?._id,
      img: detail?.user?.profilePicture,
      name: detail?.user?.name,
      type: detail?.user?.type,
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
        orderName={detail?.service?.title}
        review={detail?.service?.rating?.toFixed(1)}
        totalRating={` (${detail?.service?.totalRating})`}
        imageUrl={
          detail?.service?.images[0] ||
          "https://scrubnbubbles.com/wp-content/uploads/2020/07/how-to-keep-your-house-clean.jpg"
        }
        date={formatDate(detail?.date)}
        status={detail?.status}
        price={detail?.service?.price}
        note={detail?.note}
        id={detail?._id}
      />
      <CustomerCard
        imageUrl={detail?.user?.profilePicture}
        name={detail?.user?.name}
        date={formatDate(detail?.date)}
        time={formatTime(detail?.time)}
        // address={detail?.location?.address}
        description={detail?.user?.email}
        onChatPress={onChatPress}
        state={detail?.state}
        city={detail?.city}
        street={detail?.street}
        apartmentnumber={detail?.apartmentnumber}
        zip={detail?.zip}
      />
    </ScreenWrapper>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({});
