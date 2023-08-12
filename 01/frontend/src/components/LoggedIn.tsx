import useAuth from "@hooks/useAuth";

const LoggedIn = () => {
  const { handleLogout } = useAuth();

  return (
    <div>
      <h2 className="header">Logged In.</h2>
      <button className="button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LoggedIn;