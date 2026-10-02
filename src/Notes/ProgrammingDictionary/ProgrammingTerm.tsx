import './ProgrammingTerm.css';

import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { PROGRAMMING_DICTIONARY_ROUTE, toHref } from '../../routing/routes';
import { programmingTerms, type ProgrammingTerm as TermEntry } from './terms';

const ProgrammingTerm = ({ term, text }: { term: TermEntry; text: string }) => {
    const id = useId();
    const link = useRef<HTMLAnchorElement>(null);
    const tooltip = useRef<HTMLSpanElement>(null);
    const closeTimer = useRef<ReturnType<typeof setTimeout>>();
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState({ left: 0, top: 0 });

    const show = () => {
        clearTimeout(closeTimer.current);
        setOpen(true);
    };
    const hide = () => {
        if (document.activeElement === link.current) return;
        closeTimer.current = setTimeout(() => setOpen(false), 120);
    };

    useLayoutEffect(() => {
        if (!open) return;
        const reposition = () => {
            if (!link.current || !tooltip.current) return;
            const anchor = link.current.getBoundingClientRect();
            if (anchor.bottom < 0 || anchor.top > window.innerHeight) {
                setOpen(false);
                return;
            }
            const box = tooltip.current.getBoundingClientRect();
            const left = Math.max(8, Math.min(anchor.left, window.innerWidth - box.width - 8));
            const top = anchor.bottom + box.height + 8 <= window.innerHeight
                ? anchor.bottom + 4
                : Math.max(8, anchor.top - box.height - 4);
            setPosition({ left, top });
        };
        reposition();
        window.addEventListener('scroll', reposition, true);
        window.addEventListener('resize', reposition);
        return () => {
            window.removeEventListener('scroll', reposition, true);
            window.removeEventListener('resize', reposition);
        };
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const close = () => setOpen(false);
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') close();
        };
        window.addEventListener('keydown', onKeyDown);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [open]);

    useEffect(() => () => clearTimeout(closeTimer.current), []);

    return (
        <>
            <a
                ref={link}
                href={`${toHref(PROGRAMMING_DICTIONARY_ROUTE)}?term=${term.id}`}
                className="Link ProgrammingTerm"
                aria-describedby={open ? id : undefined}
                onMouseEnter={show}
                onMouseLeave={hide}
                onFocus={show}
                onBlur={() => setOpen(false)}
                onClick={() => setOpen(false)}
            >
                {text}
            </a>
            {open && createPortal(
                <span
                    ref={tooltip}
                    id={id}
                    role="tooltip"
                    className="ProgrammingTerm__tooltip"
                    style={position}
                    onMouseEnter={show}
                    onMouseLeave={hide}
                >
                    <strong>{term.term}</strong>
                    <span>{term.definition}</span>
                    <span className="ProgrammingTerm__hint">Open the term in the programming dictionary.</span>
                </span>,
                document.body,
            )}
        </>
    );
};

const aliases = programmingTerms.flatMap((term) => (
    [term.term, ...(term.aliases ?? [])].map((text) => ({ text, term }))
)).sort((first, second) => second.text.length - first.text.length);

const termsByAlias = new Map(aliases.map(({ text, term }) => [text.toLowerCase(), term]));
const escapePattern = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const termPattern = new RegExp(
    `(?<![\\p{L}\\p{N}_])(${aliases.map(({ text }) => escapePattern(text)).join('|')})(?![\\p{L}\\p{N}_])`,
    'giu',
);

// Only prose passes through this renderer. Code blocks and existing links stay intact.
export const renderProgrammingTerms = (text: string, keyPrefix: string) => {
    const parts = [];
    let cursor = 0;
    for (const match of text.matchAll(termPattern)) {
        const index = match.index!;
        parts.push(text.slice(cursor, index));
        parts.push(
            <ProgrammingTerm
                key={`${keyPrefix}-term-${index}`}
                term={termsByAlias.get(match[0].toLowerCase())!}
                text={match[0]}
            />,
        );
        cursor = index + match[0].length;
    }
    parts.push(text.slice(cursor));
    return parts;
};
