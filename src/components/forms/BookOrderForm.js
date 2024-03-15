import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

const PLACE_ORDER_METHOD = 'post';
const PLACE_ORDER_URL = '/orders/'

export default function BookOrderForm({ bookId }) {

    BookOrderForm.propTypes = {
        bookId: PropTypes.number.isRequired,
    };

    const navigate = useNavigate();

    const [order, setOrder] = useState({
        rentalType: 'OUT_OF_LIBRARY',
        days: 7
    });
    const [error, setError] = useState('');

    useEffect(() => setError(''),
        [order]);

    const setDaysRadiosDisabled = (disabled) => {
        let daysRadios = document.getElementsByName("days");
        daysRadios.forEach((radio) => radio.disabled = disabled);
    }

    const handleTypeChange = (e, disableDays) => {
        setDaysRadiosDisabled(disableDays);
        if (disableDays) {
            setOrder(prev => ({ ...prev, days: 0 }));
        }
        handleChange(e);
    }

    const handleChange = (e) => {
        setOrder(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.request({
                method: PLACE_ORDER_METHOD,
                url: PLACE_ORDER_URL + bookId,
                data: JSON.stringify(order)
            });
            navigate('/orders/', { replace: true });
        } catch (err) {
            if (!err?.response) {
                setError('No response from server');
            } else if (err.response?.status === 400) {
                setError(err.response?.data?.error);
            } else {
                setError('Could not place the order');
            }
        }
    }

    return (
        <form id="order-book" className="form" onSubmit={handleSubmit}>
            <p><FormattedMessage id="rentalType" />:</p>
            <div>
                <input
                    type="radio"
                    id="out-of-library"
                    name="rentalType"
                    value="OUT_OF_LIBRARY"
                    onChange={(e) => handleTypeChange(e, false)}
                    checked={order?.rentalType === "OUT_OF_LIBRARY"}
                />
                <label htmlFor="out-of-library"><FormattedMessage id="OUT_OF_LIBRARY" /></label>
                <input
                    type="radio"
                    id="to-reading-hall"
                    name="rentalType"
                    value="TO_READING_HALL"
                    onChange={(e) => handleTypeChange(e, true)}
                    checked={order?.rentalType === "TO_READING_HALL"}
                />
                <label htmlFor="to-reading-hall"><FormattedMessage id="TO_READING_HALL" /></label>
            </div>
            <p><FormattedMessage id="days" />:</p>
            <div>
                <input
                    type="radio"
                    id="7"
                    name="days"
                    value="7"
                    onChange={handleChange}
                    checked={order?.days.toString() === "7"}
                />
                <label htmlFor="7">7</label>
                <input
                    type="radio"
                    id="14"
                    name="days"
                    value="14"
                    onChange={handleChange}
                    checked={order?.days.toString() === "14"}
                />
                <label htmlFor="14">14</label>
                <input
                    type="radio"
                    id="21"
                    name="days"
                    value="21"
                    onChange={handleChange}
                    checked={order?.days.toString() === "21"}
                />
                <label htmlFor="21">21</label>
            </div>
            {error &&
                <div className="error-message">{error}</div>
            }
        </form>
    )
}
