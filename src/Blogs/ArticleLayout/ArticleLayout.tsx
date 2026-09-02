import './ArticleLayout.css';
import './Article.css';
import '../../CommonClasses/CommonClasses.css';

import type { ReactNode } from 'react';

import Comments, { COMMENTS_ID } from '../../Comments/Comments';
import { BLOGS_ROUTE, toHref, type Route } from '../../routing/routes';
import References, { REFERENCES_ID, type ReferenceEntry } from './References';
import TableOfContents from './TableOfContents';
import type { TocEntry } from './types';

interface ArticleLayoutProps {
    title: string;
    /* Keys the comment thread, so it must match the article's own route. */
    route: Route;
    sections: TocEntry[];
    /* External sources cited by the article. Omit or leave empty when the
       article cites none. */
    references?: ReferenceEntry[];
    children?: ReactNode;
}

const toId = (title: string) => `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-title`;

/* Shared shell for every article: title, back link, body, references,
   comments, and the table of contents in the right margin. Articles supply
   the body only. */
const ArticleLayout = ({ title, route, sections, references = [], children }: ArticleLayoutProps) => {
    const titleId = toId(title);
    const tocEntries: TocEntry[] = [
        ...sections,
        ...(references.length > 0 ? [{ id: REFERENCES_ID, title: 'References' }] : []),
        { id: COMMENTS_ID, title: 'Comments' },
    ];

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
                <References references={references} />
                <Comments term={route} />
            </div>
        </article>
    );
};

export default ArticleLayout;
