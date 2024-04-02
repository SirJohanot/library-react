import { render, screen } from '@testing-library/react';
import React from 'react';
import Unauthorized from '../Unauthorized';

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

describe('Unauthorized', () => {
    test('renders the unauthorized message', () => {
        render(<Unauthorized />);

        expect(screen.getByText('insufficientPrivileges')).toBeInTheDocument();
    });

});