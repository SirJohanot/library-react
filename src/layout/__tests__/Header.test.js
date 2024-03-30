import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import axios from '../../api/axios.js';
import useAuthentication from '../../hooks/useAuthentication';
import Header from '../Header';

jest.mock('../../hooks/useAuthentication', () => jest.fn());

jest.mock('react-intl', () => ({
    FormattedMessage: (props) => <>{props.id}</>
}));

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
    Link: (props) => <a href={props.to}>{props.children}</a>
}));

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
            <Header />
        );

        const booksLink = screen.getByText('books');
        const ordersLink = screen.getByText('myOrders');
        const addBookLink = screen.queryByText('addABook');
        const usersLink = screen.queryByText('users');
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
            <Header />
        );

        const booksLink = screen.getByText('books');
        const ordersLink = screen.getByText('orders');
        const usersLink = screen.queryByText('users');
        const profileLoginElement = screen.getByText('jane_doe');
        const signOutButton = screen.getByRole('button');

        expect(booksLink).toBeInTheDocument();
        expect(ordersLink).toBeInTheDocument();
        expect(usersLink).toBeNull();
        expect(profileLoginElement).toBeInTheDocument();
        expect(signOutButton).toBeInTheDocument();
    });

    it('renders header correctly when user is authenticated as an admin', () => {
        useAuthentication.mockReturnValue({
            authentication: {
                login: 'admin_user',
                roles: ['ADMIN'],
            },
            setAuthentication: jest.fn(),
        });

        render(
            <Header />
        );

        const booksLink = screen.getByText('books');
        const addBookLink = screen.getByText('addABook');
        const usersLink = screen.getByText('users');
        const profileLoginElement = screen.getByText('admin_user');
        const signOutButton = screen.getByRole('button');

        expect(booksLink).toBeInTheDocument();
        expect(addBookLink).toBeInTheDocument();
        expect(usersLink).toBeInTheDocument();
        expect(profileLoginElement).toBeInTheDocument();
        expect(signOutButton).toBeInTheDocument();
    });

    it('calls setAuthentication and clears request interceptors on sign-out', () => {
        const setAuthenticationMock = jest.fn();
        useAuthentication.mockReturnValue({
            authentication: {
                login: 'john_doe',
                roles: ['READER'],
            },
            setAuthentication: setAuthenticationMock,
        });

        const mockAxiosInterceptorsRequestClear = jest.spyOn(axios.interceptors.request, 'clear');

        render(
            <Header />
        );

        const signOutButton = screen.getByRole('button');
        fireEvent.click(signOutButton);

        expect(setAuthenticationMock).toHaveBeenCalledWith({});
        expect(mockAxiosInterceptorsRequestClear).toHaveBeenCalled();
    });
});