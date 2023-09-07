import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import useAuth from "@hooks/useAuth";
import { executeRegistration } from "@api/AuthenticationService";
import useToast from "@hooks/useToast";
import { AxiosError } from "axios";

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
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .max(30, "Maximum 30 characters")
    .required("Required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords don't match")
    .required("Required"),
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
    <div className="wrapper">
      <h2 className="header">Registration</h2>
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
            handleToastOpening("Registration successful.");
            handleLoginChange();
          } catch (e) {
            if (e instanceof AxiosError) handleToastOpening(e.response!.data);
            else {
              handleToastOpening("Registration error.");
            }
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="form">
            <label htmlFor="email">E-mail:</label>
            <Field name="email" id="email" className="textInput" />

            {errors.email && touched.email ? (
              <p className="error">{errors.email}</p>
            ) : null}

            <label htmlFor="password">Password:</label>
            <Field
              name="password"
              id="password"
              type="password"
              className="textInput"
            />

            {errors.password && touched.password ? (
              <p className="error">{errors.password}</p>
            ) : null}

            <label htmlFor="repeatPassword">Repeat password:</label>
            <Field
              name="repeatPassword"
              id="repeatPassword"
              type="password"
              className="textInput"
            />

            {errors.repeatPassword && touched.repeatPassword ? (
              <p className="error">{errors.repeatPassword}</p>
            ) : null}

            <input type="submit" value="Submit" className="button" />
          </Form>
        )}
      </Formik>
      <p className="link" onClick={handleLoginChange}>
        Login
      </p>
    </div>
  );
};

export default Registration;
