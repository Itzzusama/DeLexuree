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
import { formatTime } from "../../../utils/dateUtils";

const Notifications = ({ navigation }) => {
  const handleNavigation = async (item) => {
    const dataToSend = {
      id: item?.otherUser?._id,
      img: item?.otherUser?.profilePicture,
      name: item?.otherUser?.name,
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
      scrollEnabled
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
        data={messagesArray}
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
            lastMsg={item?.lastMsg?.message}
            userName={item?.otherUser?.name}
            count={item?.unseen}
            time={formatTime(item?.lastMsg?.createdAt)}
            lastSeen={item?.lastMsg?.seen}
            img={item?.otherUser?.profilePicture}
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
