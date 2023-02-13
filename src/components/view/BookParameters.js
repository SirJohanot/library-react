import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function BookParameters({ book }) {
    return (
        <>
            <h1><FormattedMessage id="bookTitle" />: {book?.title}</h1>
            <p><FormattedMessage id="authors" />: {book?.authors?.map(author => author.name).join(", ")}</p>
            <p><FormattedMessage id="genre" />: {book?.genre?.name}</p>
            <p><FormattedMessage id="publisher" />: {book?.publisher?.name}</p>
            <p><FormattedMessage id="publishmentYear" />: {book?.publishmentYear}</p>
            <p><FormattedMessage id="inStock" />: {book?.amount}</p>
        </>
    );
}
