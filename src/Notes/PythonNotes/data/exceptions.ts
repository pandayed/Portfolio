import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'exceptions',
    title: 'Exceptions',
    summary: 'Handle expected failures without hiding unrelated errors.',
    updatedOn: '2026-10-01',
    sections: [
        {
            id: 'catch-value-error',
            title: 'Catch a specific exception',
            paragraphs: ['int raises ValueError when a string is not a valid integer. Catch that exact error when invalid input is expected.'],
            examples: [{
                code: [
                    'try:',
                    '    age = int(input("Age: "))',
                    'except ValueError:',
                    '    print("Enter a whole number")  # Enter a whole number (if input is not an integer)',
                ].join('\n'),
            }],
            exceptions: ['Do not catch Exception around a large block unless you can handle every error from that block. Broad catches can hide programming bugs.'],
        },
        {
            id: 'exception-object',
            title: 'Inspect the exception',
            examples: [{
                code: [
                    'try:',
                    '    age = int("unknown")',
                    'except ValueError as error:',
                    '    print(error)  # invalid literal for int() with base 10: \'unknown\'',
                    '    print(type(error))  # <class \'ValueError\'>',
                ].join('\n'),
            }],
        },
        {
            id: 'else-finally',
            title: 'try, except, else, and finally',
            paragraphs: [
                'Put the operation that may fail in try. A matching except handles an exception raised there. If no exception occurs in try, else runs. Finally runs after the handled path or the successful path, so use it for cleanup that must happen in either case.',
            ],
            bullets: [
                'Keep the try block narrow so it covers only the operation expected to fail.',
                'An exception that no except handles still propagates after finally runs.',
            ],
            examples: [{
                title: 'Valid input',
                code: [
                    'try:',
                    '    age = int("20")',
                    'except ValueError:',
                    '    print("Invalid age")',
                    'else:',
                    '    print(age)',
                    'finally:',
                    '    print("Finished")',
                ].join('\n'),
                result: '20 and Finished print on separate lines. The except block does not run.',
            }, {
                title: 'Invalid input',
                code: [
                    'try:',
                    '    age = int("bad")',
                    'except ValueError:',
                    '    print("Invalid age")',
                    'else:',
                    '    print(age)',
                    'finally:',
                    '    print("Finished")',
                ].join('\n'),
                result: 'Invalid age and Finished print on separate lines. The else block does not run.',
            }],
        },
        {
            id: 'raise',
            title: 'Raise an exception',
            examples: [{
                code: [
                    'def set_age(age):',
                    '    if age < 0:',
                    '        raise ValueError("age cannot be negative")',
                ].join('\n'),
            }],
        },
    ],
};

export default note;
