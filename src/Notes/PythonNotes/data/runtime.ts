import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'runtime-and-first-program',
    title: 'Runtime and first program',
    summary: 'Write and run a Python file, then see how CPython turns its source into instructions.',
    updatedOn: '2026-09-29',
    sections: [
        {
            id: 'program-and-interpreter',
            title: 'A program needs something to run it',
            paragraphs: [
                'A Python program starts as source code: text that you write and save in a file such as main.py. The file contains instructions for Python, but saving it does not run those instructions.',
                'To run the file, you start a Python interpreter. The interpreter is a program that runs Python code. People use runtime to mean the period when a program is running. Runtime environment means the interpreter and the support it uses during that period.',
                'You can type Python instructions directly into an interactive prompt, or save them in a file and run that file. The example below uses a file because that is how most programs are run.',
            ],
        },
        {
            id: 'first-program',
            title: 'Write and run your first program',
            paragraphs: [
                'Create a file named main.py and put these lines in it. The first line asks Python to display text. The second line repeats a string three times. Text inside quotation marks is a string. Text after # is a comment for a person reading the file; Python does not run it.',
            ],
            examples: [{
                title: 'main.py',
                code: [
                    'print("Hello World")  # Hello World',
                    'print("Python " * 3)  # Python Python Python',
                    '',
                    '# This line is a comment.',
                ].join('\n'),
                result: 'It prints Hello World on the first line and Python Python Python on the second.',
            }, {
                title: 'Run it from a terminal',
                code: 'python3 main.py',
                result: 'The terminal starts Python, which reads main.py and displays the two lines of output.',
            }],
            bullets: [
                'Run the command from the folder that contains main.py, or give Python the file path.',
                'On some systems, the command is python instead of python3. The command must point to a Python 3 interpreter.',
                'If Python cannot find main.py, check the current folder and the spelling of the file name.',
            ],
        },
        {
            id: 'language-and-implementation',
            title: 'Python is a language; CPython runs it',
            paragraphs: [
                'Python is the language: it defines how code such as print("Hello World") should behave. An implementation is a program that follows those language rules and runs Python code.',
                'CPython is the most widely used Python implementation. When someone installs Python from python.org, they usually get CPython. The command python3 starts that implementation on many systems.',
                'Other implementations exist. PyPy includes a just-in-time compiler, which can make some workloads faster. Different implementations can use different internal ways to run the same Python program.',
            ],
            bullets: ['A CPython detail is not automatically a rule of the Python language. Other implementations may behave differently for implementation-specific details.'],
        },
        {
            id: 'source-to-bytecode',
            title: 'How CPython runs source code',
            paragraphs: [
                'CPython does not usually translate a .py file straight into a standalone program of CPU instructions. It first checks and compiles the source into Python bytecode. Bytecode is a set of lower-level instructions designed for CPython’s own interpreter.',
                'The interpreter reads those instructions and performs the work they describe. For example, it can load a value, add two values, store a result under a name, or call print. The computer’s CPU runs the CPython program; CPython interprets its bytecode as your program runs.',
                'This is a useful high-level picture: source code → CPython compiler → bytecode → CPython interpreter. The real process includes more steps, but these are the parts to understand first.',
            ],
            examples: [{
                title: 'One line of source code',
                code: [
                    'def add_numbers(first, second):',
                    '    total = first + second',
                    '    return total',
                ].join('\n'),
                result: 'CPython can turn this into bytecode instructions that load the two values, add them, and store the result under the name total.',
            }, {
                title: 'Ask Python to show the bytecode',
                code: [
                    'import dis',
                    '',
                    'def add_numbers(first, second):',
                    '    total = first + second',
                    '    return total',
                    '',
                    'dis.dis(add_numbers)',
                ].join('\n'),
                result: 'dis prints a readable listing of the instructions. The instruction names and listing can differ between Python versions.',
            }],
            bullets: [
                'Bytecode is not Python source code. People can read a disassembly, but they normally write and maintain the source code.',
                'Bytecode is not the same as native CPU instructions. It is for the Python interpreter to process.',
                'Python creates and runs the bytecode as part of running your program. You do not need to create a separate executable for this example.',
            ],
        },
        {
            id: 'bytecode-cache',
            title: 'What the .pyc file is for',
            paragraphs: [
                'When Python imports a module, it may save compiled bytecode in a .pyc file inside a folder named __pycache__. On a later import, Python can reuse that cached compilation when it is still valid. This can save compilation work.',
                'The cache is an implementation detail. You normally edit the .py source file, not the .pyc file. Running a script such as python3 main.py does not mean you need to find or run a .pyc file.',
            ],
            bullets: ['Bytecode depends on the implementation and can change between Python versions. Use dis to inspect it while learning; do not build application logic around exact instructions.'],
        },
    ],
};

export default note;
