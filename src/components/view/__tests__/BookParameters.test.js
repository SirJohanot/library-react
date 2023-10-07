import { render, screen } from '@testing-library/react';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { LOCALES } from '../../../i18n/locales.js';
import { messages } from '../../../i18n/messages.js';
import BookParameters from '../BookParameters';

describe('BookParameters', () => {
    const book = {
        title: 'Example Book',
        authors: [{ name: 'Author 1' }, { name: 'Author 2' }],
        genre: { name: 'Fantasy' },
        publisher: { name: 'Publisher' },
        publishmentYear: 2021,
        amount: 10,
    };

    const parameterSelector = (text) =>
        (content, element) => {
            return element.children[0] && element.children[0].textContent + element.textContent === text;
        };

    it('renders book parameters correctly', () => {
        render(<IntlProvider locale={LOCALES.ENGLISH} messages={messages[LOCALES.ENGLISH]}><BookParameters book={book} /></IntlProvider>);

        expect(screen.getByText(parameterSelector('Title:'))).toBeInTheDocument();
        expect(screen.getByText(parameterSelector(' Example Book'))).toBeInTheDocument();
        expect(screen.getByText(parameterSelector('Author(s):'))).toBeInTheDocument();
        expect(screen.getByText(parameterSelector(' Author 1, Author 2'))).toBeInTheDocument();
        expect(screen.getByText(parameterSelector('Genre:'))).toBeInTheDocument();
        expect(screen.getByText(parameterSelector(' Fantasy'))).toBeInTheDocument();
        expect(screen.getByText(parameterSelector('Publisher:'))).toBeInTheDocument();
        expect(screen.getByText(parameterSelector(' Publisher'))).toBeInTheDocument();
        expect(screen.getByText(parameterSelector('Publishment year:'))).toBeInTheDocument();
        expect(screen.getByText(parameterSelector(' 2021'))).toBeInTheDocument();
        expect(screen.getByText(parameterSelector('In stock:'))).toBeInTheDocument();
        expect(screen.getByText(parameterSelector(' 10'))).toBeInTheDocument();
    });

    it('renders book parameters with missing data', () => {
        render(<IntlProvider locale={LOCALES.ENGLISH} messages={messages[LOCALES.ENGLISH]}><BookParameters book={{}} /></IntlProvider>);

        expect(screen.getByText(/Title:/)).toBeInTheDocument();
        expect(screen.getByText(/Author\(s\):/)).toBeInTheDocument();
        expect(screen.getByText(/Genre:/)).toBeInTheDocument();
        expect(screen.getByText(/Publisher:/)).toBeInTheDocument();
        expect(screen.getByText(/Publishment year:/)).toBeInTheDocument();
        expect(screen.getByText(/In stock:/)).toBeInTheDocument();
    });
});