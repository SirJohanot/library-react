import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import PaginationBar from '../components/ui/PaginationBar';
import OrderParameters from '../components/view/OrderParameters';
import useAuthentication from '../hooks/useAuthentication';

const GET_ORDERS_METHOD = 'get';
const GET_ORDERS_URL = '/orders';

export default function Orders() {
    const { authentication } = useAuthentication();

    const [orders, setOrders] = useState([]);
    const [displayedOrders, setDisplayedOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await axios.request({
                method: GET_ORDERS_METHOD,
                url: GET_ORDERS_URL,
                auth: {
                    username: authentication?.login,
                    password: authentication?.password
                }
            });
            setOrders(response?.data);
        }
        fetchOrders();
    }, [authentication])

    return (
        <section id="main-content">
            <div id="main-content-centered-element">
                {displayedOrders.map((order) =>
                    <Link to={`/order/${order.id}`} key={order.id}>
                        <button className="round-bordered-subject block-container">
                            <OrderParameters order={order} />
                        </button>
                    </Link>
                )}
                <PaginationBar items={orders} setDisplayedItems={setDisplayedOrders} maxItemsPerPage={5} initialPage={1} />
            </div>
        </section>
    )
}
