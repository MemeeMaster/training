import { ReactNode, useEffect } from "react";
import useAuth from "@hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ROOT_PATH } from "@config/routes";

/**
 * Checks if user is authenticated and redirect if not.
 * 
 * @param params.children - Child components to be wrapped by the RedirectIfNotAuthenticated. 
 * @returns The RedirectIfNotAuthenticated component.
 */
const RedirectIfNotAuthenticated = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate(ROOT_PATH);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};

export default RedirectIfNotAuthenticated;
