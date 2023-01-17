import React, { useEffect, useRef } from 'react';

export default function BookChanges({ book, setBook, handleSubmit, error }) {

    const titleRef = useRef();

    useEffect(() => {
        titleRef.current.focus();
    }, []);

    return (
        <form id="book-changes" className="round-bordered-subject block-container" onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" value={book?.title} onChange={(e) => setBook((curr) => { return { ...curr, title: e.target.value } })} ref={titleRef} required />
            <label htmlFor="authors">Author(s) (comma-separated):</label>
            <input type="text" id="authors" value={book?.authors} onChange={(e) => setBook((curr) => { return { ...curr, authors: e.target.value } })} required />
            <label htmlFor="genre">Genre:</label>
            <input type="text" id="genre" value={book?.genre} onChange={(e) => setBook((curr) => { return { ...curr, genre: e.target.value } })} required />
            <label htmlFor="publisher">Publisher:</label>
            <input type="text" id="publisher" value={book?.publisher} onChange={(e) => setBook((curr) => { return { ...curr, publisher: e.target.value } })} required />
            <label htmlFor="publishment-year">Publishment year:</label>
            <input type="number" id="publishment-year" value={book?.publishmentYear} onChange={(e) => setBook((curr) => { return { ...curr, publishmentYear: e.target.value } })} min="1900" max="2025" step="1" required />
            <label htmlFor="amount">In stock:</label>
            <input type="number" id="amount" value={book?.amount} onChange={(e) => setBook((curr) => { return { ...curr, amount: e.target.value } })} min="0" step="1" required />
            {error &&
                <div className="error-message">{error}</div>
            }
        </form>
    )
}
