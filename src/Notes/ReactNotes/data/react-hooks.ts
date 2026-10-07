import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'react-hooks',
    title: 'React Hooks reference',
    summary: 'Look up Hook behavior and examples after reading the focused React notes. React 19 APIs are separate optional sections.',
    scope: 'react',
    updatedOn: '2026-10-07',
    sections: [
        {
            id: 'learning-order',
            title: 'Learning order and calling rules',
            bullets: [
                "A Hook is a React function that lets a component use state or other React features.",
                "Read Hooks and their rules before using this reference.",
                "The focused pages teach State and events, Effects and cleanup, Refs, context, and reducers, Data fetching and async UI, and Custom Hooks and performance in order.",
                "This page keeps examples for individual APIs. Read the matching focused page when a term is new.",
                "The main sections work with React 18, which this site uses. Optional React 19 and React 19.2 sections appear after the React 18 APIs.",
                "React 19 examples need React 19, react-dom 19, and matching TypeScript type packages. useEffectEvent needs React 19.2 or later.",
                "Call Hooks at the top level of a component or custom Hook, before conditional returns. Do not call them in loops, conditions, event handlers, or ordinary helpers.",
                "React relies on the same Hook call order on each render. The optional React 19 use API has different calling rules explained in its own section.",
                "Keep rendering pure: calculate output without changing outside data. Event handlers perform user actions. Effects synchronize external work.",
            ],
        },
        {
            id: 'use-state',
            title: 'useState: values that change the UI',
            bullets: [
                "useState remembers a value and returns [currentValue, setter].",
                "The setter requests a render with the next value. It does not change the value in the current handler.",
                "State and events explains state snapshots and updates from the previous state.",
                "In this example, quantity is state. total is calculated from quantity during rendering, so it needs no separate state.",
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
                "setQuantity((q) => q + 1) uses an updater function. React supplies the previous quantity as q.",
                "Math.max(1, q - 1) chooses the larger of 1 and q - 1, so Remove one cannot lower quantity below 1.",
                "Use a new object or array when updating state. Changing an existing object can leave the UI unchanged.",
                "For expensive initial state, useState(() => buildInitialRows()) calls the initializer when state is created. A later render does not reset state.",
            ],
        },
        {
            id: 'use-effect',
            title: 'useEffect: synchronize with an external system',
            bullets: [
                "useEffect runs setup after React commits the component to the DOM, the browser objects for page elements.",
                "The setup can return cleanup. Effects and cleanup explains the full setup, dependency, and cleanup sequence.",
                "This example starts an interval, a browser timer that repeats a callback. Cleanup stops that timer.",
                "With [], setup runs when the component is added to the page. React 18 development Strict Mode adds setup → cleanup → setup to check cleanup.",
                "With [roomId], changed roomId values require old cleanup before new setup. With no dependency array, setup repeats after every commit.",
                "Effects do not run during server rendering. For browser UI, they can run before or after paint, when the browser draws the screen.",
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
                "Without return () => window.clearInterval(timer), removing the component leaves the timer running. Return cleanup with the timer ID.",
                "Do not write useEffect(async () => ...). An async function returns a Promise, but React expects cleanup or no return value.",
                "Place an async function inside setup and return cleanup normally. Data fetching and async UI shows this pattern.",
                "Calculate totals while rendering and save purchases in the event handler. Those operations do not require an Effect.",
            ],
        },
        {
            id: 'use-ref',
            title: 'useRef: DOM access and values outside rendering',
            bullets: [
                "useRef returns an object with a current property that remains available between renders.",
                "Changing current does not request a render. Use state when a change must update visible output.",
                "Refs, context, and reducers explains refs and DOM access before this example.",
                "HTMLTextAreaElement is TypeScript's browser textarea type. The ref starts at null and React fills current after creating the textarea.",
                "messageRef.current?.focus() calls focus only when current is not null. The ?. operator is optional chaining.",
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
            title: 'useContext: read a value from an ancestor',
            bullets: [
                "createContext creates a context object. A provider supplies its value to descendants.",
                "useContext reads the closest matching provider above the component and updates the reader when its value changes.",
                "Refs, context, and reducers explains the provider, fallback, and consumer relationship.",
                "The Currency union permits USD or INR. createContext<Currency>('USD') gives USD as the fallback when there is no provider.",
                "The provider below uses React 18 syntax. Checkout owns the selected currency in state.",
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
            title: 'useReducer: related state updates with named actions',
            bullets: [
                "useReducer returns state and dispatch. Calling dispatch sends an action to the reducer.",
                "A reducer calculates the next state from the current state and the action object.",
                "Refs, context, and reducers explains reducer purity and replacement of state objects.",
                "Booking has adults and children fields. The Action union permits add-adult, add-child, or reset.",
                "{ ...state, adults: state.adults + 1 } copies the fields into a new object and replaces adults.",
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
            id: 'custom-hooks',
            title: 'Custom Hooks: reuse a complete behavior',
            bullets: [
                "A custom Hook calls other Hooks to provide reusable state logic. Custom Hooks and performance teaches the basic pattern.",
                "Debouncing waits for a fixed time without a new change before updating a value.",
                "The component owns the immediate query. useDebouncedValue keeps a delayed copy in its own state.",
                "Each query change clears the previous timeout and starts a new one. Unmounting clears the last timeout.",
                "This example handles strings to keep the state and timer behavior visible. A reusable generic version can support other value types after reading Generics.",
                "Each Hook call has its own delayed state. Reusing the function does not share that state.",
                "This example only displays text. A debounced request still needs loading, error, and outdated-result handling from Data fetching and async UI.",
            ],
            examples: [{
                title: 'Debounce a search value with cleanup',
                language: 'tsx',
                code: `import { useEffect, useState } from 'react';

function useDebouncedValue(value: string, delayMs: number): string {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setDebouncedValue(value);
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
                "Call useDebouncedValue once at the top level of the component, then use its returned value in JSX.",
                "With [value, delayMs], a new value or delay resets the timer. Omitting value leaves the displayed delayed value outdated.",
                "Debouncing uses a fixed delay. useDeferredValue delays lower-priority rendering without choosing a fixed timeout.",
            ],
        },
        {
            id: 'use-memo',
            title: 'useMemo: cache a calculated value',
            bullets: [
                "useMemo calculates a value during rendering and can reuse it while its dependencies stay the same.",
                "Custom Hooks and performance explains memoization, dependency identity, and measuring a slow interaction.",
                "Invoice[] means an array of Invoice objects. reduce visits that array and adds overdue amounts to sum, starting at 0.",
                "Use [invoices] because the calculation reads invoices. A new invoices array requires recalculation.",
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
            title: 'useCallback: cache a function definition',
            bullets: [
                "useCallback keeps the same function value while its dependencies stay the same.",
                "It does not call the function or cache its returned result.",
                "memo wraps AppointmentPicker and can skip a parent-triggered render when its props remain the same.",
                "Typing notes updates BookingPage. A stable handleSelect lets the picker receive the same onSelect prop.",
                "(time: string) => void is a function type: it accepts a string and its caller does not use a returned value.",
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
            title: 'useId: accessible IDs for repeated components',
            bullets: [
                "useId creates an ID for connecting elements, such as an input and its label.",
                "An ID identifies an element in the document. Each EmailField call to useId gets its own value.",
                "htmlFor={id} connects the label to the input with that id. aria-describedby={helpId} connects the input to the help text.",
                "These connections let a label click focus the input and let assistive technology identify its description.",
                "useId also supports matching server-rendered HTML with the same component tree in the browser.",
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
            title: 'useTransition: let urgent updates go first',
            bullets: [
                "A transition is a state update React can interrupt for a more urgent update, such as typing.",
                "useTransition returns a pending flag and startTransition, which marks state updates as transitions.",
                "choose changes selected immediately, then marks the view update as a transition.",
                "The selected button can update while the old rows remain visible until the next view is ready.",
                "Record<View, Row[]> is a TypeScript object type with sales and returns properties, each holding an array of rows.",
                "AnalyticsRows uses memo so the urgent parent update can keep showing the same rows without repeating the list render.",
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
                "Keep state controlling a text input urgent. A transition can delay displayed updates, so it must not control typing.",
                "startTransition calls its callback immediately. A long synchronous calculation inside that callback still blocks JavaScript.",
                "A worker is a separate JavaScript execution context. startTransition does not create one or make a request faster.",
                "Keep each rows array stable until its data changes. Creating a new array defeats the memoized list's unchanged-props check.",
                "This example uses a synchronous callback supported by React 18. The optional React 19 form sections explain asynchronous Actions separately.",
            ],
        },
        {
            id: 'use-deferred-value',
            title: 'useDeferredValue: let a slow view use an older value',
            bullets: [
                "useDeferredValue returns a value that can update after urgent rendering.",
                "query controls the input immediately. deferredQuery supplies the slower Results component.",
                "While query differs from deferredQuery, stale is true and the page shows Updating results.",
                "memo lets Results skip the urgent render while its products and deferredQuery props stay the same.",
                "Unlike useTransition, this API takes an existing value rather than a setter callback.",
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
            id: 'use-sync-external-store',
            title: 'useSyncExternalStore: subscribe to data outside React',
            bullets: [
                "An external store keeps data outside React component state. Browser connection status is one example.",
                "useSyncExternalStore reads that data and tells React when a change requires rendering.",
                "subscribe registers the supplied notify callback. Its returned cleanup removes the event listeners.",
                "getSnapshot reads the current data. A snapshot is the value React uses for the current render.",
                "getServerSnapshot supplies a chosen fallback when the server has no browser connection status.",
                "Hydration connects React to HTML already produced by a server. The initial browser hydration must use the same server snapshot.",
                "This example uses true for that fallback. React then reads navigator.onLine in the browser.",
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
            title: 'useLayoutEffect: measure before the browser paints',
            bullets: [
                "useLayoutEffect runs after React updates the DOM and before the browser paints the screen.",
                "It uses setup, dependencies, and cleanup like useEffect. Read Effects and cleanup first.",
                "getBoundingClientRect() reads an element's position and size. Its height is the measured height in pixels.",
                "The example stores that height in state so an absolutely positioned message can use it as top.",
                "The ?? operator uses 0 if the optional ref read produces null or undefined.",
                "This Hook and its state updates delay paint until they finish. Use it only when measurement must affect the first visible frame.",
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
            title: 'useImperativeHandle: expose a small ref API',
            bullets: [
                "useImperativeHandle chooses which methods a parent receives through a child ref.",
                "An imperative operation requests an action now, such as focus(). A prop describes what UI should be displayed.",
                "The parent receives an AddressHandle with only focus, rather than the entire input DOM node.",
                "forwardRef passes a parent ref into a child in React 18. Its first type argument describes the handle, and its second describes the props.",
                "The child keeps its actual input in inputRef and exposes a focus method that uses that ref.",
                "This example supports React 18. React 19 also lets a function component receive ref as a prop.",
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
            id: 'use-debug-value',
            title: 'useDebugValue: label a custom Hook in DevTools',
            bullets: [
                "useDebugValue adds an inspection label for a custom Hook in React DevTools, a browser tool for inspecting React components.",
                "It returns nothing and does not change visible UI.",
                "The password Hook stores the input state and labels it Empty or Filled without including the password in the label.",
                "Read the custom Hook example in Custom Hooks and performance before extracting this behavior.",
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
            title: 'useInsertionEffect: inject CSS before layout Effects',
            bullets: [
                "CSS-in-JS libraries create CSS rules from JavaScript. useInsertionEffect is mainly for authors of those libraries.",
                "It lets the library insert styles before layout Effects measure styled elements.",
                "This browser example creates a style element, stores a rule in its textContent, and appends it to document.head.",
                "document.head holds page metadata and styles. appendChild attaches the style element to the document.",
                "Cleanup removes that element. A full library must also manage rules shared by components and server rendering.",
                "Use normal CSS files or the project's styling tools for ordinary application styles.",
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
            id: 'use-action-state',
            title: 'useActionState: state from a submitted Action (React 19+)',
            bullets: [
                "This optional API requires React 19 and matching React DOM and TypeScript packages. It is not available in this site's React 18 setup.",
                "An Action is a function used for a React transition or form submission. It can perform asynchronous work.",
                "A Promise represents a value or failure that arrives later. await waits inside an async function for that result.",
                "useActionState returns the last Action result, a dispatch function, and a pending flag.",
                "The form supplies submitted values in a FormData object. data.get('email') reads the field with name=\"email\".",
                "The Action receives previous state first and FormData second. _previous names an argument this example does not use.",
                "The application supplies subscribeEmail as a prop. Its type accepts an email string and returns a Promise with no result value.",
                "String(...).trim() converts the field value to text and removes spaces at its ends. ?? uses an empty string when the field is missing.",
                "await subscribeEmail(email) completes before returning the saved message. Rejection reaches catch and returns the retry message.",
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
                "The form action prop runs submitAction in a React Action context. A manual call from a handler needs startTransition(() => submitAction(data)).",
                "If the callback takes only data, it receives previous state instead of FormData. data.get('email') then attempts to call get on the wrong value and can throw a TypeError.",
                "Keep both parameters in order: async (_previous, data) => ... . TypeScript can detect the wrong callback signature before it runs.",
                "Only the supplied subscribeEmail operation actually saves data. A returned success string alone does not save anything.",
                "The email input is uncontrolled because React state does not supply its value. React resets uncontrolled form inputs after an Action fulfills, which means it completes without throwing.",
                "Here catch returns 'Could not subscribe. Try again.' instead of throwing. That return completes the Action without throwing, so the email field can reset even after subscribeEmail fails.",
            ],
        },
        {
            id: 'use-form-status',
            title: 'useFormStatus: pending state of a parent form (React 19+)',
            bullets: [
                "This optional Hook requires React 19. Read the useActionState section first for Actions and FormData.",
                "Import useFormStatus from react-dom, where React's browser form behavior lives.",
                "It reads the closest parent form's submission status. pending is true while its Action runs.",
                "The other returned fields are data, the submitted FormData; method, the submission method; and action, the form Action.",
                "SaveButton is a child inside the form. It can read pending without the form passing a pending prop.",
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
                "The name input is uncontrolled because React state does not supply its value. React resets it after the form Action completes without throwing.",
                "The catch path returns 'Could not save the name.' instead of throwing. The name field can therefore reset after a failed save too.",
            ],
        },
        {
            id: 'use-optimistic',
            title: 'useOptimistic: temporary UI while saving (React 19+)',
            bullets: [
                "This optional Hook requires React 19. Read useActionState for Actions and useTransition for transition updates first.",
                "Optimistic UI displays an expected result while the real save is pending.",
                "completed is the confirmed base state. optimistic is the temporary value displayed while the Action runs.",
                "useOptimistic returns that temporary value and markOptimistic, which requests a temporary update.",
                "The update function (_current, next) => next uses the requested value directly. _current is unused.",
                "runAction is this example's name for the startTransition function returned by useTransition.",
                "The application supplies saveCompleted. It returns a Promise with the confirmed boolean, or rejects when saving fails.",
                "React 19 supports an async Action here. A state update after await needs another startTransition wrapper, as shown around setCompleted.",
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
                "markOptimistic(true) must run inside an Action. runAction supplies that context in complete().",
                "await saveCompleted() is the expression whose rejected Promise reaches catch. The error text is then stored in error state.",
                "If saving fails, completed stays false. When the Action finishes, React displays that confirmed value again.",
                "If saving succeeds, update completed with the confirmed result. Without that update, the temporary value returns to the old base value.",
                "The Hook does not save data or retry a failed request. The application must perform that work.",
            ],
        },
        {
            id: 'use-effect-event',
            title: 'useEffectEvent: read latest values inside an Effect (React 19.2+)',
            bullets: [
                "This optional Hook requires React 19.2 or later. React 18 cannot import it.",
                "Read Effects and cleanup for dependencies and cleanup before this section.",
                "An Effect Event is a function used by Effect work that needs to read the latest props or state.",
                "useEffectEvent creates onHeartbeat. When the interval calls it, it reads the latest committed currency.",
                "currency changes what gets logged, but it should not restart this timer. intervalMs changes the timer period, so it is a dependency.",
                "intervalMs is measured in milliseconds. 10000 means ten seconds.",
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
            id: 'use-api',
            title: 'Related API: use reads a resource (React 19+)',
            bullets: [
                "This optional React API requires React 19. It is not a Hook available in React 18.",
                "use reads a Promise or a context value. A Promise represents a value or failure that arrives later.",
                "For a pending Promise, use suspends: it pauses this component's rendering until the value is ready.",
                "A Suspense boundary surrounds a component that may suspend. Its fallback is temporary UI displayed while the Promise is pending.",
                "For a resolved Promise, use returns its value. The example then reads profile.displayName.",
                "For a rejected Promise, use passes the failure to an Error Boundary, a parent component that shows fallback UI after a child fails to render.",
                "The application must supply both a stable profilePromise and an Error Boundary above AccountPage. Suspense handles waiting, not errors.",
                "A stable Promise is the same Promise object on repeated renders. A framework loader or compatible cache can provide it.",
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
                "use(profilePromise) is the expression that reads, suspends, or reports the rejected resource. Do not wrap that call in try/catch.",
                "An Error Boundary handles rejection during rendering. A request try/catch in an Effect is a separate JavaScript error handler.",
                "Do not create fetch(...) inside ProfileCard on every render. That creates a new Promise each time and can keep suspending.",
                "Unlike Hooks, use can appear in conditions and loops. It still must be called while a component or custom Hook renders.",
            ],
        },
    ],
};

export default note;
