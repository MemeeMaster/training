/**
 * Module for handling authentication-related API requests.
 *
 * This module exports functions for executing authentication and registration requests.
 *
 * @module AuthenticationService
 */
import { apiClient } from "@api/ApiClient";
import { LoginDTO, RequestData, ResponseData } from "@interfaces/Api";
import { authPaths } from "@config/apiPaths";

const { authenticationPath, logoutPath, registrationPath, refreshPath } =
  authPaths;

/**
 * Executes an authentication request.
 *
 * @param data - The user's login credentials.
 * @returns A Promise that resolves with the authentication response.
 */
export const executeAuthentication = async (
  data: RequestData
): Promise<ResponseData<LoginDTO>> => {
  return await apiClient.post(authenticationPath, data, {
    withCredentials: true,
  });
};

export const executeLogout = async () => {
  await apiClient.post(logoutPath, null, { withCredentials: true });
};

/**
 * Executes a registration request.
 *
 * @param data - The user's registration data.
 * @returns A Promise that resolves with the registration response.
 */
export const executeRegistration = async (
  data: RequestData
): Promise<ResponseData<string>> => {
  return await apiClient.post(registrationPath, data);
};

/**
 * Executes a token refresh request.
 *
 * @param  data - The token data for refresh.
 * @returns A Promise that resolves with the refresh response.
 */
export const executeRefresh = async (): Promise<ResponseData<LoginDTO>> => {
  return await apiClient.post(refreshPath, null, { withCredentials: true });
};
