import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "react-hooks",
    title: "Advanced Hooks reference",
    summary: "IDs, transitions, external data, form submissions, and other advanced Hook uses.",
    scope: "react",
    updatedOn: "2026-10-14",
    inlineCode: true,
    exampleLayout: "grouped",
    sections: [
        {
            id: "learning-order",
            title: "Core Hook lessons and version requirements",
            bullets: [
                "The table below lists the separate lessons for core Hooks.",
                "The examples on this page use TypeScript.",
                "Version labels show the minimum React version.",
                "The React DOM and TypeScript type packages must match that version."
            ],
            table: {
                columns: [
                    "Hook or API",
                    "Main lesson"
                ],
                rows: [
                    [
                        "`useState`",
                        "State and queued updates"
                    ],
                    [
                        "`useEffect`",
                        "Effects and cleanup"
                    ],
                    [
                        "`useRef`",
                        "Refs and DOM access"
                    ],
                    [
                        "`useReducer`",
                        "Reducers and actions"
                    ],
                    [
                        "`useContext`",
                        "Context and providers"
                    ],
                    [
                        "Custom Hooks",
                        "Custom Hooks"
                    ],
                    [
                        "`useMemo` / `useCallback` / `memo`",
                        "Rendering performance"
                    ]
                ]
            }
        },
        {
            id: "use-id",
            title: "Input IDs",
            bullets: [
                "`useId` creates an ID for connections between elements, such as an input and its label.",
                "`useId` is for element connections.",
                "List keys and saved record IDs must come from your data.",
                "When a server produces the initial HTML, the browser must render the same component tree so the IDs match."
            ],
            examples: [
                {
                    title: "Field label and instruction IDs",
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
                        "Each repeated email input has its own label and help text."
                    ],
                    explanation: [
                        "`htmlFor={id}` connects the label to its input.",
                        "`helpId` uses the same generated ID with a suffix, so `aria-describedby` identifies this field’s help text.",
                        "Repeating `EmailField` creates separate linked IDs for each field."
                    ]
                }
            ]
        },
        {
            id: "use-transition",
            title: "Transitions",
            bullets: [
                "A transition is a state update whose rendering React can pause to handle typing or clicks first.",
                "`useTransition` returns `isPending` and `startTransition`.",
                "`isPending` is `true` while the transition is running.",
                "`startTransition` receives a function and marks its state updates as transitions.",
                "Input state updates directly.",
                "The slower view update runs as a transition.",
                "`startTransition` calls its function immediately.",
                "It does not run JavaScript on another thread, so a long calculation inside that function still blocks the page."
            ],
            examples: [
                {
                    title: "Analytics transition and pending indicator",
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
                    result: "Choosing Returns selects that button immediately. The old list can remain visible with “Updating view...” until the new list is ready.",
                    description: [
                        "The selected button updates immediately while React prepares a large list.",
                        "The `sales` and `returns` arrays must keep the same references until their data changes."
                    ],
                    explanation: [
                        "`choose` updates `selected` directly and wraps `setView` in `startTransition`.",
                        "React can show the selected button before finishing the new list.",
                        "`memo` lets `AnalyticsRows` skip rendering when it receives the same `rows` array.",
                        "This example works in React 18.",
                        "A fast list update may finish before the pending indicator is visible."
                    ]
                }
            ]
        },
        {
            id: "use-deferred-value",
            title: "Deferred values",
            bullets: [
                "`useDeferredValue` returns a value that can lag behind its input.",
                "A slow result list can keep showing the previous `query` while the input shows the latest text.",
                "There is no fixed delay.",
                "This Hook does not reduce the number of network requests."
            ],
            examples: [
                {
                    title: "Deferred search results",
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
                    result: "The input shows the latest typed text. Results can briefly match the previous text, then update to the latest query.",
                    description: [
                        "Typed text appears immediately while React prepares a large result list.",
                        "The `products` array must keep the same reference until its data changes."
                    ],
                    explanation: [
                        "`query` controls the input immediately.",
                        "`Results` receives `deferredQuery`, so it can keep showing the previous list while React prepares the next one.",
                        "`query !== deferredQuery` sets `stale` and displays Updating results.",
                        "`memo` lets `Results` skip rendering while `products` and `deferredQuery` are unchanged."
                    ]
                }
            ]
        },
        {
            id: "use-sync-external-store",
            title: "External store subscriptions",
            bullets: [
                "`useSyncExternalStore` reads data stored outside React and updates the component when that data changes.",
                "A snapshot is the current value of that data.",
                "`subscribe` registers a change listener.",
                "It must return a function that removes the listener.",
                "`getSnapshot` reads the current value.",
                "`getSnapshot` must return the same value while the data is unchanged.",
                "If it returns an object, that object must stay the same until the data changes.",
                "The same `subscribe` function between renders avoids removing and adding the listener again.",
                "Server rendering requires `getServerSnapshot`.",
                "It must return the same initial value on the server and when React first connects to that HTML in the browser."
            ],
            examples: [
                {
                    title: "Browser connection status",
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
                        "The component displays browser connection status and unsubscribes when removed."
                    ],
                    explanation: [
                        "`subscribe` registers `notify` for `online` and `offline` events.",
                        "Cleanup removes those exact listeners.",
                        "`getSnapshot` reads `navigator.onLine`.",
                        "This browser report does not prove that the application’s API is reachable.",
                        "`getServerSnapshot` returns `true` on the server and when React first connects to the server HTML in the browser.",
                        "React then checks `navigator.onLine` for the browser’s actual value."
                    ]
                }
            ]
        },
        {
            id: "use-layout-effect",
            title: "Layout Effects",
            bullets: [
                "`useLayoutEffect` runs after React updates the page’s HTML elements, but before the browser displays that update.",
                "A measurement and state update inside it can correct an element’s position before the user sees it.",
                "The browser waits for this work before displaying the update.",
                "It uses the same dependency and cleanup rules as `useEffect`.",
                "It does not run on the server."
            ],
            examples: [
                {
                    title: "Notice measurement and message position",
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
                    result: "The browser shows the message below the notice. Changing text causes another measurement before the browser displays the update.",
                    description: [
                        "The notice’s measured height determines the support message position."
                    ],
                    explanation: [
                        "`getBoundingClientRect().height` reads the notice’s height in pixels.",
                        "`setHeight` updates the support message’s top position before the browser displays it.",
                        "The dependency list remeasures when `text` changes.",
                        "Resize or font changes need additional observation if they can change the height.",
                        "Server rendering cannot measure the notice.",
                        "This component requires browser rendering or a server version that needs no measurements."
                    ]
                }
            ]
        },
        {
            id: "use-imperative-handle",
            title: "Methods exposed through refs",
            bullets: [
                "`useImperativeHandle` controls the methods exposed through a component ref.",
                "The parent receives the methods you return, such as `focus`, instead of the child’s full HTML element.",
                "React 18 passes refs to function components through `forwardRef`.",
                "React 19 also supports ref as a prop."
            ],
            examples: [
                {
                    title: "Input focus method",
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
                        "The parent can focus a child field without access to its full DOM element."
                    ],
                    explanation: [
                        "`forwardRef`’s first type argument is `AddressHandle` and its second describes the `label` prop.",
                        "The parent’s ref receives only the `focus` method.",
                        "The child retains its DOM node in `inputRef`.",
                        "The exposed method calls `focus` on that node when it is attached.",
                        "The returned `focus` method uses only `inputRef`, whose object stays the same between renders.",
                        "No changing prop or state value is used, so the dependency array is empty."
                    ]
                }
            ]
        },
        {
            id: "use-debug-value",
            title: "Hook debug labels",
            bullets: [
                "`useDebugValue` adds a label to a custom Hook in React DevTools, the browser tool for inspecting React components.",
                "It does not change the page."
            ],
            examples: [
                {
                    title: "Password field debug label",
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
                    result: "The page displays a password input. React DevTools shows Empty or Filled beside its custom Hook.",
                    description: [
                        "The password-field Hook has an Empty or Filled label.",
                        "The `password` itself does not appear in the debug label."
                    ],
                    explanation: [
                        "The `password` state controls the input.",
                        "The debug label uses only its `length` to choose Empty or Filled."
                    ]
                }
            ]
        },
        {
            id: "use-insertion-effect",
            title: "CSS insertion Effects",
            bullets: [
                "CSS-in-JS libraries generate CSS from JavaScript.",
                "They use `useInsertionEffect` to insert CSS before components measure layout in `useLayoutEffect`.",
                "This Hook cannot update state.",
                "Element refs are not attached yet, and React may run this Hook before or after updating the HTML elements.",
                "This Hook does not run on the server."
            ],
            examples: [
                {
                    title: "Widget CSS rule",
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
                    result: "The widget’s CSS is available before useLayoutEffect runs. Removing the widget removes its style element.",
                    description: [
                        "A style element supplies the widget’s CSS.",
                        "Cleanup removes it when the widget is removed."
                    ],
                    explanation: [
                        "The Hook creates a style element with the supplied rule and appends it to `document.head`.",
                        "Cleanup removes that same element.",
                        "Each call creates a separate style element.",
                        "This example does not share rules between widgets or generate CSS on the server."
                    ]
                }
            ]
        },
        {
            id: "use-action-state",
            title: "Form Action state (React 19+)",
            bullets: [
                "An Action is a function React runs as part of a transition or form submission.",
                "It can wait for a request to finish.",
                "`useActionState` returns the latest result, a function that starts the Action, and a boolean that is `true` while the Action is running.",
                "The Action receives previous state first and its submitted argument second.",
                "The returned function can be passed to a form’s `action` prop.",
                "A direct call from an event handler must run inside `startTransition`.",
                "After a form Action finishes without throwing, React resets inputs whose values are not controlled by state.",
                "This also happens when the Action returns an error message."
            ],
            examples: [
                {
                    title: "Newsletter submission result",
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
                        "The form submits a newsletter email and displays the result.",
                        "The example requires `subscribeEmail` as an `async` operation that saves the email or rejects."
                    ],
                    explanation: [
                        "`submitAction` receives the form’s fields as `FormData`.",
                        "`data.get(\"email\")` reads the email field.",
                        "`_previous` is the required first parameter, which this example does not use.",
                        "`await subscribeEmail(email)` waits for the save.",
                        "The Action returns a success message when it finishes, or a retry message if it throws.",
                        "The email field has no `value` prop, so React resets it when the Action finishes without throwing.",
                        "`catch` returns a message, so a failed save can also reset the field."
                    ]
                }
            ]
        },
        {
            id: "use-form-status",
            title: "Form submission status (React 19+)",
            bullets: [
                "`useFormStatus` comes from `react-dom`.",
                "It reads the submission state of the nearest parent form.",
                "The component calling it must be inside that form.",
                "It cannot observe a form returned by the same component.",
                "`pending` is `true` while the form submits.",
                "`data` contains the submitted `FormData`, or `null` when no submission is running.",
                "`method` is the submission method.",
                "`action` is the function passed to the form’s `action` prop, or `null` when that prop is not a function."
            ],
            examples: [
                {
                    title: "Reusable submit button",
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
                        "The reusable child button is disabled while its parent form saves a name.",
                        "The example requires `saveName` as an `async` operation."
                    ],
                    explanation: [
                        "`SaveButton` is rendered inside the form, so `pending` tracks that form’s Action and disables its submit button.",
                        "`useActionState` stores the returned message in `DisplayNameForm`.",
                        "`SaveButton` reads submission progress without a `pending` prop.",
                        "The name field has no `value` prop.",
                        "It can reset after a failed save because `catch` returns a message instead of throwing."
                    ]
                }
            ]
        },
        {
            id: "use-optimistic",
            title: "Optimistic state (React 19+)",
            bullets: [
                "Optimistic UI shows an expected result while the actual operation is pending.",
                "`useOptimistic` returns a temporary version of the supplied state and a function to update it during an Action.",
                "The original state needs the confirmed result when the request succeeds.",
                "The Hook does not send a request or retry failures."
            ],
            examples: [
                {
                    title: "Optimistic task completion",
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
                        "The task appears complete while saving.",
                        "The example requires `saveCompleted` to return the confirmed boolean or reject."
                    ],
                    explanation: [
                        "`completed` is confirmed state.",
                        "`markOptimistic(true)` runs inside `runAction` and temporarily displays Completed while `saveCompleted` is pending.",
                        "The update function uses the requested boolean directly.",
                        "The `async` Action wraps `setCompleted` in another `startTransition` after `await`.",
                        "If saving succeeds, `setCompleted` stores the confirmed result.",
                        "If it fails, `completed` remains `false`.",
                        "The row returns to Open and displays the error."
                    ]
                }
            ]
        },
        {
            id: "use-effect-event",
            title: "Effect Events (React 19.2+)",
            bullets: [
                "`useEffectEvent` creates a function called an Effect Event.",
                "It reads the latest committed props and state.",
                "An Effect Event can read updated values in a timer callback without restarting the Effect.",
                "Values that should restart the Effect still belong in its dependency array.",
                "An Effect Event must not serve as a button handler or be passed to another component or Hook.",
                "The Effect Event function must not appear in the dependency array."
            ],
            examples: [
                {
                    title: "Reporting timer and current currency",
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
                        "Each tick of the running timer reports the latest `currency`.",
                        "`intervalMs` is measured in milliseconds."
                    ],
                    explanation: [
                        "`onHeartbeat` reads the latest committed `currency`.",
                        "Changing `currency` changes the next report without replacing the timer.",
                        "`intervalMs` controls the timer period and remains in the dependency array.",
                        "Cleanup clears the previous interval before a new period starts.",
                        "If `currency` changes should restart the external process, `currency` belongs in the Effect and its dependency array."
                    ]
                }
            ]
        },
        {
            id: "use-api",
            title: "Promise results and context (React 19+)",
            bullets: [
                "`use` reads a `Promise` result or context value during rendering.",
                "If the `Promise` is still waiting, React pauses rendering this component.",
                "A surrounding `Suspense` component displays its fallback until the result is ready.",
                "If the `Promise` fails, an Error Boundary can display an error message.",
                "`Suspense` only handles waiting, not errors.",
                "The same `Promise` must remain available between renders, for example from a data loader or cache.",
                "Unlike other Hooks, `use` can be called inside conditions and loops.",
                "An Error Boundary is a parent component that displays alternative content when a child fails during rendering.",
                "`use` must not be wrapped in `try/catch`."
            ],
            examples: [
                {
                    title: "Profile Promise from the caller",
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
                        "The caller supplies a stable `Promise` for the profile.",
                        "The example requires an Error Boundary above `AccountPage` to handle rejection."
                    ],
                    explanation: [
                        "`ProfileCard` reads the supplied `profilePromise` and displays `profile.displayName` after it resolves.",
                        "`AccountPage`’s `Suspense` fallback supplies the loading text.",
                        "`profilePromise` must stay the same until the requested profile changes.",
                        "Creating a new `fetch` `Promise` each time `ProfileCard` renders can make React keep waiting on a new request."
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
