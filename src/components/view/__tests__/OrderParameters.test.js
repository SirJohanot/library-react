import { render, screen } from '@testing-library/react';
import moment from 'moment/moment';
import React from 'react';
import OrderParameters from '../OrderParameters.js';

jest.mock('react-intl', () => ({
    FormattedMessage: (props) => <>{props.id}</>,
    useIntl: () => ({
        formatMessage: () => 'DD/MM/YYYY'
    })
}));

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
        render(<OrderParameters order={order} />);

        const titleElement = screen.getByText('Book Title | JohnDoe');
        const startDateElement = screen.getByText('startDate:');
        const endDateElement = screen.getByText('endDate:');
        const returnDateElement = screen.getByText('returnDate:');
        const rentalTypeElement = screen.getByText('rentalType:');
        const rentalStateElement = screen.getByText('rentalState:');

        expect(titleElement).toBeInTheDocument();
        expect(startDateElement).toBeInTheDocument();
        expect(endDateElement).toBeInTheDocument();
        expect(returnDateElement).toBeInTheDocument();
        expect(rentalTypeElement).toBeInTheDocument();
        expect(rentalStateElement).toBeInTheDocument();
    });

    it('displays correct order information', () => {
        render(<OrderParameters order={order} />);

        const startDateValue = screen.getByText("startDate:").nextSibling.nextSibling.textContent;
        const endDateValue = screen.getByText("endDate:").nextSibling.nextSibling.textContent;
        const returnDateValue = screen.getByText("returnDate:").nextSibling.nextSibling.textContent;
        const rentalTypeValue = screen.getByText("rentalType:").nextSibling.nextSibling.textContent;
        const rentalStateValue = screen.getByText("rentalState:").nextSibling.nextSibling.textContent;

        expect(startDateValue).toBe(moment('2022-01-01').format('DD/MM/YYYY'));
        expect(endDateValue).toBe(moment('2022-01-10').format('DD/MM/YYYY'));
        expect(returnDateValue).toBe(moment('2022-01-12').format('DD/MM/YYYY'));
        expect(rentalTypeValue).toBe('OUT_OF_LIBRARY');
        expect(rentalStateValue).toBe('BOOK_RETURNED');
    });

    it('uses FormattedMessage component for parameter names', () => {
        render(<OrderParameters order={order} />);

        const startDateElement = screen.getByText('startDate:');
        const endDateElement = screen.getByText('endDate:');
        const returnDateElement = screen.getByText('returnDate:');
        const rentalTypeElement = screen.getByText('rentalType:');
        const rentalStateElement = screen.getByText('rentalState:');

        expect(startDateElement).toContainHTML('<FormattedMessage');
        expect(endDateElement).toContainHTML('<FormattedMessage');
        expect(returnDateElement).toContainHTML('<FormattedMessage');
        expect(rentalTypeElement).toContainHTML('<FormattedMessage');
        expect(rentalStateElement).toContainHTML('<FormattedMessage');
    });
});