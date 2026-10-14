import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'type-and-interfaces',
    title: 'Choosing type or interface',
    summary: 'Choose between already learned declarations based on the shape and extension behavior you need.',
    scope: 'typescript',
    updatedOn: '2026-10-14',
    exampleLayout: 'grouped',
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
            title: 'Choose for the requirement',
            bullets: [
                'Both declarations can name ordinary object shapes. Required, optional and readonly properties work in both.',
                'Use a type alias when naming a primitive, union, tuple, function expression, or other type expression.',
                'Use an interface when its extension or declaration-merging behavior is useful. Follow the project convention for ordinary object shapes.',
            ],
            examples: [],
            table: {
                columns: [
                    'Requirement',
                    'type',
                    'interface',
                ],
                rows: [
                    [
                        'Name an ordinary object shape',
                        'Supported',
                        'Supported',
                    ],
                    [
                        'Name a union or primitive',
                        'Supported',
                        'Cannot directly alias it',
                    ],
                    [
                        'Combine object requirements',
                        'Use an intersection',
                        'Use extends',
                    ],
                    [
                        'Reopen a name with another declaration',
                        'Duplicate alias is an error',
                        'Compatible declarations can merge',
                    ],
                ],
            },
        },
        {
            id: 'extension-conflicts',
            title: 'Extension conflicts fail at different places',
            bullets: [
                'An interface reports an incompatible inherited member at the extending declaration.',
                'An intersection combines the property types. Intersecting string and number produces never for that property.',
                'This distinction matters when combining types that might define the same property differently.',
            ],
            examples: [
                {
                    title: 'Compare conflicting object requirements',
                    description: [
                        'See why combining two declarations can make a property impossible to supply.',
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
                        'The intersection exists as a type expression, but its value property cannot be a string or a number.',
                        'The incompatible interface extension is rejected at its declaration.',
                        'The commented lines are separate rejected cases.',
                    ],
                },
            ],
        },
    ],
};

export default note;
