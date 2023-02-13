import React, { useEffect, useRef } from 'react';
import { FormattedMessage } from 'react-intl';

export default function BookChanges({ book, setBook, handleSubmit, error }) {
    const titleRef = useRef();

    useEffect(() => {
        titleRef.current.focus();
    }, []);

    const handleChange = (e) => {
        setBook(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    return (
        <form id="book-changes" className="round-bordered-subject block-container" onSubmit={handleSubmit}>
            <label htmlFor="title"><FormattedMessage id="bookTitle" />:</label>
            <input type="text" id="title" name="title" value={book?.title} onChange={handleChange} ref={titleRef} required />
            <label htmlFor="authors"><FormattedMessage id="authors" /> (<FormattedMessage id="commaSeparated" />):</label>
            <input type="text" id="authors" name="authors" value={book?.authors} onChange={handleChange} required />
            <label htmlFor="genre"><FormattedMessage id="genre" />:</label>
            <input type="text" id="genre" name="genre" value={book?.genre} onChange={handleChange} required />
            <label htmlFor="publisher"><FormattedMessage id="publisher" />:</label>
            <input type="text" id="publisher" name="publisher" value={book?.publisher} onChange={handleChange} required />
            <label htmlFor="publishment-year"><FormattedMessage id="publishmentYear" />:</label>
            <input type="number" id="publishment-year" name="publishmentYear" value={book?.publishmentYear} onChange={handleChange} min="1900" max="2025" step="1" required />
            <label htmlFor="amount"><FormattedMessage id="inStock" />:</label>
            <input type="number" id="amount" name="amount" value={book?.amount} onChange={handleChange} min="0" step="1" required />
            {error &&
                <div className="error-message">{error}</div>
            }
        </form>
    );
}
