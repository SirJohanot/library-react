import React, { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import GoBackButton from '../components/ui/GoBackButton';

export default function Missing() {
    const intl = useIntl();

    useEffect(() => {
        document.title = intl.formatMessage({ id: 'missingPage' });
    }, [intl]);

    return (
        <div>
            <div className="container round-bordered-subject main-page-message">
                <h1><FormattedMessage id="missingPage" /></h1>
            </div>
            <div className="buttons-container">
                <GoBackButton />
            </div>
        </div>
    );
}
