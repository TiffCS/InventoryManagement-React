import { useContext } from "react";
import AuthContext from "../authContext/AuthProvider";

// Custom hook for accessing Auth context
// Makes it gloabl and accessible to other components
const useAuthorization = () => {
    return useContext(AuthContext);
}

export default useAuthorization;

