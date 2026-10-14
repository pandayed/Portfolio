import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "react-rendering-and-jsx",
    title: "Components and JSX",
    summary: "Write a component, use JSX markup, and display JavaScript data.",
    scope: "react",
    updatedOn: "2026-10-14",
    exampleLayout: "grouped",
    sections: [
        {
            id: "components-describe-ui",
            title: "Write and use a component",
            bullets: [
                "A component is a JavaScript function that returns the UI to display.",
                "JSX lets you write HTML-like markup inside JavaScript.",
                "Component names start with a capital letter. Lowercase tags name browser elements.",
                "Put component definitions at the top level of the file. Use a component with JSX so React controls its calls.",
                "Use these examples as the main component in an existing React app. JavaScript modules and basic HTML are prerequisites."
            ],
            examples: [
                {
                    title: "Display a heading component",
                    description: [
                        "Display a heading inside a page."
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
                        "App includes Welcome as a child. React calls Welcome to get its markup."
                    ]
                }
            ]
        },
        {
            id: "jsx-rules",
            title: "Follow JSX markup rules",
            bullets: [
                "Close every tag, including empty tags such as <br />.",
                "Wrap adjacent tags in a parent element or <>...</>. This empty wrapper is a Fragment. It adds no browser element.",
                "Use className for CSS classes. Most element properties use camelCase, such as tabIndex.",
                "Keep aria-* and data-* attributes in their dashed form."
            ],
            examples: [
                {
                    title: "Return adjacent elements",
                    description: [
                        "Display a heading and paragraph without adding a wrapper element."
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
                        "The Fragment groups both tags into one return expression. The CSS class applies styling only if the project defines it."
                    ]
                }
            ]
        },
        {
            id: "javascript-expressions",
            title: "Display data with braces",
            bullets: [
                "Place JavaScript inside braces in JSX text or an attribute. Use quotes for a literal string attribute.",
                "React displays strings and numbers as text. It displays no text for null, undefined, or booleans.",
                "For an object, display a property or turn its data into elements. A plain object cannot be a JSX child."
            ],
            examples: [
                {
                    title: "Display a course title",
                    description: [
                        "Use an object already stored in JavaScript."
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
                        "The braces read properties from course. Quoting title=\"course.title\" would pass those literal characters."
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
