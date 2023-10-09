import { render, screen } from '@testing-library/react';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { LOCALES } from '../../../i18n/locales.js';
import { messages } from '../../../i18n/messages.js';
import UserParameters from '../UserParameters.js';

describe('BookParameters', () => {
    const user = {
        login: 'Gohan',
        firstName: 'Gregory',
        lastName: 'Floppenkovich',
        role: 'ADMIN',
        blocked: false,
    };

    it('renders user parameters correctly', () => {
        render(<IntlProvider locale={LOCALES.ENGLISH} messages={messages[LOCALES.ENGLISH]}><UserParameters user={user} /></IntlProvider>);

        expect(screen.getByText('Login:')).toBeInTheDocument();
        expect(screen.getByText('Gohan')).toBeInTheDocument();
        expect(screen.getByText('First name:')).toBeInTheDocument();
        expect(screen.getByText('Gregory')).toBeInTheDocument();
        expect(screen.getByText('Last name:')).toBeInTheDocument();
        expect(screen.getByText('Floppenkovich')).toBeInTheDocument();
        expect(screen.getByText('Role:')).toBeInTheDocument();
        expect(screen.getByText('Admin')).toBeInTheDocument();
        expect(screen.getByText('Blocked:')).toBeInTheDocument();
        expect(screen.getByText('no')).toBeInTheDocument();
    });

    it('renders user parameters with missing data', () => {
        render(<IntlProvider locale={LOCALES.ENGLISH} messages={messages[LOCALES.ENGLISH]}><UserParameters user={user} /></IntlProvider>);

        expect(screen.getByText('Login:')).toBeInTheDocument();
        expect(screen.getByText('First name:')).toBeInTheDocument();
        expect(screen.getByText('Last name:')).toBeInTheDocument();
        expect(screen.getByText('Role:')).toBeInTheDocument();
        expect(screen.getByText('Blocked:')).toBeInTheDocument();
    });
});