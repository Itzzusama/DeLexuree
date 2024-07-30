import { StyleSheet, View, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomHeader from "../../../components/CustomHeader";
import OrdersCard from "../../../components/OrdersCard";

import OrderStatusCard from "./OrderStatusCard";

import { className } from "../../../global-styles";
import { post, put } from "../../../Services/ApiRequest";
import { ToastMessage } from "../../../utils/ToastMessage";
import { useFocusEffect } from "@react-navigation/native";
import NoShow from "../../../components/NoShow";
const Order = () => {
  const status = [
    {
      id: "active",
      name: "Active",
    },
    {
      id: "completed",
      name: "Completed",
    },
    {
      id: "cancelled",
      name: "Cancelled",
    },
  ];

  const [selectedStatus, setSelectedStatus] = useState("active");
  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
  };

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      setLoading(true);
      const body = {
        status: selectedStatus == "active" ? "accepted" : selectedStatus,
        category: "",
        sub_cat: "",
      };
      const response = await post("order/employee/filter", body);
      setOrders(response.data?.orders);
      // console.log('res-------------', response.data?.orders);
    } catch (error) {
      console.log(error.response.data);
      ToastMessage(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (key, item) => {
    try {
      const response = await put(
        "order/employee/update/" + key + "/" + item?._id
      );
      if (response.data?.success) {
        ToastMessage(response.data?.message);
        getOrders();
        setSelectedStatus("completed");
      }
      console.log("res=====>", response.data);
    } catch (error) {
      console.log("errr---------", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getOrders();
    }, [selectedStatus])
  );
  return (
    <ScreenWrapper paddingHorizontal={0.1} paddingBottom={70}>
      <CustomHeader
        lable={"Jobs"}
        showIcon={false}
        customStyle={className("ml-5")}
      />
      <View
        style={className(
          "flex align-center justify-evenly bg-F8 rounded-8 my-4 mx-7 py-2.5"
        )}
      >
        {status.map((item, index) => (
          <OrderStatusCard
            key={index}
            name={item.name}
            selected={selectedStatus === item.id}
            onSelect={() => handleStatusSelect(item.id)}
            isFirst={index === 0}
            isLast={index === status.length - 1}
          />
        ))}
      </View>
      <View style={className("flex-1 bg-F8 px-4")}>
        <FlatList
          ListEmptyComponent={
            <NoShow
              label={`You don’t have any ${selectedStatus} jobs`}
              label2={"Always keep yourself available to get new jobs"}
            />
          }
          data={[1, 2, 3, 4, 5]}
          y
          keyExtractor={(item, index) => index.toLocaleString()}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={getOrders} />
          }
          renderItem={({ item }) => (
            <OrdersCard
              name={"Home Cleaning"}
              category={"Active"}
              img={
                "https://scrubnbubbles.com/wp-content/uploads/2020/07/how-to-keep-your-house-clean.jpg"
              }
              des={
                "Manages service requests and coordinates with teams to deliver exceptional service quality"
              }
              price={"200"}
              status={"Active"}
              item={item}
            />
          )}
        />
      </View>
    </ScreenWrapper>
  );
};

export default Order;

const styles = StyleSheet.create({});
