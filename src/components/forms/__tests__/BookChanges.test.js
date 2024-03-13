import { render, screen } from '@testing-library/react';
import React from 'react';
import BookChanges from '../BookChanges.js';

jest.mock('react-intl', () => ({
    FormattedMessage: (props) => {
        return <>{props.id}</>
    }
}));

describe('BookChanges', () => {
    const mockBook = {
        title: 'Book Title',
        authors: 'John Doe',
        genre: 'Fiction',
        publisher: 'Publisher Name',
        publishmentYear: '2022',
        amount: '10',
    };

    it('renders the form with input fields', () => {
        render(<BookChanges book={mockBook} setBook={() => { }} handleSubmit={() => { }} error="" setDisabled={() => { }} />);

        expect(screen.getByLabelText('bookTitle:')).toBeInTheDocument();
        expect(screen.getByLabelText('authors (commaSeparated):')).toBeInTheDocument();
        expect(screen.getByLabelText('genre:')).toBeInTheDocument();
        expect(screen.getByLabelText('publisher:')).toBeInTheDocument();
        expect(screen.getByLabelText('publishmentYear:')).toBeInTheDocument();
        expect(screen.getByLabelText('inStock:')).toBeInTheDocument();
    });

    it('displays error messages for invalid input', () => {
        const noTitleBook = {
            title: '',
            authors: 'John Doe',
            genre: 'Fiction',
            publisher: 'Publisher Name',
            publishmentYear: '2022',
            amount: '10',
        };

        render(<BookChanges book={noTitleBook} setBook={() => { }} handleSubmit={() => { }} error="" setDisabled={() => { }} />);

        expect(screen.getByText('fieldRequired')).toBeInTheDocument();
    });
});