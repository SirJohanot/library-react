import { render, screen } from '@testing-library/react';
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

jest.mock('react-router-dom', () => ({
    Link: (props) => <a href={props.to}>{props.children}</a>,
    useLocation: jest.fn(),
    useNavigate: jest.fn(),
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
        useNavigate.mockClear();
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
});