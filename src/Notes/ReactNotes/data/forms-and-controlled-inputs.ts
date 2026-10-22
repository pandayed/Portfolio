import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "forms-and-controlled-inputs",
    title: "Forms and controlled inputs",
    summary: "Controlled fields, uncontrolled fields, and form submission.",
    scope: "react",
    updatedOn: "2026-10-14",
    inlineCode: true,
    exampleLayout: "grouped",
    sections: [
        {
            id: "controlled-text-input",
            title: "Controlled text inputs",
            bullets: [
                "A controlled input receives its current value from state.",
                "`onChange` stores the edited value.",
                "The change handler must update the value synchronously so typing appears normally.",
                "Text state starts as a string.",
                "Switching between `undefined` and a string changes whether the input is controlled."
            ],
            examples: [
                {
                    title: "Field value and preview",
                    description: [
                        "The labeled name field and its preview show the same state."
                    ],
                    language: "jsx",
                    code: `import { useState } from 'react';

export default function NameField() {
    const [name, setName] = useState('');
    return <>
        <label>Name <input value={name}
            onChange={event => setName(event.target.value)} /></label>
        <p>Preview: {name}</p>
    </>;
}`,
                    result: "Typing Mira shows Mira in the field and Preview: Mira below it.",
                    explanation: [
                        "The event reads the edited string.",
                        "The setter requests a render using that string."
                    ]
                }
            ]
        },
        {
            id: "controlled-checkbox",
            title: "Checkboxes and select elements",
            bullets: [
                "`checked` controls a checkbox.",
                "`event.target.checked` reports the edited boolean.",
                "A `select` uses `value` on the `select` element.",
                "Each `option` has its own `value`.",
                "A number input still reports text through `event.target.value`.",
                "Numeric state requires conversion and validation."
            ],
            examples: [
                {
                    title: "Notification preferences",
                    description: [
                        "State stores the notification preference and delivery method."
                    ],
                    language: "jsx",
                    code: `import { useState } from 'react';

export default function Preferences() {
    const [notify, setNotify] = useState(false);
    const [delivery, setDelivery] = useState('email');
    return <>
        <label><input type="checkbox" checked={notify}
            onChange={event => setNotify(event.target.checked)} />Notify me</label>
        <label>Delivery <select value={delivery}
            onChange={event => setDelivery(event.target.value)}>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
        </select></label>
        <p>{notify ? 'Notifications on' : 'Notifications off'}: {delivery}</p>
    </>;
}`,
                    result: "Selecting the checkbox and SMS shows Notifications on: sms.",
                    explanation: [
                        "`checked` controls selection.",
                        "`value` controls the selected option."
                    ]
                }
            ]
        },
        {
            id: "submit-a-form",
            title: "Form submission",
            bullets: [
                "`onSubmit` on the form handles both a submit button and Enter.",
                "`preventDefault` stops normal form navigation when the handler replaces it.",
                "A non-submit button inside a form needs `type=\"button\"`.",
                "The default type submits the form."
            ],
            examples: [
                {
                    title: "Submitted text",
                    description: [
                        "State stores the submitted name separately from the current draft."
                    ],
                    language: "jsx",
                    code: `import { useState } from 'react';

export default function NameForm() {
    const [draft, setDraft] = useState('');
    const [submitted, setSubmitted] = useState('');
    function submit(event) {
        event.preventDefault();
        setSubmitted(draft.trim());
    }
    return <form onSubmit={submit}>
        <label>Name <input required value={draft}
            onChange={event => setDraft(event.target.value)} /></label>
        <button type="submit">Save</button>
        <p>Saved name: {submitted}</p>
    </form>;
}`,
                    result: "Submitting Mira shows Saved name: Mira without leaving the page.",
                    explanation: [
                        "The current draft and last submitted name have different jobs, so each has its own state.",
                        "This example changes local state only."
                    ]
                }
            ]
        },
        {
            id: "uncontrolled-inputs",
            title: "Uncontrolled inputs",
            bullets: [
                "An uncontrolled input uses `defaultValue` or `defaultChecked` for its initial value.",
                "The browser manages later edits.",
                "Changing `defaultValue` does not control the input’s current value.",
                "`FormData` reads submitted uncontrolled fields.",
                "The refs lesson covers direct DOM access.",
                "Controlled state lets other UI react to each edit."
            ],
            examples: [
                {
                    title: "Uncontrolled form submission",
                    description: [
                        "The submission handler reads the browser-managed email field."
                    ],
                    language: "jsx",
                    code: `export default function EmailForm() {
    function submit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        alert('Email: ' + data.get('email'));
    }
    return <form onSubmit={submit}>
        <label>Email <input name="email" type="email" defaultValue="" required /></label>
        <button type="submit">Send</button>
    </form>;
}`,
                    result: "Submitting a valid email displays that email in an alert.",
                    explanation: [
                        "The `name` attribute lets `FormData` identify the field.",
                        "No React state controls the current value."
                    ]
                }
            ]
        }
    ],
    references: [
        {
            title: "React: Input",
            href: "https://react.dev/reference/react-dom/components/input"
        },
        {
            title: "React: Select",
            href: "https://react.dev/reference/react-dom/components/select"
        }
    ]
};

export default note;
