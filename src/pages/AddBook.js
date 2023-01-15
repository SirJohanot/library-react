import React from 'react';
import { Link } from 'react-router-dom';
import BookChanges from '../components/BookChanges';

export default function AddBook() {
    return (
        <section id="main-content">
            <div id="main-content-centered-element">
                <BookChanges />
                <div className="buttons-container">
                    <Link className="red" to="/books/">Cancel</Link>
                    <button type="button" className="green">Add</button>
                </div>
            </div>
        </section>
    );
}
