import { ReactNode, createContext, useState } from "react";
import AuthContextType from "@interfaces/AuthContext";
import { useNavigate } from "react-router-dom";
import { executeAuthentication } from "@api/AuthenticationService";
import RequestData from "@interfaces/Api";
import jwt_decode, { JwtPayload } from "jwt-decode";

export const AuthContext = createContext<AuthContextType>({
  isLogin: true,
  isAuthenticated: false,
  error: false,
  handleLoginChange: () => {},
  handleLogin: () => {},
  handleLogout: () => {},
  authenticate: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLoginChange = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleLogin = async (data: RequestData) => {
    try {
      const response: string = await executeAuthentication(data);
      localStorage.setItem("jwtToken", response);

      authenticate();
    } catch (e) {
      setError(true);
      handleLogout();
      throw new Error("Login error");
    }
  };

  const handleLogout = () => {
    try {
      // await executeLogout();
      localStorage.removeItem("jwtToken");
      setIsAuthenticated(false);
      navigate("/");
    } catch (e) {
      throw new Error("Logout error");
    }
  };

  const authenticate = () => {
    setIsAuthenticated(true);
    navigate("/logged");
  };

  setInterval(() => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return;

    const expiration = jwt_decode<JwtPayload>(token).exp! * 1000;

    if (expiration < Date.now()) {
      handleLogout();
    }
  }, 10000);

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        isAuthenticated,
        error,
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