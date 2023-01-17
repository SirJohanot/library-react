import React from 'react';
import { Link } from 'react-router-dom';
import useAuthentication from '../hooks/useAuthentication';

export default function Navbar() {

    const { authentication } = useAuthentication();

    return (
        <>
            {authentication?.login &&
                <nav>
                    <Link className="button" to="/books/" > Books</Link>
                    {authentication?.roles?.find((role) => role === "READER") &&
                        <Link className="button" to="/orders/">My Orders</Link>
                    }
                    {authentication?.roles?.find((role) => role === "LIBRARIAN") &&
                        <Link className="button" to="/orders/">Orders</Link>
                    }
                    {authentication?.roles?.find((role) => role === "ADMIN") &&
                        <>
                            <Link className="button" to="/add-book">Add a Book</Link>
                            <Link className="button" to="/users/">Users</Link>
                        </>
                    }
                </nav>
            }
        </>
    )
}