import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Layout from '../Layout';

jest.mock('react-intl', () => ({
    FormattedMessage: (props) => <>{props.id}</>,
    useIntl: () => ({
        formatMessage: (options) => options.id
    })
}));

describe('Layout', () => {
    it('renders header and footer', () => {
        render(
            <MemoryRouter>
                <Layout />
            </MemoryRouter>
        );

        const headerElement = screen.getByRole('banner');
        const footerElement = screen.getByRole('contentinfo');

        expect(headerElement).toBeInTheDocument();
        expect(footerElement).toBeInTheDocument();
    });

});