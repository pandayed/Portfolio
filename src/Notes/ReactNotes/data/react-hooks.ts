import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "react-hooks",
    title: "Advanced Hooks reference",
    summary: "Look up advanced Hooks after the core sequence; React 19 APIs have version requirements.",
    scope: "react",
    updatedOn: "2026-10-14",
    exampleLayout: "grouped",
    sections: [
        {
            id: "learning-order",
            title: "Use the focused lessons for core Hooks",
            bullets: [
                "The ordered lessons explain core Hooks once. This page is a lookup for later APIs.",
                "Read React with TypeScript before the typed examples below. Core lessons use JavaScript JSX.",
                "APIs marked React 19+ or React 19.2+ require those versions and matching React DOM and type packages. The site itself uses React 18.",
                "Conventional Hooks follow the call-order rules. The React 19 use API has a documented exception."
            ],
            table: {
                columns: [
                    "Hook or API",
                    "Main lesson"
                ],
                rows: [
                    [
                        "useState",
                        "State and queued updates"
                    ],
                    [
                        "useEffect",
                        "Effects and cleanup"
                    ],
                    [
                        "useRef",
                        "Refs and DOM access"
                    ],
                    [
                        "useReducer",
                        "Reducers and actions"
                    ],
                    [
                        "useContext",
                        "Context and providers"
                    ],
                    [
                        "Custom Hooks",
                        "Custom Hooks"
                    ],
                    [
                        "useMemo / useCallback / memo",
                        "Rendering performance"
                    ]
                ]
            }
        },
        {
            id: "use-id",
            title: "useId: accessible IDs for repeated components",
            bullets: [
                "useId creates an ID for connections between elements, such as an input and its label.",
                "Use data IDs for list keys. Do not use useId for keys or persistent record IDs.",
                "Server-rendered and browser-rendered component trees must match for generated IDs to match."
            ],
            examples: [
                {
                    title: "Connect a field to its label and instructions",
                    language: "tsx",
                    code: `import { useId } from 'react';

export function EmailField() {
    const id = useId();
    const helpId = id + '-help';

    return (
        <div>
            <label htmlFor={id}>Email</label>
            <input id={id} type="email" aria-describedby={helpId} />
            <p id={helpId}>We send the receipt to this address.</p>
        </div>
    );
}`,
                    result: "Each EmailField instance has its own linked IDs. Clicking its label focuses its input, and assistive technology can read the associated help text.",
                    description: [
                        "Connect a repeated email input to its own label and help text."
                    ],
                    explanation: [
                        "htmlFor={id} connects the label to its input. helpId uses the same generated ID with a suffix, so aria-describedby identifies this field’s help text.",
                        "Repeating EmailField creates separate linked IDs for each field."
                    ]
                }
            ]
        },
        {
            id: "use-transition",
            title: "useTransition: let urgent updates go first",
            bullets: [
                "A transition is a state update React can interrupt for an urgent update, such as typing.",
                "useTransition returns a pending flag and a function that marks updates as transitions.",
                "Keep controlled input updates urgent. A transition does not move computation to another thread.",
                "startTransition calls its callback immediately. A long synchronous calculation inside it still blocks JavaScript."
            ],
            examples: [
                {
                    title: "Switch analytics views with a pending indicator",
                    language: "tsx",
                    code: `import { memo, useState, useTransition } from 'react';

type View = 'sales' | 'returns';
type Row = { id: string; label: string };
const AnalyticsRows = memo(function AnalyticsRows({ rows }: { rows: Row[] }) {
    return <ul>{rows.map((row) => <li key={row.id}>{row.label}</li>)}</ul>;
});

export function Analytics({ rows }: { rows: Record<View, Row[]> }) {
    const [selected, setSelected] = useState<View>('sales');
    const [view, setView] = useState<View>('sales');
    const [isPending, startTransition] = useTransition();

    function choose(next: View) {
        setSelected(next);
        startTransition(() => setView(next));
    }

    return (
        <div>
            <button aria-pressed={selected === 'sales'} onClick={() => choose('sales')}>Sales</button>
            <button aria-pressed={selected === 'returns'} onClick={() => choose('returns')}>Returns</button>
            {isPending && <p role="status">Updating view...</p>}
            <AnalyticsRows rows={rows[view]} />
        </div>
    );
}`,
                    result: "Choosing Returns selects that button immediately. While a large list update is pending, the old view can remain visible with “Updating view...”. A fast update may finish before the indicator is noticeable.",
                    description: [
                        "Select an analytics view immediately while a large list render can remain pending. Supply stable sales and returns row arrays."
                    ],
                    explanation: [
                        "choose updates selected immediately and marks the view update as a transition. AnalyticsRows uses memo so the urgent render can reuse the old rows.",
                        "The row arrays must stay stable until their data changes. Creating a new array prevents the unchanged-props check from skipping work.",
                        "The callback is synchronous, so this example supports React 18. A fast list render may finish before the pending indicator is noticeable."
                    ]
                }
            ]
        },
        {
            id: "use-deferred-value",
            title: "useDeferredValue: let a slow view use an older value",
            bullets: [
                "useDeferredValue lets a slower part of the UI use an older value while React prepares its next render.",
                "It does not add a fixed delay or debounce requests. Use memoization when the slow child must skip renders with unchanged inputs."
            ],
            examples: [
                {
                    title: "Keep search typing separate from a large result list",
                    language: "tsx",
                    code: `import { memo, useDeferredValue, useState } from 'react';

type Product = { id: string; name: string };
const Results = memo(function Results({
    products, query,
}: { products: Product[]; query: string }) {
    const matches = products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()));
    return <ul>{matches.map((p) => <li key={p.id}>{p.name}</li>)}</ul>;
});

export function Catalog({ products }: { products: Product[] }) {
    const [query, setQuery] = useState('');
    const deferredQuery = useDeferredValue(query);
    const stale = query !== deferredQuery;

    return (
        <div>
            <label>Search <input value={query} onChange={(e) => setQuery(e.target.value)} /></label>
            {stale && <p role="status">Updating results...</p>}
            <Results products={products} query={deferredQuery} />
        </div>
    );
}`,
                    result: "The input shows the latest typed text. Results can briefly match the previous text, then update to the latest query. memo lets Results skip the urgent render when its props are unchanged.",
                    description: [
                        "Keep typing responsive while a large memoized results list renders the search text. Supply a stable products array."
                    ],
                    explanation: [
                        "query controls the input immediately. Results receives deferredQuery, so it can keep showing the previous list while React prepares the next one.",
                        "query !== deferredQuery sets stale and displays Updating results.",
                        "The products array must stay stable between data changes for memo to skip the urgent render."
                    ]
                }
            ]
        },
        {
            id: "use-sync-external-store",
            title: "useSyncExternalStore: subscribe to data outside React",
            bullets: [
                "useSyncExternalStore reads a snapshot from data stored outside React.",
                "Supply subscribe to register a listener and getSnapshot to read the current value. Subscribe must return cleanup.",
                "Return a stable snapshot while the data is unchanged. Server rendering also needs a matching getServerSnapshot.",
                "Keep subscribe stable between renders to avoid unnecessary resubscription. Hydration connects React to HTML already produced by a server; its initial snapshot must match the server snapshot."
            ],
            examples: [
                {
                    title: "Read browser connection status",
                    language: "tsx",
                    code: `import { useSyncExternalStore } from 'react';

function subscribe(notify: () => void) {
    window.addEventListener('online', notify);
    window.addEventListener('offline', notify);
    return () => {
        window.removeEventListener('online', notify);
        window.removeEventListener('offline', notify);
    };
}
function getSnapshot() { return navigator.onLine; }
function getServerSnapshot() { return true; }

export function ConnectionStatus() {
    const online = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    return <p>{online ? 'Browser reports online' : 'Browser reports offline'}</p>;
}`,
                    result: "The label updates when the browser fires online/offline events. Server rendering uses the chosen true fallback without accessing window or navigator.",
                    description: [
                        "Display browser connection status and unsubscribe when the component is removed."
                    ],
                    explanation: [
                        "subscribe registers notify for online and offline events. Cleanup removes those exact listeners.",
                        "getSnapshot reads navigator.onLine. This browser report does not prove that the application’s API is reachable.",
                        "getServerSnapshot returns true without accessing browser globals. The first browser hydration uses this same fallback, then React checks the browser snapshot."
                    ]
                }
            ]
        },
        {
            id: "use-layout-effect",
            title: "useLayoutEffect: measure before the browser paints",
            bullets: [
                "useLayoutEffect runs after DOM updates and before browser paint.",
                "Use it only when measurement or positioning must finish before the user sees the frame. It blocks painting.",
                "It follows Effect dependencies and cleanup rules and does not run on the server."
            ],
            examples: [
                {
                    title: "Measure a notice before showing its adjacent message",
                    language: "tsx",
                    code: `import { useLayoutEffect, useRef, useState } from 'react';

export function DeliveryNotice({ text }: { text: string }) {
    const noticeRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useLayoutEffect(() => {
        setHeight(noticeRef.current?.getBoundingClientRect().height ?? 0);
    }, [text]);

    return (
        <div style={{ position: 'relative', paddingBottom: 32 }}>
            <div ref={noticeRef}>{text}</div>
            <p style={{ position: 'absolute', top: height, margin: 0 }}>
                Contact support for delivery changes.
            </p>
        </div>
    );
}`,
                    result: "The message is positioned below the measured notice before the client-rendered component paints. Changing text causes another measurement.",
                    description: [
                        "Measure an attached notice before choosing the position of adjacent text."
                    ],
                    explanation: [
                        "getBoundingClientRect().height measures the attached notice in pixels. The state update sets top for the adjacent message before paint.",
                        "The dependency list remeasures when text changes. Resize or font changes need additional observation if they can change the height.",
                        "Normal CSS layout is sufficient for this simple arrangement. The measurement pattern applies when positioning depends on measured geometry.",
                        "Use this measurement-dependent component on the client or provide a suitable server fallback."
                    ]
                }
            ]
        },
        {
            id: "use-imperative-handle",
            title: "useImperativeHandle: expose a small ref API",
            bullets: [
                "useImperativeHandle controls the methods exposed through a component ref.",
                "Prefer props for ordinary data flow. Expose a small imperative API only when needed, such as focus.",
                "React 18 passes refs to function components through forwardRef. React 19 also supports ref as a prop."
            ],
            examples: [
                {
                    title: "Expose only a focus method",
                    language: "tsx",
                    code: `import { forwardRef, useImperativeHandle, useRef } from 'react';

type AddressHandle = { focus: () => void };
const AddressField = forwardRef<AddressHandle, { label: string }>(
    function AddressField({ label }, ref) {
        const inputRef = useRef<HTMLInputElement>(null);
        useImperativeHandle(ref, () => ({
            focus: () => inputRef.current?.focus(),
        }), []);
        return <label>{label} <input ref={inputRef} /></label>;
    },
);

export function AddressForm() {
    const addressRef = useRef<AddressHandle>(null);
    return (
        <div>
            <AddressField ref={addressRef} label="Delivery address" />
            <button onClick={() => addressRef.current?.focus()}>Edit address</button>
        </div>
    );
}`,
                    result: "Clicking Edit address focuses the input. The parent ref provides focus() without exposing the full HTMLInputElement.",
                    description: [
                        "Let a parent focus a child field without exposing its full DOM element."
                    ],
                    explanation: [
                        "forwardRef’s first type argument is AddressHandle and its second describes the label prop. The parent’s ref receives only the focus method.",
                        "The child retains its DOM node in inputRef. The exposed method calls focus on that node when it is attached.",
                        "The handle captures only a stable ref, so its dependency list is empty."
                    ]
                }
            ]
        },
        {
            id: "use-debug-value",
            title: "useDebugValue: label a custom Hook in DevTools",
            bullets: [
                "useDebugValue labels a custom Hook in React DevTools. It does not change the visible UI.",
                "Keep sensitive values out of the label. This does not hide underlying state from developer inspection."
            ],
            examples: [
                {
                    title: "Give a reusable field Hook a debug label",
                    language: "tsx",
                    code: `import { useDebugValue, useState } from 'react';

function usePasswordField() {
    const [password, setPassword] = useState('');
    useDebugValue(password.length === 0 ? 'Empty' : 'Filled');
    return { password, setPassword };
}

export function PasswordField() {
    const { password, setPassword } = usePasswordField();
    return <label>Password <input type="password" value={password}
        onChange={(e) => setPassword(e.target.value)} /></label>;
}`,
                    result: "The page displays a password input. Inspecting its custom Hook in React DevTools shows Empty or Filled. The debug label does not contain the password.",
                    description: [
                        "Label a password-field Hook as Empty or Filled without using the password as a debug label."
                    ],
                    explanation: [
                        "The password state controls the input. The debug label uses only its length to choose Empty or Filled."
                    ]
                }
            ]
        },
        {
            id: "use-insertion-effect",
            title: "useInsertionEffect: inject CSS before layout Effects",
            bullets: [
                "useInsertionEffect is for CSS-in-JS library authors who insert styles before layout Effects run.",
                "Use stylesheets or the project’s styling tools for ordinary application styles.",
                "Do not update state or measure attached refs here. DOM timing is not guaranteed and refs are not attached yet.",
                "This Hook does not run on the server."
            ],
            examples: [
                {
                    title: "A library-owned dynamic CSS rule",
                    language: "tsx",
                    code: `import { useInsertionEffect } from 'react';

function useWidgetRule(rule: string) {
    useInsertionEffect(() => {
        const style = document.createElement('style');
        style.textContent = rule;
        document.head.appendChild(style);
        return () => style.remove();
    }, [rule]);
}

export function CompactWidget() {
    useWidgetRule('.compact-widget { padding: 8px; }');
    return <div className="compact-widget">Delivery details</div>;
}`,
                    result: "The widget’s rule is available before layout Effects run. Unmounting removes this example’s style element.",
                    description: [
                        "Demonstrate one library-owned style rule and remove it when its owner unmounts."
                    ],
                    explanation: [
                        "The Hook creates a style element with the supplied rule and appends it to document.head. Cleanup removes that same element.",
                        "This example owns one style element per Hook call. A complete library also needs shared-rule management and a server-rendering strategy."
                    ]
                }
            ]
        },
        {
            id: "use-action-state",
            title: "useActionState: state from a submitted Action (React 19+)",
            bullets: [
                "React 19+ is required. Matching React DOM and type packages are also required.",
                "An Action is a function used by React for a transition or form submission. It may perform async work.",
                "useActionState returns the last result, an Action dispatcher, and a pending flag.",
                "The Action receives previous state first and its submitted argument second.",
                "A form action supplies the React Action context. A manual dispatch from a handler needs a startTransition wrapper.",
                "React resets uncontrolled form inputs after a form Action fulfills. Returning a failure message still fulfills the Action if it does not throw."
            ],
            examples: [
                {
                    title: "Show the result of a newsletter submission",
                    language: "tsx",
                    code: `import { useActionState } from 'react';

type Props = { subscribeEmail: (email: string) => Promise<void> };

export function Newsletter({ subscribeEmail }: Props) {
    const [message, submitAction, pending] = useActionState(
        async (_previous: string, data: FormData): Promise<string> => {
            const email = String(data.get('email') ?? '').trim();
            if (!email) return 'Enter an email address.';
            try {
                await subscribeEmail(email);
                return 'Subscription saved.';
            } catch {
                return 'Could not subscribe. Try again.';
            }
        },
        '',
    );

    return (
        <form action={submitAction}>
            <label>Email <input name="email" type="email" required /></label>
            <button disabled={pending}>{pending ? 'Saving...' : 'Subscribe'}</button>
            <p role="status">{message}</p>
        </form>
    );
}`,
                    result: "While the supplied operation is pending, the button shows Saving... and is disabled. Success shows “Subscription saved.” Rejection shows the retry message.",
                    description: [
                        "Submit a newsletter email and display the result. Supply subscribeEmail as an async operation that saves the email or rejects."
                    ],
                    explanation: [
                        "The form’s action uses submitAction. data.get(\"email\") reads the field identified by name=\"email\". _previous keeps the required first parameter without using its value.",
                        "subscribeEmail performs the save. Awaiting it completes before the Action returns the success message; rejection reaches catch.",
                        "The email input is uncontrolled. catch returns a retry message instead of throwing, so this Action fulfills and the field can reset even after a failed save."
                    ]
                }
            ]
        },
        {
            id: "use-form-status",
            title: "useFormStatus: pending state of a parent form (React 19+)",
            bullets: [
                "React 19+ is required. Read the preceding Action lesson first.",
                "Import useFormStatus from react-dom. It reads the submission state of the nearest parent form.",
                "The component calling it must be inside that form. It cannot observe a form returned by the same component.",
                "The other returned fields are data, method, and action. They describe the parent form’s submission."
            ],
            examples: [
                {
                    title: "Reuse a submit button across forms",
                    language: "tsx",
                    code: `import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

function SaveButton() {
    const { pending } = useFormStatus();
    return <button type="submit" disabled={pending}>
        {pending ? 'Saving...' : 'Save'}
    </button>;
}

export function DisplayNameForm({ saveName }: {
    saveName: (name: string) => Promise<void>;
}) {
    const [message, saveAction] = useActionState(
        async (_previous: string, data: FormData) => {
            try {
                await saveName(String(data.get('name') ?? ''));
                return 'Name saved.';
            } catch {
                return 'Could not save the name.';
            }
        },
        '',
    );

    return (
        <form action={saveAction}>
            <label>Display name <input name="name" required /></label>
            <SaveButton />
            <p role="status">{message}</p>
        </form>
    );
}`,
                    result: "SaveButton disables itself and shows Saving... while its parent form is submitting. The form displays success or failure after saveName finishes.",
                    description: [
                        "Disable a reusable child button while its parent form saves a name. Supply saveName as an async operation."
                    ],
                    explanation: [
                        "SaveButton is rendered inside the form, so pending tracks that form’s Action and disables its submit button.",
                        "useActionState stores the returned message in DisplayNameForm. SaveButton reads submission progress without a pending prop.",
                        "The uncontrolled name field can reset after failure because catch returns a message and lets the Action fulfill."
                    ]
                }
            ]
        },
        {
            id: "use-optimistic",
            title: "useOptimistic: temporary UI while saving (React 19+)",
            bullets: [
                "React 19+ is required. Read Actions and transitions first.",
                "Optimistic UI shows an expected result while the actual operation is pending.",
                "useOptimistic supplies temporary state during an Action. Update the confirmed base state when the operation succeeds.",
                "The Hook does not send a request or retry failures."
            ],
            examples: [
                {
                    title: "Complete a task before the server responds",
                    language: "tsx",
                    code: `import { startTransition, useOptimistic, useState, useTransition } from 'react';

export function TaskRow({ saveCompleted }: {
    saveCompleted: () => Promise<boolean>;
}) {
    const [completed, setCompleted] = useState(false);
    const [optimistic, markOptimistic] = useOptimistic(
        completed, (_current: boolean, next: boolean) => next,
    );
    const [pending, runAction] = useTransition();
    const [error, setError] = useState('');

    function complete() {
        setError('');
        runAction(async () => {
            markOptimistic(true);
            try {
                const confirmed = await saveCompleted();
                startTransition(() => setCompleted(confirmed));
            } catch {
                setError('Could not complete the task. Try again.');
            }
        });
    }

    return (
        <div>
            <p>{optimistic ? 'Completed' : 'Open'}{pending ? ' (saving...)' : ''}</p>
            <button disabled={pending || completed} onClick={complete}>Complete</button>
            {error && <p role="alert">{error}</p>}
        </div>
    );
}`,
                    result: "Clicking Complete shows “Completed (saving...)” while the Action runs. If saveCompleted resolves true, Completed remains. If it rejects, the row returns to Open and shows the error.",
                    description: [
                        "Show a task as complete while saving. Supply saveCompleted returning the confirmed boolean or rejecting."
                    ],
                    explanation: [
                        "completed is confirmed state. markOptimistic(true) runs inside runAction and temporarily displays Completed while saveCompleted is pending.",
                        "The update function uses the requested boolean directly. The async Action wraps setCompleted in another startTransition after await.",
                        "If saving resolves, setCompleted stores the confirmed result. If it rejects, completed remains false; the row returns to Open and displays the error."
                    ]
                }
            ]
        },
        {
            id: "use-effect-event",
            title: "useEffectEvent: read latest values inside an Effect (React 19.2+)",
            bullets: [
                "React 19.2+ is required. Read Effect dependencies and cleanup first.",
                "An Effect Event reads current committed props and state without making those values restart an Effect.",
                "Use it only for work called from Effects. It does not replace real synchronization dependencies.",
                "Do not use an Effect Event as a button handler or pass it to another component or Hook. Exclude the Effect Event itself from the dependency array."
            ],
            examples: [
                {
                    title: "Keep a reporting timer while reading the latest currency",
                    language: "tsx",
                    code: `import { useEffect, useEffectEvent } from 'react';

export function ReportingSession({ currency, intervalMs }: {
    currency: string;
    intervalMs: number;
}) {
    const onHeartbeat = useEffectEvent(() => {
        console.log('Reporting currency:', currency);
    });

    useEffect(() => {
        const timer = window.setInterval(() => onHeartbeat(), intervalMs);
        return () => window.clearInterval(timer);
    }, [intervalMs]);

    return <p>Reporting in {currency}</p>;
}`,
                    result: "With currency USD and intervalMs 10000, each tick logs “Reporting currency: USD”. After the prop changes to INR, the next tick logs INR without resetting the timer. Changing intervalMs does reset it.",
                    description: [
                        "Keep a timer running while each tick reports the latest currency. intervalMs is measured in milliseconds."
                    ],
                    explanation: [
                        "onHeartbeat reads the latest committed currency when the interval calls it. Changing currency therefore changes the next report without replacing the timer.",
                        "intervalMs controls the timer period and remains in the dependency array. Cleanup clears the previous interval before a new period starts.",
                        "If changing currency should restart the external process instead, read it in the Effect and include it as a dependency."
                    ]
                }
            ]
        },
        {
            id: "use-api",
            title: "Related API: use reads a resource (React 19+)",
            bullets: [
                "React 19+ is required. use reads a Promise or context value during rendering.",
                "A pending Promise suspends the component. A Suspense boundary displays its fallback while waiting.",
                "A rejected Promise reaches an Error Boundary. Suspense itself does not handle that error.",
                "Supply a stable Promise from an appropriate loader or cache. Unlike conventional Hooks, use can appear in conditions and loops.",
                "An Error Boundary is a parent component that displays fallback UI when a child fails during rendering. Do not wrap use in try/catch."
            ],
            examples: [
                {
                    title: "Read a profile Promise supplied by the caller",
                    language: "tsx",
                    code: `import { Suspense, use } from 'react';

type Profile = { displayName: string };

function ProfileCard({ profilePromise }: { profilePromise: Promise<Profile> }) {
    const profile = use(profilePromise);
    return <h2>{profile.displayName}</h2>;
}

export function AccountPage({ profilePromise }: { profilePromise: Promise<Profile> }) {
    return (
        <Suspense fallback={<p>Loading profile...</p>}>
            <ProfileCard profilePromise={profilePromise} />
        </Suspense>
    );
}`,
                    result: "While the Promise is pending, the page shows “Loading profile...”. If it resolves to { displayName: \"Mira\" }, the heading becomes Mira. An Error Boundary above this example must handle a rejected Promise.",
                    description: [
                        "Display a profile from a stable Promise supplied by the caller. Place an Error Boundary above AccountPage to handle rejection."
                    ],
                    explanation: [
                        "ProfileCard reads the supplied profilePromise and displays profile.displayName after it resolves. AccountPage’s Suspense fallback supplies the loading text.",
                        "The caller must keep profilePromise stable and place an Error Boundary above AccountPage. Creating a fresh fetch Promise in ProfileCard on every render can keep restarting suspension."
                    ]
                }
            ]
        }
    ],
    references: [
        {
            title: "Lesson: State and queued updates",
            href: "#/notes/react/state-and-events"
        },
        {
            title: "Lesson: Effects and cleanup",
            href: "#/notes/react/effects-and-cleanup"
        },
        {
            title: "Lesson: Refs and DOM access",
            href: "#/notes/react/refs-context-and-reducers"
        },
        {
            title: "Lesson: Reducers and actions",
            href: "#/notes/react/reducers-and-actions"
        },
        {
            title: "Lesson: Context and providers",
            href: "#/notes/react/context-and-providers"
        },
        {
            title: "Lesson: Custom Hooks",
            href: "#/notes/react/performance-and-custom-hooks"
        },
        {
            title: "Lesson: Rendering performance",
            href: "#/notes/react/rendering-performance"
        },
        {
            title: "React: Hook and API reference",
            href: "https://react.dev/reference/react"
        },
        {
            title: "React: useFormStatus",
            href: "https://react.dev/reference/react-dom/hooks/useFormStatus"
        }
    ]
};

export default note;
