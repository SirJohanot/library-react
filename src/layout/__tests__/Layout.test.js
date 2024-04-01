import { render, screen } from '@testing-library/react';
import React from 'react';
import Layout from '../Layout';

jest.mock('react-intl', () => ({
    FormattedMessage: (props) => <>{props.id}</>,
    useIntl: () => ({
        formatMessage: (options) => options.id
    })
}));

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
    Link: (props) => <a href={props.to}>{props.children}</a>,
    Outlet: () => <div>Outlet</div>
}));

describe('Layout', () => {
    it('renders header and footer', () => {
        render(<Layout />);

        const headerElement = screen.getByRole('banner');
        const footerElement = screen.getByRole('contentinfo');

        expect(headerElement).toBeInTheDocument();
        expect(footerElement).toBeInTheDocument();
    });

});