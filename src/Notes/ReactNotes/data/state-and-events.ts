import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "state-and-events",
    title: "State and queued updates",
    summary: "Component state, snapshots, and queued updates.",
    scope: "react",
    updatedOn: "2026-10-14",
    inlineCode: true,
    exampleLayout: "grouped",
    sections: [
        {
            id: "state-keeps-ui-data",
            title: "Component state",
            bullets: [
                "State is data React keeps for a component between renders.",
                "A regular local variable does not provide that storage.",
                "`useState` is a Hook that adds state to a function component.",
                "`useState(initialValue)` returns the current value and a setter.",
                "The setter requests another render with the new value.",
                "`useState` must run at the top level of the component, before conditional returns.",
                "Handlers, loops, conditions, and nested helpers must not call it.",
                "Each copy of a component has its own state."
            ],
            examples: [
                {
                    title: "Counter state",
                    description: [
                        "Each click changes the visible `count`."
                    ],
                    language: "jsx",
                    code: `import { useState } from 'react';

export default function Counter() {
    const [count, setCount] = useState(0);
    return <button onClick={() => setCount(count + 1)}>
        Count: {count}
    </button>;
}`,
                    result: "The button starts at Count: 0. Each click increases it by one.",
                    explanation: [
                        "`useState` supplies `0` on the first render.",
                        "The setter requests the next `count`.",
                        "React renders `Counter` again."
                    ]
                }
            ]
        },
        {
            id: "state-is-a-render-snapshot",
            title: "State snapshots",
            bullets: [
                "Each render receives its own state values.",
                "Calling a setter does not change the values in a handler that is already running.",
                "A timer created by a handler also reads the state from the render that created that handler.",
                "React groups state updates made in an event handler.",
                "After the handler finishes, React processes them and renders the component again."
            ],
            examples: [
                {
                    title: "State values in a handler",
                    description: [
                        "The handler reads state immediately after requesting an update."
                    ],
                    language: "jsx",
                    code: `import { useState } from 'react';

export default function Counter() {
    const [count, setCount] = useState(0);
    function increment() {
        setCount(count + 1);
        alert('This handler reads ' + count);
    }
    return <button onClick={increment}>Count: {count}</button>;
}`,
                    result: "The first click alerts “This handler reads 0”. The next render shows Count: 1.",
                    explanation: [
                        "`setCount` queues an update.",
                        "It does not assign a new value to `count` in this handler."
                    ]
                }
            ]
        },
        {
            id: "update-from-previous-state",
            title: "State updater functions",
            bullets: [
                "An updater function receives the previous value and returns the next value.",
                "React runs the updater functions in order.",
                "The first receives the current state.",
                "Each later updater receives the result of the previous one.",
                "An updater must only calculate and return the next state.",
                "React may call it twice in development Strict Mode to check for mistakes."
            ],
            examples: [
                {
                    title: "Queued increments",
                    description: [
                        "One click increases the counter by three."
                    ],
                    language: "jsx",
                    code: `import { useState } from 'react';

export default function Counter() {
    const [count, setCount] = useState(0);
    function addThree() {
        setCount(current => current + 1);
        setCount(current => current + 1);
        setCount(current => current + 1);
    }
    return <button onClick={addThree}>Count: {count}</button>;
}`,
                    result: "The first click changes Count: 0 to Count: 3.",
                    explanation: [
                        "The updaters receive `0`, `1`, and `2`.",
                        "Three replacement calls using `count + 1` would instead finish at `1`."
                    ]
                }
            ]
        }
    ],
    references: [
        {
            title: "React: State",
            href: "https://react.dev/learn/state-a-components-memory"
        },
        {
            title: "React: State as a snapshot",
            href: "https://react.dev/learn/state-as-a-snapshot"
        },
        {
            title: "React: Queued state updates",
            href: "https://react.dev/learn/queueing-a-series-of-state-updates"
        }
    ]
};

export default note;
