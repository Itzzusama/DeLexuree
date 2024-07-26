import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: '',
  isOnBoarding: false,
  userCategory: '',
  userData: {},
};
export const authConfigsSlice = createSlice({
  name: 'authConfigs',
  initialState: initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setOnBoarding(state, action) {
      state.isOnBoarding = action.payload;
    },
    logout(state, action) {
      state.token = '';
    },
    setUserCategory(state, action) {
      state.userCategory = action.payload;
    },
    setUserData(state, action) {
      state.userData = action.payload;
    },
  },
});

export const {setToken, setOnBoarding, logout, setUserCategory, setUserData} =
  authConfigsSlice.actions;
