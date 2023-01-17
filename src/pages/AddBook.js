import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import useAuthentication from '../hooks/useAuthentication';

const ADD_BOOK_METHOD = 'post';
const ADD_BOOK_URL = '/books';

export default function AddBook() {
    const { authentication } = useAuthentication();

    const navigate = useNavigate();

    const titleRef = useRef();

    const [title, setTitle] = useState('');
    const [authors, setAuthors] = useState('');
    const [genre, setGenre] = useState('');
    const [publisher, setPublisher] = useState('');
    const [publishmentYear, setPublishmentYear] = useState(2022);
    const [amount, setAmount] = useState(1);
    const [error, setError] = useState('');

    useEffect(() => {
        titleRef.current.focus();
    }, [])

    useEffect(() => {
        setError('');
    }, [title, authors, genre, publisher, publishmentYear, amount]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.request({
                method: ADD_BOOK_METHOD,
                url: ADD_BOOK_URL,
                data: JSON.stringify({ title, authors, genre, publisher, publishmentYear, amount }),
                headers: "Content-Type: application/json",
                auth: {
                    username: authentication?.login,
                    password: authentication?.password
                }
            });
            navigate("/books/", { replace: true });
        } catch (err) {
            if (!err?.response) {
                setError('No response from server');
            } else switch (err.response?.status) {
                case 400:
                    setError(err.response?.data?.error);
                    break;
                default:
                    setError('Could not add book');
            }
        }
    }

    return (
        <section id="main-content">
            <div id="main-content-centered-element">
                <form id="book-changes" className="round-bordered-subject block-container" onSubmit={handleSubmit}>
                    <label for="title">Title:</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} ref={titleRef} required />
                    <label for="authors">Author(s) (comma-separated):</label>
                    <input type="text" id="authors" value={authors} onChange={(e) => setAuthors(e.target.value)} required />
                    <label for="genre">Genre:</label>
                    <input type="text" id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} required />
                    <label for="publisher">Publisher:</label>
                    <input type="text" id="publisher" value={publisher} onChange={(e) => setPublisher(e.target.value)} required />
                    <label for="publishment-year">Publishment year:</label>
                    <input type="number" id="publishment-year" value={publishmentYear} onChange={(e) => setPublishmentYear(e.target.value)} min="1900" max="2025" step="1" required />
                    <label for="amount">In stock:</label>
                    <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} min="0" step="1" required />
                    {error &&
                        <div className="error-message">{error}</div>
                    }
                </form>
                <div className="buttons-container">
                    <Link className="button red" to="/books/">Cancel</Link>
                    <button type="submit" form="book-changes" className="green">Add</button>
                </div>
            </div>
        </section>
    )
}
