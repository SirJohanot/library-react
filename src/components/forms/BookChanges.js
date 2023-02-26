import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { isAWord, isHumanNames } from '../../utility/validator';

export default function BookChanges({ book, setBook, handleSubmit, error, setDisabled }) {
    const titleRef = useRef();

    const [errors, setErrors] = useState({
        title: '',
        authors: '',
        genre: '',
        publisher: ''
    });

    useEffect(() => {
        titleRef.current.focus();
    }, []);

    const validateField = useCallback(
        (key, validateAgainst, errorMessage) => {
            if (!validateAgainst(book[key])) {
                setErrors(prev => ({ ...prev, [key]: errorMessage }));
                return true;
            }
            return false;
        }, [book]);

    useEffect(() => {
        if (validateField('title', (title) => title, 'fieldRequired')) {
            return;
        }
        if (validateField('title', isAWord, 'alphabetical')) {
            return;
        }
        setErrors(prev => ({ ...prev, title: '' }));
    }, [book?.title, validateField]);

    useEffect(() => {
        if (validateField('authors', (authors) => authors, 'fieldRequired')) {
            return;
        }
        if (validateField('authors', isHumanNames, 'alphabetical')) {
            return;
        }
        setErrors(prev => ({ ...prev, authors: '' }));
    }, [book?.authors, validateField]);

    useEffect(() => {
        if (validateField('genre', (genre) => genre, 'fieldRequired')) {
            return;
        }
        if (validateField('genre', isAWord, 'alphabetical')) {
            return;
        }
        setErrors(prev => ({ ...prev, genre: '' }));
    }, [book?.genre, validateField]);

    useEffect(() => {
        if (validateField('publisher', (publisher) => publisher, 'fieldRequired')) {
            return;
        }
        if (validateField('publisher', isAWord, 'alphabetical')) {
            return;
        }
        setErrors(prev => ({ ...prev, publisher: '' }));
    }, [book?.publisher, validateField]);

    useEffect(() => {
        setDisabled(errors?.title
            || errors?.authors
            || errors?.genre
            || errors?.publisher);
    }, [errors, setDisabled]);

    const handleChange = (e) => {
        setBook(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    return (
        <form id="book-changes" className="form" onSubmit={handleSubmit}>
            <label htmlFor="title"><FormattedMessage id="bookTitle" />:</label>
            <input
                className={errors?.title ? 'red-border' : ''}
                type="text"
                id="title"
                name="title"
                value={book?.title}
                onChange={handleChange}
                ref={titleRef}
                required
            />
            {errors?.title &&
                <div className="field-error"><FormattedMessage id={errors?.title} /></div>
            }
            <label htmlFor="authors"><FormattedMessage id="authors" /> (<FormattedMessage id="commaSeparated" />):</label>
            <input
                className={errors?.authors ? 'red-border' : ''}
                type="text"
                id="authors"
                name="authors"
                value={book?.authors}
                onChange={handleChange}
                required
            />
            {errors?.authors &&
                <div className="field-error"><FormattedMessage id={errors?.authors} /></div>
            }
            <label htmlFor="genre"><FormattedMessage id="genre" />:</label>
            <input
                className={errors?.genre ? 'red-border' : ''}
                type="text"
                id="genre"
                name="genre"
                value={book?.genre}
                onChange={handleChange}
                required
            />
            {errors?.genre &&
                <div className="field-error"><FormattedMessage id={errors?.genre} /></div>
            }
            <label htmlFor="publisher"><FormattedMessage id="publisher" />:</label>
            <input
                className={errors?.publisher ? 'red-border' : ''}
                type="text"
                id="publisher"
                name="publisher"
                value={book?.publisher}
                onChange={handleChange}
                required
            />
            {errors?.publisher &&
                <div className="field-error"><FormattedMessage id={errors?.publisher} /></div>
            }
            <label htmlFor="publishment-year"><FormattedMessage id="publishmentYear" />:</label>
            <input
                type="number"
                id="publishment-year"
                name="publishmentYear"
                value={book?.publishmentYear}
                onChange={handleChange}
                min="1900"
                max="2025"
                step="1"
                required
            />
            <label htmlFor="amount"><FormattedMessage id="inStock" />:</label>
            <input
                type="number"
                id="amount"
                name="amount"
                value={book?.amount}
                onChange={handleChange}
                min="0"
                step="1"
                required
            />
            {error &&
                <div className="error-message"><FormattedMessage id={error} /></div>
            }
        </form>
    );
}
