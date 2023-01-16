import React, { createContext, useState } from 'react';

const AuthContext = createContext({});

export function AuthProvider({ children }) {

    const [authentication, setAuthentication] = useState({});

    return (
        <AuthContext.Provider value={{ authentication, setAuthentication }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
