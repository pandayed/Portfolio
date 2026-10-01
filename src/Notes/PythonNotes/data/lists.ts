import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'lists',
    title: 'Lists',
    summary: 'Create, change, copy, search, sort, transform, and combine lists.',
    updatedOn: '2026-10-01',
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
                    'print(characters[0], characters[-1])  # P n',
                    'print(characters[1:4])  # [\'y\', \'t\', \'h\']',
                    'print(characters[::-1])  # [\'n\', \'o\', \'h\', \'t\', \'y\', \'P\']',
                ].join('\n'),
            }],
            bullets: ['Repeating an inner list repeats the same list reference. Use a comprehension when each nested list must be independent.'],
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
                    '    print(index, name)  # 0 Lal, then 1 Ayushi (one pair per line)',
                ].join('\n'),
            }],
            bullets: ['Without a starred target, unpacking needs one target for each value.'],
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
                    'print(fruits.index("apple"))  # 0',
                    'print(fruits.count("apple"))  # 2',
                    '',
                    'items = [("item3", 3), ("item1", 1)]',
                    'items.sort(key=lambda item: item[1])',
                    'copy = sorted(items, reverse=True)',
                ].join('\n'),
            }],
            bullets: [
                'index returns the first matching position. Check membership first when a value may be absent.',
                'sort changes the list and returns None. sorted returns a new list.',
            ],
        },
        {
            id: 'shared-reference',
            title: 'Assignment and a shared list',
            paragraphs: [
                'Assigning a list to another name does not copy it. Both names refer to the same list. A change through either name is visible through both names.',
                'If the statements below are pasted without line breaks or other separators, they raise SyntaxError before anything prints. Written as separate statements, they produce the result shown here.',
            ],
            examples: [{
                code: [
                    'a = [1, 2, 3]',
                    'b = a',
                    'b.append(4)',
                    'print(a)',
                    'print(b)',
                ].join('\n'),
                result: 'Both lines print [1, 2, 3, 4]. append changes the shared list.',
            }],
        },
        {
            id: 'shallow-deep-copy',
            title: 'Shallow copy versus deep copy',
            paragraphs: [
                'Assignment makes another name for the same object; it does not copy. A shallow copy makes a new outer collection but keeps references to the original nested objects. A deep copy also copies nested mutable objects, so changing one of those copies does not change the original nested object.',
                'For a list, list.copy() and copy.copy(list_value) both make a shallow copy. Use copy.deepcopy when you need independent nested mutable values.',
            ],
            examples: [{
                code: [
                    'import copy',
                    '',
                    'original = [[1, 2], [3]]',
                    'shallow = copy.copy(original)',
                    'deep = copy.deepcopy(original)',
                    '',
                    'print(original is shallow)     # False: new outer list',
                    'print(original[0] is shallow[0])  # True: shared inner list',
                    'print(original[0] is deep[0])     # False: copied inner list',
                    '',
                    'original[0].append(4)',
                    'print(original)  # [[1, 2, 4], [3]]',
                    'print(shallow)   # [[1, 2, 4], [3]]',
                    'print(deep)      # [[1, 2], [3]]',
                ].join('\n'),
                result: 'The identity checks print False, True, False. After append, original and shallow show 4 in their shared inner list; deep does not.',
            }],
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
            bullets: ['zip stops when the shortest iterable ends. map and filter produce iterators; use list(...) if you need a list.'],
        },
    ],
};

export default note;
