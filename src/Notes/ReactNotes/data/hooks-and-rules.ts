import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'hooks-and-rules',
    title: 'Hooks and their rules',
    summary: 'Keep state Hook calls in a fixed order, distinguish components from custom Hooks, and identify invalid calls.',
    scope: 'react',
    updatedOn: '2026-10-07',
    sections: [
        {
            id: 'what-hooks-do',
            title: 'Hooks give components React features',
            bullets: [
                'useState is a Hook: a React function that lets a component keep state.',
                'Read State and events first. It explains the value and setter returned by useState.',
                'Other pages introduce their Hooks when needed: Effects and cleanup explains useEffect, and Refs, context, and reducers explains refs and context.',
                'A custom Hook is a function that calls Hooks to reuse component logic. Its name starts with use followed by a capital letter, such as useCounter.',
                'Calling a custom Hook shares its logic, not its state. Each call keeps its own state.',
                'A helper that only calculates a value does not need a Hook. Call it like a regular JavaScript function.',
            ],
        },
        {
            id: 'top-level-only',
            title: 'Keep state Hook calls in a fixed order',
            bullets: [
                'React matches useState calls by their order in a component. Keep those calls in the same order on every render.',
                'Top level means directly in the component’s function body, before conditional returns.',
                'Do not place useState inside a condition, loop, event handler, or nested helper. The same placement rule applies to useEffect and the other conventional Hooks taught in these notes.',
                'Put conditions after the Hook call so that the Hook always runs.',
            ],
            examples: [
                {
                    title: 'Call the Hook before choosing content',
                    language: 'tsx',
                    code: `import { useState } from 'react';

type GreetingProps = { signedIn: boolean };

function Greeting({ signedIn }: GreetingProps) {
    const [count, setCount] = useState(0);

    if (!signedIn) {
        return <p>Please sign in.</p>;
    }

    return <button onClick={() => setCount(value => value + 1)}>Count: {count}</button>;
}

export default function App() {
    return <Greeting signedIn={true} />;
}`,
                    result: 'The page shows “Count: 0”, and each click adds one. Changing the prop to false shows “Please sign in.” Greeting still calls useState before the return. If the parent later changes this prop, the state remains while Greeting stays at the same position.',
                },
                {
                    title: 'Identify a Hook skipped by a conditional return',
                    language: 'tsx',
                    code: `import { useState } from 'react';

type GreetingProps = { signedIn: boolean };

export default function Greeting({ signedIn }: GreetingProps) {
    if (!signedIn) return <p>Please sign in.</p>;
    const [count] = useState(0); // Invalid placement: after a conditional return
    return <p>Count: {count}</p>;
}`,
                    result: 'The rules-of-hooks lint rule reports useState(0) after the conditional return. A false render skips that call and a true render executes it. Depending on the other Hook calls and transition, React can also report a Hook-order runtime error. Move useState before the if, as in the preceding example.',
                },
            ],
        },
        {
            id: 'react-functions-only',
            title: 'Call Hooks from components or custom Hooks',
            bullets: [
                'Call useState from a component React is rendering or from a custom Hook called by that component.',
                'A component name starts with a capital letter and describes UI. A custom Hook name starts with use followed by a capital letter.',
                'A custom Hook may return state and functions instead of JSX. Its Hook calls still need a fixed order.',
                'Do not call useState from a regular utility, at module scope, or inside an event handler.',
            ],
            examples: [
                {
                    title: 'Reuse counter logic with a custom Hook',
                    language: 'tsx',
                    code: `import { useState } from 'react';

function useCounter() {
    const [count, setCount] = useState(0);
    function increment() {
        setCount(value => value + 1);
    }
    return { count, increment };
}

function Counter() {
    const { count, increment } = useCounter();
    return <button onClick={increment}>Count: {count}</button>;
}

export default function App() {
    return <><Counter /><Counter /></>;
}`,
                    result: 'Both buttons start at 0. Clicking one increases only that button. The object returned by useCounter supplies count and increment through object destructuring.',
                },
                {
                    title: 'Identify a Hook called during a click',
                    language: 'tsx',
                    code: `import { useState } from 'react';

export default function Counter() {
    function handleClick() {
        const [count] = useState(0); // Error: Hook call inside an event handler
        console.log(count);
    }
    return <button onClick={handleClick}>Count</button>;
}`,
                    result: 'Clicking Count reaches useState(0) inside handleClick and throws an invalid Hook call error. React is running a handler, not rendering a component. Move useState to the component body and use the returned setter in handleClick. The lint rule also catches the invalid call before execution.',
                },
            ],
        },
        {
            id: 'state-and-render',
            title: 'Keep Hook updates separate from Hook calls',
            bullets: [
                'Call useState during rendering to receive the current state and its setter.',
                'Call the setter in an event handler to request an update. The setter is a returned function, not another Hook call.',
                'The handler still reads its original render’s value after the setter call.',
                'State and events contains the full snapshot and queued-updater examples. Use those examples to trace multiple updates.',
            ],
            examples: [
                {
                    title: 'Use a setter in a handler',
                    language: 'tsx',
                    code: `import { useState } from 'react';

export default function Score() {
    const [score, setScore] = useState(0);

    function addPoint() {
        setScore(current => current + 1);
    }

    return <button onClick={addPoint}>Score: {score}</button>;
}`,
                    result: 'The button starts at “Score: 0”. Each click adds one. useState runs when React renders Score; setScore runs when the user clicks.',
                },
            ],
        },
        {
            id: 'lint-and-types',
            title: 'Lint rules and types catch different mistakes',
            bullets: [
                'Lint rules inspect source code for mistakes. The React rules-of-hooks rule reports invalid placement of conventional Hook calls.',
                'The React exhaustive-deps rule checks dependency lists for Hooks such as useEffect. A dependency is a value the Hook’s callback reads. Effects and cleanup explains that separate rule.',
                'TypeScript checks value types. For example, it rejects setScore("one") when score is a number.',
                'TypeScript does not check the runtime order of Hook calls. Passing type checks does not prove that a Hook is used correctly.',
                'React runtime errors occur when the JavaScript executes. Lint findings and TypeScript errors are source checks, not runtime exceptions.',
            ],
            examples: [
                {
                    title: 'Identify a state type error',
                    language: 'tsx',
                    code: `import { useState } from 'react';

export default function Score() {
    const [score, setScore] = useState(0);
    return <button onClick={() => setScore("one")}>Score: {score}</button>;
}`,
                    result: 'This TSX example has a source error; it is not a valid example to run unchanged.',
                    typeCheck: 'The exact failing expression is setScore("one"). useState(0) inferred numeric state, so the string argument is rejected. Use setScore(1) for a fixed numeric value, or setScore(current => current + 1) to add one.',
                },
            ],
        },
    ],
};

export default note;
