import type { ReactNode } from 'react';

export const renderExampleText = (text: ReactNode, key: string): ReactNode => {
    if (typeof text !== 'string') return text;
    return text.split(/(`[^`]+`)/g).map((part, index) =>
        part.startsWith('`') && part.endsWith('`')
            ? <code key={`${key}-${index}`}>{part.slice(1, -1)}</code>
            : part,
    );
};
