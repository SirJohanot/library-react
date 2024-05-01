import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';
import BookOrderForm from '../components/forms/BookOrderForm';
import FormWrapper from '../components/forms/FormWrapper';
import LoadingBars from '../components/ui/LoadingBars';
import BookParameters from '../components/view/BookParameters';
import useAuthentication from '../hooks/useAuthentication';

const GET_BOOK_METHOD = 'get';
const GET_BOOK_URL = '/books/';

const DELETE_BOOK_METHOD = 'delete';
const DELETE_BOOK_URL = '/books/';

export default function Book() {
    const { authentication } = useAuthentication();

    const intl = useIntl();

    const { id } = useParams();

    const navigate = useNavigate();

    const [book, setBook] = useState();

    useEffect(() => {
        const fetchBook = async () => {
            const response = await axios.request({
                method: GET_BOOK_METHOD,
                url: GET_BOOK_URL + id
            });
            setBook(response?.data);
        }
        fetchBook();
    }, [id]);

    useEffect(() => {
        document.title = `${book?.title} | ${intl.formatMessage({ id: 'appName' })}`;
    }, [book, intl]);

    const handleDelete = async () => {
        if (!window.confirm(intl.formatMessage({ id: 'deleteConfirmation' }))) {
            return;
        }
        await axios.request({
            method: DELETE_BOOK_METHOD,
            url: DELETE_BOOK_URL + id
        });
        navigate('/books/', { replace: true });
    }

    return (
        <>
            {book ?
                <>
                    <div>
                        <div className="entity-container">
                            <BookParameters book={book} />
                        </div>
                        {(authentication?.roles && authentication?.roles.includes('ADMIN')) &&
                            <div className="buttons-container">
                                <button className="btn red" onClick={handleDelete}><FormattedMessage id="delete" /></button>
                                <Link to={`/book/${id}/edit`} className="btn">
                                    <FormattedMessage id="edit" />
                                </Link>
                            </div>
                        }
                    </div>
                    {(authentication?.roles && authentication?.roles.includes('READER') && book?.amount > 0) &&
                        <FormWrapper formName={intl.formatMessage({ id: 'order' })} formId="order-book" cancelPath="/books/" submitDisabled={false} submitName={intl.formatMessage({ id: 'order' })}>
                            <BookOrderForm bookId={book?.id} />
                        </FormWrapper>
                    }
                </>
                : <LoadingBars />
            }
        </>
    )
}
