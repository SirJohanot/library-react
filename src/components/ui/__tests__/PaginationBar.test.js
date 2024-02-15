import { render, screen } from '@testing-library/react';
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
});