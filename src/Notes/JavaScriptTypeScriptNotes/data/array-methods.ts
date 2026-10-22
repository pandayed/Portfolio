import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "array-methods",
    title: "Array callbacks and transformations",
    summary: "Array methods transform, select, search, and combine elements.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    pointwise: true,
    inlineCode: true,
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
            title: "Array transformations",
            bullets: [
                "`map` returns a new array containing the callback result for each existing element.",
                "`filter` returns a new array containing elements whose callback result is truthy.",
                "Both receive an element, its index, and the array.",
                "A callback can omit parameters it does not need.",
                "`reduce` combines elements into one result.",
                "Its callback receives the accumulator and current element.",
                "The accumulator holds the result from the previous callback call."
            ],
            examples: [
                {
                    language: "javascript",
                    code: "const numbers = [1, 2, 3, 4];\nconst squares = numbers.map((number) => number ** 2);\nconst evens = numbers.filter((number) => number % 2 === 0);\nconst total = numbers.reduce((sum, number) => sum + number, 0);\n\nconsole.log(squares); // [1, 4, 9, 16]\nconsole.log(evens);   // [2, 4]\nconsole.log(total);   // 10\nconsole.log(numbers); // [1, 2, 3, 4]\nconsole.log(squares === numbers); // false",
                    result: "[1, 4, 9, 16]\n[2, 4]\n10\n[1, 2, 3, 4]\nfalse",
                    title: "Array transformations",
                    description: [
                        "The callbacks calculate squares, select even numbers, and add the source numbers."
                    ],
                    explanation: [
                        "The second argument sets the initial accumulator to `0`.",
                        "Each returned sum becomes the next accumulator.",
                        "`map` and `filter` create new arrays.",
                        "None of these callbacks changes `numbers`."
                    ]
                }
            ]
        },
        {
            id: "reduction-initial-values",
            title: "Reduction and initial values",
            bullets: [
                "`reduce` is not limited to numbers. The accumulator can also be a string, array, object, or another value.",
                "The second argument to `reduce` supplies the initial accumulator.",
                "The caller chooses that value. It is not fixed by the element type or accumulator type.",
                "Each callback’s return value becomes the accumulator for the next call.",
                "With an initial value, the callback starts with the first existing array element.",
                "Without an initial value, the first existing element becomes the accumulator. The callback starts with the next existing element.",
                "An empty array returns the supplied initial value without calling the callback.",
                "An empty array without an initial value throws a `TypeError`.",
                "An array containing only empty slots follows the same empty-array rules."
            ],
            examples: [
                {
                    title: "String accumulator",
                    description: [
                        "The callback joins letters into one string."
                    ],
                    language: "javascript",
                    code: "const letters = [\"A\", \"B\", \"C\"];\nconst text = letters.reduce((accumulator, letter) => accumulator + letter, \"\");\nconsole.log(text);",
                    result: "ABC",
                    explanation: [
                        "The second argument is `\"\"`, an empty string.",
                        "The accumulator becomes `\"A\"`, then `\"AB\"`, then `\"ABC\"`.",
                        "The callback determines how each element contributes to the result."
                    ]
                },
                {
                    title: "Omitted initial value and empty arrays",
                    description: [
                        "The calls compare a nonempty array with empty arrays."
                    ],
                    language: "javascript",
                    code: "const total = [1, 2, 3].reduce((sum, number) => sum + number);\nconsole.log(total);\nconsole.log([].reduce((sum, number) => sum + number, 0));\n\ntry {\n    [].reduce((sum, number) => sum + number);\n} catch (error) {\n    console.log(error.name);\n}",
                    result: "6\n0\nTypeError",
                    explanation: [
                        "The first call has no second argument. Its accumulator starts at `1`, and its first callback receives `2` as the current element.",
                        "The second call returns its initial value, `0`, without calling the callback.",
                        "The third call has neither an element nor an initial value, so it throws a `TypeError`."
                    ]
                }
            ]
        },
        {
            id: "search-and-visit",
            title: "Array searches and iteration",
            bullets: [
                "`find` returns the first matching value or `undefined`.",
                "`findIndex` returns its index or `-1`.",
                "`some` checks whether at least one element matches.",
                "`every` checks whether all elements match.",
                "`forEach` calls a callback for each existing element and returns `undefined`."
            ],
            examples: [
                {
                    title: "Score searches",
                    description: [
                        "Each callback checks the condition needed for that search."
                    ],
                    language: "javascript",
                    code: "const scores = [4, 7, 9];\nconsole.log(scores.find((score) => score > 5));\nconsole.log(scores.findIndex((score) => score > 5));\nconsole.log(scores.some((score) => score >= 9));\nconsole.log(scores.every((score) => score >= 5));\nscores.forEach((score, index) => console.log(index, score));",
                    result: "7\n1\ntrue\nfalse\n0 4\n1 7\n2 9",
                    explanation: [
                        "`find` stops at the first match.",
                        "`every` is `false` because 4 fails its check."
                    ]
                }
            ]
        },
        {
            id: "array-callback-mutation",
            title: "Shared objects in array callbacks",
            bullets: [
                "A new array does not automatically contain new objects.",
                "`filter` copies references to the selected objects.",
                "A callback can assign to an object property.",
                "That changes the shared object in the source array too."
            ],
            examples: [
                {
                    language: "javascript",
                    code: "const users = [{ name: \"Mia\", active: true }];\nconst activeUsers = users.filter((user) => user.active);\nconsole.log(activeUsers === users);       // false\nconsole.log(activeUsers[0] === users[0]); // true\n\nconst names = activeUsers.map((user) => {\n    user.name = \"Noah\";\n    return user.name;\n});\nconsole.log(names);         // [\"Noah\"]\nconsole.log(users[0].name); // \"Noah\"\n\nconst renamed = users.map((user) => ({ ...user, name: \"Ava\" }));\nconsole.log(renamed[0].name); // \"Ava\"\nconsole.log(users[0].name);   // \"Noah\": original is unchanged.",
                    result: "false\ntrue\n[\"Noah\"]\nNoah\nAva\nNoah",
                    title: "Shared objects in array callbacks",
                    description: [
                        "The example compares changing a selected object with returning a new object."
                    ],
                    explanation: [
                        "`filter` selects the original object reference.",
                        "The assignment inside `map` changes that shared object.",
                        "The final `map` returns new objects instead of assigning properties on the source objects."
                    ]
                }
            ]
        },
        {
            id: "empty-array-slots",
            title: "Empty slots and undefined elements",
            bullets: [
                "Assigning beyond the end increases `length` and leaves empty slots between the existing elements and the new element.",
                "Assigning a larger `length` also creates empty slots at the end.",
                "It does not create values for those slots.",
                "An empty slot has no property at that index.",
                "An element set to `undefined` has a property whose value is `undefined`.",
                "Both read as `undefined`.",
                "The `in` operator distinguishes them by checking whether the index exists.",
                "An array containing empty slots is called a sparse array.",
                "For the ordinary array in this example, `map` calls its callback for an `undefined` element but skips an empty slot.",
                "`for...of` and array spread read `undefined` for an ordinary empty slot.",
                "`map` skips that slot and keeps the result sparse."
            ],
            examples: [
                {
                    language: "javascript",
                    code: "const values = [undefined];\nvalues[2] = \"last\"; // Index 1 is now an empty slot.\nconsole.log(values.length); // 3\nconsole.log(values[0]);     // undefined\nconsole.log(values[1]);     // undefined\nconsole.log(0 in values);   // true\nconsole.log(1 in values);   // false\n\nconst visited = [];\nconst mapped = values.map((value, index) => {\n    visited.push(index);\n    return String(value);\n});\nconsole.log(visited);       // [0, 2]\nconsole.log(mapped[0]);     // \"undefined\" (a string)\nconsole.log(1 in mapped);   // false\n\nvalues.length = 5;\nconsole.log(values.length); // 5: the last stored element is still at index 2\nconsole.log(4 in values);    // false: an empty trailing slot\nconsole.log([...values].length); // 5\nconsole.log([...values][1]); // undefined\nconsole.log(1 in [...values]); // true",
                    result: "3\nundefined\nundefined\ntrue\nfalse\n[0, 2]\nundefined\nfalse\n5\nfalse\n5\nundefined\ntrue",
                    title: "Empty slots and undefined elements",
                    description: [
                        "The array contains an empty slot and an explicit `undefined` element.",
                        "The checks compare their properties and iteration."
                    ],
                    explanation: [
                        "Index 0 exists and contains `undefined`.",
                        "Index 1 has no property.",
                        "`map` visits indexes 0 and 2 and keeps index 1 empty in its result.",
                        "Array spread reads `undefined` for every hole and creates present entries at those positions."
                    ]
                }
            ]
        },
        {
            id: "sort",
            title: "Array sorting and copies",
            bullets: [
                "`sort` mutates its array.",
                "The default sort order compares elements as strings.",
                "A numeric comparator `(left, right) => left - right` puts smaller numbers first.",
                "`toSorted` returns a sorted copy in runtimes supporting ES2023 array methods.",
                "Spread followed by `sort` also preserves the source array."
            ],
            examples: [
                {
                    title: "Numeric sorting of a copy",
                    description: [
                        "The example makes a shallow copy before calling `sort`."
                    ],
                    language: "javascript",
                    code: "const numbers = [10, 2, 1];\nconst sorted = [...numbers].sort((left, right) => left - right);\nconsole.log(sorted.join(\", \"));\nconsole.log(numbers.join(\", \"));",
                    result: "1, 2, 10\n10, 2, 1",
                    explanation: [
                        "The comparator returns a negative number when `left` should come earlier.",
                        "The original order stays unchanged because `sort` receives the copied array."
                    ]
                }
            ]
        }
    ]
};

export default note;
