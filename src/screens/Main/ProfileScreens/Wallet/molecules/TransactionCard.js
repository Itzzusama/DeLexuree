import { StyleSheet, View } from "react-native";
import React from "react";
import CustomText from "../../../../../components/CustomText";

const TransactionCard = ({ detail, amount }) => {
  const isCredited = amount > 0;

  return (
    <View style={styles.card}>
      <View style={styles.detailContainer}>
        <CustomText style={styles.detailText}>{detail}</CustomText>
      </View>
      <View style={styles.amountContainer}>
        <CustomText
          textStyle={[
            styles.amountText,
            isCredited ? styles.credited : styles.debited,
          ]}
        >
          {isCredited ? `+${amount}` : `${amount}`}
        </CustomText>
      </View>
    </View>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    paddingVertical: 18,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 1,
    marginVertical: 5,
  },
  detailContainer: {
    flex: 1,
  },
  amountContainer: {
    marginLeft: 10,
  },
  detailText: {
    fontSize: 16,
    color: "#333",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  credited: {
    color: "green",
  },
  debited: {
    color: "red",
  },
});
