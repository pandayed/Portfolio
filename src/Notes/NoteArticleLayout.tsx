import './NoteArticleLayout.css';

import type { ComponentProps } from 'react';

import ArticleLayout from '../Blogs/ArticleLayout/ArticleLayout';
import { PYTHON_NOTES_ROUTE, toHref } from '../routing/routes';
import { notePages, noteTree, type NoteGroup, type NoteNode, type NotePage } from './noteTreeData';
import NoteReadingTime from './NoteReadingTime';
import { getNodeReadingMinutes, getPageReadingMinutes, getPageWordCount } from './readingTime';

type NoteArticleLayoutProps = ComponentProps<typeof ArticleLayout>;

const findGroupForRoute = (nodes: NoteNode[], route: string): NoteGroup | undefined => {
    for (const node of nodes) {
        if (node.type !== 'group') continue;
        if (node.route === route) return node;
        const group = findGroupForRoute(node.children, route);
        if (group) return group;
    }
    return undefined;
};

const NoteControl = ({
    note,
    direction,
}: {
    note?: NotePage;
    direction: 'previous' | 'next';
}) => {
    const label = direction === 'previous' ? '← Previous' : 'Next →';
    const className = `NoteNavigation__control NoteNavigation__control--${direction}`;

    if (!note) {
        return (
            <button className={`${className} NoteNavigation__disabled`} disabled type="button">
                <span className="NoteNavigation__label">{label}</span>
            </button>
        );
    }

    return (
        <a href={toHref(note.route)} className={`Link Link--standalone ${className}`}>
            <span className="NoteNavigation__label">{label}</span>
            <span className="NoteNavigation__title">{note.title}</span>
        </a>
    );
};

const NoteArticleLayout = ({ route, children, ...props }: NoteArticleLayoutProps) => {
    const index = notePages.findIndex((note) => note.route === route);
    const group = findGroupForRoute(noteTree, route);

    return (
        <ArticleLayout
            {...props}
            route={route}
            headerMeta={(
                <div className="NoteReadingTime__metadata">
                    <NoteReadingTime minutes={getPageReadingMinutes(route)} wordCount={getPageWordCount(route)} />
                    {group && (
                        <span className="NoteReadingTime">
                            {route.startsWith(`${PYTHON_NOTES_ROUTE}/`) ? group.title : 'Subnotes'}:{' '}
                            <NoteReadingTime minutes={getNodeReadingMinutes(group)} total />
                        </span>
                    )}
                </div>
            )}
        >
            {children}
            {index >= 0 && (
                <nav className="NoteNavigation" aria-label="Previous and next notes">
                    <NoteControl note={notePages[index - 1]} direction="previous" />
                    <NoteControl note={notePages[index + 1]} direction="next" />
                </nav>
            )}
        </ArticleLayout>
    );
};

export default NoteArticleLayout;
