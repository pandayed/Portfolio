import { useEffect, useId, useRef, useState } from 'react';

import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import sandboxDocument from './javascriptSandbox.html?raw';
import './JavaScriptRunner.css';

interface JavaScriptRunnerProps {
    children: string;
}

interface OutputEntry {
    level: string;
    text: string;
}

type RunStatus = 'ready' | 'running' | 'complete' | 'stopped' | 'error';

const statusLabels: Record<RunStatus, string> = {
    ready: 'Ready',
    running: 'Running…',
    complete: 'Finished',
    stopped: 'Stopped',
    error: 'Error',
};

const JavaScriptRunner = ({ children }: JavaScriptRunnerProps) => {
    const id = useId();
    const [code, setCode] = useState(children);
    const [editing, setEditing] = useState(false);
    const [output, setOutput] = useState<OutputEntry[]>([]);
    const [status, setStatus] = useState<RunStatus>('ready');
    const [run, setRun] = useState<{ code: string; id: number } | null>(null);
    const frameRef = useRef<HTMLIFrameElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();
    const nextRunId = useRef(0);
    const activeRun = useRef(false);

    const dispose = () => {
        activeRun.current = false;
        clearTimeout(timerRef.current);
        frameRef.current?.contentWindow?.postMessage({ type: 'stop' }, '*');
    };

    useEffect(() => {
        const receive = (event: MessageEvent) => {
            if (!activeRun.current || event.source !== frameRef.current?.contentWindow) return;
            const data: unknown = event.data;
            if (!data || typeof data !== 'object' || !('type' in data)) return;
            if (data.type === 'output' && 'text' in data && typeof data.text === 'string') {
                const level = 'level' in data && typeof data.level === 'string' ? data.level : 'log';
                const text = data.text.slice(0, 4000);
                setOutput((entries) => [...entries.slice(-199), { level, text }]);
            } else if (data.type === 'clear') {
                setOutput([]);
            } else if (data.type === 'done' || data.type === 'error' || data.type === 'limit') {
                dispose();
                if ('text' in data && typeof data.text === 'string' && data.text) {
                    const text = data.text.slice(0, 4000);
                    setOutput((entries) => [...entries, { level: data.type === 'error' ? 'error' : 'info', text }]);
                }
                setStatus(data.type === 'done' ? 'complete' : data.type === 'error' ? 'error' : 'stopped');
                setRun(null);
            }
        };
        window.addEventListener('message', receive);
        return () => {
            window.removeEventListener('message', receive);
            dispose();
        };
    }, []);

    const start = () => {
        dispose();
        setOutput([]);
        setStatus('running');
        activeRun.current = true;
        setRun({ code, id: ++nextRunId.current });
        timerRef.current = setTimeout(() => {
            dispose();
            setRun(null);
            setStatus('stopped');
            setOutput((entries) => [...entries, { level: 'info', text: 'Stopped after 10 seconds. Check for a loop, interval, or unfinished Promise.' }]);
        }, 10_000);
    };

    const stop = () => {
        dispose();
        setRun(null);
        setStatus('stopped');
    };

    const reset = () => {
        dispose();
        setRun(null);
        setCode(children);
        setEditing(false);
        setOutput([]);
        setStatus('ready');
    };

    return (
        <div className="JavaScriptRunner">
            <div className="JavaScriptRunner__toolbar">
                <span className="JavaScriptRunner__label">Try this JavaScript</span>
                <div className="JavaScriptRunner__actions">
                    <button type="button" className="JavaScriptRunner__button" disabled={status === 'running'} onClick={start}>Run</button>
                    {status === 'running' && <button type="button" className="JavaScriptRunner__button" onClick={stop}>Stop</button>}
                    <button type="button" className="JavaScriptRunner__button" aria-pressed={editing} aria-controls={`${id}-code`} onClick={() => setEditing((value) => !value)}>
                        {editing ? 'View code' : 'Edit code'}
                    </button>
                    <button type="button" className="JavaScriptRunner__button" onClick={reset}>Reset</button>
                </div>
            </div>
            <div id={`${id}-code`}>
                {editing ? (
                    <textarea
                        className="Article__code JavaScriptRunner__editor"
                        aria-label="JavaScript code"
                        aria-describedby={`${id}-help`}
                        value={code}
                        rows={Math.min(24, Math.max(6, code.split('\n').length))}
                        spellCheck={false}
                        autoCapitalize="off"
                        autoCorrect="off"
                        wrap="off"
                        onChange={(event) => setCode(event.target.value)}
                    />
                ) : <CodeBlock language="javascript">{code}</CodeBlock>}
            </div>
            <p id={`${id}-help`} className="JavaScriptRunner__help">
                Runs locally in your browser. Use console.log to show output. No network, page DOM, or Node.js APIs. Stops after 10 seconds.
            </p>
            <div className="JavaScriptRunner__outputHeader">
                <span id={`${id}-output`} className="JavaScriptRunner__label">Output</span>
                <span className="JavaScriptRunner__status" role="status">{statusLabels[status]}</span>
            </div>
            <pre className="Article__code JavaScriptRunner__output" aria-labelledby={`${id}-output`} tabIndex={0}>
                {output.length ? output.map((entry, index) => (
                    <span className="JavaScriptRunner__entry" key={index}>
                        {['warn', 'error'].includes(entry.level) ? `${entry.level}: ` : ''}{entry.text}{'\n'}
                    </span>
                )) : status === 'complete' ? 'No console output.' : status === 'running' ? 'Waiting for output…' : 'Run the code to see its output.'}
            </pre>
            {run && (
                <iframe
                    key={run.id}
                    ref={frameRef}
                    title="Isolated JavaScript runner"
                    sandbox="allow-scripts"
                    srcDoc={sandboxDocument}
                    hidden
                    onLoad={() => frameRef.current?.contentWindow?.postMessage({ type: 'run', code: run.code }, '*')}
                />
            )}
        </div>
    );
};

export default JavaScriptRunner;
