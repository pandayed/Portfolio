import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "runtime-and-types",
    title: "JavaScript runtime, comments, and console",
    summary: "JavaScript runtimes, console output, and comments.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    pointwise: true,
    inlineCode: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN JavaScript guide",
            href: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/What_is_JavaScript"
        }
    ],
    sections: [
        {
            id: "javascript-runs",
            title: "JavaScript runtimes",
            bullets: [
                "A runtime executes code.",
                "A browser and Node.js are JavaScript runtimes.",
                "The Console tab in a browser’s developer tools runs short scripts.",
                "JavaScript files commonly use the `.js` extension.",
                "Node.js can run those files.",
                "JavaScript runs the statements in a simple script from top to bottom."
            ],
            examples: [
                {
                    title: "Console messages",
                    description: [
                        "These lines run in the browser console or in a file named `hello.js`.",
                        "With Node.js installed, `node hello.js` runs the file."
                    ],
                    language: "javascript",
                    code: "console.log(\"Hello\");\nconsole.log(\"Ready\");",
                    result: "Hello\nReady",
                    explanation: [
                        "`console.log(...)` displays the supplied messages in the console.",
                        "The second message appears after the first."
                    ]
                }
            ]
        },
        {
            id: "comments",
            title: "Comments",
            bullets: [
                "// starts a comment that ends at the end of the line.",
                "/* and */ surround a comment that can span several lines.",
                "JavaScript does not execute comments."
            ],
            examples: [
                {
                    title: "Line and block comments",
                    description: [
                        "The script contains both comment forms."
                    ],
                    language: "javascript",
                    code: "// This message marks the start.\nconsole.log(\"Starting\");\n/* This comment spans\n   more than one line. */\nconsole.log(\"Finished\");",
                    result: "Starting\nFinished",
                    explanation: [
                        "Only the two `console.log` calls produce output.",
                        "The comments do not add a message or change the order."
                    ]
                }
            ]
        }
    ]
};

export default note;
