import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'type',
    title: 'Type aliases and unions',
    summary: 'Type aliases name types. Unions describe alternative allowed values.',
    scope: 'typescript',
    updatedOn: '2026-10-14',
    exampleLayout: 'grouped',
    inlineCode: true,
    references: [
        {
            title: 'TypeScript Handbook: Everyday types',
            href: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html',
        },
    ],
    sections: [
        {
            id: 'type-alias',
            title: 'Type aliases',
            bullets: [
                'A type alias gives a name to a type expression, such as `type Name = Expression`.',
                'Annotations can use the alias name instead of repeating the expression.',
                'Two aliases of `string` accept the same values.',
                'Different names alone do not make incompatible types.',
            ],
            examples: [
                {
                    title: 'Named string type',
                    description: [
                        'The example uses a named `string` type for a function input and a variable.',
                    ],
                    language: 'typescript',
                    code: [
                        'type UserName = string;',
                        'function greet(name: UserName): string {',
                        '    return `Hello, ${name}`;',
                        '}',
                        'const userName: UserName = "Mia";',
                        'console.log(greet(userName));',
                    ].join('\n'),
                    result: 'Hello, Mia',
                    explanation: [
                        '`UserName` accepts exactly the values accepted by `string`.',
                        'The alias names a type.',
                        'It does not create a JavaScript variable.',
                    ],
                },
            ],
        },
        {
            id: 'unions',
            title: 'Unions',
            bullets: [
                'The `|` operator forms a union.',
                'A value can match any of its members.',
                '`string | number` accepts either a `string` or a `number`.',
                'An operation must work for every member still possible at that point.',
                'Narrowing reduces the possible types before an operation that needs a specific type.',
            ],
            examples: [
                {
                    title: 'Text and numeric identifiers',
                    description: [
                        'The example allows two identifier representations without accepting booleans.',
                    ],
                    language: 'typescript',
                    code: [
                        'type UserId = string | number;',
                        'function label(id: UserId): string {',
                        '    return `ID: ${id}`;',
                        '}',
                        'console.log(label("u-7"));',
                        'console.log(label(7));',
                        '// label(true); // Type error: boolean is not a UserId.',
                    ].join('\n'),
                    result: 'ID: u-7\nID: 7',
                    explanation: [
                        'Both members can be included in a template string.',
                        'A `string`-only method would need a check before use.',
                    ],
                },
            ],
        },
        {
            id: 'literal-unions',
            title: 'Literal unions',
            bullets: [
                'A union of literal types allows only the listed values.',
                'Literal unions describe choices such as status names without introducing runtime objects.',
            ],
            examples: [
                {
                    title: 'Status values',
                    description: [
                        'The example accepts only the states that the program handles.',
                    ],
                    language: 'typescript',
                    code: [
                        'type Status = "idle" | "done";',
                        'let currentStatus: Status = "idle";',
                        'currentStatus = "done";',
                        'console.log(currentStatus);',
                        '// currentStatus = "waiting"; // Type error: waiting is not a Status.',
                    ].join('\n'),
                    result: 'done',
                    explanation: [
                        'The union accepts the two listed strings.',
                        'The declaration does not generate a collection of status values.',
                    ],
                },
            ],
        },
        {
            id: 'missing-values',
            title: 'Nullable types',
            bullets: [
                'With `strictNullChecks` enabled, `string` excludes `null` and `undefined`.',
                'A union can include `null` and `undefined` as valid inputs or possible results.',
                'Allowing `undefined` in a parameter’s union does not make the argument optional.',
                'The caller must still supply that argument position.',
            ],
            examples: [
                {
                    title: 'Optional nickname values',
                    description: [
                        'The example keeps missing values in the checked type until they can be handled.',
                    ],
                    language: 'typescript',
                    code: [
                        'type Nickname = string | null | undefined;',
                        'let nickname: Nickname = null;',
                        'nickname = "Mia";',
                        'console.log(nickname);',
                        'nickname = undefined;',
                        'console.log(nickname);',
                    ].join('\n'),
                    result: 'Mia\nundefined',
                    explanation: [
                        'Each assignment matches one union member.',
                        'The narrowing lesson shows how to exclude missing values before a `string` operation.',
                    ],
                },
                {
                    title: 'Required arguments with missing values',
                    description: [
                        'An allowed value does not make an argument optional.',
                    ],
                    language: 'typescript',
                    code: [
                        'function label(name: string | undefined): string {',
                        '    return name ?? "Guest";',
                        '}',
                        'console.log(label(undefined), label("Mia"));',
                        '// label(); // Type error: the required argument is missing.',
                    ].join('\n'),
                    result: 'Guest Mia',
                    explanation: [
                        'The union accepts an explicit `undefined` value.',
                        'The required-argument rule still rejects omission.',
                    ],
                },
            ],
        },
    ],
};

export default note;
