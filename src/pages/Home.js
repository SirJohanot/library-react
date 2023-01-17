import React from 'react';
import useAuthentication from '../hooks/useAuthentication';

export default function Home() {

    const { authentication } = useAuthentication();

    return (
        <section id="main-content">
            <div id="main-content-centered-element">
                <div className="container round-bordered-subject main-page-message">
                    <h1>Greetings, {authentication?.login}</h1>
                </div>
            </div>
        </section>
    )
}
