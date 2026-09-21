import './PythonNote.css';

import ArticleLayout from '../../Blogs/ArticleLayout/ArticleLayout';
import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import {
    PYTHON_NOTES_ROUTE,
    type PythonNoteRoute,
} from '../../routing/routes';
import { pythonNotes } from './pythonNotes';

interface PythonNoteProps {
    route: PythonNoteRoute;
}

const sectionId = (id: string) => `python-note-${id}`;

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
            {note.sections.map((section) => (
                <section
                    className="Article__section"
                    aria-labelledby={sectionId(section.id)}
                    key={section.id}
                >
                    <h2 id={sectionId(section.id)} className="SectionTitle">
                        {section.title}
                    </h2>

                    {section.paragraphs?.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}

                    {section.bullets && (
                        <ul className="Article__notes">
                            {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                        </ul>
                    )}

                    {section.examples?.map((example, index) => (
                        <div className="Article__section" key={`${section.id}-example-${index}`}>
                            {example.title && (
                                <h3 className="Article__subTitle">{example.title}</h3>
                            )}
                            <CodeBlock language="python">{example.code}</CodeBlock>
                            {example.result && (
                                <p className="PythonNote__result">Result: {example.result}</p>
                            )}
                        </div>
                    ))}

                    {section.exceptions?.map((exception) => (
                        <aside className="PythonNote__exception" key={exception}>
                            <strong>Exception or common mistake:</strong> {exception}
                        </aside>
                    ))}
                </section>
            ))}
        </ArticleLayout>
    );
};

export default PythonNote;
