import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'dictionaries-sets-and-generators',
    title: 'Dictionaries, sets, and generators',
    summary: 'Store mappings and unique values, then build them with comprehensions.',
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
                    'print(point["x"])',
                    'print(point.get("missing"))       # None',
                    'print(point.get("missing", -100)) # -100',
                    '',
                    'for key, value in point.items():',
                    '    print(key, value)',
                ].join('\n'),
            }],
            exceptions: ['Square-bracket lookup raises KeyError for a missing key. get returns the supplied default, or None when no default is supplied. A key must be hashable, so a list cannot be a key.'],
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
                    'print(first | second)  # union',
                    'print(first & second)  # intersection',
                    'print(first - second)  # difference',
                    'print(first ^ second)  # symmetric difference',
                ].join('\n'),
            }],
            exceptions: ['Sets are not indexable, and their display order should not be treated as stable. {} creates an empty dictionary; use set() for an empty set. remove raises KeyError when absent, while discard does not.'],
        },
        {
            id: 'comprehensions',
            title: 'Comprehensions',
            examples: [{
                code: [
                    'values = [x * 2 for x in range(5)]',
                    'unique = {x * 2 for x in range(5)}',
                    'mapping = {x: x * 2 for x in range(5)}',
                ].join('\n'),
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
                    '    print(value)',
                ].join('\n'),
            }],
            exceptions: ['A generator is normally single-use and does not support len or indexing. After it is exhausted, iterating it again produces no values.'],
        },
    ],
};

export default note;
