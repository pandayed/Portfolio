import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'data-fetching-and-async-ui',
    title: 'Data fetching and async UI',
    summary: 'Represent each request state in the UI and prevent old responses from replacing newer data.',
    scope: 'react',
    updatedOn: '2026-10-03',
    sections: [
        {
            id: 'request-state',
            title: 'Async work has more than a data value',
            paragraphs: [
                'A request can be idle, loading, successful, empty, or failed. Model those states so the component can show a clear result for each one.',
                'TypeScript can make invalid combinations harder to create. React uses the current state to choose what appears on screen.',
            ],
            examples: [{
                title: 'Describe request state with a union',
                language: 'tsx',
                code: `type User = { id: string; name: string };

type UsersState =
    | { status: 'loading' }
    | { status: 'success'; users: User[] }
    | { status: 'error'; message: string };

function UsersView({ state }: { state: UsersState }) {
    if (state.status === 'loading') return <p>Loading users…</p>;
    if (state.status === 'error') return <p role="alert">{state.message}</p>;
    if (state.users.length === 0) return <p>No users found.</p>;

    return <ul>{state.users.map((user) => <li key={user.id}>{user.name}</li>)}</ul>;
}`,
                result: 'The user sees one clear view: a loading message, an error, an empty message, or a list of names.',
            }],
        },
        {
            id: 'fetch-in-effect',
            title: 'Fetch in an Effect when rendering requires external data',
            paragraphs: [
                'A client component can fetch when a prop such as a query changes. The Effect synchronizes the component with the network response.',
                'A framework data API or a client cache may handle loading, caching, and server rendering better. Use the project\'s existing data layer when it has one.',
            ],
            examples: [{
                title: 'Load matching users',
                language: 'tsx',
                code: `import { useEffect, useState } from 'react';

type User = { id: string; name: string };
type LoadState =
    | { query: string; status: 'loading' }
    | { query: string; status: 'success'; users: User[] }
    | { query: string; status: 'error'; message: string };

export function UserSearch({ query }: { query: string }) {
    const [state, setState] = useState<LoadState>({ query, status: 'loading' });

    useEffect(() => {
        let ignore = false;
        setState({ query, status: 'loading' });

        async function loadUsers() {
            try {
                const response = await fetch('/api/users?q=' + encodeURIComponent(query));
                if (!response.ok) throw new Error('Could not load users.');

                const users: User[] = await response.json();
                if (!ignore) setState({ query, status: 'success', users });
            } catch (error) {
                if (!ignore) {
                    const message = error instanceof Error ? error.message : 'Unknown error.';
                    setState({ query, status: 'error', message });
                }
            }
        }

        void loadUsers();
        return () => {
            ignore = true;
        };
    }, [query]);

    const currentState: LoadState = state.query === query
        ? state
        : { query, status: 'loading' };

    if (currentState.status === 'loading') return <p>Loading users…</p>;
    if (currentState.status === 'error') return <p role="alert">{currentState.message}</p>;
    if (currentState.users.length === 0) return <p>No users found.</p>;

    return <ul>{currentState.users.map((user) => <li key={user.id}>{user.name}</li>)}</ul>;
}`,
                result: 'Changing the query shows “Loading users…”. The view then shows names, “No users found.”, or an error message for the latest query.',
            }],
        },
        {
            id: 'stale-results',
            title: 'Cleanup prevents stale results',
            paragraphs: [
                'A new query can start before the old request finishes. React runs the old Effect\'s cleanup before starting the new Effect. The ignore flag stops that old response from updating state.',
                'AbortController can also cancel supported requests. You still need to handle cancellation as an expected outcome rather than showing it as a user-facing failure.',
            ],
        },
        {
            id: 'event-requests',
            title: 'User actions start event-specific requests',
            paragraphs: [
                'A request caused by a specific submit or button click belongs in that event handler. An Effect is for work caused by the component being rendered with particular values.',
            ],
            examples: [{
                title: 'Show progress while saving',
                language: 'tsx',
                code: `import { useState } from 'react';

export function SaveButton() {
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    async function handleSave() {
        setSaving(true);
        setMessage('');

        try {
            const response = await fetch('/api/settings', { method: 'POST' });
            if (!response.ok) throw new Error('Save failed.');
            setMessage('Saved.');
        } catch (error) {
            setMessage(error instanceof Error ? error.message : 'Save failed.');
        } finally {
            setSaving(false);
        }
    }

    return (
        <>
            <button disabled={saving} onClick={() => void handleSave()}>
                {saving ? 'Saving…' : 'Save'}
            </button>
            <p aria-live="polite">{message}</p>
        </>
    );
}`,
                result: 'Clicking “Save” disables the button and changes its label to “Saving…”. The live message then shows “Saved.” or the caught failure message.',
            }],
        },
        {
            id: 'react-versus-promises',
            title: 'Promises and React have separate jobs',
            paragraphs: [
                'JavaScript promises represent future completion. TypeScript checks the expected response shapes in source code. React does not make a promise cancelable or validate server data.',
                'React renders the loading, success, empty, and error states that your component stores. Runtime validation is still needed when server data cannot be trusted.',
            ],
        },
    ],
};

export default note;
