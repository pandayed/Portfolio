import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'arrays-and-objects',
    title: 'Arrays and objects',
    summary: 'Store collections, transform arrays, copy values, and describe shapes with TypeScript.',
    scope: 'javascript-typescript',
    updatedOn: '2026-10-03',
    sections: [
        {
            id: 'arrays',
            title: 'Arrays store ordered values',
            paragraphs: [
                'An array is an object whose values are usually accessed by zero-based indexes. length reports the array length. push changes the array by adding a value at the end.',
            ],
            examples: [{
                language: 'javascript',
                code: [
                    'const colors = ["red", "blue"];',
                    'colors.push("green");',
                    '',
                    'console.log(colors[0]);',
                    'console.log(colors.length);',
                    'console.log(colors);',
                ].join('\n'),
                result: 'The lines print red, 3, and ["red", "blue", "green"].',
            }],
            pitfalls: [
                'An empty slot is not the same as an element whose value is undefined. Some array methods skip empty slots.',
                'Array indexes normally run from 0 through length - 1. Reading a missing index returns undefined.',
            ],
        },
        {
            id: 'array-transformations',
            title: 'Use array methods for transformations',
            paragraphs: [
                'map returns a new array with one result for each input value. filter returns a new array containing the values that pass its test. reduce combines values into one result.',
                'These methods do not replace the source array. The callback can still mutate values or objects, so keep callbacks free of unrelated changes.',
            ],
            examples: [{
                language: 'javascript',
                code: [
                    'const numbers = [1, 2, 3, 4];',
                    'const evenSquares = numbers',
                    '    .filter((number) => number % 2 === 0)',
                    '    .map((number) => number ** 2);',
                    '',
                    'const total = numbers.reduce((sum, number) => sum + number, 0);',
                    'console.log(evenSquares);',
                    'console.log(total);',
                ].join('\n'),
                result: 'The lines print [4, 16] and 10.',
            }],
        },
        {
            id: 'objects',
            title: 'Objects group named properties',
            paragraphs: [
                'An object groups values under property keys. Dot notation uses a fixed identifier. Bracket notation can use a computed string or symbol key.',
                'Destructuring reads selected properties into variables. A rest property collects the remaining own enumerable properties into a new object.',
            ],
            examples: [{
                language: 'javascript',
                code: [
                    'const user = { name: "Mia", role: "editor", active: true };',
                    'const key = "role";',
                    'const { name, ...details } = user;',
                    '',
                    'console.log(name);',
                    'console.log(user[key]);',
                    'console.log(details);',
                ].join('\n'),
                result: 'The lines print Mia, editor, and { role: "editor", active: true }.',
            }],
        },
        {
            id: 'references-and-spread',
            title: 'Object and array variables hold references',
            paragraphs: [
                'Assigning an object or array to another variable does not copy it. Both variables refer to the same value. Object spread and array spread create shallow copies.',
                'A shallow copy creates a new outer object or array. Nested objects are still shared.',
            ],
            examples: [{
                language: 'javascript',
                code: [
                    'const original = { name: "Mia", settings: { theme: "dark" } };',
                    'const copy = { ...original };',
                    '',
                    'copy.name = "Noah";',
                    'copy.settings.theme = "light";',
                    '',
                    'console.log(original.name);',
                    'console.log(original.settings.theme);',
                ].join('\n'),
                result: 'The lines print Mia and light. The outer object was copied, but both objects still refer to the same settings object.',
            }],
        },
        {
            id: 'map-and-set',
            title: 'Map and Set handle keyed and unique collections',
            paragraphs: [
                'Map stores key-value pairs and can use values of any type as keys. Set stores unique values. Both preserve insertion order during iteration.',
                'Use a plain object when the data has a known record-like shape. Use Map when keys are dynamic or are not strings or symbols.',
            ],
            examples: [{
                language: 'javascript',
                code: [
                    'const scores = new Map([',
                    '    ["Mia", 9],',
                    '    ["Noah", 8],',
                    ']);',
                    'const tags = new Set(["js", "ts", "js"]);',
                    '',
                    'console.log(scores.get("Mia"));',
                    'console.log([...tags]);',
                ].join('\n'),
                result: 'The lines print 9 and ["js", "ts"]. Set removes the duplicate js value.',
            }],
        },
        {
            id: 'typescript-collection-types',
            title: 'TypeScript describes collection shapes',
            paragraphs: [
                'Use T[] or Array<T> for an array whose elements have type T. An object type lists the required property names and their value types. A question mark marks an optional property.',
                'An interface and a type alias can both name an object shape. readonly prevents assignment through that TypeScript type; it does not freeze the runtime object.',
            ],
            examples: [{
                language: 'typescript',
                code: [
                    'interface User {',
                    '    readonly id: number;',
                    '    name: string;',
                    '    nickname?: string;',
                    '}',
                    '',
                    'const users: User[] = [',
                    '    { id: 1, name: "Mia" },',
                    '    { id: 2, name: "Noah", nickname: "N" },',
                    '];',
                    '',
                    'console.log(users.map((user) => user.name));',
                ].join('\n'),
                result: 'The emitted JavaScript prints ["Mia", "Noah"].',
                typeCheck: 'users[0].id = 3 and an object without name are type errors. readonly does not add Object.freeze at runtime.',
            }],
        },
    ],
};

export default note;
