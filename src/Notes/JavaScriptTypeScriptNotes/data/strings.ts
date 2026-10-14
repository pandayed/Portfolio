import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "strings",
    title: "Strings",
    summary: "Create text, insert values, and use string methods.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    pointwise: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN JavaScript guide",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String"
        }
    ],
    sections: [
        {
            id: "create-text",
            title: "Quotes, escapes, and template literals",
            bullets: [
                "Single or double quotes mark where a string starts and ends.",
                "To include that same quote inside the text, put a backslash immediately before it. This is called escaping the quote.",
                "A quote of the other kind needs no backslash: double quotes can appear inside a single-quoted string.",
                "\\n inserts a newline.",
                "Backticks create a template literal. ${...} inserts a calculated value into it."
            ],
            examples: [
                {
                    "title": "Include quotation marks inside text",
                    "description": [
                        "Print double quotes and an apostrophe as part of a message."
                    ],
                    "language": "javascript",
                    "code": "console.log(\"She said \\\"hello\\\".\");\nconsole.log('It\\'s ready.');\nconsole.log('She said \"hello\".');",
                    "result": "She said \"hello\".\nIt's ready.\nShe said \"hello\".",
                    "explanation": [
                        "The first line uses \\\" so the inner double quotes become part of the text instead of ending the string.",
                        "The second line uses \\' so the apostrophe becomes part of the text.",
                        "The third line surrounds the text with single quotes. Its inner double quotes need no backslash.",
                        "The escaping backslashes are not printed."
                    ]
                },
                {
                    title: "Create a message",
                    description: [
                        "Insert an existing name and a calculated score into text."
                    ],
                    language: "javascript",
                    code: "const name = \"Mia\";\nconst score = 8;\nconsole.log(`Name: ${name}, score: ${score + 2}`);\nconsole.log(\"First line\\nSecond line\");",
                    result: "Name: Mia, score: 10\nFirst line\nSecond line",
                    explanation: [
                        "The template literal inserts each result at its ${...} position.",
                        "\\n creates the line break inside the final string."
                    ]
                }
            ]
        },
        {
            id: "string-methods",
            title: "Read and transform text",
            bullets: [
                "length gives the number of UTF-16 code units. Some characters use more than one code unit.",
                "[0] reads the first code unit. Indexes start at zero.",
                "A method is an operation called through a value with a name and parentheses.",
                "trim removes outer whitespace. toUpperCase changes letter case. slice returns a selected portion.",
                "includes checks for text. replace returns text with a replacement; a string search replaces the first match."
            ],
            examples: [
                {
                    title: "Clean and read a label",
                    description: [
                        "Apply string methods without changing the original string."
                    ],
                    language: "javascript",
                    code: "const label = \"  JavaScript  \";\nconst cleaned = label.trim();\nconsole.log(cleaned.length, cleaned[0]);\nconsole.log(cleaned.toUpperCase());\nconsole.log(cleaned.slice(0, 4));\nconsole.log(cleaned.includes(\"Script\"));\nconsole.log(cleaned.replace(\"Script\", \" script\"));\nconsole.log(label);",
                    result: "10 J\nJAVASCRIPT\nJava\ntrue\nJava script\n  JavaScript  ",
                    explanation: [
                        "slice includes its starting index and excludes its ending index.",
                        "Each transformation returns text; label still contains the original whitespace."
                    ]
                }
            ]
        }
    ]
};

export default note;
