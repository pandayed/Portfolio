import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "data-fetching-and-async-ui",
    title: "Data fetching and async UI",
    summary: "Represent request states and prevent old responses from replacing current data.",
    scope: "react",
    updatedOn: "2026-10-14",
    exampleLayout: "grouped",
    sections: [
        {
            id: "request-state",
            title: "Represent waiting, success, and failure",
            bullets: [
                "A request can be idle, loading, successful, or failed. Represent each state so the UI can choose clear content.",
                "Use async and await inside an async function. An Effect callback itself must return cleanup rather than a Promise.",
                "Check response.ok before reading a fetch response. HTTP failure statuses do not automatically reject fetch.",
                "Validate response data before using it. JSON parsing does not verify the shape of the returned object."
            ]
        },
        {
            id: "fetch-in-effect",
            title: "Fetch data for the current component input",
            bullets: [
                "An Effect can request data that depends on a prop. Its cleanup marks the old request inactive and can abort it.",
                "An earlier response can arrive after a later response. Ignore inactive results so they cannot replace the current data.",
                "Aborting requests avoids unnecessary client work. It does not guarantee that the server stopped its work."
            ],
            examples: [
                {
                    title: "Load users for the current query",
                    description: [
                        "Provide /api/users?q=... returning an array of objects with string id and name properties. The component receives query from its parent."
                    ],
                    language: "jsx",
                    code: `import { useEffect, useState } from 'react';

export default function Users({ query }) {
    const [request, setRequest] = useState({
        query, status: 'loading', users: [], error: '',
    });
    useEffect(() => {
        let active = true;
        const controller = new AbortController();
        setRequest({ query, status: 'loading', users: [], error: '' });
        async function load() {
            try {
                const response = await fetch('/api/users?q=' + encodeURIComponent(query), {
                    signal: controller.signal,
                });
                if (!response.ok) throw new Error('Request failed');
                const users = await response.json();
                if (!Array.isArray(users) || !users.every(user =>
                    user !== null && typeof user === 'object' &&
                    typeof user.id === 'string' && typeof user.name === 'string'
                )) throw new Error('Unexpected response');
                if (active) setRequest({ query, status: 'success', users, error: '' });
            } catch (error) {
                if (active) setRequest({
                    query, status: 'error', users: [],
                    error: error instanceof Error ? error.message : 'Request failed',
                });
            }
        }
        load();
        return () => { active = false; controller.abort(); };
    }, [query]);

    if (request.query !== query || request.status === 'loading') return <p>Loading users...</p>;
    if (request.status === 'error') return <p role="alert">{request.error}</p>;
    if (request.users.length === 0) return <p>No users found.</p>;
    return <ul>{request.users.map(user => <li key={user.id}>{user.name}</li>)}</ul>;
}`,
                    result: "The component shows loading, an error, an empty result, or matching users. A result for an old query cannot replace the current one.",
                    explanation: [
                        "Cleanup marks that request inactive before aborting it. Both success and failure check active before storing state. The query check prevents old data flashing before the new Effect sets loading."
                    ]
                }
            ]
        },
        {
            id: "event-requests",
            title: "Start action-specific requests in a handler",
            bullets: [
                "A save triggered by a submit belongs in the submit handler. It is not synchronization with the displayed component.",
                "Track pending and error state. Disable repeated submission while pending. Catch failures and clear pending in finally.",
                "For a full application, use the framework’s data loader or an appropriate client cache when available. Manual Effects do not provide caching, preloading, or shared request handling."
            ],
            examples: [
                {
                    title: "Save a display name",
                    description: [
                        "Provide saveName as a callback that returns a Promise. This example uses local state to report its outcome."
                    ],
                    language: "jsx",
                    code: `import { useState } from 'react';

export default function NameForm({ saveName }) {
    const [name, setName] = useState('');
    const [pending, setPending] = useState(false);
    const [message, setMessage] = useState('');
    async function submit(event) {
        event.preventDefault();
        if (pending) return;
        setPending(true);
        setMessage('');
        try {
            await saveName(name);
            setMessage('Name saved.');
        } catch {
            setMessage('Could not save. Try again.');
        } finally {
            setPending(false);
        }
    }
    return <form onSubmit={submit}>
        <label>Name <input value={name} onChange={event => setName(event.target.value)} /></label>
        <button disabled={pending}>{pending ? 'Saving...' : 'Save'}</button>
        <p role="status">{message}</p>
    </form>;
}`,
                    result: "The button shows Saving... while the callback is pending. The form then shows success or failure.",
                    explanation: [
                        "saveName performs the save. The component controls its pending and message UI."
                    ]
                }
            ]
        }
    ],
    references: [
        {
            title: "React: Fetching data in Effects",
            href: "https://react.dev/learn/synchronizing-with-effects"
        },
        {
            title: "React: Event work and data fetching",
            href: "https://react.dev/learn/you-might-not-need-an-effect"
        }
    ]
};

export default note;
