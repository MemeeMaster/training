import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "./Form";
import LoggedIn from "./LoggedIn";
import useAuth from "../hooks/useAuth";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <Route path="/" element={<Form />} />
        ) : (
          <Route path="/logged" element={<LoggedIn />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
