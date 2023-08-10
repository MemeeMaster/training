import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

interface Props {
  onLoginChange: () => void;
}

const Login = ({ onLoginChange }: Props) => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ email, password }) => {
      if (email === "a@b.c" && password === "abc") {
        setError(false);
        navigate("/logged");
      } else {
        console.log("Error");
        setError(true);
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
      <p className="link" onClick={onLoginChange}>
        Registration
      </p>
      {error ? <p className="error">Wrong credentials</p> : null}
    </div>
  );
};

export default Login;
