import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import BookChanges from '../components/forms/BookChanges';
import CancelButton from '../components/ui/CancelButton';
import useAuthentication from '../hooks/useAuthentication';

const ADD_BOOK_METHOD = 'post';
const ADD_BOOK_URL = '/books';

export default function AddBook() {
    const { authentication } = useAuthentication();

    const navigate = useNavigate();

    const [book, setBook] = useState({
        title: '',
        authors: '',
        genre: '',
        publisher: '',
        publishmentYear: 2022,
        amount: 1
    });
    const [error, setError] = useState('');

    useEffect(() => {
        setError('');
    }, [book]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.request({
                method: ADD_BOOK_METHOD,
                url: ADD_BOOK_URL,
                data: JSON.stringify(book),
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
                <BookChanges book={book} setBook={setBook} handleSubmit={handleSubmit} error={error} />
                <div className="buttons-container">
                    <Link to="/books/">
                        <CancelButton />
                    </Link>
                    <button type="submit" form="book-changes" className="green"><FormattedMessage id="add" /></button>
                </div>
            </div>
        </section>
    )
}
