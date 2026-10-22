import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'type-operators',
    title: 'Keys and property types',
    summary: 'Type operators derive type information from existing objects before constructing more complex types.',
    scope: 'typescript',
    updatedOn: '2026-10-14',
    exampleLayout: 'grouped',
    inlineCode: true,
    references: [
        {
            title: 'TypeScript Handbook: keyof',
            href: 'https://www.typescriptlang.org/docs/handbook/2/keyof-types.html',
        },
        {
            title: 'TypeScript Handbook: typeof',
            href: 'https://www.typescriptlang.org/docs/handbook/2/typeof-types.html',
        },
        {
            title: 'TypeScript Handbook: Indexed access types',
            href: 'https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html',
        },
    ],
    sections: [
        {
            id: 'keyof',
            title: 'Property keys',
            bullets: [
                '`keyof` produces the union of known property names from an object type.',
                'For a `string` index signature, `keyof` can include `string` and `number` because numeric property keys are converted to strings.',
            ],
            examples: [
                {
                    title: 'User property keys',
                    description: [
                        'The example restricts a selected key to the names in one object type.',
                    ],
                    language: 'typescript',
                    code: [
                        'type User = { id: number; name: string };',
                        'type UserKey = keyof User;',
                        'const key: UserKey = "name";',
                        'console.log(key);',
                        '// const wrong: UserKey = "email"; // Type error: email is not a key of User.',
                    ].join('\n'),
                    result: 'name',
                    explanation: [
                        '`UserKey` is `"id" | "name"`.',
                        'This derives names from `User` without copying their list.',
                    ],
                },
            ],
        },
        {
            id: 'indexed-access',
            title: 'Indexed access types',
            bullets: [
                '`Type[Key]` selects the type of a property.',
                'The brackets are used in a type expression here.',
                'A union of keys produces a union of their property types.',
                'Using `number` as the index of an array type selects its element type.',
            ],
            examples: [
                {
                    title: 'User property types',
                    description: [
                        'The example derives the `name` type from `User` instead of repeating `string`.',
                    ],
                    language: 'typescript',
                    code: [
                        'type User = { id: number; name: string };',
                        'type UserName = User["name"];',
                        'type UserValue = User[keyof User];',
                        'const userName: UserName = "Mia";',
                        'const value: UserValue = 7;',
                        'console.log(userName, value);',
                    ].join('\n'),
                    result: 'Mia 7',
                    explanation: [
                        '`UserName` is `string`.',
                        '`UserValue` is `number | string` because it selects both properties.',
                    ],
                },
            ],
        },
        {
            id: 'type-space-typeof',
            title: 'Type queries',
            bullets: [
                'In a type expression, `typeof` obtains the checked type of a named value.',
                'JavaScript’s runtime `typeof` expression produces a string.',
                'The type operator reuses the inferred type of an existing value.',
            ],
            examples: [
                {
                    title: 'Inferred settings type',
                    description: [
                        'The example checks another settings object against the inferred type of the original.',
                    ],
                    language: 'typescript',
                    code: [
                        'const defaults = { theme: "light", compact: false };',
                        'type Settings = typeof defaults;',
                        'const chosen: Settings = { theme: "dark", compact: true };',
                        'console.log(chosen.theme, typeof chosen.compact);',
                    ].join('\n'),
                    result: 'dark boolean',
                    explanation: [
                        '`typeof defaults` appears in a type declaration and describes the object shape.',
                        '`typeof chosen.compact` appears in a JavaScript expression and reports the runtime type as a string.',
                    ],
                },
            ],
        },
        {
            id: 'keyof-constraints',
            title: 'Key constraints',
            bullets: [
                'A key type parameter can be constrained to `keyof` another type parameter.',
                'Using that key in an indexed access result keeps the returned type connected to the selected property.',
            ],
            examples: [
                {
                    title: 'Selected property types',
                    description: [
                        'The example allows only existing keys and preserves each property’s result type.',
                    ],
                    language: 'typescript',
                    code: [
                        'function getProperty<Value, Key extends keyof Value>(value: Value, key: Key): Value[Key] {',
                        '    return value[key];',
                        '}',
                        'const user = { id: 7, name: "Mia" };',
                        'console.log(getProperty(user, "name").toUpperCase());',
                        'console.log(getProperty(user, "id").toFixed(1));',
                        '// getProperty(user, "email"); // Type error: email is not a known key.',
                    ].join('\n'),
                    result: 'MIA\n7.0',
                    explanation: [
                        'Selecting `name` returns `string`.',
                        'Selecting `id` returns `number`.',
                        'The constraint rejects `email`.',
                    ],
                },
            ],
        },
    ],
};

export default note;
