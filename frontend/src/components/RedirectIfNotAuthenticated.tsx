import React, { useEffect } from "react";
import useAuth from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface IProps {
  children: React.ReactNode;
}

const RedirectIfNotAuthenticated = ({ children }: IProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};

export default RedirectIfNotAuthenticated;
