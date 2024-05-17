import { PropTypes } from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { isAHumanName, isAWord, isValidAuthorIndex, isValidIsbn, isValidUdcBbc } from '../../utility/validator';

export default function BookChanges({ book, setBook, handleSubmit, error, setDisabled }) {

    BookChanges.propTypes = {
        book: PropTypes.object.isRequired,
        setBook: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        error: PropTypes.string.isRequired,
        setDisabled: PropTypes.func.isRequired,
    };

    const titleRef = useRef();

    const intl = useIntl();

    const [errors, setErrors] = useState({
        title: '',
        authors: [''],
        editors: [''],
        genre: '',
        publisher: { name: '', postalCode: '', address: '' },
        printingHouse: { name: '', postalCode: '', address: '' },
        publicationLocation: '',
        description: '',
        isbn: '',
        udc: '',
        bbc: '',
        authorIndex: ''
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

    const bookEditorsJSON = JSON.stringify(book?.editors);

    useEffect(() => {
        book?.editors.forEach((element, index) => {
            let error = '';
            if (!element?.role || !element?.name) {
                error = 'fieldRequired';
            }
            else if (!isAHumanName(element?.role) || !isAHumanName(element?.name)) {
                error = 'alphabetical';
            }
            setErrors(prev => ({ ...prev, editors: prev?.editors.map((mapElement, mapIndex) => index === mapIndex ? error : mapElement) }));
        })
    }, [book?.editors, bookEditorsJSON]);

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
        let error = '';
        const publisherName = book?.publisher?.name;
        if (!publisherName) {
            error = 'fieldRequired';
        }
        else if (!isAWord(publisherName)) {
            error = 'alphabetical';
        }
        setErrors(prev => ({ ...prev, publisher: { ...prev?.publisher, name: error } }));
    }, [book?.publisher?.name]);

    useEffect(() => {
        let error = '';
        const publisherPostalCode = book?.publisher?.postalCode;
        if (!publisherPostalCode) {
            error = 'fieldRequired';
        }
        setErrors(prev => ({ ...prev, publisher: { ...prev?.publisher, postalCode: error } }));
    }, [book?.publisher?.postalCode]);

    useEffect(() => {
        let error = '';
        const publisherAddress = book?.publisher?.address;
        if (!publisherAddress) {
            error = 'fieldRequired';
        }
        else if (!isAWord(publisherAddress)) {
            error = 'alphabetical';
        }
        setErrors(prev => ({ ...prev, publisher: { ...prev?.publisher, address: error } }));
    }, [book?.publisher?.address]);

    useEffect(() => {
        let error = '';
        const printingHouseName = book?.printingHouse?.name;
        if (!printingHouseName) {
            error = 'fieldRequired';
        }
        else if (!isAWord(printingHouseName)) {
            error = 'alphabetical';
        }
        setErrors(prev => ({ ...prev, printingHouse: { ...prev?.printingHouse, name: error } }));
    }, [book?.printingHouse?.name]);

    useEffect(() => {
        let error = '';
        const printingHousePostalCode = book?.printingHouse?.postalCode;
        if (!printingHousePostalCode) {
            error = 'fieldRequired';
        }
        setErrors(prev => ({ ...prev, printingHouse: { ...prev?.printingHouse, postalCode: error } }));
    }, [book?.printingHouse?.postalCode]);

    useEffect(() => {
        let error = '';
        const printingHouseAddress = book?.printingHouse?.address;
        if (!printingHouseAddress) {
            error = 'fieldRequired';
        }
        else if (!isAWord(printingHouseAddress)) {
            error = 'alphabetical';
        }
        setErrors(prev => ({ ...prev, printingHouse: { ...prev?.printingHouse, address: error } }));
    }, [book?.printingHouse?.address]);

    useEffect(() => {
        if (validateField('publicationLocation', (publicationLocation) => publicationLocation, 'fieldRequired')) {
            return;
        }
        if (validateField('publicationLocation', isAWord, 'alphabetical')) {
            return;
        }
        setErrors(prev => ({ ...prev, publicationLocation: '' }));
    }, [book?.publicationLocation, validateField]);

    useEffect(() => {
        if (book?.isbn?.length > 0 && validateField('isbn', isValidIsbn, 'isbnFormat')) {
            return;
        }
        setErrors(prev => ({ ...prev, isbn: '' }));
    }, [book?.isbn, validateField]);

    useEffect(() => {
        if (book?.udc?.length > 0 && validateField('udc', isValidUdcBbc, 'invalidFormat')) {
            return;
        }
        setErrors(prev => ({ ...prev, udc: '' }));
    }, [book?.udc, validateField]);

    useEffect(() => {
        if (book?.bbc?.length > 0 && validateField('bbc', isValidUdcBbc, 'invalidFormat')) {
            return;
        }
        setErrors(prev => ({ ...prev, bbc: '' }));
    }, [book?.bbc, validateField]);

    useEffect(() => {
        if (book?.authorIndex?.length > 0 && validateField('authorIndex', isValidAuthorIndex, 'invalidFormat')) {
            return;
        }
        setErrors(prev => ({ ...prev, authorIndex: '' }));
    }, [book?.authorIndex, validateField]);

    useEffect(() => {
        setDisabled((errors?.title
            || (errors?.authors.filter(error => error === '').length !== errors?.authors.length)
            || (errors?.editors.filter(error => error === '').length !== errors?.editors.length)
            || errors?.genre
            || errors?.publisher?.name
            || errors?.publisher?.postalCode
            || errors?.publisher?.address
            || errors?.printingHouse?.name
            || errors?.printingHouse?.postalCode
            || errors?.printingHouse?.address
            || errors?.publicationLocation
            || errors?.description
            || errors?.isbn
            || errors?.udc
            || errors?.bbc
            || errors?.authorIndex) ? true : false);
    }, [errors, setDisabled]);

    const handleChange = (e) => {
        setBook(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handlePublisherChange = (e) => {
        setBook(prev => ({ ...prev, publisher: { ...prev?.publisher, [e.target.name]: e.target.value } }));
    }

    const handlePrintingHouseChange = (e) => {
        setBook(prev => ({ ...prev, printingHouse: { ...prev?.printingHouse, [e.target.name]: e.target.value } }));
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

    const handleEditorChange = (e, index) => {
        const newEditors = book?.editors;
        newEditors[index] = { ...newEditors[index], [e.target.name]: e.target.value };
        setBook(prev => ({ ...prev, editors: newEditors }));
    }

    const handleAddEditor = (e) => {
        setBook(prev => ({ ...prev, editors: [...prev?.editors, { role: '', name: '' }] }));
        setErrors(prev => ({ ...prev, editors: [...prev?.editors, ''] }));
    }

    const handleRemoveEditor = (index) => {
        setBook(prev => ({ ...prev, editors: [...prev?.editors.slice(0, index), ...prev?.editors.slice(index + 1, prev?.editors.length)] }));
        setErrors(prev => ({ ...prev, editors: [...prev?.editors.slice(0, index), ...prev?.editors.slice(index + 1, prev?.editors.length)] }));
    }

    return (
        <form id="book-changes" className="form" onSubmit={handleSubmit}>
            <div className="form-element">
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
            </div>
            <div className="form-element">
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
            </div>
            <div className="form-element">
                <label htmlFor="editor0role"><FormattedMessage id="editors" />:</label>
                {book?.editors.map((element, index) =>
                    <div key={`editor${index}`}>
                        <div className="editor-input">
                            <input
                                className={errors?.editors[index] ? 'red-border' : ''}
                                type="text"
                                id={`editor${index}role`}
                                data-testid={`editor${index}role`}
                                name="role"
                                value={element?.role}
                                onChange={(e) => handleEditorChange(e, index)}
                                placeholder={intl.formatMessage({ id: 'role' })}
                                required
                            />
                            <input
                                className={errors?.editors[index] ? 'red-border' : ''}
                                type="text"
                                id={`editor${index}name`}
                                data-testid={`editor${index}name`}
                                name="name"
                                value={element?.name}
                                onChange={(e) => handleEditorChange(e, index)}
                                placeholder={`${intl.formatMessage({ id: 'firstName' })}, ${intl.formatMessage({ id: 'lastName' })}`}
                                required
                            />
                            {index > 0 &&
                                <button type="button" className="btn red" onClick={(e) => handleRemoveEditor(index)}>-</button>
                            }
                        </div>
                        {errors?.editors[index] &&
                            <div className="field-error"><FormattedMessage id={errors?.editors[index]} /></div>
                        }
                    </div>
                )}
                <button type="button" className="btn" onClick={handleAddEditor}>+</button>
            </div>
            <div className="form-element">
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
            </div>
            <div className="form-element">
                <label htmlFor="publisher-name"><FormattedMessage id="publisher" />:</label>
                <input
                    className={errors?.publisher ? 'red-border' : ''}
                    type="text"
                    id="publisher-name"
                    name="name"
                    value={book?.publisher?.name}
                    onChange={handlePublisherChange}
                    placeholder={intl.formatMessage({ id: 'name' })}
                    required
                />
                {errors?.publisher?.name &&
                    <div className="field-error"><FormattedMessage id={errors?.publisher?.name} /></div>
                }
                <input
                    className={errors?.publisher ? 'red-border' : ''}
                    type="text"
                    id="publisher-postal-code"
                    name="postalCode"
                    value={book?.publisher?.postalCode}
                    onChange={handlePublisherChange}
                    placeholder={intl.formatMessage({ id: 'postalCode' })}
                    required
                />
                {errors?.publisher?.postalCode &&
                    <div className="field-error"><FormattedMessage id={errors?.publisher?.postalCode} /></div>
                }
                <input
                    className={errors?.publisher ? 'red-border' : ''}
                    type="text"
                    id="publisher-address"
                    name="address"
                    value={book?.publisher?.address}
                    onChange={handlePublisherChange}
                    placeholder={intl.formatMessage({ id: 'address' })}
                    required
                />
                {errors?.publisher?.address &&
                    <div className="field-error"><FormattedMessage id={errors?.publisher?.address} /></div>
                }
            </div>
            <div className="form-element">
                <label htmlFor="printing-house-name"><FormattedMessage id="printingHouse" />:</label>
                <input
                    className={errors?.printingHouse ? 'red-border' : ''}
                    type="text"
                    id="printing-house-name"
                    name="name"
                    value={book?.printingHouse?.name}
                    onChange={handlePrintingHouseChange}
                    placeholder={intl.formatMessage({ id: 'name' })}
                    required
                />
                {errors?.printingHouse?.name &&
                    <div className="field-error"><FormattedMessage id={errors?.printingHouse?.name} /></div>
                }
                <input
                    className={errors?.printingHouse ? 'red-border' : ''}
                    type="text"
                    id="printing-house-postal-code"
                    name="postalCode"
                    value={book?.printingHouse?.postalCode}
                    onChange={handlePrintingHouseChange}
                    placeholder={intl.formatMessage({ id: 'postalCode' })}
                    required
                />
                {errors?.printingHouse?.postalCode &&
                    <div className="field-error"><FormattedMessage id={errors?.printingHouse?.postalCode} /></div>
                }
                <input
                    className={errors?.printingHouse ? 'red-border' : ''}
                    type="text"
                    id="printing-house-address"
                    name="address"
                    value={book?.printingHouse?.address}
                    onChange={handlePrintingHouseChange}
                    placeholder={intl.formatMessage({ id: 'address' })}
                    required
                />
                {errors?.printingHouse?.address &&
                    <div className="field-error"><FormattedMessage id={errors?.printingHouse?.address} /></div>
                }
            </div>
            <div className="form-element">
                <label htmlFor="publication-year"><FormattedMessage id="publicationYear" />:</label>
                <input
                    type="number"
                    id="publication-year"
                    name="publicationYear"
                    value={book?.publicationYear}
                    onChange={handleChange}
                    min="1900"
                    max="2025"
                    step="1"
                    required
                />
            </div>
            <div className="form-element">
                <label htmlFor="publication-location"><FormattedMessage id="publicationLocation" />:</label>
                <input
                    type="text"
                    id="publication-location"
                    name="publicationLocation"
                    value={book?.publicationLocation}
                    onChange={handleChange}
                    required
                />
                {errors?.publicationLocation &&
                    <div className="field-error"><FormattedMessage id={errors?.publicationLocation} /></div>
                }
            </div>
            <div className="form-element">
                <label htmlFor="description"><FormattedMessage id="description" />:</label>
                <textarea
                    type="text"
                    id="description"
                    name="description"
                    value={book?.description}
                    onChange={handleChange}
                    rows="5"
                    cols="80"
                />
                {errors?.description &&
                    <div className="field-error"><FormattedMessage id={errors?.description} /></div>
                }
            </div>
            <div className="form-element">
                <label htmlFor="pages-number"><FormattedMessage id="pagesNumber" />:</label>
                <input
                    type="number"
                    id="pages-number"
                    name="pagesNumber"
                    value={book?.pagesNumber}
                    onChange={handleChange}
                    min="2"
                    step="1"
                    required
                />
            </div>
            <div className="form-element">
                <label htmlFor="isbn">ISBN:</label>
                <input
                    type="text"
                    id="isbn"
                    name="isbn"
                    value={book?.isbn}
                    onChange={handleChange}
                />
                {errors?.isbn &&
                    <div className="field-error"><FormattedMessage id={errors?.isbn} /></div>
                }
            </div>
            <div className="form-element">
                <label htmlFor="udc"><FormattedMessage id="udc" />:</label>
                <input
                    type="text"
                    id="udc"
                    name="udc"
                    value={book?.udc}
                    onChange={handleChange}
                />
                {errors?.udc &&
                    <div className="field-error"><FormattedMessage id={errors?.udc} /></div>
                }
            </div>
            <div className="form-element">
                <label htmlFor="bbc"><FormattedMessage id="bbc" />:</label>
                <input
                    type="text"
                    id="bbc"
                    name="bbc"
                    value={book?.bbc}
                    onChange={handleChange}
                />
                {errors?.bbc &&
                    <div className="field-error"><FormattedMessage id={errors?.bbc} /></div>
                }
            </div>
            <div className="form-element">
                <label htmlFor="author-index"><FormattedMessage id="authorIndex" />:</label>
                <input
                    type="text"
                    id="author-index"
                    name="authorIndex"
                    value={book?.authorIndex}
                    onChange={handleChange}
                />
                {errors?.authorIndex &&
                    <div className="field-error"><FormattedMessage id={errors?.authorIndex} /></div>
                }
            </div>
            <div className="form-element">
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
            </div>
            {error &&
                <div className="error-message"><FormattedMessage id={error} /></div>
            }
        </form>
    );
}
