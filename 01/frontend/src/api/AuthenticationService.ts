import { apiClient } from "@api/ApiClient";
import { Login, RequestData, ResponseData } from "@interfaces/Api";
import paths from "@api/ApiPaths";

const { authenticationPath, registrationPath, testPath } = paths;

export const executeAuthentication = async (
  data: RequestData
): Promise<ResponseData<Login>> => {
  return await apiClient.post(authenticationPath, data);
};

export const executeRegistration = async (
  data: RequestData
): Promise<ResponseData<string>> => {
  return await apiClient.post(registrationPath, data);
};

export const executeTest = async () => {
  return await apiClient.get(testPath);
};
