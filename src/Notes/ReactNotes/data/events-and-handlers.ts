import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "events-and-handlers",
    title: "Events and handlers",
    summary: "Respond to clicks, pass callback props, and control event behavior.",
    scope: "react",
    updatedOn: "2026-10-14",
    exampleLayout: "grouped",
    sections: [
        {
            id: "event-handlers",
            title: "Pass a function as a handler",
            bullets: [
                "An event handler runs after a user action, such as a click. Attach it with a property such as onClick.",
                "Pass the function without calling it. Use an arrow function when the handler needs an argument.",
                "Keep rendering as a calculation of JSX. Perform user actions in handlers instead of during rendering."
            ],
            examples: [
                {
                    title: "Run code after a click",
                    description: [
                        "Change the browser tab title when the user clicks Save."
                    ],
                    language: "jsx",
                    code: `export default function SaveButton() {
    function handleSave() {
        document.title = 'Profile saved';
    }
    return <button onClick={handleSave}>Save</button>;
}`,
                    result: "Clicking Save changes the tab title to “Profile saved”.",
                    explanation: [
                        "onClick={handleSave} passes the function. onClick={handleSave()} would call it while rendering."
                    ]
                }
            ]
        },
        {
            id: "callback-props",
            title: "Let a parent handle a child’s action",
            bullets: [
                "A callback prop is a function passed to a child. The child calls it to report an action.",
                "Name callbacks for their purpose, such as onSave. The parent chooses what that action does."
            ],
            examples: [
                {
                    title: "Report the selected task",
                    description: [
                        "Keep the action in the parent and the button in the child."
                    ],
                    language: "jsx",
                    code: `function TaskButton({ taskId, onSelect }) {
    return <button onClick={() => onSelect(taskId)}>Select task</button>;
}

export default function Toolbar() {
    function selectTask(id) {
        document.title = 'Selected: ' + id;
    }
    return <TaskButton taskId="react" onSelect={selectTask} />;
}`,
                    result: "Clicking the button changes the tab title to “Selected: react”.",
                    explanation: [
                        "The child supplies its task ID. It does not assign to a prop."
                    ]
                }
            ]
        },
        {
            id: "event-object",
            title: "Control default behavior and propagation",
            bullets: [
                "React passes an event object to the handler. It contains the event details and methods.",
                "preventDefault stops the browser’s default action, such as following a link or submitting a form.",
                "stopPropagation prevents the event from reaching parent handlers. It does not cancel the default browser action.",
                "Most React events bubble from a child to its ancestors. onScroll is an exception."
            ],
            examples: [
                {
                    title: "Keep a child click separate",
                    description: [
                        "Allow the button action without running its parent’s click handler."
                    ],
                    language: "jsx",
                    code: `export default function Toolbar() {
    return <div onClick={() => alert('Toolbar clicked')}>
        <button onClick={event => {
            event.stopPropagation();
            alert('Button clicked');
        }}>Open</button>
    </div>;
}`,
                    result: "Clicking Open shows only “Button clicked”.",
                    explanation: [
                        "stopPropagation prevents the div handler from running for this click."
                    ]
                }
            ]
        }
    ],
    references: [
        {
            title: "React: Responding to events",
            href: "https://react.dev/learn/responding-to-events"
        }
    ]
};

export default note;
