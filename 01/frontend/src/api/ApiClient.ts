import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "jwtToken"
    )}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});