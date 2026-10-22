import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'narrowing',
    title: 'Narrowing',
    summary: 'Conditions reduce the possible types before operations that require a specific type.',
    scope: 'typescript',
    updatedOn: '2026-10-14',
    exampleLayout: 'grouped',
    inlineCode: true,
    references: [
        {
            title: 'TypeScript Handbook: Narrowing',
            href: 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html',
        },
    ],
    sections: [
        {
            id: 'control-flow-narrowing',
            title: 'Control flow narrowing',
            bullets: [
                'Narrowing reduces the possible types at a particular point in the code.',
                'A `typeof` condition identifies a primitive member of a union.',
                'After a branch returns, TypeScript can exclude that branch from the remaining code.',
            ],
            examples: [
                {
                    title: 'String and number formatting',
                    description: [
                        'The example selects the operation appropriate to the received union member.',
                    ],
                    language: 'typescript',
                    code: [
                        'function format(value: string | number): string {',
                        '    if (typeof value === "string") {',
                        '        return value.toUpperCase();',
                        '    }',
                        '    return value.toFixed(2);',
                        '}',
                        'console.log(format("ready"));',
                        'console.log(format(3));',
                    ].join('\n'),
                    result: 'READY\n3.00',
                    explanation: [
                        'The matching branch knows `value` is a `string`.',
                        'Only a `number` reaches the final return.',
                    ],
                },
            ],
        },
        {
            id: 'nullable-values',
            title: 'Missing values',
            bullets: [
                'A `null` or `undefined` check allows operations on the remaining union members.',
                'A truthiness check also excludes valid falsy values such as an empty `string` or zero.',
                'Explicit missing-value checks preserve these values.',
            ],
            examples: [
                {
                    title: 'Empty and missing strings',
                    description: [
                        'The example handles missing nicknames without treating an empty `nickname` as missing.',
                    ],
                    language: 'typescript',
                    code: [
                        'function message(value: string | null | undefined): string {',
                        '    if (value === null || value === undefined) return "Missing";',
                        '    return value.toUpperCase();',
                        '}',
                        'console.log(message(null), message("ready"));',
                        'console.log(message("") === "");',
                    ].join('\n'),
                    result: 'Missing READY\ntrue',
                    explanation: [
                        'The early return excludes both missing values.',
                        'The empty `string` reaches the `string` operation and stays empty.',
                    ],
                },
            ],
        },
        {
            id: 'array-equality-and-in-checks',
            title: 'Array and property checks',
            bullets: [
                '`Array.isArray` distinguishes an array from other members of a union.',
                'The `in` operator checks for a property.',
                'Members with that required property remain in the matching branch.',
                'A member with an optional property can remain possible in both branches of an `in` check.',
                '`instanceof` narrows values to instances of a constructor, such as `Error`.',
            ],
            examples: [
                {
                    title: 'Contact properties',
                    description: [
                        'The example reads the field required by the matching object union member.',
                    ],
                    language: 'typescript',
                    code: [
                        'type Contact = { email: string } | { phone: string };',
                        'function address(contact: Contact): string {',
                        '    if ("email" in contact) return contact.email;',
                        '    return contact.phone;',
                        '}',
                        'console.log(address({ email: "mia@example.com" }));',
                        'console.log(address({ phone: "123" }));',
                    ].join('\n'),
                    result: 'mia@example.com\n123',
                    explanation: [
                        '`email` is required in only the first declared union member.',
                        'The remaining branch has the required `phone` property.',
                    ],
                },
                {
                    title: 'Arrays and individual strings',
                    description: [
                        'The example joins a list while returning an individual `string` unchanged.',
                    ],
                    language: 'typescript',
                    code: [
                        'function label(value: string | string[]): string {',
                        '    if (Array.isArray(value)) return value.join(", ");',
                        '    return value;',
                        '}',
                        'console.log(label(["Mia", "Noah"]));',
                    ].join('\n'),
                    result: 'Mia, Noah',
                    explanation: [
                        'The array check narrows `value` to `string[]` before `join`.',
                        'The other branch receives a `string`.',
                    ],
                },
            ],
        },
        {
            id: 'discriminated-unions',
            title: 'Discriminated unions',
            bullets: [
                'A discriminated union shares a property whose literal value distinguishes its members.',
                'Checking that property narrows the whole object and selects the fields available in that state.',
            ],
            examples: [
                {
                    title: 'Success and error states',
                    description: [
                        'The example represents success and failure without making every field optional.',
                    ],
                    language: 'typescript',
                    code: [
                        'type Result =',
                        '    | { status: "success"; data: string }',
                        '    | { status: "error"; message: string };',
                        'function display(result: Result): string {',
                        '    if (result.status === "success") return result.data;',
                        '    return result.message;',
                        '}',
                        'console.log(display({ status: "success", data: "Saved" }));',
                        'console.log(display({ status: "error", message: "Failed" }));',
                    ].join('\n'),
                    result: 'Saved\nFailed',
                    explanation: [
                        'The success member requires `data`.',
                        'The error member requires `message`.',
                        'The `status` check selects the matching requirement.',
                    ],
                },
            ],
        },
        {
            id: 'exhaustive-union-checks',
            title: 'Exhaustive union checks',
            bullets: [
                '`never` describes a value that cannot occur.',
                'After handling every union member, the remaining value can be assigned to `never`.',
                'Adding an unhandled member makes that assignment fail during checking.',
            ],
            examples: [
                {
                    title: 'Direction cases',
                    description: [
                        'An added direction produces a type error until it has a matching case.',
                    ],
                    language: 'typescript',
                    code: [
                        'type Direction = "north" | "south";',
                        'function move(direction: Direction): number {',
                        '    switch (direction) {',
                        '        case "north": return 1;',
                        '        case "south": return -1;',
                        '        default: {',
                        '            const unhandled: never = direction;',
                        '            return unhandled;',
                        '        }',
                        '    }',
                        '}',
                        'console.log(move("north"), move("south"));',
                    ].join('\n'),
                    result: '1 -1',
                    explanation: [
                        'Both current members return before `default`.',
                        'Adding `"east"` to `Direction` without a case makes the `never` assignment fail.',
                    ],
                },
            ],
        },
    ],
};

export default note;
