import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'utility-mapped-and-conditional-types',
    title: 'Utility types',
    summary: 'Utility types derive property, union and function types from existing types.',
    scope: 'typescript',
    updatedOn: '2026-10-14',
    exampleLayout: 'grouped',
    inlineCode: true,
    references: [
        {
            title: 'TypeScript Handbook: Utility types',
            href: 'https://www.typescriptlang.org/docs/handbook/utility-types.html',
        },
    ],
    sections: [
        {
            id: 'property-modifiers',
            title: 'Property modifiers',
            bullets: [
                '`Partial<Type>` makes properties optional.',
                '`Required<Type>` makes them required.',
                '`Readonly<Type>` marks properties `readonly` through the resulting type.',
                'These changes affect only the properties of the current object type.',
                'Nested object properties keep their own types and modifiers.',
            ],
            examples: [
                {
                    title: 'Partial updates',
                    description: [
                        'The example allows an update containing only the supplied fields.',
                    ],
                    language: 'typescript',
                    code: [
                        'type User = { id: number; name: string; active: boolean };',
                        'function update(user: User, changes: Partial<User>): User {',
                        '    return { ...user, ...changes };',
                        '}',
                        'const user: User = { id: 7, name: "Mia", active: true };',
                        'console.log(update(user, { active: false }).active);',
                    ].join('\n'),
                    result: 'false',
                    explanation: [
                        '`Partial<User>` permits the omitted `id` and `name` properties.',
                        'Object spread performs the update.',
                        'The utility type does not change the object.',
                    ],
                },
                {
                    title: 'Required draft properties',
                    description: [
                        'The example rejects a missing `body` when converting an optional draft shape to a complete shape.',
                    ],
                    language: 'typescript',
                    code: [
                        'type Draft = { title?: string; body?: string };',
                        'const complete: Required<Draft> = { title: "Types", body: "Ready" };',
                        'console.log(complete.body);',
                        '// const incomplete: Required<Draft> = { title: "Types" };',
                    ].join('\n'),
                    result: 'Ready',
                    explanation: [
                        '`Required` makes both declared properties required.',
                        'The commented object is rejected because `body` is absent.',
                    ],
                },
            ],
        },
        {
            id: 'pick-omit-record',
            title: 'Property selection and dictionaries',
            bullets: [
                '`Pick<Type, Keys>` keeps selected properties.',
                '`Omit<Type, Keys>` removes selected properties from the checked shape.',
                '`Record<Keys, Value>` describes properties with the selected key type and value type.',
                'With a finite union of keys, `Record` requires every listed key.',
            ],
            examples: [
                {
                    title: 'Product types and translations',
                    description: [
                        'The example reuses product fields while requiring a translation for each supported language.',
                    ],
                    language: 'typescript',
                    code: [
                        'type Product = { id: number; name: string; price: number };',
                        'type ProductLabel = Pick<Product, "id" | "name">;',
                        'type ProductDraft = Omit<Product, "id">;',
                        'const label: ProductLabel = { id: 7, name: "Pen" };',
                        'const draft: ProductDraft = { name: "Pen", price: 2 };',
                        'const names: Record<"en" | "hi", string> = { en: "Pen", hi: "Kalam" };',
                        'console.log(label.name, draft.price, names.hi);',
                    ].join('\n'),
                    result: 'Pen 2 Kalam',
                    explanation: [
                        '`Pick` and `Omit` derive requirements from `Product`.',
                        '`Record` requires both `en` and `hi` with `string` values.',
                    ],
                },
            ],
        },
        {
            id: 'union-utilities',
            title: 'Union utilities',
            bullets: [
                '`Exclude<Union, Members>` removes union members assignable to `Members`.',
                '`Extract<Union, Members>` keeps union members assignable to `Members`.',
                '`NonNullable<Type>` removes `null` and `undefined`.',
            ],
            examples: [
                {
                    title: 'Narrower unions',
                    description: [
                        'The example derives narrower unions without rewriting their alternatives.',
                    ],
                    language: 'typescript',
                    code: [
                        'type Status = "idle" | "loading" | "done";',
                        'type Settled = Exclude<Status, "loading">;',
                        'type Done = Extract<Status, "done">;',
                        'type Name = NonNullable<string | null | undefined>;',
                        'const currentStatus: Settled = "idle";',
                        'const done: Done = "done";',
                        'const userName: Name = "Mia";',
                        'console.log(currentStatus, done, userName);',
                    ].join('\n'),
                    result: 'idle done Mia',
                    explanation: [
                        '`Settled` is `"idle" | "done"`.',
                        '`Done` is `"done"`.',
                        '`Name` is `string`.',
                    ],
                },
            ],
        },
        {
            id: 'function-utilities',
            title: 'Function utilities',
            bullets: [
                '`Parameters<FunctionType>` gives a tuple of the parameter types.',
                '`ReturnType<FunctionType>` gives the returned type.',
                '`Awaited<Type>` describes the value obtained by awaiting a promise and unwraps nested promises.',
            ],
            examples: [
                {
                    title: 'Function parameter and result types',
                    description: [
                        'The example derives argument and result types from a function already defined.',
                    ],
                    language: 'typescript',
                    code: [
                        'function label(name: string, score: number): string {',
                        '    return `${name}: ${score}`;',
                        '}',
                        'type LabelInput = Parameters<typeof label>;',
                        'type LabelResult = ReturnType<typeof label>;',
                        'const input: LabelInput = ["Mia", 20];',
                        'const result: LabelResult = label(...input);',
                        'console.log(result);',
                    ].join('\n'),
                    result: 'Mia: 20',
                    explanation: [
                        '`Parameters` produces `[name: string, score: number]`.',
                        '`ReturnType` produces `string`.',
                        'The function implementation still supplies the behavior.',
                    ],
                },
            ],
        },
        {
            id: 'types-do-not-transform-values',
            title: 'Derived types and runtime values',
            bullets: [
                'A derived type changes checked requirements.',
                'It does not remove properties, freeze objects or run data conversions.',
                'JavaScript operations change the actual value.',
            ],
            examples: [
                {
                    title: 'Omitted properties and runtime objects',
                    description: [
                        'The example shows that assigning a wider object does not remove its `id` property.',
                    ],
                    language: 'typescript',
                    code: [
                        'type Product = { id: number; name: string; price: number };',
                        'const original: Product = { id: 7, name: "Pen", price: 2 };',
                        'const view: Omit<Product, "id"> = original;',
                        'console.log("id" in view);',
                        'const { id, ...withoutId } = original;',
                        'console.log("id" in withoutId);',
                    ].join('\n'),
                    result: 'true\nfalse',
                    explanation: [
                        'The `Omit` annotation leaves `original` unchanged.',
                        'Object rest creates a new object without `id`.',
                    ],
                },
            ],
        },
    ],
};

export default note;
