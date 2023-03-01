import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';
import LoadingBars from '../components/ui/LoadingBars';
import OrderParameters from '../components/view/OrderParameters';
import useAuthentication from '../hooks/useAuthentication';

const GET_ORDER_METHOD = 'get';
const GET_ORDER_URL = '/orders/';

const CHANGE_ORDER_STATE_METHOD = 'patch';
const CHANGE_ORDER_STATE_URL = '/orders/';

export default function Order() {
    const { authentication } = useAuthentication();

    const { id } = useParams();

    const navigate = useNavigate();

    const [order, setOrder] = useState();

    const fetchOrder = useCallback(async () => {
        const response = await axios.request({
            method: GET_ORDER_METHOD,
            url: GET_ORDER_URL + id
        });
        setOrder(response?.data);
    }, [id]);

    useEffect(() => {
        try {
            fetchOrder();
        } catch (err) {
            navigate('/unauthorized', { replace: true });
        }
    }, [fetchOrder, navigate]);

    const handleStateChange = async (action) => {
        await axios.request({
            method: CHANGE_ORDER_STATE_METHOD,
            url: `${CHANGE_ORDER_STATE_URL}${order?.id}/${action}`
        });
        fetchOrder();
    }

    return (
        <>{order ?
            <>
                <div className="round-bordered-subject block-container">
                    <OrderParameters order={order} />
                </div>
                {(authentication?.roles?.includes('LIBRARIAN') && order?.state === 'PLACED') &&
                    <div className="buttons-container">
                        <button className="red" onClick={() => handleStateChange('decline')}><FormattedMessage id="decline" /></button>
                        <button onClick={() => handleStateChange('approve')}><FormattedMessage id="approveOrder" /></button>
                    </div>}
                {authentication?.roles?.includes('READER') &&
                    <div className="buttons-container">
                        {order?.state === 'APPROVED' && <button onClick={() => handleStateChange('collect')}><FormattedMessage id="collectOrder" /></button>}
                        {order?.state === 'BOOK_TAKEN' && <button onClick={() => handleStateChange('return')}><FormattedMessage id="returnOrder" /></button>}
                    </div>}
            </>
            : <LoadingBars />
        }
        </>
    );
}
