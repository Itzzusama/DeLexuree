import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';

//screens
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import {useNavigation} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  const navigation = useNavigation();

  const {token} = useSelector(state => state.authConfigs);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
      initialRouteName='MainStack'>
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
  );
};

export default RootNavigation;
