import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'exceptions',
    title: 'Exceptions',
    summary: 'Handle expected failures without hiding unrelated errors.',
    updatedOn: '2026-09-20',
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
                    '    print("Enter a whole number")',
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
                    '    print(error)',
                    '    print(type(error))',
                ].join('\n'),
            }],
        },
        {
            id: 'else-finally',
            title: 'else and finally',
            bullets: [
                'else runs only when the try block finishes without an exception.',
                'finally runs whether an exception occurred or not.',
                'Keep the try block narrow so it covers only the operation expected to fail.',
            ],
            examples: [{
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
