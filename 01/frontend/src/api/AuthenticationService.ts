import { apiClient } from "@api/ApiClient";
import RequestData from "@interfaces/Api";
import paths from "@api/ApiPaths";

const { authenticationPath, registrationPath } = paths;

export const executeAuthentication = async (data: RequestData) => {
  return await apiClient.post(authenticationPath, data).then((res) => res.data);
};

export const executeRegistration = async (data: RequestData) => {
  return await apiClient.post(registrationPath, data);
};

// export const executeLogout = async () => {
//   return await apiClient.post(logoutPath, null, {
//     withCredentials: true,
//   });
// };