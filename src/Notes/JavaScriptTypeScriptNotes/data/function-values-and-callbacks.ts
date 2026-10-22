import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "function-values-and-callbacks",
    title: "Function values and callbacks",
    summary: "Function values, arrow functions, callbacks, and rest parameters.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    pointwise: true,
    inlineCode: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN JavaScript guide",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions"
        }
    ],
    sections: [
        {
            id: "function-expressions",
            title: "Function values",
            bullets: [
                "A function expression creates a function as a value.",
                "Parentheses after the stored function’s name call the function.",
                "An arrow function uses =>.",
                "An expression body returns its result.",
                "A brace body needs an explicit `return`."
            ],
            examples: [
                {
                    title: "Function expressions and arrow functions",
                    description: [
                        "The example stores three functions that use different body forms."
                    ],
                    language: "javascript",
                    code: "const double = function (value) { return value * 2; };\nconst triple = (value) => value * 3;\nconst missingReturn = (value) => { value * 2; };\nconsole.log(double(3), triple(3));\nconsole.log(missingReturn(3));",
                    result: "6 9\nundefined",
                    explanation: [
                        "The brace body of `missingReturn` calculates a value but does not `return` it.",
                        "A `const` function value follows `const` initialization rules.",
                        "It is not callable before initialization."
                    ]
                }
            ]
        },
        {
            id: "callbacks",
            title: "Callbacks",
            bullets: [
                "A callback is a function passed to another function.",
                "Passing a callback supplies the function value.",
                "It does not call that function yet.",
                "The receiving function decides when to call it.",
                "A callback can run immediately. callback syntax alone does not imply a delay."
            ],
            examples: [
                {
                    title: "Calculation callback",
                    description: [
                        "The example passes the `double` function itself to `apply`."
                    ],
                    language: "javascript",
                    code: "const double = (value) => value * 2;\nfunction apply(value, callback) {\n    return callback(value);\n}\nconsole.log(apply(4, double));\nconsole.log(apply(4, (value) => value * 3));",
                    result: "8\n12",
                    explanation: [
                        "`apply` calls its callback immediately with 4.",
                        "Writing `double(4)` at the argument position would pass a result instead of a function."
                    ]
                }
            ]
        },
        {
            id: "rest-parameters",
            title: "Rest parameters",
            bullets: [
                "A rest parameter uses ...name to collect the remaining arguments into an array.",
                "The rest parameter must be last.",
                "With no remaining arguments, its array is empty.",
                "A regular function also has an `arguments` object.",
                "A rest parameter provides an actual array."
            ],
            examples: [
                {
                    title: "Prices and rest arguments",
                    description: [
                        "The first argument stays separate from the rest array."
                    ],
                    language: "javascript",
                    code: "function total(discount = 0, ...prices) {\n    let sum = 0;\n    for (const price of prices) sum += price;\n    return sum - discount;\n}\nconsole.log(total(2, 10, 5));\nconsole.log(total(undefined, 10, 5));\nconsole.log(total());\nfunction inspect(first) {\n    console.log(first, arguments.length, arguments[1]);\n}\ninspect(\"A\", \"B\");",
                    result: "13\n15\n0\nA 2 B",
                    explanation: [
                        "`prices` receives only the `arguments` after `discount`.",
                        "`arguments` contains all supplied `arguments`, including the extra B."
                    ]
                }
            ]
        }
    ]
};

export default note;
