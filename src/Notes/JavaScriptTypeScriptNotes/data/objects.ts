import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "objects",
    title: "Objects and property access",
    summary: "Group named properties, add methods, and distinguish identity from matching data.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    pointwise: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN JavaScript guide",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects"
        }
    ],
    sections: [
        {
            id: "properties",
            title: "Read and write named properties",
            bullets: [
                "An object groups properties inside braces. A property has a key and a value.",
                "Dot access uses a fixed name. Bracket access uses a calculated key or a name containing spaces.",
                "Property keys are strings or symbols. Numeric keys are converted to strings.",
                "Reading a missing property returns undefined. delete removes a property.",
                "An object is mutable. A const name can still refer to that object after its properties change."
            ],
            examples: [
                {
                    title: "Change a profile through a const name",
                    description: [
                        "Use dot and bracket access on one object."
                    ],
                    language: "javascript",
                    code: "const user = { name: \"Mia\", \"display name\": \"M\" };\nconst key = \"name\";\nconsole.log(user[key], user[\"display name\"]);\nuser.name = \"Ava\";\nuser.active = true;\nconsole.log(user.name, user.active, user.nickname);\ndelete user.active;\nconsole.log(user.active);",
                    result: "Mia M\nAva true undefined\nundefined",
                    explanation: [
                        "The const name still refers to the same object.",
                        "Deleting active removes the property; reading it then produces undefined."
                    ]
                }
            ]
        },
        {
            id: "methods-and-shorthand",
            title: "Store function values as methods",
            bullets: [
                "Property shorthand { name } means { name: name }.",
                "A property containing a function is a method. Call it with object.method(...).",
                "Methods can use existing function values or the method syntax name(...) { ... }."
            ],
            examples: [
                {
                    title: "Put a calculation on an object",
                    description: [
                        "Use a shorthand value and a method with an argument."
                    ],
                    language: "javascript",
                    code: "const name = \"calculator\";\nconst tools = {\n    name,\n    double(value) { return value * 2; },\n};\nconsole.log(tools.name, tools.double(4));\nconsole.log(typeof tools.double);\ntools.double.label = \"multiply by two\";\nconsole.log(tools.double.label);",
                    result: "calculator 8\nfunction\nmultiply by two",
                    explanation: [
                        "Functions are objects that can also have properties.",
                        "The dedicated this lesson explains methods that read their receiver’s properties."
                    ]
                }
            ]
        },
        {
            id: "identity",
            title: "Assignment shares the same object",
            bullets: [
                "An object reference identifies a particular object.",
                "Assigning an object to another name copies the reference.",
                "=== compares object identity. Separate objects remain unequal even when their properties match."
            ],
            examples: [
                {
                    title: "Compare a shared reference with a separate object",
                    description: [
                        "Change the shared object through its second name."
                    ],
                    language: "javascript",
                    code: "const original = { name: \"Mia\" };\nconst same = original;\nconst separate = { name: \"Mia\" };\nconsole.log(original === same, original === separate);\nsame.name = \"Ava\";\nconsole.log(original.name);",
                    result: "true false\nAva",
                    explanation: [
                        "same and original refer to one object.",
                        "separate refers to a different object."
                    ]
                }
            ]
        },
        {
            id: "optional-chaining",
            title: "Check a missing object before reading a property",
            bullets: [
                "?. stops a property read or call when its receiver is null or undefined. The result is undefined.",
                "A continuous optional chain protects the later reads in that chain. Grouping can end that protection.",
                "Optional chaining does not protect an undeclared name."
            ],
            examples: [
                {
                    title: "Read a missing selection safely",
                    description: [
                        "Use null for no selected user."
                    ],
                    language: "javascript",
                    code: "const selected = null;\nconsole.log(selected?.name);\nconst user = { name: \"Mia\", address: { city: \"Pune\" } };\nconsole.log(user.address?.city);\nconsole.log(user.nickname?.toUpperCase());",
                    result: "undefined\nPune\nundefined",
                    explanation: [
                        "The null receiver and missing nickname skip the property or method access."
                    ]
                }
            ]
        },
        {
            id: "symbol-keys",
            title: "Use symbols as unique keys",
            bullets: [
                "Each Symbol call creates a unique key, even when descriptions match.",
                "Bracket access reads a symbol-keyed property.",
                "Object.keys lists own enumerable string keys. It skips symbol keys."
            ],
            examples: [
                {
                    title: "Keep a symbol key separate from a text key",
                    description: [
                        "Create two symbols with the same description."
                    ],
                    language: "javascript",
                    code: "const first = Symbol(\"id\");\nconst second = Symbol(\"id\");\nconst user = { name: \"Mia\", [first]: 7 };\nconsole.log(first === second);\nconsole.log(user[first], user[second]);\nconsole.log(Object.keys(user).join(\", \"));",
                    result: "false\n7 undefined\nname",
                    explanation: [
                        "The matching descriptions do not make the symbols equal."
                    ]
                }
            ]
        }
    ]
};

export default note;
