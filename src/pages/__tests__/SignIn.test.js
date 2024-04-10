import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import useAuthentication from '../../hooks/useAuthentication';
import SignIn from '../SignIn';

jest.mock('react-intl', () => ({
    FormattedMessage: (props) => <>{props.id}</>,
    useIntl: () => ({
        formatMessage: (options) => options.id
    })
}));

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    Link: (props) => <a href={props.to}>{props.children}</a>,
    useLocation: jest.fn(),
    useNavigate: () => mockNavigate,
}));

jest.mock('../../api/axios', () => ({
    request: jest.fn(),
    interceptors: {
        request: {
            clear: jest.fn(),
            use: jest.fn(),
        },
    },
}));

jest.mock('../../hooks/useAuthentication', () => jest.fn());

describe('SignIn', () => {
    beforeEach(() => {
        useLocation.mockClear();
        useNavigate().mockClear();
        axios.request.mockClear();
        axios.interceptors.request.clear.mockClear();
        axios.interceptors.request.use.mockClear();
        useAuthentication.mockClear();
    });

    it('renders the sign-in form', () => {
        useAuthentication.mockReturnValue({
            authentication: {
                login: '',
                roles: [],
            },
            setAuthentication: jest.fn(),
        });

        render(<SignIn />);

        expect(screen.getByTestId('login-input')).toBeInTheDocument();
        expect(screen.getByTestId('password-input')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'signInLocale' })).toBeInTheDocument();
        expect(screen.getByText('dontHaveAnAccount')).toBeInTheDocument();
        expect(screen.getByRole('link')).toHaveAttribute('href', '/sign-up');
    });

    it('sets the document title with the correct values', () => {
        useAuthentication.mockReturnValue({
            authentication: {
                login: '',
                roles: [],
            },
            setAuthentication: jest.fn(),
        });

        render(<SignIn />);

        expect(document.title).toBe(`signInLocale | appName`);
    });

    it('handles form submission successfully', async () => {
        useAuthentication.mockReturnValue({
            authentication: {
                login: '',
                roles: [],
            },
            setAuthentication: jest.fn(),
        });

        const expectedRoles = ['READER'];
        const mockResponse = { data: { roles: expectedRoles } };
        axios.request.mockResolvedValue(mockResponse);

        const mockAuthentication = {
            login: 'loginTest',
            password: 'passwordTest',
            roles: expectedRoles
        }

        render(<SignIn />);

        const loginInput = screen.getByTestId('login-input');
        const passwordInput = screen.getByTestId('password-input');
        const submitButton = screen.getByRole('button', { name: 'signInLocale' });

        fireEvent.change(loginInput, { target: { value: mockAuthentication.login } });
        fireEvent.change(passwordInput, { target: { value: mockAuthentication.password } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(axios.request).toHaveBeenCalledWith({
                method: 'get',
                url: '/users/auth',
                data: {},
                auth: {
                    username: mockAuthentication.login,
                    password: mockAuthentication.password,
                },
            });
            expect(axios.interceptors.request.clear).toHaveBeenCalled();
            expect(axios.interceptors.request.use).toHaveBeenCalled();
            expect(useAuthentication().setAuthentication).toHaveBeenCalledWith(mockAuthentication);
            expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
        });
    });

    it('displays error message for invalid credentials', async () => {
        useAuthentication.mockReturnValue({
            authentication: {
                login: '',
                roles: [],
            },
            setAuthentication: jest.fn(),
        });

        const expectedRoles = ['READER'];
        axios.request.mockRejectedValueOnce({ response: { status: 401 } });

        const mockAuthentication = {
            login: 'loginTest',
            password: 'passwordTest',
            roles: expectedRoles
        }

        render(<SignIn />);

        const loginInput = screen.getByTestId('login-input');
        const passwordInput = screen.getByTestId('password-input');
        const submitButton = screen.getByRole('button', { name: 'signInLocale' });

        fireEvent.change(loginInput, { target: { value: mockAuthentication.login } });
        fireEvent.change(passwordInput, { target: { value: mockAuthentication.password } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(axios.request).toHaveBeenCalledWith({
                method: 'get',
                url: '/users/auth',
                data: {},
                auth: {
                    username: mockAuthentication.login,
                    password: mockAuthentication.password,
                },
            });
            expect(screen.getByText('invalidCredentials')).toBeInTheDocument();
        });
    });
});