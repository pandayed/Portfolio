import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'dictionaries-sets-and-generators',
    title: 'Dictionaries, sets, comprehensions, and generators',
    summary: 'Use dictionaries and sets, build collections with comprehensions, and produce values with generators.',
    updatedOn: '2026-09-20',
    sections: [
        {
            id: 'dictionaries',
            title: 'Dictionaries',
            paragraphs: ['A dictionary maps unique hashable keys to values. It preserves insertion order, but lookup uses keys rather than numeric positions.'],
            examples: [{
                code: [
                    'point = {"x": 1, "y": 2}',
                    'point["z"] = 10',
                    '',
                    'print(point["x"])  # 1',
                    'print(point.get("missing"))       # None',
                    'print(point.get("missing", -100)) # -100',
                    '',
                    'for key, value in point.items():',
                    '    print(key, value)  # x 1, then y 2, then z 10 (one pair per line)',
                ].join('\n'),
            }],
            bullets: [
                'Use square brackets when the key is expected to exist. A missing key raises KeyError.',
                'Use get when a key may be absent. It returns None by default or the fallback value you provide.',
                'Dictionary keys must be hashable. A list cannot be a key.',
            ],
        },
        {
            id: 'sets',
            title: 'Sets',
            paragraphs: ['A set stores unique hashable values. Use it for membership checks and set operations.'],
            examples: [{
                code: [
                    'first = {1, 2, 3}',
                    'second = {3, 4, 5}',
                    '',
                    'print(first | second)  # {1, 2, 3, 4, 5} (order may vary)',
                    'print(first & second)  # {3}',
                    'print(first - second)  # {1, 2} (order may vary)',
                    'print(first ^ second)  # {1, 2, 4, 5} (order may vary)',
                ].join('\n'),
            }],
            bullets: [
                'Sets support membership checks and set operations. They do not support indexing.',
                'Set iteration order is not guaranteed. Do not rely on it.',
                'Use set() to create an empty set. {} creates an empty dictionary.',
                'discard does nothing when a value is absent. remove raises KeyError.',
            ],
        },
        {
            id: 'comprehensions',
            title: 'List, set, and dictionary comprehensions',
            paragraphs: ['A comprehension builds a collection from an iterable. The expression before for gives each output value. Add if to include only values that match a condition.'],
            examples: [{
                title: 'List comprehension',
                code: [
                    'values = [x * 2 for x in range(5)]',
                    'even_squares = [x * x for x in range(6) if x % 2 == 0]',
                ].join('\n'),
                result: 'values is [0, 2, 4, 6, 8]. even_squares is [0, 4, 16].',
            }, {
                title: 'Set comprehension',
                code: 'unique_doubles = {x * 2 for x in [1, 1, 2]}',
                result: 'unique_doubles contains 2 and 4. A set keeps each value once; its display order is not guaranteed.',
            }, {
                title: 'Dictionary comprehension',
                code: 'squares = {x: x * x for x in range(4)}',
                result: 'squares is {0: 0, 1: 1, 2: 4, 3: 9}.',
            }],
        },
        {
            id: 'generators',
            title: 'Generator expressions',
            paragraphs: ['Parentheses around a comprehension-like expression create a generator expression. It produces values on demand instead of storing every result at once.'],
            examples: [{
                code: [
                    'values = (x * 2 for x in range(10_000))',
                    '',
                    'for value in values:',
                    '    print(value)  # 0, 2, 4, 6, 8, ... (one value per line)',
                ].join('\n'),
            }],
            bullets: ['A generator expression produces values on demand. It does not support indexing or len, and it is exhausted after one pass.'],
        },
    ],
};

export default note;
