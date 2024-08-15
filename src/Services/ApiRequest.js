import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { endPoints } from "./ENV";

const baseURL = endPoints.BASE_URL;

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
