import { INSTEAD_PRIVACY_POLICY_ROUTE, toHref } from '../routing/routes';

export interface ProjectLink {
    title: string;
    href: string;
    /* External links leave the site, so they open in a new tab. */
    external?: boolean;
}

export interface Project {
    name: string;
    /* One line on what the project does. */
    summary: string;
    /* What it is built with, shown as a plain list. */
    stack: string[];
    links: ProjectLink[];
}

const entries: Project[] = [
    {
        name: 'Nerdboard',
        summary:
            'Virtual guitar, piano, drums, synthesizer, and harmonium played in the browser with a physical keyboard.',
        stack: ['React', 'TypeScript', 'Vite', 'Web Audio API'],
        links: [
            {
                title: 'Try it',
                href: 'https://nerdboard.lalpandey.com/',
                external: true,
            },
            {
                title: 'Source',
                href: 'https://github.com/pandayed/open-music',
                external: true,
            },
        ],
    },
    {
        name: 'Redis Server in Go',
        summary:
            'An in-memory Redis server built in Go, with RESP support for strings, lists, sets, and hashes.',
        stack: ['Go', 'TCP', 'RESP'],
        links: [
            {
                title: 'Source',
                href: 'https://github.com/pandayed/redis-server-go',
                external: true,
            },
        ],
    },
    {
        name: 'Instead',
        summary:
            'A Chrome extension that tracks how long you spend on each site, and converts that time into things you could have done instead.',
        stack: ['Chrome Extension MV3', 'TypeScript', 'React', 'Vite'],
        links: [
            {
                title: 'Source',
                href: 'https://github.com/pandayed/instead',
                external: true,
            },
            {
                title: 'Privacy policy',
                href: toHref(INSTEAD_PRIVACY_POLICY_ROUTE),
            },
        ],
    },
];

export const projects: Project[] = entries;
