import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

//screens
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View,Text } from "react-native";
import { COLORS } from "../utils/COLORS";
import { setModal } from "../store/reducer/AuthConfig";
import CustomModal from "../components/CustomModal";

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  const navigation = useNavigation();

  const dispatch=useDispatch()
  const { token,modal } = useSelector((state) => state.authConfigs);

  return (
    <View style={{flex:1}}>
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
        <CustomModal isVisible={modal} onDisable={() => dispatch(setModal(false))}>
          <View style={styles.modalMainContainer}>
            <Text>adasdasdas</Text>
           </View>
        </CustomModal>
      )}
    </View>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({
  modalMainContainer: {
    alignSelf: 'center',
    width: '100%',
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 15,
  },
})
