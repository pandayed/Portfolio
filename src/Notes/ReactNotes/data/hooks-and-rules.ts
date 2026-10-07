import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'hooks-and-rules',
    title: 'Hooks and their rules',
    summary: 'Call Hooks at the top level of components and custom Hooks. Keep their order the same between renders.',
    scope: 'react',
    updatedOn: '2026-10-07',
    sections: [
        {
            id: 'what-hooks-do',
            title: 'Hooks connect a component to React features',
            bullets: [
                'A Hook is a function whose name starts with use followed by a capital letter.',
                'Hooks let a function component use React features such as state, context, refs, and Effects.',
                'Context passes a value to components below a provider.',
                'A ref stores a value without causing a render.',
                'An Effect keeps a rendered component in sync with an external system.',
                'React gives Hooks special calling rules.',
                'TypeScript checks values passed to a Hook.',
                'It does not enforce the order of Hook calls while the app runs.',
                'Call built-in Hooks such as useState and useContext directly from a component.',
                'Use a custom Hook when several components need the same stateful logic.',
                'Do not use a Hook for a plain calculation that does not need another Hook.',
            ],
        },
        {
            id: 'top-level-only',
            title: 'Call Hooks at the top level',
            bullets: [
                'React needs Hooks to run in the same order on every render.',
                'Call Hooks at the top level of the component, before any conditional return.',
                'Do not call them inside loops, conditions, event handlers, or nested functions.',
            ],
            examples: [{
                title: 'Keep the Hook call unconditional',
                language: 'tsx',
                code: `import { useState } from 'react';

type GreetingProps = {
    signedIn: boolean;
};

export function Greeting({ signedIn }: GreetingProps) {
    const [name, setName] = useState('');

    if (!signedIn) {
        return <p>Please sign in.</p>;
    }

    return (
        <label>
            Name
            <input value={name} onChange={(event) => setName(event.target.value)} />
        </label>
    );
}`,
                result: 'A signed-in user sees an input that keeps its value while the component remains mounted. A signed-out user sees “Please sign in.” The Hook still runs in the same position on every render.',
            }],
            pitfalls: [
                'Do not put useState inside the signedIn condition.',
                'The number and order of Hook calls would change between renders.',
                'Do not call a Hook from an event handler.',
                'Call the Hook at the component top level, then use its returned values in the handler.',
            ],
        },
        {
            id: 'react-functions-only',
            title: 'Call Hooks only from React functions',
            bullets: [
                'Call Hooks from function components or custom Hooks.',
                'Do not call them from regular JavaScript or TypeScript utility functions.',
                'A component name starts with a capital letter and returns UI.',
                'A custom Hook name starts with use followed by a capital letter and may call other Hooks.',
                'A regular helper receives arguments and returns a calculated value without using Hooks.',
            ],
        },
        {
            id: 'state-and-render',
            title: 'State belongs to a render',
            bullets: [
                'A state setter asks React to render again.',
                'It does not change the state value the current event handler already has.',
                'Use an updater function when the next value depends on the previous value.',
                'React passes the latest queued value to the updater.',
            ],
            examples: [{
                title: 'Queue updates from the previous value',
                language: 'tsx',
                code: `import { useState } from 'react';

export function Score() {
    const [score, setScore] = useState<number>(0);

    function addThree() {
        setScore((current) => current + 1);
        setScore((current) => current + 1);
        setScore((current) => current + 1);
    }

    return <button onClick={addThree}>Score: {score}</button>;
}`,
                result: 'The button starts at “Score: 0”. Each click increases the visible score by three.',
            }],
        },
        {
            id: 'lint-and-types',
            title: 'Lint rules and types catch different mistakes',
            bullets: [
                'Lint rules check source code for common mistakes.',
                'React Hooks lint rules detect invalid Hook placement and missing Effect dependencies.',
                'TypeScript checks value types, such as whether state contains a number.',
                'React decides when components render and keeps their state.',
                'JavaScript runs event handlers.',
                'TypeScript checks the source before it runs.',
            ],
        },
    ],
};

export default note;
