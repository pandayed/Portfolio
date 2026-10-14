import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'typescript-functions-and-collections',
    title: 'Typed functions, arrays and tuples',
    summary: 'Apply annotations to function inputs and results, callbacks, lists, and fixed positions.',
    scope: 'typescript',
    updatedOn: '2026-10-14',
    exampleLayout: 'grouped',
    references: [
        {
            title: 'TypeScript Handbook: Everyday types',
            href: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html',
        },
        {
            title: 'TypeScript Handbook: More on functions',
            href: 'https://www.typescriptlang.org/docs/handbook/2/functions.html',
        },
        {
            title: 'TypeScript Handbook: Object types',
            href: 'https://www.typescriptlang.org/docs/handbook/2/objects.html',
        },
    ],
    sections: [
        {
            id: 'function-inputs-and-results',
            title: 'Type function parameters and results',
            bullets: [
                'A parameter annotation checks the arguments passed to a function.',
                'A return annotation follows the parameter list. It checks values returned by the function.',
                'TypeScript can infer a result type from return statements. A default parameter can also supply its parameter type.',
                'void means the caller should not use a returned value.',
            ],
            examples: [
                {
                    title: 'Check both sides of a function call',
                    description: [
                        'Accept a numeric price and return a formatted string.',
                    ],
                    language: 'typescript',
                    code: [
                        'function priceLabel(price: number): string {',
                        '    return price.toFixed(2);',
                        '}',
                        'function report(message: string): void {',
                        '    console.log(message);',
                        '}',
                        'report(priceLabel(12));',
                        '// priceLabel("12"); // Type error: the argument must be a number.',
                    ].join('\n'),
                    result: '12.00',
                    explanation: [
                        'priceLabel requires a number argument and a string result.',
                        'report prints the message and has no return statement.',
                    ],
                },
            ],
        },
        {
            id: 'optional-and-default-parameters',
            title: 'Allow a trailing argument to be omitted',
            bullets: [
                'A ? after a parameter name permits the caller to omit that argument. The parameter can be undefined inside the function.',
                'A trailing default parameter can also be omitted. JavaScript uses its default for omission or an explicit undefined argument.',
                'An optional parameter must follow required parameters. Do not mark a parameter optional merely because one callback does not use it.',
            ],
            examples: [
                {
                    title: 'Compare omission with a default value',
                    description: [
                        'Allow an optional label and supply a numeric default when its argument is missing.',
                    ],
                    language: 'typescript',
                    code: [
                        'function label(name?: string): string {',
                        '    return name ?? "Guest";',
                        '}',
                        'function double(value = 2): number {',
                        '    return value * 2;',
                        '}',
                        'console.log(label(), label("Mia"));',
                        'console.log(double(), double(undefined), double(3));',
                    ].join('\n'),
                    result: 'Guest Mia\n4 4 6',
                    explanation: [
                        'The optional label is allowed to be absent.',
                        'The numeric default supplies both the runtime fallback and the inferred number type.',
                    ],
                },
            ],
        },
        {
            id: 'function-types',
            title: 'Describe a function value',
            bullets: [
                'A function type uses (parameters) => ResultType. It describes a callable value without creating a function body.',
                'The expected function type can supply parameter types to an assigned callback. This is contextual typing.',
                'A function returning a value can be assigned to a callback type returning void. That callback type tells its caller to ignore the result.',
            ],
            examples: [
                {
                    title: 'Use one callback requirement',
                    description: [
                        'Store a formatter whose input and result must both be strings.',
                    ],
                    language: 'typescript',
                    code: [
                        'const format: (name: string) => string = (name) => name.toUpperCase();',
                        'console.log(format("Mia"));',
                        '// const wrong: (name: string) => string = (name) => name.length;',
                    ].join('\n'),
                    result: 'MIA',
                    explanation: [
                        'The expected function type gives name the type string.',
                        'The commented callback is rejected because it returns a number.',
                    ],
                },
            ],
        },
        {
            id: 'arrays',
            title: 'Describe the element type of an array',
            bullets: [
                'number[] describes a list of numbers. string[] describes a list of strings.',
                'Array methods use the element type to infer callback parameter types.',
                'readonly string[] prevents writes through that array type. It does not freeze the JavaScript array.',
            ],
            examples: [
                {
                    title: 'Infer the callback parameter from the list',
                    description: [
                        'Double numeric scores without annotating each callback parameter.',
                    ],
                    language: 'typescript',
                    code: [
                        'const scores: number[] = [10, 20];',
                        'const doubled = scores.map((score) => score * 2);',
                        'console.log(doubled.join(", "));',
                        '// scores.push("thirty"); // Type error: an element must be a number.',
                    ].join('\n'),
                    result: '20, 40',
                    explanation: [
                        'score is inferred as number from scores.',
                        'doubled is inferred as number[].',
                    ],
                },
            ],
        },
        {
            id: 'tuples',
            title: 'Describe positions with a tuple',
            bullets: [
                'A tuple describes the type at each position. [string, number] requires a string followed by a number.',
                'Use an array for a list of similar items. Use a tuple when positions have separate meanings.',
                'A tuple can be readonly to prevent changes through that type. Its declaration does not add runtime length checks.',
            ],
            examples: [
                {
                    title: 'Keep a label beside its score',
                    description: [
                        'Require exactly the declared two positions when assigning a tuple.',
                    ],
                    language: 'typescript',
                    code: [
                        'const entry: readonly [string, number] = ["Mia", 20];',
                        'const [userName, score] = entry;',
                        'console.log(userName, score);',
                        '// const wrong: [string, number] = [20, "Mia"];',
                        '// entry[1] = 30; // Type error: this tuple is readonly.',
                    ].join('\n'),
                    result: 'Mia 20',
                    explanation: [
                        'The first position supplies a string and the second supplies a number.',
                        'The reversed assignment is rejected during checking.',
                    ],
                },
            ],
        },
    ],
};

export default note;
