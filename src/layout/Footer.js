import { PropTypes } from 'prop-types';
import React from 'react';
import { LOCALES } from '../i18n/locales';

export default function Footer({ setCurrentLocale }) {

    Footer.propTypes = {
        setCurrentLocale: PropTypes.func.isRequired,
    };

    const handleLocaleChange = (e) => {
        setCurrentLocale(e.target.value);
    }

    return (
        <footer>
            <select onChange={handleLocaleChange}>
                <option value={LOCALES.ENGLISH}>English</option>
                <option value={LOCALES.RUSSIAN}>Русский</option>
                <option value={LOCALES.BELARUSIAN}>Беларуская</option>
            </select>
        </footer>
    );
}
