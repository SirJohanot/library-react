import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { isAHumanName } from '../utility/validator';

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
        document.title = `${intl.formatMessage({ id: 'signUp' })} | ${intl.formatMessage({ id: 'appName' })}`;
    }, [intl]);

    const validateField = useCallback(
        (key, validateAgainst, errorMessage) => {
            if (!validateAgainst(signUpCredentials[key])) {
                setErrors(prev => ({ ...prev, [key]: errorMessage }));
                return true;
            }
            return false;
        }, [signUpCredentials]);

    useEffect(() => {
        if (validateField('login', (login) => login, 'fieldRequired')) {
            return;
        }
        setErrors(prev => ({ ...prev, login: '' }));
    }, [signUpCredentials?.login, validateField]);

    useEffect(() => {
        if (validateField('password', (password) => password, 'fieldRequired')) {
            return;
        }
        setErrors(prev => ({ ...prev, password: '' }));
    }, [signUpCredentials?.password, validateField]);

    useEffect(() => {
        if (signUpCredentials?.password !== signUpCredentials?.confirmedPassword) {
            setErrors(prev => ({ ...prev, confirmedPassword: 'passwordsDoNotMatch' }));
        } else {
            setErrors(prev => ({ ...prev, confirmedPassword: '' }));
        }
    }, [signUpCredentials?.password, signUpCredentials?.confirmedPassword]);

    useEffect(() => {
        if (validateField('firstName', (firstName) => firstName, 'fieldRequired')) {
            return;
        }
        if (validateField('firstName', isAHumanName, 'fieldRequired')) {
            return;
        }
        setErrors(prev => ({ ...prev, firstName: '' }));
    }, [signUpCredentials?.firstName, validateField]);

    useEffect(() => {
        if (validateField('lastName', (lastName) => lastName, 'fieldRequired')) {
            return;
        }
        if (validateField('lastName', isAHumanName, 'fieldRequired')) {
            return;
        }
        setErrors(prev => ({ ...prev, lastName: '' }));
    }, [signUpCredentials?.lastName, validateField]);

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
            } else if (err.response?.status === 400) {
                setErrors(prev => ({ ...prev, other: err.response?.data?.error }));
            } else {
                setErrors(prev => ({ ...prev, other: 'registrationFailed' }));
            }
        }
    }

    const formHasErrors = () => {
        return (errors?.login
            || errors?.password
            || errors?.confirmedPassword
            || errors?.firstName
            || errors?.lastName).length > 0;
    }

    const handleChange = (e) => {
        setSignUpCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    return (
        <div className="centered">
            <form className="form smaller-form" autoComplete="on" onSubmit={handleSubmit}>
                <div className="form-element">
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
                </div>
                <div className="form-element">
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
                </div>
                <div className="form-element">
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
                </div>
                <div className="form-element">
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
                </div>
                <div className="form-element">
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
                </div>
                {errors?.other &&
                    <div className="error-message"><FormattedMessage id={errors?.other} /></div>
                }
                <div className="centered">
                    <button className="btn" disabled={formHasErrors()}><FormattedMessage id="signUp" /></button>
                </div>
                <div className="b-outline"></div>
                <div>
                    <span>{intl.formatMessage({ id: "alreadyHaveAnAccount" }) + " "}</span>
                    <Link to="/sign-in" className="link dotted-link">
                        <FormattedMessage id="signInLocale" />
                    </Link>
                </div>
            </form>
        </div>
    );
}
