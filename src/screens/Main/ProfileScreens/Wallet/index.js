import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import ScreenWrapper from "../../../../components/ScreenWrapper";
import Header from "../../../../components/Header";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import TransactionCard from "./molecules/TransactionCard";
import { useFocusEffect } from "@react-navigation/native";
import { get } from "../../../../Services/ApiRequest";
import NoShow from "../../../../components/NoShow";

const Wallet = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState([]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await get("users/transactions");
      setTransaction(res.data.transactions);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreTransactions = async () => {
    if (transaction?.length > 0) {
      const lastTran = transaction[transaction?.length - 1]._id;
      console.log(lastTran);
      try {
        setLoading(true);
        const res = await get(`users/transactions/${lastTran}`);
        if (res.data.success) {
          const newTransactions = res.data.transactions;
          setTransaction([...transaction, ...newTransactions]);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchTransactions();
      return () => {};
    }, [])
  );

  // Calculate total earnings
  const totalEarnings = useMemo(() => {
    return transaction.reduce((total, item) => total + item.balance, 0);
  }, [transaction]);

  return (
    <ScreenWrapper
      paddingBottom={70}
      scrollEnabled
      headerUnScrollable={() => <Header title={"Wallet"} />}
    >
      <View style={styles.walletCard}>
        <CustomText label={"Your Earnings"} color={COLORS.white} />
        <CustomText
          label={`$${totalEarnings?.toFixed(2)}`}
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
      <FlatList
        data={transaction}
        keyExtractor={(_, index) => index.toString()}
        onEndReachedThreshold={0.2}
        onEndReached={() => fetchMoreTransactions()}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchTransactions} />
        }
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TransactionCard
              orderId={item?.order_id}
              detail={item?.description}
              amount={item?.balance}
            />
          );
        }}
        ListEmptyComponent={
          <NoShow
            marginTop={60}
            label={"You don’t have any active transactions"}
            label2={"Always keep yourself available to get new transactions"}
          />
        }
      />
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
