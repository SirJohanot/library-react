import { render, screen } from '@testing-library/react';
import React from 'react';
import Footer from '../Footer.js';

describe('Footer', () => {
    it('renders footer correctly', () => {
        render(<Footer />);

        expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });
});