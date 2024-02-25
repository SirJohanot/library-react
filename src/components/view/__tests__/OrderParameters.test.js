import { render, screen } from '@testing-library/react';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { LOCALES } from '../../../i18n/locales.js';
import { messages } from '../../../i18n/messages.js';
import OrderParameters from '../OrderParameters.js';

describe('OrderParameters', () => {
    const order = {
        book: { title: 'Book Title' },
        user: { login: 'JohnDoe' },
        startDate: '2022-01-01',
        endDate: '2022-01-10',
        returnDate: '2022-01-12',
        rentalType: 'physical',
        state: 'returned',
    };

    it('renders order parameters correctly', () => {
        render(<IntlProvider locale={LOCALES.ENGLISH} messages={messages[LOCALES.ENGLISH]}><OrderParameters order={order} /></IntlProvider>);

        const titleElement = screen.getByText('Book Title | JohnDoe');
        const startDateElement = screen.getByText('Start date:');
        const endDateElement = screen.getByText('End date:');
        const returnDateElement = screen.getByText('Return date:');
        const rentalTypeElement = screen.getByText('Rental type:');
        const rentalStateElement = screen.getByText('State:');

        expect(titleElement).toBeInTheDocument();
        expect(startDateElement).toBeInTheDocument();
        expect(endDateElement).toBeInTheDocument();
        expect(returnDateElement).toBeInTheDocument();
        expect(rentalTypeElement).toBeInTheDocument();
        expect(rentalStateElement).toBeInTheDocument();
    });
});