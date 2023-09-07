import { useState, createContext, ReactNode } from "react";
import { ToastContextType } from "@interfaces/ContextTypes";

/**
 * Toast context for managing toast appearance.
 *
 * This context provides access to toast message and handling
 * toast appearance.
 */
export const ToastContext = createContext<ToastContextType>({
  showToast: false,
  message: "",
  handleToastOpening: () => {},
  handleToastClosing: () => {},
});

/**
 * Toast context provider for managing toast appearance.
 *
 * @component
 * @param props.children - Child components to be wrapped by the DataProvider.
 * @returns The ToastProvider component.
 */
const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");

  /**
   * Handles toast opening.
   *
   * @param message - message displayed in toast.
   */
  const handleToastOpening = (message: string) => {
    setMessage(message);
    setShowToast(true);
  };

  /**
   * Handles toast closing.
   */
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
