import { render, screen } from '@testing-library/react';
import React from 'react';
import SignOutSymbol from '../SignOutSymbol.js';

describe('SignOutSymbol', () => {
    it('renders symbol correctly', () => {
        render(<SignOutSymbol />);

        expect(screen.getByRole('img')).toBeInTheDocument;
    });
});