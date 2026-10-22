import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "comparison-and-logic",
    title: "Comparisons and logical operators",
    summary: "Comparison and logical operators test values and select results.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    pointwise: true,
    inlineCode: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN JavaScript guide",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators"
        }
    ],
    sections: [
        {
            id: "comparisons",
            title: "Primitive comparisons",
            bullets: [
                "`<`, `>`, `<=`, and `>=` compare ordered values.",
                "Each comparison returns `true` or `false`.",
                "`===` compares without type conversion.",
                "`!==` is its opposite.",
                "`==` and `!=` permit conversion.",
                "Strict equality avoids type conversion."
            ],
            examples: [
                {
                    title: "Numbers and numeric text",
                    description: [
                        "The comparisons show the difference between a numeric string and a number."
                    ],
                    language: "javascript",
                    code: "console.log(3 < 5, 3 >= 3);\nconsole.log(5 === \"5\", 5 !== \"5\");\nconsole.log(5 == \"5\");",
                    result: "true true\nfalse true\ntrue",
                    explanation: [
                        "`==` converts these operands for comparison.",
                        "`===` preserves the difference between the string and number."
                    ]
                }
            ]
        },
        {
            id: "truthiness",
            title: "Truthy and falsy values",
            bullets: [
                "`Boolean(value)` converts a value to `true` or `false`.",
                "`false`, 0, -0, 0n, an empty string, `null`, `undefined`, and `NaN` convert to `false`.",
                "They are falsy.",
                "Other primitive values are truthy.",
                "`!` converts to boolean and reverses the result.",
                "A truthiness check treats zero and empty text as `false` even when they are valid input."
            ],
            examples: [
                {
                    title: "Missing values and zero",
                    description: [
                        "The example compares an explicit missing-value check with boolean conversion."
                    ],
                    language: "javascript",
                    code: "const count = 0;\nconsole.log(Boolean(count));\nconsole.log(count === undefined);\nconsole.log(!true, !0);",
                    result: "false\nfalse\nfalse true",
                    explanation: [
                        "Zero is falsy but it is still a supplied number.",
                        "The equality check distinguishes it from `undefined`."
                    ]
                }
            ]
        },
        {
            id: "short-circuit",
            title: "Logical operators and default values",
            bullets: [
                "`&&` returns the first falsy operand, or the last operand if all are truthy.",
                "`||` returns the first truthy operand, or the last operand if all are falsy.",
                "`??` uses its right operand only when the left operand is `null` or `undefined`.",
                "These operators skip the right operand when the left already determines the result.",
                "This is short-circuit evaluation.",
                "`??` preserves zero, `false`, and empty text when choosing a default."
            ],
            examples: [
                {
                    title: "Logical and missing-value defaults",
                    description: [
                        "The logs show which operand becomes the result."
                    ],
                    language: "javascript",
                    code: "console.log(0 && \"next\");\nconsole.log(\"ready\" && 7);\nconsole.log(\"ready\" || 7);\nconsole.log(0 || 10);\nconsole.log(0 ?? 10);\nconsole.log(null ?? \"missing\");\nfalse && console.log(\"skipped\");\ntrue || console.log(\"also skipped\");",
                    result: "0\n7\nready\n10\n0\nmissing",
                    explanation: [
                        "The last two `console.log` calls are skipped.",
                        "`&&` and `||` return operand values.",
                        "Their results need not be booleans."
                    ]
                }
            ]
        }
    ]
};

export default note;
