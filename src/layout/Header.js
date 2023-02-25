import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import logo from '../assets/white_book_symbol.png';
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
                <img src={logo} alt="Book symbol" />
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
