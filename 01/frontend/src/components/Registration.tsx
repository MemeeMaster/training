import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

interface Props {
  onLoginChange: () => void;
}

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

const Registration = ({ onLoginChange }: Props) => {
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
        onSubmit={(values) => {
          console.log("Cool: ", values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="form">
            <label htmlFor="email">E-mail:</label>
            <Field name="email" id="email" />
            {errors.email && touched.email ? (
              <p className="error">{errors.email}</p>
            ) : null}
            <label htmlFor="password">Password:</label>
            <Field name="password" id="password" type="password" />
            {errors.password && touched.password ? (
              <p className="error">{errors.password}</p>
            ) : null}
            <label htmlFor="repeatPassword">Repeat password:</label>
            <Field name="repeatPassword" id="repeatPassword" type="password" />
            {errors.repeatPassword && touched.repeatPassword ? (
              <p className="error">{errors.repeatPassword}</p>
            ) : null}
            <input type="submit" value="Submit" />
          </Form>
        )}
      </Formik>
      <p className="link" onClick={onLoginChange}>
        Login
      </p>
    </div>
  );
};

export default Registration;
