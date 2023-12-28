import PropTypes from 'prop-types';
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuthentication from '../../hooks/useAuthentication';

export default function RequireAuthentication({ allowedRoles }) {

    RequireAuthentication.propTypes = {
        allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
    };

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
