import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import BookChanges from '../components/forms/BookChanges';
import FormWrapper from '../components/forms/FormWrapper';

const ADD_BOOK_METHOD = 'post';
const ADD_BOOK_URL = '/books';

export default function AddBook() {
    const intl = useIntl();

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
        document.title = `${intl.formatMessage({ id: 'addABook' })} | ${intl.formatMessage({ id: 'appName' })}`;
    }, [intl]);

    useEffect(() => {
        setError('');
    }, [book]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.request({
                method: ADD_BOOK_METHOD,
                url: ADD_BOOK_URL,
                data: JSON.stringify(book)
            });
            navigate('/books/', { replace: true });
        } catch (err) {
            if (!err?.response) {
                setError('noResponse');
            } else if (err.response?.status === 400) {
                setError(err.response?.data?.error);
            } else {
                setError('failure');
            }
        }
    }

    return (
        <FormWrapper formName={intl.formatMessage({ id: 'addABook' })} formId="book-changes" cancelPath="/books/" submitDisabled={disabled} submitName={intl.formatMessage({ id: 'add' })} >
            <BookChanges book={book} setBook={setBook} handleSubmit={handleSubmit} error={error} setDisabled={setDisabled} />
        </FormWrapper>
    );
}
