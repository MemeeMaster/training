import RequestData from "./Api";

interface AuthContextType {
  isLogin: boolean;
  isAuthenticated: boolean;
  error: boolean;
  handleLoginChange: () => void;
  handleLogin: (data: RequestData) => void;
  handleLogout: () => void;
  authenticate: () => void;
}

export default AuthContextType;