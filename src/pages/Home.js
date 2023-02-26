import React from 'react';
import { FormattedMessage } from 'react-intl';
import useAuthentication from '../hooks/useAuthentication';

export default function Home() {
    const { authentication } = useAuthentication();

    return (
        <section id="main-content">
            <div id="main-content-centered-element">
                <div className="main-page-message">
                    <h1><FormattedMessage id="greetingsMessage" />, {authentication?.login}</h1>
                </div>
            </div>
        </section>
    );
}
