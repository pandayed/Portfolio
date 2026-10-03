import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'tsconfig-and-declaration-files',
    title: 'TSConfig and declaration files',
    summary: 'Define a TypeScript project, choose compiler behavior, and describe JavaScript APIs with .d.ts files.',
    scope: 'typescript',
    updatedOn: '2026-10-03',
    sections: [
        {
            id: 'project-config',
            title: 'TSConfig defines a project',
            paragraphs: [
                'A tsconfig.json file marks the root of a TypeScript or JavaScript project. It tells the compiler which files belong to the project and which compiler options to use.',
                'Use files for an exact file list. Use include for path patterns. exclude can remove matched paths from include, but an imported file can still become part of the program.',
            ],
            examples: [{
                title: 'A small project configuration',
                code: [
                    '{',
                    '    "compilerOptions": {',
                    '        "strict": true,',
                    '        "target": "ES2022",',
                    '        "module": "ESNext"',
                    '    },',
                    '    "include": ["src/**/*.ts", "src/**/*.tsx"],',
                    '    "exclude": ["dist"]',
                    '}',
                ].join('\n'),
                language: 'text',
                typeCheck: 'Running tsc without file arguments reads this configuration from the project.',
            }],
        },
        {
            id: 'strict-checking',
            title: 'Start with strict checking',
            paragraphs: [
                'The strict option enables a group of stricter checks. These checks include errors for implicit any in many positions and separate handling for null and undefined.',
                'A future TypeScript version may add a stricter check under strict. Review type errors when upgrading instead of assuming the setting will never change.',
            ],
            examples: [{
                code: [
                    'function uppercase(value: string | undefined): string {',
                    '    if (value === undefined) {',
                    '        return "MISSING";',
                    '    }',
                    '',
                    '    return value.toUpperCase();',
                    '}',
                ].join('\n'),
                language: 'typescript',
                typeCheck: 'With strict null checking, calling value.toUpperCase() before checking undefined is rejected.',
            }],
        },
        {
            id: 'emit-options',
            title: 'Type checking and JavaScript output',
            paragraphs: [
                'target selects the JavaScript language version used for emitted syntax. module selects the module format or preservation behavior. Match these options to the runtime and build tool used by the project.',
                'Set noEmit to true when another tool creates the runnable JavaScript and TypeScript should only check types. Set outDir when tsc should write emitted files to a separate directory.',
            ],
            examples: [{
                title: 'Type-check while a bundler emits code',
                code: [
                    '{',
                    '    "compilerOptions": {',
                    '        "strict": true,',
                    '        "noEmit": true,',
                    '        "module": "ESNext",',
                    '        "target": "ES2022"',
                    '    }',
                    '}',
                ].join('\n'),
                language: 'text',
                typeCheck: 'tsc checks the project but does not write JavaScript, source maps, or declaration files when noEmit is true.',
            }],
            pitfalls: [
                'target changes emitted syntax. It does not install runtime APIs or polyfills.',
                'Compiler options do not configure every bundler or runtime. Keep their module and resolution settings compatible.',
            ],
        },
        {
            id: 'declaration-files',
            title: 'Declaration files describe existing code',
            paragraphs: [
                'A .d.ts file describes the types of a JavaScript API. It contains declarations but does not provide the runtime implementation.',
                'The declared module or global must still exist when the program runs. A declaration file cannot make a missing JavaScript package, function, or variable appear.',
            ],
            examples: [{
                title: 'Describe a JavaScript module',
                code: [
                    '// legacy-math.d.ts',
                    'export function double(value: number): number;',
                    '',
                    '// app.ts',
                    'import { double } from "./legacy-math.js";',
                    'console.log(double(4));',
                ].join('\n'),
                language: 'typescript',
                result: '8, when legacy-math.js exports a matching double function.',
                typeCheck: 'double("4") is rejected. The .d.ts file checks the call but does not implement double.',
            }],
        },
        {
            id: 'generate-declarations',
            title: 'Generate declarations for a library',
            paragraphs: [
                'The declaration option asks TypeScript to create a .d.ts file for each emitted source file. The generated declaration describes the module’s public API.',
                'Use emitDeclarationOnly when the build should write declarations but another tool handles JavaScript output. declarationMap can connect declarations back to their source for editor navigation.',
            ],
            examples: [{
                title: 'Emit only type declarations',
                code: [
                    '{',
                    '    "compilerOptions": {',
                    '        "declaration": true,',
                    '        "declarationMap": true,',
                    '        "emitDeclarationOnly": true,',
                    '        "outDir": "dist"',
                    '    },',
                    '    "include": ["src"]',
                    '}',
                ].join('\n'),
                language: 'text',
            }, {
                title: 'Source and generated declaration',
                code: [
                    '// src/version.ts',
                    'export const version = "1.0";',
                    '',
                    '// dist/version.d.ts',
                    'export declare const version = "1.0";',
                ].join('\n'),
                language: 'typescript',
                typeCheck: 'The generated .d.ts file exposes the exported type information. It is not the JavaScript implementation.',
            }],
        },
        {
            id: 'runtime-boundary',
            title: 'Know the runtime boundary',
            paragraphs: [
                'Type annotations, interfaces, type aliases, generic arguments, and import type declarations are removed from emitted JavaScript. They cannot validate a network response, local storage value, or JSON file at runtime.',
                'Classes and regular imports are JavaScript values, so they remain when used. Some TypeScript features, such as enums, can also emit JavaScript. Check the emitted code when runtime output matters.',
            ],
            examples: [{
                code: [
                    'interface User {',
                    '    name: string;',
                    '}',
                    '',
                    'const parsed = JSON.parse("{\\"name\\":42}") as User;',
                    'console.log(typeof parsed.name);',
                ].join('\n'),
                language: 'typescript',
                result: 'number',
                typeCheck: 'The assertion tells TypeScript to treat parsed as User. It does not check the JSON, and the assertion disappears before the code runs.',
            }],
        },
    ],
};

export default note;
