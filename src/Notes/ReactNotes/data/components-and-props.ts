import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'components-and-props',
    title: 'Components and props',
    summary: 'Pass data into components, explain typed props, and compose content with children and callback functions.',
    scope: 'react',
    updatedOn: '2026-10-07',
    sections: [
        {
            id: 'define-and-use-components',
            title: 'Define and use components',
            bullets: [
                'A parent component includes another component in its returned JSX. That included component is the child.',
                'Define component functions at the top level of the file, outside other components.',
                'Read React rendering and JSX first for component names, JSX tags, and braces.',
                'Each use of a component gives it a separate position in the displayed UI.',
            ],
            examples: [
                {
                    title: 'Compose a page from components',
                    language: 'jsx',
                    code: `function PageTitle() {
    return <h1>Today's tasks</h1>;
}

export default function TaskPage() {
    return (
        <main>
            <PageTitle />
            <p>Review component props</p>
        </main>
    );
}`,
                    result: 'The page shows “Today’s tasks” followed by “Review component props”. TaskPage is the parent of PageTitle.',
                },
            ],
            pitfalls: [
                'Defining function PageTitle() inside TaskPage creates a new component function each time TaskPage renders. React may reset that child’s state. Keep the declaration outside TaskPage.',
            ],
        },
        {
            id: 'typed-props',
            title: 'Pass props, then describe their types',
            bullets: [
                'Props are named values a parent passes to a child. React gives the child one object containing those values.',
                'In <Badge label="Unread" count={4} />, label is text and count is a JavaScript number.',
                'The child can read props.label and props.count. Props do not need TypeScript to work.',
                'In TSX, type BadgeProps = { ... } names the object type. label: string means text. count: number means a number.',
                'The annotation props: BadgeProps checks the component parameter.',
                'Object destructuring reads named properties into variables. ({ label, count }: BadgeProps) is a shorter form of reading props.label and props.count.',
                'Props may also contain arrays, objects, functions, or JSX. Describe each value with a suitable type when using TSX.',
            ],
            examples: [
                {
                    title: 'Read the props object',
                    language: 'jsx',
                    code: `function Badge(props) {
    return <p>{props.label}: {props.count}</p>;
}

export default function Inbox() {
    return <Badge label="Unread" count={4} />;
}`,
                    result: 'The page shows “Unread: 4”. React supplies the object { label: "Unread", count: 4 } to Badge.',
                },
                {
                    title: 'Check the same props with TypeScript',
                    language: 'tsx',
                    code: `type BadgeProps = {
    label: string;
    count: number;
};

function Badge({ label, count }: BadgeProps) {
    return <p>{label}: {count}</p>;
}

export default function Inbox() {
    return <Badge label="Unread" count={4} />;
}`,
                    result: 'The page still shows “Unread: 4”. Type declarations do not change the displayed result.',
                    typeCheck: 'In <Badge label="Unread" count="4" />, count="4" is the exact failing property. It supplies text where BadgeProps requires a number. Use count={4}. In <Badge label="Unread" />, the entire Badge element is missing the required count property.',
                },
            ],
        },
        {
            id: 'optional-props-and-defaults',
            title: 'Use optional props and defaults',
            bullets: [
                'The ? in tone?: ... means the parent may omit tone.',
                'The type "info" | "warning" is a union: a supplied tone must be one of those two strings.',
                'The destructured parameter tone = "info" supplies a default when tone is missing or undefined.',
                'A JavaScript default does not replace null, false, 0, or an empty string.',
                'Here the TypeScript type allows only the listed strings or omission. With strict null checks, it rejects null before execution.',
            ],
            examples: [
                {
                    title: 'Compare default and supplied values',
                    language: 'tsx',
                    code: `type NoticeProps = {
    message: string;
    tone?: "info" | "warning";
};

function Notice({ message, tone = "info" }: NoticeProps) {
    return <p data-tone={tone}>{message} ({tone})</p>;
}

export default function App() {
    return (
        <>
            <Notice message="Profile saved" />
            <Notice message="Check your email" tone="warning" />
        </>
    );
}`,
                    result: 'The page shows “Profile saved (info)” and “Check your email (warning)”. Each paragraph also receives its data-tone attribute.',
                    typeCheck: 'tone="urgent" on a Notice element is a type error at that property. Use "info" or "warning", or omit tone.',
                },
            ],
        },
        {
            id: 'children-prop',
            title: 'Pass nested JSX with children',
            bullets: [
                'JSX written between a component’s opening and closing tags becomes its children prop.',
                'The component displays that content by placing {children} in its returned JSX.',
                'ReactNode is React’s TypeScript type for renderable content, including JSX elements, strings, numbers, arrays of content, and empty content.',
                'import type loads a name for TypeScript checking. It does not import a runtime value.',
                'children: ReactNode describes the supplied content. It does not automatically render that content.',
            ],
            examples: [
                {
                    title: 'Build a panel that displays nested content',
                    language: 'tsx',
                    code: `import type { ReactNode } from 'react';

type PanelProps = {
    title: string;
    children: ReactNode;
};

function Panel({ title, children }: PanelProps) {
    return (
        <section>
            <h2>{title}</h2>
            {children}
        </section>
    );
}

export default function App() {
    return (
        <Panel title="Account">
            <p>Your profile is complete.</p>
        </Panel>
    );
}`,
                    result: 'The page shows the Account heading followed by “Your profile is complete.” Both appear inside the section returned by Panel.',
                },
            ],
        },
        {
            id: 'props-are-read-only',
            title: 'Treat props as read-only',
            bullets: [
                'A child reads the props supplied for the current render. It must not change those props or objects received through them.',
                'A parent can pass a callback prop: a function the child may call to request an action.',
                'The type () => void means a function with no parameters and no return value the caller uses.',
                'onClick={onSave} passes the callback to React. It does not call the callback during rendering.',
                'The document object gives access to the browser page. Assigning document.title changes the browser tab title.',
                'When an action changes React state, the component that owns that state uses its setter. State and events explains setters.',
            ],
            examples: [
                {
                    title: 'Ask the parent to handle Save',
                    language: 'tsx',
                    code: `type SaveButtonProps = {
    onSave: () => void;
};

function SaveButton({ onSave }: SaveButtonProps) {
    return <button onClick={onSave}>Save</button>;
}

export default function Toolbar() {
    function saveProfile() {
        document.title = "Profile saved";
    }

    return <SaveButton onSave={saveProfile} />;
}`,
                    result: 'The page shows Save. Clicking it calls saveProfile and changes the browser tab title to “Profile saved”. The child does not modify its props.',
                },
            ],
            pitfalls: [
                'An assignment such as profile.name = "Ada" inside a child changes the object passed by its parent. This violates React’s read-only props rule. It may produce stale UI rather than a runtime exception. Ask the parent to update its data instead.',
            ],
        },
    ],
};

export default note;
