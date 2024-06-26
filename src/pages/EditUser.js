import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../api/axios';
import FormWrapper from '../components/forms/FormWrapper';
import LoadingBars from '../components/ui/LoadingBars';
import { isAHumanName } from '../utility/validator';

const GET_USER_METHOD = 'get';
const GET_USER_URL = '/users/';

const EDIT_USER_METHOD = 'put';
const EDIT_USER_URL = '/users/';

export default function EditUser() {
    const { login } = useParams();

    const intl = useIntl();

    const navigate = useNavigate();

    const [user, setUser] = useState();
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
            document.title = `${intl.formatMessage({ id: 'edit' })} ${response?.data?.login} | ${intl.formatMessage({ id: 'appName' })}`;
        }
        fetchUser();
    }, [login, intl]);

    useEffect(() => {
        setErrors(prev => ({ ...prev, other: '' }));
    }, [user]);

    const validateField = useCallback(
        (key, validateAgainst, errorMessage) => {
            if (user && !validateAgainst(user[key])) {
                setErrors(prev => ({ ...prev, [key]: errorMessage }));
                return true;
            }
            return false;
        }, [user]);

    useEffect(() => {
        if (validateField('firstName', (firstName) => firstName, 'fieldRequired')) {
            return;
        }
        if (validateField('firstName', isAHumanName, 'fieldRequired')) {
            return;
        }
        setErrors(prev => ({ ...prev, firstName: '' }));
    }, [user?.firstName, validateField]);

    useEffect(() => {
        if (validateField('lastName', (lastName) => lastName, 'fieldRequired')) {
            return;
        }
        if (validateField('lastName', isAHumanName, 'fieldRequired')) {
            return;
        }
        setErrors(prev => ({ ...prev, lastName: '' }));
    }, [user?.lastName, validateField]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.request({
                method: EDIT_USER_METHOD,
                url: EDIT_USER_URL + user?.id,
                data: JSON.stringify(user)
            });
            toast.success(intl.formatMessage({ id: 'success' }) + '!');
            navigate(`/user/${login}`, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrors(prev => ({ ...prev, other: 'noResponse' }));
            } else if (err.response?.status === 400) {
                setErrors(prev => ({ ...prev, other: err.response?.data?.error }));
            } else {
                setErrors(prev => ({ ...prev, other: 'failure' }));
            }
        }
    }

    const formHasErrors = () => {
        return (errors?.firstName || errors?.lastName).length > 0;
    }

    const handleChange = (e) => {
        setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    return (
        <>
            {user ?
                <FormWrapper formName={intl.formatMessage({ id: 'edit' })} formId="user-changes" cancelPath={`/user/${login}`} submitDisabled={formHasErrors()} submitName={intl.formatMessage({ id: 'commitChanges' })}>
                    <form id="user-changes" className="form" onSubmit={handleSubmit}>
                        <h1><FormattedMessage id="loginLocale" />: {user?.login}</h1>
                        <div className="form-element">
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
                        </div>
                        <div className="form-element">
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
                        </div>
                        <div className="form-element">
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
                        </div>
                        {errors?.other &&
                            <div className="error-message">{errors?.other}</div>
                        }
                    </form>
                </FormWrapper>
                : <LoadingBars />
            }
        </>
    )
}
