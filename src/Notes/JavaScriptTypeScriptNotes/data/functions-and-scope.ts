import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "functions-and-scope",
    title: "Functions: parameters and return",
    summary: "Define a function, call it with arguments, and return a result.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    pointwise: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN JavaScript guide",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions"
        }
    ],
    sections: [
        {
            id: "declarations-and-calls",
            title: "Define and call a function",
            bullets: [
                "A function groups statements to run when called.",
                "Parameters are names in its definition. Arguments are values supplied by a call.",
                "Every call starts a new execution of the body.",
                "return ends the current call and gives a value to the caller."
            ],
            examples: [
                {
                    title: "Calculate two totals",
                    description: [
                        "Define one function and call it with different arguments."
                    ],
                    language: "javascript",
                    code: "function add(left, right) {\n    return left + right;\n}\nconsole.log(add(2, 3));\nconsole.log(add(4, 6));",
                    result: "5\n10",
                    explanation: [
                        "left and right receive new argument values for each call.",
                        "The caller prints the returned result."
                    ]
                }
            ]
        },
        {
            id: "return-and-missing-values",
            title: "Return early or return no value",
            bullets: [
                "A bare return ends the call and produces undefined.",
                "Reaching the end without return also produces undefined.",
                "A missing argument gives its parameter undefined. JavaScript also permits extra arguments."
            ],
            examples: [
                {
                    title: "Stop after a condition",
                    description: [
                        "Skip the message for an empty name and observe a missing argument."
                    ],
                    language: "javascript",
                    code: "function greet(name) {\n    if (name === \"\") return;\n    console.log(`Hello ${name}`);\n}\nconsole.log(greet(\"\"));\nconsole.log(greet(\"Mia\"));\nfunction read(value) { return value; }\nconsole.log(read());",
                    result: "undefined\nHello Mia\nundefined\nundefined",
                    explanation: [
                        "The empty-name call stops before its console.log.",
                        "The Mia call reaches the end without returning a value.",
                        "read() has no argument, so value is undefined."
                    ]
                }
            ]
        },
        {
            id: "default-parameters",
            title: "A default replaces a missing or undefined argument",
            bullets: [
                "Write parameter = defaultValue to supply a default.",
                "The default applies when the argument is missing or undefined.",
                "null, zero, false, and empty text do not trigger the default."
            ],
            examples: [
                {
                    title: "Use a default greeting",
                    description: [
                        "Compare missing, undefined, and explicit empty values."
                    ],
                    language: "javascript",
                    code: "function show(value = \"default\") { console.log(value); }\nshow();\nshow(undefined);\nshow(0);\nshow(null);",
                    result: "default\ndefault\n0\nnull",
                    explanation: [
                        "Only the first two calls use the default."
                    ]
                }
            ]
        },
        {
            id: "switch-return",
            title: "return exits a function containing switch",
            bullets: [
                "A return inside switch ends the whole function call. break ends only the switch."
            ],
            examples: [
                {
                    title: "Return a role’s permission",
                    description: [
                        "Use a return in each case instead of assigning a temporary result."
                    ],
                    language: "javascript",
                    code: "function permission(role) {\n    switch (role) {\n        case \"editor\": return \"edit\";\n        case \"reader\": return \"read\";\n        default: return \"none\";\n    }\n}\nconsole.log(permission(\"editor\"));\nconsole.log(permission(\"guest\"));",
                    result: "edit\nnone",
                    explanation: [
                        "Each return supplies the result and ends its call."
                    ]
                }
            ]
        }
    ]
};

export default note;
