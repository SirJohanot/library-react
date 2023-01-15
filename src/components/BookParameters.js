import React from 'react';

export default function BookParameters(props) {

    return (
        <div>
            <h1>Title: {props.book.title}</h1>
            <p>Authors: {props.authors.map((author) => { author.name },)}</p>
            <p>Genre: {props.book.genre.name}</p>
            <p>Publisher: {props.book.publisher.name}</p>
            <p>Publishment year: {props.book.publishmentYear}</p>
            <p>In stock: {props.book.amount}</p>
        </div>
    );
}
