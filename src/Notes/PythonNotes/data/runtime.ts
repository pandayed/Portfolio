import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'runtime-and-first-program',
    title: 'What happens when you run python main.py',
    summary: 'See how source code moves through CPython, becomes bytecode, runs on the CPU, and produces output.',
    updatedOn: '2026-10-02',
    sections: [{
        id: 'run-sequence',
        title: 'From source code to output',
        diagram: 'python-run-sequence',
    }],
};

export default note;
