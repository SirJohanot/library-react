import { render, screen } from '@testing-library/react';
import React from 'react';
import GoBackButton from '../GoBackButton.js';

jest.mock('react-intl', () => ({
    FormattedMessage: (props) => {
        return <>{props.id}</>
    }
}));

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
}));

describe('GoBackButton', () => {
    it('renders button correctly', () => {
        render(<GoBackButton />);

        expect(screen.getByText('goBack')).toBeInTheDocument();
    });
});