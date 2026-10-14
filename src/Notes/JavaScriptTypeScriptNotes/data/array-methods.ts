import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "array-methods",
    title: "Array callbacks and transformations",
    summary: "Transform, select, search, and combine array elements.",
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
            id: "array-transformations",
            title: "map, filter, and reduce return calculated results",
            bullets: [
                "map returns a new array containing the callback result for each existing element.",
                "filter returns a new array containing elements whose callback result is truthy.",
                "Both receive an element, its index, and the array. Use only the parameters needed.",
                "reduce combines elements into one result. Its callback receives the accumulator and next element.",
                "Supply an initial accumulator so reduce has a defined result for an empty array."
            ],
            examples: [
                {
                    language: "javascript",
                    code: "const numbers = [1, 2, 3, 4];\nconst squares = numbers.map((number) => number ** 2);\nconst evens = numbers.filter((number) => number % 2 === 0);\nconst total = numbers.reduce((sum, number) => sum + number, 0);\n\nconsole.log(squares); // [1, 4, 9, 16]\nconsole.log(evens);   // [2, 4]\nconsole.log(total);   // 10\nconsole.log(numbers); // [1, 2, 3, 4]\nconsole.log(squares === numbers); // false",
                    result: "[1, 4, 9, 16]\n[2, 4]\n10\n[1, 2, 3, 4]\nfalse",
                    title: "map, filter, and reduce return calculated results",
                    description: [
                        "Calculate squares, select even numbers, and add the source numbers."
                    ],
                    explanation: [
                        "reduce starts with 0. Each returned sum becomes the next accumulator.",
                        "map and filter create new arrays. None of these callbacks changes numbers."
                    ]
                }
            ]
        },
        {
            id: "search-and-visit",
            title: "Search or visit elements",
            bullets: [
                "find returns the first matching value or undefined. findIndex returns its index or -1.",
                "some checks whether at least one element matches. every checks whether all elements match.",
                "forEach calls a callback for each existing element and returns undefined."
            ],
            examples: [
                {
                    title: "Search an array of scores",
                    description: [
                        "Choose the smallest callback needed for each question."
                    ],
                    language: "javascript",
                    code: "const scores = [4, 7, 9];\nconsole.log(scores.find((score) => score > 5));\nconsole.log(scores.findIndex((score) => score > 5));\nconsole.log(scores.some((score) => score >= 9));\nconsole.log(scores.every((score) => score >= 5));\nscores.forEach((score, index) => console.log(index, score));",
                    result: "7\n1\ntrue\nfalse\n0 4\n1 7\n2 9",
                    explanation: [
                        "find stops at the first match.",
                        "every is false because 4 fails its check."
                    ]
                }
            ]
        },
        {
            id: "array-callback-mutation",
            title: "An array callback can still change a shared object",
            bullets: [
                "A new array does not automatically contain new objects. filter copies references to the selected objects.",
                "A callback can assign to an object property. That changes the shared object in the source array too."
            ],
            examples: [
                {
                    language: "javascript",
                    code: "const users = [{ name: \"Mia\", active: true }];\nconst activeUsers = users.filter((user) => user.active);\nconsole.log(activeUsers === users);       // false\nconsole.log(activeUsers[0] === users[0]); // true\n\nconst names = activeUsers.map((user) => {\n    user.name = \"Noah\";\n    return user.name;\n});\nconsole.log(names);         // [\"Noah\"]\nconsole.log(users[0].name); // \"Noah\"\n\nconst renamed = users.map((user) => ({ ...user, name: \"Ava\" }));\nconsole.log(renamed[0].name); // \"Ava\"\nconsole.log(users[0].name);   // \"Noah\": original is unchanged.",
                    result: "false\ntrue\n[\"Noah\"]\nNoah\nAva\nNoah",
                    title: "An array callback can still change a shared object",
                    description: [
                        "Select an object, change it inside a callback, then compare with returning a new object."
                    ],
                    explanation: [
                        "filter selects the original object reference. The assignment inside map changes that shared object.",
                        "The final map returns new objects instead of assigning properties on the source objects."
                    ]
                }
            ]
        },
        {
            id: "empty-array-slots",
            title: "An empty slot is different from an undefined element",
            bullets: [
                "Assigning beyond the end increases length and leaves empty slots between the existing elements and the new element.",
                "Assigning a larger length also creates empty slots at the end. It does not create values for those slots.",
                "An empty slot has no property at that index. An element set to undefined has a property whose value is undefined.",
                "Both read as undefined. The in operator distinguishes them by checking whether the index exists.",
                "An array containing empty slots is called a sparse array. For the ordinary array in this example, map calls its callback for an undefined element but skips an empty slot.",
                "for...of and array spread read undefined for an ordinary empty slot. map skips that slot and keeps the result sparse."
            ],
            examples: [
                {
                    language: "javascript",
                    code: "const values = [undefined];\nvalues[2] = \"last\"; // Index 1 is now an empty slot.\nconsole.log(values.length); // 3\nconsole.log(values[0]);     // undefined\nconsole.log(values[1]);     // undefined\nconsole.log(0 in values);   // true\nconsole.log(1 in values);   // false\n\nconst visited = [];\nconst mapped = values.map((value, index) => {\n    visited.push(index);\n    return String(value);\n});\nconsole.log(visited);       // [0, 2]\nconsole.log(mapped[0]);     // \"undefined\" (a string)\nconsole.log(1 in mapped);   // false\n\nvalues.length = 5;\nconsole.log(values.length); // 5: the last stored element is still at index 2\nconsole.log(4 in values);    // false: an empty trailing slot\nconsole.log([...values].length); // 5\nconsole.log([...values][1]); // undefined\nconsole.log(1 in [...values]); // true",
                    result: "3\nundefined\nundefined\ntrue\nfalse\n[0, 2]\nundefined\nfalse\n5\nfalse\n5\nundefined\ntrue",
                    title: "An empty slot is different from an undefined element",
                    description: [
                        "Create one empty slot and one explicit undefined element. Compare property existence and iteration."
                    ],
                    explanation: [
                        "Index 0 exists and contains undefined. Index 1 has no property.",
                        "map visits indexes 0 and 2 and keeps index 1 empty in its result.",
                        "Array spread reads undefined for every hole and creates present entries at those positions."
                    ]
                }
            ]
        },
        {
            id: "sort",
            title: "sort changes the array; toSorted returns a copy",
            bullets: [
                "sort mutates its array. The default compares elements as strings.",
                "A numeric comparator (left, right) => left - right puts smaller numbers first.",
                "toSorted returns a sorted copy in runtimes supporting ES2023 array methods. Spread followed by sort also preserves the source array."
            ],
            examples: [
                {
                    title: "Sort a copy numerically",
                    description: [
                        "Make a shallow copy before the mutating sort call."
                    ],
                    language: "javascript",
                    code: "const numbers = [10, 2, 1];\nconst sorted = [...numbers].sort((left, right) => left - right);\nconsole.log(sorted.join(\", \"));\nconsole.log(numbers.join(\", \"));",
                    result: "1, 2, 10\n10, 2, 1",
                    explanation: [
                        "The comparator returns a negative number when left should come earlier.",
                        "The original order stays unchanged because sort receives the copied array."
                    ]
                }
            ]
        }
    ]
};

export default note;
