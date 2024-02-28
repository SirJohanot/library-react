import { render, screen } from '@testing-library/react';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { LOCALES } from '../../../i18n/locales.js';
import { messages } from '../../../i18n/messages.js';
import UserParameters from '../UserParameters.js';

describe('UserParameters', () => {
    const user = {
        login: 'john_doe',
        firstName: 'John',
        lastName: 'Doe',
        role: 'admin',
        blocked: false,
    };

    it('renders user parameters correctly', () => {
        render(<IntlProvider locale={LOCALES.ENGLISH} messages={messages[LOCALES.ENGLISH]}><UserParameters user={user} /></IntlProvider>);

        const loginElement = screen.getByText('Login:');
        const firstNameElement = screen.getByText('First name:');
        const lastNameElement = screen.getByText('Last name:');
        const roleElement = screen.getByText('Role:');
        const blockedElement = screen.getByText('Blocked:');

        expect(loginElement).toBeInTheDocument();
        expect(firstNameElement).toBeInTheDocument();
        expect(lastNameElement).toBeInTheDocument();
        expect(roleElement).toBeInTheDocument();
        expect(blockedElement).toBeInTheDocument();
    });
});