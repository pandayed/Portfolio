import type { BookCategory } from '../types';

export const booksByCategory: BookCategory[] = [
    {
        category: 'Self Help',
        booksList: [
            { name: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', isbn: '9781612681139' },
            {
                name: 'Subtle Art of Not Giving a F*ck',
                author: 'Mark Manson',
                isbn: '9780062457714',
            },
            { name: 'Atomic Habits', author: 'James Clear', isbn: '9780735211292' },
            { name: 'Ikigai', author: 'Héctor García, Francesc Miralles', isbn: '9780143130727' },
        ],
    },
    {
        category: 'Biography',
        booksList: [
            {
                name: 'Autobiography of a Yogi',
                author: 'Paramahansa Yogananda',
                isbn: '9780876120798',
            },
        ],
    },
    {
        category: 'Finance/Investment',
        booksList: [
            { name: 'The Intelligent Investor', author: 'Benjamin Graham', isbn: '9780060555665' },
            { name: 'Coffee Can Investing', author: 'Saurabh Mukherjea', isbn: '9780670090457' },
            { name: 'The Psychology of Money', author: 'Morgan Housel', isbn: '9780857197689' },
        ],
    },
    {
        category: 'Philosophy/Personal Growth',
        booksList: [
            {
                name: 'The Almanac Of Naval Ravikant',
                author: 'Naval Ravikant',
                isbn: '9789698729707',
            },
            { name: 'The Alchemist', author: 'Paulo Coelho', isbn: '9780061122415' },
        ],
    },
];
