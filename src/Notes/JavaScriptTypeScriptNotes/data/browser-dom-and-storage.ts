import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'browser-dom-and-storage',
    title: 'Browser DOM and storage',
    summary: 'Select and update elements, handle events, and store small values in the browser.',
    scope: 'javascript-typescript',
    updatedOn: '2026-10-07',
    sections: [
        {
            id: 'browser-apis',
            title: 'Browser APIs are not part of the JavaScript language',
            bullets: [
                'The browser provides objects such as window, document, location, and localStorage.',
                'JavaScript calls these Web APIs. Another runtime may not provide them.',
                'TypeScript gets browser API types from DOM library declarations.',
                'Those declarations describe the APIs for type checking. They do not create document or localStorage outside the browser.',
                'window represents the current browsing context, such as a tab, and provides many browser globals.',
                'document represents the loaded page.',
                'The DOM, or Document Object Model, represents page nodes as objects that JavaScript can read and update.',
                'A node is a part of the page, such as an element or text. Use document to start most DOM work.',
            ],
        },
        {
            id: 'select-elements',
            title: 'Select an element and handle the missing case',
            bullets: [
                'document.querySelector returns the first element that matches a CSS selector.',
                'It returns null when no element matches.',
                'querySelectorAll returns all matching elements in a static NodeList.',
                'A static NodeList keeps the same list when the page changes after the query.',
                'TypeScript includes null in the querySelector return type.',
                'Check for null before using the element.',
            ],
            examples: [{
                title: 'Page markup',
                language: 'text',
                code: '<h1 id="title">Notes</h1>',
            }, {
                title: 'TypeScript',
                language: 'typescript',
                code: [
                    'const title = document.querySelector("#title");',
                    '',
                    'if (title) {',
                    '    console.log(title.textContent);',
                    '}',
                ].join('\n'),
                result: 'With the shown markup loaded, the browser console prints Notes.',
                typeCheck: 'Before the if check, title has type Element | null. Inside the block, it has type Element.',
            }],
        },
        {
            id: 'create-and-update',
            title: 'Create and update DOM nodes',
            bullets: [
                'document.createElement creates an element object.',
                'textContent sets text without treating the value as HTML.',
                'append adds nodes or strings to a parent.',
                'Use textContent for plain text from users or external data.',
                'Untrusted text assigned to innerHTML can cause cross-site scripting. This means that injected content may run unwanted code in the page.',
            ],
            examples: [{
                title: 'Page markup',
                language: 'text',
                code: '<ul id="tasks"></ul>',
            }, {
                title: 'JavaScript',
                language: 'javascript',
                code: [
                    'const list = document.querySelector("#tasks");',
                    'const item = document.createElement("li");',
                    'item.textContent = "Read DOM notes";',
                    '',
                    'list?.append(item);',
                    'console.log(list?.textContent);',
                ].join('\n'),
                result: 'With the shown markup loaded, the page gains one list item and the console prints Read DOM notes.',
            }],
        },
        {
            id: 'events',
            title: 'Event listeners run when an event is delivered',
            bullets: [
                'addEventListener registers a listener function for an event type on a target.',
                'An event target is an object that receives events, such as a button.',
                'The browser passes an Event object when it calls the listener.',
                'event.currentTarget is the object whose listener is running.',
                'event.target is the object where the event started. It may be a nested element.',
            ],
            examples: [{
                title: 'Page markup',
                language: 'text',
                code: '<button id="save" type="button">Save</button>',
            }, {
                title: 'TypeScript',
                language: 'typescript',
                code: [
                    'const button = document.querySelector<HTMLButtonElement>("#save");',
                    '',
                    'button?.addEventListener("click", (event) => {',
                    '    if (event.currentTarget instanceof HTMLButtonElement) {',
                    '        console.log(event.currentTarget.textContent);',
                    '    }',
                    '});',
                ].join('\n'),
                result: 'With the shown markup loaded, clicking the button prints Save.',
                typeCheck: 'The <HTMLButtonElement> type argument gives button the type HTMLButtonElement | null. The instanceof check narrows currentTarget before code reads its element properties.',
            }],
        },
        {
            id: 'web-storage',
            title: 'Web Storage stores strings by origin',
            bullets: [
                'localStorage keeps data for the document origin across browser sessions.',
                'An origin combines the URL scheme, host, and port.',
                'sessionStorage separates data by origin and browser tab. The data lasts for that page session.',
                'Both APIs store string keys and string values.',
                'Use JSON.stringify to turn structured data into a string for storage.',
                'Use JSON.parse to read it. Treat the parsed data as untrusted input.',
            ],
            examples: [{
                language: 'typescript',
                code: [
                    'const preferences = { theme: "dark", compact: true };',
                    'localStorage.setItem("preferences", JSON.stringify(preferences));',
                    '',
                    'const saved = localStorage.getItem("preferences");',
                    'if (saved !== null) {',
                    '    const parsed: unknown = JSON.parse(saved);',
                    '    console.log(parsed);',
                    '}',
                ].join('\n'),
                result: 'When storage is available, the browser stores one JSON string and logs an object with theme dark and compact true.',
                typeCheck: 'getItem returns string | null. JSON.parse does not check the properties or types of the stored data. Check the parsed value at runtime before using it as a typed value.',
            }],
            pitfalls: [
                'Storage can be unavailable or rejected by browser policy.',
                'Browsers limit how much data you can store.',
                'Do not store secrets in Web Storage. Scripts running on the same origin can read it.',
            ],
        },
        {
            id: 'storage-lifecycle',
            title: 'Choose storage by required lifetime',
            bullets: [
                'Use an in-memory variable for state that lasts only while the current page code runs.',
                'Use sessionStorage for small string data that should survive reloads in one tab and end with that page session.',
                'Use localStorage for small string data that should remain for the same origin across browser sessions.',
                'Use a server or database when data must be shared across devices or access needs authorization.',
                'Also use a server or database when data needs large queries or backups.',
            ],
            examples: [{
                language: 'javascript',
                code: [
                    'sessionStorage.setItem("draft", "Hello");',
                    'console.log(sessionStorage.getItem("draft"));',
                    'sessionStorage.removeItem("draft");',
                    'console.log(sessionStorage.getItem("draft"));',
                ].join('\n'),
                result: 'When storage is available, the lines print Hello and null.',
            }],
        },
    ],
};

export default note;
