import React from 'react';

export default function UserParameters({ user }) {
    return (
        <>
            <h1>Login: {user?.login}</h1>
            <p>First name: {user?.firstName}</p>
            <p>Last name: {user?.lastName}</p>
            <p>Role: {user?.role}</p>
            <p>Blocked: {user?.blocked}</p>
        </>
    )
}
