import { useFormik } from "formik";
import useAuth from "@hooks/useAuth";
import { RequestData } from "@interfaces/Api";
import { Typography } from "@mui/material";
import StyledForm from "@components/StyledForm";
import SubmitButton from "@components/SubmitButton";
import LoginFormLink from "@components/LoginFormLink";
import LoginFormBackground from "@components/LoginFormBackground";
import FormTextField from "@components/FormTextField";

/**
 * Component for user login.
 *
 * This component provides a user login form that includes fields for email
 * and password. It uses Formik for form handling.
 *
 * @component
 * @returns The Login component.
 */
const Login = () => {
  const { handleLogin, handleLoginChange } = useAuth();
  /**
   * Hook for defining formik initial values and action on submit.
   */
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (data: RequestData) => {
      handleLogin(data);
    },
  });

  return (
    <LoginFormBackground>
      <Typography sx={{ marginBottom: 2 }} variant="h3">
        Sign In
      </Typography>
      <StyledForm onSubmit={formik.handleSubmit}>
        <FormTextField
          label="E-mail"
          type="text"
          id="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          marginTop={2}
        />
        <FormTextField
          label="Password"
          type="password"
          id="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          marginTop={2}
        />
        <SubmitButton content="sign in" />
      </StyledForm>
      <LoginFormLink onClick={handleLoginChange} content="Create account" />
    </LoginFormBackground>
  );
};

export default Login;
