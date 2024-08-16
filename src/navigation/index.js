import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

//screens
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text } from "react-native";
import { COLORS } from "../utils/COLORS";
import { setModal } from "../store/reducer/AuthConfig";
import CustomModal from "../components/CustomModal";
import CustomText from "../components/CustomText";
import fonts from "../assets/fonts";
import { className } from "../global-styles";
import CustomButton from "../components/CustomButton";

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const { token, modal } = useSelector((state) => state.authConfigs);

  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        {token ? (
          <>
            <Stack.Screen name="MainStack" component={MainStack} />
            <Stack.Screen name="AuthStack" component={AuthStack} />
          </>
        ) : (
          <>
            <Stack.Screen name="AuthStack" component={AuthStack} />
            <Stack.Screen name="MainStack" component={MainStack} />
          </>
        )}
      </Stack.Navigator>

      {modal && (
        <CustomModal
          isVisible={modal}
          onDisable={() => dispatch(setModal(false))}
        >
          <View style={styles.modalMainContainer}>
            <CustomText
              label={"Alert!"}
              alignSelf={"center"}
              textAlign={"center"}
              fontFamily={fonts.bold}
              fontSize={20}
            />
            <CustomText
              label={
                "Your account has been Deactivated please contact the admin for further support"
              }
              alignSelf={"center"}
              textAlign={"center"}
              textStyle={className("mx-5 mt-3 text-14")}
              fontFamily={fonts.regular}
            />
            <CustomButton
              title={"Contac us"}
              customStyle={className("w-50 h-12 mt-6")}
              onPress={() => {
                dispatch(setModal(false));
                navigation.navigate("MainStack", { screen: "HelpCenter" });
              }}
            />
          </View>
        </CustomModal>
      )}
    </View>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({
  modalMainContainer: {
    alignSelf: "center",
    width: "90%",
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    height: 240,
  },
});
