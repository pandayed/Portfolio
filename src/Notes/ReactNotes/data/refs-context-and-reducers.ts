import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'refs-context-and-reducers',
    title: 'Refs, context, and reducers',
    summary: 'Store values in refs without rendering again. Share values with context and group state updates in reducers.',
    scope: 'react',
    updatedOn: '2026-10-07',
    sections: [
        {
            id: 'refs',
            title: 'A ref stores a value without rendering again',
            bullets: [
                "useRef stores a value between renders without requesting a render when the value changes.",
                "Read State and events before comparing state with refs.",
                "useRef(initialValue) returns an object whose current property starts at initialValue.",
                "React returns that same ref object on later renders. A new initialValue argument does not replace current.",
                "Use state for information the component displays. Use a ref for information read by a handler or browser API.",
                "A DOM node is a browser object for an element, such as an input.",
                "Common ref values include DOM nodes and timer IDs, which identify timers that cleanup must stop.",
                "Read and write refs in handlers or Effects. Do not use changing ref values to calculate JSX.",
            ],
        },
        {
            id: 'dom-ref',
            title: 'A DOM ref gives access to a rendered element',
            bullets: [
                "useRef<HTMLInputElement>(null) declares a ref for an input element. HTMLInputElement is TypeScript's browser input type.",
                "Initially current is null because React has not created the input yet.",
                "ref={inputRef} tells React to store the rendered input in inputRef.current.",
                "inputRef.current?.focus() uses optional chaining. It calls focus only when current is not null.",
                "focus() moves keyboard input to the element. It does not change React state.",
                "When React removes the input, it sets current back to null.",
            ],
            examples: [{
                title: 'Move focus from a button',
                language: 'tsx',
                code: `import { useRef } from 'react';

export function SearchBox() {
    const inputRef = useRef<HTMLInputElement>(null);

    function focusSearch() {
        inputRef.current?.focus();
    }

    return (
        <>
            <input ref={inputRef} aria-label="Search" />
            <button onClick={focusSearch}>Focus search</button>
        </>
    );
}`,
                result: 'Clicking “Focus search” moves keyboard focus into the search input. The ref change does not create another render.',
            }],
            pitfalls: [
                "inputRef.current.focus() fails TypeScript checking because current can be null. If it runs while current is null, accessing focus throws a TypeError.",
                "Use inputRef.current?.focus() or check current !== null before calling focus.",
                "Changing ref.current without calling a state setter does not update visible text. Use state for a displayed count.",
                "Use JSX and state to change an element's text or attributes. Use a DOM ref for focus, scrolling, or media controls.",
            ],
        },
        {
            id: 'ref-initialization',
            title: 'Initialize a stored ref value predictably',
            bullets: [
                "A predictable initial value is a limited exception to the rule against writing refs during rendering.",
                "Label describes an object with a text string. Label | null allows either that object or null.",
                "The ref starts at null. The condition stores its initial object only while current is null.",
                "Later renders keep that object. Only the event handler reads its text.",
                "This exception does not permit repeated ref writes during rendering or using a changing ref to calculate JSX.",
            ],
            examples: [{
                title: 'Store an initial object, then read it in a handler',
                language: 'tsx',
                code: `import { useRef } from 'react';

type Label = { text: string };

export function RememberedLabel() {
    const labelRef = useRef<Label | null>(null);

    if (labelRef.current === null) {
        labelRef.current = { text: 'Draft' };
    }

    return (
        <button onClick={() => console.log(labelRef.current?.text)}>
            Read stored label
        </button>
    );
}`,
                result: 'Clicking Read stored label logs Draft. Rendering again keeps the previously stored object because current is no longer null.',
            }],
        },
        {
            id: 'context',
            title: 'Context provides a value to distant children',
            bullets: [
                "Context lets a parent provide a value to components below it without passing a prop at every level.",
                "createContext creates the context object. Its argument is the fallback value when there is no matching provider.",
                "A provider is a component that supplies the value. In React 18, write ThemeContext.Provider.",
                "useContext reads the closest matching provider above the component that calls it.",
                "Theme is a union type: the string must be either \"light\" or \"dark\". The TypeScript page Inference, unions, and narrowing explains unions.",
                "createContext<Theme>('light') limits this context to Theme values and gives light as its fallback.",
                "Toolbar reads dark because Settings renders it inside the provider.",
                "With no provider above Toolbar, it reads light. Context does not create or update state by itself.",
            ],
            examples: [{
                title: 'Read a theme from context',
                language: 'tsx',
                code: `import { createContext, useContext } from 'react';

type Theme = 'light' | 'dark';
const ThemeContext = createContext<Theme>('light');

function Toolbar() {
    const theme = useContext(ThemeContext);
    return <p>Current theme: {theme}</p>;
}

export function Settings() {
    return (
        <ThemeContext.Provider value="dark">
            <Toolbar />
        </ThemeContext.Provider>
    );
}`,
                result: 'The toolbar shows “Current theme: dark” even though Settings does not pass a theme prop directly to Toolbar.',
            }],
            pitfalls: [
                "Calling useContext(ThemeContext) inside Settings would not read the provider returned by Settings. That provider is below the call. Move the reader into a child such as Toolbar.",
                "React renders consumers when the provided value changes. An object value created on each render counts as a changed object.",
                "Use props when only nearby components need a value. Use context when several distant descendants need it.",
            ],
        },
        {
            id: 'reducers',
            title: 'A reducer groups related state transitions',
            bullets: [
                "A reducer is a function that returns the next state from the current state and an action.",
                "An action is an object that names the requested change. Here its type is increment or reset.",
                "dispatch sends that action to React. React calls counterReducer to calculate the next state.",
                "useReducer returns state and dispatch, just as useState returns a value and a setter.",
                "The initial state is { count: 0 }. The increment action produces a new object with a larger count.",
                "The Action union restricts the allowed action objects. switch reads action.type to choose the update.",
                "A small counter could use useState. A reducer is useful when many event handlers need the same related update rules.",
            ],
            examples: [{
                title: 'Describe counter changes with actions',
                language: 'tsx',
                code: `import { useReducer } from 'react';

type State = { count: number };
type Action =
    | { type: 'increment' }
    | { type: 'reset' };

function counterReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'reset':
            return { count: 0 };
    }
}

export function Counter() {
    const [state, dispatch] = useReducer(counterReducer, { count: 0 });

    return (
        <>
            <p>Count: {state.count}</p>
            <button onClick={() => dispatch({ type: 'increment' })}>Add one</button>
            <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
        </>
    );
}`,
                result: '“Add one” increases the visible count. “Reset” returns it to zero. Each event dispatches one action that names what happened.',
            }],
        },
        {
            id: 'pure-reducers',
            title: 'Reducers must stay pure',
            bullets: [
                "A pure reducer gives the same next state for the same state and action.",
                "Return a new state object. Do not change the object React passed in.",
                "React may call a reducer more than once, including extra development calls in Strict Mode.",
                "Sending a request or starting a timer in the reducer can repeat that work. Put user actions in handlers and synchronization in Effects.",
                "dispatch schedules an update. Reading state immediately after dispatch still reads the state from the current render.",
            ],
            examples: [{
                title: 'Replace state instead of changing it',
                language: 'typescript',
                code: `type State = { count: number };

function incorrectIncrement(state: State): State {
    state.count += 1; // Changes the existing state object.
    return state;    // Returns that same object.
}

function increment(state: State): State {
    return { count: state.count + 1 }; // Returns a new object.
}`,
                result: 'state.count += 1 changes the previous state. Returning state keeps the same object, so React may skip the update. This usually produces no exception. The corrected return preserves the old object and supplies new state.',
            }],
        },
        {
            id: 'choosing-tool',
            title: 'Choose by the job',
            bullets: [
                "A visible input value needs state because editing it must update JSX.",
                "An input DOM element needs a ref when a handler must call focus().",
                "A selected theme needed by distant descendants can come from context.",
                "An editor with add, remove, and reset actions can keep its update rules in a reducer.",
                "Context can provide reducer state and dispatch to distant children. The reducer still calculates updates, and context still supplies values.",
            ],
        },
    ],
};

export default note;
