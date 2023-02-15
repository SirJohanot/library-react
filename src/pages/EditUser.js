import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';
import CancelButton from '../components/ui/CancelButton';

const GET_USER_METHOD = 'get';
const GET_USER_URL = '/users/';

const EDIT_USER_METHOD = 'put';
const EDIT_USER_URL = '/users/';

export default function EditUser() {
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
                url: GET_USER_URL + login
            });
            setUser(response?.data);
        }
        fetchUser();
    }, [login]);

    useEffect(() => {
        setError('');
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.request({
                method: EDIT_USER_METHOD,
                url: EDIT_USER_URL + user?.id,
                data: JSON.stringify(user)
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

    const handleChange = (e) => {
        setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    return (
        <section id="main-content">
            <div id="main-content-centered-element">
                <form id="user-changes" className="round-bordered-subject block-container" onSubmit={handleSubmit}>
                    <h1><FormattedMessage id="loginLocale" />: {user?.login}</h1>
                    <label for="first-name"><FormattedMessage id="firstName" />:</label>
                    <input
                        type="text"
                        id="first-name"
                        name="firstName"
                        value={user?.firstName}
                        onChange={handleChange}
                        required
                    />
                    <label for="last-name"><FormattedMessage id="lastName" />:</label>
                    <input
                        type="text"
                        id="last-name"
                        name="lastName"
                        value={user?.lastName}
                        onChange={handleChange}
                        required
                    />
                    <label for="role"><FormattedMessage id="role" />:</label>
                    <select
                        id="role"
                        name="role"
                        value={user?.role}
                        onChange={handleChange}
                        required
                    >
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
