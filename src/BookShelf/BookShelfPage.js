import React, { useState, useEffect } from "react";
import { getBookCoverUrl } from "../api-calls";

const booksByCategory = [
    {
        category: "Self Help",
        booksList: [
            {
                "name": "Rich Dad Poor Dad",
                "author": "Robert Kiyosaki",
                "isbn": "9781612681139"
            },
            {
                "name": "Subtle Art of Not Giving a F*ck",
                "author": "Mark Manson",
                "isbn": "9780062457714"
            },
            {
                "name": "Atomic Habits",
                "author": "James Clear",
                "isbn": "9780735211292"
            },
            {
                "name": "Ikigai",
                "author": "Héctor García, Francesc Miralles",
                "isbn": "9780143130727"
            }
        ]
    },
    {
        category: "Biography",
        booksList: [
            {
                "name": "Autobiography of a Yogi",
                "author": "Paramahansa Yogananda",
                "isbn": "9780876120798"
            }
        ]
    },
    {
        category: "Finance/Investment",
        booksList: [
            {
                "name": "The Intelligent Investor",
                "author": "Benjamin Graham",
                "isbn": "9780060555665"
            },
            {
                "name": "Coffee Can Investing",
                "author": "Saurabh Mukherjea",
                "isbn": "9780670090457"
            },
            {
                "name": "The Psychology of Money",
                "author": "Morgan Housel",
                "isbn": "9780857197689"
            }
        ]
    },
    {
        category: "Philosophy/Personal Growth",
        booksList: [
            {
                "name": "The Almanac Of Naval Ravikant",
                "author": "Naval Ravikant",
                "isbn": "9789698729707"
            },
            {
                "name": "The Alchemist",
                "author": "Paulo Coelho",
                "isbn": "9780061122415"
            }
        ]
    }
];

const ImageDisplay = ({ isbn }) => {
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);

    const bookCoverSuccessCallback = (response) => {
        const bookCoverImageUrl = response.data.url;
        setImage(bookCoverImageUrl);
    };

    const bookCoverErrorCallback = (error) => {
        console.error(`Error: ${error}`);
        setError(error.message);
    };

    useEffect(() => {
        getBookCoverUrl(bookCoverSuccessCallback, bookCoverErrorCallback, isbn);
    }, [isbn]);

    return (
        <div className="flex justify-center">
            {image && (
                <img 
                    src={image} 
                    alt="Book Cover" 
                    className="h-48 w-auto object-cover rounded-lg shadow-md" 
                />
            )}
        </div>
    );
};

export const BookShelfPage = () => {
    return (
        <div className="bg-[#1B2027] p-6 md:p-12 lg:p-24">
            <div className="text-white text-3xl font-bold mb-8 text-center">Bookshelf</div>
            <div className="space-y-6">
                {booksByCategory.map((category, categoryIndex) => (
                    <div 
                        key={categoryIndex} 
                        className="bg-white/5 rounded-2xl p-4 md:p-6"
                    >
                        <div className="text-white text-lg font-semibold mb-4 text-center md:text-left">
                            {category.category}
                        </div>
                        <div className="flex overflow-x-auto space-x-4 pb-4">
                            {category.booksList.map((book, bookIndex) => (
                                <div 
                                    key={bookIndex} 
                                    className="flex-shrink-0 w-40 text-center"
                                >
                                    <ImageDisplay isbn={book.isbn} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookShelfPage;