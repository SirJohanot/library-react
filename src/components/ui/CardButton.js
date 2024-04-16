import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

export default function CardButton({ symbol, text, destination }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(destination, { replace: true });
    }

    return (
        <button type="button" className="card-button btn" onClick={(e) => handleClick()}>
            {symbol}
            <div>
                <FormattedMessage id={text} />
            </div>
        </button>
    );
}
