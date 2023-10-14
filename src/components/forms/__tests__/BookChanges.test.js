import { render, screen } from '@testing-library/react';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { LOCALES } from '../../../i18n/locales.js';
import { messages } from '../../../i18n/messages.js';
import BookChanges from '../BookChanges.js';

describe('BookChanges', () => {
    it('renders form correctly', () => {
        render(<IntlProvider locale={LOCALES.ENGLISH} messages={messages[LOCALES.ENGLISH]}><BookChanges book={{}} setDisabled={(a) => { }} /></IntlProvider>);

        expect(screen.getAllByRole('textbox').length).toBe(4);
    });
});