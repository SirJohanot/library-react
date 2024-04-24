import { PropTypes } from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { isAHumanName, isAWord } from '../../utility/validator';

export default function BookChanges({ book, setBook, handleSubmit, error, setDisabled }) {

    BookChanges.propTypes = {
        book: PropTypes.object.isRequired,
        setBook: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        error: PropTypes.string.isRequired,
        setDisabled: PropTypes.func.isRequired,
    };

    const titleRef = useRef();

    const [errors, setErrors] = useState({
        title: '',
        authors: [''],
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

    const bookAuthorsJSON = JSON.stringify(book?.authors);

    useEffect(() => {
        book?.authors.forEach((element, index) => {
            let error = '';
            if (!element) {
                error = 'fieldRequired';
            }
            else if (!isAHumanName(element)) {
                error = 'alphabetical';
            }
            setErrors(prev => ({ ...prev, authors: prev?.authors.map((mapElement, mapIndex) => index === mapIndex ? error : mapElement) }));
        })
    }, [book?.authors, bookAuthorsJSON]);

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
            || (errors?.authors.filter(error => error === '').length !== errors?.authors.length)
            || errors?.genre
            || errors?.publisher);
    }, [errors, setDisabled]);

    const handleChange = (e) => {
        setBook(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleAuthorChange = (e, index) => {
        const newAuthors = book?.authors;
        newAuthors[index] = e.target.value;
        setBook(prev => ({ ...prev, authors: newAuthors }));
    }

    const handleAddAuthor = (e) => {
        setBook(prev => ({ ...prev, authors: [...prev?.authors, ''] }));
        setErrors(prev => ({ ...prev, authors: [...prev?.authors, ''] }));
    }

    const handleRemoveAuthor = (index) => {
        setBook(prev => ({ ...prev, authors: [...prev?.authors.slice(0, index), ...prev?.authors.slice(index + 1, prev?.authors.length)] }));
        setErrors(prev => ({ ...prev, authors: [...prev?.authors.slice(0, index), ...prev?.authors.slice(index + 1, prev?.authors.length)] }));
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
            <label htmlFor="author0"><FormattedMessage id="authors" />:</label>
            {book?.authors.map((element, index) =>
                <div key={`author${index}`}>
                    <div className="author-input">
                        <input
                            className={errors?.authors[index] ? 'red-border' : ''}
                            type="text"
                            id={`author${index}`}
                            data-testid={`author${index}`}
                            name="author"
                            value={element}
                            onChange={(e) => handleAuthorChange(e, index)}
                            required
                        />
                        {index > 0 &&
                            <button type="button" className="btn red" onClick={(e) => handleRemoveAuthor(index)}>-</button>
                        }
                    </div>
                    {errors?.authors[index] &&
                        <div className="field-error"><FormattedMessage id={errors?.authors[index]} /></div>
                    }
                </div>
            )}
            <button type="button" className="btn" onClick={handleAddAuthor}>+</button>
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
