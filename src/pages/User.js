import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, useParams } from 'react-router-dom';
import axios from '../api/axios';
import LoadingBars from '../components/ui/LoadingBars';
import UserParameters from '../components/view/UserParameters';

const GET_USER_METHOD = 'get';
const GET_USER_URL = '/users/';

const SWITCH_USER_BLOCKED_METHOD = 'patch';

export default function User() {
    const intl = useIntl();

    const { login } = useParams();

    const [user, setUser] = useState();

    const fetchUser = useCallback(async () => {
        const response = await axios.request({
            method: GET_USER_METHOD,
            url: GET_USER_URL + login
        });
        setUser(response?.data);
    }, [login]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const handleBlockButton = async () => {
        if (!window.confirm(intl.formatMessage({
            id: user?.blocked ? 'unblockConfirmation' : 'blockConfirmation'
        }))) {
            return;
        }
        await axios.request({
            method: SWITCH_USER_BLOCKED_METHOD,
            url: `/users/${user?.id}/switch-blocked`
        });
        fetchUser();
    }

    return (
        <>
            {user ?
                <>
                    <div className="round-bordered-subject block-container">
                        <UserParameters user={user} />
                    </div>
                    {user?.role !== 'ADMIN' &&
                        <div className="buttons-container">
                            <button className="red" onClick={handleBlockButton}><FormattedMessage id={user?.blocked ? "unblock" : "block"} /></button>
                            <Link to={`/user/${login}/edit`}>
                                <button><FormattedMessage id="edit" /></button>
                            </Link>
                        </div>
                    }
                </>
                : <LoadingBars />
            }
        </>
    );
}
