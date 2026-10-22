import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "events-and-handlers",
    title: "Events and handlers",
    summary: "Click handlers, callback props, and event behavior.",
    scope: "react",
    updatedOn: "2026-10-14",
    inlineCode: true,
    exampleLayout: "grouped",
    sections: [
        {
            id: "event-handlers",
            title: "Event handlers",
            bullets: [
                "An event handler runs after a user action, such as a click.",
                "A property such as `onClick` attaches the handler.",
                "The handler prop receives a function without calling it.",
                "An arrow function can supply an argument when the event occurs.",
                "Rendering calculates JSX.",
                "User actions belong in handlers instead of rendering."
            ],
            examples: [
                {
                    title: "Click handler",
                    description: [
                        "The browser tab title changes when the user clicks Save."
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
                        "`onClick={handleSave}` passes the function.",
                        "`onClick={handleSave()}` would call it while rendering."
                    ]
                }
            ]
        },
        {
            id: "callback-props",
            title: "Callback props",
            bullets: [
                "A callback prop is a function passed to a child.",
                "The child calls it to report an action.",
                "Callback names describe their purpose, such as `onSave`.",
                "The parent chooses what that action does."
            ],
            examples: [
                {
                    title: "Task selection callback",
                    description: [
                        "The parent defines the action.",
                        "The child contains the button."
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
                        "The child supplies its task ID.",
                        "It does not assign to a prop."
                    ]
                }
            ]
        },
        {
            id: "event-object",
            title: "Default actions and event propagation",
            bullets: [
                "React passes an event object to the handler.",
                "It contains the event details and methods.",
                "`preventDefault` stops the browser’s default action, such as following a link or submitting a form.",
                "`stopPropagation` prevents the event from reaching parent handlers.",
                "It does not cancel the default browser action.",
                "Most React events bubble from a child to its ancestors.",
                "`onScroll` is an exception."
            ],
            examples: [
                {
                    title: "Child click propagation",
                    description: [
                        "The button action runs without its parent’s click handler."
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
                        "`stopPropagation` prevents the `div` handler from running for this click."
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
