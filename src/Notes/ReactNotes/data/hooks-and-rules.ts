import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'hooks-and-rules',
    title: 'Hooks and their rules',
    summary: 'Use Hooks in a stable order so React can keep each component connected to the right state and behavior.',
    scope: 'react',
    updatedOn: '2026-10-03',
    sections: [
        {
            id: 'what-hooks-do',
            title: 'Hooks connect a component to React features',
            paragraphs: [
                'A Hook is a function whose name starts with use. Hooks let a function component use React features such as state, context, refs, and Effects.',
                'Hooks are JavaScript functions, but React gives them special calling rules. TypeScript can check the values passed to a Hook. It does not enforce React\'s render order at runtime.',
            ],
            bullets: [
                'Call built-in Hooks such as useState and useContext directly from a component.',
                'Use a custom Hook when several components need the same stateful logic.',
                'Do not use a Hook for a plain calculation that does not need another Hook.',
            ],
        },
        {
            id: 'top-level-only',
            title: 'Call Hooks at the top level',
            paragraphs: [
                'React relies on Hooks being called in the same order on every render. Call them before any conditional return and outside loops, conditions, event handlers, and nested functions.',
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
                'Do not put useState inside the signedIn condition. The number and order of Hook calls would change between renders.',
                'Do not call a Hook from an event handler. Call the Hook at the component top level, then use its returned values in the handler.',
            ],
        },
        {
            id: 'react-functions-only',
            title: 'Call Hooks only from React functions',
            paragraphs: [
                'Call Hooks from function components or custom Hooks. Do not call them from regular JavaScript or TypeScript utility functions.',
            ],
            bullets: [
                'A component name starts with a capital letter and returns UI.',
                'A custom Hook name starts with use and may call other Hooks.',
                'A regular helper receives arguments and returns a calculated value without using Hooks.',
            ],
        },
        {
            id: 'state-and-render',
            title: 'State belongs to a render',
            paragraphs: [
                'Calling a state setter asks React to render again. It does not change the state value already captured by the current event handler.',
                'Use an updater function when the next value depends on the previous value. React passes the latest queued value to that function.',
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
            paragraphs: [
                'The React Hooks lint rules catch invalid Hook placement and missing Effect dependencies. TypeScript checks value shapes, such as a state value being a number.',
                'Neither tool replaces the other. React defines when a component renders and keeps state. JavaScript runs the event handlers. TypeScript checks the source before it runs.',
            ],
        },
    ],
};

export default note;
