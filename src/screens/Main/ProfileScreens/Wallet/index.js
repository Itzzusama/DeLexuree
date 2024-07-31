import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import ScreenWrapper from "../../../../components/ScreenWrapper";
import Header from "../../../../components/Header";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import TransactionCard from "./molecules/TransactionCard";

const Wallet = ({ navigation }) => {
  const transaction = [
    {
      id: 1,
      detail: "Book Purchased Successfully",
      price: 100,
    },
    {
      id: 2,
      detail: "Car Purchased",
      price: -20,
    },
    {
      id: 3,
      detail: "Account Credited",
      price: 30,
    },
    {
      id: 4,
      detail: "Account Debited",
      price: -39,
    },
    {
      id: 5,
      detail: "Account Credited",
      price: 46,
    },
  ];

  return (
    <ScreenWrapper
      paddingBottom={70}
      scrollEnabled
      headerUnScrollable={() => <Header title={"Wallet"} />}
    >
      <View style={styles.walletCard}>
        <CustomText label={"Your Earning"} color={COLORS.white} />
        <CustomText
          label={"$1340.56"}
          fontSize={34}
          fontFamily={fonts.bold}
          color={COLORS.white}
        />
      </View>

      <CustomText
        label={"Transaction history"}
        fontFamily={fonts.bold}
        fontSize={16}
      />
      {transaction.map((item) => (
        <TransactionCard
          key={item.id}
          detail={item.detail}
          amount={item.price}
        />
      ))}
    </ScreenWrapper>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  walletCard: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    backgroundColor: COLORS.primaryColor,
    borderRadius: 20,
    marginVertical: 16,
  },
});
