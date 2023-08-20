import { apiClient } from "@api/ApiClient";
import { LoginDTO, TokenDTO, RequestData, ResponseData } from "@interfaces/Api";
import paths from "@api/ApiPaths";

const { authenticationPath, registrationPath, refreshPath, testPath } = paths;

export const executeAuthentication = async (
  data: RequestData
): Promise<ResponseData<LoginDTO>> => {
  return await apiClient.post(authenticationPath, data);
};

export const executeRegistration = async (
  data: RequestData
): Promise<ResponseData<string>> => {
  return await apiClient.post(registrationPath, data);
};

export const executeRefresh = async (
  data: TokenDTO
): Promise<ResponseData<LoginDTO>> => {
  return await apiClient.post(refreshPath, data);
};

export const executeTest = async () => {
  return await apiClient.get(testPath);
};