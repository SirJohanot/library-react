import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav>
            <div>
                <Link to="/books/">
                    <button type="button">Books</button>
                </Link>
                <Link to="/orders/">
                    <button type="button">My Orders</button>
                </Link>
                <Link to="/orders/">
                    <button type="button">Orders</button>
                </Link>
                <Link to="/add-book">
                    <button type="button">Add a Book</button>
                </Link>
                <Link to="/users/">
                    <button type="button">Users</button>
                </Link>
            </div>
        </nav>
    );
}
