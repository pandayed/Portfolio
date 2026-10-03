import Prism from 'prismjs';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

import { useMemo } from 'react';

type CodeLanguage =
    | 'go'
    | 'java'
    | 'javascript'
    | 'jsx'
    | 'python'
    | 'sql'
    | 'text'
    | 'tsx'
    | 'typescript';

interface CodeBlockProps {
    children: string;
    language: CodeLanguage;
}

const CodeBlock = ({ children, language }: CodeBlockProps) => {
    const highlightedCode = useMemo(
        () => Prism.highlight(children, Prism.languages[language] ?? Prism.languages.plain, language),
        [children, language],
    );

    return (
        <pre className="Article__code">
            <code
                className={`language-${language}`}
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
        </pre>
    );
};

export default CodeBlock;
