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
    test('renders the missing page message', () => {
        render(<Missing />);

        expect(screen.getByText('missingPage')).toBeInTheDocument();
    });

});