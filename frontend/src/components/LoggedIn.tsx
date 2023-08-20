import useAuth from "@hooks/useAuth";
import { executeTest } from "@api/AuthenticationService";

const LoggedIn = () => {
  const { forceLogout } = useAuth();

  return (
    <div>
      <h2 className="header">Logged In.</h2>
      <button className="button" onClick={forceLogout}>
        Logout
      </button>
      <button className="button" onClick={executeTest}>
        Test
      </button>
    </div>
  );
};

export default LoggedIn;
