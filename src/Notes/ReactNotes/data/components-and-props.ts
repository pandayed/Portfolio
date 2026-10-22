import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "components-and-props",
    title: "Props and composition",
    summary: "Props, default values, and nested content.",
    scope: "react",
    updatedOn: "2026-10-14",
    inlineCode: true,
    exampleLayout: "grouped",
    sections: [
        {
            id: "typed-props",
            title: "Props",
            bullets: [
                "Props are the named values a parent passes to a child.",
                "React gives the child one object containing them.",
                "The child can read the object directly or destructure its properties in the function parameter.",
                "Props are read-only.",
                "Assigning to a prop or changing an object received through props breaks this rule."
            ],
            examples: [
                {
                    title: "Badges with different props",
                    description: [
                        "The example displays two badges with different counts."
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
                        "Each element passes its own `label` and `count`.",
                        "`Badge` reads them without changing them."
                    ]
                }
            ]
        },
        {
            id: "optional-props-and-defaults",
            title: "Default prop values",
            bullets: [
                "A destructured parameter can have a JavaScript default.",
                "The default applies when the prop is omitted or `undefined`.",
                "It does not replace `null`, `false`, `0`, or an empty string."
            ],
            examples: [
                {
                    title: "Default notice tone",
                    description: [
                        "An omitted `tone` defaults to `info`."
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
                        "The first `Notice` uses the default.",
                        "The second supplies its own `tone`."
                    ]
                }
            ]
        },
        {
            id: "children-prop",
            title: "Nested content and children",
            bullets: [
                "JSX between a component’s opening and closing tags becomes its `children` prop.",
                "The component chooses where to place that content.",
                "Receiving `children` does not display it automatically."
            ],
            examples: [
                {
                    title: "Panel content",
                    description: [
                        "The panel accepts different nested content."
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
                        "`Panel` inserts `children` after its heading.",
                        "The parent supplies the paragraph."
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
