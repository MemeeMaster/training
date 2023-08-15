import { useState, createContext, ReactNode } from "react";
import { ToastContextType } from "@interfaces/ContextTypes";

export const ToastContext = createContext<ToastContextType>({
  showToast: false,
  message: "",
  handleToastOpening: () => {},
  handleToastClosing: () => {},
});

const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");

  const handleToastOpening = (message: string) => {
    setMessage(message);
    setShowToast(true);
  };

  const handleToastClosing = () => {
    setShowToast(false);
  };

  return (
    <ToastContext.Provider
      value={{ showToast, message, handleToastOpening, handleToastClosing }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
