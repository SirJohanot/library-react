import { render, screen } from '@testing-library/react';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { LOCALES } from '../../../i18n/locales.js';
import { messages } from '../../../i18n/messages.js';
import SearchField from '../SearchField.js';

describe('SearchField', () => {
    it('renders component correctly', () => {
        render(<IntlProvider locale={LOCALES.ENGLISH} messages={messages[LOCALES.ENGLISH]}><SearchField setSearchedItems={(items) => { }} /></IntlProvider>);

        expect(screen.getByRole('textbox')).toBeInTheDocument;
    });

    it('initial search line is empty', () => {
        render(<IntlProvider locale={LOCALES.ENGLISH} messages={messages[LOCALES.ENGLISH]}><SearchField setSearchedItems={(items) => { }} /></IntlProvider>);

        expect(screen.getByRole('textbox')).toHaveValue('');
    });
});