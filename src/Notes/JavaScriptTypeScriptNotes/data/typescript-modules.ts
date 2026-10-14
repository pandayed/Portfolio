import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'typescript-modules',
    title: 'Type-only imports and module resolution',
    summary: 'Distinguish imports used by the checker from imports that must resolve in emitted JavaScript.',
    scope: 'typescript',
    updatedOn: '2026-10-14',
    exampleLayout: 'grouped',
    references: [
        {
            title: 'TypeScript Handbook: Modules',
            href: 'https://www.typescriptlang.org/docs/handbook/2/modules.html',
        },
        {
            title: 'TypeScript Modules reference',
            href: 'https://www.typescriptlang.org/docs/handbook/modules/reference.html',
        },
    ],
    sections: [
        {
            id: 'type-only-imports',
            title: 'Import a name only for checking',
            bullets: [
                'import type imports names used as types. export type exports names for checking.',
                'Type-only imports are removed from emitted JavaScript. A value import needed by JavaScript must remain available when the program runs.',
                'A class can be imported as a type when only its instance type is needed. Constructing an instance needs its value import.',
            ],
            examples: [
                {
                    title: 'Import a contract and an executable function',
                    description: [
                        'Use a type for an annotation while retaining the function needed at runtime.',
                    ],
                    language: 'typescript',
                    code: [
                        '// File: user.ts',
                        'export interface User { name: string; }',
                        'export function getName(user: User): string { return user.name; }',
                        '',
                        '// File: main.ts',
                        'import type { User } from "./user.js";',
                        'import { getName } from "./user.js";',
                        'const user: User = { name: "Mia" };',
                        'console.log(getName(user));',
                    ].join('\n'),
                    result: 'Mia when the emitted ES modules run with their dependencies available.',
                    explanation: [
                        'Keep the user.ts and main.ts parts in separate files.',
                        'The User import disappears. The getName import remains because the emitted JavaScript calls it.',
                    ],
                },
            ],
        },
        {
            id: 'checker-and-runtime-resolution',
            title: 'Match imports to the code that will run',
            bullets: [
                'Module resolution is the process of finding the file referred to by an import.',
                'TypeScript resolves imports to source or declaration files for checking. The runtime or bundler resolves imports in the JavaScript it receives.',
                'With NodeNext settings, an ESM import of ./user.js can resolve to user.ts during checking. The emitted import can still point to ./user.js.',
                'Node.js ESM relative imports normally need the runtime extension. The .js path names the emitted file, not the original .ts source.',
            ],
            examples: [
                {
                    title: 'Follow the import from source to output',
                    description: [
                        'Keep an ESM import valid for the JavaScript files that Node.js will receive.',
                    ],
                    language: 'typescript',
                    code: [
                        '// Source files: src/user.ts and src/main.ts',
                        '// src/user.ts',
                        'export const name = "Mia";',
                        '',
                        '// src/main.ts',
                        'import { name } from "./user.js";',
                        'console.log(name);',
                    ].join('\n'),
                    result: 'Expected layout after compilation:\ndist/user.js\ndist/main.js\n\nRunning dist/main.js in the configured Node.js ESM project prints Mia.',
                    explanation: [
                        'Use module and moduleResolution set to NodeNext, a supported target, and source/output folders as configured in the project.',
                        'For this .ts-to-.js ESM layout, package.json contains "type": "module".',
                        'The next lesson gives these settings their own configuration example.',
                    ],
                },
            ],
        },
        {
            id: 'verbatim-module-syntax',
            title: 'Make type-only imports explicit',
            bullets: [
                'With verbatimModuleSyntax enabled, imports marked type are removed and ordinary imports are preserved.',
                'Use type-only syntax for names that exist only in the type system. Keep value imports for code that executes.',
                'Compiler settings must match the host’s module rules. Node.js, a browser and a bundler do not resolve every import in the same way.',
            ],
            examples: [
                {
                    title: 'Mark a mixed import’s type member',
                    description: [
                        'Import one type and one runtime function from the same module.',
                    ],
                    language: 'typescript',
                    code: [
                        '// File: user.ts',
                        'export interface User { name: string; }',
                        'export function getName(user: User): string { return user.name; }',
                        '',
                        '// File: main.ts',
                        'import { type User, getName } from "./user.js";',
                        'const user: User = { name: "Mia" };',
                        'console.log(getName(user));',
                    ].join('\n'),
                    result: 'The emitted main.js import is:\nimport { getName } from "./user.js";\n\nRunning it prints Mia when user.js is available.',
                    explanation: [
                        'Keep the two source parts in separate files.',
                        'The inline type marker removes only User from the import.',
                    ],
                },
            ],
        },
    ],
};

export default note;
