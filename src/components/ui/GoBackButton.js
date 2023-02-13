import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

export default function GoBackButton() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    }

    return (
        <button type="button" onClick={(e) => handleGoBack()}><FormattedMessage id="goBack" /></button>
    );
}
