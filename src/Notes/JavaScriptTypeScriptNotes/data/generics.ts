import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'generics',
    title: 'Generics',
    summary: 'Use type parameters to keep relationships between input, output, and stored values.',
    scope: 'typescript',
    updatedOn: '2026-10-07',
    sections: [
        {
            id: 'preserve-type-information',
            title: 'Preserve type information',
            bullets: [
                'A generic uses a type parameter to represent a type chosen for each call.',
                'The caller can supply that type or let TypeScript infer it from the arguments.',
                'A generic can keep the relationship between an input type and an output type.',
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
                typeCheck: 'word has the literal type "hello". count has the literal type 3. A literal type allows that exact value.',
            }],
        },
        {
            id: 'generic-containers',
            title: 'Generic containers',
            bullets: [
                'Add a type parameter to an interface or type alias when its properties need a type chosen by the caller.',
                'A type argument is the specific type supplied for a type parameter.',
                'Each use of the generic container chooses its own type argument.',
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
            bullets: [
                'A generic function can use an array and keep its item type in the result.',
                'TypeScript can often infer the type argument from the array.',
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
                'Use a specific type when a function accepts only that type.',
                'Add a type parameter when it connects the types of arguments, results, or stored values.',
            ],
        },
        {
            id: 'generic-constraints',
            title: 'Generic constraints',
            bullets: [
                'A constraint limits the types allowed for a type parameter.',
                'The function can use the properties required by the constraint.',
                'The type parameter still keeps the caller’s more specific type.',
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
            bullets: [
                'The keyof operator produces a union of an object type’s property keys.',
                'Use keyof in a constraint on a second type parameter to accept only keys from the object type.',
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
            bullets: [
                'TypeScript removes type parameters, constraints, and type arguments from the generated JavaScript.',
                'They do not create constructors that run in JavaScript.',
                'A generic function cannot inspect its type argument when the JavaScript runs.',
                'Pass a JavaScript value when the function needs it while running.',
                'A constructor can create an object. A validator function can check a value.',
                'Validate API responses and other external data before relying on their types.',
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
                typeCheck: 'Writing JSON.parse(text) as Output tells the type checker to treat the result as Output. It does not check the parsed value when the JavaScript runs.',
            }],
        },
    ],
};

export default note;
