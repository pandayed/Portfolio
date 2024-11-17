import React, { useState } from "react";
import { getBookCoverUrl } from "../api-calls";
import './BookShelf.css';

const books = [
    {
        name: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        isbn: "9781612681139"
    },
    {
        name: "The Almanac Of Naval Ravikant",
        author: "Naval Ravikant",
        isbn: "9789698729707"
    },
    {
        name: "Subtle Art of Not Giving a F*ck",
        author: "Mark Manson",
        isbn: "9780062457714"
    },
    {
        name: "The Intelligent Investor",
        author: "Benjamin Graham",
        isbn: "9780060555665"
    },
    {
        name: "The Alchemist",
        author: "Paulo Coelho",
        isbn: "9780061122415"
    },
    {
        name: "Atomic Habits",
        author: "James Clear",
        isbn: "9780735211292"
    },
    {
        name: "Autobiography of a Yogi",
        author: "Paramahansa Yogananda",
        isbn: "9780876120798"
    },
    {
        name: "Coffee Can Investing",
        author: "Saurabh Mukherjea",
        isbn: "9780670090457"
    },
    {
        name: "The Psychology of Money",
        author: "Morgan Housel",
        isbn: "9780857197689"
    },
    {
        name: "Ikigai",
        author: "Héctor García, Francesc Miralles",
        isbn: "9780143130727"
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
            {image && <img src={image} alt="Book Cover" className="BookImage"/>}
        </div>
    );
};

export const BookShelfPage = () => {
    return (
        <div className="BookShelf">
            <div className="SectionTitle">BookShelf</div>
            <div className="BooksList">
                {books.map((book, index) => (
                    <div key={index} className="Book">
                        {/* <p className="BookName">{book.name}</p> */}
                        <ImageDisplay isbn={book.isbn} />
                        {/* <p>Author: {book.author}</p> */}
                    </div>
                ))}
            </div>
            
        </div>
    );
};
