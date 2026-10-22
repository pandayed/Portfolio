import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "objects-and-arrays-in-state",
    title: "Objects and arrays in state",
    summary: "Object and array updates that preserve previous state.",
    scope: "react",
    updatedOn: "2026-10-14",
    inlineCode: true,
    exampleLayout: "grouped",
    sections: [
        {
            id: "replace-objects",
            title: "Nested state objects",
            bullets: [
                "Objects stored in state are read-only.",
                "A property update requires a new object.",
                "Spread syntax copies one level.",
                "A nested property update requires a copy of each changed level.",
                "Assigning to an existing state object changes past snapshots and may leave React with the same object identity."
            ],
            examples: [
                {
                    title: "Nested city update",
                    description: [
                        "The city changes while the other `profile` properties stay the same."
                    ],
                    language: "jsx",
                    code: `import { useState } from 'react';

export default function Profile() {
    const [profile, setProfile] = useState({
        name: 'Mira', address: { city: 'Pune', country: 'India' },
    });
    function move() {
        setProfile(current => ({
            ...current,
            address: { ...current.address, city: 'Delhi' },
        }));
    }
    return <>
        <p>{profile.name}: {profile.address.city}</p>
        <button onClick={move}>Move to Delhi</button>
    </>;
}`,
                    result: "The city changes from Pune to Delhi. The name and country stay the same.",
                    explanation: [
                        "Both `profile` and its `address` are new objects.",
                        "The old objects are not changed."
                    ]
                }
            ]
        },
        {
            id: "replace-arrays",
            title: "State arrays",
            bullets: [
                "Spread syntax adds items to a new array.",
                "`filter` removes items from the returned array.",
                "`map` replaces selected items in the returned array.",
                "`push`, `splice`, and assignment to an array index change the existing state array.",
                "`sort` and `reverse` change the array, so state updates require a copy first.",
                "Copying the array alone does not copy the objects inside it."
            ],
            examples: [
                {
                    title: "Task updates and removal",
                    description: [
                        "One task changes without mutating the stored array or task object."
                    ],
                    language: "jsx",
                    code: `import { useState } from 'react';

export default function TaskList() {
    const [tasks, setTasks] = useState([
        { id: 'react', title: 'Practice React', done: false },
    ]);
    function complete(id) {
        setTasks(current => current.map(task =>
            task.id === id ? { ...task, done: true } : task
        ));
    }
    function remove(id) {
        setTasks(current => current.filter(task => task.id !== id));
    }
    return <ul>{tasks.map(task => <li key={task.id}>
        {task.title}: {task.done ? 'Done' : 'Open'}
        <button onClick={() => complete(task.id)}>Complete</button>
        <button onClick={() => remove(task.id)}>Remove</button>
    </li>)}</ul>;
}`,
                    result: "Complete changes Open to Done. Remove removes the row.",
                    explanation: [
                        "`map` returns a new array and a new object for the matched task.",
                        "`filter` returns the remaining tasks."
                    ]
                }
            ]
        }
    ],
    references: [
        {
            title: "React: Updating objects in state",
            href: "https://react.dev/learn/updating-objects-in-state"
        },
        {
            title: "React: Updating arrays in state",
            href: "https://react.dev/learn/updating-arrays-in-state"
        }
    ]
};

export default note;
