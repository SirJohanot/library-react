import React, { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import GoBackButton from '../components/ui/GoBackButton';

export default function Unauthorized() {
    const intl = useIntl();

    useEffect(() => {
        document.title = `${intl.formatMessage({ id: 'insufficientPrivileges' })} | ${intl.formatMessage({ id: 'appName' })}`;
    }, [intl]);


    return (
        <div>
            <div className="container round-bordered-subject main-page-message">
                <h1><FormattedMessage id="insufficientPrivileges" /></h1>
            </div>
            <div className="buttons-container">
                <GoBackButton />
            </div>
        </div>
    );
}
