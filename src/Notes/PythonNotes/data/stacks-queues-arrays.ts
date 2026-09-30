import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'stacks-queues-and-arrays',
    title: 'Stacks, queues, and typed arrays',
    summary: 'Choose a list, deque, or typed array for simple linear storage.',
    updatedOn: '2026-09-20',
    sections: [
        {
            id: 'stack',
            title: 'Stack with a list',
            paragraphs: ['A stack uses last in, first out order. append pushes at the end and pop removes from the end.'],
            examples: [{
                code: [
                    'stack = [1, 2, 3]',
                    'stack.append(5)',
                    'top = stack[-1]',
                    'removed = stack.pop()',
                ].join('\n'),
            }],
            exceptions: ['Reading stack[-1] or calling pop on an empty list raises IndexError.'],
        },
        {
            id: 'queue',
            title: 'Queue with deque',
            paragraphs: ['A queue normally uses first in, first out order. collections.deque supports efficient work at both ends.'],
            examples: [{
                code: [
                    'from collections import deque',
                    '',
                    'queue = deque([1, 2, 3])',
                    'queue.append(4)',
                    'first = queue.popleft()',
                ].join('\n'),
            }],
            bullets: ['Use deque for a queue that removes items from the front often. Removing the first item from a list shifts the remaining items.'],
        },
        {
            id: 'typed-array',
            title: 'Typed arrays with array.array',
            paragraphs: ['array.array stores values of one C-compatible type. The first argument is a type code.'],
            examples: [{
                code: [
                    'from array import array',
                    '',
                    'numbers = array("i", [1, 2, 3])',
                    'numbers.append(4)',
                    'numbers.insert(0, -1)',
                    'numbers.pop()',
                ].join('\n'),
            }],
            bullets: ['A typed array can use less memory than a list, but it is not faster for every operation. Measure the workload. NumPy is a separate library for numerical computing.'],
        },
    ],
};

export default note;
