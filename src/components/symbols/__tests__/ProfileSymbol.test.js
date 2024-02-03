import { render, screen } from '@testing-library/react';
import React from 'react';
import ProfileSymbol from '../ProfileSymbol.js';

describe('ProfileSymbol', () => {
    it('renders symbol correctly', () => {
        render(<ProfileSymbol />);

        expect(screen.getByRole('img')).toBeInTheDocument;
    });
});