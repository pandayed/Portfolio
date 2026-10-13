import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import type { Route } from '../../routing/routes';
import NoteArticleLayout from '../NoteArticleLayout';
import LearningNoteExampleBlock from './LearningNoteExampleBlock';
import type { LearningNote, LearningNoteScope } from './types';

interface LearningNotePageProps {
    backLabel: string;
    backRoute: Route;
    note: LearningNote;
    route: Route;
}

const scopeLabels: Record<LearningNoteScope, string> = {
    dbms: 'Database concepts, with PostgreSQL examples',
    java: 'Java language and standard library, with Java 17 or later examples',
    'javascript-typescript': 'JavaScript runtime behavior with TypeScript checks',
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    react: 'React with TypeScript examples',
};

const LearningNotePage = ({ backLabel, backRoute, note, route }: LearningNotePageProps) => {
    const useBulletExplanations = note.scope !== 'java' || note.pointwise === true;
    const sectionId = (id: string) => `learning-note-${note.slug}-${id}`;
    const sections: TocEntry[] = note.sections.map(({ id, title }) => ({
        id: sectionId(id),
        title,
    }));

    return (
        <NoteArticleLayout
            title={note.title}
            route={route}
            sections={sections}
            backRoute={backRoute}
            backLabel={backLabel}
        >
            <section className="Article__section">
                {useBulletExplanations ? (
                    <ul className="Article__notes">
                        <li><strong>Scope:</strong> {scopeLabels[note.scope]}.</li>
                    </ul>
                ) : <p><strong>Scope:</strong> {scopeLabels[note.scope]}.</p>}
                {note.references && (
                    <ul className="Article__notes">
                        {note.references.map(({ title, href }) => (
                            <li key={href}>
                                <a className="Link" href={href} target="_blank" rel="noopener noreferrer">
                                    {title}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {note.sections.map((section) => (
                <section
                    className="Article__section"
                    aria-labelledby={sectionId(section.id)}
                    key={section.id}
                >
                    <h2 id={sectionId(section.id)} className="SectionTitle">
                        {section.title}
                    </h2>

                    {section.paragraphs?.map((paragraph, index) => (
                        <p key={`${section.id}-paragraph-${index}`}>{paragraph}</p>
                    ))}

                    {section.bullets && (
                        <ul className="Article__notes">
                            {section.bullets.map((bullet, index) => (
                                <li key={`${section.id}-bullet-${index}`}>{bullet}</li>
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
                                            {row.map((cell, cellIndex) => cellIndex === 0 ? (
                                                <th scope="row" key={cellIndex}>{cell}</th>
                                            ) : <td key={cellIndex}>{cell}</td>)}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {section.examples?.map((example, index) => note.exampleLayout === 'grouped' ? (
                        <LearningNoteExampleBlock
                            example={example}
                            key={`${section.id}-example-${index}`}
                        />
                    ) : (
                        <div className="Article__section" key={`${section.id}-example-${index}`}>
                            {example.title && <h3 className="Article__subTitle">{example.title}</h3>}
                            <CodeBlock language={example.language}>{example.code}</CodeBlock>
                            {useBulletExplanations && (example.result || example.typeCheck) ? (
                                <ul className="Article__notes">
                                    {example.result && (note.scope === 'java' && example.result.includes('\n') ? (
                                        <li>
                                            <strong>Expected output:</strong>
                                            <CodeBlock language="text">{example.result}</CodeBlock>
                                        </li>
                                    ) : <li><strong>Result:</strong> {example.result}</li>)}
                                    {example.typeCheck && <li><strong>TypeScript check:</strong> {example.typeCheck}</li>}
                                </ul>
                            ) : (
                                <>
                                    {example.result && (note.scope === 'java' && example.result.includes('\n') ? (
                                        <>
                                            <p><strong>Expected output:</strong></p>
                                            <CodeBlock language="text">{example.result}</CodeBlock>
                                        </>
                                    ) : <p><strong>Result:</strong> {example.result}</p>)}
                                    {example.typeCheck && <p><strong>TypeScript check:</strong> {example.typeCheck}</p>}
                                </>
                            )}
                        </div>
                    ))}

                    {section.pitfalls && (
                        <>
                            <h3 className="Article__subTitle">Common mistakes</h3>
                            <ul className="Article__notes">
                                {section.pitfalls.map((pitfall, index) => (
                                    <li key={`${section.id}-pitfall-${index}`}>{pitfall}</li>
                                ))}
                            </ul>
                        </>
                    )}
                </section>
            ))}
        </NoteArticleLayout>
    );
};

export default LearningNotePage;
