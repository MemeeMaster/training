import { useEffect } from "react";
import Login from "@views/Login";
import Registration from "@views/Registration";
import useAuth from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";

/**
 * Component deciding which form component to render.
 * 
 * @component
 * @returns The Form component
 */
const Form = () => {
  const { isLogin, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate(-1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>{isLogin ? <Login /> : <Registration />}</>
  );
};

export default Form;
