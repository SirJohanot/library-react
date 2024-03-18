import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import BookOrderForm from '../BookOrderForm.js';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

jest.mock('../../../api/axios', () => ({
    request: jest.fn(),
}));

jest.mock('react-intl', () => ({
    FormattedMessage: (props) => {
        return <>{props.id}</>
    }
}));

describe('BookOrderForm', () => {
    const mockBookId = 123;

    it('renders the form with initial values', () => {
        render(<BookOrderForm bookId={mockBookId} />);

        expect(screen.getByText('rentalType:')).toBeInTheDocument();

        const outOfLibraryRadio = screen.getByLabelText('OUT_OF_LIBRARY');
        expect(outOfLibraryRadio).toBeInTheDocument();
        expect(outOfLibraryRadio).toBeChecked();

        const toReadingHallRadio = screen.getByLabelText('TO_READING_HALL');
        expect(toReadingHallRadio).toBeInTheDocument();
        expect(toReadingHallRadio).not.toBeChecked();

        expect(screen.getByText('days:')).toBeInTheDocument();

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

    it('changes rental type and days when radio buttons are clicked', () => {
        render(<BookOrderForm bookId={mockBookId} />);

        const toReadingHallRadio = screen.getByLabelText('TO_READING_HALL');
        fireEvent.click(toReadingHallRadio);

        expect(toReadingHallRadio).toBeChecked();
        expect(screen.getByLabelText('OUT_OF_LIBRARY')).not.toBeChecked();
        expect(screen.getByLabelText('7')).toBeDisabled();
        expect(screen.getByLabelText('14')).toBeDisabled();
        expect(screen.getByLabelText('21')).toBeDisabled();

        const outOfLibraryRadio = screen.getByLabelText('OUT_OF_LIBRARY');
        fireEvent.click(outOfLibraryRadio);

        expect(outOfLibraryRadio).toBeChecked();
        expect(toReadingHallRadio).not.toBeChecked();
        expect(screen.getByLabelText('7')).not.toBeDisabled();
        expect(screen.getByLabelText('14')).not.toBeDisabled();
        expect(screen.getByLabelText('21')).not.toBeDisabled();
    });

});