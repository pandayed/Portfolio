import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "arithmetic-and-conversion",
    title: "Arithmetic and numeric conversion",
    summary: "Calculate, convert numeric text, and account for numeric precision.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    pointwise: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN JavaScript guide",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_strings"
        }
    ],
    sections: [
        {
            id: "arithmetic",
            title: "Arithmetic operators calculate values; + also joins strings",
            bullets: [
                "+ adds, - subtracts, * multiplies, and / divides number operands. An operand is a value supplied to an operator.",
                "% gives the remainder. ** raises a number to a power.",
                "Multiplication and division take precedence over addition and subtraction. Parentheses choose another order."
            ],
            examples: [
                {
                    title: "Calculate with numbers",
                    description: [
                        "Use the same operands to compare arithmetic operators."
                    ],
                    language: "javascript",
                    code: "console.log(10 + 3, 10 - 3);\nconsole.log(10 * 3, 10 / 4);\nconsole.log(10 % 3, 2 ** 4);\nconsole.log(4 + 6 / 2);\nconsole.log((4 + 6) / 2);",
                    result: "13 7\n30 2.5\n1 16\n7\n5",
                    explanation: [
                        "The last two lines differ because parentheses make the addition run first."
                    ]
                }
            ]
        },
        {
            id: "assignment-updates",
            title: "Update a number",
            bullets: [
                "count += 1 adds and assigns the result. It means count = count + 1.",
                "-=, *=, and /= apply their operation and assign the result.",
                "++ and -- increase or decrease a variable by one. Their prefix and postfix forms return different values."
            ],
            examples: [
                {
                    title: "Use assignment updates",
                    description: [
                        "Use let because each update replaces the stored number."
                    ],
                    language: "javascript",
                    code: "let count = 2;\ncount += 3;\nconsole.log(count);\ncount -= 1;\nconsole.log(count);\nconsole.log(count++);\nconsole.log(++count);",
                    result: "5\n4\n4\n6",
                    explanation: [
                        "count++ returns 4 and then stores 5.",
                        "++count first stores 6 and then returns 6."
                    ]
                }
            ]
        },
        {
            id: "conversion",
            title: "Convert numeric text explicitly",
            bullets: [
                "Number(text) converts text to a number. Text that cannot become a number produces NaN.",
                "NaN means Not-a-Number. Number.isNaN checks for it.",
                "Number.isFinite accepts finite numbers and rejects NaN and infinities.",
                "When either operand of + is a string after primitive conversion, + joins text.",
                "-, *, and / attempt numeric conversion. Avoid relying on these automatic conversions for input."
            ],
            examples: [
                {
                    title: "Numeric conversion and text joining",
                    description: [
                        "Compare explicit conversion with operators applied to numeric text."
                    ],
                    language: "javascript",
                    code: "console.log(\"10\" + 3);\nconsole.log(Number(\"10\") + 3);\nconsole.log(\"10\" - 3);\nconsole.log(Number(\"hello\"));\nconsole.log(Number.isNaN(Number(\"hello\")));\nconsole.log(Number.isFinite(10 / 0));",
                    result: "103\n13\n7\nNaN\ntrue\nfalse",
                    explanation: [
                        "The first result is a string.",
                        "Division by zero produces Infinity; it does not throw."
                    ]
                }
            ]
        },
        {
            id: "number-and-bigint",
            title: "number has limited precision; bigint stores integers",
            bullets: [
                "number stores values with a limited number of binary digits. This representation is called binary floating point.",
                "Some decimal fractions cannot be stored exactly in those digits. A calculation can therefore include a small rounding difference.",
                "An integer has no fractional part. Number.MAX_SAFE_INTEGER is 9007199254740991.",
                "number represents every integer exactly from -9007199254740991 through 9007199254740991. Beyond that range, distinct integer values can become the same number.",
                "A bigint literal ends with n. bigint can represent integers beyond that safe range without losing integer precision.",
                "Arithmetic that mixes bigint and number throws a TypeError. BigInt(...) can convert an integer number before the calculation.",
                "bigint division returns an integer. It discards the fractional part."
            ],
            examples: [
                {
                    title: "Decimal rounding and large integers",
                    language: "javascript",
                    code: "console.log(25 * (1 + 0.1)); // 27.500000000000004\nconsole.log(Number.MAX_SAFE_INTEGER); // 9007199254740991\nconsole.log(Number.isSafeInteger(-9007199254740991)); // true\nconsole.log(Number.isSafeInteger(9007199254740991)); // true\nconsole.log(9007199254740992, 9007199254740993); // Same stored number\nconsole.log(9007199254740992n, 9007199254740993n); // Distinct integers\nconsole.log(9007199254740993n + 1n); // 9007199254740994n\nconsole.log(BigInt(\"9007199254740993\")); // 9007199254740993n",
                    result: "27.500000000000004\n9007199254740991\ntrue\ntrue\n9007199254740992 9007199254740992\n9007199254740992n 9007199254740993n\n9007199254740994n\n9007199254740993n",
                    description: [
                        "Compare decimal rounding with integer precision."
                    ],
                    explanation: [
                        "The decimal calculation includes a small rounding difference.",
                        "At this size, number cannot distinguish these two integer literals.",
                        "The bigint literals remain distinct. Construct the large bigint from exact text rather than an already rounded number."
                    ]
                },
                {
                    title: "Keep both numeric operands the same kind",
                    description: [
                        "Convert an integer number when bigint arithmetic needs it."
                    ],
                    language: "javascript",
                    code: "console.log(10n + BigInt(3));\nconsole.log(10n / 4n);\n// 10n + 3; // Mixing bigint and number would fail.",
                    result: "13n\n2n",
                    explanation: [
                        "bigint division discards the fractional part.",
                        "The commented addition would throw a TypeError because the operands have different numeric kinds."
                    ]
                }
            ],
            pitfalls: [
                "Use bigint for exact integers beyond number’s safe range. Construct large values from exact integer text or bigint literals; a rounded number has already lost information."
            ]
        }
    ]
};

export default note;
