import { DATA_LIST_PATH } from "@config/routes";
import useAuth from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";

/**
 * Component representing the welcome page after user login.
 *
 * This component displays a welcome message, a logout button, and a button
 * to navigate to the Dog List page.
 *
 * @component
 * @returns The WelcomePage component.
 */
const WelcomePage = () => {
  const { forceLogout } = useAuth();
  const navigate = useNavigate();

    /**
   * Function to handle the "Dog List" button click.
   *
   * This function uses the React Router `useNavigate` hook to navigate to
   * the Dog List page when the button is clicked.
   *
   * @function
   */
  const handleListButton = () => {
    navigate(DATA_LIST_PATH);
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
