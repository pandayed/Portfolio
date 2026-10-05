import {
    API_COMMUNICATION_ROUTE,
    DOCKER_BUILD_RUN_ROUTE,
    DOCKER_COMPOSE_ROUTE,
    DOCKER_CONTAINERS_ROUTE,
    DOCKER_NETWORK_STORAGE_ROUTE,
    DOCKER_NOTES_ROUTE,
    GO_NOTES_ROUTE,
    SYSTEM_DESIGN_ROUTE,
    JAVASCRIPT_ASYNC_ROUTE,
    JAVASCRIPT_EVENT_LOOP_ROUTE,
    JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE,
    KUBERNETES_CLUSTER_ROUTE,
    KUBERNETES_CONFIG_ROUTE,
    KUBERNETES_DEPLOY_ROUTE,
    KUBERNETES_NOTES_ROUTE,
    KUBERNETES_OPERATIONS_ROUTE,
    JAVA_NOTES_ROUTE,
    JAVA_PROGRAM_EXECUTION_ROUTE,
    POSTGRESQL_GROUP_BY_ROUTE,
    POSTGRESQL_JOINS_ROUTE,
    POSTGRESQL_NOTES_ROUTE,
    POSTGRESQL_MATHS_ROUTE,
    POSTGRESQL_DATE_TIME_ROUTE,
    POSTGRESQL_INDEXING_ROUTE,
    POSTGRESQL_QUERY_ANALYSIS_ROUTE,
    POSTGRESQL_ONE_SHOT_SQL_ROUTE,
    POSTGRESQL_RATIOS_ROUTE,
    POSTGRESQL_WINDOW_FUNCTIONS_ROUTE,
    NOTES_ROUTE,
    PYTHON_NOTES_ROUTE,
    REACT_NOTES_ROUTE,
    PROGRAMMING_DICTIONARY_ROUTE,
    SCALAR_IN_POSTGRESQL_ROUTE,
    SPRING_BOOT_NOTES_ROUTE,
    SPRING_BOOT_FIRST_APPLICATION_ROUTE,
    SPRING_BOOT_ANNOTATIONS_ROUTE,
    type JavaNoteRoute,
    type GoNoteRoute,
    type JavaScriptTypeScriptNoteRoute,
    type PythonNoteRoute,
    type ReactNoteRoute,
    type SystemDesignEntryRoute,
    type Route,
} from '../routing/routes';
import { javaChapters } from './JavaNotes/javaNotes';
import { goChapters } from './GoNotes/goNotes';
import { javascriptTypeScriptChapters } from './JavaScriptTypeScriptNotes/javascriptTypeScriptNotes';
import { pythonChapters } from './PythonNotes/pythonNotes';
import { reactChapters } from './ReactNotes/reactNotes';
import {
    systemDesignPagesById,
    systemDesignPagesByRoute,
    systemDesignRootPages,
    systemDesignViewsByParentId,
    type SystemDesignPageData,
    type SystemDesignViewData,
} from './SystemDesign/registry';

interface NoteBase {
    title: string;
    icon?: string;
    summary?: string;
    route: Route;
}

export interface NotePage extends NoteBase {
    type: 'page';
    updatedOn?: string;
}

export interface NoteGroup extends NoteBase {
    type: 'group';
    children: NoteNode[];
}

export type NoteNode = NotePage | NoteGroup;

export const postgresqlNotes: NoteGroup = {
    type: 'group',
    title: 'PostgreSQL',
    summary: 'Notes about PostgreSQL syntax, query results, indexing, and execution plans.',
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
            updatedOn: '2026-10-02',
        },
        {
            type: 'page',
            title: 'Ratios in PostgreSQL',
            summary: 'Count matching rows with FILTER and calculate ratios and percentages.',
            route: POSTGRESQL_RATIOS_ROUTE,
            updatedOn: '2026-09-30',
        },
        {
            type: 'page',
            title: 'Window functions in PostgreSQL',
            summary: 'Keep each row while ranking, comparing, and calculating totals across related rows.',
            route: POSTGRESQL_WINDOW_FUNCTIONS_ROUTE,
            updatedOn: '2026-10-02',
        },
        {
            type: 'page',
            title: 'Maths in PostgreSQL',
            summary: 'Arithmetic operators, MOD, rounding, SUM, AVG, and other numeric functions.',
            route: POSTGRESQL_MATHS_ROUTE,
            updatedOn: '2026-09-30',
        },
        {
            type: 'page',
            title: 'Date and time in PostgreSQL',
            summary: 'Types, arithmetic, ranges, time zones, formatting, and common date query patterns.',
            route: POSTGRESQL_DATE_TIME_ROUTE,
            updatedOn: '2026-10-02',
        },
        {
            type: 'page',
            title: 'Indexing in PostgreSQL',
            summary: 'Index types, column order, partial and expression indexes, covering indexes, and write costs.',
            route: POSTGRESQL_INDEXING_ROUTE,
            updatedOn: '2026-10-03',
        },
        {
            type: 'page',
            title: 'Query analysis in PostgreSQL',
            summary: 'Read EXPLAIN plans, compare estimates with actual rows, inspect buffers, and measure changes.',
            route: POSTGRESQL_QUERY_ANALYSIS_ROUTE,
            updatedOn: '2026-10-03',
        },
    ],
};

export const goNotes: NoteGroup = {
    type: 'group',
    title: 'Go',
    summary: 'Go fundamentals, program structure, concurrency, and revision questions.',
    route: GO_NOTES_ROUTE,
    children: goChapters.map((chapter) => ({
        type: 'group',
        title: chapter.title,
        summary: chapter.summary,
        route: `${GO_NOTES_ROUTE}/${chapter.notes[0].slug}` as GoNoteRoute,
        children: chapter.notes.map(({ slug, title, updatedOn }) => ({
            type: 'page',
            title,
            route: `${GO_NOTES_ROUTE}/${slug}` as GoNoteRoute,
            updatedOn,
        })),
    })),
};

const systemDesignViewNode = (view: SystemDesignViewData): NoteNode[] => {
    const children = view.pageIds.map((id) => {
        const page = systemDesignPagesById.get(id);
        if (!page) throw new Error(`Missing System Design note: ${id}`);
        return systemDesignPageNode(page);
    });
    return view.title ? [{ type: 'group', title: view.title, route: view.route, children }] : children;
};

const systemDesignPageNode = (page: SystemDesignPageData): NoteNode => {
    const views = systemDesignViewsByParentId.get(page.id) ?? [];
    const children = views.flatMap(systemDesignViewNode);
    if (children.length) {
        return { type: 'group', title: page.title, icon: page.icon, summary: page.status || undefined, route: page.route, children };
    }
    return {
        type: 'page',
        title: page.title,
        icon: page.icon,
        summary: page.status || undefined,
        route: page.route,
    };
};

export const systemDesignNotes: NoteGroup = {
    type: 'group',
    title: 'System Design',
    route: SYSTEM_DESIGN_ROUTE,
    children: systemDesignRootPages.map(systemDesignPageNode),
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

const asynchronousJavaScriptPages: NotePage[] = [
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
        summary: 'Promises, async and await, concurrency, cancellation, errors, and production patterns.',
        route: JAVASCRIPT_ASYNC_ROUTE,
        updatedOn: '2026-09-21',
    },
];

export const javascriptTypeScriptNotes: NoteGroup = {
    type: 'group',
    title: 'JavaScript and TypeScript',
    summary: 'Shared JavaScript runtime concepts, TypeScript checks, and TypeScript-only type-system topics.',
    route: JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE,
    children: javascriptTypeScriptChapters.map((chapter) => ({
        type: 'group',
        title: chapter.title,
        summary: chapter.summary,
        route: `${JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE}/${chapter.notes[0].slug}` as JavaScriptTypeScriptNoteRoute,
        children: [
            ...chapter.notes.map(({ slug, title, summary, updatedOn }) => ({
                type: 'page' as const,
                title,
                summary,
                route: `${JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE}/${slug}` as JavaScriptTypeScriptNoteRoute,
                updatedOn,
            })),
            ...(chapter.id === 'browser-and-async' ? asynchronousJavaScriptPages : []),
        ],
    })),
};

export const reactNotes: NoteGroup = {
    type: 'group',
    title: 'React',
    summary: 'Components, rendering, state, Effects, application state, data, and performance.',
    route: REACT_NOTES_ROUTE,
    children: reactChapters.map((chapter) => ({
        type: 'group',
        title: chapter.title,
        summary: chapter.summary,
        route: `${REACT_NOTES_ROUTE}/${chapter.notes[0].slug}` as ReactNoteRoute,
        children: chapter.notes.map(({ slug, title, summary, updatedOn }) => ({
            type: 'page',
            title,
            summary,
            route: `${REACT_NOTES_ROUTE}/${slug}` as ReactNoteRoute,
            updatedOn,
        })),
    })),
};

export const javaNotes: NoteGroup = {
    type: 'group',
    title: 'Java',
    summary: 'Language basics, objects, generics, collections, streams, exceptions, files, and concurrency.',
    route: JAVA_NOTES_ROUTE,
    children: [
        {
            type: 'page',
            title: 'Java source, compilation, and the JVM',
            summary: 'Follow a Java source file from javac to a running program.',
            route: JAVA_PROGRAM_EXECUTION_ROUTE,
            updatedOn: '2026-09-30',
        },
        ...javaChapters.map((chapter): NoteGroup => ({
            type: 'group',
            title: chapter.title,
            summary: chapter.summary,
            route: `${JAVA_NOTES_ROUTE}/${chapter.notes[0].slug}` as JavaNoteRoute,
            children: chapter.notes.map(({ slug, title, summary, updatedOn }) => ({
                type: 'page',
                title,
                summary,
                route: `${JAVA_NOTES_ROUTE}/${slug}` as JavaNoteRoute,
                updatedOn,
            })),
        })),
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
        {
            type: 'page',
            title: 'Common annotations at a glance',
            summary: 'Find common Spring Boot, Spring MVC, validation, and persistence annotations.',
            route: SPRING_BOOT_ANNOTATIONS_ROUTE,
            updatedOn: '2026-10-01',
        },
    ],
};

export const dockerNotes: NoteGroup = {
    type: 'group',
    title: 'Docker',
    summary: 'Build images, run containers, connect services, and manage local application stacks.',
    route: DOCKER_NOTES_ROUTE,
    children: [
        {
            type: 'page',
            title: 'Containers, images, and registries',
            summary: 'Understand the package, the running process, image layers, tags, and registries.',
            route: DOCKER_CONTAINERS_ROUTE,
            updatedOn: '2026-10-03',
        },
        {
            type: 'page',
            title: 'Build and run an image',
            summary: 'Write a Dockerfile, control the build context, build an image, and run it safely.',
            route: DOCKER_BUILD_RUN_ROUTE,
            updatedOn: '2026-10-03',
        },
        {
            type: 'page',
            title: 'Ports, networks, and storage',
            summary: 'Publish ports, connect containers, and choose between volumes and bind mounts.',
            route: DOCKER_NETWORK_STORAGE_ROUTE,
            updatedOn: '2026-10-03',
        },
        {
            type: 'page',
            title: 'Docker Compose and daily workflow',
            summary: 'Define a multi-container application and use the main inspect, log, and cleanup commands.',
            route: DOCKER_COMPOSE_ROUTE,
            updatedOn: '2026-10-03',
        },
    ],
};

export const kubernetesNotes: NoteGroup = {
    type: 'group',
    title: 'Kubernetes',
    summary: 'Run containerized applications through declarative objects and controller-managed desired state.',
    route: KUBERNETES_NOTES_ROUTE,
    children: [
        {
            type: 'page',
            title: 'Clusters, nodes, Pods, and controllers',
            summary: 'Understand the control plane, worker nodes, Pods, scheduling, and reconciliation.',
            route: KUBERNETES_CLUSTER_ROUTE,
            updatedOn: '2026-10-03',
        },
        {
            type: 'page',
            title: 'Deployments and Services',
            summary: 'Deploy an application, replace Pods safely, and expose them through a stable endpoint.',
            route: KUBERNETES_DEPLOY_ROUTE,
            updatedOn: '2026-10-03',
        },
        {
            type: 'page',
            title: 'Configuration and storage',
            summary: 'Use ConfigMaps, Secrets, volumes, and PersistentVolumeClaims with clear ownership.',
            route: KUBERNETES_CONFIG_ROUTE,
            updatedOn: '2026-10-03',
        },
        {
            type: 'page',
            title: 'Health, resources, rollouts, and debugging',
            summary: 'Add probes and resource settings, inspect rollouts, and trace common failures.',
            route: KUBERNETES_OPERATIONS_ROUTE,
            updatedOn: '2026-10-03',
        },
    ],
};

/* Groups can contain pages or more groups. Add another NoteGroup inside
   children when a subject needs another level. */
export const noteTree: NoteNode[] = [
    {
        type: 'page',
        title: 'Programming dictionary',
        summary: 'Shared definitions of common programming terms, with language-specific terms clearly marked.',
        route: PROGRAMMING_DICTIONARY_ROUTE,
        updatedOn: '2026-10-02',
    },
    {
        type: 'page',
        title: 'The Anatomy of API Communication in a React Application',
        summary: 'Each layer exists for a specific reason, solves a specific problem, and has a clear boundary.',
        route: API_COMMUNICATION_ROUTE,
        updatedOn: '2026-09-20',
    },
    javascriptTypeScriptNotes,
    reactNotes,
    dockerNotes,
    kubernetesNotes,
    postgresqlNotes,
    systemDesignNotes,
    goNotes,
    pythonNotes,
    javaNotes,
    springBootNotes,
];

const collectPages = (nodes: NoteNode[]): NotePage[] =>
    nodes.flatMap((node) => {
        if (node.type === 'page') return [node];
        const page = node.route.startsWith(`${SYSTEM_DESIGN_ROUTE}/`)
            && systemDesignPagesByRoute.has(node.route as SystemDesignEntryRoute)
            ? [{ type: 'page' as const, title: node.title, route: node.route, summary: node.summary }]
            : [];
        return [...page, ...collectPages(node.children)];
    });

export const notePages = collectPages(noteTree);

const collectRoutes = (nodes: NoteNode[]): Route[] =>
    nodes.flatMap((node) => [
        node.route,
        ...(node.type === 'group' ? collectRoutes(node.children) : []),
    ]);

export const noteRoutes: Route[] = [NOTES_ROUTE, ...collectRoutes(noteTree)];
