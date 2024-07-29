import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import React from "react";
import ServiceCard from "../../../../components/ServiceCard";
import { Images } from "../../../../assets/images";
import NoShow from "../../../../components/NoShow";
import ScreenWrapper from "../../../../components/ScreenWrapper";
import Header from "../../../../components/Header";

const PastBooking = () => {
  return (
    <ScreenWrapper
      paddingHorizontal={1}
      headerUnScrollable={() => <Header title={"Past Booking"} />}
    >
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
        ListEmptyComponent={
          <NoShow
            label={"You don’t have any active jobs"}
            label2={"Always keep yourself available to get new jobs"}
          />
        }
        keyExtractor={(_, index) => index.toString()}
        refreshControl={<RefreshControl />}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ServiceCard
            past
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

export default PastBooking;

const styles = StyleSheet.create({});
