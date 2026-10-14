import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "arrays-and-objects",
    title: "Arrays",
    summary: "Store a sequence, read its indexes, and add or remove elements.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    pointwise: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN JavaScript guide",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array"
        }
    ],
    sections: [
        {
            id: "array-indexes",
            title: "Read elements by index",
            bullets: [
                "An array stores an ordered sequence in square brackets.",
                "Indexes start at zero. length gives the array’s length.",
                "Reading an index with no element returns undefined.",
                "Array.isArray checks whether a value is an array. typeof reports \"object\" for arrays."
            ],
            examples: [
                {
                    title: "Read two names",
                    description: [
                        "Create an array and inspect its first element and length."
                    ],
                    language: "javascript",
                    code: "const names = [\"Mia\", \"Noah\"];\nconsole.log(names[0], names.length);\nconsole.log(names[2]);\nconsole.log(Array.isArray(names), typeof names);",
                    result: "Mia 2\nundefined\ntrue object",
                    explanation: [
                        "names[2] is beyond the stored elements.",
                        "Use Array.isArray instead of typeof to identify an array."
                    ]
                }
            ]
        },
        {
            id: "array-updates",
            title: "Change an existing array",
            bullets: [
                "An index assignment replaces that element.",
                "push adds to the end. pop removes and returns the last element.",
                "unshift adds at the beginning. shift removes and returns the first element.",
                "splice changes a selected range. slice returns a new array without changing that range in the original.",
                "A const array can change its elements. const prevents assigning a different array to the name."
            ],
            examples: [
                {
                    title: "Add, replace, and remove names",
                    description: [
                        "Apply changes to the same array."
                    ],
                    language: "javascript",
                    code: "const names = [\"Mia\", \"Noah\"];\nnames[0] = \"Ava\";\nnames.push(\"Lia\");\nconsole.log(names.join(\", \"));\nconsole.log(names.pop());\nnames.unshift(\"Pip\");\nconsole.log(names.shift());\nnames.splice(1, 1, \"Leo\");\nconsole.log(names.join(\", \"));\nconsole.log(names.slice(0, 1).join(\", \"));",
                    result: "Ava, Noah, Lia\nLia\nPip\nAva, Leo\nAva",
                    explanation: [
                        "join returns text with the chosen separator between elements.",
                        "splice replaces Noah in the original array. slice selects Ava into a new array."
                    ]
                }
            ]
        },
        {
            id: "iterate-values",
            title: "for...of reads each value",
            bullets: [
                "An iterable provides values in sequence. Arrays and strings are iterable.",
                "for...of gives its variable the next value on each iteration.",
                "Use a numbered for loop when the index itself is needed."
            ],
            examples: [
                {
                    title: "Read array values and string characters",
                    description: [
                        "Iterate over a small array, then a short string."
                    ],
                    language: "javascript",
                    code: "const colors = [\"red\", \"blue\"];\nfor (const color of colors) console.log(color);\nfor (const character of \"hi\") console.log(character);",
                    result: "red\nblue\nh\ni",
                    explanation: [
                        "The array loop reads elements, not index keys.",
                        "The string loop reads Unicode code points, which can differ from indexed UTF-16 code units."
                    ]
                },
                {
                    title: "Stop only the inner loop",
                    description: [
                        "Run a fresh inner loop for each outer value."
                    ],
                    language: "javascript",
                    code: "for (const group of [\"A\", \"B\"]) {\n    for (const number of [1, 2, 3]) {\n        if (number === 2) break;\n        console.log(group, number);\n    }\n}",
                    result: "A 1\nB 1",
                    explanation: [
                        "The inner break does not stop the outer loop."
                    ]
                }
            ]
        }
    ]
};

export default note;
