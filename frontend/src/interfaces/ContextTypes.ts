import { RequestData } from "./Api";

export interface AuthContextType {
  isLogin: boolean;
  isAuthenticated: boolean;
  handleLoginChange: () => void;
  handleLogin: (data: RequestData) => void;
  handleLogout: () => void;
  forceLogout: () => void;
  authenticate: () => void;
}

export interface ToastContextType {
  showToast: boolean;
  message: string;
  handleToastOpening: (message: string) => void;
  handleToastClosing: () => void;
}
