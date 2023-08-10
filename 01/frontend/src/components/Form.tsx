import { useState } from "react";
import Login from "./Login";
import Registration from "./Registration";

const Form = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleLoginChange = () => {
    setIsLogin((prevState) => !prevState);
  };
  return (
    <>
      {isLogin ? (
        <Login onLoginChange={handleLoginChange} />
      ) : (
        <Registration onLoginChange={handleLoginChange} />
      )}
    </>
  );
};

export default Form;
