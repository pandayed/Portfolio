import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "scope-and-closures",
    title: "Closures",
    summary: "Lexical scope and functions that retain access to outer variables.",
    scope: "javascript",
    updatedOn: "2026-10-15",
    pointwise: true,
    inlineCode: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN JavaScript guide",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures"
        },
        {
            title: "ECMAScript: environment records",
            href: "https://tc39.es/ecma262/multipage/executable-code-and-execution-contexts.html#sec-environment-records"
        }
    ],
    sections: [
        {
            id: "closures",
            title: "Closures and lexical scope",
            bullets: [
                "A closure is a function together with its surrounding lexical environment.",
                "That environment lets it resolve outer variable names.",
                "In a nested example, the inner function is commonly called a closure.",
                "The enclosing function creates it.",
                "The whole code listing is not one closure.",
                "JavaScript functions form closures when they are created.",
                "The function can be named or anonymous.",
                "It does not need to be returned or wait for its enclosing function to finish.",
                "It keeps that access after the enclosing function returns.",
                "The variables come from the source location where the function was defined.",
                "This is lexical scope.",
                "The calling function’s local names do not replace those variables.",
                "Repeated calls can update the same captured variable."
            ],
            examples: [
                {
                    language: "javascript",
                    code: "function createCounter() {\n    let count = 0;\n    return () => {\n        count += 1;\n        return count;\n    };\n}\nconst next = createCounter(); // createCounter finishes here.\nconsole.log(next()); // 1: the returned function still reads count.\nconsole.log(next()); // 2: it updates that same count.\n\nfunction callCounter(callback) {\n    const count = 100; // This belongs to callCounter, not createCounter.\n    console.log(callback()); // 3: callback still uses its original count.\n    console.log(count); // 100: this separate variable is unchanged.\n}\ncallCounter(next);",
                    result: "1\n2\n3\n100",
                    title: "Closures and lexical scope",
                    description: [
                        "The example creates a counter, then calls it from another function with its own `count` variable."
                    ],
                    explanation: [
                        "`next` retains `createCounter`’s `count` after `createCounter` returns.",
                        "Its calls update the same `count`.",
                        "The `count` in `callCounter` is a separate local name."
                    ]
                }
            ]
        },
        {
            id: "unused-variables-and-lifetime",
            title: "Variable access and retained memory",
            bullets: [
                "A free variable is a name used by a function but declared outside that function.",
                "An unused outer variable can still be in lexical scope.",
                "Not reading it does not make its name inaccessible in the source code.",
                "Scope describes which names the code can use.",
                "It does not promise that every outer variable occupies memory for as long as the closure exists.",
                "JavaScript engines may omit unused bindings.",
                "An unused outer value may remain in memory or may be collected.",
                "A captured variable holds its current value, not an automatic snapshot.",
                "Reassignment and object mutation can be visible to later calls.",
                "If a closure retains an object, that object can keep other objects reachable through its properties.",
                "Reading one property does not mean only that property stays alive.",
                "A callback held by an event listener or timer can keep captured data reachable.",
                "Removing listeners and cancelling timers after their work ends releases their references.",
                "Garbage collection happens at the engine’s discretion after data becomes unreachable."
            ],
            examples: [
                {
                    title: "Used and unused outer variables",
                    description: ["The reader uses `label` but never reads the `temporary` array."],
                    language: "javascript",
                    code: "function makeReader() {\n    const label = 'ready';\n    const temporary = new Array(1000).fill(0);\n    return function read() {\n        return label;\n    };\n}\nconst read = makeReader();\nconsole.log(read());",
                    result: "ready",
                    explanation: [
                        "`read` uses `label` as a free variable.",
                        "`temporary` is in the enclosing scope but this function never reads it.",
                        "Adding a read of `temporary` inside `read` would be allowed by scope rules.",
                        "The current program does not require that array to be kept for `read`.",
                        "The output proves that `label` remains available.",
                        "It does not reveal whether the engine retained `temporary` or when memory was collected."
                    ]
                }
            ]
        },
        {
            id: "nested-scope-boundaries",
            title: "Nested scopes",
            bullets: [
                "Nesting is not limited to one enclosing function.",
                "A function can look through multiple enclosing function and block scopes, then module or global scope as applicable.",
                "There is no small fixed nesting limit to learn.",
                "Engines have practical parsing and resource limits.",
                "Deep nesting usually makes code harder to read.",
                "Name lookup starts in the function’s own scope and moves outward.",
                "A nearer declaration with the same name hides the outer declaration.",
                "This is shadowing.",
                "An inner function cannot directly read a sibling function’s locals or a child function’s locals.",
                "Calling it from somewhere else does not add the caller’s locals to its scope.",
                "Scope access still obeys declaration rules: reading `let` or `const` before initialization throws, and `const` cannot be reassigned.",
                "A closure does not bypass these rules."
            ],
            examples: [
                {
                    title: "Three nested function scopes",
                    description: ["The example returns the deepest function and calls it after both enclosing calls finish."],
                    language: "javascript",
                    code: "function outer() {\n    const prefix = 'Order';\n    const status = 'outer';\n    function middle() {\n        const status = 'paid';\n        return function inner(id) {\n            return `${prefix} ${id}: ${status}`;\n        };\n    }\n    return middle();\n}\nconst describe = outer();\nconsole.log(describe(42));",
                    result: "Order 42: paid",
                    explanation: [
                        "`inner` uses its own `id` parameter, `middle`’s `status`, and `outer`’s `prefix`.",
                        "`middle`’s `status` hides `outer`’s `status`.",
                        "`inner` does not need to call `outer` again to read `prefix`.",
                        "Returning `middle` without calling it would also let a later `middle` call create `inner` with access to `prefix`.",
                        "An intermediate function need not directly read every name needed by a deeper function."
                    ]
                }
            ]
        },
        {
            id: "separate-closures",
            title: "Separate closure state",
            bullets: [
                "Each enclosing function call creates its own local variables.",
                "Functions returned from one call can share that call’s variables.",
                "Functions returned from different calls use separate variables."
            ],
            examples: [
                {
                    title: "Independent counters",
                    description: [
                        "The example calls the factory twice and keeps the returned functions."
                    ],
                    language: "javascript",
                    code: "function createCounter() {\n    let count = 0;\n    return () => ++count;\n}\nconst first = createCounter();\nconst second = createCounter();\nconsole.log(first(), first());\nconsole.log(second());",
                    result: "1 2\n1",
                    explanation: [
                        "`first` and `second` close over different `count` variables."
                    ]
                }
            ]
        },
        {
            id: "loop-captures",
            title: "Loop bindings",
            bullets: [
                "Callbacks created in a for loop with `let` can retain a separate loop variable for each iteration.",
                "`var` uses one function-scoped variable shared by those callbacks."
            ],
            examples: [
                {
                    title: "Captured loop indexes",
                    description: [
                        "The example stores the callbacks, then calls them after the loops finish."
                    ],
                    language: "javascript",
                    code: "const withLet = [];\nfor (let index = 0; index < 3; index += 1) {\n    withLet.push(() => index);\n}\nconst withVar = [];\nfor (var index = 0; index < 3; index += 1) {\n    withVar.push(() => index);\n}\nconsole.log(withLet[0](), withLet[1](), withLet[2]());\nconsole.log(withVar[0](), withVar[1](), withVar[2]());",
                    result: "0 1 2\n3 3 3",
                    explanation: [
                        "The `let` callbacks each retain their iteration’s binding.",
                        "The `var` callbacks all read the same index after it has reached 3."
                    ]
                }
            ]
        },
        {
            id: "practical-use",
            title: "Closure uses",
            bullets: [
                "Closures are widely used in current JavaScript.",
                "They are not deprecated or generally avoided like `var` often is in new code.",
                "Closures support event handlers with an item ID, debounced search callbacks with a shared timer, and functions configured with a rate or prefix.",
                "A closure can hold a small amount of persistent state or configuration.",
                "Explicit arguments suit values that do not need to persist.",
                "An object or class can hold complex state shared by several operations.",
                "Deep nesting can make code harder to read.",
                "Captured large objects can use memory longer than needed.",
                "These are design tradeoffs, not reasons to avoid closures."
            ],
            examples: [
                {
                    title: "Configured price calculator",
                    description: ["The example creates a calculator for a shop’s tax rate, then reuse it for multiple prices."],
                    language: "javascript",
                    code: "function makeTotalCalculator(taxRate) {\n    return function totalFor(price) {\n        return price * (1 + taxRate);\n    };\n}\nconst totalFor = makeTotalCalculator(0.2);\nconsole.log(totalFor(100).toFixed(2));\nconsole.log(totalFor(50).toFixed(2));",
                    result: "120.00\n60.00",
                    explanation: [
                        "`totalFor` retains `taxRate` so each caller supplies only the price.",
                        "Different calculators can use different rates.",
                        "This illustrates configured behavior.",
                        "A production money calculation also needs an explicit currency and rounding policy."
                    ]
                }
            ]
        }
    ]
};

export default note;
