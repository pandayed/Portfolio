import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'react-hooks',
    title: 'React Hooks: practical examples',
    summary: 'Use built-in Hooks for state, Effects, refs, forms, and rendering. Reuse state logic with custom Hooks.',
    scope: 'react',
    updatedOn: '2026-10-07',
    sections: [
        {
            id: 'learning-order',
            title: 'Learning order and calling rules',
            bullets: [
                'Start with useState.',
                'It handles everyday UI values such as search text, selected rows, and open dialogs.',
                'The numbered sections give a suggested learning order for typical application work.',
                'This order is approximate.',
                'It is not based on measured usage.',
                'Library Hooks such as useNavigate and useQuery belong to their own libraries.',
                'Most examples work with React 18 or later.',
                'Sections marked React 19+ or React 19.2+ need those versions and matching type packages.',
                'Call Hooks at the top level of a function component or custom Hook, before conditional returns.',
                'Do not call Hooks in loops, conditions, event handlers, or ordinary helper functions.',
                'The use API has a specific exception covered near the end.',
                'Keep rendering, state updaters, reducers, and memo calculations pure.',
                'Pure code returns the same result for the same inputs and does not change anything outside the calculation.',
                'Put user actions in event handlers.',
                'Use Effects to keep a component in sync with an external system.',
                'Reactive values include props, state, and values declared inside the component.',
                'Include the reactive values read by an Effect or memo callback in its dependency list.',
                'React compares dependencies with Object.is.',
                'It does not compare each field inside an object.',
            ],
        },
        {
            id: 'use-state',
            title: '1. useState: values that change the UI',
            bullets: [
                'Use useState for a value the component must remember and display.',
                'It returns the current value and a setter.',
                'Calling the setter schedules a render with the next value.',
                'A product page lets the customer choose a quantity.',
                'The total is calculated from quantity during render.',
                'It does not need separate state or an Effect.',
            ],
            examples: [{
                title: 'Choose a shopping quantity',
                language: 'tsx',
                code: `import { useState } from 'react';

export function QuantityPicker() {
    const [quantity, setQuantity] = useState(1);
    const total = quantity * 25;

    return (
        <div>
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                Remove one
            </button>
            <span>Quantity: {quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)}>Add one</button>
            <p>Total: USD {total}</p>
        </div>
    );
}`,
                result: 'The page starts at “Quantity: 1” and “Total: USD 25”. Clicking Add one twice changes quantity to 3 and total to USD 75. Remove one never lowers quantity below 1.',
            }],
            pitfalls: [
                'Use a functional setter when the next value depends on the previous value.',
                'The current handler still sees its original state after calling the setter.',
                'Replace objects and arrays instead of mutating them: setProfile((p) => ({ ...p, name: newName })).',
                'For expensive initial state, pass a function: useState(() => buildInitialRows()).',
                'React ignores the initial argument on later renders.',
            ],
        },
        {
            id: 'use-effect',
            title: '2. useEffect: synchronize with an external system',
            bullets: [
                'Use useEffect to keep a rendered component in sync with a timer, browser event, connection, or request.',
                'It returns nothing.',
                'Its setup can return a cleanup function.',
                'A delivery page shows how long tracking has been open.',
                'Starting a timer is external work.',
                'Updating elapsed state makes the seconds visible.',
                'A commit applies a render result to the DOM, the browser representation of page elements.',
                'No dependency argument: setup runs after every commit of this component.',
                'An empty array: setup runs when React adds the component to the page (mounts it).',
                'In development Strict Mode, React also runs an extra setup and cleanup cycle to check cleanup.',
                'With a list such as [roomId], cleanup runs for the old values before setup runs for changed values.',
                'Cleanup also runs when React removes the component (unmounts it).',
                'Effects run after a commit and only in the browser.',
                'Paint is when the browser draws the page.',
                'An Effect may run before or after paint, depending on the interaction.',
                'Use useLayoutEffect when a visual correction must happen before paint.',
            ],
            examples: [{
                title: 'Track elapsed seconds without leaving a timer running',
                language: 'tsx',
                code: `import { useEffect, useState } from 'react';

export function TrackingTimer() {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setSeconds((s) => s + 1);
        }, 1000);

        return () => window.clearInterval(timer);
    }, []);

    return <p>Tracking open for {seconds} seconds</p>;
}`,
                result: 'Starts at 0 seconds and increases roughly once per second. Removing the component clears the interval. Browser scheduling can delay ticks, so this is not an accurate clock.',
            }],
            pitfalls: [
                'Do not make the setup callback async.',
                'Put async work inside it and return cleanup normally.',
                'Abort requests or ignore outdated responses when inputs change.',
                'Calculate filtered rows or totals during render.',
                'Handle purchases in the click or submit handler.',
                'Neither needs an Effect just because state changed.',
            ],
        },
        {
            id: 'use-ref',
            title: '3. useRef: DOM access and values outside rendering',
            bullets: [
                'useRef returns an object with a current property that persists between renders.',
                'Changing current does not schedule a render.',
                'Use it for a DOM element or a value such as a timeout ID that does not belong in displayed state.',
                'A support form has a button that moves keyboard focus to the message field.',
            ],
            examples: [{
                title: 'Focus a support message field',
                language: 'tsx',
                code: `import { useRef } from 'react';

export function SupportForm() {
    const messageRef = useRef<HTMLTextAreaElement>(null);

    return (
        <div>
            <label>
                Message
                <textarea ref={messageRef} />
            </label>
            <button onClick={() => messageRef.current?.focus()}>
                Write a message
            </button>
        </div>
    );
}`,
                result: 'Clicking Write a message focuses the textarea. React stores the element in current after mounting and clears it when the element is removed.',
            }],
            pitfalls: [
                'Store visible values in state.',
                'A count held only in a ref will not update the screen when current changes.',
                'Normally read or write refs in handlers or Effects.',
                'Do not use ref mutation during render to calculate visible output.',
            ],
        },
        {
            id: 'use-context',
            title: '4. useContext: read a value from an ancestor',
            bullets: [
                'A context provider supplies a value to components below it.',
                'useContext reads the closest matching provider above the component.',
                'The component updates when the provided value changes.',
                'It returns the provided value, or the createContext default when no provider exists.',
                'Prices in different parts of a checkout use the same selected currency.',
                'Context avoids passing currency through every intermediate component.',
            ],
            examples: [{
                title: 'Share a currency selection',
                language: 'tsx',
                code: `import { createContext, useContext, useState } from 'react';

type Currency = 'USD' | 'INR';
const CurrencyContext = createContext<Currency>('USD');

function PriceLabel() {
    const currency = useContext(CurrencyContext);
    return <p>Selected currency: {currency}</p>;
}

export function Checkout() {
    const [currency, setCurrency] = useState<Currency>('USD');

    return (
        <CurrencyContext.Provider value={currency}>
            <button onClick={() => setCurrency('INR')}>Choose INR</button>
            <PriceLabel />
        </CurrencyContext.Provider>
    );
}`,
                result: 'PriceLabel first shows USD. Clicking Choose INR changes the label to INR. The example does not convert prices.',
            }],
            pitfalls: [
                'The provider must be above the consumer.',
                'A provider returned by the same component does not affect that component’s own useContext call.',
                'Context does not create state by itself.',
                'The provider here owns state with useState.',
                'Consumers update when the context value changes.',
                'A newly created object value can cause updates even when its fields appear unchanged.',
            ],
        },
        {
            id: 'use-reducer',
            title: '5. useReducer: related state updates with named actions',
            bullets: [
                'Use useReducer when several actions update related state and those rules are easier to keep in one function.',
                'It returns the current state and dispatch, a function that sends an action to React.',
                'A reducer returns the next state from the current state and action.',
                'A booking form tracks adults and children, and Reset must update both fields together.',
            ],
            examples: [{
                title: 'Keep booking update rules in a reducer',
                language: 'tsx',
                code: `import { useReducer } from 'react';

type Booking = { adults: number; children: number };
type Action =
    | { type: 'add-adult' }
    | { type: 'add-child' }
    | { type: 'reset' };
const initialBooking: Booking = { adults: 1, children: 0 };

function reducer(state: Booking, action: Action): Booking {
    switch (action.type) {
        case 'add-adult': return { ...state, adults: state.adults + 1 };
        case 'add-child': return { ...state, children: state.children + 1 };
        case 'reset': return initialBooking;
    }
}

export function BookingForm() {
    const [booking, dispatch] = useReducer(reducer, initialBooking);

    return (
        <div>
            <p>{booking.adults} adults, {booking.children} children</p>
            <button onClick={() => dispatch({ type: 'add-adult' })}>Add adult</button>
            <button onClick={() => dispatch({ type: 'add-child' })}>Add child</button>
            <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
        </div>
    );
}`,
                result: 'The form starts at 1 adult and 0 children. Clicking Add child twice gives 1 adult and 2 children. Reset restores both initial values.',
            }],
            pitfalls: [
                'Keep the reducer pure.',
                'Do not fetch data, mutate state, or start timers in it.',
                'A reducer is local state unless you explicitly share it.',
                'Use useState when a few direct setters are easier to read.',
            ],
        },
        {
            id: 'use-memo',
            title: '6. useMemo: cache a calculated value',
            bullets: [
                'useMemo returns the result of a calculation and can reuse it while dependencies stay the same.',
                'Use it when measurement shows that repeating the calculation is slow.',
                'A stable identity means keeping the same value, object, or function between renders.',
                'A cached value can also help a component wrapped in memo skip a render.',
                'A large invoice list computes the total of overdue invoices.',
                'The cached total can be reused when an unrelated page control changes and invoices keep the same identity.',
            ],
            examples: [{
                title: 'Calculate an overdue total',
                language: 'tsx',
                code: `import { useMemo } from 'react';

type Invoice = { id: string; amount: number; overdue: boolean };

export function OverdueTotal({ invoices }: { invoices: Invoice[] }) {
    const total = useMemo(() => {
        return invoices.reduce((sum, invoice) =>
            invoice.overdue ? sum + invoice.amount : sum, 0);
    }, [invoices]);

    return <p>Overdue: USD {total}</p>;
}`,
                result: 'For overdue amounts 40 and 60, the paragraph shows “Overdue: USD 100”. React can reuse the total when the invoices array has the same identity.',
            }],
            pitfalls: [
                'For a small array this calculation is usually cheap.',
                'Keep it as a normal calculation unless measurement supports memoizing it.',
                'A new invoices array makes React recalculate the total.',
                'Changing the contents of the same array can leave a cached result outdated.',
                'Memoization is an optimization, not a correctness guarantee.',
                'React may discard the cache.',
                'Do not use it for side effects.',
            ],
        },
        {
            id: 'use-callback',
            title: '7. useCallback: cache a function definition',
            bullets: [
                'useCallback returns a function whose identity can stay the same until its dependencies change.',
                'It does not run the function or cache its return value.',
                'An appointment picker wrapped in memo receives a selection callback.',
                'Unrelated parent updates should not give it a new callback every time.',
            ],
            examples: [{
                title: 'Keep a callback stable for a memoized child',
                language: 'tsx',
                code: `import { memo, useCallback, useState } from 'react';

const AppointmentPicker = memo(function AppointmentPicker({
    onSelect,
}: { onSelect: (time: string) => void }) {
    return <button onClick={() => onSelect('10:00')}>Choose 10:00</button>;
});

export function BookingPage() {
    const [time, setTime] = useState('Not selected');
    const [notes, setNotes] = useState('');
    const handleSelect = useCallback((nextTime: string) => {
        setTime(nextTime);
    }, []);

    return (
        <div>
            <label>Notes <input value={notes} onChange={(e) => setNotes(e.target.value)} /></label>
            <AppointmentPicker onSelect={handleSelect} />
            <p>Appointment: {time}</p>
        </div>
    );
}`,
                result: 'Typing notes updates the parent with the same onSelect function. The memoized picker can skip that render. Choosing 10:00 updates the appointment text.',
            }],
            pitfalls: [
                'This small picker does not justify optimization by itself.',
                'Use the pattern for a measured slow child.',
                'Include values captured from the render in dependencies.',
                'State setters have stable identity, so this callback needs no changing dependencies.',
                'useCallback alone does not stop a child rendering.',
                'Other changed props, state, or context can still make it render.',
            ],
        },
        {
            id: 'use-id',
            title: '8. useId: accessible IDs for repeated components',
            bullets: [
                'useId returns an ID for connecting related DOM elements.',
                'Each instance gets a separate ID when the component appears several times.',
                'The ID also supports matching markup produced on the server with markup in the browser.',
                'A reusable email field connects its input to a label and help text in both billing and delivery forms.',
            ],
            examples: [{
                title: 'Connect a field to its label and instructions',
                language: 'tsx',
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
                result: 'Each EmailField instance has its own linked IDs. Clicking its label focuses its input, and assistive technology can read the associated help text.',
            }],
            pitfalls: [
                'Do not use useId for list keys.',
                'Keys come from stable data IDs.',
                'Do not depend on the exact generated ID text or use it as a persistent database ID.',
            ],
        },
        {
            id: 'use-transition',
            title: '9. useTransition: let urgent updates go first',
            bullets: [
                'useTransition returns isPending and startTransition.',
                'State updates scheduled in startTransition can render without blocking urgent updates such as typing.',
                'React can interrupt and restart that work.',
                'Switching an analytics view renders many rows.',
                'A transition is a state update React can interrupt for a more urgent update.',
                'The selected button updates immediately.',
                'The slower view changes as a transition.',
            ],
            examples: [{
                title: 'Switch analytics views with a pending indicator',
                language: 'tsx',
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
                result: 'Choosing Returns selects that button immediately. While a large list update is pending, the old view can remain visible with “Updating view...”. A fast update may finish before the indicator is noticeable.',
            }],
            pitfalls: [
                'Do not put the state controlling a text input in a transition.',
                'Keep typing updates urgent.',
                'startTransition calls its callback immediately.',
                'It does not move a long synchronous calculation to a worker or make a request faster.',
                'Keep each rows array stable until its data changes.',
                'The memoized list can then skip the urgent parent render and render the changed rows during the transition.',
                'This example uses React 18-compatible synchronous transitions.',
                'React 19 also supports async Actions.',
                'State updates after await currently need another startTransition wrapper.',
            ],
        },
        {
            id: 'use-deferred-value',
            title: '10. useDeferredValue: let a slow view use an older value',
            bullets: [
                'useDeferredValue returns a version of a value whose update can wait behind urgent rendering.',
                'Use it when you receive or already have a value and want one slow part of the UI to update later.',
                'Typing in a catalog search stays responsive while a large list wrapped in memo updates later.',
                'Unlike useTransition, it does not require wrapping the setter.',
            ],
            examples: [{
                title: 'Keep search typing separate from a large result list',
                language: 'tsx',
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
                result: 'The input shows the latest typed text. Results can briefly match the previous text, then update to the latest query. memo lets Results skip the urgent render when its props are unchanged.',
            }],
            pitfalls: [
                'Deferring has no fixed delay.',
                'Debouncing waits for a set time without new changes before updating a value.',
                'useDeferredValue does not debounce a value or reduce network requests by itself.',
                'Keep the products prop stable when its data has not changed.',
                'Recreating it defeats the child’s ability to skip work.',
            ],
        },
        {
            id: 'use-action-state',
            title: '11. useActionState: state from a submitted Action (React 19+)',
            bullets: [
                'An Action is a function used for a transition or form submission.',
                'It can include work that finishes later.',
                'useActionState returns the last Action result, a dispatch function, and a pending flag.',
                'The pending flag is true while the Action is running.',
                'The Action receives previous state first and the submitted payload second.',
                'It may perform asynchronous work, which finishes later.',
                'A newsletter form displays either a saved message or an error after submission.',
                'The parent application supplies subscribeEmail.',
                'Its Promise resolves on success, which means it finishes successfully.',
                'Its Promise rejects on failure, which means it finishes with an error.',
            ],
            examples: [{
                title: 'Show the result of a newsletter submission',
                language: 'tsx',
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
                result: 'While the supplied operation is pending, the button shows Saving... and is disabled. Success shows “Subscription saved.” Rejection shows the retry message.',
            }],
            pitfalls: [
                'The form action prop runs dispatch in an Action context.',
                'For manual dispatch from a handler, wrap it in startTransition.',
                'The first argument is previous state, not FormData.',
                'Forgetting it shifts the arguments.',
                'The Hook calls the operation supplied by the application.',
                'That operation must save and validate the data.',
            ],
        },
        {
            id: 'use-form-status',
            title: '12. useFormStatus: pending state of a parent form (React 19+)',
            bullets: [
                'Import useFormStatus from react-dom.',
                'It returns pending, data, method, and action for the closest parent form.',
                'Use it when a reusable submit button needs the form status without receiving pending as a prop.',
                'Multiple settings forms share the same Save button.',
                'The button must live in a child component inside the form it observes.',
            ],
            examples: [{
                title: 'Reuse a submit button across forms',
                language: 'tsx',
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
                result: 'SaveButton disables itself and shows Saving... while its parent form is submitting. The form displays success or failure after saveName finishes.',
            }],
            pitfalls: [
                'Calling useFormStatus in the component that returns the form does not observe that form.',
                'It observes a form above the component.',
                'useFormStatus does not track requests or forms elsewhere on the page.',
                'useActionState keeps the Action result. useFormStatus reads the parent form status.',
            ],
        },
        {
            id: 'use-optimistic',
            title: '13. useOptimistic: temporary UI while saving (React 19+)',
            bullets: [
                'useOptimistic returns a temporary version of a base value and a setter for it.',
                'While an Action is pending, the UI can show the expected result before the operation finishes.',
                'Afterward it shows the current base value.',
                'A task appears completed as soon as the user clicks Complete.',
                'A successful save updates confirmed state.',
                'Failure leaves confirmed state unchanged and displays an error.',
            ],
            examples: [{
                title: 'Complete a task before the server responds',
                language: 'tsx',
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
                result: 'Clicking Complete shows “Completed (saving...)” while the Action runs. If saveCompleted resolves true, Completed remains. If it rejects, the row returns to Open and shows the error.',
            }],
            pitfalls: [
                'Call the optimistic setter inside an Action.',
                'Here runAction provides that context.',
                'Optimistic UI is temporary.',
                'Update the confirmed base value after success or the UI returns to the old value.',
                'The Hook does not save data, retry, or resolve conflicting writes.',
                'The application still handles those operations.',
            ],
        },
        {
            id: 'use-sync-external-store',
            title: '14. useSyncExternalStore: subscribe to data outside React',
            bullets: [
                'useSyncExternalStore reads data stored outside React.',
                'subscribe registers a callback to report changes and returns cleanup.',
                'getSnapshot reads the current data value, called a snapshot.',
                'The optional getServerSnapshot supplies the value during server rendering and initial hydration.',
                'Hydration is when React connects to HTML that the server already produced.',
                'It returns the current snapshot and updates the component when the external source reports a change.',
                'A browser connectivity indicator reads navigator.onLine and listens to online/offline events.',
                'The boolean snapshot stays the same until that browser value changes.',
            ],
            examples: [{
                title: 'Read browser connection status',
                language: 'tsx',
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
                result: 'The label updates when the browser fires online/offline events. Server rendering uses the chosen true fallback without accessing window or navigator.',
            }],
            pitfalls: [
                'Browser online status does not prove that your API is reachable.',
                'For object snapshots, return the same immutable object until the data changes.',
                'Returning a new object on every read can cause repeated rendering.',
                'Keep the same subscribe function between renders to avoid subscribing again.',
                'The server snapshot must match the snapshot used during initial hydration.',
            ],
        },
        {
            id: 'use-layout-effect',
            title: '15. useLayoutEffect: measure before the browser paints',
            bullets: [
                'useLayoutEffect runs after React updates the DOM and before the browser paints.',
                'Its setup, dependencies, and cleanup work like useEffect.',
                'Its work and state updates delay paint until they finish.',
                'A client-rendered delivery notice needs its actual height to reserve space above an absolutely positioned message.',
                'The first visible frame should use the measured height.',
            ],
            examples: [{
                title: 'Measure a notice before showing its adjacent message',
                language: 'tsx',
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
                result: 'The message is positioned below the measured notice before the client-rendered component paints. Changing text causes another measurement.',
            }],
            pitfalls: [
                'Prefer normal CSS layout for this simple arrangement.',
                'Measurement is useful when CSS cannot express the required positioning, such as a tooltip placed around viewport boundaries.',
                'This example remeasures on text changes, not every resize or font change.',
                'A resizing widget needs resize observation too.',
                'Layout Effects do not run during server rendering.',
                'Keep measurement-dependent UI client-only or provide an appropriate server fallback.',
            ],
        },
        {
            id: 'use-imperative-handle',
            title: '16. useImperativeHandle: expose a small ref API',
            bullets: [
                'useImperativeHandle controls the value a parent receives through a child ref.',
                'An imperative operation tells an element to act, such as focus() or scroll().',
                'A declarative prop describes the desired UI, such as whether a dialog is open.',
                'Use useImperativeHandle when a prop does not express the action well.',
                'A checkout parent can focus a reusable address field without receiving its entire input DOM node.',
                'This example uses forwardRef for React 18 compatibility.',
                'React 19 also supports ref as a prop.',
            ],
            examples: [{
                title: 'Expose only a focus method',
                language: 'tsx',
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
                result: 'Clicking Edit address focuses the input. The parent ref provides focus() without exposing the full HTMLInputElement.',
            }],
            pitfalls: [
                'Use props for ordinary state such as whether a dialog is open.',
                'Do not expose many setters through a ref.',
                'Include reactive values used to create the handle in its dependency list.',
                'This handle only captures a stable ref.',
            ],
        },
        {
            id: 'use-effect-event',
            title: '17. useEffectEvent: read latest values inside an Effect (React 19.2+)',
            bullets: [
                'useEffectEvent returns an Effect Event function that reads the latest committed props and state when called.',
                'Use it when an event inside an Effect needs those values, but their changes should not restart the external subscription.',
                'A reporting session writes a log entry at a fixed interval.',
                'Changing the display currency changes the next log entry without restarting that interval.',
            ],
            examples: [{
                title: 'Keep a reporting timer while reading the latest currency',
                language: 'tsx',
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
                result: 'With currency USD and intervalMs 10000, each tick logs “Reporting currency: USD”. After the prop changes to INR, the next tick logs INR without resetting the timer. Changing intervalMs does reset it.',
            }],
            pitfalls: [
                'Call Effect Events only from Effects or other Effect Events in the same component.',
                'Do not use them as button handlers or pass them to another component or Hook.',
                'Do not put the Effect Event in the dependency array.',
                'Keep values that should restart synchronization, such as intervalMs, in that array.',
                'Do not use this to hide real dependencies.',
                'If currency should restart the external process, it belongs in the Effect instead.',
            ],
        },
        {
            id: 'use-debug-value',
            title: '18. useDebugValue: label a custom Hook in DevTools',
            bullets: [
                'useDebugValue adds a label for a custom Hook in React DevTools.',
                'It returns nothing and does not change the page.',
                'It is most useful for shared Hooks whose internal state is hard to inspect.',
                'A password field Hook tells a developer whether the field is empty or filled, without putting the password in the debug label.',
            ],
            examples: [{
                title: 'Give a reusable field Hook a debug label',
                language: 'tsx',
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
                result: 'The page displays a password input. Inspecting its custom Hook in React DevTools shows Empty or Filled. The debug label does not contain the password.',
            }],
            pitfalls: [
                'This is debugging metadata, not a logging system or UI label.',
                'Keep sensitive data out of debug labels.',
                'This does not hide the underlying component state from a developer inspecting it.',
            ],
        },
        {
            id: 'use-insertion-effect',
            title: '19. useInsertionEffect: inject CSS before layout Effects',
            bullets: [
                'CSS-in-JS libraries create CSS rules from JavaScript.',
                'useInsertionEffect is mainly for authors of those libraries.',
                'It inserts styles before layout Effects need to measure elements.',
                'Ordinary application code should generally use CSS files or existing styling tools.',
                'A styling library owns a dynamic CSS rule for a widget.',
                'This small demonstration inserts a rule on mount and removes it on cleanup.',
                'A complete styling library also needs to manage shared rules and server rendering.',
            ],
            examples: [{
                title: 'A library-owned dynamic CSS rule',
                language: 'tsx',
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
                result: 'The widget’s rule is available before layout Effects run. Unmounting removes this example’s style element.',
            }],
            pitfalls: [
                'Do not update state or measure attached refs here.',
                'Refs are not attached yet.',
                'It can run before or after DOM updates.',
                'Do not rely on a particular DOM-update moment.',
                'It does not run on the server.',
                'Prefer a stylesheet for this example’s static padding in application code.',
            ],
        },
        {
            id: 'use-api',
            title: 'Related API: use reads a resource (React 19+)',
            bullets: [
                'use is a React API rather than a built-in Hook in the Hook reference.',
                'It reads a Promise or context.',
                'Reading a pending Promise suspends rendering, which means React waits for the value before completing that part of the UI.',
                'Suspense can show loading content during that wait.',
                'An account page receives a stable profile Promise created by a framework or resource loader.',
            ],
            examples: [{
                title: 'Read a profile Promise supplied by the caller',
                language: 'tsx',
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
                result: 'While the Promise is pending, the page shows “Loading profile...”. If it resolves to { displayName: "Mira" }, the heading becomes Mira. An Error Boundary above this example must handle a rejected Promise.',
            }],
            pitfalls: [
                'Do not create a fresh fetch Promise inside ProfileCard on every render.',
                'Use a stable resource supplied by a framework or a compatible cache.',
                'Unlike Hooks, use can be called in conditions and loops.',
                'It still belongs in a component or custom Hook, and cannot be wrapped in try/catch.',
                'An Error Boundary is a component that shows fallback UI when a child fails to render.',
                'Use it to handle rejected resources.',
            ],
        },
        {
            id: 'custom-hooks',
            title: 'Custom Hooks: reuse a complete behavior',
            bullets: [
                'A custom Hook is a function named use followed by a capital letter that calls other Hooks.',
                'It reuses logic that keeps or responds to state and returns values a component needs.',
                'It does not need to return JSX.',
                'Catalog and customer searches both need a value that updates only after the user stops typing for 300 milliseconds.',
                'Extract the timer and cleanup into useDebouncedValue.',
                'The component owns the current query.',
                'The custom Hook owns the delayed copy and the timer cleanup.',
                'A different search component can reuse the same Hook.',
                'Each call has independent state.',
                'Two useDebouncedValue calls do not share their delayed values.',
                'Share state through a common parent, context, or a store when needed.',
                'Debouncing updates a value after a set time without new changes.',
                'useDeferredValue does not use that fixed delay.',
                'It can limit when a query is sent.',
                'This example only displays text.',
                'It makes no requests.',
                'For a request, also handle loading, errors, and outdated responses.',
                'Debouncing alone does not stop an old response from replacing a newer one.',
                'Name a Hook for the behavior it provides, such as useDebouncedValue.',
                'Keep plain calculations as ordinary functions.',
            ],
            examples: [{
                title: 'Debounce a search value with cleanup',
                language: 'tsx',
                code: `import { useEffect, useState } from 'react';

function useDebouncedValue<T>(value: T, delayMs: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(() => value);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setDebouncedValue(() => value);
        }, delayMs);
        return () => window.clearTimeout(timer);
    }, [value, delayMs]);

    return debouncedValue;
}

export function CustomerSearch() {
    const [query, setQuery] = useState('');
    const settledQuery = useDebouncedValue(query, 300);

    return (
        <div>
            <label>Customer <input value={query} onChange={(e) => setQuery(e.target.value)} /></label>
            <p>Settled search: {settledQuery || '(empty)'}</p>
        </div>
    );
}`,
                result: 'Type “Mira” with less than 300 milliseconds between keystrokes: the input changes immediately, while Settled search remains (empty). About 300 milliseconds after the final key, it becomes Mira. A new value cancels the previous timer. Unmounting also clears it.',
            }],
            pitfalls: [
                'Custom Hooks follow the same top-level calling rules as built-in Hooks.',
                'Call the Hook once at the top level, then use its returned value in JSX or an Effect.',
                'For this generic Hook, pass stable objects or primitive values.',
                'Creating a new object every render keeps restarting the delay.',
            ],
        },
    ],
};

export default note;
