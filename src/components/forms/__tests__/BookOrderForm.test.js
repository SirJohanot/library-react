import { render, screen } from '@testing-library/react';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { LOCALES } from '../../../i18n/locales.js';
import { messages } from '../../../i18n/messages.js';
import BookOrderForm from '../BookOrderForm.js';

describe('BookOrderForm', () => {
    it('renders form correctly', () => {
        render(<BrowserRouter><IntlProvider locale={LOCALES.ENGLISH} messages={messages[LOCALES.ENGLISH]}><BookOrderForm bookId={1} /></IntlProvider></BrowserRouter>);

        expect(screen.getAllByRole('radio').length).toBe(5);
    });
});