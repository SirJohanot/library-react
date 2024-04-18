import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react';
import Switch from 'react-switch';
import { LOCALES } from '../i18n/locales';

export default function Footer({ locale, setCurrentLocale }) {

    Footer.propTypes = {
        setCurrentLocale: PropTypes.func.isRequired,
    };

    const handleLocaleChange = (e) => {
        setCurrentLocale(e.target.value);
    }

    const [isDarkMode, setDarkMode] = useState(false);

    useEffect(() => {
        let body = document.body;
        if (isDarkMode) {
            body.classList.remove('light');
            body.classList.add('dark');
        } else {
            body.classList.remove('dark');
            body.classList.add('light');
        }
    }, [isDarkMode]);

    return (
        <footer>
            <select onChange={handleLocaleChange}>
                <option selected={locale === LOCALES.ENGLISH} value={LOCALES.ENGLISH}>English</option>
                <option selected={locale === LOCALES.RUSSIAN} value={LOCALES.RUSSIAN}>Русский</option>
                <option selected={locale === LOCALES.BELARUSIAN} value={LOCALES.BELARUSIAN}>Беларуская</option>
            </select>
            <Switch onChange={() => setDarkMode(prev => !prev)}
                checked={isDarkMode}
                onColor="#86d3ff"
                onHandleColor="#2693e6"
                handleDiameter={30}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={48} />
        </footer>
    );
}
