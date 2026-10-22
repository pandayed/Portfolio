import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'object-shapes',
    title: 'Object types',
    summary: 'Object types describe required and optional properties, compatible shapes, and combined requirements.',
    scope: 'typescript',
    updatedOn: '2026-10-14',
    exampleLayout: 'grouped',
    inlineCode: true,
    references: [
        {
            title: 'TypeScript Handbook: Object types',
            href: 'https://www.typescriptlang.org/docs/handbook/2/objects.html',
        },
    ],
    sections: [
        {
            id: 'object-shape',
            title: 'Required properties',
            bullets: [
                'An object type lists property names and their value types.',
                'An annotation can use an inline object type.',
                'A type alias can name that same property list.',
                'The type describes requirements.',
                'An object expression supplies the actual values.',
                'A local object can get its property types through inference.',
                'A `const` object can still have writable properties.',
                'Their types may allow more than one literal value.',
            ],
            examples: [
                {
                    title: 'User properties',
                    description: [
                        'The example shares one object requirement between a variable and a function.',
                    ],
                    language: 'typescript',
                    code: [
                        'type User = { id: number; name: string };',
                        'function label(user: User): string {',
                        '    return `${user.id}: ${user.name}`;',
                        '}',
                        'const user: User = { id: 7, name: "Mia" };',
                        'console.log(label(user));',
                        '// label({ id: 7 }); // Type error: name is missing.',
                    ].join('\n'),
                    result: '7: Mia',
                    explanation: [
                        'The function accepts values with the required properties and property types.',
                        'The alias supplies no defaults or object construction.',
                    ],
                },
                {
                    title: 'Inferred property types',
                    description: [
                        'The example changes a `string` property without replacing the object reference.',
                    ],
                    language: 'typescript',
                    code: [
                        'const user = { name: "Mia", id: 7 };',
                        'user.name = "Noah";',
                        'console.log(user.name);',
                        '// user.id = "seven"; // Type error: id was inferred as number.',
                    ].join('\n'),
                    result: 'Noah',
                    explanation: [
                        '`name` is inferred as `string` and remains writable.',
                        'Declaring the reference with `const` does not make its properties `readonly`.',
                    ],
                },
            ],
        },
        {
            id: 'optional-properties',
            title: 'Optional properties',
            bullets: [
                'A `?` after a property name allows the property to be absent.',
                'Reading an optional property can produce `undefined`.',
                'Operations on its value may require a check.',
                'With `exactOptionalPropertyTypes` enabled, an optional property may be absent.',
                'A present property can contain `undefined` only when its declared type allows `undefined`.',
            ],
            examples: [
                {
                    title: 'Nickname fallback',
                    description: [
                        'The example shows the `nickname` when it exists.',
                        'Otherwise it shows the `name`.',
                    ],
                    language: 'typescript',
                    code: [
                        'type User = { name: string; nickname?: string };',
                        'function displayName(user: User): string {',
                        '    return user.nickname ?? user.name;',
                        '}',
                        'console.log(displayName({ name: "Mia" }));',
                        'console.log(displayName({ name: "Mia", nickname: "M" }));',
                    ].join('\n'),
                    result: 'Mia\nM',
                    explanation: [
                        '`nickname` is optional in the supplied objects.',
                        'The nullish fallback handles an absent `nickname`.',
                    ],
                },
            ],
        },
        {
            id: 'readonly-properties',
            title: 'Readonly properties',
            bullets: [
                '`readonly` prevents assigning a property through that checked type.',
                'It does not freeze an object.',
                'Another writable reference can still change the same object.',
                'A `readonly` property holding an object does not automatically make nested properties `readonly`.',
            ],
            examples: [
                {
                    title: 'Readonly references and nested properties',
                    description: [
                        'The example shows the difference between replacing a property and changing its nested value.',
                    ],
                    language: 'typescript',
                    code: [
                        'type Profile = { readonly preferences: { theme: string } };',
                        'const profile: Profile = { preferences: { theme: "light" } };',
                        'profile.preferences.theme = "dark";',
                        'console.log(profile.preferences.theme);',
                        '// profile.preferences = { theme: "light" }; // Type error: readonly property.',
                    ].join('\n'),
                    result: 'dark',
                    explanation: [
                        '`preferences` cannot be reassigned through `Profile`.',
                        '`theme` remains writable because its own declaration is not `readonly`.',
                    ],
                },
            ],
        },
        {
            id: 'structural-typing',
            title: 'Structural typing',
            bullets: [
                'Structural typing compares the required members.',
                'It does not require matching type names.',
                'A value already stored in a variable can have additional properties and still meet a smaller requirement.',
                'A fresh object literal receives extra-property checks.',
                'This can catch a misspelled property when assigning or passing the literal directly.',
            ],
            examples: [
                {
                    title: 'Additional object properties',
                    description: [
                        'The example accepts a named object even when it also contains an `id`.',
                    ],
                    language: 'typescript',
                    code: [
                        'type Named = { name: string };',
                        'function greet(value: Named): string {',
                        '    return `Hello, ${value.name}`;',
                        '}',
                        'const user = { name: "Mia", id: 7 };',
                        'console.log(greet(user));',
                        '// greet({ name: "Mia", id: 7 }); // Extra-property error on the fresh literal.',
                    ].join('\n'),
                    result: 'Hello, Mia',
                    explanation: [
                        '`user` has the required `string` property.',
                        'Fresh object literals get an additional check for properties absent from the target type.',
                    ],
                },
            ],
        },
        {
            id: 'intersections',
            title: 'Intersections',
            bullets: [
                'The `&` operator forms an intersection.',
                'A value must meet every participating type.',
                'Unlike a union, an intersection does not choose between alternatives.',
                'Conflicting property requirements can produce an impossible property type.',
            ],
            examples: [
                {
                    title: 'Combined object requirements',
                    description: [
                        'The example combines two existing object requirements without copying their property lists.',
                    ],
                    language: 'typescript',
                    code: [
                        'type Named = { name: string };',
                        'type Identified = { id: number };',
                        'type User = Named & Identified;',
                        'const user: User = { name: "Mia", id: 7 };',
                        'console.log(user.name, user.id);',
                        '// const incomplete: User = { name: "Mia" }; // Type error: id is missing.',
                    ].join('\n'),
                    result: 'Mia 7',
                    explanation: [
                        '`User` requires both shapes.',
                        'The existing `Named` and `Identified` aliases keep their original requirements.',
                    ],
                },
            ],
        },
        {
            id: 'index-signatures',
            title: 'Index signatures',
            bullets: [
                'An index signature describes values read through keys whose names are not listed individually.',
                'A `string` index signature also accepts numeric keys because JavaScript converts them to strings.',
                'With `noUncheckedIndexedAccess` enabled, an unchecked indexed read also includes `undefined`.',
            ],
            examples: [
                {
                    title: 'Score dictionary',
                    description: [
                        'The example describes a dictionary whose property values must be numbers.',
                    ],
                    language: 'typescript',
                    code: [
                        'type Scores = { [name: string]: number };',
                        'const scores: Scores = { Mia: 20, Noah: 15 };',
                        'console.log(scores["Mia"]);',
                        'console.log(scores["Ava"] ?? 0);',
                        '// const wrong: Scores = { Mia: "twenty" }; // Type error: a score must be numeric.',
                    ].join('\n'),
                    result: '20\n0',
                    explanation: [
                        'The index signature checks supplied values.',
                        'The fallback still handles a missing key at runtime.',
                        '`noUncheckedIndexedAccess` also records that possibility in the type.',
                    ],
                },
            ],
        },
    ],
};

export default note;
