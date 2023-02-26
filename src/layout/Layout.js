import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ setCurrentLocale }) {
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
