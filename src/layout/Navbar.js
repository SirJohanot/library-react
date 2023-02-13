import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import useAuthentication from '../hooks/useAuthentication';

export default function Navbar() {
    const { authentication } = useAuthentication();

    return (
        <>
            {authentication?.login &&
                <nav>
                    <Link to="/books/">
                        <button><FormattedMessage id="books" /></button>
                    </Link>
                    {authentication?.roles?.find((role) => role === 'READER') &&
                        <Link to="/orders/">
                            <button><FormattedMessage id="myOrders" /></button>
                        </Link>
                    }
                    {authentication?.roles?.find((role) => role === 'LIBRARIAN') &&
                        <Link to="/orders/">
                            <button><FormattedMessage id="orders" /></button>
                        </Link>
                    }
                    {authentication?.roles?.find((role) => role === 'ADMIN') &&
                        <>
                            <Link to="/add-book">
                                <button><FormattedMessage id="addABook" /></button>
                            </Link>
                            <Link to="/users/">
                                <button><FormattedMessage id="users" /></button>
                            </Link>
                        </>
                    }
                </nav>
            }
        </>
    );
}