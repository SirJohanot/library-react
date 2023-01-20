import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';
import CancelButton from '../components/ui/CancelButton';
import useAuthentication from '../hooks/useAuthentication';

const GET_USER_METHOD = 'get';
const GET_USER_URL = '/users/';

const EDIT_USER_METHOD = 'put';
const EDIT_USER_URL = '/users/';

export default function EditUser() {
    const { authentication } = useAuthentication();

    const { login } = useParams();

    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        role: ''
    });
    const [error, setError] = useState('');

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

    useEffect(() => {
        setError('');
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.request({
                method: EDIT_USER_METHOD,
                url: EDIT_USER_URL + user?.id,
                data: JSON.stringify(user),
                headers: "Content-Type: application/json",
                auth: {
                    username: authentication?.login,
                    password: authentication?.password
                }
            });
            navigate(`/user/${login}`, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setError('No response from server');
            } else switch (err.response?.status) {
                case 400:
                    setError(err.response?.data?.error);
                    break;
                default:
                    setError('Could not edit user');
            }
        }
    }

    return (
        <section id="main-content">
            <div id="main-content-centered-element">
                <form id="user-changes" className="round-bordered-subject block-container" onSubmit={handleSubmit}>
                    <h1><FormattedMessage id="loginLocale" />: {user?.login}</h1>
                    <label for="first-name"><FormattedMessage id="firstName" />:</label>
                    <input type="text" id="first-name" value={user?.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })} required />
                    <label for="last-name"><FormattedMessage id="lastName" />:</label>
                    <input type="text" id="last-name" value={user?.lastName} onChange={(e) => setUser({ ...user, lastName: e.target.value })} required />
                    <label for="role"><FormattedMessage id="role" />:</label>
                    <select name="role" id="role" value={user?.role} onChange={(e) => setUser({ ...user, role: e.target.value })} required>
                        <option value="READER">
                            <FormattedMessage id="READER" />
                        </option>
                        <option value="LIBRARIAN">
                            <FormattedMessage id="LIBRARIAN" />
                        </option>
                    </select>
                    {error &&
                        <div className="error-message">{error}</div>
                    }
                </form>
                <div className="buttons-container">
                    <Link to={`/user/${login}`}>
                        <CancelButton />
                    </Link>
                    <button type="submit" form="user-changes" className="green"><FormattedMessage id="commitChanges" /></button>
                </div>
            </div>
        </section>
    )
}
