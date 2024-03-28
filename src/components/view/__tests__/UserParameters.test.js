import { render, screen } from '@testing-library/react';
import React from 'react';
import UserParameters from '../UserParameters.js';

jest.mock('react-intl', () => ({
    FormattedMessage: (props) => <>{props.id}</>
}));

describe('UserParameters', () => {
    const user = {
        login: 'john_doe',
        firstName: 'John',
        lastName: 'Doe',
        role: 'admin',
        blocked: false,
    };

    it('renders user parameters correctly', () => {
        render(<UserParameters user={user} />);

        const loginElement = screen.getByText('loginLocale:');
        const firstNameElement = screen.getByText('firstName:');
        const lastNameElement = screen.getByText('lastName:');
        const roleElement = screen.getByText('role:');
        const blockedElement = screen.getByText('blocked:');

        expect(loginElement).toBeInTheDocument();
        expect(firstNameElement).toBeInTheDocument();
        expect(lastNameElement).toBeInTheDocument();
        expect(roleElement).toBeInTheDocument();
        expect(blockedElement).toBeInTheDocument();
    });

    it('displays correct user information', () => {
        render(<UserParameters user={user} />);

        const loginValue = screen.getByText("loginLocale:").nextSibling.nextSibling.textContent;
        const firstNameValue = screen.getByText("firstName:").nextSibling.nextSibling.textContent;
        const lastNameValue = screen.getByText("lastName:").nextSibling.nextSibling.textContent;
        const roleValue = screen.getByText("role:").nextSibling.nextSibling.textContent;
        const blockedValue = screen.getByText("blocked:").nextSibling.nextSibling.textContent;

        expect(loginValue).toBe('john_doe');
        expect(firstNameValue).toBe('John');
        expect(lastNameValue).toBe('Doe');
        expect(roleValue).toBe('admin');
        expect(blockedValue).toBe('false');
    });

    it('uses FormattedMessage component for parameter names', () => {
        render(<UserParameters user={user} />);

        const loginElement = screen.getByText('loginLocale:');
        const firstNameElement = screen.getByText('firstName:');
        const lastNameElement = screen.getByText('lastName:');
        const roleElement = screen.getByText('role:');
        const blockedElement = screen.getByText('blocked:');

        expect(loginElement).toContainHTML('<FormattedMessage');
        expect(firstNameElement).toContainHTML('<FormattedMessage');
        expect(lastNameElement).toContainHTML('<FormattedMessage');
        expect(roleElement).toContainHTML('<FormattedMessage');
        expect(blockedElement).toContainHTML('<FormattedMessage');
    });
});