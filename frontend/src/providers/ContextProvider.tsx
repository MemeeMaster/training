import { ReactNode } from "react";
import AuthProvider from "@providers/AuthProvider";
import ToastProvider from "@providers/ToastProvider";
import DataProvider from "@providers/DataProvider";

/**
 * ContextProvider component providing access to contextes logic
 * to every component in application.
 * 
 * @param params.children - Child components to be wrapped by the DataProvider.
 * @returns The ContextProvider component.
 */
const ContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ToastProvider>
      <DataProvider>
        <AuthProvider>{children}</AuthProvider>
      </DataProvider>
    </ToastProvider>
  );
};

export default ContextProvider;
