import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "./Form";
import LoggedIn from "./LoggedIn";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/logged" element={<LoggedIn />} />
      </Routes>
    </Router>
  );
};

export default App;
