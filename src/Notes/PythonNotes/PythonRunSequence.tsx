import './PythonRunSequence.css';

const steps = [
    {
        title: 'Source code in main.py',
        code: 'print("Hello")',
        detail: 'You write Python instructions as text.',
    },
    {
        title: 'CPython compiler',
        detail: 'It converts the Python source code into bytecode.',
    },
    {
        title: 'Bytecode',
        detail: 'Instructions that tell the interpreter which operations to perform. The CPU does not execute these directly.',
    },
    {
        title: 'CPython’s bytecode interpreter',
        detail: 'The machine code for Python operations comes with the interpreter. It selects the implementation for each requested operation, and the CPU executes that code with your program’s values.',
    },
    {
        title: 'Program result',
        code: 'Hello',
        detail: 'The example displays Hello.',
    },
] as const;

const PythonRunSequence = () => (
    <figure className="PythonRunSequence" aria-label="The usual CPython execution path">
        <ol className="PythonRunSequence__steps">
            {steps.map((step) => (
                <li className="PythonRunSequence__step" key={step.title}>
                    <h3 className="Article__subTitle">{step.title}</h3>
                    {'code' in step && <code className="PythonRunSequence__code">{step.code}</code>}
                    <p>{step.detail}</p>
                </li>
            ))}
        </ol>
    </figure>
);

export default PythonRunSequence;
