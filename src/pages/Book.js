import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from '../api/axios';
import BookParameters from '../components/view/BookParameters';
import useAuthentication from '../hooks/useAuthentication';

const GET_BOOK_METHOD = 'get';
const GET_BOOK_URL = '/books/';

export default function Book() {
    const { authentication } = useAuthentication();

    const { id } = useParams();

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
    })

    return (
        <section id="main-content">
            <div id="main-content-centered-element">
                <div className="round-bordered-subject block-container">
                    <BookParameters book={book} />
                </div>
                <div className="buttons-container">
                    <Link to="/books/">
                        <button className="red">Cancel</button>
                    </Link>
                    <Link to={`/book/${id}/edit`}>
                        <button>Edit</button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
