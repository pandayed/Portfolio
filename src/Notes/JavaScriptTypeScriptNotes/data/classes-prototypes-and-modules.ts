import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "classes-prototypes-and-modules",
    title: "Prototypes and inherited properties",
    summary: "Follow property lookup and distinguish own, inherited, and enumerable properties.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    pointwise: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN JavaScript guide",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain"
        }
    ],
    sections: [
        {
            id: "prototype-chain",
            title: "Property lookup follows the prototype chain",
            bullets: [
                "A prototype is an object used for inherited properties. Object.create(parent) creates an object whose prototype is parent.",
                "JavaScript looks for an own property first, then checks each prototype until it finds a match or reaches null.",
                "Object.hasOwn checks direct ownership. The in operator checks direct and inherited properties.",
                "Object.getPrototypeOf returns the prototype. If the whole chain lacks a property, reading it returns undefined."
            ],
            examples: [
                {
                    language: "javascript",
                    code: "const animal = Object.create(null); // Its prototype is null.\nanimal.kind = \"animal\";\nanimal.speak = () => \"sound\";\nconst dog = Object.create(animal);\ndog.name = \"Pip\";\nconst puppy = Object.create(dog);\n\nconsole.log(puppy.name);  // \"Pip\" (found on dog)\nconsole.log(puppy.kind);  // \"animal\" (found on animal)\nconsole.log(dog.speak()); // \"sound\"\nconsole.log(Object.hasOwn(dog, \"name\"));  // true\nconsole.log(Object.hasOwn(dog, \"speak\")); // false\nconsole.log(puppy.missing); // undefined\n\ndog.kind = \"dog\";\nconsole.log(dog.kind);    // \"dog\" (own property wins)\nconsole.log(animal.kind); // \"animal\"\nconsole.log(Object.getPrototypeOf(puppy) === dog); // true",
                    result: "Pip\nanimal\nsound\ntrue\nfalse\nundefined\ndog\nanimal\ntrue",
                    title: "Property lookup follows the prototype chain",
                    description: [
                        "Read properties through a three-object prototype chain."
                    ],
                    explanation: [
                        "puppy inherits from dog; dog inherits from animal.",
                        "The own dog.kind shadows animal.kind. animal’s null prototype ends the chain."
                    ]
                }
            ]
        },
        {
            id: "own-enumerable-properties",
            title: "Object rest copies own enumerable properties",
            bullets: [
                "Enumerable means marked for inclusion when properties are listed or copied. Ordinary literal and assignment properties are enumerable.",
                "Object.defineProperty configures property attributes. Setting enumerable to false makes a property readable but excludes it from enumerable-property operations.",
                "Object.keys lists own enumerable string keys. Object rest and spread also copy own enumerable symbol keys.",
                "Object rest and spread skip inherited and non-enumerable properties."
            ],
            examples: [
                {
                    language: "javascript",
                    code: "const user = Object.create({ role: \"reader\" });\nuser.name = \"Mia\";\nuser.active = true;\nObject.defineProperty(user, \"internalId\", {\n    value: 42,\n    enumerable: false,\n});\n\nconsole.log(user.role);                   // \"reader\"\nconsole.log(Object.hasOwn(user, \"role\")); // false\nconsole.log(Object.hasOwn(user, \"name\")); // true\nconsole.log(user.internalId);             // 42\nconsole.log(Object.keys(user));           // [\"name\", \"active\"]\n\nconst { name, ...rest } = user;\nconsole.log(rest);                 // { active: true }\nconsole.log(\"role\" in rest);       // false\nconsole.log(\"internalId\" in rest); // false",
                    result: "reader\nfalse\ntrue\n42\n[\"name\", \"active\"]\n{ active: true }\nfalse\nfalse",
                    title: "Object rest copies own enumerable properties",
                    description: [
                        "Copy an object that has inherited and non-enumerable properties."
                    ],
                    explanation: [
                        "role is inherited. internalId is an own non-enumerable property.",
                        "Neither is copied to rest; name is excluded by destructuring. Only active remains."
                    ]
                }
            ]
        },
        {
            id: "for-of-and-for-in",
            title: "for...of reads values; for...in reads property keys",
            bullets: [
                "for...in reads enumerable string property keys, including inherited keys.",
                "It skips non-enumerable properties and symbol keys.",
                "Use Object.hasOwn inside the loop when only direct properties should be handled.",
                "Array keys from for...in are strings. Use for...of when the array values are needed."
            ],
            examples: [
                {
                    title: "Array values, string characters, and array keys",
                    language: "javascript",
                    code: "const colors = [\"red\", \"blue\"];\nfor (const color of colors) {\n    console.log(color); // red, then blue\n}\nfor (const character of \"hi\") {\n    console.log(character); // h, then i\n}\nfor (const key in colors) {\n    console.log(key, typeof key); // 0 string, then 1 string\n}",
                    result: "red\nblue\nh\ni\n0 string\n1 string",
                    description: [
                        "Compare values from for...of with keys from for...in."
                    ],
                    explanation: [
                        "for...of reads values. for...in reads string property keys."
                    ]
                },
                {
                    title: "Inherited and non-enumerable properties",
                    language: "javascript",
                    code: "const parent = { inherited: \"from parent\" };\nconst item = Object.create(parent);\nitem.own = \"from item\";\nconst marker = Symbol(\"marker\");\nitem[marker] = \"symbol value\";\nObject.defineProperty(item, \"hidden\", {\n    value: \"not enumerable\",\n    enumerable: false,\n});\nfor (const key in item) {\n    console.log(key); // own, then inherited\n}\nconsole.log(item.hidden); // not enumerable: the property still exists\nconsole.log(item[marker]); // symbol value: the symbol property still exists",
                    result: "own\ninherited\nnot enumerable\nsymbol value",
                    description: [
                        "Enumerate an object with own, inherited, hidden, and symbol-keyed properties."
                    ],
                    explanation: [
                        "for...in includes own and inherited enumerable string keys.",
                        "The hidden and symbol properties remain readable even though the loop skips them."
                    ]
                }
            ]
        }
    ]
};

export default note;
