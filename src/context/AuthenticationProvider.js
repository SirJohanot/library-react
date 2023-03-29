import React, { createContext, useMemo, useState } from 'react';

const AuthenticationContext = createContext({});

export function AuthenticationProvider({ children }) {
    const [authentication, setAuthentication] = useState({});

    const authenticationMemo = useMemo(() => { return { authentication, setAuthentication } },
        [authentication, setAuthentication]);

    return (
        <AuthenticationContext.Provider value={authenticationMemo}>
            {children}
        </AuthenticationContext.Provider>
    );
}

export default AuthenticationContext;
