import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "runtime-and-first-program",
    "title": "How Python runs a .py file",
    "summary": "The compiler produces bytecode. The interpreter selects existing machine code that the CPU executes.",
    "updatedOn": "2026-10-03",
    "sections": [
        {
            "id": "source-and-machine-code",
            "title": "Compilation and execution",
            "bullets": [
                "CPython is the usual Python implementation installed with the standard Python distribution.",
                "A compiler converts source code, the Python text in a `.py` file, into bytecode.",
                "Bytecode tells the interpreter which operations to perform.",
                "In CPython’s usual interpreter path, bytecode is not converted into machine code.",
                "The installed CPython interpreter already contains machine code that implements Python operations.",
                "For each bytecode instruction, the interpreter selects the corresponding operation implementation from its own code.",
                "The CPU executes that machine code with the program’s values.",
                "The CPU does not execute bytecode directly."
            ]
        },
        {
            "id": "run-sequence",
            "title": "From a .py file to a running program",
            "diagram": "python-run-sequence"
        }
    ],
    "exampleLayout": "grouped"
};

export default note;
