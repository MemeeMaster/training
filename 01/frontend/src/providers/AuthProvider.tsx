import { ReactNode, createContext, useState } from "react";
import AuthContextType from "../interfaces/AuthContext";

export const AuthContext = createContext<AuthContextType>({
  isLogin: true,
  isAuthenticated: false,
  handleLoginChange: () => {},
  handleAuthChange: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginChange = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleAuthChange = (passed: boolean) => {
    setIsAuthenticated(passed);
  };

  return (
    <AuthContext.Provider
      value={{ isLogin, isAuthenticated, handleLoginChange, handleAuthChange }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
