import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'mapped-and-conditional-types',
    title: 'Mapped and conditional types',
    summary: 'Mapped and conditional types define reusable type transformations from known keys, constraints, and inferred parts.',
    scope: 'typescript',
    updatedOn: '2026-10-14',
    exampleLayout: 'grouped',
    inlineCode: true,
    references: [
        {
            title: 'TypeScript Handbook: Mapped types',
            href: 'https://www.typescriptlang.org/docs/handbook/2/mapped-types.html',
        },
        {
            title: 'TypeScript Handbook: Conditional types',
            href: 'https://www.typescriptlang.org/docs/handbook/2/conditional-types.html',
        },
    ],
    sections: [
        {
            id: 'mapped-types',
            title: 'Mapped types',
            bullets: [
                'A mapped type loops over a union of keys in a type expression.',
                '`Key in keyof Type` visits the property names of `Type`.',
                '`Type[Key]` reads each corresponding property type.',
                'A custom mapped type can express transformations that built-in utility types do not cover.',
            ],
            examples: [
                {
                    title: 'Boolean flags',
                    description: [
                        'The example derives a flag property for every property in an existing shape.',
                    ],
                    language: 'typescript',
                    code: [
                        'type Flags<Type> = { [Key in keyof Type]: boolean };',
                        'type Preferences = { dark: string; compact: number };',
                        'const flags: Flags<Preferences> = { dark: true, compact: false };',
                        'console.log(flags.dark, flags.compact);',
                    ].join('\n'),
                    result: 'true false',
                    explanation: [
                        'The keys come from `Preferences`.',
                        'The new value type for each key is `boolean`.',
                    ],
                },
            ],
        },
        {
            id: 'mapping-modifiers',
            title: 'Mapping modifiers',
            bullets: [
                '`readonly` and `?` add modifiers to mapped properties.',
                '`-readonly` and `-?` remove `readonly` and optional modifiers.',
                'The minus forms remove modifiers that a mapped type would otherwise preserve.',
            ],
            examples: [
                {
                    title: 'Required and writable properties',
                    description: [
                        'The example derives a complete editable shape from a `readonly` optional draft.',
                    ],
                    language: 'typescript',
                    code: [
                        'type CompleteMutable<Type> = {',
                        '    -readonly [Key in keyof Type]-?: Type[Key];',
                        '};',
                        'type Draft = { readonly title?: string; readonly body?: string };',
                        'const article: CompleteMutable<Draft> = { title: "Types", body: "Ready" };',
                        'article.title = "Mapped types";',
                        'console.log(article.title);',
                    ].join('\n'),
                    result: 'Mapped types',
                    explanation: [
                        'Both declared properties become required.',
                        'Removing `readonly` permits the `title` assignment.',
                    ],
                },
            ],
        },
        {
            id: 'conditional-types',
            title: 'Conditional types',
            bullets: [
                'A conditional type uses `Type extends Requirement ? TrueType : FalseType`.',
                '`extends` tests assignability in this expression.',
                'It does not run a JavaScript `if` statement.',
            ],
            examples: [
                {
                    title: 'Conditional label types',
                    description: [
                        'The example derives an id label for numbers and a name label for other inputs.',
                    ],
                    language: 'typescript',
                    code: [
                        'type Label<Type> = Type extends number ? { id: number } : { name: string };',
                        'const numeric: Label<number> = { id: 7 };',
                        'const text: Label<string> = { name: "Mia" };',
                        'console.log(numeric.id, text.name);',
                    ].join('\n'),
                    result: '7 Mia',
                    explanation: [
                        '`number` selects the first shape.',
                        '`string` selects the second shape.',
                        'The objects still need to be created in JavaScript.',
                    ],
                },
            ],
        },
        {
            id: 'conditional-unions',
            title: 'Distributive conditional types',
            bullets: [
                'A conditional type distributes over a union when its left side is a type parameter used on its own.',
                'TypeScript checks each union member separately.',
                'The resulting member types combine into a union.',
                'Wrapping both compared sides in tuples prevents distribution.',
                'TypeScript then checks the whole supplied type.',
            ],
            examples: [
                {
                    title: 'Distributed and whole-union checks',
                    description: [
                        'The example shows whether each union member or the complete union is tested.',
                    ],
                    language: 'typescript',
                    code: [
                        'type List<Type> = Type extends unknown ? Type[] : never;',
                        'type WholeList<Type> = [Type] extends [unknown] ? Type[] : never;',
                        'const separate: List<string | number> = [1, 2];',
                        'const mixed: WholeList<string | number> = [1, "two"];',
                        'console.log(separate.join(", "), mixed.join(", "));',
                        '// const wrong: List<string | number> = [1, "two"];',
                    ].join('\n'),
                    result: '1, 2 1, two',
                    explanation: [
                        '`List` produces `string[] | number[]`.',
                        'One array must match one member.',
                        '`WholeList` produces `(string | number)[]`, which permits mixed elements.',
                    ],
                },
            ],
        },
        {
            id: 'infer',
            title: 'Type inference in conditions',
            bullets: [
                '`infer` introduces a type name for part of a matched type inside a conditional type.',
                'The true branch can use the inferred name.',
                'The false branch handles a type that does not match.',
            ],
            examples: [
                {
                    title: 'Array item types',
                    description: [
                        'The example extracts a list item type while leaving a non-array type unchanged.',
                    ],
                    language: 'typescript',
                    code: [
                        'type ItemOf<Type> = Type extends readonly (infer Item)[] ? Item : Type;',
                        'const userName: ItemOf<string[]> = "Mia";',
                        'const score: ItemOf<number> = 20;',
                        'console.log(userName, score);',
                    ].join('\n'),
                    result: 'Mia 20',
                    explanation: [
                        'The array match infers `string` as `Item`.',
                        '`number` does not match an array, so the false branch keeps `number`.',
                    ],
                },
            ],
        },
    ],
};

export default note;
