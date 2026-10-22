import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "hooks-and-rules",
    title: "Rules of Hooks",
    summary: "Hook call order and top-level rules.",
    scope: "react",
    updatedOn: "2026-10-14",
    inlineCode: true,
    exampleLayout: "grouped",
    sections: [
        {
            id: "top-level-only",
            title: "Hook order",
            bullets: [
                "React remembers each Hook’s state by the order in which the component calls its Hooks.",
                "Hooks must run at the top level, before any early return.",
                "Conditions, loops, and event handlers must not contain Hook calls.",
                "Only React components and custom Hooks can call Hooks.",
                "A custom Hook is a function whose name starts with `use` and that calls other Hooks.",
                "These rules apply to Hook calls such as `useState()`.",
                "The returned setter, such as `setCount`, can be called in an event handler.",
                "The React 19 `use` API is an exception: it can be called in conditions and loops."
            ],
            examples: [
                {
                    title: "Hooks and early returns",
                    description: [
                        "A prop changes the content without skipping a Hook."
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
                        "`useState` runs whether `signedIn` is `true` or `false`.",
                        "If it came after the early return, React would skip it when `signedIn` is `false`."
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
