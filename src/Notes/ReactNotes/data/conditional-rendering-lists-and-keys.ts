import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "conditional-rendering-lists-and-keys",
    title: "Conditions, lists, and keys",
    summary: "Choose content with conditions and identify array items with stable keys.",
    scope: "react",
    updatedOn: "2026-10-14",
    exampleLayout: "grouped",
    sections: [
        {
            id: "branch-before-jsx",
            title: "Choose content with a condition",
            bullets: [
                "Use JavaScript if statements to return different content. Return null when the component should display nothing.",
                "Inside JSX, use a ternary for two choices or && to include content only when a condition is true.",
                "Put a boolean on the left of &&. A number such as 0 can become visible text."
            ],
            examples: [
                {
                    title: "Show a completion message",
                    description: [
                        "Choose a label and optionally display extra information."
                    ],
                    language: "jsx",
                    code: `function Task({ done, remaining }) {
    if (done) return <p>Task complete</p>;
    return <>
        <p>{remaining === 1 ? 'One step left' : 'More steps left'}</p>
        {remaining > 0 && <p>Remaining: {remaining}</p>}
    </>;
}

export default function App() {
    return <Task done={false} remaining={2} />;
}`,
                    result: `More steps left
Remaining: 2`,
                    explanation: [
                        "remaining > 0 is boolean. remaining && <p>...</p> would display 0 when remaining is zero."
                    ]
                }
            ]
        },
        {
            id: "render-arrays",
            title: "Render an array with map",
            bullets: [
                "Use map to create an element for each array item. Use filter before map when only some items belong in the list.",
                "Give the outer element returned for each item a key. The key identifies that item among its siblings.",
                "Use a stable ID from the data. Avoid random keys and array positions for lists that can change order.",
                "key is used by React. Pass the ID as a separate prop when a child needs to read it."
            ],
            examples: [
                {
                    title: "Display unfinished tasks",
                    description: [
                        "Keep stable identities while filtering the list."
                    ],
                    language: "jsx",
                    code: `const tasks = [
    { id: 'props', title: 'Practice props', done: true },
    { id: 'state', title: 'Practice state', done: false },
];

function TaskRow({ taskId, title }) {
    return <li data-task-id={taskId}>{title}</li>;
}

export default function TaskList() {
    return <ul>{tasks.filter(task => !task.done).map(task =>
        <TaskRow key={task.id} taskId={task.id} title={task.title} />
    )}</ul>;
}`,
                    result: "One list item appears: Practice state.",
                    explanation: [
                        "The key stays state even if another task is inserted before it. taskId separately supplies the ID to TaskRow."
                    ]
                }
            ]
        }
    ],
    references: [
        {
            title: "React: Conditional rendering",
            href: "https://react.dev/learn/conditional-rendering"
        },
        {
            title: "React: Rendering lists",
            href: "https://react.dev/learn/rendering-lists"
        }
    ]
};

export default note;
