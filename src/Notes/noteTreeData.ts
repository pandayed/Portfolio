import {
    API_COMMUNICATION_ROUTE,
    GO_NOTES_ROUTE,
    JAVASCRIPT_ASYNC_ROUTE,
    JAVASCRIPT_EVENT_LOOP_ROUTE,
    JAVA_NOTES_ROUTE,
    JAVA_PROGRAM_EXECUTION_ROUTE,
    POSTGRESQL_GROUP_BY_ROUTE,
    POSTGRESQL_JOINS_ROUTE,
    POSTGRESQL_NOTES_ROUTE,
    POSTGRESQL_ONE_SHOT_SQL_ROUTE,
    POSTGRESQL_RATIOS_ROUTE,
    NOTES_ROUTE,
    PYTHON_NOTES_ROUTE,
    SCALAR_IN_POSTGRESQL_ROUTE,
    SPRING_BOOT_NOTES_ROUTE,
    SPRING_BOOT_FIRST_APPLICATION_ROUTE,
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

export const postgresqlNotes: NoteGroup = {
    type: 'group',
    title: 'PostgreSQL',
    summary: 'Short notes about PostgreSQL syntax, behaviour, and common terms.',
    route: POSTGRESQL_NOTES_ROUTE,
    children: [
        {
            type: 'page',
            title: 'PostgreSQL One Shot SQL',
            summary: 'Working notes about PostgreSQL edge cases, query order, expressions, and result shapes.',
            route: POSTGRESQL_ONE_SHOT_SQL_ROUTE,
            updatedOn: '2026-09-28',
        },
        {
            type: 'page',
            title: 'Joins in PostgreSQL',
            summary: 'Join types, matching rows, NULLs, filtering, and common join patterns.',
            route: POSTGRESQL_JOINS_ROUTE,
            updatedOn: '2026-09-28',
        },
        {
            type: 'page',
            title: 'Scalar in PostgreSQL',
            summary: 'A scalar is one value. A scalar subquery returns one column and at most one row.',
            route: SCALAR_IN_POSTGRESQL_ROUTE,
            updatedOn: '2026-09-28',
        },
        {
            type: 'page',
            title: 'GROUP BY in PostgreSQL',
            summary: 'Grouping by one or more columns, aggregates, filters, NULL values, and subtotal groups.',
            route: POSTGRESQL_GROUP_BY_ROUTE,
            updatedOn: '2026-09-29',
        },
        {
            type: 'page',
            title: 'Ratios in PostgreSQL',
            summary: 'Count matching rows with FILTER and calculate ratios and percentages.',
            route: POSTGRESQL_RATIOS_ROUTE,
            updatedOn: '2026-09-30',
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

export const javaNotes: NoteGroup = {
    type: 'group',
    title: 'Java',
    summary: 'Java fundamentals, starting with source files, compilation, and the JVM.',
    route: JAVA_NOTES_ROUTE,
    children: [
        {
            type: 'page',
            title: 'Java source, compilation, and the JVM',
            summary: 'Follow a Java source file from javac to a running program.',
            route: JAVA_PROGRAM_EXECUTION_ROUTE,
            updatedOn: '2026-09-30',
        },
    ],
};

export const springBootNotes: NoteGroup = {
    type: 'group',
    title: 'Spring Boot',
    summary: 'Build on Java fundamentals to understand application startup and HTTP endpoints.',
    route: SPRING_BOOT_NOTES_ROUTE,
    children: [
        {
            type: 'page',
            title: 'A first Spring Boot web application',
            summary: 'See how Spring Boot starts an application and maps an HTTP request.',
            route: SPRING_BOOT_FIRST_APPLICATION_ROUTE,
            updatedOn: '2026-09-30',
        },
    ],
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
    postgresqlNotes,
    goNotes,
    pythonNotes,
    javaNotes,
    springBootNotes,
];

const collectPages = (nodes: NoteNode[]): NotePage[] =>
    nodes.flatMap((node) =>
        node.type === 'page' ? [node] : collectPages(node.children),
    );

export const notePages = collectPages(noteTree);

const collectRoutes = (nodes: NoteNode[]): Route[] =>
    nodes.flatMap((node) => [
        node.route,
        ...(node.type === 'group' ? collectRoutes(node.children) : []),
    ]);

export const noteRoutes: Route[] = [NOTES_ROUTE, ...collectRoutes(noteTree)];
