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

});