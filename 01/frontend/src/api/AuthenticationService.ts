import { apiClient } from "./ApiClient";
import RequestData from "../interfaces/Api";

export const executeAuthentication = async (data: RequestData) => {
  await apiClient.post("/auth/authenticate", data, {
    withCredentials: true,
  });
};

export const executeRegistration = async (data: RequestData) => {
  await apiClient.post("/auth/register", data);
};
