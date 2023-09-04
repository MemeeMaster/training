import useAuth from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const { forceLogout } = useAuth();
  const navigate = useNavigate();

  const handleListButton = () => {
    navigate("/list");
  };

  return (
    <div>
      <h2 className="header">Logged In.</h2>
      <button className="button" onClick={forceLogout}>
        Logout
      </button>
      <button className="button" onClick={handleListButton}>
        Dog List
      </button>
    </div>
  );
};

export default WelcomePage;
