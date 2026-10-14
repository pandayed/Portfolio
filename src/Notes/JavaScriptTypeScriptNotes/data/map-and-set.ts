import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "map-and-set",
    title: "Map and Set",
    summary: "Use keyed entries or a collection of distinct values.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    pointwise: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN JavaScript guide",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Keyed_collections"
        }
    ],
    sections: [
        {
            id: "map-and-set",
            title: "Map stores key-value pairs; Set stores unique values",
            bullets: [
                "Map stores key-value entries. new Map(entries) constructs it from an iterable of [key, value] pairs.",
                "Map keys can have any type. Distinct objects are separate keys, even if their properties match.",
                "set writes an entry. get reads a value or returns undefined for an absent key. size counts entries.",
                "Writing an existing key replaces its value without adding another entry.",
                "Set stores distinct values. new Set(values) creates it; add inserts a value and size counts entries.",
                "Map and Set preserve insertion order. Updating an existing entry does not move it to the end.",
                "Use values() to iterate Map values. Map itself and Set also support for...of and spread."
            ],
            examples: [
                {
                    language: "javascript",
                    code: "const mia = { name: \"Mia\" };\nconst scores = new Map([[mia, 9], [\"Noah\", 8]]);\nscores.set(mia, 10);\nconsole.log(scores.get(mia));           // 10\nconsole.log(scores.get({ name: \"Mia\" })); // undefined\nconsole.log(scores.size);               // 2\nconsole.log([...scores.values()]);      // [10, 8]\n\nconst tags = new Set([\"js\", \"ts\", \"js\"]);\ntags.add(\"js\");\nconsole.log(tags.size); // 2\nconsole.log([...tags]); // [\"js\", \"ts\"]",
                    result: "10\nundefined\n2\n[10, 8]\n2\n[\"js\", \"ts\"]",
                    title: "Map stores key-value pairs; Set stores unique values",
                    description: [
                        "Use an object as a Map key and remove duplicates with Set."
                    ],
                    explanation: [
                        "Reading the Map entry needs the same mia object that was used as the key.",
                        "A separate object with the same name does not identify that entry.",
                        "Set keeps only the first occurrence of each distinct value."
                    ]
                }
            ],
            pitfalls: [
                "Use a plain object for a fixed set of named fields. Use Map when the keys come from changing data or need to be objects."
            ]
        },
        {
            id: "collection-lookups",
            title: "Check, delete, and iterate entries",
            bullets: [
                "has checks whether a key or value is present. delete removes one entry and reports whether it existed.",
                "Map iteration yields [key, value] pairs. Set iteration yields values.",
                "clear removes every entry."
            ],
            examples: [
                {
                    title: "Remove and iterate entries",
                    description: [
                        "Iterate after removing one Map entry."
                    ],
                    language: "javascript",
                    code: "const scores = new Map([[\"Mia\", 9], [\"Noah\", 8]]);\nconsole.log(scores.has(\"Mia\"), scores.delete(\"Noah\"));\nfor (const [name, score] of scores) console.log(name, score);\nscores.clear();\nconsole.log(scores.size);\nconst unique = new Set([NaN, NaN, 0, -0]);\nconsole.log(unique.size);",
                    result: "true true\nMia 9\n0\n2",
                    explanation: [
                        "Map and Set use SameValueZero equality: NaN matches NaN, and 0 matches -0.",
                        "Object keys and values are still compared by identity."
                    ]
                }
            ]
        }
    ]
};

export default note;
