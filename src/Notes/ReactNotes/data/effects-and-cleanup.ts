import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "effects-and-cleanup",
    title: "Effects and cleanup",
    summary: "Effect setup, dependencies, and cleanup.",
    scope: "react",
    updatedOn: "2026-10-14",
    inlineCode: true,
    exampleLayout: "grouped",
    sections: [
        {
            id: "external-synchronization",
            title: "Effects and external systems",
            bullets: [
                "`useEffect` runs code that keeps something outside React up to date, such as the browser tab title or a media player.",
                "`useEffect` receives a function called the setup function.",
                "The setup function runs after a commit.",
                "It does not run during server rendering.",
                "The browser may paint the screen before or after the Effect runs.",
                "`useEffect` does not guarantee that it runs after the screen is painted."
            ],
            examples: [
                {
                    title: "Browser tab title",
                    description: [
                        "The example displays a counter and its current `count` in the browser tab title."
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
                        "Clicking the button updates `count`.",
                        "React updates the button text, then the Effect sets `document.title`.",
                        "`[count]` tells React to run the Effect again when `count` changes."
                    ]
                }
            ]
        },
        {
            id: "dependencies",
            title: "Effect dependencies",
            bullets: [
                "The second argument is a dependency array, such as `[count]`.",
                "It must include the props, state, and other values declared in the component that the Effect reads.",
                "React compares each dependency with its previous value using `Object.is`.",
                "When one changes, React runs the Effect again after updating the page.",
                "A new object or function created each time the component runs counts as a changed dependency, even if its contents or code are the same."
            ],
            table: {
                columns: ["Dependency argument", "When setup runs"],
                rows: [
                    ["`[count]`", "When the component is first added to the page, then after updates where `count` changes."],
                    ["`[]`", "When the component is first added to the page. Use this when the Effect reads no changing values from the component."],
                    ["No second argument", "When the component is first added to the page, then after every completed render of that component."],
                ],
            },
        },
        {
            id: "cleanup",
            title: "Effect cleanup",
            bullets: [
                "The setup function can return a cleanup function.",
                "Cleanup removes an event listener, clears a timer, or closes a connection started by setup.",
                "Before setup runs again, React calls the previous cleanup function with the old values.",
                "It also calls cleanup when the component is removed from the page.",
                "In development with Strict Mode, React runs an extra setup → cleanup → setup cycle when the component is first added.",
                "This also applies to an Effect with `[]`."
            ],
            examples: [
                {
                    title: "Window size subscription",
                    description: [
                        "This browser-only component displays the current window width."
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
                    result: "The component first renders Width: 0. The Effect sets the current window width, and resizing the window updates it.",
                    explanation: [
                        "`update` reads `window.innerWidth` and stores it in `width`.",
                        "Setup calls it once, then registers it for `resize` events.",
                        "Cleanup removes the same `update` function that setup registered."
                    ]
                }
            ]
        },
        {
            id: "when-not-to-use-effect",
            title: "Derived values",
            bullets: [
                "If `firstName` and `lastName` are already props or state, `fullName = firstName + ' ' + lastName` can run in the component body.",
                "The calculation runs whenever React calls the component.",
                "It already uses the current `firstName` and `lastName`, so it needs no separate state or Effect.",
                "Storing `fullName` through an Effect would first render the old name, then update state and render again.",
                "The same applies to filtering an existing list or building a display label from current values."
            ]
        },
        {
            id: "event-handlers",
            title: "Events and Effects",
            bullets: [
                "Code that responds to a specific click or submission belongs in that event handler.",
                "An order request, for example, starts in the form’s submit handler.",
                "An Effect keeps external work in sync with props or state while the component is on the page.",
                "A connection for the current `roomId` is one example."
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
