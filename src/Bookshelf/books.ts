export interface Book {
    title: string;
    link: string;
    /* ISO 8601 dates, so they stay sortable and machine readable. */
    addedOn: string;
    completedOn: string | null;
}

export const books: Book[] = [
    {
        title: 'The Pragmatic Programmer',
        link: 'https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/',
        addedOn: '2024-01-12',
        completedOn: '2024-03-04',
    },
    {
        title: 'Designing Data-Intensive Applications',
        link: 'https://dataintensive.net/',
        addedOn: '2024-05-02',
        completedOn: null,
    },
    {
        title: 'Thinking, Fast and Slow',
        link: 'https://us.macmillan.com/books/9780374533557/thinkingfastandslow',
        addedOn: '2023-08-19',
        completedOn: '2023-11-27',
    },
];
