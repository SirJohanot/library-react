import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import LoadingBars from '../components/ui/LoadingBars';
import PaginationBar from '../components/ui/PaginationBar';
import SearchField from '../components/ui/SearchField';

const GET_BOOKS_METHOD = 'get';
const GET_BOOKS_URL = 'books';

export default function Authors() {
    const intl = useIntl();

    const [authors, setAuthors] = useState([]);
    const [searchedAuthors, setSearchedAuthors] = useState([]);
    const [displayedAuthors, setDisplayedAuthors] = useState([]);

    useEffect(() => {
        const fetchAuthors = async () => {
            const response = await axios.request({
                method: GET_BOOKS_METHOD,
                url: GET_BOOKS_URL
            });
            const books = response?.data;
            const extractedAuthors = [];
            books.forEach((book) =>
                book.authors.forEach((author) => {
                    let authorIndex = extractedAuthors.findIndex((x) => x.id === author.id);
                    authorIndex = authorIndex === -1 ? extractedAuthors.length : authorIndex;
                    extractedAuthors[authorIndex] = extractedAuthors[authorIndex] ? { ...extractedAuthors[authorIndex], booksCount: extractedAuthors[authorIndex].booksCount + 1 } : { id: author.id, name: author.name, booksCount: 1 };
                }))
            setAuthors(extractedAuthors);
        }
        fetchAuthors();
        document.title = `${intl.formatMessage({ id: 'authors' })} | ${intl.formatMessage({ id: 'appName' })}`;
    }, [intl]);

    const authorFitsSearch = useCallback((author, line) => {
        const lowercaseLine = line.toLowerCase();
        const lowercaseLineKeywords = lowercaseLine.split(' ');
        return lowercaseLineKeywords.any(keyword =>
            author.name.toLowerCase().includes(keyword)
        );
    }, []);

    return (
        <>
            {authors ?
                <>
                    <SearchField items={authors} setSearchedItems={setSearchedAuthors} itemFitsSearch={authorFitsSearch} />
                    <div>
                        <div className="list-header">
                            <div className="important cell">
                                <span><FormattedMessage id="authors" /></span>
                            </div>
                            <div className="important cell">
                                <span><FormattedMessage id="books" /></span>
                            </div>
                        </div>
                        <div className="items-list">
                            {displayedAuthors.map((author) =>
                                <div className="row" key={author.id}>
                                    <Link to={`/author/${author.id}`} className="important cell link">
                                        <span>{author?.name}</span>
                                    </Link>
                                    <div className="important cell">
                                        <span>{author?.booksCount}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <PaginationBar items={searchedAuthors} setDisplayedItems={setDisplayedAuthors} maxItemsPerPage={10} initialPage={1} />
                </>
                : <LoadingBars />
            }
        </>
    );
}
