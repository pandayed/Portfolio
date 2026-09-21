import Prism from 'prismjs';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-typescript';

import { useMemo } from 'react';

type CodeLanguage = 'go' | 'javascript' | 'python' | 'sql' | 'typescript';

interface CodeBlockProps {
    children: string;
    language: CodeLanguage;
}

const CodeBlock = ({ children, language }: CodeBlockProps) => {
    const highlightedCode = useMemo(
        () => Prism.highlight(children, Prism.languages[language], language),
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
