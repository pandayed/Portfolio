import {
    API_COMMUNICATION_ROUTE,
    MYSQL_GROUP_BY_ROUTE,
    MYSQL_NOTES_ROUTE,
    NOTES_ROUTE,
    SCALAR_IN_MYSQL_ROUTE,
    type Route,
} from '../routing/routes';

interface NoteBase {
    title: string;
    summary: string;
    route: Route;
}

export interface NotePage extends NoteBase {
    type: 'page';
    updatedOn: string;
}

export interface NoteGroup extends NoteBase {
    type: 'group';
    children: NoteNode[];
}

export type NoteNode = NotePage | NoteGroup;

export const mysqlNotes: NoteGroup = {
    type: 'group',
    title: 'MySQL',
    summary: 'Short notes about MySQL syntax, behaviour, and common terms.',
    route: MYSQL_NOTES_ROUTE,
    children: [
        {
            type: 'page',
            title: 'Scalar in MySQL',
            summary: 'A scalar is one value. A scalar subquery must return one value too.',
            route: SCALAR_IN_MYSQL_ROUTE,
            updatedOn: '2026-09-20',
        },
        {
            type: 'page',
            title: 'GROUP BY and non-aggregated columns',
            summary: 'What ONLY_FULL_GROUP_BY changes and why the result is otherwise unpredictable.',
            route: MYSQL_GROUP_BY_ROUTE,
            updatedOn: '2026-09-19',
        },
    ],
};

/* Groups can contain pages or more groups. Add another NoteGroup inside
   children when a subject needs another level. */
export const noteTree: NoteNode[] = [
    {
        type: 'page',
        title: 'The Anatomy of API Communication in a React Application',
        summary: 'Each layer exists for a specific reason, solves a specific problem, and has a clear boundary.',
        route: API_COMMUNICATION_ROUTE,
        updatedOn: '2026-09-20',
    },
    mysqlNotes,
];

const collectRoutes = (nodes: NoteNode[]): Route[] =>
    nodes.flatMap((node) => [
        node.route,
        ...(node.type === 'group' ? collectRoutes(node.children) : []),
    ]);

export const noteRoutes: Route[] = [NOTES_ROUTE, ...collectRoutes(noteTree)];
