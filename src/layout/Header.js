import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import useAuthentication from '../hooks/useAuthentication';

export default function Header() {
    const { authentication, setAuthentication } = useAuthentication();

    const navigate = useNavigate();

    const handleSignOut = () => {
        setAuthentication({});
        axios.interceptors.request.clear();
        navigate('/sign-in', { replace: true });
    }

    return (
        <header>
            <div className="logotype">
                <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 4.84969V16.7397C22 17.7097 21.21 18.5997 20.24 18.7197L19.93 18.7597C18.29 18.9797 15.98 19.6597 14.12 20.4397C13.47 20.7097 12.75 20.2197 12.75 19.5097V5.59969C12.75 5.22969 12.96 4.88969 13.29 4.70969C15.12 3.71969 17.89 2.83969 19.77 2.67969H19.83C21.03 2.67969 22 3.64969 22 4.84969Z"></path>
                    <path d="M10.7083 4.70969C8.87828 3.71969 6.10828 2.83969 4.22828 2.67969H4.15828C2.95828 2.67969 1.98828 3.64969 1.98828 4.84969V16.7397C1.98828 17.7097 2.77828 18.5997 3.74828 18.7197L4.05828 18.7597C5.69828 18.9797 8.00828 19.6597 9.86828 20.4397C10.5183 20.7097 11.2383 20.2197 11.2383 19.5097V5.59969C11.2383 5.21969 11.0383 4.88969 10.7083 4.70969ZM4.99828 7.73969H7.24828C7.65828 7.73969 7.99828 8.07969 7.99828 8.48969C7.99828 8.90969 7.65828 9.23969 7.24828 9.23969H4.99828C4.58828 9.23969 4.24828 8.90969 4.24828 8.48969C4.24828 8.07969 4.58828 7.73969 4.99828 7.73969ZM7.99828 12.2397H4.99828C4.58828 12.2397 4.24828 11.9097 4.24828 11.4897C4.24828 11.0797 4.58828 10.7397 4.99828 10.7397H7.99828C8.40828 10.7397 8.74828 11.0797 8.74828 11.4897C8.74828 11.9097 8.40828 12.2397 7.99828 12.2397Z"></path>
                </svg>
                <h1><FormattedMessage id="appName" /></h1>
            </div>
            <ul className="menu">
                {authentication?.login &&
                    <>
                        <li>
                            <div className="category centered">
                                <Link className="link" to="/books/">
                                    <FormattedMessage id="books" />
                                </Link>
                            </div>
                        </li>
                        {authentication?.roles?.find((role) => role === 'READER') &&
                            <li>
                                <div className="category centered">
                                    <Link className="link" to="/orders/">
                                        <FormattedMessage id="myOrders" />
                                    </Link>
                                </div>
                            </li>
                        }
                        {authentication?.roles?.find((role) => role === 'LIBRARIAN') &&
                            <li>
                                <div className="category centered">
                                    <Link className="link" to="/orders/">
                                        <FormattedMessage id="orders" />
                                    </Link>
                                </div>
                            </li>
                        }
                        {authentication?.roles?.find((role) => role === 'ADMIN') &&
                            <>
                                <li>
                                    <div className="category centered">
                                        <Link className="link" to="/add-book">
                                            <FormattedMessage id="addABook" />
                                        </Link>
                                    </div>
                                </li>
                                <li>
                                    <div className="category centered">
                                        <Link className="link" to="/users/">
                                            <FormattedMessage id="users" />
                                        </Link>
                                    </div>
                                </li>
                            </>
                        }
                        <li className="separator" ></li>
                        <li>
                            <div className="category">
                                <div className="centered">
                                    <svg
                                        width="34px"
                                        height="40px"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M16.5 7.063C16.5 10.258 14.57 13 12 13c-2.572 0-4.5-2.742-4.5-5.938C7.5 3.868 9.16 2 12 2s4.5 1.867 4.5 5.063zM4.102 20.142C4.487 20.6 6.145 22 12 22c5.855 0 7.512-1.4 7.898-1.857a.416.416 0 0 0 .09-.317C19.9 18.944 19.106 15 12 15s-7.9 3.944-7.989 4.826a.416.416 0 0 0 .091.317z"
                                            fill="#FFFFFF" />
                                    </svg>
                                </div>
                                <div className="centered profile-login">
                                    <p>{authentication?.login}</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="category">
                                <button type="button" className="sign-out-button centered" onClick={handleSignOut}>
                                    <svg width="34px" height="40px" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.2929 14.2929C16.9024 14.6834 16.9024 15.3166 17.2929 15.7071C17.6834 16.0976 18.3166 16.0976 18.7071 15.7071L21.6201 12.7941C21.6351 12.7791 21.6497 12.7637 21.6637 12.748C21.87 12.5648 22 12.2976 22 12C22 11.7024 21.87 11.4352 21.6637 11.252C21.6497 11.2363 21.6351 11.2209 21.6201 11.2059L18.7071 8.29289C18.3166 7.90237 17.6834 7.90237 17.2929 8.29289C16.9024 8.68342 16.9024 9.31658 17.2929 9.70711L18.5858 11H13C12.4477 11 12 11.4477 12 12C12 12.5523 12.4477 13 13 13H18.5858L17.2929 14.2929Z" />
                                        <path d="M5 2C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H14.5C15.8807 22 17 20.8807 17 19.5V16.7326C16.8519 16.647 16.7125 16.5409 16.5858 16.4142C15.9314 15.7598 15.8253 14.7649 16.2674 14H13C11.8954 14 11 13.1046 11 12C11 10.8954 11.8954 10 13 10H16.2674C15.8253 9.23514 15.9314 8.24015 16.5858 7.58579C16.7125 7.4591 16.8519 7.35296 17 7.26738V4.5C17 3.11929 15.8807 2 14.5 2H5Z" />
                                    </svg>
                                </button>
                            </div>
                        </li>
                    </>
                }
            </ul>
        </header>
    );
}
