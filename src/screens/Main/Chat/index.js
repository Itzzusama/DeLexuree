import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import React, { useState } from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";

import Header from "../../../components/Header";
import SearchBar from "../../../components/SearchBar";

import Item from "./molecules/Item";

import { COLORS } from "../../../utils/COLORS";
import { get } from "../../../Services/ApiRequest";
import { useFocusEffect } from "@react-navigation/native";
import NoShow from "../../../components/NoShow";

const Notifications = ({ navigation }) => {
  const handleNavigation = async (item) => {
    const dataToSend = {
      id: item?.otherUser?._id,
      img: item?.otherUser?.profilePicture,
      name: item?.otherUser?.fname + " " + item?.otherUser?.lname,
      type: item?.otherUser?.type,
    };
    navigation.navigate("InboxScreen", { data: dataToSend });
  };
  const [messagesArray, setMessagesArray] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getConversationList = async () => {
    setRefreshing(true);
    try {
      const response = await get("msg/conversations");
      // console.log('rhis i', response.data?.conversations);
      setMessagesArray(response.data?.conversations);
    } catch (error) {
      console.log("hhhhhhhh==========");
    } finally {
      setRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getConversationList();
    }, [])
  );
  return (
    <ScreenWrapper
      paddingBottom={70}
      backgroundColor={COLORS.white}
      paddingHorizontal={14}
      headerUnScrollable={() => <Header title="Chat" />}
    >
      <View style={{ marginVertical: 12 }} />
      <SearchBar placeHolder={"Search"} backgroundColor={"#F5F9F8"} />

      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getConversationList}
          />
        }
        data={[1, 2, 3, 4, 5, 6]}
        ListEmptyComponent={() => (
          <NoShow
            label="You have not received any messages"
            label2="All messages will appear here."
          />
        )}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Item
            onPress={() => handleNavigation(item)}
            lastMsg={
              "Turpis lectus egestas dui proin natoque nulla egestas fames molestie."
            }
            userName={"Wade Warren"}
            count={1}
          />
        )}
      />
    </ScreenWrapper>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  heading: {
    padding: 15,
  },
});
