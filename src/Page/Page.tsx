import './Page.css';

import type { ReactNode } from 'react';

interface PageProps {
    title: string;
    children?: ReactNode;
}

const toId = (title: string) => `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-title`;

/* Shared shell for simple pages that are nothing more than a title and content. */
const Page = ({ title, children }: PageProps) => {
    const titleId = toId(title);

    return (
        <section className="Page" aria-labelledby={titleId}>
            <h1 id={titleId} className="Page__title">
                {title}
            </h1>
            {children}
        </section>
    );
};

export default Page;
