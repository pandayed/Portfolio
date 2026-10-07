import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'type',
    title: 'type',
    summary: 'Name existing type expressions, describe alternatives, and combine requirements.',
    scope: 'typescript',
    updatedOn: '2026-10-07',
    sections: [
        {
            id: 'type-alias',
            title: 'type gives a reusable name to a type expression',
            bullets: [
                'A type expression describes allowed values. The previous chapter used expressions such as string, number[], and { name: string } directly in annotations.',
                'Write type Name = Expression to give an expression a name. This declaration is called a type alias.',
                'Use the alias anywhere an annotation needs that type. Unlike inference, the declaration names a type instead of choosing a type for a particular variable.',
                'The name exists for type checking. It does not declare a JavaScript variable or create a value.',
            ],
            examples: [
                {
                    title: 'Name a type and reuse it in a function',
                    language: 'typescript',
                    code: [
                        'type UserName = string;',
                        'function greet(name: UserName): string {',
                        '    return `Hello, ${name}`;',
                        '}',
                        'const name: UserName = "Mia";',
                        'console.log(greet(name));',
                        '// Error: UserName describes strings.',
                        '// greet(7);',
                        '// Error: UserName is a type name, not a value.',
                        '// console.log(UserName);',
                    ].join('\n'),
                    result: 'Hello, Mia',
                    typeCheck: 'UserName checks the same values as string. Giving it a name does not change the allowed values.',
                },
            ],
        },
        {
            id: 'object-aliases',
            title: 'Name an object shape',
            bullets: [
                'An object alias avoids repeating the same property list in several annotations.',
                'User below names the object type already used as an inline annotation in the previous chapter.',
                'The object expression creates the data. The alias names its checked shape.',
            ],
            examples: [
                {
                    title: 'Reuse one object shape for an input and a variable',
                    language: 'typescript',
                    code: [
                        'type User = { id: number; name: string };',
                        'function label(user: User): string {',
                        '    return `${user.id}: ${user.name}`;',
                        '}',
                        'const user: User = { id: 7, name: "Mia" };',
                        'console.log(label(user));',
                    ].join('\n'),
                    result: '7: Mia',
                    typeCheck: 'The two annotations refer to the same property requirements.',
                },
            ],
        },
        {
            id: 'unions',
            title: 'Use | when a value may have different types',
            bullets: [
                'The | operator forms a union. A value may match any one of the listed alternatives.',
                'UserId names string | number, so a string or a number is accepted. A boolean is not.',
                'Status combines literal types from the previous chapter. Only the listed strings are accepted.',
                'A union can also explicitly allow null and undefined. An annotation of string alone excludes them with strictNullChecks enabled.',
                'Naming the union and operating on a union value are separate steps. The next chapter teaches the checks needed before using member-specific operations.',
            ],
            examples: [
                {
                    title: 'Name alternatives and assign matching values',
                    language: 'typescript',
                    code: [
                        'type UserId = string | number;',
                        'type Status = "idle" | "done";',
                        'type Nickname = string | null | undefined;',
                        'const textId: UserId = "u-7";',
                        'const numberId: UserId = 7;',
                        'const status: Status = "done";',
                        'let nickname: Nickname = null;',
                        'console.log(textId, numberId, status, nickname);',
                        'nickname = "Mia";',
                        'console.log(nickname);',
                        'nickname = undefined;',
                        'console.log(nickname);',
                        '// Error: boolean is not a UserId alternative.',
                        '// const invalidId: UserId = true;',
                        '// Error: waiting is not a Status alternative.',
                        '// const invalidStatus: Status = "waiting";',
                    ].join('\n'),
                    result: 'The lines print u-7 7 done null, then Mia, then undefined.',
                    typeCheck: 'Each assignment matches one union member. The union does not require a value to match every member.',
                },
            ],
        },
        {
            id: 'arrays-and-tuples',
            title: 'Name an array type or a tuple type',
            bullets: [
                'An alias can name an array expression such as string[]. Its length is not fixed by that expression.',
                'A tuple describes a known number of positions and the type at each position. [number, number] requires two number positions.',
                'Use a tuple when positions have a fixed meaning. Use an array when the value holds a list of items of the same type.',
            ],
            examples: [
                {
                    title: 'A list of names and a pair of coordinates',
                    language: 'typescript',
                    code: [
                        'type Names = string[];',
                        'type Coordinates = [number, number];',
                        'const names: Names = ["Mia", "Noah", "Ava"];',
                        'const point: Coordinates = [10, 20];',
                        'console.log(names.length, point[0], point[1]);',
                        '// Error: the second tuple position requires a number.',
                        '// const wrongPoint: Coordinates = [10, "twenty"];',
                        '// Error: this tuple has only two positions.',
                        '// const extraPoint: Coordinates = [10, 20, 30];',
                    ].join('\n'),
                    result: '3 10 20',
                    typeCheck: 'Names permits different list lengths. Coordinates checks the declared positions.',
                },
            ],
        },
        {
            id: 'function-types',
            title: 'Name the type of a function value',
            bullets: [
                'A function type expression uses (parameters) => ResultType. It describes a callable value’s inputs and result.',
                'This => is part of a type expression. It does not create a function body.',
                'The function assigned to format supplies the implementation. Its parameter type is inferred from Formatter.',
            ],
            examples: [
                {
                    title: 'A function type and its implementation',
                    language: 'typescript',
                    code: [
                        'type Formatter = (name: string) => string;',
                        'const format: Formatter = (name) => name.toUpperCase();',
                        'console.log(format("Mia"));',
                        '// Error: the input must be a string.',
                        '// format(7);',
                        '// Error: Formatter requires a string result.',
                        '// const wrongFormat: Formatter = (name) => name.length;',
                    ].join('\n'),
                    result: 'MIA',
                    typeCheck: 'The named type checks the implementation and calls. It provides no implementation itself.',
                },
            ],
        },
        {
            id: 'intersections',
            title: 'Use & when a value must meet several requirements',
            bullets: [
                'The & operator forms an intersection. A value must satisfy every participating type.',
                'Named & Identified requires both name and id. This differs from |, which allows alternatives.',
                'The new alias does not modify the participating types. A type can still be used by itself.',
            ],
            examples: [
                {
                    title: 'Combine two object requirements',
                    language: 'typescript',
                    code: [
                        'type Named = { name: string };',
                        'type Identified = { id: number };',
                        'type User = Named & Identified;',
                        'const user: User = { name: "Mia", id: 7 };',
                        'const nameOnly: Named = { name: "Noah" };',
                        'console.log(user.name, user.id, nameOnly.name);',
                        '// Error: the intersection also requires id.',
                        '// const incomplete: User = { name: "Mia" };',
                    ].join('\n'),
                    result: 'Mia 7 Noah',
                    typeCheck: 'User requires both shapes. Named still requires only name.',
                },
            ],
        },
        {
            id: 'alias-identity',
            title: 'A new alias name does not create a distinct value type',
            bullets: [
                'Two aliases of string still accept the same strings. Their names alone do not prevent mixing values.',
                'Alias names explain a type’s purpose. They do not add a runtime tag or a new checking rule.',
            ],
            examples: [
                {
                    title: 'Different names for the same underlying type',
                    language: 'typescript',
                    code: [
                        'type UserId = string;',
                        'type OrderId = string;',
                        'const userId: UserId = "u-7";',
                        'const orderId: OrderId = userId;',
                        'console.log(orderId);',
                    ].join('\n'),
                    result: 'u-7',
                    typeCheck: 'The assignment passes because both aliases describe string.',
                },
            ],
        },
    ],
};

export default note;
