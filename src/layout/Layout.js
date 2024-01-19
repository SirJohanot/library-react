import { PropTypes } from 'prop-types';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ setCurrentLocale }) {

    Layout.propTypes = {
        setCurrentLocale: PropTypes.func.isRequired,
    };

    return (
        <>
            <Header />
            <section id="main-content">
                <Outlet />
            </section>
            <Footer setCurrentLocale={setCurrentLocale} />
        </>
    );
}
