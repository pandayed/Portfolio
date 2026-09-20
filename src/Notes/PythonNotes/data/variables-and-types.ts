import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'variables-and-types',
    title: 'Variables and types',
    summary: 'Bind names to objects, inspect types, and separate hints from runtime checks.',
    updatedOn: '2026-09-20',
    sections: [
        {
            id: 'bindings',
            title: 'Names and values',
            paragraphs: [
                'A Python variable is a name bound to an object. The same name can later be bound to an object of another type.',
            ],
            examples: [{
                code: [
                    'students_count = 10',
                    'rating = 4.9',
                    'is_it_raining = False',
                    'name = "Lal Bihari Pandey"',
                    '',
                    'x, y, z = 1, 2, 3',
                    'a = b = 1',
                ].join('\n'),
            }],
        },
        {
            id: 'dynamic-typing',
            title: 'Dynamic typing',
            bullets: [
                'Python determines an object type at runtime.',
                'type returns the type of an object.',
                'A name does not keep one fixed type for its full lifetime.',
            ],
            examples: [{
                code: [
                    'value = 10',
                    'print(type(value))       # <class \'int\'>',
                    '',
                    'value = "Hey"',
                    'print(type(value))       # <class \'str\'>',
                ].join('\n'),
            }],
        },
        {
            id: 'type-hints',
            title: 'Type hints',
            paragraphs: [
                'A type hint documents an expected type and helps static type checkers. Python does not enforce the hint by itself at runtime.',
            ],
            examples: [{
                code: [
                    'age: int = 20',
                    'age = "twenty"  # Runs unless another tool checks it.',
                ].join('\n'),
            }],
            exceptions: [
                'A framework or validation library can enforce annotations. That enforcement comes from the tool, not from a normal annotated assignment.',
            ],
        },
        {
            id: 'identity-mutability',
            title: 'Identity and mutability',
            bullets: [
                'id returns an identity value that is unique during the object lifetime.',
                'Integers and strings are immutable. An operation creates or reuses another object instead of changing the original object.',
                'Lists are mutable. append changes the existing list.',
            ],
            examples: [{
                code: [
                    'items = [1, 2, 3]',
                    'before = id(items)',
                    'items.append(4)',
                    'print(before == id(items))  # True in normal Python execution',
                ].join('\n'),
            }],
            exceptions: [
                'Do not treat id as a permanent memory address. Its meaning is implementation-specific, and an identity value may be reused after an object is destroyed.',
            ],
        },
    ],
};

export default note;
