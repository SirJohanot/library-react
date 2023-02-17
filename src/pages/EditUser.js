import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';
import CancelButton from '../components/ui/CancelButton';
import { isHumanName } from '../utility/validator';

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
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        other: ''
    });

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
        setErrors(prev => ({ ...prev, other: '' }));
    }, [user]);

    const isBlank = useCallback(
        (key) => {
            if (!user[key]) {
                setErrors(prev => ({ ...prev, [key]: 'fieldRequired' }));
                return true;
            }
            return false;
        }, [user]);

    const isNotAWord = useCallback(
        (key) => {
            if (!isHumanName(user[key])) {
                setErrors(prev => ({ ...prev, [key]: 'alphabetical' }));
                return true;
            }
            return false;
        }, [user]);

    useEffect(() => {
        if (isBlank('firstName')) {
            return;
        }
        if (isNotAWord('firstName')) {
            return;
        }
        setErrors(prev => ({ ...prev, firstName: '' }));
    }, [user?.firstName, isBlank, isNotAWord]);

    useEffect(() => {
        if (isBlank('lastName')) {
            return;
        }
        if (isNotAWord('lastName')) {
            return;
        }
        setErrors(prev => ({ ...prev, lastName: '' }));
    }, [user?.lastName, isBlank, isNotAWord]);

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
                setErrors(prev => ({ ...prev, other: 'noResponse' }));
            } else switch (err.response?.status) {
                case 400:
                    setErrors(prev => ({ ...prev, other: err.response?.data?.error }));
                    break;
                default:
                    setErrors(prev => ({ ...prev, other: 'failure' }));
            }
        }
    }

    const formhasErrors = () => {
        return (
            errors?.firstName
            || errors?.lastName
        );
    }

    const handleChange = (e) => {
        setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    return (
        <section id="main-content">
            <div id="main-content-centered-element">
                <form id="user-changes" className="round-bordered-subject block-container" onSubmit={handleSubmit}>
                    <h1><FormattedMessage id="loginLocale" />: {user?.login}</h1>
                    <label htmlFor="first-name"><FormattedMessage id="firstName" />:</label>
                    <input
                        className={errors?.firstName ? 'red-border' : ''}
                        type="text"
                        id="first-name"
                        name="firstName"
                        value={user?.firstName}
                        onChange={handleChange}
                        required
                    />
                    {errors?.firstName &&
                        <div className="field-error"><FormattedMessage id={errors?.firstName} /></div>
                    }
                    <label htmlFor="last-name"><FormattedMessage id="lastName" />:</label>
                    <input
                        className={errors?.lastName ? 'red-border' : ''}
                        type="text"
                        id="last-name"
                        name="lastName"
                        value={user?.lastName}
                        onChange={handleChange}
                        required
                    />
                    {errors?.lastName &&
                        <div className="field-error"><FormattedMessage id={errors?.lastName} /></div>
                    }
                    <label htmlFor="role"><FormattedMessage id="role" />:</label>
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
                    {errors?.other &&
                        <div className="error-message">{errors?.other}</div>
                    }
                </form>
                <div className="buttons-container">
                    <Link to={`/user/${login}`}>
                        <CancelButton />
                    </Link>
                    <button type="submit" form="user-changes" className="green" disabled={formhasErrors()}><FormattedMessage id="commitChanges" /></button>
                </div>
            </div>
        </section>
    )
}
