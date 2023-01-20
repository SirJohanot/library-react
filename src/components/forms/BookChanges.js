import React, { useEffect, useRef } from 'react';
import { FormattedMessage } from 'react-intl';

export default function BookChanges({ book, setBook, handleSubmit, error }) {

    const titleRef = useRef();

    useEffect(() => {
        titleRef.current.focus();
    }, []);

    return (
        <form id="book-changes" className="round-bordered-subject block-container" onSubmit={handleSubmit}>
            <label htmlFor="title"><FormattedMessage id="bookTitle" />:</label>
            <input type="text" id="title" value={book?.title} onChange={(e) => setBook((curr) => { return { ...curr, title: e.target.value } })} ref={titleRef} required />
            <label htmlFor="authors"><FormattedMessage id="authors" /> (<FormattedMessage id="commaSeparated" />):</label>
            <input type="text" id="authors" value={book?.authors} onChange={(e) => setBook((curr) => { return { ...curr, authors: e.target.value } })} required />
            <label htmlFor="genre"><FormattedMessage id="genre" />:</label>
            <input type="text" id="genre" value={book?.genre} onChange={(e) => setBook((curr) => { return { ...curr, genre: e.target.value } })} required />
            <label htmlFor="publisher"><FormattedMessage id="publisher" />:</label>
            <input type="text" id="publisher" value={book?.publisher} onChange={(e) => setBook((curr) => { return { ...curr, publisher: e.target.value } })} required />
            <label htmlFor="publishment-year"><FormattedMessage id="publishmentYear" />:</label>
            <input type="number" id="publishment-year" value={book?.publishmentYear} onChange={(e) => setBook((curr) => { return { ...curr, publishmentYear: e.target.value } })} min="1900" max="2025" step="1" required />
            <label htmlFor="amount"><FormattedMessage id="inStock" />:</label>
            <input type="number" id="amount" value={book?.amount} onChange={(e) => setBook((curr) => { return { ...curr, amount: e.target.value } })} min="0" step="1" required />
            {error &&
                <div className="error-message">{error}</div>
            }
        </form>
    )
}
