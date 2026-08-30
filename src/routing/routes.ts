/* Hash routing keeps deep links working on static hosts that cannot rewrite
   unknown paths back to index.html. */

export const HOME_ROUTE = '/';
export const BLOGS_ROUTE = '/blogs';
export const DRAFTS_ROUTE = '/blogs/drafts';
export const ARCHIVE_ROUTE = '/blogs/archive';
export const CPP_COMPLEXITY_ROUTE = '/blogs/cpp-complexity';
export const COMPLEXITY_CASES_ROUTE = '/blogs/complexity-cases';
export const SQL_VS_MYSQL_ROUTE = '/blogs/sql-vs-mysql';
export const SSL_TLS_ROUTE = '/blogs/ssl-tls';
export const AI_OBEDIENCE_ROUTE = '/blogs/ai-obedience';
export const SIEVE_OF_ERATOSTHENES_ROUTE = '/blogs/sieve-of-eratosthenes';
export const CONSISTENT_HASHING_ROUTE = '/blogs/consistent-hashing';
export const WHY_REACT_ROUTE = '/blogs/why-react';
export const CHAIN_OF_THOUGHT_ROUTE = '/blogs/chain-of-thought';
export const PROJECTS_ROUTE = '/projects';
export const BOOKSHELF_ROUTE = '/bookshelf';
export const ABOUT_ROUTE = '/about';

export type Route =
    | typeof HOME_ROUTE
    | typeof BLOGS_ROUTE
    | typeof DRAFTS_ROUTE
    | typeof ARCHIVE_ROUTE
    | typeof CPP_COMPLEXITY_ROUTE
    | typeof COMPLEXITY_CASES_ROUTE
    | typeof SQL_VS_MYSQL_ROUTE
    | typeof SSL_TLS_ROUTE
    | typeof AI_OBEDIENCE_ROUTE
    | typeof SIEVE_OF_ERATOSTHENES_ROUTE
    | typeof CONSISTENT_HASHING_ROUTE
    | typeof WHY_REACT_ROUTE
    | typeof CHAIN_OF_THOUGHT_ROUTE
    | typeof PROJECTS_ROUTE
    | typeof BOOKSHELF_ROUTE
    | typeof ABOUT_ROUTE;

const routes: Route[] = [
    BLOGS_ROUTE,
    DRAFTS_ROUTE,
    ARCHIVE_ROUTE,
    CPP_COMPLEXITY_ROUTE,
    COMPLEXITY_CASES_ROUTE,
    SQL_VS_MYSQL_ROUTE,
    SSL_TLS_ROUTE,
    AI_OBEDIENCE_ROUTE,
    SIEVE_OF_ERATOSTHENES_ROUTE,
    CONSISTENT_HASHING_ROUTE,
    WHY_REACT_ROUTE,
    CHAIN_OF_THOUGHT_ROUTE,
    PROJECTS_ROUTE,
    BOOKSHELF_ROUTE,
    ABOUT_ROUTE,
];

export const toHref = (route: Route): string => `#${route}`;

export const parseRoute = (hash: string): Route => {
    const path = hash.replace(/^#/, '');
    return routes.find((route) => route === path) ?? HOME_ROUTE;
};
