import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'data-fetching-and-async-ui',
    title: 'Data fetching and async UI',
    summary: 'Represent each request state in the UI and prevent old responses from replacing newer data.',
    scope: 'react',
    updatedOn: '2026-10-07',
    sections: [
        {
            id: 'request-state',
            title: 'Async work has more than a data value',
            bullets: [
                'A request can be idle, loading, successful, empty, or failed.',
                'Async work finishes later.',
                'Store its current status so the component can display the right UI.',
                'A union type lists allowed state shapes. TypeScript can reject combinations that do not match them.',
                'React uses the current state to choose what appears on screen.',
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
            bullets: [
                'A client component runs in the browser.',
                'It can fetch data when a prop such as a query changes.',
                'An Effect keeps the component data in sync with the query.',
                'A framework data API or client cache may already handle loading, caching, and server rendering.',
                'Use the project\'s existing data layer when it has one.',
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
            bullets: [
                'A new query can start before the old request finishes.',
                'React runs the old Effect\'s cleanup before starting its replacement.',
                'The ignore flag prevents an old response from updating state.',
                'AbortController can cancel requests that support cancellation.',
                'Treat cancellation as an expected result rather than a failure to show the user.',
            ],
        },
        {
            id: 'event-requests',
            title: 'User actions start event-specific requests',
            bullets: [
                'Put a request caused by a submit or button click in that event handler.',
                'Use an Effect when a request needs to stay in sync with the values a component renders with.',
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
            bullets: [
                'A JavaScript promise represents work that may finish later with a value or an error.',
                'TypeScript checks the expected response type in source code.',
                'React does not cancel promises or validate server data.',
                'React displays the loading, success, empty, and error states stored by the component.',
                'Check server data while the code runs when you cannot trust its contents.',
            ],
        },
    ],
};

export default note;
