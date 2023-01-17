import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import BookParameters from '../components/view/BookParameters';
import useAuthentication from '../hooks/useAuthentication';

const GET_BOOKS_METHOD = 'get';
const GET_BOOKS_URL = 'books';

export default function Books() {
    const { authentication } = useAuthentication();

    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await axios.request({
                method: GET_BOOKS_METHOD,
                url: GET_BOOKS_URL,
                auth: {
                    username: authentication?.login,
                    password: authentication?.password
                }
            });
            setBooks(response?.data);
        }
        fetchBooks();
    })

    return (
        <section id="main-content">
            <div id="main-content-centered-element">
                {books.map((book) => {
                    return <Link to={`/book/${book.id}`}>
                        <button className="round-bordered-subject block-container">
                            <BookParameters book={book} />
                        </button>
                    </Link>
                })}
            </div>
        </section>
    )
}
