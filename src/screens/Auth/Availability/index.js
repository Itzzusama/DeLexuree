import React, { useState } from "react";
import { StyleSheet, View, Text, Switch, FlatList } from "react-native";

import { COLORS } from "../../../utils/COLORS";
import ScreenWrapper from "../../../components/ScreenWrapper";
import fonts from "../../../assets/fonts";
import AuthWrapper from "../../../components/AuthWrapper";
import CustomButton from "../../../components/CustomButton";

const Availability = ({ navigation }) => {
  const [availability, setAvailability] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });

  const toggleSwitch = (day) => {
    setAvailability({ ...availability, [day]: !availability[day] });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.dayText}>{item}</Text>
      <Switch
        value={availability[item]}
        onValueChange={() => toggleSwitch(item)}
      />
    </View>
  );

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <ScreenWrapper
      scrollEnabled
      paddingHorizontal={14}
      footerUnScrollable={() => (
        <>
          <CustomButton
            width="90%"
            marginBottom={12}
            title={"Skip for now"}
            backgroundColor={"transparent"}
            color={COLORS.primaryColor}
            customStyle={{ borderWidth: 1, borderColor: COLORS.primaryColor }}
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: "MainStack",
                  },
                ],
              })
            }
          />
          <CustomButton
            width="90%"
            marginBottom={12}
            title={"Save"}
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: "MainStack",
                  },
                ],
              })
            }
          />
        </>
      )}
    >
      <AuthWrapper
        heading="Set Availability"
        desc="Let us know your available times."
      >
        <FlatList
          data={daysOfWeek}
          renderItem={renderItem}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.listContainer}
        />
      </AuthWrapper>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    paddingVertical: 15,
    elevation: 1.5,
    backgroundColor: "white",
    marginBottom: 18,
    borderRadius: 7,
  },
  dayText: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: COLORS.black,
  },
});

export default Availability;
