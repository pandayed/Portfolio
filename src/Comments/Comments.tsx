import './Comments.css';
import '../CommonClasses/CommonClasses.css';

import { useEffect, useRef } from 'react';

import { getAppliedTheme, watchAppliedTheme, type Theme } from '../theme/theme';
import {
    GISCUS_CATEGORY,
    GISCUS_CATEGORY_ID,
    GISCUS_ORIGIN,
    GISCUS_REPO,
    GISCUS_REPO_ID,
    GISCUS_SCRIPT_SRC,
    toDiscussionTerm,
} from './giscus';

export const COMMENTS_ID = 'comments';

interface CommentsProps {
    /* Identifies the discussion, so it must stay fixed once a post is live. */
    term: string;
}

const toGiscusTheme = (theme: Theme) => (theme === 'dark' ? 'dark' : 'light');

/* giscus reads its settings off the script tag, so the element is built by
   hand rather than declared in JSX. */
const buildScript = (term: string): HTMLScriptElement => {
    const script = document.createElement('script');

    script.src = GISCUS_SCRIPT_SRC;
    script.async = true;
    script.crossOrigin = 'anonymous';

    script.setAttribute('data-repo', GISCUS_REPO);
    script.setAttribute('data-repo-id', GISCUS_REPO_ID);
    script.setAttribute('data-category', GISCUS_CATEGORY);
    script.setAttribute('data-category-id', GISCUS_CATEGORY_ID);
    script.setAttribute('data-mapping', 'specific');
    script.setAttribute('data-term', term);
    script.setAttribute('data-strict', '1');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    script.setAttribute('data-theme', toGiscusTheme(getAppliedTheme()));
    script.setAttribute('data-lang', 'en');
    script.setAttribute('data-loading', 'lazy');

    return script;
};

/* Once loaded, giscus lives in a cross-origin iframe and only accepts changes
   through postMessage. */
const sendTheme = (frame: HTMLIFrameElement | null, theme: Theme) => {
    frame?.contentWindow?.postMessage(
        { giscus: { setConfig: { theme: toGiscusTheme(theme) } } },
        GISCUS_ORIGIN,
    );
};

const Comments = ({ term }: CommentsProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }

        container.appendChild(buildScript(toDiscussionTerm(term)));

        return () => {
            container.replaceChildren();
        };
    }, [term]);

    useEffect(() => {
        return watchAppliedTheme((theme) => {
            sendTheme(containerRef.current?.querySelector('iframe.giscus-frame') ?? null, theme);
        });
    }, []);

    return (
        <section className="Comments" aria-labelledby={COMMENTS_ID}>
            <h2 id={COMMENTS_ID} className="SectionTitle">
                Comments
            </h2>
            <p className="Comments__note">
                Comments are GitHub Discussions on this site&apos;s{' '}
                <a
                    href={`https://github.com/${GISCUS_REPO}/discussions`}
                    className="Link"
                    target="_blank"
                    rel="noreferrer"
                >
                    repository
                </a>
                . Signing in with GitHub is needed to post or react.
            </p>
            <div ref={containerRef} className="Comments__widget" />
        </section>
    );
};

export default Comments;
