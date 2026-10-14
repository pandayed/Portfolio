import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "components-and-props",
    title: "Props and composition",
    summary: "Pass values to children, set defaults, and place nested content with children.",
    scope: "react",
    updatedOn: "2026-10-14",
    exampleLayout: "grouped",
    sections: [
        {
            id: "typed-props",
            title: "Pass props to a child",
            bullets: [
                "Props are the named values a parent passes to a child. React gives the child one object containing them.",
                "Read that object directly or destructure its properties in the function parameter.",
                "Props are read-only. Do not assign to a prop or change an object received through props."
            ],
            examples: [
                {
                    title: "Reuse a badge with different data",
                    description: [
                        "Display two badges with different counts."
                    ],
                    language: "jsx",
                    code: `function Badge({ label, count }) {
    return <p>{label}: {count}</p>;
}

export default function Inbox() {
    return <>
        <Badge label="Unread" count={4} />
        <Badge label="Drafts" count={2} />
    </>;
}`,
                    result: `Unread: 4
Drafts: 2`,
                    explanation: [
                        "Each element passes its own label and count. Badge reads them without changing them."
                    ]
                }
            ]
        },
        {
            id: "optional-props-and-defaults",
            title: "Supply defaults for omitted props",
            bullets: [
                "A destructured parameter can have a JavaScript default.",
                "The default applies when the prop is omitted or undefined. It does not replace null, false, 0, or an empty string."
            ],
            examples: [
                {
                    title: "Use a default notice tone",
                    description: [
                        "Give omitted tones an info label."
                    ],
                    language: "jsx",
                    code: `function Notice({ message, tone = 'info' }) {
    return <p data-tone={tone}>{message} ({tone})</p>;
}

export default function App() {
    return <>
        <Notice message="Profile saved" />
        <Notice message="Check your email" tone="warning" />
    </>;
}`,
                    result: `Profile saved (info)
Check your email (warning)`,
                    explanation: [
                        "The first Notice uses the default. The second supplies its own tone."
                    ]
                }
            ]
        },
        {
            id: "children-prop",
            title: "Compose content with children",
            bullets: [
                "JSX between a component’s opening and closing tags becomes its children prop.",
                "The component chooses where to place that content. Receiving children does not display it automatically."
            ],
            examples: [
                {
                    title: "Place nested content inside a panel",
                    description: [
                        "Build a panel that can contain different content."
                    ],
                    language: "jsx",
                    code: `function Panel({ title, children }) {
    return <section>
        <h2>{title}</h2>
        {children}
    </section>;
}

export default function App() {
    return <Panel title="Account">
        <p>Your profile is complete.</p>
    </Panel>;
}`,
                    result: `Account
Your profile is complete.`,
                    explanation: [
                        "Panel inserts children after its heading. The parent supplies the paragraph."
                    ]
                }
            ]
        }
    ],
    references: [
        {
            title: "React: Passing props to a component",
            href: "https://react.dev/learn/passing-props-to-a-component"
        }
    ]
};

export default note;
