import axios from "axios";
import { getAuthSession } from "../utils/storage";

const api = axios.create({
  baseURL: "https://api.thaalam.ch/api",
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const session = await getAuthSession();

    if (session.token) {
      config.headers.Authorization = `Bearer ${session.token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (__DEV__) {
      console.log("API Error:", error.response?.data || error.message);
    }

    return Promise.reject(error);
  },
);

export default api;
