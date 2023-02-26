import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';
import BookChanges from '../components/forms/BookChanges';
import CancelButton from '../components/ui/CancelButton';

const GET_BOOK_METHOD = 'get';
const GET_BOOK_URL = '/books/';

const EDIT_BOOK_METHOD = 'put';
const EDIT_BOOK_URL = '/books/';

export default function EditBook() {
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
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        const fetchBook = async () => {
            const response = await axios.request({
                method: GET_BOOK_METHOD,
                url: GET_BOOK_URL + id
            });
            const resultBook = response?.data;
            setBook({
                title: resultBook?.title,
                authors: resultBook?.authors.map((author) => author?.name).join(', '),
                genre: resultBook?.genre?.name,
                publisher: resultBook?.publisher?.name,
                publishmentYear: resultBook?.publishmentYear,
                amount: resultBook?.amount
            });
        }
        fetchBook();
    }, [id])

    useEffect(() => {
        setError('');
    }, [book]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.request({
                method: EDIT_BOOK_METHOD,
                url: EDIT_BOOK_URL + id,
                data: JSON.stringify(book)
            });
            navigate(`/book/${id}`, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setError('noResopnse');
            } else switch (err.response?.status) {
                case 400:
                    setError(err.response?.data?.error);
                    break;
                default:
                    setError('failure');
            }
        }
    }

    return (
        <section id="main-content">
            <div id="main-content-centered-element">
                <div className="form-content">
                    <div className="form-header">
                        <h2 className="col"><FormattedMessage id="edit" /></h2>
                        <div className="col-auto centered">
                            <Link to={`/book/${id}`}>
                                <CancelButton />
                            </Link>
                        </div>
                    </div>
                    <BookChanges book={book} setBook={setBook} handleSubmit={handleSubmit} error={error} setDisabled={setDisabled} />
                    <div className="form-actions">
                        <div className="col-50">
                            <button type="submit" form="book-changes" className="btn" disabled={disabled}><FormattedMessage id="commitChanges" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
