import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "destructuring-and-spread",
    title: "Destructuring, rest, and spread",
    summary: "Extract named parts, gather the remainder, and copy one level of data.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    pointwise: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN JavaScript guide",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring"
        }
    ],
    sections: [
        {
            id: "destructuring",
            title: "Extract values into variables",
            bullets: [
                "Array destructuring selects by position. Object destructuring selects by property name.",
                "Write property: localName to rename an object property in the declaration.",
                "A destructuring default applies only when the selected value is undefined. It does not replace null."
            ],
            examples: [
                {
                    title: "Read positions and named properties",
                    description: [
                        "Use both forms with a default and a renamed property."
                    ],
                    language: "javascript",
                    code: "const [first, second = \"unknown\"] = [\"Mia\"];\nconst { name: userName, nickname = \"none\" } = { name: \"Noah\" };\nconsole.log(first, second);\nconsole.log(userName, nickname);\nconst { value = \"default\" } = { value: null };\nconsole.log(value);",
                    result: "Mia unknown\nNoah none\nnull",
                    explanation: [
                        "second and nickname are absent, so they use defaults.",
                        "The explicit null is retained."
                    ]
                }
            ]
        },
        {
            id: "rest",
            title: "Gather remaining elements or properties",
            bullets: [
                "Rest in an array pattern collects remaining elements into a new array.",
                "Rest in an object pattern collects remaining own enumerable properties into a new object.",
                "Object rest also includes eligible symbol keys. The prototypes lesson covers inherited and non-enumerable properties that it skips."
            ],
            examples: [
                {
                    title: "Keep the remaining properties",
                    description: [
                        "Read name separately and gather the other own properties."
                    ],
                    language: "javascript",
                    code: "const token = Symbol(\"token\");\nconst user = { name: \"Mia\", role: \"editor\", [token]: 7 };\nconst { name, ...details } = user;\nconst [head, ...tail] = [1, 2, 3];\nconsole.log(name, details.role, details[token]);\nconsole.log(\"name\" in details);\nconsole.log(head, tail.join(\", \"));",
                    result: "Mia editor 7\nfalse\n1 2, 3",
                    explanation: [
                        "The in operator checks whether a property exists.",
                        "details excludes name and contains the remaining string and symbol properties."
                    ]
                }
            ]
        },
        {
            id: "references-and-spread",
            title: "Assignment shares an object; spread makes a shallow copy",
            bullets: [
                "Object spread { ...source } copies own enumerable properties into a new object.",
                "Array spread [...source] reads values into a new array.",
                "A property written later replaces an earlier property with the same key.",
                "These copies are shallow: a nested object or array is still shared unless it is copied separately."
            ],
            examples: [
                {
                    title: "Object assignment and object spread",
                    language: "javascript",
                    code: "const original = { name: \"Mia\", settings: { theme: \"dark\" } };\nconst same = original;\nconsole.log(same === original); // true\nsame.name = \"Ava\";\nconsole.log(original.name);     // \"Ava\"\n\nconst copy = { ...original };\nconsole.log(copy === original); // false\ncopy.name = \"Noah\";\ncopy.settings.theme = \"light\";\nconsole.log(original.name);           // \"Ava\"\nconsole.log(original.settings.theme); // \"light\"",
                    result: "true\nAva\nfalse\nAva\nlight",
                    description: [
                        "Compare a second reference with a shallow object copy."
                    ],
                    explanation: [
                        "same shares the original object.",
                        "copy has a separate outer name property but still shares settings."
                    ]
                },
                {
                    title: "Array assignment and array spread",
                    language: "javascript",
                    code: "const original = [{ name: \"Mia\" }];\nconst same = original;\nsame.push({ name: \"Ava\" });\nconsole.log(original.length); // 2\n\nconst copy = [...original];\ncopy.push({ name: \"Noah\" });\ncopy[0].name = \"Changed\";\nconsole.log(copy.length);      // 3\nconsole.log(original.length);  // 2\nconsole.log(original[0].name); // \"Changed\"",
                    result: "2\n3\n2\nChanged",
                    description: [
                        "Compare appending to a shared array with appending to its shallow copy."
                    ],
                    explanation: [
                        "Adding through same changes original.",
                        "copy has its own array structure but retains references to the same element objects."
                    ]
                }
            ]
        },
        {
            id: "spread-arguments",
            title: "Spread supplies separate function arguments",
            bullets: [
                "Spread in a call reads iterable values and supplies each as an argument.",
                "Rest collects values in a parameter list. Spread expands them at a call site."
            ],
            examples: [
                {
                    title: "Call a function with array values",
                    description: [
                        "Pass two array entries as separate arguments."
                    ],
                    language: "javascript",
                    code: "function add(left, right) { return left + right; }\nconst numbers = [2, 3];\nconsole.log(add(...numbers));",
                    result: "5",
                    explanation: [
                        "The call supplies 2 for left and 3 for right."
                    ]
                }
            ]
        }
    ]
};

export default note;
