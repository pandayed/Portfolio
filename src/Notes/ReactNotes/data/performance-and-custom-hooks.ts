import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "performance-and-custom-hooks",
    title: "Custom Hooks",
    summary: "Shared Hook logic and separate state for each caller.",
    scope: "react",
    updatedOn: "2026-10-14",
    inlineCode: true,
    exampleLayout: "grouped",
    sections: [
        {
            id: "custom-hooks",
            title: "Custom Hook functions",
            bullets: [
                "A custom Hook is a function that calls Hooks.",
                "Its name starts with `use` followed by a capital letter.",
                "A custom Hook lets components reuse state and Effect logic.",
                "A function that only calculates data does not need to be a Hook.",
                "Custom Hooks must run at the top level of a component or another Hook, before any early return.",
                "Loops, conditions, and event handlers must not contain these calls."
            ],
            examples: [
                {
                    title: "Debounced input Hook",
                    description: [
                        "The Hook returns a value after it stops changing for the given delay.",
                        "`delayMs` is measured in milliseconds."
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
                        "Cleanup cancels the previous timer.",
                        "A new edit starts a new timer.",
                        "The Hook delays a value.",
                        "It does not fetch data."
                    ]
                }
            ]
        },
        {
            id: "custom-hook-boundaries",
            title: "State in custom Hooks",
            bullets: [
                "State created with `useState` or `useReducer` inside a custom Hook belongs to each call.",
                "Two components calling that Hook do not share those state values.",
                "A common parent can own one shared state value.",
                "Props or context supply that value to both components."
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
