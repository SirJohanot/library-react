import { render, screen } from '@testing-library/react';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { LOCALES } from '../../../i18n/locales.js';
import { messages } from '../../../i18n/messages.js';
import BookOrderForm from '../BookOrderForm.js';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

jest.mock('../../../api/axios', () => ({
    request: jest.fn(),
}));

describe('BookOrderForm', () => {
    const mockBookId = 123;

    it('renders the form with initial values', () => {
        render(<IntlProvider locale={LOCALES.ENGLISH} messages={messages[LOCALES.ENGLISH]}><BookOrderForm bookId={mockBookId} /></IntlProvider>);

        expect(screen.getByText('Rental type:')).toBeInTheDocument();

        const outOfLibraryRadio = screen.getByLabelText('out of library');
        expect(outOfLibraryRadio).toBeInTheDocument();
        expect(outOfLibraryRadio).toBeChecked();

        const toReadingHallRadio = screen.getByLabelText('to reading hall');
        expect(toReadingHallRadio).toBeInTheDocument();
        expect(toReadingHallRadio).not.toBeChecked();

        expect(screen.getByText('Days:')).toBeInTheDocument();

        const radio7 = screen.getByLabelText('7');
        expect(radio7).toBeInTheDocument();
        expect(radio7).toBeChecked();

        const radio14 = screen.getByLabelText('14');
        expect(radio14).toBeInTheDocument();
        expect(radio14).not.toBeChecked();

        const radio21 = screen.getByLabelText('21');
        expect(radio21).toBeInTheDocument();
        expect(radio21).not.toBeChecked();
    });
});