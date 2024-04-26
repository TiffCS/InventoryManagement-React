import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({
        email: null,
        password: null,
        token: null,
        tokenRoles: null
    });

    // Function to clear authentication state (logout)
    const logout = () => {
        setAuth({
            email: null,
            password: null,
            token: null,
            tokenRoles: null
        });
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;

