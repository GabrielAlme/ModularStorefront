import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../authorization";

const RouterNav = () => {
  const {user, logout} = useAuth();

  const handle = () => {
    logout();
  }

  return (
    <>
        <nav className="router-nav">
            <Link to="/">Home</Link> |{" "}
            <Link to="/Projects">Projects</Link> |{" "}
            <Link to="/Workspace">Workspace</Link> |{" "}
            <Link to="/SignIn">Login/Sign up</Link> |{" "}
            <button onClick={handle}>
              Log Out
            </button>
        </nav>
        <Outlet />
    </>
  );
}

export default RouterNav
