import './Accordion.css';

import type { ReactNode } from 'react';

interface AccordionProps {
    summary: string;
    /* Open on first render, for content that is worth reading before the page. */
    defaultOpen?: boolean;
    children?: ReactNode;
}

/* Native disclosure, so keyboard, screen readers and find-in-page work without
   any state of our own. */
const Accordion = ({ summary, defaultOpen = false, children }: AccordionProps) => {
    return (
        <details className="Accordion" open={defaultOpen}>
            <summary className="Accordion__summary">{summary}</summary>
            <div className="Accordion__body">{children}</div>
        </details>
    );
};

export default Accordion;
