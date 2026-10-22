import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'typescript-classes',
    title: 'Typed classes',
    summary: 'Typed classes add checked fields, initialization requirements and access modifiers to JavaScript classes.',
    scope: 'typescript',
    updatedOn: '2026-10-14',
    exampleLayout: 'grouped',
    inlineCode: true,
    references: [
        {
            title: 'TypeScript Handbook: Classes',
            href: 'https://www.typescriptlang.org/docs/handbook/2/classes.html',
        },
    ],
    sections: [
        {
            id: 'fields-and-initialization',
            title: 'Instance fields',
            bullets: [
                'Class fields can use annotations.',
                'TypeScript can also infer their types from initializers.',
                '`strictPropertyInitialization` checks that required fields have initial values.',
                'A field declaration or a direct constructor assignment can supply those values.',
                'A class name can describe its instance type in an annotation.',
                'The class also supplies a constructor value at runtime.',
            ],
            examples: [
                {
                    title: 'Typed user field',
                    description: [
                        'The example requires a name when creating a user and retains its `string` type.',
                    ],
                    language: 'typescript',
                    code: [
                        'class User {',
                        '    name: string;',
                        '    constructor(name: string) { this.name = name; }',
                        '}',
                        'const user: User = new User("Mia");',
                        'console.log(user.name.toUpperCase());',
                        '// new User(7); // Type error: the constructor argument must be a string.',
                    ].join('\n'),
                    result: 'MIA',
                    explanation: [
                        'The constructor assigns the required `name` field.',
                        '`User` in the annotation describes the instance.',
                        '`User` after `new` is the runtime constructor.',
                    ],
                },
            ],
        },
        {
            id: 'parameter-properties-and-readonly',
            title: 'Parameter properties',
            bullets: [
                'A constructor parameter marked `public`, `private`, `protected` or `readonly` is a parameter property.',
                'TypeScript creates and initializes the corresponding instance property.',
                'A `readonly` class field can be initialized in its declaration or its constructor.',
                'Later assignment through that checked class type is rejected.',
                '`readonly` does not freeze the emitted JavaScript property.',
            ],
            examples: [
                {
                    title: 'Readonly owner property',
                    description: [
                        'The example stores the constructor argument without writing a separate field declaration and assignment.',
                    ],
                    language: 'typescript',
                    code: [
                        'class Account {',
                        '    constructor(public readonly owner: string) {}',
                        '}',
                        'const account = new Account("Mia");',
                        'console.log(account.owner);',
                        '// account.owner = "Noah"; // Type error: owner is readonly.',
                    ].join('\n'),
                    result: 'Mia',
                    explanation: [
                        'The parameter property creates `account.owner` and assigns the supplied name.',
                        'The `readonly` modifier blocks later assignment during TypeScript checking.',
                    ],
                },
            ],
        },
        {
            id: 'access-modifiers',
            title: 'Access modifiers',
            bullets: [
                '`public` members can be accessed by outside code.',
                '`public` is the default.',
                '`private` members are checked for access within their declaring class.',
                '`protected` also permits access in subclasses.',
                'TypeScript `private` emits an ordinary JavaScript property.',
                'JavaScript `#private` fields enforce privacy at runtime.',
                'TypeScript permits a known `private` property through bracket notation.',
                'This bypasses the dot-access restriction.',
                'The modifier does not enforce privacy at runtime.',
            ],
            examples: [
                {
                    title: 'Private access and runtime properties',
                    description: [
                        'The example shows which access the checker restricts and which remains available.',
                    ],
                    language: 'typescript',
                    code: [
                        'class Account {',
                        '    private balance = 10;',
                        '    getBalance(): number { return this.balance; }',
                        '}',
                        'const account = new Account();',
                        'console.log(account.getBalance());',
                        'console.log(account["balance"]);',
                        '// console.log(account.balance); // Type error: balance is private.',
                    ].join('\n'),
                    result: '10\n10',
                    explanation: [
                        'The method can read the `private` member inside its class.',
                        'Bracket access is accepted by TypeScript and reads the ordinary runtime property.',
                        'It differs from a JavaScript # field.',
                    ],
                },
            ],
        },
        {
            id: 'implements',
            title: 'Interface implementation',
            bullets: [
                '`implements` checks that the instance meets an interface requirement.',
                'It does not add methods, initialize fields, or infer types for unannotated method parameters.',
            ],
            examples: [
                {
                    title: 'Formatter implementation',
                    description: [
                        'The example requires a class instance to provide a formatter method.',
                    ],
                    language: 'typescript',
                    code: [
                        'interface Formatter { format(value: string): string; }',
                        'class UppercaseFormatter implements Formatter {',
                        '    format(value: string): string { return value.toUpperCase(); }',
                        '}',
                        'console.log(new UppercaseFormatter().format("Mia"));',
                    ].join('\n'),
                    result: 'MIA',
                    explanation: [
                        'The class supplies the method body.',
                        'The parameter annotation remains necessary even though the class uses `implements`.',
                    ],
                },
            ],
        },
    ],
};

export default note;
