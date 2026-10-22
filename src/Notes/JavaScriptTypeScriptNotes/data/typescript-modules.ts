import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'typescript-modules',
    title: 'Type-only imports and module resolution',
    summary: 'Type-only imports support checking. Value imports remain available in emitted JavaScript.',
    scope: 'typescript',
    updatedOn: '2026-10-14',
    exampleLayout: 'grouped',
    inlineCode: true,
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
            title: 'Type-only imports',
            bullets: [
                '`import type` imports names used as types.',
                '`export type` exports names for checking.',
                'Type-only imports are removed from emitted JavaScript.',
                'A value import needed by JavaScript must remain available when the program runs.',
                'A class can be imported as a type when only its instance type is needed.',
                'Constructing an instance needs its value import.',
            ],
            examples: [
                {
                    title: 'Type and value imports',
                    description: [
                        'The example uses a type for an annotation while retaining the function needed at runtime.',
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
                        'The `user.ts` and `main.ts` parts belong in separate files.',
                        'The `User` import disappears.',
                        'The `getName` import remains because the emitted JavaScript calls it.',
                    ],
                },
            ],
        },
        {
            id: 'checker-and-runtime-resolution',
            title: 'Module resolution',
            bullets: [
                'Module resolution is the process of finding the file referred to by an import.',
                'TypeScript resolves imports to source or declaration files for checking.',
                'The runtime or bundler resolves imports in the JavaScript it receives.',
                'With `NodeNext` settings, an ESM import of `./user.js` can resolve to `user.ts` during checking.',
                'The emitted import can still point to `./user.js`.',
                'Node.js ESM relative imports normally need the runtime extension.',
                'The `.js` path names the emitted file, not the original `.ts` source.',
            ],
            examples: [
                {
                    title: 'Source and output imports',
                    description: [
                        'The example keeps an ESM import valid for the JavaScript files that Node.js will receive.',
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
                        'The project sets `module` and `moduleResolution` to `NodeNext`.',
                        'It also defines a supported `target` and source and output folders.',
                        'For this `.ts`-to-`.js` ESM layout, `package.json` contains `"type": "module"`.',
                        'The next lesson gives these settings their own configuration example.',
                    ],
                },
            ],
        },
        {
            id: 'verbatim-module-syntax',
            title: 'Explicit type-only syntax',
            bullets: [
                'With `verbatimModuleSyntax` enabled, imports marked `type` are removed and ordinary imports are preserved.',
                'Names that exist only in the type system use type-only syntax.',
                'Executable code requires value imports.',
                'Compiler settings must match the host’s module rules.',
                'Node.js, a browser and a bundler do not resolve every import in the same way.',
            ],
            examples: [
                {
                    title: 'Mixed imports',
                    description: [
                        'The example imports one type and one runtime function from the same module.',
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
                        'The two source parts belong in separate files.',
                        'The inline `type` marker removes only `User` from the import.',
                    ],
                },
            ],
        },
    ],
};

export default note;
