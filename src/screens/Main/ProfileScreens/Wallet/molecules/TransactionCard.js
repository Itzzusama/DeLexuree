import { StyleSheet, View } from "react-native";
import React from "react";
import CustomText from "../../../../../components/CustomText";
import { COLORS } from "../../../../../utils/COLORS";

const TransactionCard = ({ detail, amount, orderId }) => {
  const isCredited = amount > 0;

  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CustomText textStyle={[styles.amountText]}>#{orderId}</CustomText>

        <View style={styles.amountContainer}>
          <CustomText textStyle={[styles.amountText, styles.credited]}>
            ${amount}
          </CustomText>
        </View>
      </View>
      <View style={styles.detailContainer}>
        <CustomText style={styles.detailText}>{detail}</CustomText>
      </View>
    </View>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({
  card: {
    padding: 12,
    paddingVertical: 18,
    borderRadius: 8,
    backgroundColor: COLORS.mainBg,
    // shadowColor: "#000",
    // shadowOpacity: 0.1,
    // shadowRadius: 10,
    // elevation: 1,
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
