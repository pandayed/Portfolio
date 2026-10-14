import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "scope-and-closures",
    title: "Closures",
    summary: "Return a function that keeps access to its original outer variables.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    pointwise: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN JavaScript guide",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures"
        }
    ],
    sections: [
        {
            id: "closures",
            title: "A closure keeps access to the variables where it was created",
            bullets: [
                "A closure is a function that retains access to the outer variables where it was created.",
                "It keeps that access after the outer function returns.",
                "The variables come from the source location where the function was defined. This is lexical scope.",
                "The calling function’s local names do not replace those variables. Repeated calls can update the same captured variable."
            ],
            examples: [
                {
                    language: "javascript",
                    code: "function createCounter() {\n    let count = 0;\n    return () => {\n        count += 1;\n        return count;\n    };\n}\nconst next = createCounter(); // createCounter finishes here.\nconsole.log(next()); // 1: the returned function still reads count.\nconsole.log(next()); // 2: it updates that same count.\n\nfunction callCounter(callback) {\n    const count = 100; // This belongs to callCounter, not createCounter.\n    console.log(callback()); // 3: callback still uses its original count.\n    console.log(count); // 100: this separate variable is unchanged.\n}\ncallCounter(next);",
                    result: "1\n2\n3\n100",
                    title: "A closure keeps access to the variables where it was created",
                    description: [
                        "Create a counter, then call it from another function with its own count variable."
                    ],
                    explanation: [
                        "next retains createCounter’s count after createCounter returns.",
                        "Its calls update the same count. The count in callCounter is a separate local name."
                    ]
                }
            ]
        },
        {
            id: "separate-closures",
            title: "Separate outer calls create separate state",
            bullets: [
                "Each outer call creates its own local variables.",
                "Functions returned from one call can share that call’s variables. Functions returned from different calls use separate variables."
            ],
            examples: [
                {
                    title: "Create two counters",
                    description: [
                        "Call the factory twice and keep the returned functions."
                    ],
                    language: "javascript",
                    code: "function createCounter() {\n    let count = 0;\n    return () => ++count;\n}\nconst first = createCounter();\nconst second = createCounter();\nconsole.log(first(), first());\nconsole.log(second());",
                    result: "1 2\n1",
                    explanation: [
                        "first and second close over different count variables."
                    ]
                }
            ]
        },
        {
            id: "loop-captures",
            title: "let creates a binding for each loop iteration",
            bullets: [
                "Callbacks created in a for loop with let can retain a separate loop variable for each iteration.",
                "var uses one function-scoped variable shared by those callbacks."
            ],
            examples: [
                {
                    title: "Compare captured let and var indexes",
                    description: [
                        "Store the callbacks, then call them after the loops finish."
                    ],
                    language: "javascript",
                    code: "const withLet = [];\nfor (let index = 0; index < 3; index += 1) {\n    withLet.push(() => index);\n}\nconst withVar = [];\nfor (var index = 0; index < 3; index += 1) {\n    withVar.push(() => index);\n}\nconsole.log(withLet[0](), withLet[1](), withLet[2]());\nconsole.log(withVar[0](), withVar[1](), withVar[2]());",
                    result: "0 1 2\n3 3 3",
                    explanation: [
                        "The let callbacks each retain their iteration’s binding.",
                        "The var callbacks all read the same index after it has reached 3."
                    ]
                }
            ]
        }
    ]
};

export default note;
