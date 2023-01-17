import React from 'react';

export default function OrderParameters(props) {
    return (
        <>
            <p>Start date: {props.order.startDate}</p>
            <p>End date: {props.order.endDate}</p>
            {props.order.returnDate != null &&
                <p>Return date: {props.order.returnDate}</p>
            }
            <p>Rental type: {props.order.rentalType}</p>
            <p>State: {props.order.state}</p>
        </>
    )
}
