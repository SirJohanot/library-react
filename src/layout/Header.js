import React from 'react';
import signoutSymbol from '../resources/sign_out_symbol.png';
import logo from '../resources/white_book_symbol.png';
import languageSymbol from '../resources/white_globe_symbol.png';

export default function Header() {
    return (
        <header>
            <div className="container">
                <img src={logo} alt="Book symbol" />
                <h1>Library</h1>
                <h1 className="right-header-buttons">
                    <div className="sign-out-button">
                        <button type="button">
                            <img src={signoutSymbol} alt="Sign out symbol" />
                        </button>
                    </div>
                    <div id="language-change">
                        <button type="button">
                            <img src={languageSymbol} alt="Globe symbol" />
                        </button>
                        <div className="dropdown-content">
                            <button type="button" name="lang" value="en">EN</button>
                            <button type="button" name="lang" value="ru">RU</button>
                            <button type="button" name="lang" value="bel">BEL</button>
                        </div>
                    </div>
                </h1>
            </div>
        </header>
    );
}
