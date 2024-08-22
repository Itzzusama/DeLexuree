// import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    userData: {},
  },
  reducers: {
    setUserData(state, action) {
      state.userData = action.payload;
    },
    userLogout(state, action) {
      state.userData = {};
    },
  },
});

export const { setUserData, userLogout } = usersSlice.actions;
