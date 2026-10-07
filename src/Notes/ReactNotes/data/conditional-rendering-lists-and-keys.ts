import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'conditional-rendering-lists-and-keys',
    title: 'Conditional rendering, lists, and keys',
    summary: 'Choose JSX with conditions, turn array data into list items, and keep each item’s identity stable.',
    scope: 'react',
    updatedOn: '2026-10-07',
    sections: [
        {
            id: 'branch-before-jsx',
            title: 'Branch before returning JSX',
            bullets: [
                'A conditional render chooses content based on the current data.',
                'An if statement can return one JSX result for true and another result for false.',
                'Return null when a component should display nothing. Returning null does not itself remove that component’s React state.',
                'Read Components and props first. The examples use typed props and object destructuring from that page.',
            ],
            examples: [
                {
                    title: 'Choose a loading message or profile',
                    language: 'tsx',
                    code: `type ProfileProps = {
    name: string;
    loading: boolean;
};

function Profile({ name, loading }: ProfileProps) {
    if (loading) {
        return <p>Loading profile…</p>;
    }
    return <h2>{name}</h2>;
}

export default function App() {
    return <Profile name="Grace Hopper" loading={false} />;
}`,
                    result: 'The page shows “Grace Hopper”. Change loading={false} to loading={true} to show “Loading profile…” instead. boolean means true or false.',
                },
            ],
        },
        {
            id: 'conditions-inside-jsx',
            title: 'Choose content inside JSX',
            bullets: [
                'condition ? firstValue : secondValue is a conditional expression. It returns firstValue when the condition is true, and secondValue otherwise.',
                'condition && content returns content when condition is true. When condition is false, it returns false, which React does not display.',
                'Use a boolean condition with &&. Numbers behave differently: 0 && content returns 0, and React displays that number.',
                'Keep complex if statements before the return. Braces inside JSX accept expressions, not an if statement.',
            ],
            examples: [
                {
                    title: 'Select a label and show extra content',
                    language: 'tsx',
                    code: `type AccessProps = {
    signedIn: boolean;
    isAdmin: boolean;
};

function AccessStatus({ signedIn, isAdmin }: AccessProps) {
    return (
        <section>
            <p>{signedIn ? "Signed in" : "Guest"}</p>
            {isAdmin && <p>Admin tools available</p>}
        </section>
    );
}

export default function App() {
    return <AccessStatus signedIn={true} isAdmin={false} />;
}`,
                    result: 'The page shows only “Signed in”. Setting isAdmin={true} adds “Admin tools available”. Setting signedIn={false} changes the first line to “Guest”.',
                },
                {
                    title: 'Identify an unexpected zero',
                    language: 'jsx',
                    code: `export default function MessageCount() {
    const count = 0;
    return <section>{count && <p>New messages</p>}</section>;
}`,
                    result: 'The page shows 0. The expression count && <p>New messages</p> returns count when count is 0. This is valid JavaScript, not an exception. Use count > 0 && <p>New messages</p> to show nothing for zero.',
                },
            ],
        },
        {
            id: 'render-arrays',
            title: 'Render arrays with map',
            bullets: [
                'map is an array method that calls a function for each item and collects the returned values into a new array.',
                'In tasks.map(task => (...)), task is the current item. The arrow function returns the JSX inside the parentheses.',
                'Task[] means an array whose items have the Task type.',
                'React renders each element in the JSX array. Give the outer JSX element for each item a key, explained in the next section.',
                'filter returns a new array containing only items whose callback returns true. Apply it before map to display only matching items.',
            ],
            examples: [
                {
                    title: 'Display tasks from data',
                    language: 'tsx',
                    code: `type Task = {
    id: string;
    title: string;
    done: boolean;
};

const tasks: Task[] = [
    { id: "types", title: "Read prop types", done: true },
    { id: "state", title: "Practice state", done: false },
];

export default function TaskList() {
    return (
        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                    {task.title}: {task.done ? "Complete" : "Open"}
                </li>
            ))}
        </ul>
    );
}`,
                    result: 'The list shows “Read prop types: Complete” and “Practice state: Open”. tasks.map produces two li elements. Use tasks.filter(task => !task.done).map(...) in the same place to display only the open task.',
                },
            ],
            pitfalls: [
                'In tasks.map(task => { <li key={task.id}>{task.title}</li>; }), the braces create a function body. There is no return, so each callback produces undefined and the list displays nothing. Use parentheses as above, or write return <li ...>...</li> inside the function body.',
            ],
        },
        {
            id: 'keys-identify-siblings',
            title: 'Keys identify list items',
            bullets: [
                'A key lets React match a list item with the same item in the next render. This preserves the right component state when items move.',
                'Siblings are elements in the same list. Their keys must be unique. Different lists can reuse the same key.',
                'Use an ID stored with each data item. Keep that ID unchanged while the item exists.',
                'Put key on the element returned directly from map, including a custom component.',
                'React reads key itself. The child does not receive it as a normal prop. Pass a separate taskId prop if the child needs the ID.',
            ],
            examples: [
                {
                    title: 'Pass an ID separately from key',
                    language: 'tsx',
                    code: `type Task = { id: string; title: string };
type RowProps = { taskId: string; title: string };

const tasks: Task[] = [
    { id: "state", title: "Practice state" },
    { id: "forms", title: "Build a form" },
];

function TaskRow({ taskId, title }: RowProps) {
    return <li data-task-id={taskId}>{title}</li>;
}

export default function TaskList() {
    return (
        <ul>
            {tasks.map(task => (
                <TaskRow key={task.id} taskId={task.id} title={task.title} />
            ))}
        </ul>
    );
}`,
                    result: 'The list shows “Practice state” and “Build a form”. React uses each key to identify the row. TaskRow reads taskId to set the data-task-id attribute.',
                },
            ],
            pitfalls: [
                'In tasks.map(task => <TaskRow taskId={task.id} title={task.title} />), the returned TaskRow element has no key. React reports a missing-key warning. A key on the li inside TaskRow does not fix that warning. Add key={task.id} to TaskRow.',
            ],
        },
        {
            id: 'avoid-unstable-keys',
            title: 'Avoid unstable keys',
            bullets: [
                'An array index identifies a position. After insertion, deletion, or sorting, a different item may occupy that position.',
                'Using the index as key can attach an old row’s state or input value to a different data item.',
                'A random key changes on every render. React removes the old component and creates a new one, which resets its state.',
                'Assign IDs when items are created or loaded. Do not generate new IDs while rendering.',
            ],
            examples: [
                {
                    title: 'See why a key based on position changes meaning',
                    language: 'javascript',
                    code: `const before = [
    { id: "ada", name: "Ada" },
    { id: "grace", name: "Grace" },
];
const after = [
    { id: "linus", name: "Linus" },
    ...before,
];`,
                    result: '...before copies the previous items into the new array. Before insertion, index 0 identifies Ada. After insertion, index 0 identifies Linus. The stored ID "ada" still identifies Ada in both arrays.',
                },
            ],
            pitfalls: [
                'key={Math.random()} is the exact cause of a new identity on every render. Replace it with key={item.id}. This usually causes state loss, not a thrown exception.',
                'Use index keys only if item positions stay fixed. Use stable data IDs for lists that can insert, delete, or reorder items.',
            ],
        },
    ],
};

export default note;
