import { render, screen } from '@testing-library/react';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { LOCALES } from '../../i18n/locales';
import { messages } from '../../i18n/messages';
import Header from '../Header';

jest.mock('../../hooks/useAuthentication', () => ({
    __esModule: true,
    default: () => ({
        authentication: {
            login: 'john_doe',
            roles: ['READER'],
        },
        setAuthentication: jest.fn(),
    }),
}));

describe('Header', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders header correctly when user is authenticated as a reader', () => {
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
});