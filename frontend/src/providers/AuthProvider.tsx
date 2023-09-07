import { ReactNode, createContext, useState } from "react";
import { AuthContextType } from "@interfaces/ContextTypes";
import { useNavigate } from "react-router-dom";
import {
  executeAuthentication,
  executeRefresh,
} from "@api/AuthenticationService";
import { RequestData } from "@interfaces/Api";
import useToast from "@hooks/useToast";
import { AxiosError } from "axios";
import { jwtToken, refreshToken } from "@env/environments";

/**
 * Auth context for managing auth-related actions.
 *
 * This context provides access to authentication states and functions.
 */
export const AuthContext = createContext<AuthContextType>({
  isLogin: true,
  isAuthenticated: false,
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
      localStorage.setItem(refreshToken, response.data.refreshToken);

      authenticate();
    } catch (e) {
      handleLogout();

      if (e instanceof AxiosError) handleToastOpening(e.response!.data);
      else {
        handleToastOpening("Login error.");
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
    try {
      if (localStorage.getItem(refreshToken) !== null) {
        const res = await executeRefresh({
          refreshToken: localStorage.getItem(refreshToken),
        }).then((res) => res.data);

        localStorage.setItem(jwtToken, res.accessToken);
        localStorage.setItem(refreshToken, res.refreshToken);
        handleToastOpening("Session refreshed. Try again.");
      }
    } catch (e) {
      forceLogout();
    }
  };

  /**
   * Function to forcefully log the user out.
   *
   * This function forcefully logs out the user by removing tokens from local
   * storage and redirecting to the login page.
   */
  const forceLogout = () => {
    localStorage.removeItem(jwtToken);
    localStorage.removeItem(refreshToken);
    setIsAuthenticated(false);
    navigate("/");
    handleToastOpening("Logged out.");
  };

  /**
   * Function to authenticate the user.
   *
   * This function sets the user as authenticated, redirects to the logged-in
   * page, and displays a toast message.
   */
  const authenticate = () => {
    setIsAuthenticated(true);
    navigate("/logged");
    handleToastOpening("Logged in.");
  };

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        isAuthenticated,
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
