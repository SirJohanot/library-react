import { render, screen } from '@testing-library/react';
import React from 'react';
import LoadingBars from '../LoadingBars.js';

describe('LoadingBars', () => {
    it('renders bars correctly', () => {
        render(<LoadingBars />);

        expect(screen.getByRole('img')).toBeInTheDocument;
    });
});