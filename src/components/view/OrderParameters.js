import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function OrderParameters({ order }) {
    return (
        <>
            <p><FormattedMessage id="startDate" />: {order?.startDate}</p>
            <p><FormattedMessage id="endDate" />: {order?.endDate}</p>
            {order?.returnDate &&
                <p><FormattedMessage id="returnDate" />: {order?.returnDate}</p>
            }
            <p><FormattedMessage id="rentalType" />: {order?.rentalType}</p>
            <p><FormattedMessage id="rentalState" />: {order?.state}</p>
        </>
    )
}
