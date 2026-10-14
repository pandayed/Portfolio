import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "declaration-scope",
    title: "Function scope, shadowing, and hoisting",
    summary: "Trace which declaration a name uses and when that declaration becomes readable.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    pointwise: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN JavaScript guide",
            href: "https://developer.mozilla.org/en-US/docs/Glossary/Hoisting"
        },
        {
            title: "MDN: Strict mode",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode"
        }
    ],
    sections: [
        {
            id: "function-locals",
            title: "Parameters and local names belong to a function",
            bullets: [
                "Function parameters and local declarations are available inside that function.",
                "Code outside the function cannot read those local names.",
                "An inner scope can read an outer declaration. An inner declaration with the same name takes priority. This is shadowing."
            ],
            examples: [
                {
                    title: "Read the nearest declaration",
                    description: [
                        "Use one outer name and another name inside a function."
                    ],
                    language: "javascript",
                    code: "const label = \"outer\";\nconst suffix = \"!\";\nfunction show(prefix) {\n    const label = \"function\";\n    console.log(prefix, label + suffix);\n}\nshow(\"hello\");\nconsole.log(label);\n// console.log(prefix); // The parameter belongs to show.",
                    result: "hello function!\nouter",
                    explanation: [
                        "show reads its own label and the outer suffix.",
                        "Its caller still reads the outer label."
                    ]
                }
            ]
        },
        {
            id: "var-function-scope",
            title: "var belongs to the function, not an if block",
            bullets: [
                "A var declaration inside a function belongs to that entire function.",
                "An ordinary block does not create a separate var scope."
            ],
            examples: [
                {
                    title: "Read var after its block",
                    description: [
                        "Compare var’s function boundary with the block rule from the declarations lesson."
                    ],
                    language: "javascript",
                    code: "function showCount() {\n    if (true) {\n        var count = 2;\n    }\n    console.log(count);\n}\nshowCount();\n// console.log(count); // Unavailable outside showCount.",
                    result: "2",
                    explanation: [
                        "count remains readable after the if block.",
                        "It does not become a caller’s local variable."
                    ]
                }
            ]
        },
        {
            id: "declarations-before-execution",
            title: "Hoisting and the temporal dead zone",
            bullets: [
                "Hoisting names the declaration behavior established before the statements execute. Assignments still run in source order.",
                "A function declaration can be called before its declaration statement.",
                "var is initialized to undefined before its assignment runs.",
                "let and const exist in their scope but cannot be read before initialization. This interval is the temporal dead zone.",
                "An inner let or const hides an outer name throughout its block, including before initialization."
            ],
            examples: [
                {
                    title: "Read var before its assignment",
                    description: [
                        "Use a function declaration before its position in the source."
                    ],
                    language: "javascript",
                    code: "show();\nfunction show() {\n    console.log(count);\n    var count = 2;\n    console.log(count);\n}\n// console.log(later); // Would fail before initialization.\nlet later = \"ready\";\nconsole.log(later);",
                    result: "undefined\n2\nready",
                    explanation: [
                        "The declaration makes show callable before its written position.",
                        "The var assignment happens only after the first read.",
                        "The commented let read would throw a ReferenceError."
                    ]
                }
            ]
        },
        {
            id: "strict-mode",
            title: "Strict mode rejects undeclared assignments",
            bullets: [
                "Put \"use strict\" first in a script or function to enable strict mode.",
                "In a non-strict script, a = 10 works even if a has never been declared. It creates a global variable instead of a local one.",
                "Global means code elsewhere in the same environment can access the name.",
                "In strict mode, that undeclared assignment throws a ReferenceError.",
                "For a later assignment, declare the name first with let a;. To initialize a constant, use const a = 10.",
                "An accidental spelling mistake can create a new global name in non-strict code. Strict mode reports the undeclared name instead.",
                "JavaScript modules and class bodies are automatically strict, even without a use strict directive.",
                "Strict mode rejects assigning to a string character index. Outside strict mode, that assignment is ignored. Neither form changes the string."
            ],
            examples: [
                {
                    "title": "An undeclared assignment in a non-strict script",
                    "description": [
                        "Read this as a separate ordinary script without use strict. Assume a has not been declared anywhere."
                    ],
                    "language": "javascript",
                    "code": "a = 10;\nconsole.log(a);",
                    "result": "10",
                    "explanation": [
                        "The assignment creates a global name a. It does not declare a local variable."
                    ]
                },
                {
                    "title": "The same undeclared assignment in strict mode",
                    "description": [
                        "Read this as a separate script. Assume a has not been declared anywhere."
                    ],
                    "language": "javascript",
                    "code": "\"use strict\";\na = 10;\nconsole.log(a);",
                    "result": "ReferenceError",
                    "explanation": [
                        "a = 10 throws because a is undeclared. The console.log call is not reached.",
                        "The exact error message depends on the runtime. The error type is ReferenceError."
                    ]
                },
                {
                    title: "Declare before assigning",
                    description: [
                        "Enable strict mode before the declarations."
                    ],
                    language: "javascript",
                    code: "\"use strict\";\nlet total = 0;\ntotal = 3;\nconsole.log(total);",
                    result: "3",
                    explanation: [
                        "let declares total before the assignment. Strict mode accepts the reassignment because the name exists."
                    ]
                },
                {
                    title: "A string character assignment cannot edit the string",
                    description: [
                        "Run in strict mode and leave the invalid character assignment commented."
                    ],
                    language: "javascript",
                    code: "\"use strict\";\nlet name = \"Mia\";\n// name[0] = \"L\"; // Would throw TypeError in strict mode.\nname = \"Lia\";\nconsole.log(name);",
                    result: "Lia",
                    explanation: [
                        "Assigning a new string to the variable is valid.",
                        "Assigning to a character index would not change the original string. Strict mode rejects that operation."
                    ]
                }
            ]
        }
    ]
};

export default note;
