import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'collections-comparison',
    title: 'Lists, tuples, sets, and dictionaries',
    summary: 'Compare order, changes, duplicates, access, and when to use each collection.',
    updatedOn: '2026-10-01',
    sections: [
        {
            id: 'differences',
            title: 'How they differ',
            bullets: [
                'List: [1, 2, 2] is an ordered sequence. It keeps duplicates. You can read or replace an item by index, and add or remove items.',
                'Tuple: (1, 2, 2) is an ordered sequence. It keeps duplicates and supports indexing, but you cannot replace, add, or remove its items.',
                'Set: {1, 2} stores each value once. You can add or remove values, but you cannot access them by index. Its iteration order is not guaranteed.',
                'Dictionary: {"name": "Mia"} stores values under unique keys. You read or change a value by its key. It keeps insertion order, but it is not a sequence indexed by position. Values may repeat.',
            ],
        },
        {
            id: 'choose',
            title: 'When to use each',
            bullets: [
                'Use a list for an ordered group that may grow or change, such as tasks in the order you added them. Repeated values are allowed.',
                'Use a tuple for a fixed group of values whose positions have meaning, such as (latitude, longitude), when the group itself should not change.',
                'Use a set when you need unique values, fast membership checks, or operations such as union and intersection. For example, find the tags shared by two articles.',
                'Use a dictionary when each value has a name or identifier, such as a student ID mapped to a score. Look up the value by its key.',
            ],
        },
        {
            id: 'examples',
            title: 'See the behavior',
            examples: [
                {
                    title: 'List: keep order and duplicates, then change it',
                    code: [
                        'tasks = ["read", "write", "read"]',
                        'tasks.append("review")',
                        'print(tasks[0])',
                        'print(tasks)',
                    ].join('\n'),
                    result: 'First line: read. Second line: [\'read\', \'write\', \'read\', \'review\'].',
                },
                {
                    title: 'Tuple: read a fixed group by position',
                    code: [
                        'location = (12.9, 77.6)',
                        'print(location[0])',
                        'print(location)',
                    ].join('\n'),
                    result: 'First line: 12.9. Second line: (12.9, 77.6).',
                },
                {
                    title: 'Set: remove duplicates and check membership',
                    code: [
                        'tags = {"python", "notes", "python"}',
                        'print(sorted(tags))',
                        'print("python" in tags)',
                    ].join('\n'),
                    result: 'First line: [\'notes\', \'python\']. Second line: True. sorted gives a predictable display order. The set itself has no guaranteed order.',
                },
                {
                    title: 'Dictionary: look up and update by key',
                    code: [
                        'scores = {"Mia": 90, "Noah": 85}',
                        'scores["Mia"] = 95',
                        'print(scores["Mia"])',
                        'print(list(scores))',
                    ].join('\n'),
                    result: 'First line: 95. Second line: [\'Mia\', \'Noah\']. Iterating over a dictionary gives its keys in insertion order.',
                },
            ],
        },
        {
            id: 'limits',
            title: 'Important limits',
            bullets: [
                'Use [] for an empty list, () for an empty tuple, set() for an empty set, and {} for an empty dictionary.',
                'Set values and dictionary keys must be hashable. A list cannot be a set value or a dictionary key. A tuple can be a key only when all of its contents are hashable.',
                'A tuple cannot replace one of its items, but a mutable object inside it can still change.',
                'Assigning a value to an existing dictionary key replaces that key’s previous value. Different keys can hold the same value.',
            ],
            paragraphs: [[
                'For more operations, read ',
                { text: 'Lists', href: '#/notes/python/lists' },
                ', ',
                { text: 'Tuples and unpacking', href: '#/notes/python/tuples-and-unpacking' },
                ', and ',
                { text: 'Dictionaries, sets, comprehensions, and generators', href: '#/notes/python/dictionaries-sets-and-generators' },
                '.',
            ]],
        },
    ],
};

export default note;
