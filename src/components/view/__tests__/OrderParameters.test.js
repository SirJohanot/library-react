import { render, screen } from '@testing-library/react';
import moment from 'moment/moment';
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
        rentalType: 'OUT_OF_LIBRARY',
        state: 'BOOK_RETURNED',
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

    it('displays correct order information', () => {
        render(<IntlProvider locale={LOCALES.ENGLISH} messages={messages[LOCALES.ENGLISH]}><OrderParameters order={order} /></IntlProvider>);

        const startDateValue = screen.getByText("Start date:").nextSibling.nextSibling.textContent;
        const endDateValue = screen.getByText("End date:").nextSibling.nextSibling.textContent;
        const returnDateValue = screen.getByText("Return date:").nextSibling.nextSibling.textContent;
        const rentalTypeValue = screen.getByText("Rental type:").nextSibling.nextSibling.textContent;
        const rentalStateValue = screen.getByText("State:").nextSibling.nextSibling.textContent;

        expect(startDateValue).toBe(moment('2022-01-01').format('DD/MM/YYYY'));
        expect(endDateValue).toBe(moment('2022-01-10').format('DD/MM/YYYY'));
        expect(returnDateValue).toBe(moment('2022-01-12').format('DD/MM/YYYY'));
        expect(rentalTypeValue).toBe('out of library');
        expect(rentalStateValue).toBe('book returned');
    });

    it('uses FormattedMessage component for parameter names', () => {
        render(<IntlProvider locale={LOCALES.ENGLISH} messages={messages[LOCALES.ENGLISH]}><OrderParameters order={order} /></IntlProvider>);

        const startDateElement = screen.getByText('Start date:');
        const endDateElement = screen.getByText('End date:');
        const returnDateElement = screen.getByText('Return date:');
        const rentalTypeElement = screen.getByText('Rental type:');
        const rentalStateElement = screen.getByText('State:');

        expect(startDateElement).toContainHTML('<FormattedMessage');
        expect(endDateElement).toContainHTML('<FormattedMessage');
        expect(returnDateElement).toContainHTML('<FormattedMessage');
        expect(rentalTypeElement).toContainHTML('<FormattedMessage');
        expect(rentalStateElement).toContainHTML('<FormattedMessage');
    });
});