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
