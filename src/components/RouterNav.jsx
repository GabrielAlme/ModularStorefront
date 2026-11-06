import { Link, Outlet } from "react-router-dom";

const RouterNav = () => {
  return (
    <>
        <nav>
            <Link to="/">Home</Link> |{" "}
            <Link to="/WorkShop">Work Shop</Link> |{" "}
            <Link to="/SignIn">Login/Sign up</Link>
        </nav>
        <Outlet />
    </>
  );
}

export default RouterNav
