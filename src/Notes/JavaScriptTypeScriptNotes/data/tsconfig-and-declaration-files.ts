import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'tsconfig-and-declaration-files',
    title: 'Compiler configuration and declaration files',
    summary: 'Select project inputs, checking rules, JavaScript output and declarations for consumers.',
    scope: 'typescript',
    updatedOn: '2026-10-14',
    exampleLayout: 'grouped',
    references: [
        {
            title: 'TypeScript TSConfig reference',
            href: 'https://www.typescriptlang.org/tsconfig/',
        },
        {
            title: 'TypeScript Handbook: Declaration files',
            href: 'https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html',
        },
        {
            title: 'TypeScript Handbook: Enums',
            href: 'https://www.typescriptlang.org/docs/handbook/enums.html',
        },
    ],
    sections: [
        {
            id: 'project-config',
            title: 'Choose the project inputs',
            bullets: [
                'tsconfig.json describes a TypeScript project’s files and compiler options.',
                'Run tsc -p tsconfig.json to use that project configuration. Passing source file names directly bypasses the project file.',
                'files lists specific starting files. include selects starting files by patterns. Imported dependencies can enter the project even when excluded from an include search.',
                'allowJs includes JavaScript files. checkJs also checks them for errors.',
            ],
            examples: [
                {
                    title: 'Configure one source folder',
                    description: [
                        'Check source files with strict rules while a separate build tool produces JavaScript.',
                    ],
                    language: 'text',
                    code: [
                        '{',
                        '    "compilerOptions": {',
                        '        "strict": true,',
                        '        "noEmit": true,',
                        '        "target": "ES2022",',
                        '        "module": "ESNext",',
                        '        "moduleResolution": "Bundler"',
                        '    },',
                        '    "include": ["src/**/*.ts"]',
                        '}',
                    ].join('\n'),
                    explanation: [
                        'Save this as tsconfig.json and run tsc -p tsconfig.json with TypeScript installed.',
                        'Bundler module resolution fits a project whose bundler resolves imports. A Node.js project needs settings matching its module system.',
                        'noEmit means the TypeScript compiler writes no JavaScript files.',
                    ],
                },
            ],
        },
        {
            id: 'strict-checking',
            title: 'Set checking rules deliberately',
            bullets: [
                'strict enables a group of checks, including noImplicitAny and strictNullChecks.',
                'noImplicitAny reports places where a type would otherwise become an implicit any.',
                'strictNullChecks keeps null and undefined separate from other types. Strict catch variables are unknown and need checks before property access.',
                'noUncheckedIndexedAccess and exactOptionalPropertyTypes are separate options. They are not enabled by strict.',
                'The strict group can gain checks in a newer compiler version. Keep the project compiler version controlled.',
            ],
            examples: [
                {
                    title: 'Add stricter indexed and optional-property checks',
                    description: [
                        'Record two checking choices that go beyond strict.',
                    ],
                    language: 'text',
                    code: [
                        '{',
                        '    "compilerOptions": {',
                        '        "strict": true,',
                        '        "noEmit": true,',
                        '        "noUncheckedIndexedAccess": true,',
                        '        "exactOptionalPropertyTypes": true',
                        '    },',
                        '    "include": ["src/**/*.ts"]',
                        '}',
                    ].join('\n'),
                    explanation: [
                        'An unchecked indexed read may be undefined under noUncheckedIndexedAccess.',
                        'An optional property cannot explicitly receive undefined under exactOptionalPropertyTypes unless its declared value type includes undefined.',
                    ],
                },
            ],
        },
        {
            id: 'emit-options',
            title: 'Configure output for the environment',
            bullets: [
                'target controls how JavaScript syntax is emitted. It does not install missing runtime APIs or polyfills.',
                'module controls the output module format. moduleResolution controls how the checker finds imported modules.',
                'lib selects built-in type declarations, such as browser DOM APIs. Declaring an API available does not provide it at runtime.',
                'rootDir and outDir control source layout and output placement. sourceMap can link JavaScript positions back to TypeScript source.',
                'noEmitOnError prevents output when checking reports errors. Without it, tsc can emit JavaScript despite type errors.',
            ],
            examples: [
                {
                    title: 'Emit JavaScript from source files',
                    description: [
                        'Produce JavaScript files for a bundler or another tool that supports ES modules.',
                    ],
                    language: 'text',
                    code: [
                        '{',
                        '    "compilerOptions": {',
                        '        "strict": true,',
                        '        "target": "ES2022",',
                        '        "module": "ESNext",',
                        '        "moduleResolution": "Bundler",',
                        '        "rootDir": "src",',
                        '        "outDir": "dist",',
                        '        "sourceMap": true,',
                        '        "noEmitOnError": true',
                        '    },',
                        '    "include": ["src/**/*.ts"]',
                        '}',
                    ].join('\n'),
                    explanation: [
                        'tsc -p tsconfig.json emits files under dist when checking succeeds.',
                        'This configuration preserves ES modules. It does not by itself configure a browser or Node.js to run them.',
                    ],
                },
                {
                    title: 'Configure Node.js ES modules',
                    description: [
                        'Compile relative .js imports against TypeScript source and keep them usable in Node.js output.',
                    ],
                    language: 'text',
                    code: [
                        '// File: package.json',
                        '{ "type": "module" }',
                        '',
                        '// File: tsconfig.json',
                        '{',
                        '    "compilerOptions": {',
                        '        "strict": true,',
                        '        "target": "ES2022",',
                        '        "module": "NodeNext",',
                        '        "moduleResolution": "NodeNext",',
                        '        "rootDir": "src",',
                        '        "outDir": "dist",',
                        '        "noEmitOnError": true',
                        '    },',
                        '    "include": ["src/**/*.ts"]',
                        '}',
                    ].join('\n'),
                    explanation: [
                        'Keep the package settings and compiler settings in separate files.',
                        'tsc -p tsconfig.json writes JavaScript under dist when checking succeeds.',
                        'With the preceding module example present, node dist/main.js prints Mia. These settings fit direct Node.js ESM execution rather than a bundler project.',
                    ],
                },
            ],
        },
        {
            id: 'declaration-files',
            title: 'Describe JavaScript that exists elsewhere',
            bullets: [
                'A .d.ts declaration file describes types without supplying the JavaScript implementation.',
                'A package may ship declarations beside its JavaScript. Some packages receive declarations through an @types package.',
                'declare describes an existing name. import type and export type mark names used only for checking.',
                'A declaration can be inaccurate. It cannot validate the JavaScript implementation or provide a missing runtime dependency.',
            ],
            examples: [
                {
                    title: 'Describe a nearby JavaScript module',
                    description: [
                        'Give a JavaScript function a declaration that TypeScript callers can use.',
                    ],
                    language: 'typescript',
                    code: [
                        '// File: legacy-math.js',
                        'export function double(value) { return value * 2; }',
                        '',
                        '// File: legacy-math.d.ts',
                        'export declare function double(value: number): number;',
                        '',
                        '// File: app.ts',
                        'import { double } from "./legacy-math.js";',
                        'console.log(double(4));',
                        '// double("4"); // Type error from the declaration.',
                    ].join('\n'),
                    result: '8 when the module files are available in an ES-module environment.',
                    explanation: [
                        'Keep the three parts in separate files beside each other.',
                        'The .d.ts file checks the call. legacy-math.js supplies the executable function.',
                        'The runtime must still receive legacy-math.js. Emitting app.ts alone does not necessarily copy that dependency.',
                    ],
                },
            ],
        },
        {
            id: 'generate-declarations',
            title: 'Generate declarations for exported names',
            bullets: [
                'declaration emits .d.ts files for exported types and values.',
                'emitDeclarationOnly writes declarations without JavaScript. Another tool must supply JavaScript when consumers need it.',
                'declarationMap writes maps that help editors connect declarations to source files.',
            ],
            examples: [
                {
                    title: 'Emit declarations for a library',
                    description: [
                        'Configure output containing declarations while another tool produces the implementation.',
                    ],
                    language: 'text',
                    code: [
                        '{',
                        '    "compilerOptions": {',
                        '        "strict": true,',
                        '        "declaration": true,',
                        '        "emitDeclarationOnly": true,',
                        '        "declarationMap": true,',
                        '        "rootDir": "src",',
                        '        "outDir": "dist"',
                        '    },',
                        '    "include": ["src/**/*.ts"]',
                        '}',
                    ].join('\n'),
                    explanation: [
                        'tsc -p tsconfig.json writes .d.ts files and declaration maps under dist.',
                        'Do not combine this with noEmit, which prevents writing those files.',
                    ],
                },
            ],
        },
        {
            id: 'features-that-emit-code',
            title: 'Inspect constructs that emit JavaScript',
            bullets: [
                'Type-only declarations are removed, but some TypeScript constructs emit JavaScript.',
                'A normal enum emits an object whose members are available at runtime. Parameter properties emit property initialization.',
                'Inspect emitted JavaScript when a construct’s runtime behavior matters. A string literal union remains a type-only alternative for a fixed set of strings.',
            ],
            examples: [
                {
                    title: 'Read a normal enum at runtime',
                    description: [
                        'Observe that an enum supplies a runtime object as well as a checked type.',
                    ],
                    language: 'typescript',
                    code: [
                        'enum Status { Ready = "ready" }',
                        'console.log(Status.Ready, typeof Status);',
                    ].join('\n'),
                    result: 'ready object',
                    explanation: [
                        'A normal enum emits JavaScript that initializes its members.',
                        'The status value can be read at runtime because this declaration produces an object.',
                    ],
                },
            ],
        },
    ],
};

export default note;
