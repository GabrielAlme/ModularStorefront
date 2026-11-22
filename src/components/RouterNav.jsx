import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../authorization";
import Button from "./Button";

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
            <Button onClick={handle}>Log Out</Button>
        </nav>
        <Outlet />
    </>
  );
}

export default RouterNav
