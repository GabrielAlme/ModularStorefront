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
            <Link to="/" className="primary_btn">Home</Link> |{" "}
            <Link to="/Projects" className="primary_btn">Projects</Link> |{" "}
            <Link to="/Workspace" className="primary_btn">Workspace</Link> |{" "}
            <Link to="/SignIn" className="primary_btn">Login/Sign up</Link> |{" "}
            <Button onClick={handle} className="primary_btn">Log Out</Button>
        </nav>
        <Outlet />
    </>
  );
}

export default RouterNav
