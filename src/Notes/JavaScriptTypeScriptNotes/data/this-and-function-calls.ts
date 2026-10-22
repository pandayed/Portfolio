import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "this-and-function-calls",
    title: "this, call, apply, and bind",
    summary: "Regular function receivers and arrow function scope.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    pointwise: true,
    inlineCode: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN JavaScript guide",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this"
        }
    ],
    sections: [
        {
            id: "regular-this",
            title: "Regular function receivers",
            bullets: [
                "`this` is the receiver used by a function.",
                "In `object.method()`, a regular method receives object as `this`.",
                "Assigning a method to another variable stores its function value.",
                "It does not keep the original receiver.",
                "A plain regular-function call in strict mode receives `undefined` as `this`."
            ],
            examples: [
                {
                    title: "Shared method and different receivers",
                    description: [
                        "The example runs in strict mode, which makes plain-call behavior explicit."
                    ],
                    language: "javascript",
                    code: "\"use strict\";\nconst user = { name: \"Mia\", showName() { return this.name; } };\nconst other = { name: \"Ava\", showName: user.showName };\nconsole.log(user.showName());\nconsole.log(other.showName());\nconst detached = user.showName;\n// detached(); // Would fail because this is undefined.",
                    result: "Mia\nAva",
                    explanation: [
                        "The method reads the name of its receiver.",
                        "The commented plain call would throw a `TypeError` while reading `this.name`."
                    ]
                }
            ]
        },
        {
            id: "call-apply-bind",
            title: "Explicit and bound receivers",
            bullets: [
                "`call(receiver, ...arguments)` invokes a regular function with that receiver and separate `arguments`.",
                "`apply(receiver, argumentArray)` invokes it with `arguments` from an array-like value.",
                "`bind(receiver, ...arguments)` returns a new function that keeps its receiver and any supplied leading `arguments`."
            ],
            examples: [
                {
                    title: "Immediate calls and bound functions",
                    description: [
                        "The example reuses one function with two objects."
                    ],
                    language: "javascript",
                    code: "function label(prefix, suffix) { return `${prefix}${this.name}${suffix}`; }\nconst mia = { name: \"Mia\" };\nconst ava = { name: \"Ava\" };\nconsole.log(label.call(mia, \"Hello \", \"!\"));\nconsole.log(label.apply(ava, [\"Hello \", \"!\"]));\nconst greetMia = label.bind(mia, \"Hello \");\nconsole.log(greetMia(\"!\"));",
                    result: "Hello Mia!\nHello Ava!\nHello Mia!",
                    explanation: [
                        "`call` and `apply` invoke immediately.",
                        "The `bind` method creates `greetMia`.",
                        "The later call supplies its remaining suffix."
                    ]
                }
            ]
        },
        {
            id: "arrow-this",
            title: "Arrow function receivers",
            bullets: [
                "An arrow has no receiver of its own.",
                "It reads `this` from its enclosing scope.",
                "Calling it through another object, `call`, `apply`, or `bind` does not replace that `this`.",
                "An arrow callback retains its enclosing method’s receiver."
            ],
            examples: [
                {
                    title: "Arrow function from a method",
                    description: [
                        "The example creates the arrow during a call whose receiver is `user`."
                    ],
                    language: "javascript",
                    code: "const user = {\n    name: \"Mia\",\n    makeLabel() { return () => this.name.toUpperCase(); },\n};\nconst label = user.makeLabel();\nconst other = { name: \"Ava\", label };\nconsole.log(label());\nconsole.log(other.label());\nconsole.log(label.call(other));",
                    result: "MIA\nMIA\nMIA",
                    explanation: [
                        "All three calls read `user` because the arrow was created inside `user.makeLabel()`."
                    ]
                }
            ]
        },
        {
            id: "arrow-arguments",
            title: "Arrow arguments",
            bullets: [
                "An arrow has no `arguments` object of its own.",
                "Named parameters or a rest parameter receive arguments passed to the arrow itself."
            ],
            examples: [
                {
                    title: "Outer and arrow arguments",
                    description: [
                        "Inside the arrow, `arguments` refers to the enclosing regular function’s arguments."
                    ],
                    language: "javascript",
                    code: "function outer(value) {\n    const read = (inner) => {\n        console.log(inner);\n        return arguments[0];\n    };\n    return read(\"inner\");\n}\nconsole.log(outer(\"outer\"));",
                    result: "inner\nouter",
                    explanation: [
                        "`inner` receives the arrow’s argument.",
                        "`arguments[0]` still belongs to `outer`."
                    ]
                }
            ]
        }
    ]
};

export default note;
