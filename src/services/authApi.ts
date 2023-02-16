import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const $publicHost = axios.create({
  baseURL: "https://connections-api.herokuapp.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

const $privateHost = axios.create({
  baseURL: "https://connections-api.herokuapp.com/",
  headers: {
    "Content-type": "application/json",
  },
});

const authInterceptors = async (config) => {
  config.headers["Authorization"] = await AsyncStorage.getItem("token");
  return config;
};

$privateHost.interceptors.request.use(authInterceptors);

export const userApi = {
  async register(formData: {}) {
    const { data } = await $publicHost.post("users/signup", formData);
    return await data;
  },
  async login(formData: {}) {
    const { data } = await $publicHost.post("users/login", formData);
    return await data;
  },
  async userLogOutRequest() {
    const { data } = await $privateHost.post("/users/logout");
    return await data;
  },
};
