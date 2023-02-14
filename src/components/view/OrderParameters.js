import moment from 'moment/moment';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

export default function OrderParameters({ order }) {
    const intl = useIntl();

    return (
        <>
            <h1>{`${order?.book?.title} | ${order?.user?.login}`}</h1>
            <p><FormattedMessage id="startDate" />: {moment(order?.startDate).format(intl.formatMessage({ id: 'dateFormat' }))} </p>
            <p><FormattedMessage id="endDate" />: {moment(order?.endDate).format(intl.formatMessage({ id: 'dateFormat' }))}</p>
            {order?.returnDate &&
                <p><FormattedMessage id="returnDate" />: {moment(order?.returnDate).format(intl.formatMessage({ id: 'dateFormat' }))}</p>
            }
            <p><FormattedMessage id="rentalType" />: {order?.rentalType && <FormattedMessage id={order?.rentalType} />}</p>
            <p><FormattedMessage id="rentalState" />: {order?.state && <FormattedMessage id={order?.state} />}</p>
        </>
    );
}
