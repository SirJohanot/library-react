import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import BookSymbol from '../components/symbols/BookSymbol';
import SignOutSymbol from '../components/symbols/SignOutSymbol';
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
            <Link to="/" className="link">
                <div className="logotype">
                    <BookSymbol />
                    <h1 className="desktop"><FormattedMessage id="appName" /></h1>
                </div>
            </Link>
            <ul className="menu">
                {authentication?.login &&
                    <>
                        <li className="desktop">
                            <div className="category centered">
                                <Link className="link" to="/books/">
                                    <FormattedMessage id="books" />
                                </Link>
                            </div>
                        </li>
                        {authentication?.roles?.find((role) => role === 'READER') &&
                            <li className="desktop">
                                <div className="category centered">
                                    <Link className="link" to="/orders/">
                                        <FormattedMessage id="myOrders" />
                                    </Link>
                                </div>
                            </li>
                        }
                        {authentication?.roles?.find((role) => role === 'LIBRARIAN') &&
                            <li className="desktop">
                                <div className="category centered">
                                    <Link className="link" to="/orders/">
                                        <FormattedMessage id="orders" />
                                    </Link>
                                </div>
                            </li>
                        }
                        {authentication?.roles?.find((role) => role === 'ADMIN') &&
                            <>
                                <li className="desktop">
                                    <div className="category centered">
                                        <Link className="link" to="/add-book">
                                            <FormattedMessage id="addABook" />
                                        </Link>
                                    </div>
                                </li>
                                <li className="desktop">
                                    <div className="category centered">
                                        <Link className="link" to="/users/">
                                            <FormattedMessage id="users" />
                                        </Link>
                                    </div>
                                </li>
                            </>
                        }
                        <li className="desktop separator" ></li>
                        <li>
                            <div className="category">
                                <div className="centered profile-login">
                                    <p>{authentication?.login}</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="category">
                                <button type="button" className="sign-out-button centered" onClick={handleSignOut}>
                                    <SignOutSymbol />
                                </button>
                            </div>
                        </li>
                    </>
                }
            </ul>
        </header>
    );
}
