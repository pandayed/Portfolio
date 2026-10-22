import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "browser-dom-and-storage",
    title: "The browser DOM",
    summary: "The DOM represents page elements and text as objects.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    pointwise: true,
    inlineCode: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN JavaScript guide",
            href: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/DOM_scripting"
        }
    ],
    sections: [
        {
            id: "browser-apis",
            title: "Browser globals and the DOM",
            bullets: [
                "`window` is the browser page’s global object.",
                "`document` represents the loaded page.",
                "The DOM (Document Object Model) represents elements and text as objects.",
                "Changing those objects changes the page.",
                "Browser APIs such as `document` are supplied by the browser.",
                "Plain Node.js does not supply a page DOM.",
                "The DOM examples require a browser with a loaded HTML body.",
                "In a classic browser script, a top-level `var` normally creates a `window` property.",
                "Top-level `let` and `const` do not.",
                "Modules keep their declarations in module scope."
            ],
            examples: [
                {
                    title: "Page document and title",
                    language: "javascript",
                    code: "console.log(window.document === document); // true\nconsole.log(document.title); // the text in this page’s <title> element\nconsole.log(document.body.tagName); // BODY",
                    result: "true\n[current page title]\nBODY",
                    possibleOutput: true,
                    description: [
                        "The checks read the loaded page’s `document` and title."
                    ],
                    explanation: [
                        "`window.document` and `document` refer to the same page.",
                        "The middle output is that page’s title, so it varies."
                    ]
                }
            ]
        },
        {
            id: "create-and-update",
            title: "DOM elements, text, and HTML",
            bullets: [
                "`createElement` creates an element.",
                "It appears on the page after `append` inserts it into the document.",
                "`append` accepts nodes or strings.",
                "A string becomes a text node.",
                "`textContent` treats its value as text.",
                "`innerHTML` parses its value as markup and can introduce active HTML behavior.",
                "`children` contains child elements.",
                "Text nodes are not included.",
                "`firstElementChild` returns the first child element or `null`.",
                "A node is an item in the DOM, such as an element or text.",
                "`isConnected` reports whether it belongs to a document.",
                "`createTextNode` creates a text node.",
                "`remove` detaches a node from its parent."
            ],
            examples: [
                {
                    title: "Text and HTML insertion",
                    language: "javascript",
                    code: "const area = document.createElement('section');\nconst item = document.createElement('p');\nconsole.log(item.isConnected); // false: not in the document\nitem.textContent = '<strong>Hello</strong>';\narea.append(item, ' More text');\ndocument.body.append(area);\nconsole.log(item.isConnected); // true\nconsole.log(item.children.length); // 0: no child element was created\nconsole.log(area.textContent);\n// <strong>Hello</strong> More text\n\nitem.innerHTML = '<strong>Hello</strong>'; // constant trusted markup\nconsole.log(item.firstElementChild.textContent); // Hello\narea.remove();",
                    result: "false\ntrue\n0\n<strong>Hello</strong> More text\nHello",
                    description: [
                        "The example requires a browser console with a loaded HTML body.",
                        "The example inserts the same trusted markup as text and as HTML."
                    ],
                    explanation: [
                        "`textContent` displays the angle brackets as text and creates no strong child.",
                        "`innerHTML` parses the fixed trusted markup and creates the child strong element.",
                        "`remove` clears the demo area from the page."
                    ]
                },
                {
                    title: "Text node creation and removal",
                    language: "javascript",
                    code: "const text = document.createTextNode('Hello');\ndocument.body.append(text); // Hello appears on the page\nconsole.log(text.nodeType === Node.TEXT_NODE); // true\ntext.remove(); // the appended text disappears",
                    result: "true",
                    description: [
                        "The example requires a browser console with a loaded HTML body.",
                        "The example adds a text node to the page and then removes it."
                    ],
                    explanation: [
                        "The page displays Hello after `append` and removes it in the same script.",
                        "The console check identifies the node as text."
                    ]
                }
            ],
            pitfalls: [
                "For plain text, assign `textContent` or `append` a string, as the first example does.",
                "Untrusted markup passed to `innerHTML` can execute unwanted behavior."
            ]
        },
        {
            id: "select-elements",
            title: "DOM selectors",
            bullets: [
                "`querySelector` returns the first matching element, or `null` when nothing matches.",
                "A CSS selector chooses elements: h1 by tag, #title by id, and .notice by class.",
                "`querySelectorAll` returns a static `NodeList`.",
                "A `NodeList` is a collection of matching nodes.",
                "Static means later additions do not change that existing list.",
                "A new query returns updated matches."
            ],
            examples: [
                {
                    title: "A complete page fragment and selector results",
                    language: "javascript",
                    code: "// Run after the browser has loaded a body.\nconst area = document.createElement('section');\narea.innerHTML = '<h1>First</h1><h1>Second</h1>';\ndocument.body.append(area);\nconsole.log(area.querySelector('h1').textContent); // First\nconsole.log(area.querySelector('.missing')); // null\n\nconst headings = area.querySelectorAll('h1');\nconst added = document.createElement('h1');\nadded.textContent = 'Third';\narea.append(added);\nconsole.log(headings.length); // 2: list from before the append\nconsole.log(area.querySelectorAll('h1').length); // 3: new query\narea.remove();",
                    result: "First\nnull\n2\n3",
                    description: [
                        "The example requires a browser console with a loaded HTML body.",
                        "The example selects a heading and compares an existing result list with a new query."
                    ],
                    explanation: [
                        "The first selector reads First.",
                        "The missing selector has no match.",
                        "The earlier `NodeList` retains two elements after a third heading is added.",
                        "A new query sees all three."
                    ]
                },
                {
                    title: "Missing elements",
                    description: [
                        "The example requires a browser console with a loaded HTML body.",
                        "The queried section is empty, so no heading matches."
                    ],
                    language: "javascript",
                    code: "const area = document.createElement(\"section\");\nconst heading = area.querySelector(\"h1\");\nif (heading === null) {\n    console.log(\"No heading\");\n} else {\n    heading.textContent = \"Updated\";\n}",
                    result: "No heading",
                    explanation: [
                        "The explicit `null` check avoids reading a property from a missing element."
                    ]
                }
            ],
            pitfalls: [
                "A `null` check prevents property access on a missing element."
            ]
        },
        {
            id: "attributes-and-classes",
            title: "Attributes and classes",
            bullets: [
                "`setAttribute` writes an HTML attribute.",
                "`getAttribute` reads its text or returns `null` when absent.",
                "`classList` adds, removes, or toggles CSS classes.",
                "Many HTML attributes also have JavaScript properties.",
                "Boolean properties such as `disabled` use `true` or `false`."
            ],
            examples: [
                {
                    title: "Button attributes and properties",
                    description: [
                        "The example requires a browser console with a loaded HTML body.",
                        "The example creates the button before assigning its attributes and properties."
                    ],
                    language: "javascript",
                    code: "const button = document.createElement(\"button\");\nbutton.textContent = \"Save\";\nbutton.setAttribute(\"data-action\", \"save\");\nbutton.classList.add(\"primary\");\nbutton.disabled = true;\ndocument.body.append(button);\nconsole.log(button.getAttribute(\"data-action\"));\nconsole.log(button.classList.contains(\"primary\"), button.disabled);\nbutton.remove();",
                    result: "save\ntrue true",
                    explanation: [
                        "`disabled` is a boolean property.",
                        "The cleanup removes the demo button after the checks."
                    ]
                }
            ]
        },
        {
            id: "legacy-document-all",
            title: "A legacy browser truthiness exception",
            bullets: [
                "Ordinary objects and arrays are truthy, including empty ones.",
                "`document.all` is a legacy browser object with special behavior: it is falsy and `typeof` reports \"`undefined`\".",
                "Standard DOM selectors replace the legacy `document.all` API."
            ],
            examples: [
                {
                    title: "Legacy object truthiness",
                    description: [
                        "The example requires a browser console with a loaded HTML body.",
                        "The example requires a browser page, where `document` exists."
                    ],
                    language: "javascript",
                    code: "console.log(Boolean({}), Boolean([]));\nconsole.log(Boolean(document.all), typeof document.all);",
                    result: "true true\nfalse undefined",
                    explanation: [
                        "The legacy object is an exception to the ordinary object truthiness rule."
                    ]
                }
            ]
        }
    ]
};

export default note;
