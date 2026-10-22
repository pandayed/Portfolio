import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "data-fetching-and-async-ui",
    title: "Data fetching and async UI",
    summary: "Request states, data fetching, and old responses.",
    scope: "react",
    updatedOn: "2026-10-14",
    inlineCode: true,
    exampleLayout: "grouped",
    sections: [
        {
            id: "request-state",
            title: "Request states",
            bullets: [
                "A request can be idle, loading, successful, or failed.",
                "Each state determines what the UI displays.",
                "An `async` function returns a `Promise`.",
                "An Effect’s setup function must return a cleanup function or no value.",
                "The `async` request runs in a separate function called from setup."
            ]
        },
        {
            id: "fetch-in-effect",
            title: "Requests in Effects",
            bullets: [
                "An Effect can request data that depends on a prop.",
                "Its cleanup marks the old request inactive and can abort it.",
                "An earlier response can arrive after a later response.",
                "Ignoring inactive results prevents them from replacing the current data.",
                "Aborting requests avoids unnecessary client work.",
                "It does not guarantee that the server stopped its work."
            ],
            examples: [
                {
                    title: "Users for the current query",
                    description: [
                        "The example requires `/api/users?q=...` to return an array of objects with string `id` and `name` properties.",
                        "The component receives `query` from its parent."
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
                        "`[query]` starts a new request when `query` changes.",
                        "Cleanup marks the old request inactive and asks the browser to cancel it.",
                        "Both success and failure check `active` before updating state.",
                        "The `query` check shows Loading users... if the stored result belongs to an older `query`.",
                        "`response.ok` detects HTTP errors.",
                        "The array and property checks reject data that does not match the expected user format."
                    ]
                }
            ]
        },
        {
            id: "event-requests",
            title: "Requests in submit handlers",
            bullets: [
                "Submitting a form should start the save in its submit handler.",
                "An Effect is not needed to detect that submission."
            ],
            examples: [
                {
                    title: "Display name submission",
                    description: [
                        "The example requires a `saveName` callback that returns a `Promise`.",
                        "Local state reports the outcome."
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
                        "`saveName` performs the save.",
                        "`pending` disables the button while it runs, and `message` displays success or failure.",
                        "`finally` clears `pending` after either outcome, so the button becomes available again."
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
