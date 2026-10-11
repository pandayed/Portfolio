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
    /* The article's route also keys its comment thread by default. */
    route: Route;
    /* Preserve an existing discussion when an article moves to another route. */
    commentRoute?: Route;
    sections: TocEntry[];
    /* External sources cited by the article. Omit or leave empty when the
       article cites none. */
    references?: ReferenceEntry[];
    backRoute?: Route;
    backLabel?: string;
    headerMeta?: ReactNode;
    children?: ReactNode;
}

const toId = (title: string) => `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-title`;

/* Shared shell for every article: title, back link, body, references,
   comments, and the table of contents in the right margin. Articles supply
   the body only. */
const ArticleLayout = ({
    title,
    route,
    commentRoute = route,
    sections,
    references = [],
    backRoute = BLOGS_ROUTE,
    backLabel = 'Back to blogs',
    headerMeta,
    children,
}: ArticleLayoutProps) => {
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
                    href={toHref(backRoute)}
                    className="Link Link--standalone ArticleLayout__back"
                >
                    {backLabel}
                </a>
                <h1 id={titleId} className="PageTitle">
                    {title}
                </h1>
                {headerMeta}
            </header>

            <TableOfContents sections={tocEntries} />

            <div className="ArticleLayout__body">
                {children}
                <References references={references} />
                <Comments term={commentRoute} />
            </div>
        </article>
    );
};

export default ArticleLayout;
