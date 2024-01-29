import { render, screen } from '@testing-library/react';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { LOCALES } from '../../../i18n/locales.js';
import { messages } from '../../../i18n/messages.js';
import FormWrapper from '../FormWrapper.js';

describe('FormWrapper', () => {
    it('renders component correctly', () => {
        render(<BrowserRouter><IntlProvider locale={LOCALES.ENGLISH} messages={messages[LOCALES.ENGLISH]}><FormWrapper /></IntlProvider></BrowserRouter>);

        expect(screen.getAllByRole('button')).toBeTruthy();
    });
});