import { CPP_COMPLEXITY_ROUTE, type Route } from '../routing/routes';

export interface Post {
    title: string;
    summary: string;
    /* ISO 8601 date, so entries stay sortable and machine readable. */
    publishedOn: string;
    route: Route;
}

export const posts: Post[] = [
    {
        title: 'C++ containers and complexities',
        summary: 'Time complexities of the standard containers and algorithms, and what forces each one.',
        publishedOn: '2026-08-05',
        route: CPP_COMPLEXITY_ROUTE,
    },
];
