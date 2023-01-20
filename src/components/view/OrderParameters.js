import React from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';

export default function OrderParameters({ order }) {
    return (
        <>
            <h1>{`${order?.book?.title} | ${order?.user?.login}`}</h1>
            <p><FormattedMessage id="startDate" />: <FormattedDate value={order?.startDate} /></p>
            <p><FormattedMessage id="endDate" />: <FormattedDate value={order?.endDate} /></p>
            {order?.returnDate &&
                <p><FormattedMessage id="returnDate" />: <FormattedDate value={order?.returnDate} /></p>
            }
            <p><FormattedMessage id="rentalType" />: {order?.rentalType && <FormattedMessage id={order?.rentalType} />}</p>
            <p><FormattedMessage id="rentalState" />: {order?.state && <FormattedMessage id={order?.state} />}</p>
        </>
    )
}
