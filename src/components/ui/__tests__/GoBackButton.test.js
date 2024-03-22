import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GoBackButton from '../GoBackButton.js';

jest.mock('react-intl', () => ({
    FormattedMessage: (props) => {
        return <>{props.id}</>
    }
}));

describe('GoBackButton', () => {
    it('renders button correctly', () => {
        render(<BrowserRouter><GoBackButton /></BrowserRouter>);

        expect(screen.getByText('goBack')).toBeInTheDocument();
    });
});