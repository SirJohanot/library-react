import React from 'react';

export default function BookChanges(props) {
    return (
        <form id="book-changes" className="round-bordered-subject block-container" method="post">
            <label for="title">Title:</label>
            <input id="title" type="text" required="required" />
            <label for="authors">Author(s) (comma-separated):</label>
            <input id="authors" type="text" required="required" />
            <label for="genre">Genre:</label>
            <input id="genre" type="text" required="required" />
            <label for="publisher">Publisher:</label>
            <input id="publisher" type="text" required="required" />
            <label for="publishment-year">Publishment year:</label>
            <input id="publishment-year" type="number" min="1900" max="2025" step="1" value="2022" required="required" />
            <label for="amount">In stock:</label>
            <input id="amount" type="number" min="0" step="1" value="1" required="required" />
        </form>
    )
}
