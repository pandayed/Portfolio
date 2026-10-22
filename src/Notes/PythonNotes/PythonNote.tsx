import './PythonNote.css';

import ArticleLayout from '../NoteArticleLayout';
import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import {
    PYTHON_NOTES_ROUTE,
    type PythonNoteRoute,
} from '../../routing/routes';
import { pythonNotes } from './pythonNotes';
import type { PythonInlineContent } from './types';
import { renderProgrammingTerms } from '../ProgrammingDictionary/ProgrammingTerm';
import PythonRunSequence from './PythonRunSequence';
import { renderInlineCode } from '../LearningNotes/renderInlineCode';
import LearningNoteExampleBlock from '../LearningNotes/LearningNoteExampleBlock';

interface PythonNoteProps {
    route: PythonNoteRoute;
}

const sectionId = (id: string) => `python-note-${id}`;

const renderInlineContent = (content: PythonInlineContent, keyPrefix: string) => (
    typeof content === 'string'
        ? renderInlineCode(content, keyPrefix, renderProgrammingTerms)
        : content.map((part, index) => (
            typeof part === 'string'
                ? renderInlineCode(part, `${keyPrefix}-part-${index}`, renderProgrammingTerms)
                : 'strong' in part ? (
                    <strong key={`${keyPrefix}-strong-${index}`}>
                        {renderInlineCode(part.text, `${keyPrefix}-strong-${index}`, renderProgrammingTerms)}
                    </strong>
                )
                : (
                    <a className="Link" href={part.href} key={`${keyPrefix}-link-${index}`}>
                        {renderInlineCode(part.text, `${keyPrefix}-link-text-${index}`)}
                    </a>
                )
        ))
);

const PythonNote = ({ route }: PythonNoteProps) => {
    const slug = route.slice(`${PYTHON_NOTES_ROUTE}/`.length);
    const note = pythonNotes.find((entry) => entry.slug === slug);

    if (!note) return null;

    const orderedSections = [...note.sections.filter((section) => !/^(?:Python )?references$/i.test(section.title)),
        ...note.sections.filter((section) => /^(?:Python )?references$/i.test(section.title))];
    const toc: TocEntry[] = orderedSections.map(({ id, title }) => ({
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
            {orderedSections.map((section) => (
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

                    {section.table && (
                        <div className="Article__tableWrap">
                            <table className="Article__table">
                                <thead>
                                    <tr>
                                        {section.table.columns.map((column) => (
                                            <th scope="col" key={column}>{column}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {section.table.rows.map((row, rowIndex) => (
                                        <tr key={`${section.id}-row-${rowIndex}`}>
                                            {row.map((cell, cellIndex) => (
                                                cellIndex === 0 ? (
                                                    <th scope="row" key={cellIndex}>{renderInlineCode(cell, `${section.id}-cell-${rowIndex}-${cellIndex}`)}</th>
                                                ) : <td key={cellIndex}>{renderInlineCode(cell, `${section.id}-cell-${rowIndex}-${cellIndex}`)}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {section.examples?.map((example, index) => (
                        note.exampleLayout === 'grouped' ? (
                            <LearningNoteExampleBlock
                                key={`${section.id}-example-${index}`}
                                example={{
                                    ...example,
                                    language: example.language ?? 'python',
                                    description: example.description?.map((text, point) => renderInlineContent(text, `${section.id}-${index}-description-${point}`)),
                                    explanation: example.explanation?.map((text, point) => renderInlineContent(text, `${section.id}-${index}-explanation-${point}`)),
                                }}
                                renderText={(text, key) => renderInlineCode(text, key, renderProgrammingTerms)}
                            />
                        ) : <div className="Article__section" key={`${section.id}-example-${index}`}>
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
                            {renderInlineCode(exception, `${section.id}-exception-${exception}`, renderProgrammingTerms)}
                        </aside>
                    ))}
                </section>
            ))}
        </ArticleLayout>
    );
};

export default PythonNote;
