/* Hash routing keeps deep links working on static hosts that cannot rewrite
   unknown paths back to index.html. */

import { goNotes } from '../Notes/GoNotes/goNotes';
import { pythonNotes } from '../Notes/PythonNotes/pythonNotes';

export const HOME_ROUTE = '/';
export const BLOGS_ROUTE = '/blogs';
export const NOTES_ROUTE = '/notes';
export const MYSQL_NOTES_ROUTE = '/notes/mysql';
export const GO_NOTES_ROUTE = '/notes/go';
export const PYTHON_NOTES_ROUTE = '/notes/python';
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
export const WRITING_BETTER_PLANS_AND_SKILLS_ROUTE = '/blogs/writing-better-plans-and-skills';
export const MYSQL_GROUP_BY_ROUTE = '/blogs/mysql-group-by';
export const SCALAR_IN_MYSQL_ROUTE = '/blogs/scalar-in-mysql';
export const API_COMMUNICATION_ROUTE = '/notes/api-communication';
export const JAVASCRIPT_ASYNC_ROUTE = '/notes/javascript-asynchronous-programming';
export const JAVASCRIPT_EVENT_LOOP_ROUTE = '/notes/javascript-event-loop';
export const PROJECTS_ROUTE = '/projects';
export const INSTEAD_PRIVACY_POLICY_ROUTE = '/instead/privacy-policy';
export const BOOKSHELF_ROUTE = '/bookshelf';
export const ABOUT_ROUTE = '/about';

export type GoNoteRoute = `${typeof GO_NOTES_ROUTE}/${string}`;
export type PythonNoteRoute = `${typeof PYTHON_NOTES_ROUTE}/${string}`;

export type Route =
    | typeof HOME_ROUTE
    | typeof BLOGS_ROUTE
    | typeof NOTES_ROUTE
    | typeof MYSQL_NOTES_ROUTE
    | typeof GO_NOTES_ROUTE
    | GoNoteRoute
    | typeof PYTHON_NOTES_ROUTE
    | PythonNoteRoute
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
    | typeof WRITING_BETTER_PLANS_AND_SKILLS_ROUTE
    | typeof MYSQL_GROUP_BY_ROUTE
    | typeof SCALAR_IN_MYSQL_ROUTE
    | typeof API_COMMUNICATION_ROUTE
    | typeof JAVASCRIPT_ASYNC_ROUTE
    | typeof JAVASCRIPT_EVENT_LOOP_ROUTE
    | typeof PROJECTS_ROUTE
    | typeof INSTEAD_PRIVACY_POLICY_ROUTE
    | typeof BOOKSHELF_ROUTE
    | typeof ABOUT_ROUTE;

const goNoteRoutes: GoNoteRoute[] = goNotes.map(
    ({ slug }) => `${GO_NOTES_ROUTE}/${slug}` as GoNoteRoute,
);

const pythonNoteRoutes: PythonNoteRoute[] = pythonNotes.map(
    ({ slug }) => `${PYTHON_NOTES_ROUTE}/${slug}` as PythonNoteRoute,
);

const routes: Route[] = [
    BLOGS_ROUTE,
    NOTES_ROUTE,
    MYSQL_NOTES_ROUTE,
    GO_NOTES_ROUTE,
    ...goNoteRoutes,
    PYTHON_NOTES_ROUTE,
    ...pythonNoteRoutes,
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
    WRITING_BETTER_PLANS_AND_SKILLS_ROUTE,
    MYSQL_GROUP_BY_ROUTE,
    SCALAR_IN_MYSQL_ROUTE,
    API_COMMUNICATION_ROUTE,
    JAVASCRIPT_ASYNC_ROUTE,
    JAVASCRIPT_EVENT_LOOP_ROUTE,
    PROJECTS_ROUTE,
    INSTEAD_PRIVACY_POLICY_ROUTE,
    BOOKSHELF_ROUTE,
    ABOUT_ROUTE,
];

export const toHref = (route: Route): string => `#${route}`;

export const parseRoute = (hash: string): Route => {
    const path = hash.replace(/^#/, '');
    return routes.find((route) => route === path) ?? HOME_ROUTE;
};
