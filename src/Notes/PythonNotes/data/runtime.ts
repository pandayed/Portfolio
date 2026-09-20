import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'runtime-and-first-program',
    title: 'Runtime and first program',
    summary: 'Print values, write comments, and understand what CPython runs.',
    updatedOn: '2026-09-20',
    sections: [
        {
            id: 'first-program',
            title: 'First program',
            bullets: [
                'print writes a value to standard output.',
                'A hash starts a comment. Python ignores the rest of that line.',
                'Multiplying a string repeats it.',
            ],
            examples: [{
                code: [
                    'print("Hello World")',
                    'print("Python " * 3)',
                    '',
                    '# This line is a comment.',
                ].join('\n'),
                result: 'Hello World, followed by Python Python Python',
            }],
        },
        {
            id: 'implementations',
            title: 'Python implementations',
            bullets: [
                'CPython is the standard implementation and is written mainly in C.',
                'PyPy uses a just-in-time compiler and can make some programs faster.',
                'Jython runs Python code on the Java Virtual Machine.',
                'IronPython targets the .NET runtime.',
            ],
            exceptions: [
                'Python is a language. CPython is one implementation. Behaviour defined by the language should not be confused with a CPython implementation detail.',
            ],
        },
        {
            id: 'execution',
            title: 'What CPython runs',
            paragraphs: [
                'CPython normally compiles source code to Python bytecode and executes that bytecode in its virtual machine. This is different from producing a standalone CPU-specific executable like a typical C compiler.',
            ],
            examples: [{
                title: 'Run a file',
                code: 'python3 main.py',
            }],
            exceptions: [
                'The exact bytecode is an implementation detail and can change between Python versions. Do not depend on it for normal application logic.',
            ],
        },
    ],
};

export default note;
