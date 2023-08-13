import React from "react";
import ReactDOM from "react-dom/client";
import App from "@components/App";
import "@style/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "@providers/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
