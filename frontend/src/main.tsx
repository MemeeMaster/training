import React from "react";
import ReactDOM from "react-dom/client";
import App from "@views/App";
import "@style/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "@providers/AuthProvider";
import ToastProvider from "@providers/ToastProvider";
import DataProvider from "@providers/DataProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <ToastProvider>
        <DataProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </DataProvider>
      </ToastProvider>
    </Router>
  </React.StrictMode>
);
