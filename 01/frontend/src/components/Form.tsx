import Login from "@components/Login";
import Registration from "@components/Registration";
import useAuth from "@hooks/useAuth";

const Form = () => {
  const { isLogin } = useAuth();

  return <>{isLogin ? <Login /> : <Registration />}</>;
};

export default Form;