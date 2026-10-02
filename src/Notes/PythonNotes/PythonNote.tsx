import './PythonNote.css';

import ArticleLayout from '../NoteArticleLayout';
import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import {
    PYTHON_NOTES_ROUTE,
    PROGRAMMING_DICTIONARY_ROUTE,
    toHref,
    type PythonNoteRoute,
} from '../../routing/routes';
import { pythonNotes } from './pythonNotes';
import type { PythonInlineContent } from './types';
import { renderProgrammingTerms } from '../ProgrammingDictionary/ProgrammingTerm';
import PythonRunSequence from './PythonRunSequence';

interface PythonNoteProps {
    route: PythonNoteRoute;
}

const sectionId = (id: string) => `python-note-${id}`;

const renderInlineContent = (content: PythonInlineContent, keyPrefix: string) => (
    typeof content === 'string'
        ? renderProgrammingTerms(content, keyPrefix)
        : content.map((part, index) => (
            typeof part === 'string'
                ? renderProgrammingTerms(part, `${keyPrefix}-part-${index}`)
                : (
                    <a className="Link" href={part.href} key={`${keyPrefix}-link-${index}`}>
                        {part.text}
                    </a>
                )
        ))
);

const PythonNote = ({ route }: PythonNoteProps) => {
    const slug = route.slice(`${PYTHON_NOTES_ROUTE}/`.length);
    const note = pythonNotes.find((entry) => entry.slug === slug);

    if (!note) return null;

    const toc: TocEntry[] = note.sections.map(({ id, title }) => ({
        id: sectionId(id),
        title,
    }));

    return (
        <ArticleLayout
            title={note.title}
            route={route}
            sections={toc}
            backRoute={PYTHON_NOTES_ROUTE}
            backLabel="Back to Python notes"
        >
            {!note.sections.every((section) => section.diagram) && <p>
                Hover over a dotted term link for its meaning, or browse the{' '}
                <a className="Link" href={toHref(PROGRAMMING_DICTIONARY_ROUTE)}>programming dictionary</a>.
            </p>}
            {note.sections.map((section) => (
                <section
                    className="Article__section"
                    aria-labelledby={sectionId(section.id)}
                    key={section.id}
                >
                    <h2 id={sectionId(section.id)} className="SectionTitle">
                        {section.title}
                    </h2>

                    {section.diagram === 'python-run-sequence' && <PythonRunSequence />}

                    {section.paragraphs?.map((paragraph, paragraphIndex) => (
                        <p key={`${section.id}-paragraph-${paragraphIndex}`}>
                            {renderInlineContent(paragraph, `${section.id}-paragraph-${paragraphIndex}`)}
                        </p>
                    ))}

                    {section.bullets && (
                        <ul className="Article__notes">
                            {section.bullets.map((bullet, bulletIndex) => (
                                <li key={`${section.id}-bullet-${bulletIndex}`}>
                                    {renderInlineContent(bullet, `${section.id}-bullet-${bulletIndex}`)}
                                </li>
                            ))}
                        </ul>
                    )}

                    {section.examples?.map((example, index) => (
                        <div className="Article__section" key={`${section.id}-example-${index}`}>
                            {example.title && (
                                <h3 className="Article__subTitle">{example.title}</h3>
                            )}
                            <CodeBlock language={example.language ?? 'python'}>{example.code}</CodeBlock>
                            {example.result && (
                                <p className="PythonNote__result">
                                    Result: {renderProgrammingTerms(example.result, `${section.id}-result-${index}`)}
                                </p>
                            )}
                        </div>
                    ))}

                    {section.exceptions?.map((exception) => (
                        <aside className="PythonNote__exception" key={exception}>
                            <strong>Exception or common mistake:</strong>{' '}
                            {renderProgrammingTerms(exception, `${section.id}-exception-${exception}`)}
                        </aside>
                    ))}
                </section>
            ))}
        </ArticleLayout>
    );
};

export default PythonNote;
