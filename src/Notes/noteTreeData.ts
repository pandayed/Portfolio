import {
    API_COMMUNICATION_ROUTE,
    GO_NOTES_ROUTE,
    JAVASCRIPT_ASYNC_ROUTE,
    JAVASCRIPT_EVENT_LOOP_ROUTE,
    MYSQL_GROUP_BY_ROUTE,
    MYSQL_NOTES_ROUTE,
    ONE_SHOT_SQL_ROUTE,
    NOTES_ROUTE,
    PYTHON_NOTES_ROUTE,
    SCALAR_IN_MYSQL_ROUTE,
    type GoNoteRoute,
    type PythonNoteRoute,
    type Route,
} from '../routing/routes';
import { goNotes as goNotePages } from './GoNotes/goNotes';
import { pythonChapters } from './PythonNotes/pythonNotes';

interface NoteBase {
    title: string;
    summary?: string;
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
            title: 'One Shot SQL',
            summary: 'Working notes about SQL edge cases, query order, expressions, and result shapes.',
            route: ONE_SHOT_SQL_ROUTE,
            updatedOn: '2026-09-24',
        },
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

export const goNotes: NoteGroup = {
    type: 'group',
    title: 'Go',
    route: GO_NOTES_ROUTE,
    children: goNotePages.map(({ slug, title, updatedOn }) => ({
        type: 'page',
        title,
        route: `${GO_NOTES_ROUTE}/${slug}` as GoNoteRoute,
        updatedOn,
    })),
};

export const pythonNotes: NoteGroup = {
    type: 'group',
    title: 'Python',
    summary: 'Short Python notes based on examples, edge cases, and common mistakes.',
    route: PYTHON_NOTES_ROUTE,
    children: pythonChapters.map((chapter) => ({
        type: 'group',
        title: chapter.title,
        summary: chapter.summary,
        route: `${PYTHON_NOTES_ROUTE}/${chapter.notes[0].slug}` as PythonNoteRoute,
        children: chapter.notes.map(({ slug, title, summary, updatedOn }) => ({
            type: 'page',
            title,
            summary,
            route: `${PYTHON_NOTES_ROUTE}/${slug}` as PythonNoteRoute,
            updatedOn,
        })),
    })),
};

/* Groups can contain pages or more groups. Add another NoteGroup inside
   children when a subject needs another level. */
export const noteTree: NoteNode[] = [
    {
        type: 'page',
        title: 'JavaScript Event Loop and Task Queues',
        summary: 'Microtasks, tasks, Promises, timers, browser scheduling, and the Node.js event loop.',
        route: JAVASCRIPT_EVENT_LOOP_ROUTE,
        updatedOn: '2026-09-21',
    },
    {
        type: 'page',
        title: 'Asynchronous Programming in JavaScript',
        summary: 'The event loop, Promises, async and await, concurrency, cancellation, errors, and common production patterns.',
        route: JAVASCRIPT_ASYNC_ROUTE,
        updatedOn: '2026-09-21',
    },
    {
        type: 'page',
        title: 'The Anatomy of API Communication in a React Application',
        summary: 'Each layer exists for a specific reason, solves a specific problem, and has a clear boundary.',
        route: API_COMMUNICATION_ROUTE,
        updatedOn: '2026-09-20',
    },
    mysqlNotes,
    goNotes,
    pythonNotes,
];

const collectRoutes = (nodes: NoteNode[]): Route[] =>
    nodes.flatMap((node) => [
        node.route,
        ...(node.type === 'group' ? collectRoutes(node.children) : []),
    ]);

export const noteRoutes: Route[] = [NOTES_ROUTE, ...collectRoutes(noteTree)];
