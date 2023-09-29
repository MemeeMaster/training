import { useEffect, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import Form from "@components/AuthenticationForm";
import WelcomePage from "@views/WelcomePage";
import useAuth from "@hooks/useAuth";
import RedirectIfNotAuthenticated from "../components/RedirectIfNotAuthenticated";
import Toast from "../components/Toast";
import { jwtToken } from "@env/environments";
import { apiClient } from "@api/ApiClient";
import DogTable from "./DogTable";
import { CssBaseline } from "@mui/material";
import { DATA_LIST_PATH, LOGIN_PATH, ROOT_PATH } from "@config/routes";
import AppTheme from "@style/AppTheme";
import ResponsiveAppBar from "@components/NavBar";

/**
 * Main application component.
 *
 * This component serves as the entry point of the application and is responsible
 * for rendering different routes and handling user authentication and logout.
 *
 * @component
 * @returns The App component.
 */
const App = () => {
  const { handleLogout, authenticate } = useAuth();

  /**
   * Hook for intercepting API responses.
   *
   * This hook uses Axios interceptors to handle API responses. It checks for
   * unauthorized (401) responses and logs the user out in such cases.
   */
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

  /**
   * Effect hook for checking user authentication.
   *
   * This hook checks if the user is authenticated based on the presence of a
   * JWT token in local storage and calls the `authenticate` function.
   */
  useEffect(() => {
    if (localStorage.getItem(jwtToken) !== null) {
      authenticate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Public routes for the application.
   *
   * An array of route objects representing public routes that don't require
   * authentication.
   */
  const publicRoutes = [
    { path: LOGIN_PATH, component: <Form /> },
    { path: ROOT_PATH, component: <WelcomePage /> },
  ];

  /**
   * Protected routes for the application.
   *
   * An array of route objects representing protected routes that require
   * authentication. These routes are wrapped in the `RedirectIfNotAuthenticated`
   * component to ensure authentication before rendering.
   */
  const protectedRoutes = [{ path: DATA_LIST_PATH, component: <DogTable /> }];

  return (
    <>
      <AppTheme>
        <CssBaseline enableColorScheme />
        <Toast />
        <ResponsiveAppBar />
        <Routes>
          {publicRoutes.map((route, idx) => (
            <Route path={route.path} key={idx} element={route.component} />
          ))}
          {protectedRoutes.map((route, idx) => (
            <Route
              path={route.path}
              key={idx}
              element={
                <>
                  <RedirectIfNotAuthenticated>
                    {route.component}
                  </RedirectIfNotAuthenticated>
                </>
              }
            />
          ))}
        </Routes>
      </AppTheme>
    </>
  );
};

export default App;
