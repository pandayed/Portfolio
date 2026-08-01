import { useState, useEffect } from 'react';

import './BookShelf.css';
import { getBookCoverUrl } from '../api-calls';
import { booksByCategory } from './books';

interface BookCoverProps {
    isbn: string;
    name: string;
}

const BookCover = ({ isbn, name }: BookCoverProps) => {
    const [coverUrl, setCoverUrl] = useState<string | null>(null);

    useEffect(() => {
        let isActive = true;

        getBookCoverUrl(isbn)
            .then((url) => {
                if (isActive) {
                    setCoverUrl(url);
                }
            })
            .catch((error: unknown) => {
                console.error(`Failed to load cover for ${isbn}:`, error);
            });

        return () => {
            isActive = false;
        };
    }, [isbn]);

    if (!coverUrl) {
        return null;
    }

    return (
        <div className="Book">
            <img src={coverUrl} alt={`${name} cover`} className="BookImage" />
        </div>
    );
};

export const BookShelfPage = () => {
    return (
        <section className="Section BookShelf">
            <h2 className="SectionTitle">Bookshelf</h2>
            <div className="SectionInner BookCategories">
                {booksByCategory.map((category) => (
                    <div key={category.category} className="BookCategory">
                        <h3 className="CategoryTitle">{category.category}</h3>
                        <div className="BooksList">
                            {category.booksList.map((book) => (
                                <BookCover key={book.isbn} isbn={book.isbn} name={book.name} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BookShelfPage;
