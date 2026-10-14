import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "this-and-function-calls",
    title: "this, call, apply, and bind",
    summary: "Understand a regular function’s receiver and an arrow’s enclosing this.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    pointwise: true,
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
            title: "The call determines a regular function’s this",
            bullets: [
                "this is the receiver used by a function. In object.method(), a regular method receives object as this.",
                "Assigning a method to another variable stores its function value. It does not keep the original receiver.",
                "A plain regular-function call in strict mode receives undefined as this."
            ],
            examples: [
                {
                    title: "Call the same method through different objects",
                    description: [
                        "Run in strict mode to make plain-call behavior explicit."
                    ],
                    language: "javascript",
                    code: "\"use strict\";\nconst user = { name: \"Mia\", showName() { return this.name; } };\nconst other = { name: \"Ava\", showName: user.showName };\nconsole.log(user.showName());\nconsole.log(other.showName());\nconst detached = user.showName;\n// detached(); // Would fail because this is undefined.",
                    result: "Mia\nAva",
                    explanation: [
                        "The method reads the name of its receiver.",
                        "The commented plain call would throw a TypeError while reading this.name."
                    ]
                }
            ]
        },
        {
            id: "call-apply-bind",
            title: "Supply or keep a receiver",
            bullets: [
                "call(receiver, ...arguments) invokes a regular function with that receiver and separate arguments.",
                "apply(receiver, argumentArray) invokes it with arguments from an array-like value.",
                "bind(receiver, ...arguments) returns a new function that keeps its receiver and any supplied leading arguments."
            ],
            examples: [
                {
                    title: "Call now or bind for later",
                    description: [
                        "Reuse one function with two objects."
                    ],
                    language: "javascript",
                    code: "function label(prefix, suffix) { return `${prefix}${this.name}${suffix}`; }\nconst mia = { name: \"Mia\" };\nconst ava = { name: \"Ava\" };\nconsole.log(label.call(mia, \"Hello \", \"!\"));\nconsole.log(label.apply(ava, [\"Hello \", \"!\"]));\nconst greetMia = label.bind(mia, \"Hello \");\nconsole.log(greetMia(\"!\"));",
                    result: "Hello Mia!\nHello Ava!\nHello Mia!",
                    explanation: [
                        "call and apply invoke immediately.",
                        "bind creates greetMia; the later call supplies its remaining suffix."
                    ]
                }
            ]
        },
        {
            id: "arrow-this",
            title: "An arrow keeps this from where it is created",
            bullets: [
                "An arrow has no receiver of its own. It reads this from its enclosing scope.",
                "Calling it through another object, call, apply, or bind does not replace that this.",
                "Use an arrow callback when it should retain an enclosing method’s receiver."
            ],
            examples: [
                {
                    title: "Return an arrow from a method",
                    description: [
                        "Create the arrow during a call whose receiver is user."
                    ],
                    language: "javascript",
                    code: "const user = {\n    name: \"Mia\",\n    makeLabel() { return () => this.name.toUpperCase(); },\n};\nconst label = user.makeLabel();\nconst other = { name: \"Ava\", label };\nconsole.log(label());\nconsole.log(other.label());\nconsole.log(label.call(other));",
                    result: "MIA\nMIA\nMIA",
                    explanation: [
                        "All three calls read user because the arrow was created inside user.makeLabel()."
                    ]
                }
            ]
        },
        {
            id: "arrow-arguments",
            title: "An arrow reads the outer arguments object",
            bullets: [
                "An arrow has no arguments object of its own.",
                "Use its named parameters or a rest parameter for arguments passed to the arrow itself."
            ],
            examples: [
                {
                    title: "Compare the outer argument with an arrow argument",
                    description: [
                        "Use arguments inside an arrow to read the enclosing regular call."
                    ],
                    language: "javascript",
                    code: "function outer(value) {\n    const read = (inner) => {\n        console.log(inner);\n        return arguments[0];\n    };\n    return read(\"inner\");\n}\nconsole.log(outer(\"outer\"));",
                    result: "inner\nouter",
                    explanation: [
                        "inner receives the arrow’s argument.",
                        "arguments[0] still belongs to outer."
                    ]
                }
            ]
        }
    ]
};

export default note;
