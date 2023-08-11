import Login from "./Login";
import Registration from "./Registration";
import useAuth from "../hooks/useAuth";

const Form = () => {
  const { isLogin } = useAuth();

  return <>{isLogin ? <Login /> : <Registration />}</>;
};

export default Form;
