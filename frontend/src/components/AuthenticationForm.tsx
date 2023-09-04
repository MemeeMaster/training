import { useEffect } from "react";
import Login from "@components/Login";
import Registration from "@components/Registration";
import useAuth from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";

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
