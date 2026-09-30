import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'tuples-and-unpacking',
    title: 'Tuples and unpacking',
    summary: 'Create immutable sequences, unpack values, swap names, and merge containers.',
    updatedOn: '2026-09-20',
    sections: [
        {
            id: 'tuples',
            title: 'Tuple basics',
            paragraphs: ['A tuple is an immutable sequence. Commas create a tuple; parentheses usually only make it easier to read.'],
            examples: [{
                code: [
                    'point = (1, 2)',
                    'single = (1,)',
                    'also_single = 1,',
                    'combined = (1, 2) + (3, 4)',
                    'repeated = (1, 2) * 3',
                    'letters = tuple("Lal")',
                ].join('\n'),
            }],
            bullets: ['A tuple’s items cannot be replaced, added, or removed. A mutable item inside a tuple can still change.'],
        },
        {
            id: 'swap',
            title: 'Packing, unpacking, and swapping',
            examples: [{
                code: [
                    'x = 10',
                    'y = 20',
                    'x, y = y, x',
                    '',
                    'first, second = (10, 20)',
                ].join('\n'),
            }],
        },
        {
            id: 'star-unpacking',
            title: 'Star unpacking',
            examples: [{
                code: [
                    'numbers = [1, 2, 3]',
                    'print(*numbers)  # 1 2 3',
                    '',
                    'first = [1, 2]',
                    'second = [3, 4]',
                    'values = [*first, 5, 6, *second]',
                    '',
                    'defaults = {"x": 10, "y": 20}',
                    'overrides = {"x": 40}',
                    'combined = {**defaults, **overrides}',
                ].join('\n'),
            }],
            bullets: ['When dictionaries are merged, the later value replaces an earlier value for the same key.'],
        },
    ],
};

export default note;
