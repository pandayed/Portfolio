import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'object-types-and-interfaces',
    title: 'Object types and interfaces',
    summary: 'Describe object shapes with required, optional, readonly, and indexed properties.',
    scope: 'typescript',
    updatedOn: '2026-10-03',
    sections: [
        {
            id: 'object-shapes',
            title: 'Describe an object shape',
            paragraphs: [
                'An object type says which properties a value must have and what type each property holds. TypeScript checks the shape. It does not add those properties at runtime.',
            ],
            examples: [{
                code: [
                    'type User = {',
                    '    id: number;',
                    '    name: string;',
                    '};',
                    '',
                    'function label(user: User): string {',
                    '    return `${user.id}: ${user.name}`;',
                    '}',
                    '',
                    'console.log(label({ id: 7, name: "Ava" }));',
                ].join('\n'),
                language: 'typescript',
                result: '7: Ava',
                typeCheck: 'Passing { id: 7 } is rejected because name is required.',
            }],
        },
        {
            id: 'optional-readonly',
            title: 'Optional and readonly properties',
            paragraphs: [
                'Add ? when a property may be missing. Code must handle undefined before using an optional property as a definite value.',
                'readonly prevents assignment during type checking. It does not freeze the object in JavaScript, and a readonly property can still refer to a mutable object.',
            ],
            examples: [{
                code: [
                    'interface Profile {',
                    '    readonly id: number;',
                    '    nickname?: string;',
                    '}',
                    '',
                    'const profile: Profile = { id: 1 };',
                    'console.log(profile.nickname ?? "Anonymous");',
                ].join('\n'),
                language: 'typescript',
                result: 'Anonymous',
                typeCheck: 'profile.id = 2 is rejected because id is readonly. That restriction is not a runtime freeze.',
            }],
        },
        {
            id: 'structural-typing',
            title: 'Structural typing',
            paragraphs: [
                'TypeScript compares the members a value has, not the name of its declared type. A value with all required properties can match an object type even when it has extra properties.',
                'Fresh object literals receive an extra property check. This catches likely misspellings where the object is written at the call site.',
            ],
            examples: [{
                code: [
                    'interface Named {',
                    '    name: string;',
                    '}',
                    '',
                    'function greet(value: Named): string {',
                    '    return `Hello, ${value.name}`;',
                    '}',
                    '',
                    'const developer = { name: "Mina", language: "TypeScript" };',
                    'console.log(greet(developer));',
                ].join('\n'),
                language: 'typescript',
                result: 'Hello, Mina',
                typeCheck: 'greet({ name: "Mina", langauge: "TypeScript" }) is rejected because the fresh object literal has an unknown property.',
            }],
        },
        {
            id: 'interface-or-type',
            title: 'Interfaces and type aliases',
            paragraphs: [
                'Both interface and type can name an object shape. An interface can extend another interface and can be reopened by another declaration with the same name. A type alias can name unions, primitives, tuples, and other types as well as objects.',
                'Choose the form that matches the model. Use a type alias when the type is not only an object shape.',
            ],
            examples: [{
                code: [
                    'interface Person {',
                    '    name: string;',
                    '}',
                    '',
                    'interface Employee extends Person {',
                    '    department: string;',
                    '}',
                    '',
                    'type EmployeeId = string | number;',
                    '',
                    'const employee: Employee = {',
                    '    name: "Noah",',
                    '    department: "Support",',
                    '};',
                    '',
                    'const id: EmployeeId = "EMP-4";',
                    'console.log(id, employee.name);',
                ].join('\n'),
                language: 'typescript',
                result: 'EMP-4 Noah',
                typeCheck: 'Employee must include both name from Person and its own department property.',
            }],
        },
        {
            id: 'index-signatures',
            title: 'Index signatures',
            paragraphs: [
                'Use an index signature when property names are not known ahead of time but their value type is known. Every named property covered by a string index signature must also fit its value type.',
            ],
            examples: [{
                code: [
                    'interface Scores {',
                    '    [player: string]: number;',
                    '}',
                    '',
                    'const scores: Scores = { Ava: 9, Noah: 7 };',
                    'console.log(scores.Ava);',
                ].join('\n'),
                language: 'typescript',
                result: '9',
                typeCheck: 'Adding team: "Blue" is rejected because every string-keyed value must be a number.',
            }],
            pitfalls: [
                'An index signature describes possible values for a key. It does not prove that a particular key exists at runtime unless stricter indexed-access checking and the code account for that case.',
                'Interfaces, type aliases, optional markers, and readonly markers disappear from emitted JavaScript. Validate external data at runtime before trusting its shape.',
            ],
        },
    ],
};

export default note;
