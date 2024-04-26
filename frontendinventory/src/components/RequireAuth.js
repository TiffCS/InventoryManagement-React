import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuthorization from "../hooks/useAuthorization";


const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuthorization();
    const location = useLocation();
    
    // Ensure auth and tokenRoles are defined before accessing
    const tokenRoles = auth?.tokenRoles || [];

    // Check if any of the allowed roles match the user's roles
    const hasRequiredRole = allowedRoles.some(role => tokenRoles.includes(role));

    // Redirect unauthorized users
    if (!auth?.token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    } else if (!hasRequiredRole) {
        return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }

    // Render the child components if the user has required roles
    return <Outlet />;
}


export default RequireAuth;