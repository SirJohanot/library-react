import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';
import OrderParameters from '../components/view/OrderParameters';
import useAuthentication from '../hooks/useAuthentication';

const GET_ORDER_METHOD = 'get';
const GET_ORDER_URL = '/orders/';

export default function Order() {
    const { authentication } = useAuthentication();

    const { id } = useParams();

    const navigate = useNavigate();

    const [order, setOrder] = useState({});

    useEffect(() => {
        const fetchOrder = async () => {
            const response = await axios.request({
                method: GET_ORDER_METHOD,
                url: GET_ORDER_URL + id,
                auth: {
                    username: authentication?.login,
                    password: authentication?.password
                }
            });
            setOrder(response?.data);
        }
        try {
            fetchOrder();
        } catch (err) {
            navigate("/unauthorized", { replace: true });
        }
    }, [authentication, id, navigate])

    return (
        <section id="main-content">
            <div id="main-content-centered-element">
                <div className="round-bordered-subject block-container">
                    <OrderParameters order={order} />
                </div>
            </div>
        </section>
    )
}
