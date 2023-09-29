import moment from 'moment/moment';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

export default function OrderParameters({ order }) {
    const intl = useIntl();

    return (
        <>
            <h1>{`${order?.book?.title} | ${order?.user?.login}`}</h1>
            <p><span className="parameter-name"><FormattedMessage id="startDate" />:</span> {moment(order?.startDate).format(intl.formatMessage({ id: 'dateFormat' }))} </p>
            <p><span className="parameter-name"><FormattedMessage id="endDate" />:</span> {moment(order?.endDate).format(intl.formatMessage({ id: 'dateFormat' }))}</p>
            {order?.returnDate &&
                <p><span className="parameter-name"><FormattedMessage id="returnDate" />:</span> {moment(order?.returnDate).format(intl.formatMessage({ id: 'dateFormat' }))}</p>
            }
            <p><span className="parameter-name"><FormattedMessage id="rentalType" />:</span> {order?.rentalType && <FormattedMessage id={order?.rentalType} />}</p>
            <p><span className="parameter-name"><FormattedMessage id="rentalState" />:</span> {order?.state && <FormattedMessage id={order?.state} />}</p>
        </>
    );
}
