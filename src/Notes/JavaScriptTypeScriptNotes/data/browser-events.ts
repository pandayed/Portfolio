import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "browser-events",
    title: "Browser events and listeners",
    summary: "Listeners handle events as they move through page elements.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    pointwise: true,
    inlineCode: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN JavaScript guide",
            href: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events"
        }
    ],
    sections: [
        {
            id: "events",
            title: "Event targets and listeners",
            bullets: [
                "An event reports something that happened, such as a click.",
                "A listener is a callback registered with `addEventListener`.",
                "Registering a listener does not call it.",
                "It runs when a matching event is dispatched.",
                "`target` identifies the event’s origin.",
                "`currentTarget` identifies the object whose listener is currently running.",
                "A bubbling event travels through the `target`’s parents.",
                "Capture listeners run towards the `target` before the bubbling phase.",
                "`removeEventListener` needs the same event type, function reference, and capture flag used to register it.",
                "`dispatchEvent` invokes matching listeners synchronously before the dispatch call returns."
            ],
            examples: [
                {
                    title: "A nested click and listener removal",
                    language: "javascript",
                    code: "const button = document.createElement('button');\nconst label = document.createElement('span');\nlabel.textContent = 'Save';\nbutton.append(label);\ndocument.body.append(button);\nfunction onClick(event) {\n  console.log(event.target.tagName, event.currentTarget.tagName);\n}\nbutton.addEventListener('click', onClick); // no output yet\nlabel.click(); // SPAN BUTTON: click bubbles from the span\nlabel.click(); // SPAN BUTTON: listener runs again\nbutton.removeEventListener('click', onClick);\nlabel.click(); // no listener output\nbutton.remove();",
                    result: "SPAN BUTTON\nSPAN BUTTON",
                    description: [
                        "The example requires a browser console with a loaded HTML body.",
                        "The example clicks a child span twice, removes the parent listener, and clicks again."
                    ],
                    explanation: [
                        "The child span is the origin.",
                        "The button owns the running listener.",
                        "The third click has no listener output because the same registered callback was removed."
                    ]
                },
                {
                    title: "Listener removal requirements",
                    language: "javascript",
                    code: "const target = new EventTarget();\nconst listener = () => console.log('listener ran');\ntarget.addEventListener('update', listener, { capture: true });\n\n// A newly created function is a different reference:\ntarget.removeEventListener('update', () => console.log('listener ran'), true);\ntarget.dispatchEvent(new Event('update')); // listener ran\n\n// The default capture flag is false, unlike the registration:\ntarget.removeEventListener('update', listener);\ntarget.dispatchEvent(new Event('update')); // listener ran\n\n// Matching the event type, function, and capture flag removes it:\ntarget.removeEventListener('update', listener, true);\ntarget.dispatchEvent(new Event('update')); // no listener output",
                    result: "listener ran\nlistener ran",
                    description: [
                        "The example requires a browser console with a loaded HTML body.",
                        "Two removal calls use mismatched arguments.",
                        "The third call matches the registered listener."
                    ],
                    explanation: [
                        "The first removal creates a different function, so it cannot match the listener.",
                        "The second uses a different capture setting.",
                        "Only the third removal matches the registration."
                    ]
                }
            ]
        },
        {
            id: "default-and-propagation",
            title: "Default actions and propagation",
            bullets: [
                "`preventDefault` requests cancellation of a cancelable event’s default action, such as form submission.",
                "`stopPropagation` stops the event from travelling to further ancestors.",
                "It does not cancel the default action.",
                "A passive listener cannot cancel the default action with `preventDefault`.",
                "Event delegation registers a listener on a parent and inspects `target` to handle descendants."
            ],
            examples: [
                {
                    title: "Synchronous dispatch and cancellation",
                    description: [
                        "The example requires a browser console with a loaded HTML body.",
                        "The example dispatches a custom cancelable event on a new `EventTarget`."
                    ],
                    language: "javascript",
                    code: "const target = new EventTarget();\ntarget.addEventListener(\"save\", (event) => {\n    console.log(\"listener\");\n    event.preventDefault();\n});\nconsole.log(\"before\");\nconst accepted = target.dispatchEvent(new Event(\"save\", { cancelable: true }));\nconsole.log(\"after\", accepted);",
                    result: "before\nlistener\nafter false",
                    explanation: [
                        "The listener runs before `dispatchEvent` returns.",
                        "Its `preventDefault` causes `dispatchEvent` to return `false`."
                    ]
                }
            ]
        },
        {
            id: "html-event-handlers",
            title: "HTML event attributes",
            bullets: [
                "HTML event attributes such as `onclick` contain JavaScript that can run when that event occurs.",
                "HTML inserted with `innerHTML` can include event attributes.",
                "Treat untrusted markup as a source of executable behavior.",
                "Script elements inserted with `innerHTML` do not run directly, but this does not make other inserted HTML safe.",
                "A Content Security Policy can block inline event handlers.",
                "Registered listeners avoid inline event code.",
                "`textContent` inserts text without parsing HTML."
            ],
            examples: [
                {
                    title: "HTML event attributes and inserted scripts",
                    language: "javascript",
                    code: "// Controlled demonstration. This string is defined here, not user input.\nconst button = document.createElement('button');\nbutton.innerHTML = `<span onclick=\"console.log('handler ran')\">Click</span>`;\ndocument.body.append(button);\nbutton.firstElementChild.click(); // handler ran\n// A Content Security Policy that blocks inline handlers blocks this log.\n\nglobalThis.notesScriptRan = false;\nbutton.innerHTML = '<script>globalThis.notesScriptRan = true</script>';\nconsole.log(globalThis.notesScriptRan); // false: this script did not execute\nbutton.remove();\ndelete globalThis.notesScriptRan;",
                    result: "handler ran\nfalse",
                    possibleOutput: true,
                    description: [
                        "The example requires a browser console with a loaded HTML body.",
                        "The example uses fixed trusted markup to compare an inline handler with an inserted script element."
                    ],
                    explanation: [
                        "When inline handlers are allowed, the click runs the attribute’s code.",
                        "A policy blocking them removes that first log.",
                        "The script element inserted with `innerHTML` does not execute.",
                        "This does not make arbitrary inserted markup safe."
                    ]
                }
            ]
        }
    ]
};

export default note;
