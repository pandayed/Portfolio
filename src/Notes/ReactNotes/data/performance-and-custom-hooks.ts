import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "performance-and-custom-hooks",
    title: "Custom Hooks",
    summary: "Extract repeated Hook logic while keeping each caller’s state independent.",
    scope: "react",
    updatedOn: "2026-10-14",
    exampleLayout: "grouped",
    sections: [
        {
            id: "custom-hooks",
            title: "Name reusable Hook logic by its purpose",
            bullets: [
                "A custom Hook is a function that calls Hooks. Its name starts with use followed by a capital letter.",
                "Extract repeated stateful behavior after it works in a component. A function that only calculates data can stay a regular helper.",
                "Each call has independent state. Sharing a Hook does not share one state value across callers.",
                "Custom Hooks follow the same top-level call rules as the Hooks they call."
            ],
            examples: [
                {
                    title: "Reuse debounced input logic",
                    description: [
                        "Return a value only after it stops changing for the given delay. delayMs is measured in milliseconds."
                    ],
                    language: "jsx",
                    code: `import { useEffect, useState } from 'react';

function useDebouncedValue(value, delayMs) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delayMs);
        return () => clearTimeout(timer);
    }, [value, delayMs]);
    return debounced;
}

export default function SearchPreview() {
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebouncedValue(query, 300);
    return <>
        <label>Search <input value={query}
            onChange={event => setQuery(event.target.value)} /></label>
        <p>Settled query: {debouncedQuery}</p>
    </>;
}`,
                    result: "The field changes immediately. Settled query updates 300 ms after the last edit.",
                    explanation: [
                        "Cleanup cancels the previous timer. A new edit starts a new timer. The Hook delays a value; it does not fetch data."
                    ]
                }
            ]
        },
        {
            id: "custom-hook-boundaries",
            title: "Keep the Hook’s purpose visible",
            bullets: [
                "Accept the inputs that control the behavior and return the values the caller needs.",
                "Keep cleanup and dependency lists inside the Hook that owns the external synchronization.",
                "Avoid generic lifecycle wrappers such as useMount that hide dependency requirements.",
                "Use context or lift state when callers need one shared value. Extracting a custom Hook alone does not provide that sharing."
            ]
        }
    ],
    references: [
        {
            title: "React: Reusing logic with custom Hooks",
            href: "https://react.dev/learn/reusing-logic-with-custom-hooks"
        }
    ]
};

export default note;
