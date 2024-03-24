import { fireEvent, render, screen } from '@testing-library/react';
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

    beforeEach(() => {
        mockNavigate.mockClear();
    });

    it('renders button correctly', () => {
        render(<GoBackButton />);

        expect(screen.getByText('goBack')).toBeInTheDocument();
    });

    it('navigates back to the previous page on button click', () => {
        render(<GoBackButton />);

        const goBackButton = screen.getByText('goBack');
        fireEvent.click(goBackButton);

        expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
});