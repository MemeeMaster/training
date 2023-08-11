import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { executeAuthentication } from "../api/AuthenticationService";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { handleAuthChange, handleLoginChange } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (data) => {
      try {
        await executeAuthentication(data);

        setError(false);
        handleAuthChange(true);
        navigate("/logged");
      } catch (e) {
        console.log(e);
        setError(true);
        handleAuthChange(false);
      }
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
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <input type="submit" value="Login" />
      </form>
      <p className="link" onClick={handleLoginChange}>
        Registration
      </p>
      {error ? <p className="error">Wrong credentials</p> : null}
    </div>
  );
};

export default Login;
