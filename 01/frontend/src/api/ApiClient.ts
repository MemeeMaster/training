import axios from "axios";
import { baseUrl, jwtToken } from "@env/environments";

export const apiClient = axios.create({
  baseURL: baseUrl,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(jwtToken);
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);