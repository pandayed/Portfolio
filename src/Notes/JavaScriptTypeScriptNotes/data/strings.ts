import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "strings",
    title: "Strings",
    summary: "Text, template literals, and string methods.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    pointwise: true,
    inlineCode: true,
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
                "A backslash before the same quote lets that quote appear inside the text.",
                "This is called escaping the quote.",
                "A quote of the other kind needs no backslash: double quotes can appear inside a single-quoted string.",
                "`\\n` inserts a newline.",
                "Backticks create a template literal. `${...}` inserts a calculated value into it."
            ],
            examples: [
                {
                    "title": "Quotation marks inside text",
                    "description": [
                        "The example prints double quotes and an apostrophe as part of a message."
                    ],
                    "language": "javascript",
                    "code": "console.log(\"She said \\\"hello\\\".\");\nconsole.log('It\\'s ready.');\nconsole.log('She said \"hello\".');",
                    "result": "She said \"hello\".\nIt's ready.\nShe said \"hello\".",
                    "explanation": [
                        "The first line uses \\\" so the inner double quotes become part of the text instead of ending the string.",
                        "The second line uses \\' so the apostrophe becomes part of the text.",
                        "The third line surrounds the text with single quotes.",
                        "Its inner double quotes need no backslash.",
                        "The escaping backslashes are not printed."
                    ]
                },
                {
                    title: "Template literal message",
                    description: [
                        "The example inserts an existing name and a calculated score into text."
                    ],
                    language: "javascript",
                    code: "const name = \"Mia\";\nconst score = 8;\nconsole.log(`Name: ${name}, score: ${score + 2}`);\nconsole.log(\"First line\\nSecond line\");",
                    result: "Name: Mia, score: 10\nFirst line\nSecond line",
                    explanation: [
                        "The template literal inserts each result at its `${...}` position.",
                        "`\\n` creates the line break inside the final string."
                    ]
                }
            ]
        },
        {
            id: "string-methods",
            title: "String properties and methods",
            bullets: [
                "`length` gives the number of UTF-16 code units.",
                "Some characters use more than one code unit.",
                "`[0]` reads the first code unit.",
                "Indexes start at zero.",
                "A method is an operation called through a value with a name and parentheses.",
                "`trim` removes outer whitespace.",
                "`toUpperCase` changes letter case.",
                "`slice` returns a selected portion.",
                "`includes` checks for text.",
                "The `replace` method returns text with a replacement.",
                "A string search replaces the first match."
            ],
            examples: [
                {
                    title: "Label trimming and string methods",
                    description: [
                        "The example applies string methods without changing the original string."
                    ],
                    language: "javascript",
                    code: "const label = \"  JavaScript  \";\nconst cleaned = label.trim();\nconsole.log(cleaned.length, cleaned[0]);\nconsole.log(cleaned.toUpperCase());\nconsole.log(cleaned.slice(0, 4));\nconsole.log(cleaned.includes(\"Script\"));\nconsole.log(cleaned.replace(\"Script\", \" script\"));\nconsole.log(label);",
                    result: "10 J\nJAVASCRIPT\nJava\ntrue\nJava script\n  JavaScript  ",
                    explanation: [
                        "`slice` includes its starting index and excludes its ending index.",
                        "Each transformation returns text.",
                        "The original `label` still contains its whitespace."
                    ]
                }
            ]
        }
    ]
};

export default note;
