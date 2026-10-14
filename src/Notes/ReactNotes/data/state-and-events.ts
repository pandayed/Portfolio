import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "state-and-events",
    title: "State and queued updates",
    summary: "Keep UI data between renders and trace snapshots and queued updates.",
    scope: "react",
    updatedOn: "2026-10-14",
    exampleLayout: "grouped",
    sections: [
        {
            id: "state-keeps-ui-data",
            title: "Keep changing UI data in state",
            bullets: [
                "State is data React keeps for a component between renders. A regular local variable does not provide that storage.",
                "useState is a Hook: a React function called during rendering to access a React feature.",
                "useState(initialValue) returns the current value and a setter. The setter requests another render with the new value.",
                "Call useState at the top level of the component, before conditional returns. Do not call it in handlers, loops, conditions, or nested helpers.",
                "Each component instance has its own state. Call the setter in a handler when an action should change the UI."
            ],
            examples: [
                {
                    title: "Store a counter",
                    description: [
                        "Make each click change the visible count."
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
                        "useState supplies 0 on the first render. The setter requests the next count. React renders Counter again."
                    ]
                }
            ]
        },
        {
            id: "state-is-a-render-snapshot",
            title: "A handler reads its render’s snapshot",
            bullets: [
                "A snapshot is the state value supplied to one render. Calling a setter does not change that render’s variables.",
                "Handlers and timers created by that render keep reading its snapshot.",
                "React batches updates from an event. It processes the queued updates before updating the screen."
            ],
            examples: [
                {
                    title: "Observe the old value inside a handler",
                    description: [
                        "Read state immediately after requesting an update."
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
                        "setCount queues an update. It does not assign a new value to count in this handler."
                    ]
                }
            ]
        },
        {
            id: "update-from-previous-state",
            title: "Queue updates based on previous state",
            bullets: [
                "Pass an updater function when the next value depends on the previous value.",
                "React passes the queued value to each updater in order. Keep updaters pure: calculate and return the next state without outside changes.",
                "Repeated setCount(count + 1) calls in one handler all read the same snapshot. They queue the same replacement value."
            ],
            examples: [
                {
                    title: "Apply three queued increments",
                    description: [
                        "Increase the counter by three in one click."
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
                        "The updaters receive 0, 1, and 2. Three replacement calls using count + 1 would instead finish at 1."
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
