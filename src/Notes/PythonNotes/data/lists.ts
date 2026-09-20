import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'lists',
    title: 'Lists',
    summary: 'Create, slice, unpack, search, sort, transform, and combine lists.',
    updatedOn: '2026-09-20',
    sections: [
        {
            id: 'create-access',
            title: 'Create and access lists',
            examples: [{
                code: [
                    'names = ["lal", "bihari", "pandey"]',
                    'matrix = [[1, 2, 4], [3], [4, 5]]',
                    'zeros = [0] * 5',
                    'numbers = list(range(2, 10))',
                    'characters = list("Python")',
                    '',
                    'print(characters[0], characters[-1])',
                    'print(characters[1:4])',
                    'print(characters[::-1])',
                ].join('\n'),
            }],
            exceptions: ['Repeating a nested mutable value can create repeated references. [[0] * 2] * 3 does not create three independent inner lists.'],
        },
        {
            id: 'unpacking-enumerate',
            title: 'Unpacking and enumerate',
            examples: [{
                code: [
                    'numbers = [1, 2, 3, 4]',
                    'first, second, *remaining = numbers',
                    'first, *between, last = numbers',
                    '',
                    'for index, name in enumerate(["Lal", "Ayushi"]):',
                    '    print(index, name)',
                ].join('\n'),
            }],
            exceptions: ['Without a starred target, the number of targets must equal the number of values or unpacking raises ValueError.'],
        },
        {
            id: 'modify',
            title: 'Add and remove items',
            bullets: [
                'append adds one item at the end.',
                'insert adds one item at an index.',
                'pop removes and returns an item. The default index is -1.',
                'remove deletes the first matching value.',
                'del removes an item or slice by position.',
                'clear removes every item.',
            ],
            examples: [{
                code: [
                    'fruits = ["apple", "banana"]',
                    'fruits.append("guava")',
                    'fruits.insert(0, "grapes")',
                    'last = fruits.pop()',
                    'fruits.remove("banana")',
                ].join('\n'),
            }],
        },
        {
            id: 'search-sort',
            title: 'Search and sort',
            examples: [{
                code: [
                    'fruits = ["apple", "banana", "apple"]',
                    'print(fruits.index("apple"))',
                    'print(fruits.count("apple"))',
                    '',
                    'items = [("item3", 3), ("item1", 1)]',
                    'items.sort(key=lambda item: item[1])',
                    'copy = sorted(items, reverse=True)',
                ].join('\n'),
            }],
            exceptions: [
                'index raises ValueError when the value is absent. Check membership first when absence is normal.',
                'sort changes the list and returns None. sorted returns a new list. Tuples sort lexicographically when their corresponding values are comparable.',
            ],
        },
        {
            id: 'transform-filter-zip',
            title: 'Transform, filter, and zip',
            examples: [{
                code: [
                    'items = [("item3", 3), ("item2", 2), ("item1", 1)]',
                    '',
                    'numbers = [item[1] for item in items]',
                    'large = [item[1] for item in items if item[1] > 1]',
                    '',
                    'pairs = list(zip([1, 2, 3], [10, 20]))',
                    'print(pairs)  # [(1, 10), (2, 20)]',
                ].join('\n'),
            }],
            exceptions: ['zip stops when the shortest iterable ends unless strict=True is used in supported Python versions. map and filter return lazy iterator objects, not lists.'],
        },
    ],
};

export default note;
