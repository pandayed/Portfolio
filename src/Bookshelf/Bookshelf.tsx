import './Bookshelf.css';
import '../CommonClasses/CommonClasses.css';

import { books, type Book } from './books';

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
});

const formatDate = (date: string) => dateFormatter.format(new Date(`${date}T00:00:00`));

const BookDate = ({ label, date }: { label: string; date: string | null }) => {
    return (
        <div className="Bookshelf__date">
            <span className="Bookshelf__dateLabel">{label}</span>
            {date ? (
                <time dateTime={date}>{formatDate(date)}</time>
            ) : (
                <span aria-label="Not yet completed">—</span>
            )}
        </div>
    );
};

const BookEntry = ({ title, link, addedOn, completedOn }: Book) => {
    return (
        <li className="Bookshelf__item">
            <a
                href={link}
                target="_blank"
                rel="noreferrer noopener"
                className="Link Link--standalone Bookshelf__title"
            >
                {title}
            </a>
            <div className="Bookshelf__dates">
                <BookDate label="Added" date={addedOn} />
                <BookDate label="Completed" date={completedOn} />
            </div>
        </li>
    );
};

const Bookshelf = () => {
    return (
        <section className="Bookshelf" aria-labelledby="bookshelf-title">
            <h1 id="bookshelf-title" className="PageTitle">
                Bookshelf
            </h1>
            <ul className="Bookshelf__list">
                {books.map((book) => (
                    <BookEntry key={book.link} {...book} />
                ))}
            </ul>
        </section>
    );
};

export default Bookshelf;
