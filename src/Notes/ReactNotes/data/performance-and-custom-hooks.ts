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
            title: "Create a custom Hook",
            bullets: [
                "A custom Hook is a function that calls Hooks. Its name starts with use followed by a capital letter.",
                "A custom Hook lets components reuse state and Effect logic. A function that only calculates data does not need to be a Hook.",
                "Call custom Hooks at the top level of a component or another Hook, before any early return. Do not call them inside loops, conditions, or event handlers."
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
            title: "Each Hook call has its own state",
            bullets: [
                "State created with useState or useReducer inside a custom Hook belongs to each call. Two components calling that Hook do not share those state values.",
                "To share one state value, keep it in a common parent and pass it to both components through props or context."
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
