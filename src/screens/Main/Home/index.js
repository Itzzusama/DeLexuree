import { StyleSheet, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";

import Header from "./molecules/Header";

import { COLORS } from "../../../utils/COLORS";
import { useDispatch, useSelector } from "react-redux";
import { get, post, put } from "../../../Services/ApiRequest";
import { ToastMessage } from "../../../utils/ToastMessage";
import { useFocusEffect } from "@react-navigation/native";
import NoShow from "../../../components/NoShow";
import SearchBar from "../../../components/SearchBar";
import ServiceCard from "../../../components/ServiceCard";
import { Images } from "../../../assets/images";
import TopTab from "../../../components/TopTab";
import { formatDate } from "../../../utils/dateUtils";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("Pending");
  const [orders, setOrders] = useState([]);

  const { userData } = useSelector((state) => state.users);

  const getOrders = async () => {
    const status =
      tab === "Pending" ? "all" : tab === "Accepted" ? "accepted" : "completed";
    try {
      setLoading(true);
      const body = {
        status: status,
        //category: userData?.category,
        sub_cat: "",
      };
      const response = await post("order/employee/filter/", body);
      setOrders(response.data?.orders);
    } catch (error) {
      console.log(error.response?.data);
      ToastMessage(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getOrders(); //
  }, [tab]);
  return (
    <ScreenWrapper
      paddingHorizontal={16}
      paddingBottom={70}
      backgroundColor={COLORS.white}
      headerUnScrollable={() => <Header />}
    >
      <TopTab
        tabNames={["Pending", "Accepted", "Completed"]}
        tab={tab}
        setTab={setTab}
        getOrders={getOrders}
      />
      <FlatList
        data={orders}
        keyExtractor={(_, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getOrders} />
        }
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          let isPaid =
            item?.transaction && typeof item.transaction === "object";
          return (
            <ServiceCard
              title={item?.service?.title}
              description={item?.service?.description}
              date={formatDate(item?.date)}
              imageSource={item?.service?.images[0]}
              status={item?.status}
              isPaid={isPaid}
              onOpenMaps={() => navigation.navigate("Maps", { detail: item })}
              onCardPress={() =>
                navigation.navigate("OrderDetail", {
                  detail: item,
                })
              }
            />
          );
        }}
        ListEmptyComponent={
          !loading && (
            <NoShow
              label={"You don’t have any active orders"}
              label2={"Always keep yourself available to get new orders"}
            />
          )
        }
      />
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 25,
    backgroundColor: COLORS.mainBg,
    elevation: 3,
  },
});
