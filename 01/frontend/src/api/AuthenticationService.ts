import { apiClient } from "@api/ApiClient";
import { RequestData, ResponseData } from "@interfaces/Api";
import paths from "@api/ApiPaths";
import axios from "axios";

const { authenticationPath, registrationPath } = paths;

export const executeAuthentication = async (
  data: RequestData
): Promise<string> => {
  return await apiClient.post(authenticationPath, data).then((res) => res.data);
};

export const executeRegistration = async (
  data: RequestData
): Promise<ResponseData<string>> => {
  return await apiClient.post(registrationPath, data);
};

export const executeTest = async () => {
  return await axios.get("http://localhost:8080/test");
};
