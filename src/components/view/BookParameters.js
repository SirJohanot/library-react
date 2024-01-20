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
            <p><span className="parameter-name"><FormattedMessage id="genre" />:</span> {book?.genre?.name}</p>
            <p><span className="parameter-name"><FormattedMessage id="publisher" />:</span> {book?.publisher?.name}</p>
            <p><span className="parameter-name"><FormattedMessage id="publishmentYear" />:</span> {book?.publishmentYear}</p>
            <p><span className="parameter-name"><FormattedMessage id="inStock" />:</span> {book?.amount}</p>
        </>
    );
}
