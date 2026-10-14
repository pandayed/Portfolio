import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "sharing-and-resetting-state",
    title: "Sharing and resetting state",
    summary: "Move shared state to a common parent and use identity to control resets.",
    scope: "react",
    updatedOn: "2026-10-14",
    exampleLayout: "grouped",
    sections: [
        {
            id: "single-owner",
            title: "Lift shared state to a common parent",
            bullets: [
                "When two components must stay in sync, keep their shared value in their closest common parent.",
                "The parent passes the value and an update callback through props. Each value has one owner.",
                "Calculate derived values while rendering. Do not store a second copy that must be kept in sync."
            ],
            examples: [
                {
                    title: "Use one filter across two fields",
                    description: [
                        "Let either field edit the same search text."
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
                        "SearchPage owns query. hasQuery is calculated from query instead of stored separately."
                    ]
                }
            ]
        },
        {
            id: "state-is-local",
            title: "Preserve or reset a component’s state",
            bullets: [
                "React preserves state when the same component type stays at the same position with the same key.",
                "Removing that component or changing its type or key resets its state.",
                "Use a key when changing the selected record should start a fresh form. The key is part of the component’s identity.",
                "Keep component definitions outside other components. A new component function changes its type identity."
            ],
            examples: [
                {
                    title: "Reset a draft when switching recipients",
                    description: [
                        "Start a new draft for each selected recipient."
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
                        "The changed key creates a fresh Draft instance. This pattern resets drafts; it does not save one draft per recipient."
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
