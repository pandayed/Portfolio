import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "runtime-and-types",
    title: "Running JavaScript, comments, and console",
    summary: "Run a first script and read its output.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    pointwise: true,
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
            title: "Run JavaScript",
            bullets: [
                "A runtime executes code. A browser and Node.js are JavaScript runtimes.",
                "Open a browser’s developer tools and select Console to run a short script.",
                "For a file, save JavaScript with the .js extension. Node.js can run that file.",
                "JavaScript runs the statements in a simple script from top to bottom."
            ],
            examples: [
                {
                    title: "Print two messages",
                    description: [
                        "Paste these lines into the browser console, or save them in hello.js.",
                        "With Node.js installed, run node hello.js."
                    ],
                    language: "javascript",
                    code: "console.log(\"Hello\");\nconsole.log(\"Ready\");",
                    result: "Hello\nReady",
                    explanation: [
                        "console.log(...) displays the supplied messages in the console.",
                        "The second message appears after the first."
                    ]
                }
            ]
        },
        {
            id: "comments",
            title: "Comments explain code",
            bullets: [
                "// starts a comment that ends at the end of the line.",
                "/* and */ surround a comment that can span several lines.",
                "JavaScript does not execute comments."
            ],
            examples: [
                {
                    title: "Leave a note beside a message",
                    description: [
                        "Run the script with both comment forms."
                    ],
                    language: "javascript",
                    code: "// This message marks the start.\nconsole.log(\"Starting\");\n/* This comment spans\n   more than one line. */\nconsole.log(\"Finished\");",
                    result: "Starting\nFinished",
                    explanation: [
                        "Only the two console.log calls produce output.",
                        "The comments do not add a message or change the order."
                    ]
                }
            ]
        }
    ]
};

export default note;
