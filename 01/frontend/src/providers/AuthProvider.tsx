import { ReactNode, createContext, useState, useEffect } from "react";
import { AuthContextType } from "@interfaces/ContextTypes";
import { useNavigate } from "react-router-dom";
import { executeAuthentication } from "@api/AuthenticationService";
import { RequestData } from "@interfaces/Api";
import jwt_decode, { JwtPayload } from "jwt-decode";
import useToast from "@hooks/useToast";
import { AxiosError } from "axios";

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

  useEffect(() => {
    setInterval(() => {
      const token = localStorage.getItem("jwtToken");

      if (!token && isAuthenticated) handleLogout();
      else if (!token && !isAuthenticated) return;
      else if (token) {
        const expiration = jwt_decode<JwtPayload>(token).exp! * 1000;
        if (expiration < Date.now()) {
          handleLogout();
        }
      }
    }, 10000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoginChange = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleLogin = async (data: RequestData) => {
    try {
      const response: string = await executeAuthentication(data);
      localStorage.setItem("jwtToken", response);

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
    localStorage.removeItem("jwtToken");
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
