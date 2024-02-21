import { fireEvent, render, screen } from '@testing-library/react';
import PaginationBar from '../PaginationBar';

describe('PaginationBar', () => {
    const items = ['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7', 'item8', 'item9', 'item10'];
    const setDisplayedItems = jest.fn();
    const maxItemsPerPage = 3;
    const initialPage = 1;

    beforeEach(() => {
        setDisplayedItems.mockClear();
    });

    it('renders pagination buttons correctly', () => {
        render(<PaginationBar items={items} setDisplayedItems={setDisplayedItems} maxItemsPerPage={maxItemsPerPage} initialPage={initialPage} />);

        const firstPageButton = screen.getByText("|<");
        const previousPageButton = screen.getByText("<");
        const nextPageButton = screen.getByText(">");
        const lastPageButton = screen.getByText(">|");

        expect(firstPageButton).toBeInTheDocument();
        expect(previousPageButton).toBeInTheDocument();
        expect(nextPageButton).toBeInTheDocument();
        expect(lastPageButton).toBeInTheDocument();
    });

    it('clicking on a page button updates current page', () => {
        render(<PaginationBar items={items} setDisplayedItems={setDisplayedItems} maxItemsPerPage={maxItemsPerPage} initialPage={initialPage} />);

        const pageButton = screen.getByText("2");

        fireEvent.click(pageButton);

        expect(setDisplayedItems).toHaveBeenCalledTimes(2);
        expect(setDisplayedItems).toHaveBeenCalledWith(['item4', 'item5', 'item6']);
    });

    it('clicking on the next page button updates current page', () => {
        render(<PaginationBar items={items} setDisplayedItems={setDisplayedItems} maxItemsPerPage={maxItemsPerPage} initialPage={initialPage} />);

        const pageButton = screen.getByText(">");

        fireEvent.click(pageButton);

        expect(setDisplayedItems).toHaveBeenCalledTimes(2);
        expect(setDisplayedItems).toHaveBeenCalledWith(['item4', 'item5', 'item6']);
    });

    it('clicking on the previous page button does not update current page when current page is 1', () => {
        render(<PaginationBar items={items} setDisplayedItems={setDisplayedItems} maxItemsPerPage={maxItemsPerPage} initialPage={2} />);

        const pageButton = screen.getByText("<");

        fireEvent.click(pageButton);

        expect(setDisplayedItems).toHaveBeenCalledTimes(2);
        expect(setDisplayedItems).toHaveBeenCalledWith(['item1', 'item2', 'item3']);
    });

    it('clicking on the first page button updates current page', () => {
        render(<PaginationBar items={items} setDisplayedItems={setDisplayedItems} maxItemsPerPage={maxItemsPerPage} initialPage={2} />);

        const firstPageButton = screen.getByText("|<");

        fireEvent.click(firstPageButton);

        expect(setDisplayedItems).toHaveBeenCalledTimes(2);
        expect(setDisplayedItems).toHaveBeenCalledWith(['item1', 'item2', 'item3']);
    });

    it('clicking on the last page button updates current page', () => {
        render(<PaginationBar items={items} setDisplayedItems={setDisplayedItems} maxItemsPerPage={maxItemsPerPage} initialPage={2} />);

        const lastPageButton = screen.getByText(">|");

        fireEvent.click(lastPageButton);

        expect(setDisplayedItems).toHaveBeenCalledTimes(2);
        expect(setDisplayedItems).toHaveBeenCalledWith(['item10']);
    });

    it('inputting page number and submitting updates current page', () => {
        render(<PaginationBar items={items} setDisplayedItems={setDisplayedItems} maxItemsPerPage={maxItemsPerPage} initialPage={initialPage} />);

        const inputPage = screen.getByRole('spinbutton');

        fireEvent.change(inputPage, { target: { value: '3' } });
        fireEvent.submit(inputPage);

        expect(setDisplayedItems).toHaveBeenCalledTimes(2);
        expect(setDisplayedItems).toHaveBeenCalledWith(['item7', 'item8', 'item9']);
    });
});