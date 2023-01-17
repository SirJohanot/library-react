import React from 'react';
import { Link } from 'react-router-dom';
import useAuthentication from '../hooks/useAuthentication';

export default function Navbar() {

    const { authentication } = useAuthentication();

    return (
        <>
            {authentication?.login &&
                <nav>
                    <Link to="/books/">
                        <button>Books</button>
                    </Link>
                    {authentication?.roles?.find((role) => role === "READER") &&
                        <Link to="/orders/">
                            <button>My Orders</button>
                        </Link>
                    }
                    {authentication?.roles?.find((role) => role === "LIBRARIAN") &&
                        <Link to="/orders/">
                            <button>Orders</button>
                        </Link>
                    }
                    {authentication?.roles?.find((role) => role === "ADMIN") &&
                        <>
                            <Link to="/add-book">
                                <button>Add a Book</button>
                            </Link>
                            <Link to="/users/">
                                <button>Users</button>
                            </Link>
                        </>
                    }
                </nav>
            }
        </>
    )
}