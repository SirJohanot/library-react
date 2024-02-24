import { render, screen } from '@testing-library/react';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { LOCALES } from '../../../i18n/locales.js';
import { messages } from '../../../i18n/messages.js';
import BookParameters from '../BookParameters';

describe('BookParameters', () => {
    const book = {
        title: 'Book Title',
        authors: [{ name: 'Author 1' }, { name: 'Author 2' }],
        genre: { name: 'Genre' },
        publisher: { name: 'Publisher' },
        publishmentYear: 2022,
        amount: 10,
    };

    it('renders book parameters correctly', () => {
        render(<IntlProvider locale={LOCALES.ENGLISH} messages={messages[LOCALES.ENGLISH]}><BookParameters book={book} /></IntlProvider>);

        const titleElement = screen.getByText('Title:');
        const authorsElement = screen.getByText('Author(s):');
        const genreElement = screen.getByText('Genre:');
        const publisherElement = screen.getByText('Publisher:');
        const publishmentYearElement = screen.getByText('Publishment year:');
        const inStockElement = screen.getByText('In stock:');

        expect(titleElement).toBeInTheDocument();
        expect(authorsElement).toBeInTheDocument();
        expect(genreElement).toBeInTheDocument();
        expect(publisherElement).toBeInTheDocument();
        expect(publishmentYearElement).toBeInTheDocument();
        expect(inStockElement).toBeInTheDocument();
    });

    it('displays correct book information', () => {
        render(<IntlProvider locale={LOCALES.ENGLISH} messages={messages[LOCALES.ENGLISH]}><BookParameters book={book} /></IntlProvider>);

        const titleValue = screen.getByText("Title:").nextSibling.nextSibling.textContent;
        const authorsValue = screen.getByText("Author(s):").nextSibling.nextSibling.textContent;
        const genreValue = screen.getByText("Genre:").nextSibling.nextSibling.textContent;
        const publisherValue = screen.getByText("Publisher:").nextSibling.nextSibling.textContent;
        const publishmentYearValue = screen.getByText("Publishment year:").nextSibling.nextSibling.textContent;
        const inStockValue = screen.getByText("In stock:").nextSibling.nextSibling.textContent;

        expect(titleValue).toBe('Book Title');
        expect(authorsValue).toBe('Author 1, Author 2');
        expect(genreValue).toBe('Genre');
        expect(publisherValue).toBe('Publisher');
        expect(publishmentYearValue).toBe('2022');
        expect(inStockValue).toBe('10');
    });

    it('uses FormattedMessage component for parameter names', () => {
        render(<IntlProvider locale={LOCALES.ENGLISH} messages={messages[LOCALES.ENGLISH]}><BookParameters book={book} /></IntlProvider>);

        const titleElement = screen.getByText('Title:');
        const authorsElement = screen.getByText('Author(s):');
        const genreElement = screen.getByText('Genre:');
        const publisherElement = screen.getByText('Publisher:');
        const publishmentYearElement = screen.getByText('Publishment year:');
        const inStockElement = screen.getByText('In stock:');

        expect(titleElement).toContainHTML('<FormattedMessage');
        expect(authorsElement).toContainHTML('<FormattedMessage');
        expect(genreElement).toContainHTML('<FormattedMessage');
        expect(publisherElement).toContainHTML('<FormattedMessage');
        expect(publishmentYearElement).toContainHTML('<FormattedMessage');
        expect(inStockElement).toContainHTML('<FormattedMessage');
    });
});