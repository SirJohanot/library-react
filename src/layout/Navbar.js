import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav>
            <Link className="button" to="/books/">Books</Link>
            <Link className="button" to="/orders/">My Orders</Link>
            <Link className="button" to="/orders/">Orders</Link>
            <Link className="button" to="/add-book">Add a Book</Link>
            <Link className="button" to="/users/">Users</Link>
        </nav>
    )
}