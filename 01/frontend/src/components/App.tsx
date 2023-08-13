import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Form from "@components/Form";
import LoggedIn from "@components/LoggedIn";
import useAuth from "@hooks/useAuth";
import React from "react";
import RedirectIfNotAuthenticated from "./RedirectIfNotAuthenticated";

const App = () => {
  const { authenticate } = useAuth();

  useEffect(() => {
    if (localStorage.getItem("jwtToken") !== null) {
      authenticate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const publicRoutes = [{ path: "/", component: <Form /> }];

  const protectedRoutes = [{ path: "/logged", component: <LoggedIn /> }];

  return (
    <Routes>
      {publicRoutes.map((route, idx) => (
        <Route path={route.path} key={idx} element={route.component} />
      ))}
      {protectedRoutes.map((route, idx) => (
        <Route
          path={route.path}
          key={idx}
          element={
            <React.Fragment>
              <RedirectIfNotAuthenticated>
                {route.component}
              </RedirectIfNotAuthenticated>
            </React.Fragment>
          }
        />
      ))}
    </Routes>
  );
};

export default App;
