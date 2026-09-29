import './NoteArticleLayout.css';

import type { ComponentProps } from 'react';

import ArticleLayout from '../Blogs/ArticleLayout/ArticleLayout';
import { toHref } from '../routing/routes';
import { notePages, type NotePage } from './noteTreeData';

type NoteArticleLayoutProps = ComponentProps<typeof ArticleLayout>;

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

    return (
        <ArticleLayout {...props} route={route}>
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
