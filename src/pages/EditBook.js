import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';
import BookChanges from '../components/forms/BookChanges';
import CancelButton from '../components/ui/CancelButton';
import useAuthentication from '../hooks/useAuthentication';

const GET_BOOK_METHOD = 'get';
const GET_BOOK_URL = '/books/';

const EDIT_BOOK_METHOD = 'put';
const EDIT_BOOK_URL = '/books/';

export default function EditBook() {
    const { authentication } = useAuthentication();

    const { id } = useParams();

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
        const fetchBook = async () => {
            const response = await axios.request({
                method: GET_BOOK_METHOD,
                url: GET_BOOK_URL + id,
                auth: {
                    username: authentication?.login,
                    password: authentication?.password
                }
            });
            const resultBook = response?.data;
            setBook({
                title: resultBook?.title,
                authors: resultBook?.authors.map((author) => author?.name).join(", "),
                genre: resultBook?.genre?.name,
                publisher: resultBook?.publisher?.name,
                publishmentYear: resultBook?.publishmentYear,
                amount: resultBook?.amount
            });
        }
        fetchBook();
    }, [authentication, id])

    useEffect(() => {
        setError('');
    }, [book]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.request({
                method: EDIT_BOOK_METHOD,
                url: EDIT_BOOK_URL + id,
                data: JSON.stringify(book),
                headers: "Content-Type: application/json",
                auth: {
                    username: authentication?.login,
                    password: authentication?.password
                }
            });
            navigate(`/book/${id}`, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setError('No response from server');
            } else switch (err.response?.status) {
                case 400:
                    setError(err.response?.data?.error);
                    break;
                default:
                    setError('Could not edit book');
            }
        }
    }

    return (
        <section id="main-content">
            <div id="main-content-centered-element">
                <BookChanges book={book} setBook={setBook} handleSubmit={handleSubmit} error={error} />
                <div className="buttons-container">
                    <Link to={`/book/${id}`}>
                        <CancelButton />
                    </Link>
                    <button type="submit" form="book-changes" className="green"><FormattedMessage id="commitChanges" /></button>
                </div>
            </div>
        </section>
    )
}
