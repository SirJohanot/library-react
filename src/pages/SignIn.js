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
        document.title = `${intl.formatMessage({ id: 'signInLocale' })} | ${intl.formatMessage({ id: 'appName' })}`;
    }, [intl]);

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
            const token = response?.data?.accessToken;
            setAuthentication({ login: credentials?.login, password: credentials?.password, roles, token });

            axios.interceptors.request.clear();
            axios.interceptors.request.use(
                (config) => {
                    config.headers.Authorization = 'Bearer ' + token;

                    return config;
                },
                (error) => Promise.reject(error)
            );

            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setError('noResponse');
            } else if (err.response?.status === 401) {
                setError('invalidCredentials');
            } else {
                setError('authenticationFailed');
            }
        }
    }

    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    return (
        <div className="centered">
            <form className="form smaller-form" autoComplete="on" onSubmit={handleSubmit}>
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
                    data-testid="login-input"
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
                    data-testid="password-input"
                />
                {error &&
                    <div className="error-message"><FormattedMessage id={error} /></div>
                }
                <div className="centered">
                    <button type="submit" className="btn"><FormattedMessage id="signInLocale" /></button>
                </div>
                <div className="b-outline"></div>
                <div>
                    <span>{intl.formatMessage({ id: "dontHaveAnAccount" }) + " "}</span>
                    <Link to="/sign-up" className="link dotted-link">
                        <FormattedMessage id="signUp" />
                    </Link>
                </div>
            </form>
        </div>
    )
}
