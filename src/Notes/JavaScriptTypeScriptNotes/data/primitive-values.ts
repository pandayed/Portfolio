import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "primitive-values",
    title: "Primitive types and missing values",
    summary: "Identify primitive types with typeof and distinguish null from undefined.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    pointwise: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN JavaScript guide",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures"
        }
    ],
    sections: [
        {
            id: "primitive-table",
            title: "The seven primitive types",
            table: {
                columns: [
                    "Type",
                    "Literal or creation",
                    "Typical use"
                ],
                rows: [
                    [
                        "string",
                        "\"Mia\"",
                        "Text"
                    ],
                    [
                        "number",
                        "42, 2.5",
                        "Ordinary numbers"
                    ],
                    [
                        "boolean",
                        "true, false",
                        "Conditions"
                    ],
                    [
                        "bigint",
                        "42n",
                        "Exact integers"
                    ],
                    [
                        "undefined",
                        "undefined",
                        "Missing value"
                    ],
                    [
                        "null",
                        "null",
                        "Explicit empty value"
                    ],
                    [
                        "symbol",
                        "Symbol(\"id\")",
                        "Unique values"
                    ]
                ]
            }
        },
        {
            id: "primitive-types",
            title: "Reassignment is allowed",
            bullets: [
                "Immutable describes a primitive value, not the variable holding it. The number 10 cannot itself be edited into 20.",
                "Reassignment makes a variable hold another value. A let variable can hold 10 first and 20 later."
            ],
            examples: [
                {
                    title: "Assign another number to a let variable",
                    description: [
                        "Run two assignments to the same variable. Both are allowed."
                    ],
                    language: "javascript",
                    code: "let a = 10;\nconsole.log(a);\na = 20;\nconsole.log(a);",
                    result: "10\n20",
                    explanation: [
                        "a initially holds 10. The later assignment makes it hold 20 instead.",
                        "a = 20 is valid reassignment. It does not edit the number 10."
                    ]
                }
            ]
        },
        {
            id: "typeof",
            title: "typeof reports the type of a value",
            bullets: [
                "typeof returns a string describing a JavaScript value’s type.",
                "For null, typeof returns the text \"object\" instead of \"null\". This is a long-standing JavaScript bug. null remains a primitive value."
            ],
            examples: [
                {
                    title: "Inspect primitive values",
                    description: [
                        "Run one typeof check for each primitive type."
                    ],
                    language: "javascript",
                    code: "console.log(typeof \"Mia\");\nconsole.log(typeof 42);\nconsole.log(typeof true);\nconsole.log(typeof 42n);\nconsole.log(typeof undefined);\nconsole.log(typeof Symbol(\"id\"));\nconsole.log(typeof null);",
                    result: "string\nnumber\nboolean\nbigint\nundefined\nsymbol\nobject",
                    explanation: [
                        "Each result is text.",
                        "The final line prints \"object\" because it checks null. That output is the incorrect type label described above."
                    ]
                }
            ]
        },
        {
            id: "missing-values",
            title: "undefined and null have different meanings",
            bullets: [
                "A let declaration without an initializer starts with undefined.",
                "Assign null when the program needs an explicit empty value."
            ],
            examples: [
                {
                    title: "An unassigned name and an explicit empty value",
                    description: [
                        "Compare what the two declarations contain."
                    ],
                    language: "javascript",
                    code: "let pending;\nconst selection = null;\nconsole.log(pending);\nconsole.log(selection);",
                    result: "undefined\nnull",
                    explanation: [
                        "pending has not received a value.",
                        "selection received null explicitly."
                    ]
                }
            ]
        }
    ]
};

export default note;
