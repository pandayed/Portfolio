import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "variables-values-and-operators",
    title: "var, let, and const",
    summary: "Declare names, assign values, and choose the right declaration.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    pointwise: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN JavaScript guide",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types"
        },
        {
            title: "MDN: var",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var"
        }
    ],
    sections: [
        {
            id: "declare-and-assign",
            title: "Declare and assign a variable",
            bullets: [
                "A variable is a name used to read a stored value.",
                "A declaration introduces the name. Initialization supplies its first value.",
                "= assigns a value. It does not compare values.",
                "Names are case-sensitive. userName and username are different names."
            ],
            examples: [
                {
                    title: "Change a quantity",
                    description: [
                        "Keep the changing quantity in a let variable."
                    ],
                    language: "javascript",
                    code: "let quantity = 2;\nconsole.log(quantity);\nquantity = 3;\nconsole.log(quantity);",
                    result: "2\n3",
                    explanation: [
                        "The declaration gives quantity its initial value.",
                        "The later assignment replaces it."
                    ]
                }
            ]
        },
        {
            id: "declaration-choice",
            title: "Choose const or let",
            bullets: [
                "const requires an initial value and prevents reassignment.",
                "let permits reassignment. Without an initial value, it contains undefined.",
                "Use const when a name will keep the same value. Use let when it needs another value."
            ],
            examples: [
                {
                    title: "Keep a fixed name and change a status",
                    description: [
                        "Read the initial value of a declaration without an initializer."
                    ],
                    language: "javascript",
                    code: "const userName = \"Mia\";\nlet status;\nconsole.log(userName, status);\nstatus = \"ready\";\nconsole.log(status);\n// userName = \"Ava\"; // Reassignment would fail.\n// const missing; // Invalid: const needs an initial value.",
                    result: "Mia undefined\nready",
                    explanation: [
                        "The let declaration starts without an assigned value.",
                        "The commented const lines would fail: one attempts reassignment and the other lacks an initializer."
                    ]
                }
            ]
        },
        {
            id: "block-scope",
            title: "let and const stay inside their block",
            bullets: [
                "A block groups statements between { and }.",
                "Scope is the part of the program where a name is available.",
                "let and const belong to their enclosing block. Nested blocks can read names from outside."
            ],
            examples: [
                {
                    title: "Read names inside and outside a block",
                    description: [
                        "Use distinct names so the block boundary is visible."
                    ],
                    language: "javascript",
                    code: "const outer = \"outside\";\n{\n    let inner = \"inside\";\n    console.log(outer, inner);\n}\nconsole.log(outer);\n// console.log(inner); // This name is unavailable here.",
                    result: "outside inside\noutside",
                    explanation: [
                        "inner is available only inside the braces.",
                        "outer is declared outside that block, so both reads can use it."
                    ]
                }
            ]
        },
        {
            id: "var",
            title: "var is supported, but generally avoided",
            bullets: [
                "var permits reassignment. Without an initializer, its value is undefined.",
                "Ordinary { ... } blocks do not limit var. Its name remains available after the block ends.",
                "Inside a function, var belongs to that function. Code outside the function cannot read that local name.",
                "Repeated var declarations in the same scope refer to the same variable. let and const reject repeated declarations in the same scope.",
                "A var variable starts as undefined before the statements run. Its initializer runs only when execution reaches it.",
                "var is not deprecated. It remains a supported part of JavaScript.",
                "Generally avoid var in new code. Its wider scope and permitted redeclarations can accidentally change a variable used elsewhere. let and const keep block boundaries and reject duplicate declarations."
            ],
            examples: [
                {
                    title: "A var declaration inside a block changes the outer variable",
                    description: [
                        "Read a variable before initialization, then declare it again inside and outside a block."
                    ],
                    language: "javascript",
                    code: "console.log(count);\nvar count = 1;\n{\n    var count = 2;\n}\nconsole.log(count);\nvar count = 3;\nconsole.log(count);",
                    result: "undefined\n2\n3",
                    explanation: [
                        "The first read happens before count receives 1.",
                        "The block does not create a separate count. Its declaration changes the outer variable to 2.",
                        "The final declaration reuses that same variable and assigns 3."
                    ]
                }
            ]
        }
    ]
};

export default note;
