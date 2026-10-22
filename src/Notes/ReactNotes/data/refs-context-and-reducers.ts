import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "refs-context-and-reducers",
    title: "Refs and DOM access",
    summary: "Values kept between renders and direct access to page elements.",
    scope: "react",
    updatedOn: "2026-10-14",
    inlineCode: true,
    exampleLayout: "grouped",
    sections: [
        {
            id: "refs",
            title: "Ref values",
            bullets: [
                "`useRef(initialValue)` returns an object with a `current` property.",
                "React keeps the same object between renders.",
                "`ref.current` reads or updates the stored value.",
                "Changing it does not re-render the component.",
                "State changes can update the screen.",
                "Event handlers and Effects can read or update refs.",
                "Rendering must not read or update `current`, except for the initial-value case below.",
                "A ref can start at `null` when creating its initial object is expensive.",
                "Rendering can create and assign that object only while `current` is `null`.",
                "This is allowed when creating it always produces the same result."
            ],
            examples: [
                {
                    title: "Click count in a ref",
                    description: [
                        "A ref tracks clicks separately from the displayed UI."
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
                        "The handler changes `current`.",
                        "It does not update JSX or request another render."
                    ]
                }
            ]
        },
        {
            id: "dom-refs",
            title: "DOM refs",
            bullets: [
                "The `ref` prop passes a ref to an element.",
                "After React adds the element to the page, `current` holds its browser DOM node, such as an input element.",
                "`current` is `null` before React adds the element to the page and after React removes it.",
                "Methods such as `focus()` need a `null` check first.",
                "Refs provide direct access for focus, scrolling, or measurement.",
                "React manages the content and structure it renders."
            ],
            examples: [
                {
                    title: "Input focus",
                    description: [
                        "Clicking Edit focuses the input."
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
                        "The `?.` checks that `current` is not `null` before calling `focus()`.",
                        "The input is already on the page when the user clicks Edit."
                    ]
                }
            ]
        },
        {
            id: "choosing-tool",
            title: "State, refs, and local variables",
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
