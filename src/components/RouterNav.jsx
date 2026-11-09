import { Link, Outlet } from "react-router-dom";

const RouterNav = () => {
  return (
    <>
        <nav className="router-nav">
            <Link to="/">Home</Link> |{" "}
            <Link to="/Workspace">Workspace</Link> |{" "}
            <Link to="/SignIn">Login/Sign up</Link>
        </nav>
        <Outlet />
    </>
  );
}

export default RouterNav
