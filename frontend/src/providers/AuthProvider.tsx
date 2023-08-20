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

export const AuthContext = createContext<AuthContextType>({
  isLogin: true,
  isAuthenticated: false,
  handleLoginChange: () => {},
  handleLogin: () => {},
  handleLogout: () => {},
  forceLogout: () => {},
  authenticate: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { handleToastOpening } = useToast();

  const handleLoginChange = () => {
    setIsLogin((prevState) => !prevState);
  };

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

  const forceLogout = () => {
    localStorage.removeItem(jwtToken);
    localStorage.removeItem(refreshToken);
    setIsAuthenticated(false);
    navigate("/");
    handleToastOpening("Logged out.");
  };

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
