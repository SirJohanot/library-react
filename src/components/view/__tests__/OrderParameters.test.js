import { render, screen } from '@testing-library/react';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { LOCALES } from '../../../i18n/locales.js';
import { messages } from '../../../i18n/messages.js';
import OrderParameters from '../OrderParameters.js';

describe('OrderParameters', () => {
    const order = {
        user: { login: 'Gohan' },
        book: { title: 'Example Book' },
        startDate: '10.10.2023',
        endDate: '10.19.2023',
        returnDate: '10.16.2023',
        rentalType: 'OUT_OF_LIBRARY',
        state: 'BOOK_RETURNED'
    };

    it('renders order parameters correctly', () => {
        render(<IntlProvider locale={LOCALES.ENGLISH} messages={messages[LOCALES.ENGLISH]}><OrderParameters order={order} /></IntlProvider>);

        expect(screen.getByText('Example Book | Gohan')).toBeInTheDocument();
        expect(screen.getByText('Start date:')).toBeInTheDocument();
        expect(screen.getByText('10/10/2023')).toBeInTheDocument();
        expect(screen.getByText('End date:')).toBeInTheDocument();
        expect(screen.getByText('19/10/2023')).toBeInTheDocument();
        expect(screen.getByText('Return date:')).toBeInTheDocument();
        expect(screen.getByText('16/10/2023')).toBeInTheDocument();
        expect(screen.getByText('Rental type:')).toBeInTheDocument();
        expect(screen.getByText('out of library')).toBeInTheDocument();
        expect(screen.getByText('State:')).toBeInTheDocument();
        expect(screen.getByText('book returned')).toBeInTheDocument();
    });

    it('renders order parameters with missing data', () => {
        render(<IntlProvider locale={LOCALES.ENGLISH} messages={messages[LOCALES.ENGLISH]}><OrderParameters order={order} /></IntlProvider>);

        expect(screen.getByText('Start date:')).toBeInTheDocument();
        expect(screen.getByText('End date:')).toBeInTheDocument();
        expect(screen.getByText('Return date:')).toBeInTheDocument();
        expect(screen.getByText('Rental type:')).toBeInTheDocument();
        expect(screen.getByText('State:')).toBeInTheDocument();
    });
});