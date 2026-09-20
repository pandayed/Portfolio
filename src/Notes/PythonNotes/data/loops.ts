import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'loops-and-range',
    title: 'Loops and range',
    summary: 'Iterate over values, stop a loop, and use loop else clauses correctly.',
    updatedOn: '2026-09-20',
    sections: [
        {
            id: 'for-loop',
            title: 'for loops',
            paragraphs: ['A for loop asks an iterable for values one at a time. Strings, lists, tuples, dictionaries, sets, files, and generators are iterable.'],
            examples: [{
                code: [
                    'for letter in "Python":',
                    '    print(letter)',
                    '',
                    'for number in [10, 20, 30]:',
                    '    print(number)',
                ].join('\n'),
            }],
        },
        {
            id: 'range',
            title: 'range',
            bullets: [
                'range(stop) starts at 0.',
                'range(start, stop) starts at start.',
                'range(start, stop, step) moves by step.',
                'The stop value is excluded.',
                'range is a compact iterable object. It does not build a list of every number.',
            ],
            examples: [{
                code: [
                    'for x in range(5):       # 0 through 4',
                    '    print(x)',
                    '',
                    'for x in range(2, 10, 2):  # 2, 4, 6, 8',
                    '    print(x)',
                ].join('\n'),
            }],
        },
        {
            id: 'loop-else',
            title: 'break and loop else',
            paragraphs: ['The else clause runs when the loop finishes without break. It is useful for search code.'],
            examples: [{
                code: [
                    'names = ["lal", "vishal"]',
                    '',
                    'for name in names:',
                    '    if name.startswith("P"):',
                    '        print("Found")',
                    '        break',
                    'else:',
                    '    print("Not found")',
                ].join('\n'),
            }],
            exceptions: ['The else is tied to the loop, not to the if. return and an unhandled exception also prevent the else clause from running.'],
        },
        {
            id: 'while-loop',
            title: 'while loops',
            examples: [{
                code: [
                    'count = 0',
                    'while count < 5:',
                    '    count += 1',
                    '    print(count)',
                    'else:',
                    '    print("Loop was not broken")',
                ].join('\n'),
            }],
            exceptions: ['Make sure the condition can become false, or use a deliberate break. Otherwise the loop does not end.'],
        },
    ],
};

export default note;
