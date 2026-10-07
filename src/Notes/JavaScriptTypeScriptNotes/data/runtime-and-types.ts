import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'runtime-and-types',
    title: 'Runtime and types',
    summary: 'JavaScript runs the program. TypeScript checks types before it runs.',
    scope: 'javascript-typescript',
    updatedOn: '2026-10-07',
    sections: [
        {
            id: 'javascript-runs',
            title: 'JavaScript runs the program',
            bullets: [
                'JavaScript runs in browsers, Node.js, and other JavaScript runtimes.',
                'A runtime is the environment that runs the program.',
                'Values have types at runtime. Code can inspect or change values while the program runs.',
                'TypeScript checks JavaScript code and type syntax before the program runs.',
                'The emitted program is JavaScript. Emitted code is the code that the compiler produces.',
                'TypeScript types do not add runtime checks by themselves.',
            ],
            examples: [{
                language: 'typescript',
                code: [
                    'const total: number = 2 + 3;',
                    'console.log(total);',
                ].join('\n'),
                result: 'The emitted JavaScript prints 5. The : number annotation is not present at runtime.',
            }],
        },
        {
            id: 'primitive-and-object-values',
            title: 'Primitive values and objects',
            bullets: [
                'JavaScript has seven primitive types: string, number, bigint, boolean, undefined, symbol, and null.',
                'Every other value is an object. Arrays and functions are objects with extra behavior.',
                'Primitive values are immutable. You cannot change the value itself.',
                'You can usually change object properties even when a const variable refers to the object.',
            ],
            examples: [{
                language: 'javascript',
                code: [
                    'const profile = { name: "Mia" };',
                    'profile.name = "Noah";',
                    '',
                    'console.log(profile.name);',
                    'console.log(Array.isArray([]));',
                ].join('\n'),
                result: 'The lines print Noah and true. const prevents assigning a different value to profile. It does not freeze the object.',
            }],
        },
        {
            id: 'typeof',
            title: 'Inspect runtime types with typeof',
            bullets: [
                'The typeof operator returns a string that describes the type of a runtime value.',
                'Use typeof to check primitive types or detect functions.',
                'Use Array.isArray to check whether a value is an array.',
            ],
            examples: [{
                language: 'javascript',
                code: [
                    'console.log(typeof "hello");',
                    'console.log(typeof 42);',
                    'console.log(typeof (() => {}));',
                    'console.log(typeof null);',
                    'console.log(Array.isArray([]));',
                ].join('\n'),
                result: 'The lines print string, number, function, object, and true. JavaScript returns object for typeof null.',
            }],
        },
        {
            id: 'missing-values',
            title: 'undefined and null are different values',
            bullets: [
                'undefined usually means that code did not provide a value or that a property does not exist.',
                'null is an explicit value that a program can use to mean no value.',
                'With strict null checks enabled, TypeScript allows null or undefined only when the type includes them.',
                'A union type lists more than one allowed type. string | null allows a string or null.',
            ],
            examples: [{
                language: 'typescript',
                code: [
                    'let nickname: string | null = null;',
                    'nickname = "Mia";',
                    '',
                    'const user = { name: "Noah" };',
                    'console.log(user.name);',
                ].join('\n'),
                result: 'The JavaScript prints Noah. nickname can hold a string or null because both are listed in its union type.',
                typeCheck: 'With strict null checks, let name: string = null is a type error.',
            }],
        },
        {
            id: 'type-inference',
            title: 'TypeScript can infer many types',
            bullets: [
                'TypeScript often infers a type from the initial value. Inference means that the checker determines the type without an annotation.',
                'A type annotation states the allowed type in the code.',
                'Add an annotation when it explains the input or output of an API.',
                'Also add one when a value allows more types than inference gives it, or inference does not express the intended rule.',
                'Type checking does not prove that a value is safe at runtime.',
                'Validate data from JSON, forms, storage, and network responses while the program runs.',
            ],
            examples: [{
                language: 'typescript',
                code: [
                    'const count = 3;            // inferred as the literal type 3',
                    'let currentStatus: "idle" | "done" = "idle";',
                    'currentStatus = "done";',
                    '',
                    'console.log(count, currentStatus);',
                ].join('\n'),
                result: 'The emitted JavaScript prints 3 done.',
                typeCheck: 'currentStatus = "waiting" is a type error because "waiting" is not part of the union.',
            }],
        },
    ],
};

export default note;
