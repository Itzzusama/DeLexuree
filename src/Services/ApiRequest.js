import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { endPoints } from "./ENV";
import { store } from "../store";
import { setModal, setToken } from "../store/reducer/AuthConfig";
import { notiLogout } from "../store/reducer/unseenNotiSlice";
import { userLogout } from "../store/reducer/usersSlice";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
const baseURL = endPoints.BASE_URL;
GoogleSignin.configure({
  webClientId:
    "40372426505-gad73g4168ia8h2qhsru726uc42bv9b2.apps.googleusercontent.com", // From Firebase Console
});
const createApi = () => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  instance.interceptors.request.use(async (config) => {
    // console.log('====config', config);
    const token = await AsyncStorage.getItem("token");
    //console.log("====token", token);
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  });
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 440) {
        handleLogout();
      } else {
        return Promise.reject(error);
      }
    }
  );
  const get = (url) => {
    return instance.get(url);
  };
  const post = (url, data) => {
    return instance.post(url, data);
  };
  const put = (url, data) => {
    return instance.put(url, data);
  };
  const del = (url) => {
    return instance.delete(url);
  };
  return { get, post, put, del };
};
export const { get, post, put, del } = createApi();

const handleLogout = async () => {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("fcmToken");
  store.dispatch(setToken(""));
  store.dispatch(setModal(true));
  store.dispatch(notiLogout());
  store.dispatch(userLogout());
  GoogleSignin.signOut();
};
