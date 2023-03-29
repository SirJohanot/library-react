import React, { createContext, useMemo, useState } from 'react';

const AuthenticationContext = createContext({});

export function AuthenticationProvider({ children }) {
    const [authentication, setAuthentication] = useState({});

    const [authenticationMemo, setAuthenticationMemo] = useMemo(() => [authentication, setAuthentication],
        [authentication, setAuthentication]);

    return (
        <AuthenticationContext.Provider value={{ authenticationMemo, setAuthenticationMemo }}>
            {children}
        </AuthenticationContext.Provider>
    );
}

export default AuthenticationContext;
