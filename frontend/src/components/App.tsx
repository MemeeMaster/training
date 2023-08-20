import { useEffect, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import Form from "@components/AuthenticationForm";
import LoggedIn from "@components/LoggedIn";
import useAuth from "@hooks/useAuth";
import React from "react";
import RedirectIfNotAuthenticated from "./RedirectIfNotAuthenticated";
import Toast from "./Toast";
import { jwtToken } from "@env/environments";
import { apiClient } from "@api/ApiClient";

const App = () => {
  const { handleLogout, authenticate } = useAuth();

  useMemo(() => {
    apiClient.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && error.response.status == 401) {
          handleLogout();
        } else {
          return Promise.reject(error);
        }
      }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (localStorage.getItem(jwtToken) !== null) {
      authenticate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const publicRoutes = [{ path: "/", component: <Form /> }];

  const protectedRoutes = [{ path: "/logged", component: <LoggedIn /> }];

  return (
    <React.Fragment>
      <Toast />
      <Routes>
        {publicRoutes.map((route, idx) => (
          <Route path={route.path} key={idx} element={route.component} />
        ))}
        {protectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            key={idx}
            element={
              <React.Fragment>
                <RedirectIfNotAuthenticated>
                  {route.component}
                </RedirectIfNotAuthenticated>
              </React.Fragment>
            }
          />
        ))}
      </Routes>
    </React.Fragment>
  );
};

export default App;
