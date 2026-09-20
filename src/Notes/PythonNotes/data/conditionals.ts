import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'conditionals',
    title: 'Conditionals',
    summary: 'Control branches with ordered conditions, boolean operators, and conditional expressions.',
    updatedOn: '2026-09-20',
    sections: [
        {
            id: 'if-elif-else',
            title: 'if, elif, and else',
            paragraphs: ['Python checks branches from top to bottom and runs the first matching branch. Put the more specific condition first.'],
            examples: [{
                code: [
                    'age = 46',
                    '',
                    'if age >= 45:',
                    '    print("45 or older")',
                    'elif age >= 18:',
                    '    print("Adult")',
                    'else:',
                    '    print("Under 18")',
                ].join('\n'),
            }],
            exceptions: ['If age >= 18 comes first, it also matches 46. The later age >= 45 branch can never run for that value.'],
        },
        {
            id: 'indentation-pass',
            title: 'Indentation and pass',
            bullets: [
                'Indentation defines a block.',
                'Use one consistent indentation style. Four spaces is the standard style.',
                'pass is a statement that does nothing. It can keep a block syntactically valid while it is empty.',
            ],
            exceptions: ['Python can accept tabs, but mixing tabs and spaces in indentation can raise TabError and makes code hard to maintain.'],
        },
        {
            id: 'boolean-operators',
            title: 'Boolean and comparison operators',
            examples: [{
                code: [
                    'x = 15',
                    'y = 20',
                    '',
                    'if x < y and x > 10:',
                    '    print("Both are true")',
                    '',
                    'if 10 < x < 20:',
                    '    print("x is between 10 and 20")',
                    '',
                    'if not x > y:',
                    '    print("x is not greater than y")',
                ].join('\n'),
            }],
        },
        {
            id: 'conditional-expression',
            title: 'Conditional expression',
            examples: [{
                code: [
                    'age = 20',
                    'message = "Eligible" if age >= 18 else "Not eligible"',
                ].join('\n'),
            }],
        },
    ],
};

export default note;
