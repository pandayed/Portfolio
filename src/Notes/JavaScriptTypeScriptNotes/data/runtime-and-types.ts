import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'runtime-and-types',
    title: 'Runtime and types',
    summary: 'Separate JavaScript runtime behavior from TypeScript compile-time checks.',
    scope: 'javascript-typescript',
    updatedOn: '2026-10-03',
    sections: [
        {
            id: 'javascript-runs',
            title: 'JavaScript runs the program',
            paragraphs: [
                'JavaScript is the language that runs in the browser, Node.js, and other JavaScript runtimes. Values have types at runtime, and an operation can inspect or change those values while the program runs.',
                'TypeScript checks JavaScript code plus type syntax before the program runs. The emitted program is JavaScript. TypeScript types do not add runtime checks by themselves.',
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
            paragraphs: [
                'JavaScript has seven primitive types: string, number, bigint, boolean, undefined, symbol, and null. Every other value is an object. Arrays and functions are objects with extra behavior.',
                'Primitive values are immutable. An object can usually have its properties changed even when the variable that refers to it was declared with const.',
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
                result: 'The lines print Noah and true. const prevents assigning a different value to profile; it does not freeze the object.',
            }],
        },
        {
            id: 'typeof',
            title: 'Inspect runtime types with typeof',
            paragraphs: [
                'The typeof operator returns a string that describes a runtime value. It is useful for primitive checks and for detecting functions. Use Array.isArray for arrays.',
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
                result: 'The lines print string, number, function, object, and true. typeof null returning object is a long-standing JavaScript behavior.',
            }],
        },
        {
            id: 'missing-values',
            title: 'undefined and null are different values',
            paragraphs: [
                'undefined usually means that a value was not provided or a property does not exist. null is an explicit value that a program can use to mean no value.',
                'With strict null checks enabled, TypeScript does not let null or undefined stand in for another type unless that type includes them.',
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
            paragraphs: [
                'TypeScript often infers a type from the initial value. Add an annotation when it explains an API boundary, when a value has a wider allowed type, or when inference does not describe the intended contract.',
                'A type error does not prove that a value is safe at runtime. Data from JSON, forms, storage, and network responses still needs runtime validation.',
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
