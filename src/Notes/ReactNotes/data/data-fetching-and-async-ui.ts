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
                "A request needs a status so the component can display loading, data, or failure.",
                "Async work finishes later. A JavaScript Promise represents its eventual value or failure.",
                "An async function returns a Promise. await waits inside that function while other JavaScript can continue.",
                "Read Effects and cleanup and Asynchronous Programming in JavaScript first. Read Inference, unions, and narrowing for the TypeScript state shapes.",
                "The UsersState union below lists three allowed object shapes. The | symbol means one of those shapes.",
                "The status property identifies each shape. Loading has no users, success has users, and error has a message.",
                "Checking status narrows the type. After the loading and error returns, TypeScript knows state has users.",
                "This request starts immediately, so it has no idle state. An empty users array is a successful response with no matches.",
            ],
            pitfalls: [
                "Reading state.users before checking state.status fails TypeScript checking because the loading and error shapes have no users property.",
                "At runtime, reading state.users.length while users is undefined throws a TypeError at that expression. Return the loading and error views before reading users.",
            ],
            examples: [{
                title: 'Describe request state with a union',
                language: 'tsx',
                code: `type User = { id: string; name: string };

type UsersState =
    | { status: 'loading' }
    | { status: 'success'; users: User[] }
    | { status: 'error'; message: string };

export function UsersView({ state }: { state: UsersState }) {
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
                "useEffect starts a request when UserSearch first appears and whenever query changes.",
                "fetch is a browser function that makes a network request. By default it uses GET, which reads data.",
                "The example expects an API at /api/users?q=... that returns JSON such as [{ \"id\": \"1\", \"name\": \"Mira\" }]. It needs that API to run.",
                "JSON is a text format for values such as objects and arrays. response.json() reads that text and turns it into JavaScript values.",
                "encodeURIComponent(query) encodes query text so spaces, & and other characters do not change the URL structure.",
                "readUsers checks the parsed value before storing it. unknown means the value must be checked before its properties are used.",
                "void loadUsers() starts that function without using its returned Promise. The try/catch inside loadUsers handles request failures.",
                "Array.isArray(value) checks that the response is an array. map runs the item check for each item and returns a new array.",
                "The item check first requires a non-null object. The in operator checks that each required property exists, and typeof checks its string value.",
                "If an item fails, throw new Error(...) exits the helper. The request catch displays that error instead of storing invalid data.",
                "The Effect callback stays synchronous so it can return cleanup. Only the nested loadUsers function is async.",
                "Each setup has its own ignore flag. It starts as false and cleanup changes it to true.",
                "LoadState stores the query alongside the response. currentState hides a previous query's data before the new Effect has run.",
                "A framework data API or client cache may already load and reuse responses. Prefer the existing data layer when a project provides one.",
            ],
            pitfalls: [
                "await fetch(...) can reject on a network failure. A 404 or 500 response normally resolves, so it needs a separate status check.",
                "The exact line if (!response.ok) throw new Error('Could not load users.') creates the example's error for a failed HTTP status.",
                "await response.json() can reject if the body is not valid JSON. That error also reaches catch.",
                "readUsers throws Expected a users array. at its first check if the parsed body is null or an object rather than an array.",
                "The throw new Error('Expected each user to have a string id and name.') line rejects malformed items. Valid items are copied into the returned array.",
                "error instanceof Error checks whether the caught value is an Error object before reading error.message. JavaScript can throw other values too.",
                "Writing const users: User[] = await response.json() without a runtime check does not verify the body. If it is null, users.length later throws a TypeError during rendering. Keep readUsers before setState to catch malformed data during loading.",
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

function readUsers(value: unknown): User[] {
    if (!Array.isArray(value)) throw new Error('Expected a users array.');

    return value.map((item: unknown) => {
        if (
            typeof item !== 'object' || item === null ||
            !('id' in item) || typeof item.id !== 'string' ||
            !('name' in item) || typeof item.name !== 'string'
        ) {
            throw new Error('Expected each user to have a string id and name.');
        }
        return { id: item.id, name: item.name };
    });
}

export function UserSearch({ query }: { query: string }) {
    const [state, setState] = useState<LoadState>({ query, status: 'loading' });

    useEffect(() => {
        let ignore = false;
        setState({ query, status: 'loading' });

        async function loadUsers() {
            try {
                const response = await fetch('/api/users?q=' + encodeURIComponent(query));
                if (!response.ok) throw new Error('Could not load users.');

                const users = readUsers(await response.json());
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
                "A race happens when the result depends on which request finishes first.",
                "Type mi, then mira. The mi request may finish after the mira request.",
                "Before setup for mira, React runs cleanup for mi. That cleanup sets the mi setup's own ignore variable to true.",
                "if (!ignore) setState(...) prevents mi from replacing mira, even when mi finishes last.",
                "The same check guards catch, so an old failed request cannot replace a newer success with an error.",
                "The request still runs. An ignore flag only prevents state updates.",
                "AbortController is a browser object that can cancel a supported request. Pass its signal to fetch and call abort() in cleanup.",
                "Cancellation can reject the fetch Promise with an AbortError. An ignored or cancelled request should not become a visible failure for the new query.",
            ],
        },
        {
            id: 'event-requests',
            title: 'User actions start event-specific requests',
            bullets: [
                "A request caused by Save belongs in the button handler. It should not repeat because the component renders again.",
                "saving controls the button label and disabled state. message stores the result.",
                "This example assumes /api/settings accepts a POST with no body and saves the current server settings. A real form must send the values its API requires.",
                "POST asks a server to process a change. GET, used in the search example, reads data.",
                "The try block sends the request. catch handles its failure. finally runs after either path to clear saving.",
                "aria-live=\"polite\" asks assistive technology to announce message changes when it can do so without interrupting the user.",
            ],
            pitfalls: [
                "The line if (!response.ok) throw new Error('Save failed.') throws after the server returns a failed status. catch then stores Save failed.",
                "A network failure rejects await fetch(...). catch stores that failure message too.",
                "Without setSaving(false) in finally, a failure can leave the button disabled. Cleanup here is a JavaScript finally block, not an Effect cleanup.",
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
                "JavaScript runs fetch, awaits Promises, and catches thrown errors.",
                "TypeScript checks the state shapes in source code. It cannot prove the shape of server JSON.",
                "React rerenders after setState and displays the selected request state.",
                "React does not cancel a Promise. The component must ignore outdated work or use cancellation supplied by the request API.",
                "An Effect handles changing render inputs. An event handler handles the user action that caused a save.",
            ],
        },
    ],
};

export default note;
