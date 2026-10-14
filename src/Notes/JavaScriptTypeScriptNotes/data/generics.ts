import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'generics',
    title: 'Generics',
    summary: 'Connect input and result types without restricting reusable code to one fixed type.',
    scope: 'typescript',
    updatedOn: '2026-10-14',
    exampleLayout: 'grouped',
    references: [
        {
            title: 'TypeScript Handbook: Generics',
            href: 'https://www.typescriptlang.org/docs/handbook/2/generics.html',
        },
        {
            title: 'TypeScript Handbook: More on functions',
            href: 'https://www.typescriptlang.org/docs/handbook/2/functions.html',
        },
    ],
    sections: [
        {
            id: 'preserve-type-information',
            title: 'Connect an input type to its result',
            bullets: [
                'A type parameter names a type chosen for a particular use of a function or type.',
                'Declare a function type parameter in angle brackets before its parameter list.',
                'Using the same type parameter for input and result preserves their relationship.',
            ],
            examples: [
                {
                    title: 'Keep the caller’s type',
                    description: [
                        'Return an input while preserving whether it was a string or a number.',
                    ],
                    language: 'typescript',
                    code: [
                        'function keep<Value>(value: Value): Value {',
                        '    return value;',
                        '}',
                        'const userName = keep("Mia");',
                        'const score = keep(20);',
                        'console.log(userName.toUpperCase(), score.toFixed(1));',
                    ].join('\n'),
                    result: 'MIA 20.0',
                    explanation: [
                        'TypeScript infers a type argument from each input.',
                        'The two calls retain the operations appropriate to their results.',
                    ],
                },
            ],
        },
        {
            id: 'inferred-and-explicit-type-arguments',
            title: 'Infer or supply a type argument',
            bullets: [
                'Inference usually chooses type arguments from supplied values.',
                'A caller can write a type argument in angle brackets when it needs to state a requirement explicitly.',
                'A type argument selects a checked type. It is not a runtime argument or a conversion.',
            ],
            examples: [
                {
                    title: 'Select a checked type explicitly',
                    description: [
                        'Require a numeric input on a generic call.',
                    ],
                    language: 'typescript',
                    code: [
                        'function keep<Value>(value: Value): Value { return value; }',
                        'console.log(keep<number>(20));',
                        '// keep<number>("20"); // Type error: the input must match number.',
                    ].join('\n'),
                    result: '20',
                    explanation: [
                        'number fills the Value parameter for this call.',
                        'The string argument remains invalid even though it looks numeric.',
                    ],
                },
            ],
        },
        {
            id: 'generic-containers',
            title: 'Use a parameter in an object type',
            bullets: [
                'A type alias or interface can also declare type parameters.',
                'A generic container reuses the same structure with different contained types.',
                'Array<Item> is the generic form of Item[]. Promise<Result> describes the fulfilled result type of a promise.',
            ],
            examples: [
                {
                    title: 'Reuse a box shape',
                    description: [
                        'Use one interface for a string value and a numeric value.',
                    ],
                    language: 'typescript',
                    code: [
                        'interface Box<Value> { value: Value; }',
                        'const nameBox: Box<string> = { value: "Mia" };',
                        'const score: Box<number> = { value: 20 };',
                        'console.log(nameBox.value.toUpperCase(), score.value.toFixed(1));',
                    ].join('\n'),
                    result: 'MIA 20.0',
                    explanation: [
                        'Each type argument determines the value property type.',
                        'The interface does not create either object.',
                    ],
                },
            ],
        },
        {
            id: 'generic-arrays-and-functions',
            title: 'Include a possible missing result',
            bullets: [
                'A generic result must describe every result the function can produce.',
                'An operation returning an item from a possibly empty array needs to account for undefined.',
            ],
            examples: [
                {
                    title: 'Return an item or undefined',
                    description: [
                        'Preserve the item type while handling an empty input list.',
                    ],
                    language: 'typescript',
                    code: [
                        'function first<Item>(items: readonly Item[]): Item | undefined {',
                        '    return items[0];',
                        '}',
                        'const firstName = first(["Mia", "Noah"]);',
                        'if (firstName !== undefined) console.log(firstName.toUpperCase());',
                        'console.log(first<number>([]));',
                    ].join('\n'),
                    result: 'MIA\nundefined',
                    explanation: [
                        'The non-empty call preserves string as its item type.',
                        'The result union still requires a check before using string methods.',
                    ],
                },
            ],
        },
        {
            id: 'generic-constraints',
            title: 'Require members with a constraint',
            bullets: [
                'extends in a type parameter declares a constraint. Supplied types must meet that requirement.',
                'The constraint permits operations on its required members while preserving additional information about the input.',
            ],
            examples: [
                {
                    title: 'Require a name and preserve the full object',
                    description: [
                        'Read a required property without dropping an additional id property from the result type.',
                    ],
                    language: 'typescript',
                    code: [
                        'function showName<Value extends { name: string }>(value: Value): Value {',
                        '    console.log(value.name);',
                        '    return value;',
                        '}',
                        'const user = showName({ name: "Mia", id: 7 });',
                        'console.log(user.id);',
                        '// showName({ id: 7 }); // Type error: name is required.',
                    ].join('\n'),
                    result: 'Mia\n7',
                    explanation: [
                        'The constraint makes value.name available inside the function.',
                        'The inferred type also retains id for the caller.',
                    ],
                },
            ],
        },
        {
            id: 'runtime-constructors',
            title: 'Pass a constructor when code must create a value',
            bullets: [
                'A type parameter does not provide a constructor that JavaScript can call.',
                'A constructor signature uses new (...) => ResultType to describe a constructor value supplied as an argument.',
            ],
            examples: [
                {
                    title: 'Create an instance from a supplied constructor',
                    description: [
                        'Require an actual constructor argument instead of attempting to instantiate a type parameter.',
                    ],
                    language: 'typescript',
                    code: [
                        'class User {',
                        '    constructor(public name: string) {}',
                        '}',
                        'function create<Value>(ctor: new (name: string) => Value, name: string): Value {',
                        '    return new ctor(name);',
                        '}',
                        'const user = create(User, "Mia");',
                        'console.log(user.name);',
                    ].join('\n'),
                    result: 'Mia',
                    explanation: [
                        'User is supplied as a runtime value.',
                        'Value describes the resulting instance type. public name is a parameter property that creates and initializes the instance property.',
                    ],
                },
            ],
        },
        {
            id: 'callback-result-types',
            title: 'Infer the result type from a callback',
            bullets: [
                'A generic function can connect its result to the result of a supplied callback.',
                'The callback can check an unknown value and return the type the caller needs.',
            ],
            examples: [
                {
                    title: 'Keep a validator’s result type',
                    description: [
                        'Parse external text and let a checking callback determine the returned type.',
                    ],
                    language: 'typescript',
                    code: [
                        'function parse<Value>(text: string, validate: (value: unknown) => Value): Value {',
                        '    const incoming: unknown = JSON.parse(text);',
                        '    return validate(incoming);',
                        '}',
                        'function readName(value: unknown): string {',
                        '    if (typeof value !== "string") throw new Error("Expected a string");',
                        '    return value;',
                        '}',
                        'const userName = parse(\'"Mia"\', readName);',
                        'console.log(userName.toUpperCase());',
                    ].join('\n'),
                    result: 'MIA',
                    explanation: [
                        'readName checks the parsed value and returns a string.',
                        'The callback result lets TypeScript infer string for Value and the parse result.',
                        'Invalid JSON throws while parsing. A valid non-string JSON value throws in readName.',
                    ],
                },
            ],
        },
        {
            id: 'dom-type-arguments',
            title: 'A DOM type argument states an expectation',
            bullets: [
                'Some DOM functions let the caller supply an expected element type as a type argument.',
                'That type argument does not inspect the selected element. Check the actual element when its kind is uncertain.',
            ],
            examples: [
                {
                    title: 'Check the selected element’s actual kind',
                    description: [
                        'Avoid relying on a button type argument when the selector matches a div.',
                    ],
                    language: 'typescript',
                    code: [
                        'const area = document.createElement("div");',
                        'area.innerHTML = \'<div id="save">Save</div>\';',
                        'const claimed = area.querySelector<HTMLButtonElement>("#save");',
                        'console.log(claimed?.disabled);',
                        'const actual = area.querySelector("#save");',
                        'if (actual instanceof HTMLButtonElement) {',
                        '    console.log(actual.disabled);',
                        '} else {',
                        '    console.log("Not a button");',
                        '}',
                    ].join('\n'),
                    result: 'undefined\nNot a button',
                    explanation: [
                        'Run this in a browser DOM environment.',
                        'The type argument permits a button property read, but the actual element is a div.',
                        'The instanceof condition checks the runtime element before using button-specific properties.',
                    ],
                },
            ],
        },
    ],
};

export default note;
