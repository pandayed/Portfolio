import './PythonRunSequence.css';

const participants = [
    { x: 100, title: 'Terminal / shell', detail: 'command → output' },
    { x: 320, title: 'Operating system', detail: 'process + I/O' },
    { x: 540, title: 'File system', detail: 'main.py → source' },
    { x: 770, title: 'CPython compiler', detail: 'source → bytecode' },
    { x: 1010, title: 'Bytecode interpreter', detail: 'bytecode → operations' },
    { x: 1250, title: 'CPU', detail: 'machine code → results' },
] as const;

const PythonRunSequence = () => (
    <div className="PythonRunSequence">
        <svg
            className="PythonRunSequence__svg"
            viewBox="0 0 1400 860"
            role="img"
            aria-labelledby="python-run-title python-run-description"
        >
            <title id="python-run-title">What happens when you run python main.py with CPython</title>
            <desc id="python-run-description">
                The shell asks the operating system to start Python with main.py. The CPython compiler
                reads the source from the file system and produces a code object containing bytecode.
                The bytecode interpreter consumes the bytecode. The CPU executes CPython native machine
                instructions and returns results. Program output goes through the operating system to
                the terminal, and the process exits.
            </desc>
            <defs>
                <marker
                    id="python-run-arrow"
                    viewBox="0 0 10 10"
                    refX="9"
                    refY="5"
                    markerWidth="7"
                    markerHeight="7"
                    orient="auto-start-reverse"
                >
                    <path d="M 0 0 L 10 5 L 0 10 z" className="PythonRunSequence__arrowHead" />
                </marker>
            </defs>

            <text x="700" y="28" textAnchor="middle" className="PythonRunSequence__caption">
                Simplified CPython execution path
            </text>

            {participants.map(({ x, title, detail }) => (
                <g key={title}>
                    <rect
                        x={x - 95}
                        y="50"
                        width="190"
                        height="72"
                        rx="4"
                        className="PythonRunSequence__participant"
                    />
                    <text x={x} y="78" textAnchor="middle" className="PythonRunSequence__heading">
                        {title}
                    </text>
                    <text x={x} y="103" textAnchor="middle" className="PythonRunSequence__detail">
                        {detail}
                    </text>
                    <line x1={x} y1="122" x2={x} y2="805" className="PythonRunSequence__lifeline" />
                </g>
            ))}

            <text x="210" y="155" textAnchor="middle" className="PythonRunSequence__code">
                Start process: python main.py
            </text>
            <line x1="100" y1="172" x2="320" y2="172" className="PythonRunSequence__message" markerEnd="url(#python-run-arrow)" />

            <text x="545" y="215" textAnchor="middle" className="PythonRunSequence__code">
                New CPython process; file path: main.py
            </text>
            <line x1="320" y1="232" x2="770" y2="232" className="PythonRunSequence__message" markerEnd="url(#python-run-arrow)" />

            <text x="655" y="275" textAnchor="middle" className="PythonRunSequence__code">Read: main.py</text>
            <line x1="770" y1="292" x2="540" y2="292" className="PythonRunSequence__message" markerEnd="url(#python-run-arrow)" />

            <text x="655" y="335" textAnchor="middle" className="PythonRunSequence__code">
                Source text: print(&quot;Hello&quot;)
            </text>
            <line x1="540" y1="352" x2="770" y2="352" className="PythonRunSequence__message PythonRunSequence__return" markerEnd="url(#python-run-arrow)" />

            <text x="890" y="405" textAnchor="middle">Code object: bytecode + constants</text>
            <line x1="770" y1="422" x2="1010" y2="422" className="PythonRunSequence__message" markerEnd="url(#python-run-arrow)" />

            <text x="1130" y="475" textAnchor="middle">CPython native machine instructions</text>
            <line x1="1010" y1="492" x2="1250" y2="492" className="PythonRunSequence__message" markerEnd="url(#python-run-arrow)" />

            <text x="1130" y="535" textAnchor="middle">Completed operations and values</text>
            <line x1="1250" y1="552" x2="1010" y2="552" className="PythonRunSequence__message PythonRunSequence__return" markerEnd="url(#python-run-arrow)" />

            <text x="665" y="605" textAnchor="middle" className="PythonRunSequence__code">stdout bytes: Hello\n</text>
            <line x1="1010" y1="622" x2="320" y2="622" className="PythonRunSequence__message" markerEnd="url(#python-run-arrow)" />

            <text x="210" y="665" textAnchor="middle" className="PythonRunSequence__code">Visible output: Hello</text>
            <line x1="320" y1="682" x2="100" y2="682" className="PythonRunSequence__message" markerEnd="url(#python-run-arrow)" />

            <text x="665" y="725" textAnchor="middle">Exit status: 0</text>
            <line x1="1010" y1="742" x2="320" y2="742" className="PythonRunSequence__message PythonRunSequence__return" markerEnd="url(#python-run-arrow)" />

            <text x="210" y="785" textAnchor="middle">Process finished; prompt ready</text>
            <line x1="320" y1="802" x2="100" y2="802" className="PythonRunSequence__message PythonRunSequence__return" markerEnd="url(#python-run-arrow)" />

            <text x="700" y="842" textAnchor="middle" className="PythonRunSequence__note">
                Bytecode goes to the bytecode interpreter. The CPU receives and executes native CPython machine code.
            </text>
        </svg>
    </div>
);

export default PythonRunSequence;
