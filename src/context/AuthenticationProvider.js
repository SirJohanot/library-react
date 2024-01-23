import { PropTypes } from 'prop-types';
import React, { createContext, useMemo, useState } from 'react';

const AuthenticationContext = createContext({});

export function AuthenticationProvider({ children }) {

    AuthenticationProvider.propTypes = {
        children: PropTypes.node.isRequired,
    };

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
