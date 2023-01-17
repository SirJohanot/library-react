import React from 'react';

export default function OrderParameters({ order }) {
    return (
        <>
            <p>Start date: {order?.startDate}</p>
            <p>End date: {order?.endDate}</p>
            {order?.returnDate &&
                <p>Return date: {order?.returnDate}</p>
            }
            <p>Rental type: {order?.rentalType}</p>
            <p>State: {order?.state}</p>
        </>
    )
}
