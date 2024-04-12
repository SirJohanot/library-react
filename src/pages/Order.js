import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';
import LoadingBars from '../components/ui/LoadingBars';
import BookParameters from '../components/view/BookParameters';
import OrderParameters from '../components/view/OrderParameters';
import UserParameters from '../components/view/UserParameters';
import useAuthentication from '../hooks/useAuthentication';

const GET_ORDER_METHOD = 'get';
const GET_ORDER_URL = '/orders/';

const CHANGE_ORDER_STATE_METHOD = 'patch';
const CHANGE_ORDER_STATE_URL = '/orders/';

export default function Order() {
    const intl = useIntl();

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
        document.title = `${intl.formatMessage({ id: 'orders' })}: ${response?.data?.book?.title} | ${intl.formatMessage({ id: 'appName' })}`;
    }, [id, intl]);

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
                <div className="entity-container">
                    <BookParameters book={order?.book} />
                </div>
                {order?.user?.login !== authentication?.login &&
                    <div className="entity-container">
                        <UserParameters user={order?.user} />
                    </div>
                }
                <div>
                    <div className="entity-container">
                        <OrderParameters order={order} />
                    </div>
                    {(authentication?.roles?.includes('LIBRARIAN') && order?.state !== 'BOOK_RETURNED') &&
                        <div className="buttons-container">
                            {order?.state === 'PLACED' &&
                                <>
                                    <button className="btn red" onClick={() => handleStateChange('decline')}><FormattedMessage id="decline" /></button>
                                    <button className="btn" onClick={() => handleStateChange('approve')}><FormattedMessage id="approveOrder" /></button>
                                </>}
                            {order?.state === 'APPROVED' && <button className="btn" onClick={() => handleStateChange('collect')}><FormattedMessage id="collectOrder" /></button>}
                            {order?.state === 'BOOK_TAKEN' && <button className="btn" onClick={() => handleStateChange('return')}><FormattedMessage id="returnOrder" /></button>}
                        </div>}
                </div>
            </>
            : <LoadingBars />
        }
        </>
    );
}
