import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Form from "@components/Form";
import LoggedIn from "@components/LoggedIn";
import useAuth from "@hooks/useAuth";

const App = () => {
  const { authenticate, isAuthenticated } = useAuth();

  useEffect(() => {
    if (localStorage.getItem("jwtToken") !== null) {
      authenticate();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      {!isAuthenticated ? (
        <Route path="/" element={<Form />} />
      ) : (
        <Route path="/logged" element={<LoggedIn />} />
      )}
    </Routes>
  );
};

export default App;