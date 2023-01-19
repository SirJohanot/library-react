import React, { useEffect, useState } from 'react';
import { getClosestAcceptableTargetPage, getEntitiesOfPage, getNumberOfPagesToContainEntities } from '../../utility/paginator';

export default function PaginationBar({ items, setDisplayedItems, maxItemsPerPage, initialPage }) {

    const maxPage = getNumberOfPagesToContainEntities(items, maxItemsPerPage);

    const [currentPage, setCurrentPage] = useState(getClosestAcceptableTargetPage(items, initialPage, maxItemsPerPage));
    const [inputPage, setInputPage] = useState(currentPage);

    useEffect(() => {
        let itemsOfPage = getEntitiesOfPage(items, currentPage, maxItemsPerPage);
        setDisplayedItems(itemsOfPage);
    }, [currentPage, items, maxItemsPerPage, setDisplayedItems])

    useEffect(() => setCurrentPage(getClosestAcceptableTargetPage(items, initialPage, maxItemsPerPage)),
        [items, maxItemsPerPage, initialPage])

    useEffect(() => setInputPage(currentPage),
        [currentPage]);

    return (
        <div id="pagination" className="round-bordered-subject">
            <div>
                <button type="button" onClick={() => { setCurrentPage(1) }}>
                    |&lt;
                </button>
            </div>
            <div>
                <button type="button" onClick={() => { setCurrentPage((current) => getClosestAcceptableTargetPage(items, current - 1, maxItemsPerPage)) }}>
                    &lt;
                </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setCurrentPage(inputPage) }}>
                <input type="number" id="target-page" min="1" max={maxPage} step="1" value={inputPage} onChange={(e) => setInputPage(e.target.value)} />
            </form>
            <div>
                <button type="button" onClick={() => { setCurrentPage((current) => getClosestAcceptableTargetPage(items, current + 1, maxItemsPerPage)) }}>
                    &gt;
                </button>
            </div>
            <div>
                <button type="button" onClick={() => { setCurrentPage(maxPage) }}>
                    &gt;|
                </button>
            </div>
        </div>
    )
}
