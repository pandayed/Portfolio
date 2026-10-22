import type { ReactNode } from 'react';

export const renderInlineCode = (
    text: ReactNode,
    key: string,
    renderPlainText?: (text: string, key: string) => ReactNode,
): ReactNode => {
    if (typeof text !== 'string') return text;
    return text.split(/(`[^`]+`)/g).map((part, index) =>
        part.startsWith('`') && part.endsWith('`')
            ? <code key={`${key}-${index}`}>{part.slice(1, -1)}</code>
            : renderPlainText ? renderPlainText(part, `${key}-${index}`) : part,
    );
};
