import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "effects-and-cleanup",
    title: "Effects and cleanup",
    summary: "Synchronize with external systems after commit and stop previous work with cleanup.",
    scope: "react",
    updatedOn: "2026-10-14",
    exampleLayout: "grouped",
    sections: [
        {
            id: "external-synchronization",
            title: "Synchronize after React commits",
            bullets: [
                "Rendering calculates JSX from props and state. The commit applies needed changes to the browser DOM.",
                "An Effect keeps a component synchronized with an external system, such as a browser event subscription or media player.",
                "useEffect runs after commit. Do not use it for a user action that belongs in a handler or for data you can calculate while rendering."
            ],
            examples: [
                {
                    title: "Keep the browser tab title in sync with state",
                    description: [
                        "Display a counter and keep its current count in the browser tab title."
                    ],
                    language: "jsx",
                    code: `import { useEffect, useState } from 'react';

export default function Counter() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        document.title = 'Count: ' + count;
    }, [count]);
    return <button onClick={() => setCount(current => current + 1)}>
        Count: {count}
    </button>;
}`,
                    result: "The button and tab title begin at Count: 0. Clicking updates both to the new count.",
                    explanation: [
                        "The handler updates React state. After commit, the Effect updates the browser title. count is a dependency because the Effect reads it. This example gives this component ownership of the tab title while it is present."
                    ]
                }
            ]
        },
        {
            id: "dependencies",
            title: "List the reactive values the Effect reads",
            bullets: [
                "Props and values declared inside the component are reactive values. Include the ones read by the Effect in its dependency array.",
                "React compares each dependency with its previous value using Object.is. A changed dependency causes cleanup followed by new setup.",
                "No dependency array runs after every commit. [] runs setup on mount when the Effect reads no reactive values.",
                "Functions and objects created during rendering have new identities. Move them inside the Effect or outside the component when appropriate.",
                "Do not omit dependencies to force a desired schedule. Change the code so the dependencies describe the actual synchronization."
            ]
        },
        {
            id: "cleanup",
            title: "Stop the previous synchronization",
            bullets: [
                "Return a cleanup function to remove a subscription, clear a timer, or disconnect the previous external resource.",
                "React runs cleanup before re-running an Effect with changed dependencies and when the component unmounts.",
                "In development Strict Mode, React performs an extra setup → cleanup → setup cycle. Cleanup must leave the next setup safe.",
                "Effects do not run during server rendering. useEffect does not guarantee that its work always runs after the browser paints."
            ],
            examples: [
                {
                    title: "Subscribe to browser window size",
                    description: [
                        "Use this browser-only component to display the current window width."
                    ],
                    language: "jsx",
                    code: `import { useEffect, useState } from 'react';

export default function WindowWidth() {
    const [width, setWidth] = useState(0);
    useEffect(() => {
        function update() { setWidth(window.innerWidth); }
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);
    return <p>Width: {width}</p>;
}`,
                    result: "The width is set after mount and updated when the browser window resizes.",
                    explanation: [
                        "Setup registers one listener. Cleanup removes that same function. Repeated setup therefore does not accumulate listeners."
                    ]
                }
            ]
        },
        {
            id: "when-not-to-use-effect",
            title: "Calculate derived UI during rendering",
            bullets: [
                "Calculate a full name, filtered list, or display label directly from current props and state.",
                "An Effect that copies that calculation into state adds another update and another value to keep synchronized.",
                "Use a handler for actions caused by a click or submission. Use an Effect for synchronization caused by the component being present."
            ]
        }
    ],
    references: [
        {
            title: "React: Synchronizing with Effects",
            href: "https://react.dev/learn/synchronizing-with-effects"
        },
        {
            title: "React: You might not need an Effect",
            href: "https://react.dev/learn/you-might-not-need-an-effect"
        },
        {
            title: "React: useEffect",
            href: "https://react.dev/reference/react/useEffect"
        }
    ]
};

export default note;
