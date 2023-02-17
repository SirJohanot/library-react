import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { isHumanName } from '../utility/validator';

const SIGN_UP_METHOD = 'post';
const SIGN_UP_URL = '/users';

export default function SignUp() {
    const intl = useIntl();

    const navigate = useNavigate();

    const loginRef = useRef();

    const [signUpCredentials, setSignUpCredentials] = useState({
        login: '',
        password: '',
        confirmedPassword: '',
        firstName: '',
        lastName: ''
    });
    const [errors, setErrors] = useState({
        login: '',
        password: '',
        confirmedPassword: '',
        firstName: '',
        lastName: '',
        other: ''
    });

    useEffect(() => {
        loginRef.current.focus();
    }, []);

    const isBlank = useCallback(
        (key) => {
            if (!signUpCredentials[key]) {
                setErrors(prev => ({ ...prev, [key]: 'fieldRequired' }));
                return true;
            }
            return false;
        }, [signUpCredentials]);

    const isNotAWord = useCallback(
        (key) => {
            if (!isHumanName(signUpCredentials[key])) {
                setErrors(prev => ({ ...prev, [key]: 'alphabetical' }));
                return true;
            }
            return false;
        }, [signUpCredentials]);

    useEffect(() => {
        if (isBlank('login')) {
            return;
        }
        setErrors(prev => ({ ...prev, login: '' }));
    }, [signUpCredentials?.login, isBlank]);

    useEffect(() => {
        if (isBlank('password')) {
            return;
        }
        setErrors(prev => ({ ...prev, password: '' }));
    }, [signUpCredentials?.password, isBlank]);

    useEffect(() => {
        if (signUpCredentials?.password !== signUpCredentials?.confirmedPassword) {
            setErrors(prev => ({ ...prev, confirmedPassword: 'passwordsDoNotMatch' }));
        } else {
            setErrors(prev => ({ ...prev, confirmedPassword: '' }));
        }
    }, [signUpCredentials?.password, signUpCredentials?.confirmedPassword]);

    useEffect(() => {
        if (isBlank('firstName')) {
            return;
        }
        if (isNotAWord('firstName')) {
            return;
        }
        setErrors(prev => ({ ...prev, firstName: '' }));
    }, [signUpCredentials?.firstName, isBlank, isNotAWord]);

    useEffect(() => {
        if (isBlank('lastName')) {
            return;
        }
        if (isNotAWord('lastName')) {
            return;
        }
        setErrors(prev => ({ ...prev, lastName: '' }));
    }, [signUpCredentials?.lastName, isBlank, isNotAWord]);

    useEffect(() => {
        setErrors(prev => ({ ...prev, other: '' }));
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
            navigate('/sign-in', { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrors(prev => ({ ...prev, other: 'noResponse' }));
            } else switch (err.response?.status) {
                case 400:
                    setErrors(prev => ({ ...prev, other: err.response?.data?.error }));
                    break;
                default:
                    setErrors(prev => ({ ...prev, other: 'regitrationFailed' }));
            }
        }
    }

    const formhasErrors = () => {
        return (
            errors?.login
            || errors?.password
            || errors?.confirmedPassword
            || errors?.firstName
            || errors?.lastName
        );
    }

    const handleChange = (e) => {
        setSignUpCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    return (
        <section id="main-content">
            <form className="login-form round-bordered-subject" autoComplete="on" onSubmit={handleSubmit}>
                <input
                    className={errors?.login ? 'red-border' : ''}
                    type="text"
                    id="login"
                    name="login"
                    value={signUpCredentials?.login}
                    onChange={handleChange}
                    ref={loginRef}
                    placeholder={intl.formatMessage({ id: 'loginLocale' })}
                    required
                />
                {errors?.login &&
                    <div className="field-error"><FormattedMessage id={errors?.login} /></div>
                }
                <input
                    className={errors?.password ? 'red-border' : ''}
                    type="password"
                    id="password"
                    name="password"
                    value={signUpCredentials?.password}
                    onChange={handleChange}
                    placeholder={intl.formatMessage({ id: 'passwordLocale' })}
                    required
                />
                {errors?.password &&
                    <div className="field-error"><FormattedMessage id={errors?.password} /></div>
                }
                <input
                    className={errors?.confirmedPassword ? 'red-border' : ''}
                    type="password"
                    id="confirmed-password"
                    name="confirmedPassword"
                    value={signUpCredentials?.confirmedPassword}
                    onChange={handleChange}
                    placeholder={intl.formatMessage({ id: 'confirmPassword' })}
                    required
                />
                {errors?.confirmedPassword &&
                    <div className="field-error"><FormattedMessage id={errors?.confirmedPassword} /></div>
                }
                <input
                    className={errors?.firstName ? 'red-border' : ''}
                    type="text"
                    id="first-name"
                    name="firstName"
                    value={signUpCredentials?.firstName}
                    onChange={handleChange}
                    placeholder={intl.formatMessage({ id: 'firstName' })}
                    required
                />
                {errors?.firstName &&
                    <div className="field-error"><FormattedMessage id={errors?.firstName} /></div>
                }
                <input
                    className={errors?.lastName ? 'red-border' : ''}
                    type="text"
                    id="last-name"
                    name="lastName"
                    value={signUpCredentials?.lastName}
                    onChange={handleChange}
                    placeholder={intl.formatMessage({ id: 'lastName' })}
                    required
                />
                {errors?.lastName &&
                    <div className="field-error"><FormattedMessage id={errors?.lastName} /></div>
                }
                {errors?.other &&
                    <div className="error-message"><FormattedMessage id={errors?.other} /></div>
                }
                <button disabled={formhasErrors()}><FormattedMessage id="signUp" /></button>
            </form>
        </section >
    );
}
