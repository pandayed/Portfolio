import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "loops",
    title: "Loops",
    summary: "For loops, while loops, and loop control.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    pointwise: true,
    inlineCode: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN JavaScript guide",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration"
        }
    ],
    sections: [
        {
            id: "for-loop",
            title: "For loops",
            bullets: [
                "The syntax `for (initialization; condition; update)` repeats while the condition is truthy.",
                "Initialization runs once.",
                "The condition runs before each iteration.",
                "An iteration is one run of the body.",
                "The update runs after a completed iteration, including one that uses `continue`."
            ],
            examples: [
                {
                    title: "Three loop iterations",
                    description: [
                        "The example increases the `index` after each completed body."
                    ],
                    language: "javascript",
                    code: "for (let index = 0; index < 3; index += 1) {\n    console.log(index);\n}",
                    result: "0\n1\n2",
                    explanation: [
                        "The loop stops when `index` reaches 3.",
                        "The `let` name in the loop header stays within that loop."
                    ]
                }
            ]
        },
        {
            id: "while",
            title: "While and do-while loops",
            bullets: [
                "`while` checks the condition before every iteration.",
                "A `false` initial condition runs the body zero times.",
                "A loop stops when its condition becomes `false`.",
                "`do...while` checks after the body, so its body runs at least once."
            ],
            examples: [
                {
                    title: "Condition check positions",
                    description: [
                        "Each loop starts with a `false` condition."
                    ],
                    language: "javascript",
                    code: "let count = 3;\nwhile (count < 3) {\n    console.log(\"while body\");\n    count += 1;\n}\ndo {\n    console.log(count);\n    count += 1;\n} while (count < 3);",
                    result: "3",
                    explanation: [
                        "`while` skips its body.",
                        "`do...while` runs once before checking its `false` condition."
                    ]
                }
            ]
        },
        {
            id: "break-and-continue",
            title: "Loop control",
            bullets: [
                "`break` ends the nearest loop immediately.",
                "A for update does not run after `break`.",
                "`continue` skips the remaining body.",
                "A for loop runs its update next.",
                "A `while` loop checks its condition next.",
                "An unlabeled `break` in nested loops ends only the inner loop."
            ],
            examples: [
                {
                    title: "Skipped iteration and early exit",
                    description: [
                        "The example advances the number before `continue` so the `while` loop can keep progressing."
                    ],
                    language: "javascript",
                    code: "let number = 0;\nwhile (number < 5) {\n    number += 1;\n    if (number === 2) continue;\n    if (number === 4) break;\n    console.log(number);\n}\nconsole.log(\"stopped at\", number);",
                    result: "1\n3\nstopped at 4",
                    explanation: [
                        "`continue` skips the print at 2.",
                        "`break` leaves the loop at 4."
                    ]
                }
            ]
        }
    ]
};

export default note;
