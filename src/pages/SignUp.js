import React, { useEffect, useRef, useState } from 'react';
import axios from '../api/axios';

const SIGN_UP_METHOD = 'post';
const SIGN_UP_URL = '/users';

export default function SignUp() {
    const loginRef = useRef();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        loginRef.current.focus();
    }, []);

    useEffect(() => {
        setError('');
    }, [login, password, confirmedPassword, firstName, lastName]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPassword('');
        setConfirmedPassword('');
        try {
            await axios.request({
                method: SIGN_UP_METHOD,
                url: SIGN_UP_URL,
                data: JSON.stringify({ login, password, confirmedPassword, firstName, lastName }),
                headers: "Content-Type: application/json"
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

    return (
        <section id="main-content">
            <form className="login-form round-bordered-subject" autoComplete="on" onSubmit={handleSubmit}>
                <input type="text" id="login" value={login} onChange={(e) => setLogin(e.target.value)} ref={loginRef} placeholder="Login" required />
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <input type="password" id="confirmed-password" value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)} placeholder="Confirm password" required />
                <input type="text" id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" required />
                <input type="text" id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" required />
                {error &&
                    <div className="error-message">{error}</div>
                }
                <button>Sign up</button>
            </form>
        </section>
    )
}
