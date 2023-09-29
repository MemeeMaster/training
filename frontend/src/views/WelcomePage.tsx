import { DATA_LIST_PATH, LOGIN_PATH } from "@config/routes";
import { useNavigate } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import GlassBackground from "@components/GlassBackground";
import "@style/fonts.css";
import useAuth from "@hooks/useAuth";
import WelcomePageButton from "@components/WelcomePageButton";

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
  const { isAuthenticated } = useAuth();
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

    /**
   * Function to handle the "Login" button click.
   *
   * This function uses the React Router `useNavigate` hook to navigate to
   * the login page when the button is clicked.
   *
   * @function
   */
  const handleLoginButton = () => {
    navigate(LOGIN_PATH);
  };

  return (
    <GlassBackground>
      <Stack alignItems="center">
        <Typography
          color="primary"
          variant="h2"
          sx={{ fontSize: "4rem", fontFamily: "Pacifico" }}
        >
          Welcome
        </Typography>
        <Typography
          color="secondary"
          sx={{
            textAlign: "center",
            fontSize: "1.4rem",
            maxWidth: "60%",
            marginBottom: 4,
            marginTop: 1,
          }}
        >
          Welcome to the Dog Stars. This is the place where we store information
          about the most popular dogs in the universe!
        </Typography>
        {isAuthenticated ? (
          <WelcomePageButton
            content="Go to archive"
            onClick={handleListButton}
          />
        ) : (
          <WelcomePageButton
            content="Login"
            onClick={handleLoginButton}
          />
        )}
      </Stack>
    </GlassBackground>
  );
};

export default WelcomePage;
