import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'browser-dom-and-storage',
    title: 'Browser DOM and storage',
    summary: 'Select and update elements, handle events, and store small values in the browser.',
    scope: 'javascript-typescript',
    updatedOn: '2026-10-03',
    sections: [
        {
            id: 'browser-apis',
            title: 'Browser APIs are not part of the JavaScript language',
            paragraphs: [
                'The browser provides objects such as window, document, location, and localStorage. JavaScript code calls these Web APIs, but another runtime may not provide them.',
                'TypeScript gets browser API types from DOM library declarations. Those declarations describe the browser contract for checking; they do not create document or localStorage in a non-browser runtime.',
            ],
            bullets: [
                'window represents the current browsing context and provides many browser globals.',
                'document represents the loaded page and is the entry point for most DOM work.',
                'The DOM represents page nodes as objects that JavaScript can read and update.',
            ],
        },
        {
            id: 'select-elements',
            title: 'Select an element and handle the missing case',
            paragraphs: [
                'document.querySelector returns the first element that matches a CSS selector. It returns null when no element matches. querySelectorAll returns a static NodeList of all matching elements.',
                'TypeScript includes null in the querySelector return type. A null check proves that the element exists before code uses it.',
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
            paragraphs: [
                'document.createElement creates an element object. textContent sets text without treating the value as HTML. append adds nodes or strings to a parent.',
                'Use textContent for plain text from users or external data. Assigning untrusted text to innerHTML can create a cross-site scripting risk.',
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
            paragraphs: [
                'addEventListener registers a function for an event type on an event target. The browser passes an Event object when it calls the listener.',
                'Use event.currentTarget for the object whose listener is currently running. event.target is the original dispatch target and may be a nested element.',
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
                typeCheck: 'The generic type argument makes button HTMLButtonElement | null. The instanceof check narrows currentTarget before its element properties are read.',
            }],
        },
        {
            id: 'web-storage',
            title: 'Web Storage stores strings by origin',
            paragraphs: [
                'localStorage keeps data for the document origin across browser sessions. sessionStorage is separated by origin and browser tab, and its data lasts for that page session.',
                'Both APIs store string keys and string values. Use JSON.stringify to store structured data and JSON.parse to read it. Treat parsed data as untrusted input.',
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
                typeCheck: 'getItem returns string | null. JSON.parse cannot prove the stored shape, so the parsed value still needs runtime validation before typed use.',
            }],
            pitfalls: [
                'Storage can be unavailable or rejected by browser policy. Storage limits are finite.',
                'Do not store secrets in Web Storage. Scripts running on the same origin can read it.',
            ],
        },
        {
            id: 'storage-lifecycle',
            title: 'Choose storage by required lifetime',
            bullets: [
                'Use an in-memory variable for state that only needs to last while the current page code is running.',
                'Use sessionStorage for small string data that should survive reloads in one tab but end with that page session.',
                'Use localStorage for small string data that should remain for the same origin across browser sessions.',
                'Use a server or a database when data must be shared across devices, controlled by authorization, queried at scale, or backed up.',
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
