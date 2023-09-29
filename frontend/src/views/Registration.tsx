import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import useAuth from "@hooks/useAuth";
import { executeRegistration } from "@api/AuthenticationService";
import useToast from "@hooks/useToast";
import { Typography } from "@mui/material";
import FormErrorPlaceholder from "@components/FormErrorPlaceholder";
import SubmitButton from "@components/SubmitButton";
import LoginFormLink from "@components/LoginFormLink";
import LoginFormBackground from "@components/LoginFormBackground";
import FormError from "@components/FormError";
import FormTextField from "@components/FormTextField";

/**
 * Validation schema for user registration form.
 *
 * This Yup validation schema defines the validation rules for the user registration
 * form. It specifies validation requirements for fields like email, password, and
 * repeat password.
 *
 * @constant
 */
const validation = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format"
    )
    .required("Email is required"),
  password: Yup.string()
    .min(6, "At least 6 characters")
    .max(30, "Maximum 30 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password is too weak"
    )
    .required("Password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords don't match")
    .required("Please confirm your password"),
});

/**
 * Component for user registration.
 *
 * This component provides a user registration form that includes fields for email,
 * password, and repeat password. It uses Formik for form handling and Yup for form
 * validation.
 *
 * @component
 * @returns The Registration component.
 */
const Registration = () => {
  const { handleLoginChange } = useAuth();
  const { handleToastOpening } = useToast();

  return (
    <LoginFormBackground>
      <Typography sx={{ marginBottom: 2 }} variant="h3">
        Create account
      </Typography>
      <Formik
        initialValues={{
          email: "",
          password: "",
          repeatPassword: "",
        }}
        validationSchema={validation}
        onSubmit={async ({ email, password }) => {
          try {
            await executeRegistration({ email, password });
            handleToastOpening("Account created.", "success");
            handleLoginChange();
          } catch (e) {
            handleToastOpening(
              "Account with this e-mail already exists.",
              "error"
            );
          }
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field as={FormTextField} label="E-mail" name="email" id="email" />
            {errors.email && touched.email ? (
              <FormError>{errors.email}</FormError>
            ) : (
              <FormErrorPlaceholder />
            )}

            <Field
              as={FormTextField}
              label="Password"
              name="password"
              id="password"
              type="password"
            />
            {errors.password && touched.password ? (
              <FormError>{errors.password}</FormError>
            ) : (
              <FormErrorPlaceholder />
            )}

            <Field
              as={FormTextField}
              label="Repeat password"
              name="repeatPassword"
              id="repeatPassword"
              type="password"
            />
            {errors.repeatPassword && touched.repeatPassword ? (
              <FormError>{errors.repeatPassword}</FormError>
            ) : (
              <FormErrorPlaceholder />
            )}
            <SubmitButton content="submit" />
          </Form>
        )}
      </Formik>
      <LoginFormLink onClick={handleLoginChange} content="Sign In" />
    </LoginFormBackground>
  );
};

export default Registration;
