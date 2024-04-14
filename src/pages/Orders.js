import moment from 'moment/moment';
import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import LoadingBars from '../components/ui/LoadingBars';
import PaginationBar from '../components/ui/PaginationBar';
import SearchField from '../components/ui/SearchField';

const GET_ORDERS_METHOD = 'get';
const GET_ORDERS_URL = '/orders';

export default function Orders() {
    const intl = useIntl();

    const [orders, setOrders] = useState();
    const [searchedOrders, setSearchedOrders] = useState([]);
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
        document.title = `${intl.formatMessage({ id: 'orders' })} | ${intl.formatMessage({ id: 'appName' })}`;
    }, [intl]);

    const orderFitsSearch = useCallback((order, line) => {
        const lowercaseLine = line.toLowerCase();
        const lowercaseLineKeywords = lowercaseLine.split(' ');
        return lowercaseLineKeywords.every(keyword =>
            order.book.title.toLowerCase().includes(keyword)
            || order.user.login.toLowerCase().includes(keyword)
            || order.rentalType.toLowerCase().includes(keyword)
            || order.startDate.toString().toLowerCase().includes(keyword)
            || order.endDate.toString().toLowerCase().includes(keyword)
            || order.returnDate?.toString()?.toLowerCase()?.includes(keyword)
            || order.state.toLowerCase().includes(keyword)
        );
    }, []);

    return (
        <>{orders ?
            <>
                <SearchField items={orders} setSearchedItems={setSearchedOrders} itemFitsSearch={orderFitsSearch} />
                <div>
                    <div className="list-header">
                        <div className="important cell">
                            <span><FormattedMessage id="book" /></span>
                        </div>
                        <div className="important cell">
                            <span><FormattedMessage id="user" /></span>
                        </div>
                        <div className="cell">
                            <span><FormattedMessage id="rentalType" /></span>
                        </div>
                        <div className="cell">
                            <span><FormattedMessage id="startDate" /></span>
                        </div>
                        <div className="important cell">
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
                                <Link to={`/order/${order.id}`} className="important cell link">
                                    <span>{order?.book?.title}</span>
                                </Link>
                                <div className="important cell">
                                    <span>{order?.user?.login}</span>
                                </div>
                                <div className="cell">
                                    <span><FormattedMessage id={order?.rentalType} /></span>
                                </div>
                                <div className="cell">
                                    <span>{moment(order?.startDate).format(intl.formatMessage({ id: 'dateFormat' }))}</span>
                                </div>
                                <div className="important cell">
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
                <PaginationBar items={searchedOrders} setDisplayedItems={setDisplayedOrders} maxItemsPerPage={5} initialPage={1} />
            </>
            : <LoadingBars />
        }
        </>
    );
}
