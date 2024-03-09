import { render, screen } from '@testing-library/react';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { LOCALES } from '../../i18n/locales';
import { messages } from '../../i18n/messages';
import Layout from '../Layout';

describe('Layout', () => {
    it('renders header and footer', () => {
        render(
            <IntlProvider locale={LOCALES.ENGLISH} messages={messages[LOCALES.ENGLISH]}>
                <MemoryRouter>
                    <Layout />
                </MemoryRouter>
            </IntlProvider>
        );

        const headerElement = screen.getByRole('banner');
        const footerElement = screen.getByRole('contentinfo');

        expect(headerElement).toBeInTheDocument();
        expect(footerElement).toBeInTheDocument();
    });

});