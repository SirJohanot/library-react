import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, useParams } from 'react-router-dom';
import axios from '../api/axios';
import CancelButton from '../components/ui/CancelButton';
import UserParameters from '../components/view/UserParameters';
import useAuthentication from '../hooks/useAuthentication';

const GET_USER_METHOD = 'get';
const GET_USER_URL = '/users/';

export default function User() {
    const { authentication } = useAuthentication();

    const { login } = useParams();

    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.request({
                method: GET_USER_METHOD,
                url: GET_USER_URL + login,
                auth: {
                    username: authentication?.login,
                    password: authentication?.password
                }
            });
            setUser(response?.data);
        }
        fetchUser();
    }, [authentication, login])

    return (
        <section id="main-content">
            <div id="main-content-centered-element">
                <div className="round-bordered-subject block-container">
                    <UserParameters user={user} />
                </div>
                <div className="buttons-container">
                    <Link to="/users/">
                        <CancelButton />
                    </Link>
                    <Link to={`/user/${login}/edit`}>
                        <button><FormattedMessage id="edit" /></button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
