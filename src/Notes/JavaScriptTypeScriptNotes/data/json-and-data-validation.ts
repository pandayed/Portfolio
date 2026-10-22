import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "json-and-data-validation",
    title: "JSON and runtime data checks",
    summary: "JSON text, parsing, and runtime data checks.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    pointwise: true,
    inlineCode: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN JavaScript guide",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON"
        }
    ],
    sections: [
        {
            id: "json-text",
            title: "JSON text",
            bullets: [
                "JSON represents strings, numbers, booleans, `null`, arrays, and objects as text.",
                "Property names and strings use double quotes.",
                "JSON has no comments, functions, `bigint`, or `undefined` values.",
                "`JSON.stringify` serializes a supported value to JSON text.",
                "`JSON.parse` reads valid JSON text into a JavaScript value.",
                "Invalid JSON makes `JSON.parse` `throw`.",
                "The error-handling lesson shows how to `catch` that failure."
            ],
            examples: [
                {
                    title: "Profile serialization and parsing",
                    description: [
                        "The example converts a plain object to text, then reads the text."
                    ],
                    language: "javascript",
                    code: "const user = { name: \"Mia\", active: true };\nconst text = JSON.stringify(user);\nconsole.log(text);\nconst parsed = JSON.parse(text);\nconsole.log(parsed.name, parsed.active);\nconsole.log(parsed === user);",
                    result: "{\"name\":\"Mia\",\"active\":true}\nMia true\nfalse",
                    explanation: [
                        "Parsing creates a new object.",
                        "It does not return the original object."
                    ]
                }
            ]
        },
        {
            id: "validate-data",
            title: "Runtime data checks",
            bullets: [
                "Parsing verifies JSON syntax.",
                "It does not verify the properties the application expects.",
                "External data can be `null`, an array, or an object with incorrect property types.",
                "The `typeof` operator, `Array.isArray`, and property checks verify the actual value."
            ],
            examples: [
                {
                    title: "Object and name validation",
                    description: [
                        "All inputs in this example are valid JSON.",
                        "The example rejects `null`, arrays, and a numeric name before calling a string method."
                    ],
                    language: "javascript",
                    code: "function readName(text) {\n    const value = JSON.parse(text);\n    if (value === null || typeof value !== \"object\" || Array.isArray(value)) {\n        return \"invalid profile\";\n    }\n    if (typeof value.name !== \"string\") return \"invalid name\";\n    return value.name.toUpperCase();\n}\nfor (const text of ['null', '[]', '{\"name\":7}', '{\"name\":\"Mia\"}']) {\n    console.log(readName(text));\n}",
                    result: "invalid profile\ninvalid profile\ninvalid name\nMIA",
                    explanation: [
                        "The structural checks run on the parsed value.",
                        "A syntax error is a separate failure. this function lets it propagate to its caller."
                    ]
                }
            ]
        },
        {
            id: "serialization-limits",
            title: "Unsupported values",
            bullets: [
                "Object properties containing `undefined` are omitted.",
                "Undefined array elements serialize as `null`.",
                "`JSON.stringify` throws for a `bigint` or a circular reference.",
                "Serializing and parsing is not a general-purpose object copy.",
                "It loses unsupported values and object behavior."
            ],
            examples: [
                {
                    title: "Missing values in objects and arrays",
                    description: [
                        "The example serializes the same missing value in two positions."
                    ],
                    language: "javascript",
                    code: "console.log(JSON.stringify({ name: \"Mia\", nickname: undefined }));\nconsole.log(JSON.stringify([undefined]));",
                    result: "{\"name\":\"Mia\"}\n[null]",
                    explanation: [
                        "The object omits `nickname`.",
                        "The array retains its position as `null`."
                    ]
                }
            ]
        }
    ]
};

export default note;
