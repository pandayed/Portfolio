import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'forms-and-controlled-inputs',
    title: 'Forms and controlled inputs',
    summary: 'Trace an edit from the input event into state, submit a form without navigation, and distinguish current values from defaults.',
    scope: 'react',
    updatedOn: '2026-10-07',
    sections: [
        {
            id: 'controlled-text-input',
            title: 'Control a text input with state',
            bullets: [
                'A controlled text input receives its displayed value from React state through value.',
                'When the user edits the field, React calls onChange with an event object containing information about the edit.',
                'event.target is the input where this change happened. event.target.value is its new text.',
                'The handler passes that text to the setter. React renders again and gives the input the updated value.',
                'Read State and events first for useState, setters, and arrow functions.',
            ],
            examples: [
                {
                    title: 'Keep the field and displayed text in sync',
                    language: 'tsx',
                    code: `import { useState } from 'react';

export default function NameField() {
    const [name, setName] = useState("");

    return (
        <>
            <label>
                Name
                <input
                    value={name}
                    onChange={event => setName(event.target.value)}
                />
            </label>
            <p>Current value: {name === "" ? "Empty" : name}</p>
        </>
    );
}`,
                    result: 'The empty field starts with “Current value: Empty” below it. Typing Ada makes state and the input contain “Ada”, and the paragraph shows “Current value: Ada”.',
                    typeCheck: 'TypeScript infers the event type from input onChange. name is a string because its initial value is "".',
                },
            ],
            pitfalls: [
                '<input value={name} /> without onChange or readOnly produces a React warning. The field cannot retain edits because React keeps supplying the same value. Add the onChange handler shown above. Use readOnly only when editing should be disabled.',
            ],
        },
        {
            id: 'controlled-checkbox',
            title: 'Use checked for checkboxes',
            bullets: [
                'A checkbox is either selected or cleared. Its controlled property is checked, which receives true or false.',
                'event.target.checked is the new selection state. It differs from event.target.value, which is text.',
                'A checkbox’s value supplies its submitted form value. It does not determine whether the checkbox is selected.',
            ],
            examples: [
                {
                    title: 'Track checkbox selection',
                    language: 'tsx',
                    code: `import { useState } from 'react';

export default function Preferences() {
    const [emailUpdates, setEmailUpdates] = useState(false);

    return (
        <label>
            <input
                type="checkbox"
                checked={emailUpdates}
                onChange={event => setEmailUpdates(event.target.checked)}
            />
            Email updates: {emailUpdates ? "On" : "Off"}
        </label>
    );
}`,
                    result: 'The checkbox starts cleared with “Email updates: Off”. Selecting it shows “On”. Clearing it shows “Off”.',
                    typeCheck: 'Changing the setter call to setEmailUpdates(event.target.value) fails at the value argument. It is a string, but this state expects a boolean. Read event.target.checked instead.',
                },
            ],
        },
        {
            id: 'submit-a-form',
            title: 'Handle form submission',
            bullets: [
                'A form groups fields for submission. Handle its submit event with onSubmit.',
                'A button with type="submit" requests submission. Pressing Enter in a suitable form field can also submit the form.',
                'The browser normally submits a form by navigating. event.preventDefault() stops that default action for this event.',
                'This example handles submission on the current page. It copies the current query into submittedQuery. It sends no server request.',
                'FormEvent is a TypeScript type for a React form event. import type supplies that type for checking.',
                'FormEvent<HTMLFormElement> specifies a browser form as event.currentTarget, the element whose handler is running. The angle brackets supply the element type.',
            ],
            examples: [
                {
                    title: 'Display the submitted text without leaving the page',
                    language: 'tsx',
                    code: `import { useState } from 'react';
import type { FormEvent } from 'react';

export default function SearchForm() {
    const [query, setQuery] = useState("");
    const [submittedQuery, setSubmittedQuery] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmittedQuery(query);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Search
                <input value={query} onChange={event => setQuery(event.target.value)} />
            </label>
            <button type="submit">Search</button>
            {submittedQuery !== "" && <p>Searching for: {submittedQuery}</p>}
        </form>
    );
}`,
                    result: 'Type React and press Search. The page stays open and shows “Searching for: React”. Editing the field afterward changes query but leaves that submitted message unchanged until the next submission.',
                },
            ],
            pitfalls: [
                'Without event.preventDefault() in handleSubmit, the browser’s default submission may navigate or reload the page. Keep that call before the state update.',
                '<button>Clear</button> inside this form submits by default. Set type="button" on a button that performs another action. This is browser behavior, not an exception.',
            ],
        },
        {
            id: 'controlled-select',
            title: 'Control a select element',
            bullets: [
                'A select displays the option matching its value. Set each option’s value on the option element.',
                'Use onChange to read the newly selected text and update state.',
                'Theme = "light" | "dark" is a union type that permits only those two strings.',
                'useState<Theme>("light") supplies Theme as the state type. The <Theme> type argument limits future setter values.',
                'event.target.value has type string. TypeScript cannot assume it is one of the permitted theme values.',
                'The equality checks narrow that string to "light" or "dark" before the setter receives it. Narrowing means checking a value to establish a more specific type.',
            ],
            examples: [
                {
                    title: 'Check a selected value before storing it',
                    language: 'tsx',
                    code: `import { useState } from 'react';

type Theme = "light" | "dark";

export default function ThemePicker() {
    const [theme, setTheme] = useState<Theme>("light");

    return (
        <label>
            Theme
            <select
                value={theme}
                onChange={event => {
                    const nextTheme = event.target.value;
                    if (nextTheme === "light" || nextTheme === "dark") {
                        setTheme(nextTheme);
                    }
                }}
            >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select>
            <span>Selected: {theme}</span>
        </label>
    );
}`,
                    result: 'The select starts on Light and the text shows “Selected: light”. Selecting Dark changes state to "dark" and shows “Selected: dark”. || means either equality check may be true.',
                    typeCheck: 'Moving setTheme(nextTheme) outside the if makes its argument type string. TypeScript rejects that argument because Theme accepts only "light" or "dark". Keep the check before the setter.',
                },
            ],
        },
        {
            id: 'controlled-and-uncontrolled',
            title: 'Choose controlled or uncontrolled inputs',
            bullets: [
                'A controlled text input uses value for its current text. A controlled checkbox uses checked for its current selection.',
                'An uncontrolled input lets the browser keep the user’s edits. Use defaultValue or defaultChecked to set its initial value.',
                'A default initializes the field. Updating the default later does not control the displayed current value.',
                'The name attribute identifies the field when the browser creates submitted form data.',
            ],
            examples: [
                {
                    title: 'Let the browser keep an edited value',
                    language: 'jsx',
                    code: `export default function NicknameField() {
    return (
        <label>
            Nickname
            <input name="nickname" defaultValue="Ada" />
        </label>
    );
}`,
                    result: 'The field starts at “Ada”. Editing it to “Grace” leaves “Grace” in the field without React state or an onChange handler.',
                },
            ],
            pitfalls: [
                'If value={name} first receives undefined and later receives "Ada", React warns that the input changed from uncontrolled to controlled. Keep a controlled text value as a string throughout its lifetime. Initialize useState("") instead.',
                'Likewise, changing checked from undefined to true changes a checkbox from uncontrolled to controlled. Initialize controlled checkbox state to false.',
                'Do not supply both value and defaultValue, or both checked and defaultChecked, to the same input. Choose current-state control or a browser-managed default.',
            ],
        },
        {
            id: 'keep-form-state-minimal',
            title: 'Calculate validation from current fields',
            bullets: [
                'Validation checks whether a value meets a rule. This example requires at least three characters.',
                'Store the editable username in state. Calculate its validation message from that value during rendering.',
                'username.length is the number of characters counted by JavaScript. >= 3 checks that this count is at least three.',
                'The message changes when state changes. It does not need a separate setter.',
                'This example displays feedback. It does not submit a form or validate data on a server.',
            ],
            examples: [
                {
                    title: 'Show feedback while typing',
                    language: 'tsx',
                    code: `import { useState } from 'react';

export default function UsernameField() {
    const [username, setUsername] = useState("");
    const message = username.length >= 3
        ? "Username is long enough"
        : "Use at least 3 characters";

    return (
        <>
            <label>
                Username
                <input value={username} onChange={event => setUsername(event.target.value)} />
            </label>
            <p>{message}</p>
        </>
    );
}`,
                    result: 'The empty field shows “Use at least 3 characters”. Typing Ada changes it to “Username is long enough”. Deleting one character changes it back.',
                },
            ],
        },
    ],
};

export default note;
