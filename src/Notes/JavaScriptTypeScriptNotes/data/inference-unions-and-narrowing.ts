import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'inference-unions-and-narrowing',
    title: 'Type annotations and inference',
    summary: 'Annotations state type requirements. Inference determines types from existing code.',
    scope: 'typescript',
    updatedOn: '2026-10-14',
    exampleLayout: 'grouped',
    inlineCode: true,
    references: [
        {
            title: 'TypeScript Handbook: The basics',
            href: 'https://www.typescriptlang.org/docs/handbook/2/basic-types.html',
        },
        {
            title: 'TypeScript Handbook: Everyday types',
            href: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html',
        },
    ],
    sections: [
        {
            id: 'annotations',
            title: 'Type annotations',
            bullets: [
                'TypeScript checks whether operations match the types described in the code.',
                'A type annotation follows a variable name after a colon.',
                '`string` describes text, `number` describes numbers, and `boolean` describes `true` or `false`.',
                'The primitive types use lowercase names.',
                '`String`, `Number`, and `Boolean` describe different types.',
                'An annotation restricts assignments.',
                'It does not convert a value.',
            ],
            examples: [
                {
                    title: 'Numeric assignments',
                    description: [
                        'The example keeps a score numeric while allowing its value to change.',
                    ],
                    language: 'typescript',
                    code: [
                        'let score: number = 10;',
                        'score = 20;',
                        '// score = "twenty"; // Type error: string is not assignable to number.',
                        'console.log(score);',
                    ].join('\n'),
                    result: '20',
                    explanation: [
                        'The annotation allows both numeric assignments.',
                        'Uncommenting the `string` assignment produces a type error.',
                    ],
                },
            ],
        },
        {
            id: 'inference',
            title: 'Type inference',
            bullets: [
                'Inference means TypeScript determines a type without a written annotation.',
                'An initialized `let` variable usually gets a primitive type such as `string`, rather than one exact value.',
                'A `const` primitive can keep its exact literal type.',
                'A literal type allows one exact value.',
                'Annotations state requirements.',
                'Inference uses type information already present in the code.',
            ],
            examples: [
                {
                    title: 'Variable and constant types',
                    description: [
                        'The example shows which checked types TypeScript infers from primitive `string` values.',
                    ],
                    language: 'typescript',
                    code: [
                        'let role = "reader";        // inferred type: string',
                        'const fixedRole = "reader"; // inferred type: "reader"',
                        'role = "writer";',
                        'console.log(role, fixedRole);',
                    ].join('\n'),
                    result: 'writer reader',
                    explanation: [
                        'The `let` variable can hold another `string`.',
                        'The `const` variable has the exact type `"reader"`.',
                    ],
                },
            ],
        },
        {
            id: 'checking-and-emission',
            title: 'Type checking and JavaScript output',
            bullets: [
                'The TypeScript compiler checks `.ts` files and can produce `.js` files.',
                'Producing output files is called emission.',
                'Annotations disappear from the emitted JavaScript.',
                'Ordinary JavaScript statements keep their behavior.',
                'The examples in these TypeScript lessons assume `strict` checking.',
                'Compiler configuration is covered after the type lessons.',
            ],
            examples: [
                {
                    title: 'Emitted JavaScript',
                    description: [
                        'The example compares TypeScript source with the JavaScript the compiler emits.',
                    ],
                    language: 'typescript',
                    code: [
                        'const score: number = 20;',
                        'console.log(score);',
                    ].join('\n'),
                    result: 'Emitted score.js:\nconst score = 20;\nconsole.log(score);\n\nRunning score.js prints 20.',
                    explanation: [
                        'The source file is `score.ts`.',
                        'The compiler writes the emitted code to a separate `score.js` file.',
                        'The compiler removes `: number`.',
                        'The console call still runs in JavaScript.',
                    ],
                },
            ],
        },
    ],
};

export default note;
