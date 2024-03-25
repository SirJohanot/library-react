import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import SearchField from '../SearchField.js';

jest.mock('react-intl', () => ({
    useIntl: () => ({
        formatMessage: (options) => options.id
    })
}));

describe('SearchField', () => {
    it('initial search line is empty', () => {
        render(<SearchField items={[]} setSearchedItems={(items) => { }} itemFitsSearch={(item, searchLine) => { }} />);

        expect(screen.getByRole('textbox')).toHaveValue('');
    });

    it('entering a search query updates the searchLine state', () => {
        render(<SearchField items={[]} setSearchedItems={(items) => { }} itemFitsSearch={(item, searchLine) => { }} />);

        const searchInput = screen.getByRole('textbox');
        const testLine = 'testValue';

        fireEvent.change(searchInput, { target: { value: testLine } });

        expect(searchInput).toHaveValue(testLine);
    });

    it('clicking the clear button clears the searchLine', () => {
        render(<SearchField items={[]} setSearchedItems={(items) => { }} itemFitsSearch={(item, searchLine) => { }} />);

        const searchInput = screen.getByRole('textbox');
        const testLine = 'testValue';

        fireEvent.change(searchInput, { target: { value: testLine } });

        expect(searchInput).toHaveValue(testLine);

        const clearButton = screen.getByRole('button');

        fireEvent.click(clearButton);

        expect(searchInput).toHaveValue('');
    });

    it('items filter based on search query', () => {

        const items = ['apple', 'banana', 'orange', 'grapefruit'];
        const setSearchedItems = jest.fn();
        const itemFitsSearch = jest.fn((item, searchLine) => item.includes(searchLine));

        render(<SearchField items={items} setSearchedItems={setSearchedItems} itemFitsSearch={itemFitsSearch} />);

        const searchInput = screen.getByRole('textbox');

        fireEvent.change(searchInput, { target: { value: 'an' } });

        expect(setSearchedItems).toHaveBeenCalledWith(['banana', 'orange']);
    });

    it('remove the filter after clearing the query', () => {

        const items = ['apple', 'banana', 'orange', 'grapefruit'];
        const setSearchedItems = jest.fn();
        const itemFitsSearch = jest.fn((item, searchLine) => item.includes(searchLine));

        render(<SearchField items={items} setSearchedItems={setSearchedItems} itemFitsSearch={itemFitsSearch} />);

        const searchInput = screen.getByRole('textbox');

        fireEvent.change(searchInput, { target: { value: 'an' } });

        expect(setSearchedItems).toHaveBeenCalledWith(['banana', 'orange']);

        fireEvent.change(searchInput, { target: { value: '' } });

        expect(setSearchedItems).toHaveBeenCalledWith(items);
    });

    it('itemFitsSearch function filters items correctly', () => {

        const items = ['apple', 'banana', 'orange', 'grapefruit'];
        const setSearchedItems = jest.fn();
        const itemFitsSearch = jest.fn((item, searchLine) => item.includes(searchLine));

        render(<SearchField items={items} setSearchedItems={setSearchedItems} itemFitsSearch={itemFitsSearch} />);

        const searchInput = screen.getByRole('textbox');

        fireEvent.change(searchInput, { target: { value: 'an' } });

        expect(itemFitsSearch).toHaveBeenCalledTimes(4);
        expect(itemFitsSearch).toHaveBeenNthCalledWith(1, 'apple', 'an');
        expect(itemFitsSearch).toHaveBeenNthCalledWith(2, 'banana', 'an');
        expect(itemFitsSearch).toHaveBeenNthCalledWith(3, 'orange', 'an');
        expect(itemFitsSearch).toHaveBeenNthCalledWith(4, 'grapefruit', 'an');
    });
});