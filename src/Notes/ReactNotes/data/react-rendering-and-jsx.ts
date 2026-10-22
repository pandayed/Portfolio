import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "react-rendering-and-jsx",
    title: "Components and JSX",
    summary: "Components, JSX markup, and JavaScript expressions.",
    scope: "react",
    updatedOn: "2026-10-14",
    inlineCode: true,
    exampleLayout: "grouped",
    sections: [
        {
            id: "components-describe-ui",
            title: "Components",
            bullets: [
                "A component is a JavaScript function that returns the UI to display.",
                "JSX lets you write HTML-like markup inside JavaScript.",
                "Component names start with a capital letter.",
                "Lowercase tags name browser elements.",
                "Component definitions belong at the top level of the file.",
                "JSX lets React control component calls.",
                "The examples require an existing React app, JavaScript modules, and basic HTML."
            ],
            examples: [
                {
                    title: "Heading component",
                    description: [
                        "The page contains a heading component."
                    ],
                    language: "jsx",
                    code: `function Welcome() {
    return <h1>React lessons</h1>;
}

export default function App() {
    return <main><Welcome /></main>;
}`,
                    result: "The page shows the heading “React lessons”.",
                    explanation: [
                        "`App` includes `Welcome` as a child.",
                        "React calls `Welcome` to get its markup."
                    ]
                }
            ]
        },
        {
            id: "jsx-rules",
            title: "JSX markup rules",
            bullets: [
                "Every tag needs a closing tag or a self-closing form, such as `<br />`.",
                "Adjacent tags need a parent element or `<>...</>`.",
                "This empty wrapper is a Fragment.",
                "It adds no browser element.",
                "`className` sets CSS classes.",
                "Most element properties use `camelCase`, such as `tabIndex`.",
                "`aria-*` and `data-*` attributes keep their dashed form."
            ],
            examples: [
                {
                    title: "Adjacent elements",
                    description: [
                        "The heading and paragraph share a Fragment without an extra browser element."
                    ],
                    language: "jsx",
                    code: `export default function Profile() {
    return (
        <>
            <h1 className="profile-title">Ada Lovelace</h1>
            <p>Mathematician and writer</p>
        </>
    );
}`,
                    result: "A heading and paragraph appear.",
                    explanation: [
                        "The Fragment groups both tags into one return expression.",
                        "The CSS class applies styling only if the project defines it."
                    ]
                }
            ]
        },
        {
            id: "javascript-expressions",
            title: "JavaScript expressions in JSX",
            bullets: [
                "Braces contain JavaScript expressions in JSX text or attributes.",
                "Quotes contain a literal string attribute.",
                "React displays strings and numbers as text.",
                "It displays no text for `null`, `undefined`, or booleans.",
                "JSX can display an object property or elements built from its data.",
                "A plain object cannot be a JSX child."
            ],
            examples: [
                {
                    title: "Course title",
                    description: [
                        "The example reads an existing JavaScript object."
                    ],
                    language: "jsx",
                    code: `const course = { title: 'React basics', completed: 3 };

export default function CourseStatus() {
    return <p title={course.title}>
        {course.title}: {course.completed} lessons complete
    </p>;
}`,
                    result: "React basics: 3 lessons complete",
                    explanation: [
                        "The braces read properties from `course`.",
                        "Quoting `title=\"course.title\"` would pass those literal characters."
                    ]
                }
            ]
        }
    ],
    references: [
        {
            title: "React: Your first component",
            href: "https://react.dev/learn/your-first-component"
        },
        {
            title: "React: Writing markup with JSX",
            href: "https://react.dev/learn/writing-markup-with-jsx"
        },
        {
            title: "React: JavaScript in JSX",
            href: "https://react.dev/learn/javascript-in-jsx-with-curly-braces"
        }
    ]
};

export default note;
