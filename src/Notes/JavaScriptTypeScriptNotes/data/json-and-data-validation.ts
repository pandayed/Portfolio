import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "json-and-data-validation",
    title: "JSON and runtime data checks",
    summary: "Read JSON text and verify the resulting value before using it.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    pointwise: true,
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
            title: "JSON is a text format",
            bullets: [
                "JSON represents strings, numbers, booleans, null, arrays, and objects as text.",
                "Property names and strings use double quotes. JSON has no comments, functions, bigint, or undefined values.",
                "JSON.stringify serializes a supported value to JSON text. JSON.parse reads valid JSON text into a JavaScript value.",
                "Invalid JSON makes JSON.parse throw. The error-handling lesson shows how to catch that failure."
            ],
            examples: [
                {
                    title: "Serialize and parse a profile",
                    description: [
                        "Convert a plain object to text, then read the text."
                    ],
                    language: "javascript",
                    code: "const user = { name: \"Mia\", active: true };\nconst text = JSON.stringify(user);\nconsole.log(text);\nconst parsed = JSON.parse(text);\nconsole.log(parsed.name, parsed.active);\nconsole.log(parsed === user);",
                    result: "{\"name\":\"Mia\",\"active\":true}\nMia true\nfalse",
                    explanation: [
                        "Parsing creates an object; it does not return the original object identity."
                    ]
                }
            ]
        },
        {
            id: "validate-data",
            title: "Valid JSON can have the wrong shape",
            bullets: [
                "Parsing verifies JSON syntax. It does not verify the properties the application expects.",
                "External data can be null, an array, or an object with incorrect property types.",
                "Check the actual value with typeof, Array.isArray, and property checks before using it."
            ],
            examples: [
                {
                    title: "Require an object with a string name",
                    description: [
                        "Use only valid JSON inputs here.",
                        "Reject null, arrays, and a numeric name before calling a string method."
                    ],
                    language: "javascript",
                    code: "function readName(text) {\n    const value = JSON.parse(text);\n    if (value === null || typeof value !== \"object\" || Array.isArray(value)) {\n        return \"invalid profile\";\n    }\n    if (typeof value.name !== \"string\") return \"invalid name\";\n    return value.name.toUpperCase();\n}\nfor (const text of ['null', '[]', '{\"name\":7}', '{\"name\":\"Mia\"}']) {\n    console.log(readName(text));\n}",
                    result: "invalid profile\ninvalid profile\ninvalid name\nMIA",
                    explanation: [
                        "The structural checks run on the parsed value.",
                        "A syntax error is a separate failure; this function lets it propagate to its caller."
                    ]
                }
            ]
        },
        {
            id: "serialization-limits",
            title: "JSON does not preserve every JavaScript value",
            bullets: [
                "Object properties containing undefined are omitted. Undefined array elements serialize as null.",
                "JSON.stringify throws for a bigint or a circular reference.",
                "Serializing and parsing is not a general-purpose object copy. It loses unsupported values and object behavior."
            ],
            examples: [
                {
                    title: "Compare undefined in objects and arrays",
                    description: [
                        "Serialize the same missing value in two positions."
                    ],
                    language: "javascript",
                    code: "console.log(JSON.stringify({ name: \"Mia\", nickname: undefined }));\nconsole.log(JSON.stringify([undefined]));",
                    result: "{\"name\":\"Mia\"}\n[null]",
                    explanation: [
                        "The object omits nickname. The array retains its position as null."
                    ]
                }
            ]
        }
    ]
};

export default note;
