import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import LoadingBars from '../components/ui/LoadingBars';
import PaginationBar from '../components/ui/PaginationBar';

const GET_ORDERS_METHOD = 'get';
const GET_ORDERS_URL = '/orders';

export default function Orders() {
    const intl = useIntl();

    const [orders, setOrders] = useState();
    const [displayedOrders, setDisplayedOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await axios.request({
                method: GET_ORDERS_METHOD,
                url: GET_ORDERS_URL
            });
            setOrders(response?.data);
        }
        fetchOrders();
    }, []);

    return (
        <>{orders ?
            <>
                <div>
                    <div className="list-header">
                        <div className="cell">
                            <span><FormattedMessage id="book" /></span>
                        </div>
                        <div className="cell">
                            <span><FormattedMessage id="user" /></span>
                        </div>
                        <div className="cell">
                            <span><FormattedMessage id="rentalType" /></span>
                        </div>
                        <div className="cell">
                            <span><FormattedMessage id="startDate" /></span>
                        </div>
                        <div className="cell">
                            <span><FormattedMessage id="endDate" /></span>
                        </div>
                        <div className="cell">
                            <span><FormattedMessage id="returnDate" /></span>
                        </div>
                        <div className="cell">
                            <span><FormattedMessage id="rentalState" /></span>
                        </div>
                    </div>
                    <div className="items-list">
                        {displayedOrders.map((order) =>
                            <div className="row" key={order.id}>
                                <Link to={`/order/${order.id}`} className="cell link">
                                    <span>{order?.book?.title}</span>
                                </Link>
                                <div className="cell">
                                    <span>{order?.user?.login}</span>
                                </div>
                                <div className="cell">
                                    <span><FormattedMessage id={order?.rentalType} /></span>
                                </div>
                                <div className="cell">
                                    <span>{moment(order?.startDate).format(intl.formatMessage({ id: 'dateFormat' }))}</span>
                                </div>
                                <div className="cell">
                                    <span>{moment(order?.endDate).format(intl.formatMessage({ id: 'dateFormat' }))}</span>
                                </div>
                                <div className="cell">
                                    <span>{order?.returnDate && moment(order?.returnDate).format(intl.formatMessage({ id: 'dateFormat' }))}</span>
                                </div>
                                <div className="cell">
                                    <span><FormattedMessage id={order?.state} /></span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <PaginationBar items={orders} setDisplayedItems={setDisplayedOrders} maxItemsPerPage={5} initialPage={1} />
            </>
            : <LoadingBars />
        }
        </>
    );
}
