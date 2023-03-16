import React, { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import useAuthentication from '../hooks/useAuthentication';

export default function Home() {
    const intl = useIntl();

    const { authentication } = useAuthentication();

    useEffect(() => {
        document.title = intl.formatMessage({ id: 'mainTitle' });
    }, [intl]);

    return (
        <div className="main-page-message">
            <h1><FormattedMessage id="greetingsMessage" />, {authentication?.login}</h1>
        </div>
    );
}
