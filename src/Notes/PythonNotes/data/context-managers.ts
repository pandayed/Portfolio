import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'context-managers',
    title: 'Context managers and with',
    summary: 'Use with to set up and clean up resources, and implement __enter__ and __exit__.',
    updatedOn: '2026-10-01',
    sections: [
        {
            id: 'with-file',
            title: 'Close a file with with',
            paragraphs: [
                'A context manager sets up a resource before a block and cleans it up when the block exits. The Python with statement calls that setup and cleanup for you.',
                'open returns a file object that is a context manager. Its exit step closes the file even if reading the file raises an exception.',
            ],
            examples: [{
                title: 'Write and read a file',
                code: [
                    'with open("file.txt", "w", encoding="utf-8") as file:',
                    '    file.write("Hello")',
                    '',
                    'with open("file.txt", "r", encoding="utf-8") as file:',
                    '    data = file.read()',
                    '',
                    'print(data)  # Hello',
                    'print(file.closed)  # True',
                ].join('\n'),
                result: 'The first block creates file.txt. The second reads Hello. The file is closed after its with block.',
            }],
        },
        {
            id: 'protocol',
            title: 'What with calls',
            bullets: [
                'Python evaluates the expression after with to obtain a context manager.',
                'It calls the manager’s __enter__() method. The value returned by __enter__() is assigned to the name after as.',
                'If __enter__() raises an exception, the block does not start and Python does not call that manager’s __exit__().',
                'It runs the body, then calls __exit__(exc_type, exc_value, traceback) when the body leaves. This happens on normal completion, return, or an exception.',
                'On normal completion, all three exception arguments are None. On an exception, they describe that exception.',
                'If __exit__ returns a true value for an exception, with suppresses it. Returning False or None lets the exception propagate.',
            ],
            paragraphs: [[
                'The ',
                { text: 'with statement reference', href: 'https://docs.python.org/3/reference/compound_stmts.html#the-with-statement' },
                ' specifies the execution order and exception behavior.',
            ]],
        },
        {
            id: 'custom',
            title: 'Write a context manager',
            paragraphs: [
                'Define __enter__ for setup and __exit__ for cleanup. This example records when a block starts and ends. It returns False so an exception in the block remains visible to the caller.',
            ],
            examples: [{
                title: 'A small custom manager',
                code: [
                    'class Session:',
                    '    def __enter__(self):',
                    '        print("start")  # start',
                    '        return self',
                    '',
                    '    def __exit__(self, exc_type, exc_value, traceback):',
                    '        print("finish")  # finish',
                    '        return False',
                    '',
                    'with Session() as session:',
                    '    print(isinstance(session, Session))  # True',
                ].join('\n'),
                result: 'The lines print in this order: start, True, finish. __exit__ runs after the block.',
            }, {
                title: 'Cleanup also runs when the block fails',
                code: [
                    'try:',
                    '    with Session():',
                    '        raise ValueError("bad value")',
                    'except ValueError as error:',
                    '    print(error)  # bad value',
                ].join('\n'),
                result: 'With the Session class above, the lines print in this order: start, finish, bad value. False from __exit__ allows ValueError to reach except.',
            }],
        },
    ],
};

export default note;
