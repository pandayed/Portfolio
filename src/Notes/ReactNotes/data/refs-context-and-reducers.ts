import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'refs-context-and-reducers',
    title: 'Refs, context, and reducers',
    summary: 'Use refs for non-rendering values, context for distant readers, and reducers for related state transitions.',
    scope: 'react',
    updatedOn: '2026-10-03',
    sections: [
        {
            id: 'refs',
            title: 'A ref stores a value without rendering again',
            paragraphs: [
                'useRef returns the same object on every render. Changing its current property does not ask React to render again.',
                'Keep information in state when it affects visible output. Use a ref for values needed by event handlers or external APIs when changing the value should not update the screen.',
            ],
            bullets: [
                'Common ref values include DOM nodes, timer IDs, and previous external handles.',
                'Do not read or write ref.current during rendering except for predictable one-time initialization.',
            ],
        },
        {
            id: 'dom-ref',
            title: 'A DOM ref gives access to a rendered element',
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
                'A DOM ref is an escape hatch for actions such as focus, scroll, or media control. Use JSX and state for normal UI updates.',
            ],
        },
        {
            id: 'context',
            title: 'Context provides a value to distant children',
            paragraphs: [
                'Context lets a parent provide a value to components anywhere below it without forwarding the same prop through every intermediate component.',
                'Start with props or children because they keep data flow explicit. Use context when distant components in the same tree need the same value.',
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
                'Updating a provided context value renders the components that read that context.',
                'Do not move every prop into context. Local props are easier to trace when only nearby components need the value.',
            ],
        },
        {
            id: 'reducers',
            title: 'A reducer groups related state transitions',
            paragraphs: [
                'useReducer is useful when several events update related state or when the next state rules have become hard to follow across several setters.',
                'An event handler dispatches an action. React calls the reducer with the current state and that action. The reducer returns the next state.',
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
            paragraphs: [
                'A reducer runs during rendering. It must return the same result for the same state and action. It must not send requests, start timers, mutate the existing state, or change anything outside the reducer.',
                'TypeScript can make action cases explicit with a union. React still controls when the reducer runs and when the returned state appears on screen.',
            ],
        },
        {
            id: 'choosing-tool',
            title: 'Choose by the job',
            bullets: [
                'Use state for information that changes the rendered UI.',
                'Use a ref for a mutable value that should not trigger rendering.',
                'Use context when distant descendants need the same provided value.',
                'Use a reducer when related state changes are easier to express as named actions.',
                'Combine context and a reducer only when distant components need to read or dispatch the same state.',
            ],
        },
    ],
};

export default note;
