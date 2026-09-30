import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'conditionals',
    title: 'Conditionals',
    summary: 'Choose branches with if, elif, and else, combine conditions, and select values with conditional expressions.',
    updatedOn: '2026-09-20',
    sections: [
        {
            id: 'if-elif-else',
            title: 'if, elif, and else',
            paragraphs: ['Python checks branches from top to bottom and runs the first matching branch. Order conditions so a specific condition is checked before a broader one.'],
            examples: [{
                code: [
                    'age = 46',
                    '',
                    'if age >= 45:',
                    '    print("45 or older")  # 45 or older (for age = 46)',
                    'elif age >= 18:',
                    '    print("Adult")  # Adult (when age is from 18 through 44)',
                    'else:',
                    '    print("Under 18")  # Under 18 (when age is below 18)',
                ].join('\n'),
            }],
        },
        {
            id: 'indentation-pass',
            title: 'Indentation and pass',
            bullets: [
                'Indentation defines a block.',
                'Use one consistent indentation style. Four spaces is the standard style.',
                'pass is a statement that does nothing. It can keep a block syntactically valid while it is empty.',
            ],
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
                    '    print("Both are true")  # Both are true (for x = 15 and y = 20)',
                    '',
                    'if 10 < x < 20:',
                    '    print("x is between 10 and 20")  # x is between 10 and 20 (for x = 15)',
                    '',
                    'if not x > y:',
                    '    print("x is not greater than y")  # x is not greater than y (for x = 15 and y = 20)',
                ].join('\n'),
            }],
        },
        {
            id: 'conditional-expression',
            title: 'Conditional expression (if-else expression)',
            paragraphs: ['A conditional expression chooses one of two values. Use it for a short choice; use an if statement when each branch needs multiple steps.'],
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
