import { PropTypes } from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function BookParameters({ book }) {

    BookParameters.propTypes = {
        book: PropTypes.object.isRequired,
    };

    return (
        <>
            <h1><span className="parameter-name"><FormattedMessage id="bookTitle" />:</span> {book?.title}</h1>
            <p><span className="parameter-name"><FormattedMessage id="authors" />:</span> {book?.authors?.map(author => author.name).join(", ")}</p>
            <p><span className="parameter-name"><FormattedMessage id="editors" />:</span> {book?.editors?.map(editor => `${editor.role} ${editor.name}`).join(", ")}</p>
            <p><span className="parameter-name"><FormattedMessage id="genre" />:</span> {book?.genre?.name}</p>
            <p><span className="parameter-name"><FormattedMessage id="publisher" />:</span> {book?.publisher?.name}, {book?.publisher?.postalCode}, {book?.publisher?.address}</p>
            <p><span className="parameter-name"><FormattedMessage id="printingHouse" />:</span> {book?.printingHouse?.name}, {book?.printingHouse?.postalCode}, {book?.printingHouse?.address}</p>
            <p><span className="parameter-name"><FormattedMessage id="publicationYear" />:</span> {book?.publicationYear}</p>
            <p><span className="parameter-name"><FormattedMessage id="publicationLocation" />:</span> {book?.publicationLocation}</p>
            <p><span className="parameter-name"><FormattedMessage id="description" />:</span> {book?.description}</p>
            <p><span className="parameter-name"><FormattedMessage id="pagesNumber" />:</span> {book?.pagesNumber}</p>
            <p><span className="parameter-name">ISBN:</span> {book?.isbn}</p>
            <p><span className="parameter-name"><FormattedMessage id="udc" />:</span> {book?.udc}</p>
            <p><span className="parameter-name"><FormattedMessage id="bbc" />:</span> {book?.bbc}</p>
            <p><span className="parameter-name"><FormattedMessage id="inStock" />:</span> {book?.amount}</p>
        </>
    );
}
