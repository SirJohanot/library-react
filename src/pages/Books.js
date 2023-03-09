import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import LoadingBars from '../components/ui/LoadingBars';
import PaginationBar from '../components/ui/PaginationBar';
import SearchField from '../components/ui/SearchField';

const GET_BOOKS_METHOD = 'get';
const GET_BOOKS_URL = 'books';

export default function Books() {
    const [books, setBooks] = useState();
    const [searchedBooks, setSearchedBooks] = useState([]);
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

    const bookFitsSearch = useCallback((book, line) => {
        const lowercaseLine = line.toLowerCase();
        const lowercaseLineKeywords = lowercaseLine.split(' ');
        return lowercaseLineKeywords.every(keyword =>
            book.title.toLowerCase().includes(keyword)
            || book.authors.map(author => author.name.toLowerCase()).some(author => author.includes(keyword))
            || book.genre.name.toLowerCase().includes(keyword)
            || book.publisher.name.toLowerCase().includes(keyword)
            || book.publishmentYear.toString().includes(keyword)
            || book.amount.toString().includes(keyword)
        );
    }, []);

    return (
        <>
            {books ?
                <>
                    <SearchField items={books} setSearchedItems={setSearchedBooks} itemFitsSearch={bookFitsSearch} />
                    <div>
                        <div className="list-header">
                            <div className="cell">
                                <span><FormattedMessage id="bookTitle" /></span>
                            </div>
                            <div className="cell">
                                <span><FormattedMessage id="authors" /></span>
                            </div>
                            <div className="cell">
                                <span><FormattedMessage id="genre" /></span>
                            </div>
                            <div className="cell">
                                <span><FormattedMessage id="publisher" /></span>
                            </div>
                            <div className="cell">
                                <span><FormattedMessage id="publishmentYear" /></span>
                            </div>
                            <div className="cell">
                                <span><FormattedMessage id="inStock" /></span>
                            </div>
                        </div>
                        <div className="items-list">
                            {displayedBooks.map((book) =>
                                !book.deleted &&
                                <div className="row" key={book.id}>
                                    <Link to={`/book/${book.id}`} className="cell link">
                                        <span>{book?.title}</span>
                                    </Link>
                                    <div className="cell">
                                        <span>{book?.authors?.map(author => author.name).join(", ")}</span>
                                    </div>
                                    <div className="cell">
                                        <span>{book?.genre?.name}</span>
                                    </div>
                                    <div className="cell">
                                        <span>{book?.publisher?.name}</span>
                                    </div>
                                    <div className="cell">
                                        <span>{book?.publishmentYear}</span>
                                    </div>
                                    <div className="cell">
                                        <span>{book?.amount}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <PaginationBar items={searchedBooks} setDisplayedItems={setDisplayedBooks} maxItemsPerPage={10} initialPage={1} />
                </>
                : <LoadingBars />
            }
        </>
    );
}
