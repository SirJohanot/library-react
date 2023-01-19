import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axios';
import BookParameters from '../components/view/BookParameters';
import useAuthentication from '../hooks/useAuthentication';

const GET_BOOK_METHOD = 'get';
const GET_BOOK_URL = '/books/';

const DELETE_BOOK_METHOD = 'delete';
const DELETE_BOOK_URL = '/books/';

export default function Book() {
    const { authentication } = useAuthentication();

    const { id } = useParams();

    const navigate = useNavigate();

    const [book, setBook] = useState({});

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
            setBook(response?.data);
        }
        fetchBook();
    }, [authentication, id])

    const handleDelete = async () => {
        await axios.request({
            method: DELETE_BOOK_METHOD,
            url: DELETE_BOOK_URL + id,
            auth: {
                username: authentication?.login,
                password: authentication?.password
            }
        });
        navigate("/books/", { replace: true });
    }

    return (
        <section id="main-content">
            <div id="main-content-centered-element">
                <div className="round-bordered-subject block-container">
                    <BookParameters book={book} />
                </div>
                {authentication?.roles.includes("ADMIN") &&
                    <div className="buttons-container">
                        <button className="red" onClick={handleDelete}><FormattedMessage id="delete" /></button>
                        <Link to={`/book/${id}/edit`}>
                            <button><FormattedMessage id="edit" /></button>
                        </Link>
                    </div>
                }
            </div>
        </section>
    )
}
