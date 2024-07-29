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
import { setUserData } from "../../../store/reducer/usersSlice";
import SearchBar from "../../../components/SearchBar";
import ServiceCard from "../../../components/ServiceCard";
import { Images } from "../../../assets/images";
import TopTab from "../../../components/TopTab";

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const [orders, setOrders] = useState([]);

  const { userData } = useSelector((state) => state.users);
  const getOrders = async () => {
    try {
      setLoading(true);
      const body = {
        status: "all",
        category: userData?.category,
        sub_cat: "",
      };
      const response = await post("order/employee/filter/", body);
      console.log("response: ", response.data);
      setOrders(response.data?.orders);
      ToastMessage(response?.data?.message);
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
      }
      console.log("res=====>", response.data);
    } catch (error) {
      console.log("errr---------", error);
    }
  };

  const getProfile = async () => {
    try {
      const response = await get("users/me");
      dispatch(setUserData(response.data?.user));
    } catch (error) {}
  };
  useFocusEffect(
    React.useCallback(() => {
      getOrders();
    }, [])
  );
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <ScreenWrapper
      paddingHorizontal={16}
      paddingBottom={70}
      backgroundColor={COLORS.white}
      headerUnScrollable={() => <Header />}
    >
      <SearchBar placeHolder={"Search"} backgroundColor={"#F5F9F8"} />
      <TopTab
        tabNames={["All", "Pending", "Completed", "Cancelled"]}
        tab={tab}
        setTab={setTab}
      />
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
        ListEmptyComponent={
          <NoShow
            label={"You don’t have any active jobs"}
            label2={"Always keep yourself available to get new jobs"}
          />
        }
        keyExtractor={(_, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getOrders} />
        }
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ServiceCard
            title={"House Cleaning Service"}
            description={"Includes dusting, vacuuming, etc."}
            date={"12/06/2024"}
            imageSource={Images.cardImage}
          />
        )}
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
