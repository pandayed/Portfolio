import {
    COMPLEXITY_CASES_ROUTE,
    CPP_COMPLEXITY_ROUTE,
    SQL_VS_MYSQL_ROUTE,
    type Route,
} from '../routing/routes';

export interface Post {
    title: string;
    summary: string;
    /* ISO 8601 date, so entries stay sortable and machine readable. */
    publishedOn: string;
    route: Route;
}

export const posts: Post[] = [
    {
        title: 'Average and amortised are not the same thing',
        summary: 'One averages over inputs, the other over a sequence of calls, and only one of them is a guarantee.',
        publishedOn: '2026-08-05',
        route: COMPLEXITY_CASES_ROUTE,
    },
    {
        title: 'C++ containers and complexities',
        summary: 'Time complexities of the standard containers and algorithms, and what forces each one.',
        publishedOn: '2026-08-05',
        route: CPP_COMPLEXITY_ROUTE,
    },
    {
        title: 'SQL vs PostgreSQL, MySQL, SQL Server and Oracle',
        summary: 'SQL is a language. PostgreSQL, MySQL, SQL Server and Oracle are separate programs that implement it, each with its own extra syntax.',
        publishedOn: '2026-08-16',
        route: SQL_VS_MYSQL_ROUTE,
    },
];
