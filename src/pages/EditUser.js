import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';
import FormWrapper from '../components/forms/FormWrapper';
import LoadingBars from '../components/ui/LoadingBars';
import { isHumanName } from '../utility/validator';

const GET_USER_METHOD = 'get';
const GET_USER_URL = '/users/';

const EDIT_USER_METHOD = 'put';
const EDIT_USER_URL = '/users/';

export default function EditUser() {
    const { login } = useParams();

    const intl = useIntl();

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

    const validateField = useCallback(
        (key, validateAgainst, errorMessage) => {
            if (!validateAgainst(user[key])) {
                setErrors(prev => ({ ...prev, [key]: errorMessage }));
                return true;
            }
            return false;
        }, [user]);

    useEffect(() => {
        if (validateField('firstName', (firstName) => firstName, 'fieldRequired')) {
            return;
        }
        if (validateField('firstName', isHumanName, 'fieldRequired')) {
            return;
        }
        setErrors(prev => ({ ...prev, firstName: '' }));
    }, [user?.firstName, validateField]);

    useEffect(() => {
        if (validateField('lastName', (lastName) => lastName, 'fieldRequired')) {
            return;
        }
        if (validateField('lastName', isHumanName, 'fieldRequired')) {
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

    const formHasErrors = () => {
        return (
            errors?.firstName
            || errors?.lastName
        );
    }

    const handleChange = (e) => {
        setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    return (
        <>
            {user?.role ?
                <>
                    <FormWrapper formName={intl.formatMessage({ id: 'edit' })} formId="user-changes" cancelPath={`/user/${login}`} submitDisabled={formHasErrors()} submitName={intl.formatMessage({ id: 'commitChanges' })}>
                        <form id="user-changes" className="form" onSubmit={handleSubmit}>
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
                    </FormWrapper>
                </>
                : <LoadingBars />
            }
        </>
    )
}
