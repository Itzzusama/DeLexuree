import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Switch,
  FlatList,
  TouchableOpacity,
} from "react-native";
import DatePicker from "react-native-date-picker";
import { COLORS } from "../../../utils/COLORS";
import ScreenWrapper from "../../../components/ScreenWrapper";
import fonts from "../../../assets/fonts";
import AuthWrapper from "../../../components/AuthWrapper";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";

const Availability = ({ navigation }) => {
  const [availability, setAvailability] = useState({
    Monday: { active: false, from: new Date(), to: new Date() },
    Tuesday: { active: false, from: new Date(), to: new Date() },
    Wednesday: { active: false, from: new Date(), to: new Date() },
    Thursday: { active: false, from: new Date(), to: new Date() },
    Friday: { active: false, from: new Date(), to: new Date() },
    Saturday: { active: false, from: new Date(), to: new Date() },
    Sunday: { active: false, from: new Date(), to: new Date() },
  });

  const [openFromPicker, setOpenFromPicker] = useState(false);
  const [openToPicker, setOpenToPicker] = useState(false);
  const [currentDay, setCurrentDay] = useState(null);

  const toggleSwitch = (day) => {
    setAvailability({
      ...availability,
      [day]: { ...availability[day], active: !availability[day].active },
    });
  };

  const handleFromTimeChange = (day, date) => {
    setAvailability({
      ...availability,
      [day]: { ...availability[day], from: date },
    });
  };

  const handleToTimeChange = (day, date) => {
    setAvailability({
      ...availability,
      [day]: { ...availability[day], to: date },
    });
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        padding: 12,
        paddingVertical: 15,
        elevation: 1.5,
        backgroundColor: "white",
        marginBottom: 18,
        borderRadius: 7,
      }}
    >
      <View style={styles.itemContainer}>
        <Text style={styles.dayText}>{item}</Text>
        <Switch
          value={availability[item].active}
          onValueChange={() => toggleSwitch(item)}
        />
      </View>
      {availability[item].active && (
        <View style={styles.timeContainer}>
          <TouchableOpacity
            style={styles.timeBox}
            onPress={() => {
              setCurrentDay(item);
              setOpenFromPicker(true);
            }}
          >
            <CustomText>
              {availability[item].from.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </CustomText>
          </TouchableOpacity>
          <CustomText label={"To"} />
          <TouchableOpacity
            style={styles.timeBox}
            onPress={() => {
              setCurrentDay(item);
              setOpenToPicker(true);
            }}
          >
            <CustomText>
              {availability[item].to.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </CustomText>
          </TouchableOpacity>
        </View>
      )}
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
        {openFromPicker && (
          <DatePicker
            modal
            open={openFromPicker}
            date={availability[currentDay].from}
            onConfirm={(date) => {
              setOpenFromPicker(false);
              handleFromTimeChange(currentDay, date);
            }}
            onCancel={() => {
              setOpenFromPicker(false);
            }}
            mode="time"
          />
        )}
        {openToPicker && (
          <DatePicker
            modal
            open={openToPicker}
            date={availability[currentDay].to}
            onConfirm={(date) => {
              setOpenToPicker(false);
              handleToTimeChange(currentDay, date);
            }}
            onCancel={() => {
              setOpenToPicker(false);
            }}
            mode="time"
          />
        )}
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
  },
  dayText: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: COLORS.black,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    justifyContent: "space-between",
    paddingHorizontal: 14,
  },
  timeText: {
    fontSize: 14,
  },
  timeBox: {
    padding: 10,
    borderRadius: 6,
    borderWidth: 0.3,
    paddingHorizontal: 16,
  },
});

export default Availability;
