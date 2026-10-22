import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'interface',
    title: 'Interfaces',
    summary: 'Interfaces name object types and support extension and declaration merging.',
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
            title: 'TypeScript Handbook: Declaration merging',
            href: 'https://www.typescriptlang.org/docs/handbook/declaration-merging.html',
        },
    ],
    sections: [
        {
            id: 'object-contract',
            title: 'Object contracts',
            bullets: [
                'An interface names an object type.',
                'Its body uses the property rules from Object types.',
                'Variable and parameter annotations can use the interface name.',
                'An interface can describe methods as well as data properties.',
            ],
            examples: [
                {
                    title: 'Properties and methods',
                    description: [
                        'The example requires a greeter object with a `name` and a method returning a `string`.',
                    ],
                    language: 'typescript',
                    code: [
                        'interface Greeter {',
                        '    name: string;',
                        '    greet(): string;',
                        '}',
                        'const greeter: Greeter = {',
                        '    name: "Mia",',
                        '    greet() { return `Hello, ${this.name}`; },',
                        '};',
                        'console.log(greeter.greet());',
                    ].join('\n'),
                    result: 'Hello, Mia',
                    explanation: [
                        'The interface checks the `name` property and `greet` method.',
                        'The object supplies the method implementation.',
                    ],
                },
            ],
        },
        {
            id: 'extending-contracts',
            title: 'Interface extension',
            bullets: [
                'An interface can extend an existing object type and add more members.',
                'The new interface requires the inherited members as well as its own members.',
                'An incompatible inherited property produces an error at the interface declaration.',
            ],
            examples: [
                {
                    title: 'User and contact interfaces',
                    description: [
                        'The example adds `email` to an existing user requirement.',
                    ],
                    language: 'typescript',
                    code: [
                        'interface User { id: number; name: string; }',
                        'interface Contact extends User { email: string; }',
                        'const contact: Contact = {',
                        '    id: 7, name: "Mia", email: "mia@example.com",',
                        '};',
                        'console.log(contact.name, contact.email);',
                    ].join('\n'),
                    result: 'Mia mia@example.com',
                    explanation: [
                        '`Contact` requires `id` and `name` from `User`.',
                        'It also requires its own `email` property.',
                    ],
                },
            ],
        },
        {
            id: 'call-signatures',
            title: 'Call signatures',
            bullets: [
                'A call signature describes calling the value itself.',
                'A method signature describes calling a property of that value.',
                'A callable interface can also require properties on the function object.',
            ],
            examples: [
                {
                    title: 'Formatter interface',
                    description: [
                        'The example requires a formatter function with a `string` input and result.',
                    ],
                    language: 'typescript',
                    code: [
                        'interface Formatter { (value: string): string; }',
                        'const format: Formatter = (value) => value.toUpperCase();',
                        'console.log(format("Mia"));',
                    ].join('\n'),
                    result: 'MIA',
                    explanation: [
                        'The call signature checks `format` itself.',
                        'No named method property is required by this interface.',
                    ],
                },
            ],
        },
        {
            id: 'declaration-merging',
            title: 'Declaration merging',
            bullets: [
                'Interfaces with the same name in the same declaration scope can contribute members to one interface.',
                'This is called declaration merging.',
                'Non-function members declared more than once must have compatible declarations.',
                'Merging is useful when extending an existing declaration.',
                'It also means a repeated name can change requirements elsewhere in that scope.',
            ],
            examples: [
                {
                    title: 'Merged user interface',
                    description: [
                        'The example shows that both declarations contribute required properties.',
                    ],
                    language: 'typescript',
                    code: [
                        'export {};',
                        'interface User { name: string; }',
                        'interface User { email: string; }',
                        'const user: User = { name: "Mia", email: "mia@example.com" };',
                        'console.log(user.name, user.email);',
                        '// const incomplete: User = { name: "Mia" }; // Type error: email is missing.',
                    ].join('\n'),
                    result: 'Mia mia@example.com',
                    explanation: [
                        'Both declarations refer to one merged interface.',
                        '`export {}` makes this file a module and keeps the declarations out of the global script scope.',
                    ],
                },
            ],
        },
    ],
};

export default note;
