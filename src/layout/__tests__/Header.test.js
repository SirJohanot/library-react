import { render, screen } from '@testing-library/react';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import useAuthentication from '../../hooks/useAuthentication';
import { LOCALES } from '../../i18n/locales';
import { messages } from '../../i18n/messages.js';
import Header from '../Header';

jest.mock('../../hooks/useAuthentication', () => jest.fn());

describe('Header', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders header correctly when user is authenticated as a reader', () => {
        useAuthentication.mockReturnValue({
            authentication: {
                login: 'john_doe',
                roles: ['READER'],
            },
            setAuthentication: jest.fn(),
        });

        render(
            <IntlProvider locale={LOCALES.ENGLISH} messages={messages[LOCALES.ENGLISH]}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </IntlProvider>
        );

        const booksLink = screen.getByText('Books');
        const ordersLink = screen.getByText('My Orders');
        const addBookLink = screen.queryByText('Add a Book');
        const usersLink = screen.queryByText('Users');
        const profileLoginElement = screen.getByText('john_doe');
        const signOutButton = screen.getByRole('button');

        expect(booksLink).toBeInTheDocument();
        expect(ordersLink).toBeInTheDocument();
        expect(addBookLink).toBeNull();
        expect(usersLink).toBeNull();
        expect(profileLoginElement).toBeInTheDocument();
        expect(signOutButton).toBeInTheDocument();
    });

    it('renders header correctly when user is authenticated as a librarian', () => {
        useAuthentication.mockReturnValue({
            authentication: {
                login: 'jane_doe',
                roles: ['LIBRARIAN'],
            },
            setAuthentication: jest.fn(),
        });

        render(
            <IntlProvider locale={LOCALES.ENGLISH} messages={messages[LOCALES.ENGLISH]}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </IntlProvider>
        );

        const booksLink = screen.getByText('Books');
        const ordersLink = screen.getByText('Orders');
        const usersLink = screen.queryByText('Users');
        const profileLoginElement = screen.getByText('jane_doe');
        const signOutButton = screen.getByRole('button');

        expect(booksLink).toBeInTheDocument();
        expect(ordersLink).toBeInTheDocument();
        expect(usersLink).toBeNull();
        expect(profileLoginElement).toBeInTheDocument();
        expect(signOutButton).toBeInTheDocument();
    });
});