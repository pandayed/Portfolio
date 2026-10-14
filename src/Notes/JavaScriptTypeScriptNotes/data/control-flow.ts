import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "control-flow",
    title: "Conditions: if, else, and switch",
    summary: "Choose the statements to run from a condition.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    pointwise: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN JavaScript guide",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling"
        }
    ],
    sections: [
        {
            id: "if-and-else",
            title: "if and else choose a branch",
            bullets: [
                "if runs its block when the condition is truthy. else runs when it is falsy.",
                "else if checks another condition after an earlier condition fails. The first matching branch wins."
            ],
            examples: [
                {
                    title: "Describe a count",
                    description: [
                        "Use comparisons to distinguish positive, zero, and negative counts."
                    ],
                    language: "javascript",
                    code: "const count = 0;\nif (count > 0) {\n    console.log(\"positive\");\n} else if (count === 0) {\n    console.log(\"zero\");\n} else {\n    console.log(\"negative\");\n}",
                    result: "zero",
                    explanation: [
                        "The first condition fails.",
                        "The second condition matches, so the final else does not run."
                    ]
                }
            ]
        },
        {
            id: "conditional-expression",
            title: "Choose one result with the conditional operator",
            bullets: [
                "condition ? whenTrue : whenFalse chooses one expression. This is also called the ternary operator.",
                "Only the chosen expression runs.",
                "Use if and else when a branch needs several statements."
            ],
            examples: [
                {
                    title: "Choose a short label",
                    description: [
                        "Assign one of two labels from a boolean comparison."
                    ],
                    language: "javascript",
                    code: "const count = 0;\nconst label = count === 0 ? \"empty\" : \"has items\";\nconsole.log(label);",
                    result: "empty",
                    explanation: [
                        "The condition is true, so label receives \"empty\"."
                    ]
                }
            ]
        },
        {
            id: "switch",
            title: "switch matches with strict equality",
            bullets: [
                "switch compares its input with case values using strict equality.",
                "default runs when no case matches.",
                "break exits the switch. Without a stopping statement, execution continues into later cases. This is fallthrough."
            ],
            examples: [
                {
                    title: "Select a role",
                    description: [
                        "Use break after the matched case to stop fallthrough."
                    ],
                    language: "javascript",
                    code: "const role = \"editor\";\nswitch (role) {\n    case \"editor\":\n        console.log(\"edit access\");\n        break;\n    case \"reader\":\n        console.log(\"read access\");\n        break;\n    default:\n        console.log(\"no access\");\n}\nconsole.log(\"after switch\");",
                    result: "edit access\nafter switch",
                    explanation: [
                        "Removing the first break would also print read access.",
                        "A numeric case 1 would not match the string \"1\"."
                    ]
                }
            ]
        }
    ]
};

export default note;
