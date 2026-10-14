import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "hooks-and-rules",
    title: "Hook call order",
    summary: "Place Hook calls consistently and distinguish Hook calls from setter calls.",
    scope: "react",
    updatedOn: "2026-10-14",
    exampleLayout: "grouped",
    sections: [
        {
            id: "top-level-only",
            title: "Keep Hook calls in the same order",
            bullets: [
                "React associates conventional Hook calls with their position in the component’s calls. Keep the same order on every render.",
                "Place Hook calls before conditional returns. Put conditions inside the Hook’s work or after the call.",
                "Call Hooks only from components or custom Hooks. Custom Hooks are introduced after the state and Effect lessons.",
                "A setter returned by useState is an ordinary function. Calling it in a handler does not violate the Hook call rule."
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
                        "useState runs in both branches. Moving it below the early return would change the call order across renders."
                    ]
                }
            ]
        },
        {
            id: "lint-and-types",
            title: "Use Hook lint rules",
            bullets: [
                "The rules-of-hooks lint rule reports invalid Hook placement. A passing type check does not prove correct Hook call order.",
                "The exhaustive-deps rule checks values read by Effect and memo callbacks. The Effects lesson explains dependencies.",
                "Do not silence these rules to preserve an invalid pattern. Fix the placement or dependency relationship."
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
