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

    it('displays correct user information', () => {
        render(<IntlProvider locale={LOCALES.ENGLISH} messages={messages[LOCALES.ENGLISH]}><UserParameters user={user} /></IntlProvider>);

        const loginValue = screen.getByText("Login:").nextSibling.nextSibling.textContent;
        const firstNameValue = screen.getByText("First name:").nextSibling.nextSibling.textContent;
        const lastNameValue = screen.getByText("Last name:").nextSibling.nextSibling.textContent;
        const roleValue = screen.getByText("Role:").nextSibling.nextSibling.textContent;
        const blockedValue = screen.getByText("Blocked:").nextSibling.nextSibling.textContent;

        expect(loginValue).toBe('john_doe');
        expect(firstNameValue).toBe('John');
        expect(lastNameValue).toBe('Doe');
        expect(roleValue).toBe('admin');
        expect(blockedValue).toBe('no');
    });

    it('uses FormattedMessage component for parameter names', () => {
        render(<IntlProvider locale={LOCALES.ENGLISH} messages={messages[LOCALES.ENGLISH]}><UserParameters user={user} /></IntlProvider>);

        const loginElement = screen.getByText('Login:');
        const firstNameElement = screen.getByText('First name:');
        const lastNameElement = screen.getByText('Last name:');
        const roleElement = screen.getByText('Role:');
        const blockedElement = screen.getByText('Blocked:');

        expect(loginElement).toContainHTML('<FormattedMessage');
        expect(firstNameElement).toContainHTML('<FormattedMessage');
        expect(lastNameElement).toContainHTML('<FormattedMessage');
        expect(roleElement).toContainHTML('<FormattedMessage');
        expect(blockedElement).toContainHTML('<FormattedMessage');
    });
});