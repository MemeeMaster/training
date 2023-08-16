import { ReactNode, createContext, useState } from "react";
import { AuthContextType } from "@interfaces/ContextTypes";
import { useNavigate } from "react-router-dom";
import { executeAuthentication } from "@api/AuthenticationService";
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

  const handleLogout = () => {
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
        authenticate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
