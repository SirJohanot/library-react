import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import signoutSymbol from '../assets/sign_out_symbol.png';
import logo from '../assets/white_book_symbol.png';
import languageSymbol from '../assets/white_globe_symbol.png';
import useAuthentication from '../hooks/useAuthentication';
import { LOCALES } from '../i18n/locales';

export default function Header({ setCurrentLocale }) {

    const { authentication, setAuthentication } = useAuthentication();

    const navigate = useNavigate();

    const handleSignOut = () => {
        setAuthentication({});
        axios.interceptors.request.clear();
        navigate("/sign-in", { replace: true });
    }

    return (
        <header>
            <div className="container">
                <img src={logo} alt="Book symbol" />
                <h1><FormattedMessage id="appName" /></h1>
                <h1 className="right-header-buttons">
                    {authentication?.login &&
                        <div className="sign-out-button">
                            <button type="button" onClick={(e) => { handleSignOut() }}>
                                <img src={signoutSymbol} alt="Sign out symbol" />
                            </button>
                        </div>
                    }
                    <div id="language-change">
                        <button type="button">
                            <img src={languageSymbol} alt="Globe symbol" />
                        </button>
                        <div className="dropdown-content">
                            <button type="button" value={LOCALES.ENGLISH} onClick={(e) => { setCurrentLocale(e.target.value) }}><FormattedMessage id="englishCode" /></button>
                            <button type="button" value={LOCALES.RUSSIAN} onClick={(e) => { setCurrentLocale(e.target.value) }}><FormattedMessage id="russianCode" /></button>
                            <button type="button" value={LOCALES.BELARUSIAN} onClick={(e) => { setCurrentLocale(e.target.value) }}><FormattedMessage id="belarusianCode" /></button>
                        </div>
                    </div>
                </h1>
            </div>
        </header>
    )
}
