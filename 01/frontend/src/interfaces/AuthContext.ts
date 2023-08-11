interface AuthContextType {
  isLogin: boolean;
  isAuthenticated: boolean;
  handleLoginChange: () => void;
  handleAuthChange: (passed: boolean) => void;
}

export default AuthContextType;
