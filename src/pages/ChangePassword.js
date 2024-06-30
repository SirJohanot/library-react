import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import useAuthentication from '../hooks/useAuthentication';

const CHANGE_PASSWORD_METHOD = 'patch';
const CHANGE_PASSWORD_URL = '/users/change-password';

export default function SignUp() {
    const intl = useIntl();

    const { authentication, setAuthentication } = useAuthentication();

    const navigate = useNavigate();

    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmedPassword: ''
    });
    const [errors, setErrors] = useState({
        currentPassword: '',
        newPassword: '',
        confirmedPassword: '',
        other: ''
    });

    useEffect(() => {
        document.title = `${intl.formatMessage({ id: 'changePassword' })} | ${authentication.login}`;
    }, [intl, authentication]);

    const validateField = useCallback(
        (key, validateAgainst, errorMessage) => {
            if (!validateAgainst(passwords[key])) {
                setErrors(prev => ({ ...prev, [key]: errorMessage }));
                return true;
            }
            return false;
        }, [passwords]);

    useEffect(() => {
        if (validateField('currentPassword', (currentPassword) => currentPassword, 'fieldRequired')) {
            return;
        }
        setErrors(prev => ({ ...prev, currentPassword: '' }));
    }, [passwords?.currentPassword, validateField]);

    useEffect(() => {
        if (validateField('newPassword', (newPassword) => newPassword, 'fieldRequired')) {
            return;
        }
        setErrors(prev => ({ ...prev, newPassword: '' }));
    }, [passwords?.newPassword, validateField]);

    useEffect(() => {
        if (passwords?.newPassword !== passwords?.confirmedPassword) {
            setErrors(prev => ({ ...prev, confirmedPassword: 'passwordsDoNotMatch' }));
        } else {
            setErrors(prev => ({ ...prev, confirmedPassword: '' }));
        }
    }, [passwords?.newPassword, passwords?.confirmedPassword]);

    useEffect(() => {
        setErrors(prev => ({ ...prev, other: '' }));
    }, [passwords]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwords.currentPassword !== authentication.passwords) {
            setErrors(prev => ({ ...prev, other: 'currentPasswordError' }));
        }
        try {
            await axios.request({
                method: CHANGE_PASSWORD_METHOD,
                url: CHANGE_PASSWORD_URL,
                data: JSON.stringify(passwords.newPassword)
            });
            setAuthentication({});
            navigate('/sign-in', { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrors(prev => ({ ...prev, other: 'noResponse' }));
            } else if (err.response?.status === 400) {
                setErrors(prev => ({ ...prev, other: err.response?.data?.error }));
            }
        }
    }

    const formHasErrors = () => {
        return (errors?.currentPassword
            || errors?.newPassword
            || errors?.confirmedPassword).length > 0;
    }

    const handleChange = (e) => {
        setPasswords(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    return (
        <div className="centered">
            <form className="form smaller-form" onSubmit={handleSubmit}>
                <div className="form-element">
                    <input
                        className={errors?.currentPassword ? 'red-border' : ''}
                        type="password"
                        id="current-password"
                        name="currentPassword"
                        value={passwords?.currentPassword}
                        onChange={handleChange}
                        placeholder={intl.formatMessage({ id: 'currentPassword' })}
                        required
                    />
                    {errors?.currentPassword &&
                        <div className="field-error"><FormattedMessage id={errors?.currentPassword} /></div>
                    }
                </div>
                <div className="form-element">
                    <input
                        className={errors?.newPassword ? 'red-border' : ''}
                        type="password"
                        id="new-password"
                        name="newPassword"
                        value={passwords?.newPassword}
                        onChange={handleChange}
                        placeholder={intl.formatMessage({ id: 'newPassword' })}
                        required
                    />
                    {errors?.newPassword &&
                        <div className="field-error"><FormattedMessage id={errors?.newPassword} /></div>
                    }
                </div>
                <div className="form-element">
                    <input
                        className={errors?.confirmedPassword ? 'red-border' : ''}
                        type="password"
                        id="confirmed-password"
                        name="confirmedPassword"
                        value={passwords?.confirmedPassword}
                        onChange={handleChange}
                        placeholder={intl.formatMessage({ id: 'confirmPassword' })}
                        required
                    />
                    {errors?.confirmedPassword &&
                        <div className="field-error"><FormattedMessage id={errors?.confirmedPassword} /></div>
                    }
                </div>
                {errors?.other &&
                    <div className="error-message"><FormattedMessage id={errors?.other} /></div>
                }
                <div className="centered">
                    <button className="btn" disabled={formHasErrors()}><FormattedMessage id="changePassword" /></button>
                </div>
            </form>
        </div>
    );
}
