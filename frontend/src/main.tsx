import React from "react";
import ReactDOM from "react-dom/client";
import App from "@views/App";
import "@style/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import ContextProvider from "@providers/ContextProvider";

/**
 * Entry point of the React application.
 *
 * This file is responsible for rendering the root component of the application
 * into the DOM and setting up necessary context providers.
 */

/**
 * Render the main application component into the DOM.
 *
 * This function initializes the React application by rendering the root component,
 * setting up a React Strict Mode, and wrapping the component with a Router and ContextProvider.
 *
 * @function
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <ContextProvider>
        <App />
      </ContextProvider>
    </Router>
  </React.StrictMode>
);
