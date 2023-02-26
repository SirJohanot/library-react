import React from 'react';
import { FormattedMessage } from 'react-intl';
import GoBackButton from '../components/ui/GoBackButton';

export default function Missing() {
    return (
        <>
            <div className="container round-bordered-subject main-page-message">
                <h1><FormattedMessage id="missingPage" /></h1>
            </div>
            <div className="buttons-container">
                <GoBackButton />
            </div>
        </>
    );
}
