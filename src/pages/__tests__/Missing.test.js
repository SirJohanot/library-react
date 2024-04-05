import { render, screen } from '@testing-library/react';
import React from 'react';
import Missing from '../Missing';

jest.mock('react-intl', () => ({
    FormattedMessage: (props) => <>{props.id}</>,
    useIntl: () => ({
        formatMessage: (options) => options.id
    })
}));

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate
}));

describe('Missing', () => {
    it('renders the missing page message', () => {
        render(<Missing />);

        expect(screen.getByText('missingPage')).toBeInTheDocument();
    });

    it('sets the document title with the correct value', () => {
        render(<Missing />);

        expect(document.title).toBe('missingPage');
    });

});