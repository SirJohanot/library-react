import React from 'react';

export default function UserParameters(props) {
    return (
        <>
            <h1>Login: {props.user.login}</h1>
            <p>First name: {props.user.firstName}</p>
            <p>Last name: {props.user.lastName}</p>
            <p>Role: {props.user.role}</p>
            <p>Blocked: {props.user.blocked}</p>
        </>
    )
}
