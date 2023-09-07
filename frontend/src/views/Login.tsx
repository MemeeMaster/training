import { useFormik } from "formik";
import useAuth from "@hooks/useAuth";
import { RequestData } from "@interfaces/Api";

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
    <div className="wrapper">
      <h2 className="header">Login</h2>
      <form className="form" onSubmit={formik.handleSubmit}>
        <label htmlFor="email">E-mail:</label>
        <input
          type="text"
          id="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          className="textInput"
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          className="textInput"
        />
        <input type="submit" value="Login" className="button" />
      </form>
      <p className="link" onClick={handleLoginChange}>
        Registration
      </p>
    </div>
  );
};

export default Login;
