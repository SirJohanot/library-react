import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import useAuthentication from '../hooks/useAuthentication';

const SIGN_IN_URL = '/users/auth';
const SIGN_IN_METHOD = 'get';

export default function SignIn() {
    const intl = useIntl();

    const { setAuthentication } = useAuthentication();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';

    const loginRef = useRef();

    const [credentials, setCredentials] = useState({
        login: '',
        password: ''
    })
    const [error, setError] = useState('');

    useEffect(() => {
        loginRef.current.focus();
    }, []);

    useEffect(() => {
        setError('');
    }, [credentials]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.request({
                method: SIGN_IN_METHOD,
                url: SIGN_IN_URL,
                data: {},
                auth: {
                    username: credentials?.login,
                    password: credentials?.password
                }
            });

            const roles = response?.data?.roles;
            setAuthentication({ login: credentials?.login, password: credentials?.password, roles });

            axios.interceptors.request.clear();
            axios.interceptors.request.use(
                (config) => {
                    return {
                        ...config,
                        auth: {
                            username: credentials?.login,
                            password: credentials?.password
                        }
                    }
                },
                (error) => Promise.reject(error)
            );

            navigate(from, { replace: true });
        } catch (err) {
            setCredentials(prev => ({ ...prev, password: '' }));
            if (!err?.response) {
                setError('noResponse');
            } else switch (err.response?.status) {
                case 401:
                    setError('invalidCredentials');
                    break;
                default:
                    setError('authenticationFailed');
            }
        }
    }

    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    return (
        <section id="main-content">
            <form className="login-form round-bordered-subject" autoComplete="on" onSubmit={handleSubmit}>
                <input
                    className={!credentials?.login ? 'red-border' : ''}
                    type="text"
                    id="login"
                    name="login"
                    value={credentials?.login}
                    onChange={handleChange}
                    ref={loginRef}
                    placeholder={intl.formatMessage({ id: 'loginLocale' })}
                    required
                />
                <input
                    className={!credentials?.password ? 'red-border' : ''}
                    type="password"
                    id="password"
                    name="password"
                    value={credentials?.password}
                    onChange={handleChange}
                    placeholder={intl.formatMessage({ id: 'passwordLocale' })}
                    required
                />
                {error &&
                    <div className="error-message"><FormattedMessage id={error} /></div>
                }
                <button type="submit"><FormattedMessage id="signInLocale" /></button>
                <Link to="/sign-up">
                    <button type="button"><FormattedMessage id="signUp" /></button>
                </Link>
            </form>
        </section>
    )
}
