import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "conditional-rendering-lists-and-keys",
    title: "Conditions, lists, and keys",
    summary: "Conditional content, array items, and stable keys.",
    scope: "react",
    updatedOn: "2026-10-14",
    inlineCode: true,
    exampleLayout: "grouped",
    sections: [
        {
            id: "branch-before-jsx",
            title: "Conditional content",
            bullets: [
                "JavaScript `if` statements can return different content.",
                "Returning `null` displays nothing.",
                "Inside JSX, a ternary expression selects between two choices.",
                "`&&` includes content only when its left side is truthy.",
                "A truthy value counts as true in a condition.",
                "The left side of `&&` should be a boolean.",
                "A number such as `0` can become visible text."
            ],
            examples: [
                {
                    title: "Completion message",
                    description: [
                        "The condition selects a label and controls the extra information."
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
                        "`remaining > 0` is boolean.",
                        "`remaining && <p>...</p>` would display `0` when `remaining` is zero."
                    ]
                }
            ]
        },
        {
            id: "render-arrays",
            title: "Lists and keys",
            bullets: [
                "`map` creates an element for each array item.",
                "`filter` before `map` selects which items appear in the list.",
                "The outer element returned for each item needs a `key`.",
                "The `key` identifies that item among its siblings.",
                "A stable ID from the data identifies the same item after reordering.",
                "Random keys and array positions do not reliably identify items in lists that change order.",
                "React uses `key` internally.",
                "A child needs a separate prop to read the ID."
            ],
            examples: [
                {
                    title: "Unfinished tasks",
                    description: [
                        "The filtered list keeps stable item identities."
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
                        "The `key` stays `state` even if another task is inserted before it.",
                        "`taskId` separately supplies the ID to `TaskRow`."
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
