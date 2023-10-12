import { render, screen } from '@testing-library/react';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { LOCALES } from '../../../i18n/locales.js';
import { messages } from '../../../i18n/messages.js';
import GoBackButton from '../GoBackButton.js';

describe('GoBackButton', () => {
    it('renders button correctly', () => {
        render(<BrowserRouter><IntlProvider locale={LOCALES.ENGLISH} messages={messages[LOCALES.ENGLISH]}><GoBackButton /></IntlProvider></BrowserRouter>);

        expect(screen.getByText('Go Back')).toBeInTheDocument();
    });
});