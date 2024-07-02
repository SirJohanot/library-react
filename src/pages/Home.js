import React, { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import AddBookSymbol from '../components/symbols/AddBookSymbol.js';
import BookSymbol from '../components/symbols/BookSymbol';
import OrdersSymbol from '../components/symbols/OrdersSymbol';
import ProfileSymbol from '../components/symbols/ProfileSymbol';
import QuillSymbol from '../components/symbols/QuillSymbol.js';
import ThemeSymbol from '../components/symbols/ThemeSymbol.js';
import CardButton from '../components/ui/CardButton';
import useAuthentication from '../hooks/useAuthentication';

export default function Home() {
    const intl = useIntl();

    const { authentication } = useAuthentication();

    useEffect(() => {
        document.title = intl.formatMessage({ id: 'mainTitle' });
    }, [intl]);

    return (
        <div className="home-page">
            <div className="main-page-message">
                <h1><FormattedMessage id="greetingsMessage" />{authentication?.login && `, ${authentication?.login}`}</h1>
            </div>
            <div className="card-buttons-container">
                <CardButton symbol={<BookSymbol />} text="books" destination="/books/" />
                <CardButton symbol={<QuillSymbol />} text="authors" destination="/authors/" />
                <CardButton symbol={<ThemeSymbol />} text="themes" destination="/classifiers/" />
                {authentication?.roles?.length !== 0 &&
                    <CardButton symbol={<ProfileSymbol />} text="profile" destination="/profile/" />
                }
                {authentication?.roles?.find((role) => role === 'READER') &&
                    <CardButton symbol={<OrdersSymbol />} text="myOrders" destination="/orders/" />
                }
                {authentication?.roles?.find((role) => role === 'LIBRARIAN') &&
                    <CardButton symbol={<OrdersSymbol />} text="orders" destination="/orders/" />
                }
                {authentication?.roles?.find((role) => role === 'ADMIN') &&
                    <>
                        <CardButton symbol={<AddBookSymbol />} text="addABook" destination="/add-book" />
                        <CardButton symbol={<ProfileSymbol />} text="users" destination="/users/" />
                    </>
                }
            </div>
        </div>
    );
}
