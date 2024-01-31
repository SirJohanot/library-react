import { render, screen } from '@testing-library/react';
import React from 'react';
import BookSymbol from '../BookSymbol.js';

describe('BookSymbol', () => {
    it('renders symbol correctly', () => {
        render(<BookSymbol />);

        expect(screen.getByRole('img')).toBeInTheDocument;
    });
});