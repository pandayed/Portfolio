import React, { useState } from "react";
import { getBookCoverUrl } from "../api-calls";
import './BookShelf.css';

const books = [
    {
        name: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        isbn: "978-0345376596"
    },
    {
        name: "The Almanac Of Naval Ravikant",
        author: "lal",
        isbn: "9789698729707"
    }
];


const ImageDisplay = ({ isbn }) => {
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);

    const bookCoverSuccessCallback = (response) => {
        // Assuming the response contains a "url" key with the image URL
        const bookCoverImageUrl = response.data.url; // why does data appear in response
        console.log(response);
        setImage(bookCoverImageUrl); // Set the image URL
    };

    const bookCoverErrorCallback = (error) => {
        console.error(`Error: ${error}`);
        setError(error.message); // Set the error message
    };

    // Trigger the API call when the component mounts or when `isbn` changes
    React.useEffect(() => {
        getBookCoverUrl(bookCoverSuccessCallback, bookCoverErrorCallback, isbn);
    }, [isbn]);

    return (
        <div>
            {image && <img src={image} alt="Book Cover" />}
        </div>
    );
};

export const BookShelfPage = () => {
    return (
        <div className="BookShelf">
            {books.map((book, index) => (
                <div key={index} className="Book">
                    <ImageDisplay isbn={book.isbn} />
                    <h3>{book.name}</h3>
                    <p>Author: {book.author}</p>
                </div>
            ))}
        </div>
    );
};
