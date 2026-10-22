import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'runtime-validation',
    title: 'Unknown, assertions and runtime validation',
    summary: 'Runtime validation checks external values. Assertions state assumptions without checking them.',
    scope: 'typescript',
    updatedOn: '2026-10-14',
    exampleLayout: 'grouped',
    inlineCode: true,
    references: [
        {
            title: 'TypeScript Handbook: Narrowing',
            href: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html',
        },
        {
            title: 'TypeScript Handbook: Everyday types',
            href: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html',
        },
    ],
    sections: [
        {
            id: 'unknown-and-any',
            title: 'Unchecked input',
            bullets: [
                '`unknown` accepts any incoming value but requires narrowing before operations that need a specific type.',
                '`any` allows property reads, calls and assignments without checking their safety.',
                '`JSON.parse` is typed as returning `any`.',
                'An `unknown` annotation requires checks before using the parsed value.',
            ],
            examples: [
                {
                    title: 'Message validation',
                    description: [
                        'The example accepts arbitrary input while using a `string` method only for a `string`.',
                    ],
                    language: 'typescript',
                    code: [
                        'function readMessage(value: unknown): string {',
                        '    if (typeof value === "string") return value.trim();',
                        '    return "No message";',
                        '}',
                        'console.log(readMessage(" Hello "));',
                        'console.log(readMessage(42));',
                    ].join('\n'),
                    result: 'Hello\nNo message',
                    explanation: [
                        '`unknown` prevents calling `trim` before the check.',
                        'The `number` takes the fallback branch.',
                    ],
                },
            ],
        },
        {
            id: 'assertions',
            title: 'Type assertions',
            bullets: [
                '`value as SomeType` tells TypeScript to treat the value as that type.',
                'An assertion makes no runtime check and converts no values.',
                'A non-null assertion using `!` also makes no runtime check.',
                'Type annotations, aliases and interfaces disappear from emitted JavaScript.',
                'They cannot inspect external data.',
            ],
            examples: [
                {
                    title: 'Asserted and actual property types',
                    description: [
                        'The example compares an asserted object contract with the actual parsed property.',
                    ],
                    language: 'typescript',
                    code: [
                        'type User = { name: string };',
                        'const parsed: unknown = JSON.parse(\'{"name":42}\');',
                        'const assumed = parsed as User;',
                        'console.log(typeof assumed.name);',
                        '// assumed.name.toUpperCase(); // Would throw: the actual name is a number.',
                    ].join('\n'),
                    result: 'number',
                    explanation: [
                        'The assertion permits the property access during checking.',
                        'The `string` requirement does not change the numeric data.',
                    ],
                },
            ],
        },
        {
            id: 'validate-object',
            title: 'Runtime validation',
            bullets: [
                'Runtime validation executes JavaScript checks on actual values.',
                'A type predicate has a result such as `value is User`.',
                'A successful check lets TypeScript narrow the caller’s value.',
                'The checker trusts a predicate declaration.',
                'Its implementation must check every requirement it promises.',
                'Validation for one object contract does not prove unrelated business rules.',
                'Constraints such as positive ids require separate checks.',
            ],
            examples: [
                {
                    title: 'User data validation',
                    description: [
                        'The example accepts a parsed value only when it has a numeric `id` and a `string` `name`.',
                    ],
                    language: 'typescript',
                    code: [
                        'type User = { id: number; name: string };',
                        'function isUser(value: unknown): value is User {',
                        '    if (typeof value !== "object" || value === null) return false;',
                        '    return "id" in value && typeof value.id === "number"',
                        '        && "name" in value && typeof value.name === "string";',
                        '}',
                        'const incoming: unknown = JSON.parse(\'{"id":7,"name":"Mia"}\');',
                        'if (isUser(incoming)) {',
                        '    console.log(incoming.name.toUpperCase());',
                        '} else {',
                        '    console.log("Invalid user");',
                        '}',
                        'console.log(isUser({ id: 7, name: 42 }));',
                    ].join('\n'),
                    result: 'MIA\nfalse',
                    explanation: [
                        'The object and `null` checks make property checks safe.',
                        'The predicate permits the uppercase operation only after successful validation.',
                        'The second value fails because `name` is numeric.',
                    ],
                },
                {
                    title: 'Malformed JSON',
                    description: [
                        'A parsing failure differs from a valid JSON value with the wrong shape.',
                    ],
                    language: 'typescript',
                    code: [
                        'try {',
                        '    const incoming: unknown = JSON.parse("not JSON");',
                        '    console.log(incoming);',
                        '} catch (error) {',
                        '    if (error instanceof SyntaxError) console.log("Invalid JSON text");',
                        '    else throw error;',
                        '}',
                    ].join('\n'),
                    result: 'Invalid JSON text',
                    explanation: [
                        '`JSON.parse` can throw before shape validation begins.',
                        'The `SyntaxError` check handles this parsing failure.',
                        'Other failures are rethrown.',
                    ],
                },
            ],
        },
    ],
};

export default note;
