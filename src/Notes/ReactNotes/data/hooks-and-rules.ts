import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "hooks-and-rules",
    title: "Rules of Hooks",
    summary: "Call Hooks at the top level of components or custom Hooks, in the same order on every render.",
    scope: "react",
    updatedOn: "2026-10-14",
    exampleLayout: "grouped",
    sections: [
        {
            id: "top-level-only",
            title: "Keep Hook calls in the same order",
            bullets: [
                "React remembers each Hook’s state by the order in which the component calls its Hooks.",
                "Call Hooks at the top level, before any early return. Do not call them inside conditions, loops, or event handlers.",
                "Call Hooks only from React components or custom Hooks. A custom Hook is a function whose name starts with use and that calls other Hooks.",
                "These rules apply to Hook calls such as useState(). The returned setter, such as setCount, can be called in an event handler.",
                "The React 19 use API is an exception: it can be called in conditions and loops."
            ],
            examples: [
                {
                    title: "Call state before an early return",
                    description: [
                        "Allow a prop to change the content without skipping a Hook."
                    ],
                    language: "jsx",
                    code: `import { useState } from 'react';

export default function Greeting({ signedIn }) {
    const [visits, setVisits] = useState(0);
    if (!signedIn) return <p>Please sign in.</p>;
    return <button onClick={() => setVisits(current => current + 1)}>
        Visits: {visits}
    </button>;
}`,
                    result: "A signed-in user sees the counter. Otherwise the component shows Please sign in.",
                    explanation: [
                        "useState runs whether signedIn is true or false. If it came after the early return, React would skip it when signedIn is false."
                    ]
                }
            ]
        }
    ],
    references: [
        {
            title: "React: Rules of Hooks",
            href: "https://react.dev/reference/rules/rules-of-hooks"
        }
    ]
};

export default note;
