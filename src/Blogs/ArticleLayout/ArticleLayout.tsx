import './ArticleLayout.css';
import '../../CommonClasses/CommonClasses.css';

import type { ReactNode } from 'react';

import { BLOGS_ROUTE, toHref } from '../../routing/routes';
import TableOfContents from './TableOfContents';
import type { TocEntry } from './types';

interface ArticleLayoutProps {
    title: string;
    sections: TocEntry[];
    children?: ReactNode;
}

const toId = (title: string) => `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-title`;

/* Shared shell for every article: title, back link, body, and the table of
   contents in the right margin. Articles supply the body only. */
const ArticleLayout = ({ title, sections, children }: ArticleLayoutProps) => {
    const titleId = toId(title);

    return (
        <article className="ArticleLayout" aria-labelledby={titleId}>
            <header className="ArticleLayout__header">
                <a href={toHref(BLOGS_ROUTE)} className="UnderlinedLink ArticleLayout__back">
                    Back to blogs
                </a>
                <h1 id={titleId} className="ArticleLayout__title">
                    {title}
                </h1>
            </header>

            <TableOfContents sections={sections} />

            <div className="ArticleLayout__body">{children}</div>
        </article>
    );
};

export default ArticleLayout;
