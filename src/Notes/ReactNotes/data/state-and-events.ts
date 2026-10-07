import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'state-and-events',
    title: 'State and events',
    summary: 'Pass click handlers, keep changing UI data in state, and trace the value each render and queued update receives.',
    scope: 'react',
    updatedOn: '2026-10-07',
    sections: [
        {
            id: 'event-handlers',
            title: 'Pass event handler functions',
            bullets: [
                'An event handler is a function React calls when an event occurs, such as a button click.',
                'onClick is the button property for a click handler. Pass a function as its value.',
                'Passing showHelp gives React the function. Writing showHelp() calls it immediately while the JSX is calculated.',
                'An arrow function, () => showHelp(), creates a function that React can call later. It is useful when the action needs arguments.',
                'The document object represents the browser page. Assigning document.title changes the browser tab title.',
            ],
            examples: [
                {
                    title: 'Run code after a click',
                    language: 'jsx',
                    code: `export default function HelpButton() {
    function showHelp() {
        document.title = "Help opened";
    }

    return <button onClick={showHelp}>Open help</button>;
}`,
                    result: 'The page shows Open help. The browser tab title changes to “Help opened” after the click.',
                },
            ],
            pitfalls: [
                'In onClick={showHelp()}, the exact call showHelp() changes the title during rendering. Its return value is undefined, so no click handler is supplied. Correct it to onClick={showHelp}. TSX also reports that this void return value is not a valid handler.',
                'For a function requiring an argument, use onClick={() => showItem(id)}. The arrow function delays the call until the click.',
            ],
        },
        {
            id: 'state-keeps-ui-data',
            title: 'State keeps UI data between renders',
            bullets: [
                'A local variable such as let count = 0 is created again on each component call. Changing it does not ask React to update the screen.',
                'State is data React keeps for a component between renders.',
                'useState is a Hook, a React function that lets a component use a React feature. Import it from react.',
                'const [count, setCount] = useState(0) uses array destructuring to name two returned values: the current state and its setter function.',
                '0 is the initial state used when this component first appears. Later renders receive the stored state.',
                'Calling setCount requests a render with the next value. React usually skips an update when the next value equals the current value.',
                'Call useState at the top level of a component, before conditional returns. Hooks and their rules explains this requirement.',
            ],
            examples: [
                {
                    title: 'Store a counter',
                    language: 'tsx',
                    code: `import { useState } from 'react';

export default function Counter() {
    const [count, setCount] = useState(0);

    return (
        <button onClick={() => setCount(count + 1)}>
            Count: {count}
        </button>
    );
}`,
                    result: 'The button starts at “Count: 0”. The first click requests count 1. React renders again and the button shows “Count: 1”. Later separate clicks increase it by one.',
                    typeCheck: 'TypeScript infers count as number from the initial 0. Calling setCount("1") fails at the string argument because this state expects a number.',
                },
            ],
            pitfalls: [
                'Writing setCount(count + 1) directly in the component body requests another update on every render. This repeated update can produce “Too many re-renders”. Keep this unconditional update inside the click handler.',
            ],
        },
        {
            id: 'state-is-a-render-snapshot',
            title: 'Each render sees a state snapshot',
            bullets: [
                'A snapshot is the state value supplied for one render. A setter does not change that render’s value.',
                'An event handler reads the values from the render that created it.',
                'An update is queued: React stores the requested change to apply when it renders again.',
                'console.log writes to the browser developer console. It lets this example show what the handler reads.',
            ],
            examples: [
                {
                    title: 'Compare the current handler with the next render',
                    language: 'tsx',
                    code: `import { useState } from 'react';

export default function Counter() {
    const [count, setCount] = useState(0);

    function increment() {
        console.log("Before:", count);
        setCount(count + 1);
        console.log("After:", count);
    }

    return <button onClick={increment}>Count: {count}</button>;
}`,
                    result: 'On the first click, the console shows “Before: 0” and “After: 0”. Both logs read the same render’s count. The next render shows “Count: 1”. The second click logs 1 twice and then displays 2.',
                },
            ],
        },
        {
            id: 'update-from-previous-state',
            title: 'Update from previous state',
            bullets: [
                'An updater is a function passed to the setter. It receives the previous value and returns the next value.',
                'React applies queued updaters in order. Each updater receives the result of the preceding update.',
                'React batches updates in a click handler: it normally waits for the handler to finish before updating the screen.',
                'Three calls to setCount(count + 1) in the same handler all use that render’s count. Starting from 0, they each request 1.',
                'Use updaters to apply three additions to the same queued value.',
                'Keep an updater pure. Calculate and return state without sending requests or changing outside variables.',
            ],
            examples: [
                {
                    title: 'Apply three queued additions',
                    language: 'tsx',
                    code: `import { useState } from 'react';

export default function StepCounter() {
    const [count, setCount] = useState(0);

    function addThree() {
        setCount(previous => previous + 1);
        setCount(previous => previous + 1);
        setCount(previous => previous + 1);
    }

    return <button onClick={addThree}>Count: {count}</button>;
}`,
                    result: 'The button starts at 0. On the first click the updaters receive 0, 1, and 2, so the next render displays “Count: 3”. The next click displays 6.',
                },
            ],
        },
        {
            id: 'state-is-local',
            title: 'State is local to a component position',
            bullets: [
                'Each component position in the rendered tree has its own state.',
                'Two uses of Counter keep two separate count values, even though they use the same function.',
                'React preserves state while the same component type stays at the same position. Removing it or changing its key resets its state.',
                'To update two children from the same value, store that state in their closest shared parent. Pass the value and handlers as props.',
            ],
            examples: [
                {
                    title: 'Render independent counters',
                    language: 'tsx',
                    code: `import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);
    return <button onClick={() => setCount(value => value + 1)}>{count}</button>;
}

export default function Scoreboard() {
    return (
        <>
            <Counter />
            <Counter />
        </>
    );
}`,
                    result: 'Two buttons start at 0. Clicking the first twice and the second once leaves them displaying 2 and 1. Updating one does not change the other.',
                },
            ],
        },
        {
            id: 'choose-state-carefully',
            title: 'Store only data that must persist',
            bullets: [
                'Use state for changing data that the UI must remember between renders.',
                'Calculate values from existing props and state when possible. This calculated data does not need a second state value.',
                'A second stored copy can disagree with the first if a handler updates only one copy.',
                '!value is JavaScript logical NOT. For a boolean, it switches true to false and false to true.',
            ],
            examples: [
                {
                    title: 'Calculate a label from one state value',
                    language: 'tsx',
                    code: `import { useState } from 'react';

export default function Connection() {
    const [connected, setConnected] = useState(false);
    const label = connected ? "Connected" : "Disconnected";

    return (
        <button onClick={() => setConnected(value => !value)}>
            {label}
        </button>
    );
}`,
                    result: 'The button starts at “Disconnected”. One click shows “Connected”. Another click shows “Disconnected”. Each render calculates label from connected.',
                },
            ],
        },
    ],
};

export default note;
