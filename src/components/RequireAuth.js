import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function RequireAuth({ allowedRoles }) {

    const { authentication } = useAuth();
    const location = useLocation();

    return (
        authentication?.roles?.find((role) => allowedRoles?.includes(role))
            ? <Outlet />
            : authentication?.login
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/sign-in" state={{ from: location }} replace />
    )
}
