import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'utility-mapped-and-conditional-types',
    title: 'Utility types',
    summary: 'Use built-in generic helpers to derive property, union and function types.',
    scope: 'typescript',
    updatedOn: '2026-10-14',
    exampleLayout: 'grouped',
    references: [
        {
            title: 'TypeScript Handbook: Utility types',
            href: 'https://www.typescriptlang.org/docs/handbook/utility-types.html',
        },
    ],
    sections: [
        {
            id: 'property-modifiers',
            title: 'Change property modifiers',
            bullets: [
                'Partial<Type> makes properties optional. Required<Type> makes them required.',
                'Readonly<Type> marks properties readonly through the resulting type.',
                'These changes are shallow. Nested object properties keep their own types and modifiers.',
            ],
            examples: [
                {
                    title: 'Describe a partial update',
                    description: [
                        'Allow an update containing only the supplied fields.',
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
                        'Partial<User> permits the omitted id and name properties.',
                        'Object spread performs the update. The utility type does not change the object.',
                    ],
                },
                {
                    title: 'Require a completed draft',
                    description: [
                        'Reject a missing body when converting an optional draft shape to a complete shape.',
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
                        'Required makes both declared properties required.',
                        'The commented object is rejected because body is absent.',
                    ],
                },
            ],
        },
        {
            id: 'pick-omit-record',
            title: 'Select keys or describe a dictionary',
            bullets: [
                'Pick<Type, Keys> keeps selected properties. Omit<Type, Keys> removes selected properties from the checked shape.',
                'Record<Keys, Value> describes properties with the selected key type and value type.',
                'With a finite union of keys, Record requires every listed key.',
            ],
            examples: [
                {
                    title: 'Derive a product label and its translations',
                    description: [
                        'Reuse product fields while requiring a translation for each supported language.',
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
                        'Pick and Omit derive requirements from Product.',
                        'Record requires both en and hi with string values.',
                    ],
                },
            ],
        },
        {
            id: 'union-utilities',
            title: 'Select union members',
            bullets: [
                'Exclude<Union, Members> removes union members assignable to Members.',
                'Extract<Union, Members> keeps union members assignable to Members.',
                'NonNullable<Type> removes null and undefined.',
            ],
            examples: [
                {
                    title: 'Keep the usable members of existing unions',
                    description: [
                        'Derive narrower unions without rewriting their alternatives.',
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
                        'Settled is "idle" | "done".',
                        'Done is "done", and Name is string.',
                    ],
                },
            ],
        },
        {
            id: 'function-utilities',
            title: 'Derive function inputs and results',
            bullets: [
                'Parameters<FunctionType> gives a tuple of the parameter types.',
                'ReturnType<FunctionType> gives the returned type.',
                'Awaited<Type> describes the value obtained by awaiting a promise and unwraps nested promises.',
            ],
            examples: [
                {
                    title: 'Reuse an existing function signature',
                    description: [
                        'Derive argument and result types from a function already defined.',
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
                        'Parameters produces [name: string, score: number].',
                        'ReturnType produces string. The function implementation still supplies the behavior.',
                    ],
                },
            ],
        },
        {
            id: 'types-do-not-transform-values',
            title: 'Derived types do not edit existing values',
            bullets: [
                'A derived type changes checked requirements. It does not remove properties, freeze objects or run data conversions.',
                'Use JavaScript operations when the actual value needs to change.',
            ],
            examples: [
                {
                    title: 'Compare an omitted type with an omitted value',
                    description: [
                        'Observe that assigning a wider object does not remove its id property.',
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
                        'The Omit annotation leaves original unchanged.',
                        'Object rest creates a new object without id.',
                    ],
                },
            ],
        },
    ],
};

export default note;
