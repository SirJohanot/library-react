import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Footer from '../Footer.js';

describe('Footer', () => {
    it('renders language options correctly', () => {
        render(<Footer setCurrentLocale={() => { }} />);

        const englishOption = screen.getByText('English');
        const russianOption = screen.getByText('Русский');
        const belarusianOption = screen.getByText('Беларуская');

        expect(englishOption).toBeInTheDocument();
        expect(russianOption).toBeInTheDocument();
        expect(belarusianOption).toBeInTheDocument();
    });

    it('calls setCurrentLocale with the selected locale', () => {
        const setCurrentLocaleMock = jest.fn();
        render(<Footer setCurrentLocale={setCurrentLocaleMock} />);

        const selectElement = screen.getByRole('combobox');
        fireEvent.change(selectElement, { target: { value: 'ru' } });

        expect(setCurrentLocaleMock).toHaveBeenCalledWith('ru');
    });
});