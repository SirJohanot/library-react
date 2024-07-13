import { PropTypes } from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function UserParameters({ user }) {

    UserParameters.propTypes = {
        user: PropTypes.object.isRequired,
    };

    return (
        <>
            <h1><span className="parameter-name"><FormattedMessage id="loginLocale" />:</span> {user?.login}</h1>
            <p><span className="parameter-name"><FormattedMessage id="firstName" />:</span> {user?.firstName}</p>
            <p><span className="parameter-name"><FormattedMessage id="lastName" />:</span> {user?.lastName}</p>
            <p>
                <span className="parameter-name"><FormattedMessage id="role" />:</span> {user?.role && <FormattedMessage id={user?.role} />}
            </p>
            <p>
                <span className="parameter-name"><FormattedMessage id="blocked" />:</span> {typeof user?.blocked !== typeof undefined && <FormattedMessage id={user?.blocked?.toString()} />}
            </p>
            <p>
                <span className="parameter-name"><FormattedMessage id="active" />:</span> {typeof user?.enabled !== typeof undefined && <FormattedMessage id={user?.enabled?.toString()} />}
            </p>
        </>
    );
}
