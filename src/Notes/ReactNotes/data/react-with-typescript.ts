import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "react-with-typescript",
    title: "React with TypeScript",
    summary: "Types for props, state, event handlers, refs, reducers, and context.",
    scope: "react",
    updatedOn: "2026-10-14",
    inlineCode: true,
    exampleLayout: "grouped",
    sections: [
        {
            id: "tsx-checks-jsx",
            title: "Component prop types",
            bullets: [
                "A `.tsx` file contains TypeScript with JSX.",
                "The TypeScript lessons on object types, unions, and generics are prerequisites.",
                "A `type` or `interface` describes the props object.",
                "An optional property allows a prop to be omitted.",
                "`ReactNode` describes any renderable content in `children`.",
                "A function type describes a callback prop.",
                "Types check the source before it runs.",
                "They do not change React rendering or validate data received from a server."
            ],
            examples: [
                {
                    title: "Panel props and callback types",
                    description: [
                        "The reusable panel has typed `children` and a callback prop."
                    ],
                    language: "tsx",
                    code: `import type { ReactNode } from 'react';

type PanelProps = {
    title: string;
    tone?: 'info' | 'warning';
    children: ReactNode;
    onSave: () => void;
};

function Panel({ title, tone = 'info', children, onSave }: PanelProps) {
    return <section data-tone={tone}>
        <h2>{title}</h2>
        {children}
        <button onClick={onSave}>Save</button>
    </section>;
}

export default function App() {
    return <Panel title="Account" onSave={() => alert('Saved')}>
        <p>Profile details</p>
    </Panel>;
}`,
                    result: "The panel shows Account, Profile details, and Save. Clicking Save shows an alert.",
                    explanation: [
                        "`children` accepts the paragraph.",
                        "`onSave` requires a function.",
                        "`tone` accepts the two listed strings or omission."
                    ],
                    typeCheck: "`title={4}`, `tone=\"urgent\"`, or an omitted `onSave` each violates `PanelProps`."
                }
            ]
        },
        {
            id: "state-types",
            title: "Explicit state types",
            bullets: [
                "`useState` can infer a type from a suitable initial value.",
                "`useState(0)` stores numbers.",
                "An explicit type argument can describe a union, a nullable value, or an empty array whose element type cannot be inferred.",
                "A discriminated union can model valid request states without allowing success data on an error state."
            ],
            examples: [
                {
                    title: "Selection and request state types",
                    description: [
                        "The component uses TypeScript unions and narrowing for its state."
                    ],
                    language: "tsx",
                    code: `import { useState } from 'react';

type User = { id: string; name: string };
type RequestState =
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success'; users: User[] }
    | { status: 'error'; message: string };

export default function UserPicker() {
    const [selected, setSelected] = useState<User | null>(null);
    const [request, setRequest] = useState<RequestState>({ status: 'idle' });
    function showSample() {
        setRequest({ status: 'success', users: [{ id: 'mira', name: 'Mira' }] });
    }
    return <>
        <button onClick={showSample}>Show sample users</button>
        {request.status === 'success' && request.users.map(user =>
            <button key={user.id} onClick={() => setSelected(user)}>{user.name}</button>
        )}
        {request.status === 'error' && <p role="alert">{request.message}</p>}
        <p>Selected: {selected?.name ?? 'None'}</p>
    </>;
}`,
                    result: "Show sample users displays Mira. Selecting Mira changes Selected: None to Selected: Mira.",
                    explanation: [
                        "The status check narrows `request` before reading `users`.",
                        "The initial `selected` value is `null`, but the explicit union also permits a `User`.",
                        "No request is sent by this sample."
                    ],
                    typeCheck: "`setRequest({ status: \"success\" })` fails because success requires `users`. Reading `request.users` before narrowing also fails."
                }
            ]
        },
        {
            id: "event-and-ref-types",
            title: "Handler and DOM ref types",
            bullets: [
                "Inline JSX handlers normally infer their event type.",
                "An extracted handler may need an explicit React event type.",
                "The handler uses a React event type and a browser element type.",
                "`currentTarget` is the element carrying the handler.",
                "DOM refs start at `null`.",
                "The ref type includes its element type.",
                "`current` needs a `null` check before access."
            ],
            examples: [
                {
                    title: "Form handler types",
                    description: [
                        "The example uses a typed DOM ref for focus and typed handlers for changes and submission."
                    ],
                    language: "tsx",
                    code: `import { useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

export default function NameForm() {
    const [name, setName] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    function change(event: ChangeEvent<HTMLInputElement>) {
        setName(event.currentTarget.value);
    }
    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        alert(name);
    }
    return <form onSubmit={submit}>
        <label>Name <input ref={inputRef} value={name} onChange={change} /></label>
        <button type="button" onClick={() => inputRef.current?.focus()}>Edit</button>
        <button type="submit">Save</button>
    </form>;
}`,
                    result: "Edit focuses the input. Save displays the current name without form navigation.",
                    explanation: [
                        "`ChangeEvent` describes the input change.",
                        "`FormEvent` describes form submission.",
                        "The ref may be `null` before attachment or after removal."
                    ]
                }
            ]
        },
        {
            id: "reducer-and-context-types",
            title: "Action and context types",
            bullets: [
                "A union of action objects lets a reducer narrow `action` by `action.type`.",
                "An explicit type argument for `createContext` can include `null` when a provider is required.",
                "A required context needs a `null` check before use.",
                "A custom Hook can own this check."
            ],
            examples: [
                {
                    title: "Required booking context types",
                    description: [
                        "A provider supplies reducer state and `dispatch`.",
                        "A child reads them through a checked custom Hook."
                    ],
                    language: "tsx",
                    code: `import { createContext, useContext, useReducer } from 'react';
import type { Dispatch } from 'react';

type State = { guests: number };
type Action = { type: 'added' } | { type: 'reset' };
type BookingValue = { state: State; dispatch: Dispatch<Action> };
const BookingContext = createContext<BookingValue | null>(null);

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'added': return { guests: state.guests + 1 };
        case 'reset': return { guests: 1 };
    }
}
function useBooking() {
    const value = useContext(BookingContext);
    if (value === null) throw new Error('Booking provider is required');
    return value;
}
function GuestCount() {
    const { state, dispatch } = useBooking();
    return <button onClick={() => dispatch({ type: 'added' })}>
        Guests: {state.guests}
    </button>;
}
export default function Booking() {
    const [state, dispatch] = useReducer(reducer, { guests: 1 });
    return <BookingContext.Provider value={{ state, dispatch }}>
        <GuestCount />
    </BookingContext.Provider>;
}`,
                    result: "The button begins at Guests: 1 and adds one per click.",
                    explanation: [
                        "`Action` narrows by its `type` property.",
                        "`useBooking` rejects a missing provider instead of letting a `null` value reach the child."
                    ],
                    typeCheck: "`dispatch({ type: \"removed\" })` fails because `Action` does not contain that action."
                }
            ]
        }
    ],
    references: [
        {
            title: "React: Using TypeScript",
            href: "https://react.dev/learn/typescript"
        }
    ]
};

export default note;
