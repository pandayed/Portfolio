import './ArticleLayout.css';
import './Article.css';
import '../../CommonClasses/CommonClasses.css';

import type { ReactNode } from 'react';

import Comments, { COMMENTS_ID } from '../../Comments/Comments';
import { BLOGS_ROUTE, toHref, type Route } from '../../routing/routes';
import TableOfContents from './TableOfContents';
import type { TocEntry } from './types';

interface ArticleLayoutProps {
    title: string;
    /* Keys the comment thread, so it must match the article's own route. */
    route: Route;
    sections: TocEntry[];
    children?: ReactNode;
}

const toId = (title: string) => `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-title`;

/* Shared shell for every article: title, back link, body, comments, and the
   table of contents in the right margin. Articles supply the body only. */
const ArticleLayout = ({ title, route, sections, children }: ArticleLayoutProps) => {
    const titleId = toId(title);
    const tocEntries: TocEntry[] = [...sections, { id: COMMENTS_ID, title: 'Comments' }];

    return (
        <article className="ArticleLayout" aria-labelledby={titleId}>
            <header className="ArticleLayout__header">
                <a
                    href={toHref(BLOGS_ROUTE)}
                    className="Link Link--standalone ArticleLayout__back"
                >
                    Back to blogs
                </a>
                <h1 id={titleId} className="PageTitle">
                    {title}
                </h1>
            </header>

            <TableOfContents sections={tocEntries} />

            <div className="ArticleLayout__body">
                {children}
                <Comments term={route} />
            </div>
        </article>
    );
};

export default ArticleLayout;
