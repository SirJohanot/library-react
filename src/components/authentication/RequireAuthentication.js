import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthentication from '../../hooks/useAuthentication';

export default function RequireAuthentication({ allowedRoles }) {
    const { authentication } = useAuthentication();
    const location = useLocation();

    return (
        authentication?.roles?.find((role) => allowedRoles?.includes(role)) ?
            <Outlet />
            :
            <>
                {authentication?.login ?
                    <Navigate to="/unauthorized" state={{ from: location }} replace />
                    :
                    <Navigate to="/sign-in" state={{ from: location }} replace />
                }
            </>
    );
}
