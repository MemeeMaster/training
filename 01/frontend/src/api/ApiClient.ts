import axios from "axios";
import useAuth from "@hooks/useAuth";

axios.interceptors.request.use((config) =>{
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config;
 }, function (error) {
     return Promise.reject(error);
 });

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    if (error.response && error.response.status === 401) {
      const { handleLogout } = useAuth();
      handleLogout();
    }
    return Promise.reject(error);
  }
);

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

//  TODO:
//  - make error return status correctly
//  - fix cors on backend
//  - figure out how to log out here
