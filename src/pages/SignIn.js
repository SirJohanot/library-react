import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

const SIGN_IN_URL = '/users/auth';
const SIGN_IN_METHOD = 'post';

export default function SignIn() {
    const { setAuthentication } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";

    const loginRef = useRef();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        loginRef.current.focus();
    }, []);

    useEffect(() => {
        setError('');
    }, [login, password]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setPassword('');
        try {
            const response = await axios.request({
                method: SIGN_IN_METHOD,
                url: SIGN_IN_URL,
                data: {},
                auth: {
                    username: login,
                    password: password
                }
            });
            const roles = response?.data?.roles;
            setAuthentication({ login, password, roles });
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setError('No response from server');
            } else switch (err.response?.status) {
                case 400:
                    setError('Missing login or password');
                    break;
                case 401:
                    setError('Invalid credentials');
                    break;
                default:
                    setError('Authentication failed');
            }
        }
    }

    return (
        <section id="main-content">
            <form className="login-form round-bordered-subject" autoComplete="on" onSubmit={handleSubmit}>
                <input type="text" id="login" value={login} onChange={(e) => setLogin(e.target.value)} ref={loginRef} placeholder="Login" required />
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                {error &&
                    <div className="error-message">{error}</div>
                }
                <button>Sign in</button>
                <Link className="button" to="/sign-up">Sign up</Link>
            </form>
        </section>
    )
}
