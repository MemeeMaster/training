import { ReactNode, createContext, useState } from "react";
import { AuthContextType } from "@interfaces/ContextTypes";
import { useNavigate } from "react-router-dom";
import {
  executeAuthentication,
  executeLogout,
  executeRefresh,
} from "@api/AuthenticationService";
import { RequestData } from "@interfaces/Api";
import useToast from "@hooks/useToast";
import { AxiosError } from "axios";
import { jwtToken } from "@env/environments";
import { ROOT_PATH } from "@config/routes";
import Cookies from "universal-cookie";

/**
 * Auth context for managing auth-related actions.
 *
 * This context provides access to authentication states and functions.
 */
export const AuthContext = createContext<AuthContextType>({
  isLogin: true,
  isAuthenticated: false,
  loggedUser: "",
  handleLoginChange: () => {},
  handleLogin: () => {},
  handleLogout: () => {},
  forceLogout: () => {},
  authenticate: () => {},
});

/**
 * Authentication context provider for managing user authentication.
 *
 * This component provides a context for managing user authentication state and
 * related functionality like login, logout, and session management.
 *
 * @component
 * @param props.children - Child components to be wrapped by the AuthProvider.
 * @returns The AuthProvider component.
 */
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedUser, setLoggedUser] = useState("");
  const navigate = useNavigate();
  const { handleToastOpening } = useToast();

  /**
   * Function to toggle between login and registration modes.
   *
   * This function toggles the `isLogin` state to switch between login and
   * registration modes in the UI.
   */
  const handleLoginChange = () => {
    setIsLogin((prevState) => !prevState);
  };

  /**
   * Function to handle user login.
   *
   * This function handles the user login process by making an API request and
   * storing the authentication tokens in local storage upon successful login.
   *
   * @param data - User login data.
   */
  const handleLogin = async (data: RequestData) => {
    try {
      const response = await executeAuthentication(data);
      localStorage.setItem(jwtToken, response.data.accessToken);
      setLoggedUser(response.data.username);

      authenticate();
    } catch (e) {
      handleLogout();

      if (e instanceof AxiosError)
        handleToastOpening(e.response!.data, "success");
      else {
        handleToastOpening("Login error.", "error");
      }
    }
  };

  /**
   * Function to handle user logout.
   *
   * This function handles user logout by clearing local storage tokens and
   * optionally refreshing the session.
   */
  const handleLogout = async () => {
    const cookies = new Cookies();
    try {
      if (cookies.get("refresh-present")) {
        const res = await executeRefresh().then((res) => res.data);

        localStorage.setItem(jwtToken, res.accessToken);
        handleToastOpening("Session refreshed. Try again.", "info");
      }
    } catch (e) {
      forceLogout();
    }
  };

  /**
   * Function to forcefully log the user out.
   *
   * This function forcefully logs out the user by removing access token from local
   * storage and refresh token from cookies.
   * Then redirects to the login page.
   */
  const forceLogout = async () => {
    try {
      await executeLogout();
      localStorage.removeItem(jwtToken);
      setLoggedUser("");
      setIsAuthenticated(false);
      navigate(ROOT_PATH);
      handleToastOpening("Logged out.", "info");
    } catch (e) {
      handleToastOpening("Error during logout. Please try again.", "error");
    }
  };

  /**
   * Function to authenticate the user.
   *
   * This function sets the user as authenticated, redirects to the logged-in
   * page, and displays a toast message.
   */
  const authenticate = () => {
    setIsAuthenticated(true);
    navigate(ROOT_PATH);
    handleToastOpening("Logged in.", "success");
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        isAuthenticated,
        loggedUser,
        handleLoginChange,
        handleLogin,
        handleLogout,
        forceLogout,
        authenticate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
