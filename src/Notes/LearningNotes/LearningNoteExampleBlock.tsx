import type { ReactNode } from 'react';

import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import JavaScriptRunner from '../JavaScriptRunner/JavaScriptRunner';
import { renderProgrammingTerms } from '../ProgrammingDictionary/ProgrammingTerm';
import type { LearningNoteExample } from './types';
import './LearningNoteExampleBlock.css';

interface LearningNoteExampleBlockProps {
    example: LearningNoteExample;
    termContext?: 'react';
}

const LearningNoteExampleBlock = ({ example, termContext }: LearningNoteExampleBlockProps) => {
    const renderProse = (text: ReactNode, key: string) => termContext && typeof text === 'string'
        ? renderProgrammingTerms(text, key, termContext)
        : text;
    return (
        <details className="LearningNoteExampleBlock">
            <summary className="LearningNoteExampleBlock__summary">
                <span className="LearningNoteExampleBlock__indicator" aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none" focusable="false">
                        <path d="m6 3.5 4.5 4.5L6 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
                <span>{example.title ?? 'View code'}</span>
            </summary>
            {example.description && (
                <div className="LearningNoteExampleBlock__section">
                    <ul className="Article__notes">
                        {example.description.map((point, index) => <li key={index}>{renderProse(point, `description-${index}`)}</li>)}
                    </ul>
                </div>
            )}
            <section className="LearningNoteExampleBlock__section LearningNoteExampleBlock__section--code" aria-label="Code">
                {example.runnable && example.language === 'javascript' ? (
                    <JavaScriptRunner>{example.code}</JavaScriptRunner>
                ) : <CodeBlock language={example.language}>{example.code}</CodeBlock>}
            </section>
            {example.commands && (
                <section className="LearningNoteExampleBlock__section LearningNoteExampleBlock__section--code" aria-label="Commands">
                    <CodeBlock language="text">{example.commands}</CodeBlock>
                </section>
            )}
            {example.result !== undefined && (
                <section
                    className="LearningNoteExampleBlock__section LearningNoteExampleBlock__section--code"
                    aria-label={example.possibleOutput ? 'One possible output' : 'Output'}
                >
                    <CodeBlock language="text">{example.result}</CodeBlock>
                </section>
            )}
            {!!example.explanation?.length && (
                <section className="LearningNoteExampleBlock__section" aria-label="Explanation">
                    <ul className="Article__notes">
                        {example.explanation.map((point, index) => <li key={index}>{renderProse(point, `explanation-${index}`)}</li>)}
                    </ul>
                </section>
            )}
        </details>
    );
};

export default LearningNoteExampleBlock;
