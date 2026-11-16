import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authorization";

export const ProtectedRoute = () => {
    const { user } = useAuth();

    //navigate to login page if not logged in
    if(!user) {
        return <Navigate to="/SignIn" replace />
    }

    return <Outlet />;

}