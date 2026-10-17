import {
    MCP_SERVERS_ROUTE,
    API_COMMUNICATION_ROUTE,
    AWS_SERVICES_ROUTE,
    CICD_NOTES_ROUTE,
    CICD_BASICS_ROUTE,
    GITHUB_ACTIONS_ROUTE,
    JENKINS_ROUTE,
    GITLAB_CICD_ROUTE,
    ARGO_CD_ROUTE,
    DBMS_NOTES_ROUTE,
    DOCKER_BUILD_RUN_ROUTE,
    DOCKER_COMPOSE_ROUTE,
    DOCKER_COMMANDS_ROUTE,
    DOCKER_INSTRUCTIONS_ROUTE,
    DOCKER_CONTAINERS_ROUTE,
    DOCKER_NETWORK_STORAGE_ROUTE,
    DOCKER_NOTES_ROUTE,
    GO_NOTES_ROUTE,
    FRONTEND_NOTES_ROUTE,
    SYSTEM_DESIGN_ROUTE,
    getJavaScriptTypeScriptNoteRoute,
    JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE,
    KUBERNETES_CLUSTER_ROUTE,
    KUBERNETES_CONFIG_ROUTE,
    KUBERNETES_DEPLOY_ROUTE,
    KUBERNETES_NOTES_ROUTE,
    KUBERNETES_OPERATIONS_ROUTE,
    KUBERNETES_COMMANDS_ROUTE,
    JAVA_NOTES_ROUTE,
    JAVA_PROGRAM_EXECUTION_ROUTE,
    POSTGRESQL_GROUP_BY_ROUTE,
    POSTGRESQL_JOINS_ROUTE,
    POSTGRESQL_NOTES_ROUTE,
    POSTGRESQL_MATHS_ROUTE,
    POSTGRESQL_STRINGS_ROUTE,
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
    POSTGRESQL_QUERY_RESULTS_ROUTE,
    SPRING_BOOT_NOTES_ROUTE,
    SPRING_BOOT_FIRST_APPLICATION_ROUTE,
    SPRING_BOOT_ANNOTATIONS_ROUTE,
    type JavaNoteRoute,
    type DBMSNoteRoute,
    type GoNoteRoute,
    type PythonNoteRoute,
    type ReactNoteRoute,
    type SpringBootRoute,
    type SystemDesignEntryRoute,
    type Route,
} from '../routing/routes';
import { javaChapters } from './JavaNotes/javaNotes';
import { dbmsChapters } from './DBMSNotes/dbmsNotes';
import { goChapters } from './GoNotes/goNotes';
import { javascriptTypeScriptChapters } from './JavaScriptTypeScriptNotes/javascriptTypeScriptNotes';
import { pythonChapters } from './PythonNotes/pythonNotes';
import { reactChapters } from './ReactNotes/reactNotes';
import { springBootChapters, springBootPagesByRoute } from './SpringBootNotes/registry';
import type { SpringBootOutlineNode } from './SpringBootNotes/types';
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

export const dbmsNotes: NoteGroup = {
    type: 'group',
    title: 'DBMS',
    summary: 'Database models, SQL, normalisation, transactions, indexes, and distributed databases.',
    route: DBMS_NOTES_ROUTE,
    children: dbmsChapters.map((chapter) => ({
        type: 'group',
        title: chapter.title,
        summary: chapter.summary,
        route: `${DBMS_NOTES_ROUTE}/${chapter.notes[0].slug}` as DBMSNoteRoute,
        children: chapter.notes.map(({ slug, title, summary, updatedOn }) => ({
            type: 'page' as const,
            title,
            summary,
            route: `${DBMS_NOTES_ROUTE}/${slug}` as DBMSNoteRoute,
            updatedOn,
        })),
    })),
};

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
            title: 'Query results: values and relations',
            summary: 'Understand SELECT results, CTE relations, FROM, aggregates, and scalar subqueries.',
            route: POSTGRESQL_QUERY_RESULTS_ROUTE,
            updatedOn: '2026-10-10',
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
            title: 'String functions and operations in PostgreSQL',
            summary: 'Join, extract, clean, split, format, and match text, with NULL handling and STRING_AGG.',
            route: POSTGRESQL_STRINGS_ROUTE,
            updatedOn: '2026-10-08',
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

const bareMetalsPage = systemDesignPagesById.get('33124eb1ed5480498f70e7010ffc7c92');
if (!bareMetalsPage) throw new Error('Missing Bare Metals, Virtual Machines & Containers note');

export const systemDesignNotes: NoteGroup = {
    type: 'group',
    title: 'System Design',
    route: SYSTEM_DESIGN_ROUTE,
    children: systemDesignRootPages
        .filter((page) => page.id !== bareMetalsPage.id)
        .map(systemDesignPageNode),
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

export const javascriptTypeScriptNotes: NoteGroup = {
    type: 'group',
    title: 'JavaScript and TypeScript',
    summary: 'Learn JavaScript in order, then add TypeScript checking and reusable types.',
    route: JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE,
    children: javascriptTypeScriptChapters.map((chapter) => ({
        type: 'group',
        title: chapter.title,
        summary: chapter.summary,
        route: getJavaScriptTypeScriptNoteRoute(chapter.notes[0].slug),
        children: chapter.notes.map(({ slug, title, summary, updatedOn }) => ({
            type: 'page',
            title,
            summary,
            route: getJavaScriptTypeScriptNoteRoute(slug),
            updatedOn,
        })),
    })),
};

export const reactNotes: NoteGroup = {
    type: 'group',
    title: 'React',
    summary: 'Components, rendering, state, Effects, application state, data, and performance.',
    route: REACT_NOTES_ROUTE,
    children: [
        ...reactChapters.map((chapter): NoteGroup => ({
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
        {
            type: 'page',
            title: 'The Anatomy of API Communication in a React Application',
            summary: 'Each layer exists for a specific reason, solves a specific problem, and has a clear boundary.',
            route: API_COMMUNICATION_ROUTE,
            updatedOn: '2026-09-20',
        },
    ],
};

export const javaNotes: NoteGroup = {
    type: 'group',
    title: 'Java',
    summary: 'Program execution, variables, objects, exceptions, generics, collections, streams, files, and threads.',
    route: JAVA_NOTES_ROUTE,
    children: [
        {
            type: 'page',
            title: 'Java source, compilation, and the JVM',
            summary: 'Follow a Java source file from javac to a running program.',
            route: JAVA_PROGRAM_EXECUTION_ROUTE,
            updatedOn: '2026-10-13',
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

const springBootIntroPages: NotePage[] = [
    {
        type: 'page',
        title: 'A first Spring Boot application',
        summary: 'Create and run a web project, then map an HTTP request.',
        route: SPRING_BOOT_FIRST_APPLICATION_ROUTE,
        updatedOn: '2026-10-14',
    },
    {
        type: 'page',
        title: 'Annotations at a glance',
        summary: 'Read annotations in learning order and open their detailed lessons.',
        route: SPRING_BOOT_ANNOTATIONS_ROUTE,
        updatedOn: '2026-10-14',
    },
];

const springBootOutline = (node: SpringBootOutlineNode): NoteNode => {
    const route = `/notes/spring-boot/${node.slug}` as SpringBootRoute;
    const page = springBootPagesByRoute.get(route);
    const intro = springBootIntroPages.find((item) => item.route === route);
    if (node.children) return {
        type: 'group',
        title: node.title ?? page?.title ?? '',
        summary: page?.summary,
        route,
        children: node.children.map(springBootOutline),
    };
    if (intro) return intro;
    return {
        type: 'page',
        title: page?.title ?? '',
        summary: page?.summary,
        route,
        updatedOn: page?.updatedOn,
    };
};

export const springBootNotes: NoteGroup = {
    type: 'group',
    title: 'Spring Boot',
    summary: 'Application startup, REST APIs, data access, security, testing, integrations, and deployment.',
    route: SPRING_BOOT_NOTES_ROUTE,
    children: [
        ...springBootChapters.map((chapter): NoteGroup => ({
            type: 'group',
            title: chapter.title,
            summary: chapter.summary,
            route: `/notes/spring-boot/${chapter.children[0].slug}` as SpringBootRoute,
            children: chapter.children.map(springBootOutline),
        })),
    ],
};

export const dockerNotes: NoteGroup = {
    type: 'group',
    title: 'Docker',
    summary: 'Containers and images lead into networking, storage, and Compose configuration.',
    route: DOCKER_NOTES_ROUTE,
    children: [
        {
            type: 'page',
            title: '1. Containers, images, and registries',
            route: DOCKER_CONTAINERS_ROUTE,
            updatedOn: '2026-10-16',
        },
        {
            type: 'page',
            title: '2. Building and updating Docker images',
            route: DOCKER_BUILD_RUN_ROUTE,
            updatedOn: '2026-10-16',
        },
        {
            type: 'page',
            title: '3. Container networks and storage',
            route: DOCKER_NETWORK_STORAGE_ROUTE,
            updatedOn: '2026-10-16',
        },
        {
            type: 'page',
            title: '4. Project configuration with Docker Compose',
            route: DOCKER_COMPOSE_ROUTE,
            updatedOn: '2026-10-16',
        },
        {
            type: 'page',
            title: 'Docker commands',
            route: DOCKER_COMMANDS_ROUTE,
            updatedOn: '2026-10-17',
        },
        {
            type: 'page',
            title: 'Dockerfile instructions',
            route: DOCKER_INSTRUCTIONS_ROUTE,
            updatedOn: '2026-10-17',
        },
    ],
};

export const kubernetesNotes: NoteGroup = {
    type: 'group',
    title: 'Kubernetes',
    summary: 'A local cluster connects application deployment, configuration, storage, and operation.',
    route: KUBERNETES_NOTES_ROUTE,
    children: [
        {
            type: 'page',
            title: '1. From containers to a Kubernetes cluster',
            summary: 'The control plane, nodes, Pods, and controllers turn desired state into running containers.',
            route: KUBERNETES_CLUSTER_ROUTE,
            updatedOn: '2026-10-16',
        },
        {
            type: 'page',
            title: '2. Deployments, Services, and local access',
            summary: 'A Deployment manages website Pods; a Service provides a stable endpoint for them.',
            route: KUBERNETES_DEPLOY_ROUTE,
            updatedOn: '2026-10-16',
        },
        {
            type: 'page',
            title: '3. Configuration and storage lifetimes',
            summary: 'ConfigMaps supply website content; Secrets and persistent storage serve separate needs.',
            route: KUBERNETES_CONFIG_ROUTE,
            updatedOn: '2026-10-16',
        },
        {
            type: 'page',
            title: '4. Website health, updates, and troubleshooting',
            summary: 'Probes, resource settings, rollouts, and diagnostic evidence describe workload behavior.',
            route: KUBERNETES_OPERATIONS_ROUTE,
            updatedOn: '2026-10-16',
        },
        {
            type: 'page',
            title: 'Kubernetes commands',
            route: KUBERNETES_COMMANDS_ROUTE,
            updatedOn: '2026-10-17',
        },
    ],
};

export const cicdNotes: NoteGroup = {
    type: 'group',
    title: 'CI/CD',
    summary: 'Release fundamentals and one practical page each for GitHub Actions, Jenkins, GitLab CI/CD, and Argo CD.',
    route: CICD_NOTES_ROUTE,
    children: [
        {
            type: 'page',
            title: 'CI/CD fundamentals',
            summary: 'Integration, delivery, deployment, pipelines, artifacts, release controls, and rollback.',
            route: CICD_BASICS_ROUTE,
            updatedOn: '2026-10-10',
        },
        {
            type: 'page',
            title: 'GitHub Actions',
            summary: 'Events, workflows, jobs, runners, a Node build, permissions, and logs.',
            route: GITHUB_ACTIONS_ROUTE,
            updatedOn: '2026-10-10',
        },
        {
            type: 'page',
            title: 'Jenkins',
            summary: 'Controllers, agents, Jenkinsfiles, stages, credentials, and build results.',
            route: JENKINS_ROUTE,
            updatedOn: '2026-10-10',
        },
        {
            type: 'page',
            title: 'GitLab CI/CD',
            summary: 'Runners, YAML jobs, rules, artifact handoff, manual releases, and variables.',
            route: GITLAB_CICD_ROUTE,
            updatedOn: '2026-10-10',
        },
        {
            type: 'page',
            title: 'Argo CD',
            summary: 'GitOps delivery, Applications, sync policies, health, and recovery.',
            route: ARGO_CD_ROUTE,
            updatedOn: '2026-10-10',
        },
        systemDesignPageNode(bareMetalsPage),
        dockerNotes,
        kubernetesNotes,
    ],
};

export const frontendNotes: NoteGroup = {
    type: 'group',
    title: 'Frontend',
    route: FRONTEND_NOTES_ROUTE,
    children: [
        javascriptTypeScriptNotes,
        reactNotes,
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
        title: 'MCP servers',
        summary: 'Server components, LLM tool flow, information visibility, permissions, and credential management.',
        route: MCP_SERVERS_ROUTE,
        updatedOn: '2026-10-15',
    },
    frontendNotes,
    cicdNotes,
    {
        type: 'page',
        title: 'AWS services',
        summary: 'S3, EC2, IAM, Lambda, databases, queues, containers, analytics, and AI. Three introductory points per service.',
        route: AWS_SERVICES_ROUTE,
        updatedOn: '2026-10-05',
    },
    dbmsNotes,
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
