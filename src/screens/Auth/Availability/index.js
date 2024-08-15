import React, { useEffect, useState } from "react";
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
import { ToastMessage } from "../../../utils/ToastMessage";
import { post, put } from "../../../Services/ApiRequest";
import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setToken } from "../../../store/reducer/AuthConfig";
import { setUserData } from "../../../store/reducer/usersSlice";

const Availability = ({ navigation }) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const { showSkip, body } = route.params || {};
  const { userData } = useSelector((state) => state.users);
  const [loading, setLoading] = useState(false);
  const initialAvailability = {
    Monday: { active: false, from: new Date(), to: new Date() },
    Tuesday: { active: false, from: new Date(), to: new Date() },
    Wednesday: { active: false, from: new Date(), to: new Date() },
    Thursday: { active: false, from: new Date(), to: new Date() },
    Friday: { active: false, from: new Date(), to: new Date() },
    Saturday: { active: false, from: new Date(), to: new Date() },
    Sunday: { active: false, from: new Date(), to: new Date() },
  };
  const [availability, setAvailability] = useState(initialAvailability);

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

  const saveAvailability = async () => {
    setLoading(true);
    const selectedAvailability = Object.keys(availability).map((day) => {
      return {
        start_time: availability[day].active
          ? availability[day].from.toISOString()
          : null,
        end_time: availability[day].active
          ? availability[day].to.toISOString()
          : null,
        day: day.slice(0, 3), // Get the first three letters of the day (e.g., "Mon")
        status: availability[day].active,
      };
    });

    if (selectedAvailability?.length === 0) {
      ToastMessage("Please select at least one day with a time range.");
      setLoading(false);
      return;
    } else {
      if (showSkip) {
        console.log("creating acc");
        try {
          const apiBody = {
            ...body,
            availablity: selectedAvailability,
          };
          console.log(apiBody);
          const response = await post("users/signup/employee", apiBody);

          if (response.data.success) {
            console.log(response.data);
            await AsyncStorage.setItem("token", response.data?.token);
            dispatch(setToken(response.data?.token));
            dispatch(setUserData(response.data?.user));
            navigation.reset({
              index: 0,
              routes: [{ name: "MainStack" }],
            });
          }
        } catch (err) {
          console.log(err);
          //ToastMessage(err?.response?.data?.error);
        } finally {
          setLoading(false);
        }
      } else {
        const ApiData = {
          availablity: selectedAvailability,
        };
        try {
          const res = await put("users/update-user", ApiData);
          if (res.data.success) {
            navigation.reset({
              index: 0,
              routes: [{ name: "MainStack" }],
            });
          }
        } catch (err) {
          console.log("--", err);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    if (userData?.availablity) {
      const updatedAvailability = { ...initialAvailability };

      userData.availablity.forEach((day) => {
        // Map the day abbreviation to full day name
        const fullDayName = daysOfWeek.find((d) =>
          d.startsWith(day.day.charAt(0).toUpperCase() + day.day.slice(1))
        );

        if (fullDayName) {
          const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in "YYYY-MM-DD" format
          updatedAvailability[fullDayName] = {
            active: day.status,
            from: day.start_time
              ? new Date(day.start_time)
              : new Date(`${currentDate}T09:00:00`),
            to: day.end_time
              ? new Date(day.end_time)
              : new Date(`${currentDate}T17:00:00`),
          };
        }
      });

      setAvailability(updatedAvailability);
    }
  }, [userData]);

  return (
    <ScreenWrapper
      scrollEnabled
      paddingHorizontal={14}
      footerUnScrollable={() => (
        <>
          <CustomButton
            width="90%"
            marginBottom={12}
            title={showSkip ? "Create Account" : "Save"}
            onPress={saveAvailability}
            loading={loading}
            disabled={loading}
          />
        </>
      )}
    >
      <AuthWrapper
        heading="Set Availability"
        desc="Let us know your available times."
        showStatus={showSkip ? true : false}
        index={3}
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
