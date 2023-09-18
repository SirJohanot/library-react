import React, { useEffect, useState } from 'react';
import { getClosestAcceptableTargetPage, getEntitiesOfPage, getNumberOfPagesToContainEntities } from '../../utility/paginator';

const PAGE_BUTTONS_NUMBER = 7;

export default function PaginationBar({ items, setDisplayedItems, maxItemsPerPage, initialPage }) {
    const maxPage = Math.max(getNumberOfPagesToContainEntities(items, maxItemsPerPage), 1);

    const [currentPage, setCurrentPage] = useState(getClosestAcceptableTargetPage(items, initialPage, maxItemsPerPage));
    const [inputPage, setInputPage] = useState(currentPage);

    useEffect(() => {
        let itemsOfPage = getEntitiesOfPage(items, currentPage, maxItemsPerPage);
        setDisplayedItems(itemsOfPage);
    }, [currentPage, items, maxItemsPerPage, setDisplayedItems]);

    useEffect(() => setCurrentPage(getClosestAcceptableTargetPage(items, initialPage, maxItemsPerPage)),
        [items, maxItemsPerPage, initialPage]);

    useEffect(() => setInputPage(currentPage),
        [currentPage]);

    const getClosestPageNumbers = () => {
        let startPage = currentPage - PAGE_BUTTONS_NUMBER / 2;
        if (startPage < 1) {
            startPage = 1;
        } else if (startPage + PAGE_BUTTONS_NUMBER > maxPage) {
            startPage = maxPage - PAGE_BUTTONS_NUMBER;
        }

        let endPage = currentPage + PAGE_BUTTONS_NUMBER / 2;
        if (endPage > maxPage) {
            endPage = maxPage;
        }

        return Array.from({ length: endPage - startPage + 1 },
            (value, index) => startPage + index);;
    }

    return (
        <div className="pagination">
            <button type="button" className="btn" onClick={() => { setCurrentPage(1) }}>
                |&lt;
            </button>
            <button type="button" className="btn" onClick={() => { setCurrentPage((current) => getClosestAcceptableTargetPage(items, current - 1, maxItemsPerPage)) }} disabled={currentPage === 1}>
                &lt;
            </button>
            {getClosestPageNumbers().map((value) =>
                <button type="button" className="btn" onClick={() => { setCurrentPage(value) }} key={value} disabled={value === currentPage}>
                    {value}
                </button>
            )}
            <button type="button" className="btn" onClick={() => { setCurrentPage((current) => getClosestAcceptableTargetPage(items, current + 1, maxItemsPerPage)) }} disabled={currentPage === maxPage}>
                &gt;
            </button>
            <button type="button" className="btn" onClick={() => { setCurrentPage(maxPage) }}>
                &gt;|
            </button>
            <form onSubmit={(e) => { e.preventDefault(); setCurrentPage(inputPage) }}>
                <input
                    type="number"
                    id="target-page"
                    min="1"
                    max={maxPage}
                    step="1"
                    value={inputPage}
                    onChange={(e) => setInputPage(e.target.value)}
                />
            </form>
        </div>
    );
}
