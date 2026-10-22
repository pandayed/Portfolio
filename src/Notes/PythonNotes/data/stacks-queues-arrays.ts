import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'stacks-queues-and-arrays',
    title: 'Stacks, queues, and typed arrays',
    summary: 'Choose a list, deque, or typed array for simple linear storage.',
    updatedOn: '2026-09-20',
    exampleLayout: 'grouped',
    sections: [
        {
            id: 'stack',
            title: 'Stack with a list',
            bullets: ['A stack uses last in, first out order.', '`append` pushes at the end.', '`pop` removes from the end.'],
            examples: [{
                title: 'Pushing, reading, and removing the top item',
                description: ['The list stores the most recently added item at the end.'],
                language: 'python',
                code: [
                    'stack = [1, 2, 3]',
                    'stack.append(5)',
                    'top = stack[-1]',
                    'removed = stack.pop()',
                ].join('\n'),
            }],
            exceptions: ['Reading `stack[-1]` or calling `pop` on an empty list raises `IndexError`.'],
        },
        {
            id: 'queue',
            title: 'Queue with `deque`',
            bullets: ['A queue normally uses first in, first out order.', '`collections.deque` supports efficient work at both ends.', 'Removing the first item from a list shifts the remaining items.'],
            examples: [{
                title: 'Adding at the back and removing from the front',
                description: ['The queue appends a new item and removes the oldest item.'],
                language: 'python',
                code: [
                    'from collections import deque',
                    '',
                    'queue = deque([1, 2, 3])',
                    'queue.append(4)',
                    'first = queue.popleft()',
                ].join('\n'),
            }],

        },
        {
            id: 'typed-array',
            title: 'Typed arrays with `array.array`',
            bullets: ['`array.array` stores values of one C-compatible type.', 'The first argument is a type code.', 'A typed array can use less memory than a list.', 'It is not faster for every operation. Performance depends on the workload.', 'NumPy is a separate library for numerical computing.'],
            examples: [{
                title: 'Changing an integer array',
                description: ['The `i` type code selects C-compatible signed integers.'],
                language: 'python',
                code: [
                    'from array import array',
                    '',
                    'numbers = array("i", [1, 2, 3])',
                    'numbers.append(4)',
                    'numbers.insert(0, -1)',
                    'numbers.pop()',
                ].join('\n'),
            }],

        },
    ],
};

export default note;
