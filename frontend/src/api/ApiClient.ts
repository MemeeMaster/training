import axios from "axios";
import { baseUrl, jwtToken } from "@env/environments";

export const apiClient = axios.create({
  baseURL: baseUrl,
});

apiClient.interceptors.request.use(
  (config) => {
    if (!config.url?.includes("/api/auth")) {
      const token = localStorage.getItem(jwtToken);
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
