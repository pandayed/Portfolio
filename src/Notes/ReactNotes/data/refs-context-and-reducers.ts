import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "refs-context-and-reducers",
    title: "Refs and DOM access",
    summary: "Keep values outside rendering and access browser elements through refs.",
    scope: "react",
    updatedOn: "2026-10-14",
    exampleLayout: "grouped",
    sections: [
        {
            id: "refs",
            title: "Keep a value in a ref",
            bullets: [
                "useRef(initialValue) returns a stable object with a current property. The same object persists across renders.",
                "Changing current does not request a render. Use state for values that must change visible JSX.",
                "Read or write refs in handlers. Avoid reading or writing them during rendering, except predictable initialization.",
                "For an expensive initial object, start the ref at null and create it only when current is null. This render-time initialization is allowed only when the result is predictable and the same on repeated calls."
            ],
            examples: [
                {
                    title: "Count handler calls without rendering them",
                    description: [
                        "Track clicks separately from the displayed UI."
                    ],
                    language: "jsx",
                    code: `import { useRef } from 'react';

export default function ClickTracker() {
    const clicks = useRef(0);
    function recordClick() {
        clicks.current += 1;
        alert('Recorded clicks: ' + clicks.current);
    }
    return <button onClick={recordClick}>Record click</button>;
}`,
                    result: "Each click reports a larger count. The button text stays Record click.",
                    explanation: [
                        "The handler changes current. It does not update JSX or request another render."
                    ]
                }
            ]
        },
        {
            id: "dom-refs",
            title: "Access a DOM element after it is attached",
            bullets: [
                "Pass a ref to a browser element with its ref property. React puts the attached DOM node in current.",
                "current is null before attachment and after removal. Check it before calling browser methods.",
                "Use refs for focus, scrolling, or measurement. Let React manage the content and structure it renders."
            ],
            examples: [
                {
                    title: "Focus a message field",
                    description: [
                        "Focus the input when the user clicks Edit."
                    ],
                    language: "jsx",
                    code: `import { useRef } from 'react';

export default function MessageField() {
    const inputRef = useRef(null);
    return <>
        <label>Message <input ref={inputRef} /></label>
        <button onClick={() => inputRef.current?.focus()}>Edit</button>
    </>;
}`,
                    result: "Clicking Edit moves keyboard focus to the input.",
                    explanation: [
                        "The optional call handles a null current value. The click happens after React has attached the input."
                    ]
                }
            ]
        },
        {
            id: "choosing-tool",
            title: "Choose state or a ref by the update needed",
            bullets: [],
            table: {
                columns: [
                    "Need",
                    "Use"
                ],
                rows: [
                    [
                        "A changing value shown in JSX",
                        "State"
                    ],
                    [
                        "A DOM element for focus or scroll",
                        "Ref"
                    ],
                    [
                        "A timer ID used for cancellation",
                        "Ref"
                    ],
                    [
                        "A new object calculated for the current render",
                        "Local variable"
                    ]
                ]
            }
        }
    ],
    references: [
        {
            title: "React: Referencing values with refs",
            href: "https://react.dev/learn/referencing-values-with-refs"
        },
        {
            title: "React: DOM access with refs",
            href: "https://react.dev/learn/manipulating-the-dom-with-refs"
        }
    ]
};

export default note;
