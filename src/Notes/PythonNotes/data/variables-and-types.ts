import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'variables-and-types',
    title: 'Variables and types',
    summary: 'Bind names to objects, compare equality and identity, and understand mutability and type hints.',
    updatedOn: '2026-10-01',
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
            id: 'equality-identity',
            title: 'Equality versus identity: == and is',
            paragraphs: [
                '== asks whether two objects have equal values. For lists, it compares their items. is asks whether two names refer to the exact same object.',
                'Use == to compare values. Use is for identity checks, most often x is None or x is not None. Do not use is to compare strings or numbers: Python may reuse some objects, so identity is not a reliable value comparison.',
            ],
            examples: [{
                code: [
                    'a = [1, 2]',
                    'b = [1, 2]',
                    'same_list = a',
                    'print(a == b)        # True: equal items',
                    'print(a is b)        # False: two list objects',
                    'print(a is same_list)  # True: one list object',
                    '',
                    'missing = None',
                    'print(missing is None)  # True',
                ].join('\n'),
                result: 'The four lines print True, False, True, and True, in that order.',
            }],
            bullets: [
                'A class can define what == means for its objects. is always checks object identity.',
                'id returns an identity value that is unique while an object exists. It is not a permanent memory address; its meaning depends on the Python implementation.',
            ],
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
        },
        {
            id: 'identity-mutability',
            title: 'Mutable and immutable objects',
            paragraphs: [
                'A mutable object can change in place after it is created. An immutable object cannot change in place. A name can still be assigned to a different object; that is rebinding the name, not changing the old object.',
            ],
            bullets: [
                'Mutable examples: list, dictionary, and set. Their contents can change through methods or item assignment.',
                'Immutable examples: int, float, bool, str, tuple, and frozenset. An operation that appears to change one produces or reuses another object instead.',
                'A tuple cannot replace its items. If an item is a mutable object, such as a list, that object can still change.',
            ],
            examples: [{
                title: 'Changing an object versus rebinding a name',
                code: [
                    'items = [1, 2]',
                    'other_name = items',
                    'items.append(3)',
                    'print(other_name)  # [1, 2, 3]',
                    '',
                    'text = "hi"',
                    'old_text = text',
                    'text += "!"',
                    'print(old_text)  # hi',
                    'print(text)      # hi!',
                ].join('\n'),
                result: 'The list changed in place, so other_name sees [1, 2, 3]. text now names a new string, while old_text still names "hi".',
            }, {
                title: 'An immutable tuple with a mutable item',
                code: [
                    'record = (["a"], 1)',
                    'record[0].append("b")',
                    'print(record)  # ([\'a\', \'b\'], 1)',
                ].join('\n'),
                result: 'The tuple still contains the same list object. The list inside it now contains "a" and "b".',
            }],
        },
    ],
};

export default note;
