import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "objects-and-arrays-in-state",
    title: "Objects and arrays in state",
    summary: "Replace state objects and arrays without changing previous snapshots.",
    scope: "react",
    updatedOn: "2026-10-14",
    exampleLayout: "grouped",
    sections: [
        {
            id: "replace-objects",
            title: "Copy the changed object path",
            bullets: [
                "Treat objects stored in state as read-only. Return a new object when updating a property.",
                "Spread syntax copies one level. Copy each changed level for a nested property.",
                "Assigning to an existing state object changes past snapshots and may leave React with the same object identity."
            ],
            examples: [
                {
                    title: "Update a nested city",
                    description: [
                        "Change the city while preserving the other profile properties."
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
                        "Both profile and its address are new objects. The old objects are not changed."
                    ]
                }
            ]
        },
        {
            id: "replace-arrays",
            title: "Return a new array",
            bullets: [
                "Use spread to add items, filter to remove them, and map to replace selected items.",
                "Avoid push, splice, and assignment to an array index on existing state.",
                "Copy an array before sort or reverse. Copying the array alone does not copy the objects inside it."
            ],
            examples: [
                {
                    title: "Replace a task and remove it",
                    description: [
                        "Change one task without mutating the stored array or task object."
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
                        "map returns a new array and a new object for the matched task. filter returns the remaining tasks."
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
