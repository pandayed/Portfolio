import '../Notes.css';
import './ProgrammingDictionary.css';

import { useEffect, useState } from 'react';

import ArticleLayout from '../../Blogs/ArticleLayout/ArticleLayout';
import { PROGRAMMING_DICTIONARY_ROUTE, NOTES_ROUTE } from '../../routing/routes';
import { programmingTerms } from './terms';
import NoteReadingTime from '../NoteReadingTime';
import { getPageReadingMinutes, getPageWordCount } from '../readingTime';

const categories = [...new Set(programmingTerms.map(({ category }) => category))];
const categoryId = (category: string) => `programming-dictionary-${category.toLowerCase().replace(/ /g, '-')}`;

const ProgrammingDictionary = () => {
    const [query, setQuery] = useState('');

    useEffect(() => {
        let frame: number;
        const openTerm = () => {
            cancelAnimationFrame(frame);
            const parameters = new URLSearchParams(window.location.hash.split('?')[1]);
            const term = programmingTerms.find(({ id }) => id === parameters.get('term'));
            if (!term) return;
            setQuery('');
            frame = requestAnimationFrame(() => {
                const heading = document.getElementById(`programming-term-${term.id}`);
                heading?.scrollIntoView({ block: 'start' });
                heading?.focus({ preventScroll: true });
            });
        };
        openTerm();
        window.addEventListener('hashchange', openTerm);
        window.addEventListener('pageshow', openTerm);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('hashchange', openTerm);
            window.removeEventListener('pageshow', openTerm);
        };
    }, []);

    const search = query.trim().toLowerCase();
    const visibleTerms = programmingTerms.filter(({ term, definition, aliases = [] }) => (
        [term, definition, ...aliases].some((text) => text.toLowerCase().includes(search))
    ));
    const visibleCategories = categories.filter((category) => (
        visibleTerms.some((term) => term.category === category)
    ));

    return (
        <ArticleLayout
            title="Programming dictionary"
            headerMeta={<NoteReadingTime minutes={getPageReadingMinutes(PROGRAMMING_DICTIONARY_ROUTE)} wordCount={getPageWordCount(PROGRAMMING_DICTIONARY_ROUTE)} />}
            route={PROGRAMMING_DICTIONARY_ROUTE}
            backRoute={NOTES_ROUTE}
            backLabel="Back to notes"
            sections={visibleCategories.map((category) => ({ id: categoryId(category), title: category }))}
            references={[
                { title: 'Scope (MDN)', href: 'https://developer.mozilla.org/en-US/docs/Glossary/Scope' },
                { title: 'Virtual machine instructions (Java specification)', href: 'https://docs.oracle.com/javase/specs/jvms/se25/html/jvms-6.html' },
                { title: 'CPython (Python glossary)', href: 'https://docs.python.org/3/glossary.html#term-CPython' },
                { title: 'JSON objects', href: 'https://www.rfc-editor.org/rfc/rfc8259#section-4' },
            ]}
        >
            <section className="Article__section">
                <p>
                    Common programming terms shared across the notes. Language-specific terms are
                    listed separately. Hover over a dotted term link or focus it
                    with the keyboard to read its definition. Select the link to open its dictionary entry.
                </p>
                <div className="Notes__controls">
                    <label htmlFor="programming-dictionary-search" className="Notes__searchLabel">Search terms</label>
                    <input
                        id="programming-dictionary-search"
                        type="search"
                        className="Notes__search"
                        placeholder="Search a term or definition"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                </div>
                <p role="status">{visibleTerms.length} of {programmingTerms.length} terms</p>
                {visibleTerms.length === 0 && <p>No matching terms. Try another word.</p>}
            </section>
            {visibleCategories.map((category) => (
                <section className="Article__section" aria-labelledby={categoryId(category)} key={category}>
                    <h2 id={categoryId(category)} className="SectionTitle">{category}</h2>
                    {visibleTerms.filter((term) => term.category === category)
                        .sort((first, second) => first.term.localeCompare(second.term))
                        .map((term) => (
                            <section className="Article__section" aria-labelledby={`programming-term-${term.id}`} key={term.id}>
                                <h3 id={`programming-term-${term.id}`} className="Article__subTitle ProgrammingDictionary__term" tabIndex={-1}>
                                    {term.term}
                                </h3>
                                <p>{term.definition}</p>
                            </section>
                        ))}
                </section>
            ))}
        </ArticleLayout>
    );
};

export default ProgrammingDictionary;
