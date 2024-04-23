import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuthorization from "../hooks/useAuthorization";

// Protects routes that need authorization for access 
// Once a user (identified by email) is authenticated, they will be redirected to the link previous clicked
const RequireAuth = ({allowedRoles}) => {
    const {auth} = useAuthorization();
    const location = useLocation();
    console.log("auth.tokenroles:", auth?.tokenRoles);
    console.log("allowedRoles:", allowedRoles);

    // Checks if auth.tokenRoles is an array. If it is not an array the expression will be wrapped to become an array.
    const tokenRoles = Array.isArray(auth?.tokenRoles) ? auth?.tokenRoles : [auth?.tokenRoles];

    const foundRole = allowedRoles.some(role => tokenRoles.includes(role));

    return (
        foundRole
            ? <Outlet />
            : auth?.email
                ? <Navigate to="/unauthorized" state={{from: location}} replace/>
                : <Navigate to="/login" state={{from: location}} replace/>
    );
}
export default RequireAuth;