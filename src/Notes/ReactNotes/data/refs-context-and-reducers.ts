import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "refs-context-and-reducers",
    title: "Refs and DOM access",
    summary: "Store values with useRef without re-rendering, or use a ref to access a page element.",
    scope: "react",
    updatedOn: "2026-10-14",
    exampleLayout: "grouped",
    sections: [
        {
            id: "refs",
            title: "Store a value with useRef",
            bullets: [
                "useRef(initialValue) returns an object with a current property. React keeps the same object between renders.",
                "Read or update the stored value through ref.current. Changing it does not re-render the component. Use state when a change should update the screen.",
                "Read or update refs in event handlers or Effects. Do not read or update current during rendering, except when setting its initial value as described below.",
                "If creating the initial object is expensive, start the ref at null. During rendering, create and assign the object only while current is null. This is allowed when creating it always produces the same result."
            ],
            examples: [
                {
                    title: "Count clicks without re-rendering",
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
            title: "Access a page element with a ref",
            bullets: [
                "Pass a ref to an element with its ref prop. After React adds the element to the page, current holds its browser DOM node, such as an input element.",
                "current is null before React adds the element to the page and after React removes it. Check it before calling methods such as focus().",
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
                        "The ?. checks that current is not null before calling focus(). The input is already on the page when the user clicks Edit."
                    ]
                }
            ]
        },
        {
            id: "choosing-tool",
            title: "When to use state, a ref, or a local variable",
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
