import {
    AI_OBEDIENCE_ROUTE,
    COMPLEXITY_CASES_ROUTE,
    CPP_COMPLEXITY_ROUTE,
    SQL_VS_MYSQL_ROUTE,
    SSL_TLS_ROUTE,
    type Route,
} from '../routing/routes';

export interface Post {
    title: string;
    summary: string;
    /* ISO 8601 dates, so entries stay sortable and machine readable. */
    startedOn: string;
    updatedOn: string;
    route: Route;
}

const entries: Post[] = [
    {
        title: 'Average and amortised are not the same thing',
        summary: 'One averages over inputs, the other over a sequence of calls, and only one of them is a guarantee.',
        startedOn: '2026-08-05',
        updatedOn: '2026-08-05',
        route: COMPLEXITY_CASES_ROUTE,
    },
    {
        title: 'C++ containers and complexities',
        summary: 'Time complexities of the standard containers and algorithms, and what forces each one.',
        startedOn: '2026-08-05',
        updatedOn: '2026-08-05',
        route: CPP_COMPLEXITY_ROUTE,
    },
    {
        title: 'SQL vs PostgreSQL, MySQL, SQL Server and Oracle',
        summary: 'SQL is a language. PostgreSQL, MySQL, SQL Server and Oracle are separate programs that implement it, each with its own extra syntax.',
        startedOn: '2026-08-16',
        updatedOn: '2026-08-16',
        route: SQL_VS_MYSQL_ROUTE,
    },
    {
        title: 'SSL and TLS',
        summary: 'SSL is the old name for TLS. What the protocol guarantees, how the handshake works, and which versions are still allowed.',
        startedOn: '2026-08-21',
        updatedOn: '2026-08-21',
        route: SSL_TLS_ROUTE,
    },
    {
        title: 'AI (dis)obedience',
        summary: 'Code that runs and is still wrong for the codebase. What goes wrong, and why it comes down to specification, context, scope, execution strategy and reading the code yourself.',
        startedOn: '2026-08-22',
        updatedOn: '2026-08-22',
        route: AI_OBEDIENCE_ROUTE,
    },
];

/* Newest first by start date. Sorted here so the list above can stay in any
   order that is convenient to edit. */
export const posts: Post[] = [...entries].sort((a, b) => b.startedOn.localeCompare(a.startedOn));
