import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import axios from '../api/axios';
import SignUpButton from '../components/ui/SignUpButton';

const SIGN_UP_METHOD = 'post';
const SIGN_UP_URL = '/users';

export default function SignUp() {
    const intl = useIntl();

    const loginRef = useRef();

    const [signUpCredentials, setSignUpCredentials] = useState({
        login: '',
        password: '',
        confirmedPassword: '',
        firstName: '',
        lastName: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        loginRef.current.focus();
    }, []);

    useEffect(() => {
        setError('');
    }, [signUpCredentials]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSignUpCredentials(prev => ({ ...prev, password: '', confirmedPassword: '' }));
        try {
            await axios.request({
                method: SIGN_UP_METHOD,
                url: SIGN_UP_URL,
                data: JSON.stringify(signUpCredentials)
            });
        } catch (err) {
            if (!err?.response) {
                setError('No response from server');
            } else switch (err.response?.status) {
                case 400:
                    setError(err.response?.data?.error);
                    break;
                default:
                    setError('Registration failed');
            }
        }
    }

    const handleChange = (e) => {
        setSignUpCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    return (
        <section id="main-content">
            <form className="login-form round-bordered-subject" autoComplete="on" onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="login"
                    name="login"
                    value={signUpCredentials?.login}
                    onChange={handleChange}
                    ref={loginRef}
                    placeholder={intl.formatMessage({ id: 'loginLocale' })}
                    required
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={signUpCredentials?.password}
                    onChange={handleChange}
                    placeholder={intl.formatMessage({ id: 'passwordLocale' })}
                    required
                />
                <input
                    type="password"
                    id="confirmed-password"
                    name="confirmedPassword"
                    value={signUpCredentials?.confirmedPassword}
                    onChange={handleChange}
                    placeholder={intl.formatMessage({ id: 'confirmPassword' })}
                    required
                />
                <input
                    type="text"
                    id="first-name"
                    name="firstName"
                    value={signUpCredentials?.firstName}
                    onChange={handleChange}
                    placeholder={intl.formatMessage({ id: 'firstName' })}
                    required
                />
                <input
                    type="text"
                    id="last-name"
                    name="lastName"
                    value={signUpCredentials?.lastName}
                    onChange={handleChange}
                    placeholder={intl.formatMessage({ id: 'lastName' })}
                    required
                />
                {error &&
                    <div className="error-message">{error}</div>
                }
                <SignUpButton />
            </form>
        </section>
    );
}
