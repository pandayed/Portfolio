import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'type-and-interfaces',
    title: 'Type aliases and interfaces',
    summary: 'Type aliases and interfaces differ in the types they can name and how they combine declarations.',
    scope: 'typescript',
    updatedOn: '2026-10-14',
    exampleLayout: 'grouped',
    inlineCode: true,
    references: [
        {
            title: 'TypeScript Handbook: Everyday types',
            href: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html',
        },
        {
            title: 'TypeScript Handbook: Object types',
            href: 'https://www.typescriptlang.org/docs/handbook/2/objects.html',
        },
    ],
    sections: [
        {
            id: 'choosing-a-declaration',
            title: 'Declaration choices',
            bullets: [
                'Both declarations can name ordinary object shapes.',
                'Required, optional and `readonly` properties work in both.',
                'A type alias can name a primitive, union, tuple, function expression, or other type expression.',
                'Interfaces support extension and declaration merging.',
                'Project conventions can guide the choice for ordinary object shapes.',
            ],
            examples: [],
            table: {
                columns: [
                    'Requirement',
                    '`type`',
                    '`interface`',
                ],
                rows: [
                    [
                        'Ordinary object shape',
                        'Supported',
                        'Supported',
                    ],
                    [
                        'Union or primitive',
                        'Supported',
                        'Cannot directly alias it',
                    ],
                    [
                        'Combined object requirements',
                        'Intersection',
                        '`extends`',
                    ],
                    [
                        'Repeated declarations',
                        'Duplicate alias is an error',
                        'Compatible declarations can merge',
                    ],
                ],
            },
        },
        {
            id: 'extension-conflicts',
            title: 'Extension conflicts',
            bullets: [
                'An interface reports an incompatible inherited member at the extending declaration.',
                'An intersection combines the property types.',
                'Intersecting `string` and `number` produces `never` for that property.',
                'This distinction matters when combining types that might define the same property differently.',
            ],
            examples: [
                {
                    title: 'Conflicting property types',
                    description: [
                        'The example shows why combining two declarations can make a property impossible to supply.',
                    ],
                    language: 'typescript',
                    code: [
                        'type TextValue = { value: string };',
                        'type NumberValue = { value: number };',
                        'type Impossible = TextValue & NumberValue;',
                        '// const wrong: Impossible = { value: "text" }; // value must satisfy never.',
                        '',
                        'interface Base { value: string; }',
                        '// interface Invalid extends Base { value: number; } // Extension error.',
                    ].join('\n'),
                    explanation: [
                        'The intersection exists as a type expression.',
                        'Its `value` property cannot be a `string` or a `number`.',
                        'The incompatible interface extension is rejected at its declaration.',
                        'The commented lines are separate rejected cases.',
                    ],
                },
            ],
        },
    ],
};

export default note;
