import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'generics',
    title: 'Generics',
    summary: 'Use type parameters to keep relationships between input, output, and stored values.',
    scope: 'typescript',
    updatedOn: '2026-10-03',
    sections: [
        {
            id: 'preserve-type-information',
            title: 'Preserve type information',
            paragraphs: [
                'A generic uses a type parameter as a placeholder. The caller supplies or helps TypeScript infer a concrete type for each call.',
                'Unlike any, a generic can preserve the connection between an input type and an output type.',
            ],
            examples: [{
                code: [
                    'function identity<Type>(value: Type): Type {',
                    '    return value;',
                    '}',
                    '',
                    'const word = identity("hello");',
                    'const count = identity(3);',
                    '',
                    'console.log(word.toUpperCase(), count + 1);',
                ].join('\n'),
                language: 'typescript',
                result: 'HELLO 4',
                typeCheck: 'word is inferred as the literal type "hello" and count as the literal type 3. The generic keeps the argument type instead of returning any.',
            }],
        },
        {
            id: 'generic-containers',
            title: 'Generic containers',
            paragraphs: [
                'Put a type parameter on an interface or type alias when several members use the same value type. Each use of the generic container chooses its own type argument.',
            ],
            examples: [{
                code: [
                    'interface Box<Value> {',
                    '    value: Value;',
                    '    updated: boolean;',
                    '}',
                    '',
                    'const nameBox: Box<string> = {',
                    '    value: "Ava",',
                    '    updated: true,',
                    '};',
                    '',
                    'console.log(nameBox.value.toUpperCase());',
                ].join('\n'),
                language: 'typescript',
                result: 'AVA',
                typeCheck: 'Box<string> requires value to be a string. Box<number> would require a number instead.',
            }],
        },
        {
            id: 'generic-arrays-and-functions',
            title: 'Generic arrays and functions',
            paragraphs: [
                'Generic functions can work with arrays without losing the item type. Type inference often means callers do not need to write the type argument.',
            ],
            examples: [{
                code: [
                    'function first<Item>(items: Item[]): Item | undefined {',
                    '    return items[0];',
                    '}',
                    '',
                    'const firstName = first(["Ava", "Noah"]);',
                    'const firstScore = first([10, 20]);',
                    '',
                    'console.log(firstName, firstScore);',
                ].join('\n'),
                language: 'typescript',
                result: 'Ava 10',
                typeCheck: 'The return types are string | undefined and number | undefined because an array can be empty.',
            }],
            pitfalls: [
                'Do not add a type parameter when no relationship needs to be preserved. A concrete type is clearer when a function accepts only one type.',
            ],
        },
        {
            id: 'generic-constraints',
            title: 'Generic constraints',
            paragraphs: [
                'A constraint limits which types a type parameter can represent. The function can safely use members guaranteed by the constraint while still preserving the caller’s more specific type.',
            ],
            examples: [{
                code: [
                    'function describe<Value extends { length: number }>(value: Value): string {',
                    '    return `Length: ${value.length}`;',
                    '}',
                    '',
                    'console.log(describe("TypeScript"));',
                    'console.log(describe([1, 2, 3]));',
                ].join('\n'),
                language: 'typescript',
                result: 'The lines print "Length: 10" and "Length: 3".',
                typeCheck: 'describe(42) is rejected because number does not have a length property.',
            }],
        },
        {
            id: 'keyof-constraints',
            title: 'Constrain one type parameter with another',
            paragraphs: [
                'The keyof operator produces a union of known property keys. Combining keyof with a second type parameter lets a function accept only valid keys for the object it receives.',
            ],
            examples: [{
                code: [
                    'function getProperty<ObjectType, Key extends keyof ObjectType>(',
                    '    object: ObjectType,',
                    '    key: Key,',
                    '): ObjectType[Key] {',
                    '    return object[key];',
                    '}',
                    '',
                    'const user = { id: 4, name: "Mina" };',
                    'console.log(getProperty(user, "name"));',
                ].join('\n'),
                language: 'typescript',
                result: 'Mina',
                typeCheck: 'getProperty(user, "email") is rejected because "email" is not a key of user.',
            }],
        },
        {
            id: 'runtime-erasure',
            title: 'Generics do not exist at runtime',
            paragraphs: [
                'Type parameters, constraints, and generic type arguments are erased when TypeScript emits JavaScript. They do not create runtime constructors and cannot inspect the type chosen by a caller.',
                'Pass a JavaScript value, such as a constructor or validator function, when runtime behavior depends on a type. Runtime validation is still required for API responses and other external data.',
            ],
            examples: [{
                code: [
                    'function parseWith<Output>(',
                    '    text: string,',
                    '    validate: (value: unknown) => Output,',
                    '): Output {',
                    '    return validate(JSON.parse(text));',
                    '}',
                    '',
                    '// Output is erased. The validate function remains and runs.',
                ].join('\n'),
                language: 'typescript',
                typeCheck: 'Writing JSON.parse(text) as Output without validation would only assert a compile-time type. It would not check the parsed value at runtime.',
            }],
        },
    ],
};

export default note;
