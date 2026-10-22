import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';

import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import JavaScriptRunner from '../JavaScriptRunner/JavaScriptRunner';
import { renderProgrammingTerms } from '../ProgrammingDictionary/ProgrammingTerm';
import type { LearningNoteExample } from './types';
import './LearningNoteExampleBlock.css';

interface LearningNoteExampleBlockProps {
    example: LearningNoteExample;
    termContext?: 'react';
    renderText?: (text: ReactNode, key: string) => ReactNode;
}

const LearningNoteExampleBlock = ({ example, termContext, renderText }: LearningNoteExampleBlockProps) => {
    const fileTabsId = useId();
    const [selectedFile, setSelectedFile] = useState(0);
    const fileTabs = useRef<(HTMLButtonElement | null)[]>([]);
    const files = example.files ?? [];
    const activeFileIndex = selectedFile < files.length ? selectedFile : 0;
    const activeFile = files[activeFileIndex];
    const handleFileKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        let nextIndex: number;
        switch (event.key) {
            case 'ArrowRight': nextIndex = (index + 1) % files.length; break;
            case 'ArrowLeft': nextIndex = (index - 1 + files.length) % files.length; break;
            case 'Home': nextIndex = 0; break;
            case 'End': nextIndex = files.length - 1; break;
            default: return;
        }
        event.preventDefault();
        setSelectedFile(nextIndex);
        fileTabs.current[nextIndex]?.focus();
    };
    const renderProse = (text: ReactNode, key: string) => renderText
        ? renderText(text, key)
        : termContext && typeof text === 'string'
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
                <span>{renderText ? renderText(example.title ?? 'View code', 'title') : example.title ?? 'View code'}</span>
            </summary>
            {example.description && (
                <div className="LearningNoteExampleBlock__section">
                    <ul className="Article__notes">
                        {example.description.map((point, index) => <li key={index}>{renderProse(point, `description-${index}`)}</li>)}
                    </ul>
                </div>
            )}
            <section className={`LearningNoteExampleBlock__section LearningNoteExampleBlock__section--code${activeFile ? ' LearningNoteExampleBlock__section--files' : ''}`} aria-label="Code">
                {activeFile ? (
                    <>
                        <div className="LearningNoteExampleBlock__fileTabs" role="tablist" aria-label="Example files">
                            {files.map((file, index) => (
                                <button
                                    key={file.name}
                                    ref={(element) => { fileTabs.current[index] = element; }}
                                    id={`${fileTabsId}-tab-${index}`}
                                    type="button"
                                    title={file.name}
                                    aria-label={file.name}
                                    role="tab"
                                    aria-selected={index === activeFileIndex}
                                    aria-controls={`${fileTabsId}-panel`}
                                    tabIndex={index === activeFileIndex ? 0 : -1}
                                    className="LearningNoteExampleBlock__fileTab"
                                    onClick={() => setSelectedFile(index)}
                                    onKeyDown={(event) => handleFileKeyDown(event, index)}
                                >
                                    {file.name.split(/[\\/]/).pop()}
                                </button>
                            ))}
                        </div>
                        <div
                            id={`${fileTabsId}-panel`}
                            role="tabpanel"
                            aria-labelledby={`${fileTabsId}-tab-${activeFileIndex}`}
                            tabIndex={0}
                            className="LearningNoteExampleBlock__filePanel"
                        >
                            <CodeBlock key={activeFile.name} language={activeFile.language}>{activeFile.code}</CodeBlock>
                        </div>
                    </>
                ) : example.runnable && example.language === 'javascript' ? (
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
