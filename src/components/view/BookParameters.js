import React from 'react';


export default function BookParameters({ book }) {

    return (
        <>
            <h1>Title: {book?.title}</h1>
            <p>Authors: {book?.authors?.map((author) => { author.name; })}</p>
            <p>Genre: {book?.genre?.name}</p>
            <p>Publisher: {book?.publisher?.name}</p>
            <p>Publishment year: {book?.publishmentYear}</p>
            <p>In stock: {book?.amount}</p>
        </>
    );
}
