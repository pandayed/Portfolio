export interface Book {
    title: string;
    link: string;
    /* Optional ISO 8601 dates, so they stay sortable and machine readable. */
    addedOn?: string;
    completedOn?: string;
}

export const books: Book[] = [
    {
        title: "System Design Interview – An Insider's Guide: Volume 1",
        link: 'https://www.goodreads.com/book/show/54109255-system-design-interview-an-insider-s-guide',
    },
    {
        title: 'Learning React: Modern Patterns for Developing React Apps',
        link: 'https://www.oreilly.com/library/view/learning-react-2nd/9781492051718/',
    },
    {
        title: 'The Four Agreements',
        link: 'https://www.miguelruiz.com/the-four-agreements',
    },
    {
        title: 'The Psychology of Money',
        link: 'https://harriman-house.com/psychologyofmoney',
    },
    {
        title: 'Learning SQL: Generate, Manipulate, and Retrieve Data',
        link: 'https://www.oreilly.com/library/view/learning-sql-3rd/9781492057604/',
    },
    {
        title: 'The Subtle Art of Not Giving a F*ck',
        link: 'https://markmanson.net/books/subtle-art',
    },
    {
        title: 'Zero to One',
        link: 'https://zerotoonebook.com/',
    },
    {
        title: 'The Almanack of Naval Ravikant',
        link: 'https://www.navalmanack.com/',
    },
    {
        title: 'Love, Longing, Loss in Urdu Poetry',
        link: 'https://www.goodreads.com/book/show/60601435-love-longing-loss-in-urdu-poetry',
    },
    {
        title: 'Astrophysics for People in a Hurry',
        link: 'https://wwnorton.com/books/9780393609394',
    },
    {
        title: 'Atomic Habits',
        link: 'https://jamesclear.com/atomic-habits',
    },
];
