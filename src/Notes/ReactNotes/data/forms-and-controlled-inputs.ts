import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "forms-and-controlled-inputs",
    title: "Forms and controlled inputs",
    summary: "Connect form fields to state and handle submission without leaving the page.",
    scope: "react",
    updatedOn: "2026-10-14",
    exampleLayout: "grouped",
    sections: [
        {
            id: "controlled-text-input",
            title: "Control text with value and onChange",
            bullets: [
                "A controlled input receives its current value from state. onChange stores the edited value.",
                "Update the value synchronously during the change handler so typing appears normally.",
                "Initialize text state to a string. Do not switch between undefined and a string during the input’s lifetime."
            ],
            examples: [
                {
                    title: "Show the current field value",
                    description: [
                        "Keep a labeled name field and its preview in sync."
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
                        "The event reads the edited string. The setter requests a render using that string."
                    ]
                }
            ]
        },
        {
            id: "controlled-checkbox",
            title: "Use checked for a checkbox",
            bullets: [
                "Control a checkbox with checked and read event.target.checked. This is a boolean.",
                "A select uses value on the select element. Give each option its own value.",
                "A number input still reports text through event.target.value. Convert and validate it when your state needs a number."
            ],
            examples: [
                {
                    title: "Control a checkbox and select",
                    description: [
                        "Store notification preference and delivery method."
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
                        "checked controls selection. value controls the selected option."
                    ]
                }
            ]
        },
        {
            id: "submit-a-form",
            title: "Handle the form’s submit event",
            bullets: [
                "Handle onSubmit on the form so both a submit button and Enter follow the same action.",
                "Call preventDefault when the handler should replace normal form navigation.",
                "Give non-submit buttons type=\"button\" inside a form. Their default type would submit it."
            ],
            examples: [
                {
                    title: "Display submitted text",
                    description: [
                        "Store a submitted name separately from the current draft."
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
                        "The current draft and last submitted name have different jobs, so each has its own state. This example changes local state only."
                    ]
                }
            ]
        },
        {
            id: "uncontrolled-inputs",
            title: "Let the browser own an input when appropriate",
            bullets: [
                "An uncontrolled input uses defaultValue or defaultChecked for its initial value. The browser manages later edits.",
                "Changing defaultValue does not control the input’s current value.",
                "Read submitted uncontrolled fields with FormData. Refs for direct DOM access come in the refs lesson.",
                "Choose controlled state when other UI must react to each edit."
            ],
            examples: [
                {
                    title: "Read an uncontrolled form at submission",
                    description: [
                        "Read the browser-managed email field when the form is submitted."
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
                        "The name attribute lets FormData identify the field. No React state controls the current value."
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
