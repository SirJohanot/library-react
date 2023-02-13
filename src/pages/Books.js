import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import PaginationBar from '../components/ui/PaginationBar';
import BookParameters from '../components/view/BookParameters';

const GET_BOOKS_METHOD = 'get';
const GET_BOOKS_URL = 'books';

export default function Books() {
    const [books, setBooks] = useState([]);
    const [displayedBooks, setDisplayedBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await axios.request({
                method: GET_BOOKS_METHOD,
                url: GET_BOOKS_URL
            });
            setBooks(response?.data);
        }
        fetchBooks();
    }, []);

    return (
        <section id="main-content">
            <div id="main-content-centered-element">
                {displayedBooks.map((book) =>
                    !book.deleted &&
                    <Link to={`/book/${book.id}`} key={book.id}>
                        <button className="round-bordered-subject block-container">
                            <BookParameters book={book} />
                        </button>
                    </Link>
                )}
                <PaginationBar items={books} setDisplayedItems={setDisplayedBooks} maxItemsPerPage={5} initialPage={1} />
            </div>
        </section>
    );
}
