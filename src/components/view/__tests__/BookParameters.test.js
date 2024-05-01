import { render, screen } from '@testing-library/react';
import React from 'react';
import BookParameters from '../BookParameters';

jest.mock('react-intl', () => ({
    FormattedMessage: (props) => <>{props.id}</>
}));

describe('BookParameters', () => {
    const book = {
        title: 'Book Title',
        authors: [{ name: 'Author 1' }, { name: 'Author 2' }],
        genre: { name: 'Genre' },
        publisher: { name: 'Publisher' },
        publicationYear: 2022,
        amount: 10,
    };

    it('renders book parameters correctly', () => {
        render(<BookParameters book={book} />);

        const titleElement = screen.getByText('bookTitle:');
        const authorsElement = screen.getByText('authors:');
        const genreElement = screen.getByText('genre:');
        const publisherElement = screen.getByText('publisher:');
        const publicationYearElement = screen.getByText('publicationYear:');
        const inStockElement = screen.getByText('inStock:');

        expect(titleElement).toBeInTheDocument();
        expect(authorsElement).toBeInTheDocument();
        expect(genreElement).toBeInTheDocument();
        expect(publisherElement).toBeInTheDocument();
        expect(publicationYearElement).toBeInTheDocument();
        expect(inStockElement).toBeInTheDocument();
    });

    it('displays correct book information', () => {
        render(<BookParameters book={book} />);

        const titleValue = screen.getByText("bookTitle:").nextSibling.nextSibling.textContent;
        const authorsValue = screen.getByText("authors:").nextSibling.nextSibling.textContent;
        const genreValue = screen.getByText("genre:").nextSibling.nextSibling.textContent;
        const publisherValue = screen.getByText("publisher:").nextSibling.nextSibling.textContent;
        const publicationYearValue = screen.getByText("publicationYear:").nextSibling.nextSibling.textContent;
        const inStockValue = screen.getByText("inStock:").nextSibling.nextSibling.textContent;

        expect(titleValue).toBe('Book Title');
        expect(authorsValue).toBe('Author 1, Author 2');
        expect(genreValue).toBe('Genre');
        expect(publisherValue).toBe('Publisher');
        expect(publicationYearValue).toBe('2022');
        expect(inStockValue).toBe('10');
    });

    it('uses FormattedMessage component for parameter names', () => {
        render(<BookParameters book={book} />);

        const titleElement = screen.getByText('bookTitle:');
        const authorsElement = screen.getByText('authors:');
        const genreElement = screen.getByText('genre:');
        const publisherElement = screen.getByText('publisher:');
        const publicationYearElement = screen.getByText('publicationYear:');
        const inStockElement = screen.getByText('inStock:');

        expect(titleElement).toContainHTML('<FormattedMessage');
        expect(authorsElement).toContainHTML('<FormattedMessage');
        expect(genreElement).toContainHTML('<FormattedMessage');
        expect(publisherElement).toContainHTML('<FormattedMessage');
        expect(publicationYearElement).toContainHTML('<FormattedMessage');
        expect(inStockElement).toContainHTML('<FormattedMessage');
    });
});