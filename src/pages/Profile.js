import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import LoadingBars from '../components/ui/LoadingBars';
import UserParameters from '../components/view/UserParameters';
import useAuthentication from '../hooks/useAuthentication';

const GET_USER_METHOD = 'get';
const GET_USER_URL = '/users/';

export default function User() {
    const intl = useIntl();

    const { login } = useAuthentication();

    const [user, setUser] = useState();

    const fetchUser = useCallback(async () => {
        const response = await axios.request({
            method: GET_USER_METHOD,
            url: GET_USER_URL + login
        });
        setUser(response?.data);
        document.title = `${response?.data?.login} | ${intl.formatMessage({ id: 'appName' })}`
    }, [login, intl]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <>
            {user ?
                <div>
                    <div className="entity-container">
                        <UserParameters user={user} />
                    </div>
                    <div className="buttons-container">
                        <Link to={`/change-password`} className="btn">
                            <FormattedMessage id="changePassword" />
                        </Link>
                    </div>
                </div>
                : <LoadingBars />
            }
        </>
    );
}