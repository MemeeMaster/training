import {ReactNode} from "react";
import AuthProvider from "@providers/AuthProvider";
import ToastProvider from "@providers/ToastProvider";
import DataProvider from "@providers/DataProvider";

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
