import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "sharing-and-resetting-state",
    title: "Shared state and state resets",
    summary: "Shared state ownership, component identity, and state resets.",
    scope: "react",
    updatedOn: "2026-10-14",
    inlineCode: true,
    exampleLayout: "grouped",
    sections: [
        {
            id: "single-owner",
            title: "Shared state",
            bullets: [
                "The closest common parent owns the shared value when two components must stay in sync.",
                "The parent passes the value and an update callback through props.",
                "Each value has one owner.",
                "Derived values can be calculated while rendering.",
                "A second stored copy would need to be kept in sync."
            ],
            examples: [
                {
                    title: "Shared search text",
                    description: [
                        "Either field edits the same search text."
                    ],
                    language: "jsx",
                    code: `import { useState } from 'react';

function SearchField({ label, query, onQueryChange }) {
    return <label>{label} <input value={query}
        onChange={event => onQueryChange(event.target.value)} /></label>;
}

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const hasQuery = query.trim().length > 0;
    return <>
        <SearchField label="Header search" query={query} onQueryChange={setQuery} />
        <SearchField label="Sidebar search" query={query} onQueryChange={setQuery} />
        <p>{hasQuery ? 'Searching: ' + query : 'Enter a search'}</p>
    </>;
}`,
                    result: "Editing either field changes both fields and the preview.",
                    explanation: [
                        "`SearchPage` owns `query`.",
                        "`hasQuery` is calculated from `query` instead of stored separately."
                    ]
                }
            ]
        },
        {
            id: "state-is-local",
            title: "Component identity and state resets",
            bullets: [
                "React preserves state when the same component type stays at the same position with the same `key`.",
                "Removing that component or changing its type or `key` resets its state.",
                "A different `key` starts a fresh form for the selected record.",
                "The `key` is part of the component’s identity.",
                "Component definitions belong outside other components.",
                "A new component function changes its type identity."
            ],
            examples: [
                {
                    title: "Draft resets by recipient",
                    description: [
                        "Each selected recipient starts with a new draft."
                    ],
                    language: "jsx",
                    code: `import { useState } from 'react';

function Draft({ recipient }) {
    const [text, setText] = useState('');
    return <label>Message to {recipient} <input value={text}
        onChange={event => setText(event.target.value)} /></label>;
}

export default function Mailbox() {
    const [recipient, setRecipient] = useState('Ada');
    return <>
        <button onClick={() => setRecipient('Ada')}>Ada</button>
        <button onClick={() => setRecipient('Grace')}>Grace</button>
        <Draft key={recipient} recipient={recipient} />
    </>;
}`,
                    result: "Switching from Ada to Grace clears the draft. Switching back starts an empty Ada draft too.",
                    explanation: [
                        "The changed `key` creates a fresh `Draft` instance.",
                        "This pattern resets drafts.",
                        "It does not save one draft per recipient."
                    ]
                }
            ]
        }
    ],
    references: [
        {
            title: "React: Sharing state",
            href: "https://react.dev/learn/sharing-state-between-components"
        },
        {
            title: "React: Preserving and resetting state",
            href: "https://react.dev/learn/preserving-and-resetting-state"
        }
    ]
};

export default note;
