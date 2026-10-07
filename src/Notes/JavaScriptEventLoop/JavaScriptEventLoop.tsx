import ArticleLayout from '../NoteArticleLayout';
import CodeBlock from '../../Blogs/ArticleLayout/CodeBlock';
import JavaScriptRunner from '../JavaScriptRunner/JavaScriptRunner';
import type { TocEntry } from '../../Blogs/ArticleLayout/types';
import {
    JAVASCRIPT_ASYNC_ROUTE,
    JAVASCRIPT_EVENT_LOOP_ROUTE,
    JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE,
    toHref,
} from '../../routing/routes';

const sections: TocEntry[] = [
    { id: 'execution-model', title: 'The execution model' },
    { id: 'tasks-and-microtasks', title: 'Tasks and microtasks' },
    { id: 'promises', title: 'What Promises schedule' },
    { id: 'async-await', title: 'How await resumes' },
    { id: 'timers', title: 'setTimeout and setInterval' },
    { id: 'browser-loop', title: 'The browser event loop' },
    { id: 'node-loop', title: 'The Node.js event loop' },
    { id: 'next-tick', title: 'process.nextTick' },
    { id: 'set-immediate', title: 'setImmediate and timers' },
    { id: 'execution-order', title: 'How to find the execution order' },
    { id: 'starvation', title: 'Starvation and blocking' },
    { id: 'common-mistakes', title: 'Common mistakes' },
];

const browserOrderExample = `console.log('script start');

setTimeout(() => console.log('timeout'), 0);

Promise.resolve().then(() => console.log('promise'));
queueMicrotask(() => console.log('microtask'));

console.log('script end');

// script start
// script end
// promise
// microtask
// timeout`;

const promiseExecutorExample = `console.log('A');

const promise = new Promise((resolve) => {
  console.log('B');       // executor runs now
  resolve('result');
});

promise.then((value) => {
  console.log('D', value); // reaction runs as a microtask
});

console.log('C');

// A
// B
// C
// D result`;

const nestedMicrotaskExample = `Promise.resolve().then(() => {
  console.log('microtask 1');
  queueMicrotask(() => console.log('microtask 3'));
});

queueMicrotask(() => console.log('microtask 2'));

// microtask 1
// microtask 2
// microtask 3`;

const awaitExample = `async function run() {
  console.log('inside 1');
  await 'already available';
  console.log('inside 2');
}

console.log('outside 1');
run();
console.log('outside 2');

// outside 1
// inside 1
// outside 2
// inside 2`;

const intervalExample = `// Risky: another tick can start while the previous request is pending.
const intervalId = setInterval(async () => {
  await refreshData();
}, 1000);

// Safer when each run must finish before the delay starts.
let stopped = false;
let timeoutId;

async function refreshLoop() {
  if (stopped) return;

  await refreshData();

  if (!stopped) {
    timeoutId = setTimeout(refreshLoop, 1000);
  }
}

refreshLoop();

// Later:
stopped = true;
clearInterval(intervalId);
clearTimeout(timeoutId);`;

const renderingExample = `button.addEventListener('click', () => {
  status.textContent = 'Working';

  queueMicrotask(() => {
    // This still runs before the browser gets a rendering opportunity.
    doExpensiveWork();
  });
});`;

const nextTickExample = `console.log('start');

process.nextTick(() => console.log('nextTick'));
queueMicrotask(() => console.log('microtask'));
Promise.resolve().then(() => console.log('promise'));

console.log('end');

// start
// end
// nextTick
// microtask
// promise`;

const immediateExample = `import { readFile } from 'node:fs';

// At top level, do not depend on which one runs first.
setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));

// Inside an I/O callback, setImmediate runs in the check phase
// before a zero-delay timer becomes eligible in a later timers phase.
readFile('data.txt', () => {
  setTimeout(() => console.log('timeout after I/O'), 0);
  setImmediate(() => console.log('immediate after I/O'));
});`;

const mixedOrderExample = `console.log('1');

setTimeout(() => {
  console.log('2');
  Promise.resolve().then(() => console.log('3'));
}, 0);

Promise.resolve()
  .then(() => {
    console.log('4');
    setTimeout(() => console.log('5'), 0);
  })
  .then(() => console.log('6'));

console.log('7');

// 1, 7, 4, 6, 2, 3, 5`;

const starvationExample = `function neverYieldToTasks() {
  queueMicrotask(neverYieldToTasks);
}

neverYieldToTasks();

// Timers, input, and rendering may never get a turn.`;

const JavaScriptEventLoop = () => (
    <ArticleLayout
        title="JavaScript Event Loop and Task Queues"
        route={JAVASCRIPT_EVENT_LOOP_ROUTE}
        sections={sections}
        backRoute={JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE}
        backLabel="Back to JavaScript and TypeScript notes"
    >
        <section className="Article__section">
            <ul className="Article__notes">
                <li>JavaScript finishes the current synchronous work before it runs queued work.</li>
                <li>Microtasks run after that work and before the next task.</li>
                <li>Browsers and Node.js use different task queues.</li>
                <li>For Promise chains, cancellation, retries, and concurrency, read the <a className="Link" href={toHref(JAVASCRIPT_ASYNC_ROUTE)}>asynchronous programming note</a>.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="execution-model">
            <h2 id="execution-model" className="SectionTitle">The execution model</h2>
            <ul className="Article__notes">
                <li>The call stack tracks function calls that have not returned.</li>
                <li>Each callback runs to completion. Another callback cannot interrupt it.</li>
                <li>The host environment, such as a browser or Node.js, manages timers, input, network operations, and file operations.</li>
            </ul>
            <ol className="Article__steps">
                <li>Run the current script or callback until the call stack is empty.</li>
                <li>Run the queued microtasks until the microtask queue is empty.</li>
                <li>Let the host perform its next event-loop step.</li>
                <li>Run the next eligible task or callback.</li>
                <li>Run all queued microtasks again before moving on.</li>
            </ol>
            <ul className="Article__notes">
                <li>The event loop does not speed up slow JavaScript code.</li>
                <li>A long calculation blocks other callbacks on the same event-loop thread.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="tasks-and-microtasks">
            <h2 id="tasks-and-microtasks" className="SectionTitle">Tasks and microtasks</h2>
            <ul className="Article__notes">
                <li>A <strong>task</strong> is work scheduled by the host, such as a timer callback.</li>
                <li>A <strong>microtask</strong> is queued work that runs before the next task, such as a Promise handler.</li>
                <li>Tutorials often use <strong>macrotask</strong> to mean a normal task.</li>
                <li>The host can have several task sources or phases. There is no single universal macrotask queue with a fixed priority.</li>
            </ul>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead>
                        <tr><th scope="col">Work</th><th scope="col">Browser</th><th scope="col">Node.js</th></tr>
                    </thead>
                    <tbody>
                        <tr><th scope="row">Current script or callback</th><td>Runs now on the stack.</td><td>Runs now on the stack.</td></tr>
                        <tr><th scope="row">Promise reaction</th><td>Microtask.</td><td>Microtask.</td></tr>
                        <tr><th scope="row"><code>queueMicrotask</code></th><td>Microtask.</td><td>Microtask.</td></tr>
                        <tr><th scope="row">Code after <code>await</code></th><td>Promise microtask.</td><td>Promise microtask.</td></tr>
                        <tr><th scope="row"><code>setTimeout</code> / <code>setInterval</code></th><td>Timer task.</td><td>Timers phase callback.</td></tr>
                        <tr><th scope="row">User and DOM events</th><td>Tasks from browser task sources.</td><td>Not a Node.js DOM concept.</td></tr>
                        <tr><th scope="row"><code>process.nextTick</code></th><td>Not available.</td><td>Special next-tick queue.</td></tr>
                        <tr><th scope="row"><code>setImmediate</code></th><td>Not a standard browser API.</td><td>Check phase callback.</td></tr>
                    </tbody>
                </table>
            </div>
            <JavaScriptRunner>{browserOrderExample}</JavaScriptRunner>
            <ul className="Article__notes">
                <li>Microtasks in the same queue run in the order they were added.</li>
                <li>A microtask can add another microtask. The runtime runs all of them before the next task.</li>
            </ul>
            <JavaScriptRunner>{nestedMicrotaskExample}</JavaScriptRunner>
        </section>

        <section className="Article__section" aria-labelledby="promises">
            <h2 id="promises" className="SectionTitle">What Promises schedule</h2>
            <ul className="Article__notes">
                <li>The Promise executor is the function passed to <code>new Promise</code>. It runs immediately and synchronously.</li>
                <li>Promise reactions are the callbacks passed to <code>then</code>, <code>catch</code>, and <code>finally</code>. They run later as microtasks.</li>
            </ul>
            <JavaScriptRunner>{promiseExecutorExample}</JavaScriptRunner>
            <ul className="Article__notes">
                <li>Settling a Promise records its result. It does not run a handler on the current stack.</li>
                <li>A handler attached to an already-settled Promise still runs as a microtask.</li>
                <li>Each <code>then</code> call creates a new Promise and queues its reaction only when the previous Promise settles.</li>
                <li><code>Promise.resolve(value)</code> alone does not run application code. A reaction or <code>await</code> continuation is the queued work.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="async-await">
            <h2 id="async-await" className="SectionTitle">How await resumes</h2>
            <ul className="Article__notes">
                <li>An async function runs synchronously until it reaches <code>await</code>.</li>
                <li>It then returns a pending Promise to its caller.</li>
                <li>The code after <code>await</code> resumes in a Promise microtask. This also happens when the awaited value is already available.</li>
            </ul>
            <JavaScriptRunner>{awaitExample}</JavaScriptRunner>
            <ul className="Article__notes">
                <li><code>await</code> pauses one async function. It does not block the thread or create a new thread.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="timers">
            <h2 id="timers" className="SectionTitle">setTimeout and setInterval</h2>
            <ul className="Article__notes">
                <li>A timer delay is the minimum wait before its callback becomes eligible to run.</li>
                <li>The callback can run later because of current work, queued microtasks, other eligible work, browser throttling, or runtime limits.</li>
                <li><code>setTimeout(callback, 0)</code> queues future task work. It never interrupts the current stack.</li>
                <li><code>setInterval</code> schedules repeated timer work. It does not wait for an async callback's Promise.</li>
                <li>Use <code>clearTimeout</code> and <code>clearInterval</code> when the owner no longer needs the timer.</li>
                <li>Use recursive <code>setTimeout</code> when the next delay should start after the previous async operation finishes.</li>
            </ul>
            <CodeBlock language="javascript">{intervalExample}</CodeBlock>
        </section>

        <section className="Article__section" aria-labelledby="browser-loop">
            <h2 id="browser-loop" className="SectionTitle">The browser event loop</h2>
            <ol className="Article__steps">
                <li>Run one task, such as a script, timer callback, or event callback.</li>
                <li>Run all queued microtasks, including those added by other microtasks.</li>
                <li>The browser may update layout and paint if it has a rendering opportunity.</li>
                <li>Choose the next runnable task and repeat.</li>
            </ol>
            <ul className="Article__notes">
                <li>A microtask runs before the browser can paint the next update.</li>
                <li>A long microtask delays rendering, just as long synchronous code does.</li>
            </ul>
            <CodeBlock language="javascript">{renderingExample}</CodeBlock>
            <ul className="Article__notes">
                <li>Use <code>requestAnimationFrame</code> for work tied to the next visual update.</li>
                <li>Move long calculations to a worker when they must not block the main thread. A worker runs code on a separate thread.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="node-loop">
            <h2 id="node-loop" className="SectionTitle">The Node.js event loop</h2>
            <ul className="Article__notes">
                <li>Node.js uses event-loop phases instead of a browser rendering cycle.</li>
                <li>The main phases shown here are timers, poll, check, and close callbacks.</li>
                <li>Node can use a worker pool for selected input/output (I/O) work, such as file operations and DNS lookups, and for cryptography and compression.</li>
                <li>The JavaScript callbacks for completed work still run on the event-loop thread.</li>
            </ul>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">Phase</th><th scope="col">Typical work</th></tr></thead>
                    <tbody>
                        <tr><th scope="row">Timers</th><td>Eligible <code>setTimeout</code> and <code>setInterval</code> callbacks.</td></tr>
                        <tr><th scope="row">Poll</th><td>Receive new I/O events and run many I/O callbacks.</td></tr>
                        <tr><th scope="row">Check</th><td>Run <code>setImmediate</code> callbacks.</td></tr>
                        <tr><th scope="row">Close callbacks</th><td>Run selected close-event callbacks.</td></tr>
                    </tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li>This list simplifies the Node.js phases. It is not a complete description of the implementation.</li>
                <li>Use an explicit Promise, event, or callback to wait for completion. Do not depend on internal phase details.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="next-tick">
            <h2 id="next-tick" className="SectionTitle">process.nextTick</h2>
            <ul className="Article__notes">
                <li><code>process.nextTick</code> is a Node.js API.</li>
                <li>Its callback runs after the current operation finishes and before Node continues the event loop.</li>
                <li>After a normal callback, Node runs the next-tick queue before the Promise microtask queue.</li>
            </ul>
            <CodeBlock language="javascript">{nextTickExample}</CodeBlock>
            <ul className="Article__notes">
                <li>Recursive next-tick callbacks can prevent Promise reactions, timers, and I/O from running.</li>
                <li>A next-tick callback added inside a Promise microtask does not interrupt the microtask queue already running.</li>
                <li>Use <code>queueMicrotask</code> for microtask scheduling that works across browsers and Node.js.</li>
                <li>Use <code>process.nextTick</code> when its Node.js ordering is required.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="set-immediate">
            <h2 id="set-immediate" className="SectionTitle">setImmediate and timers</h2>
            <ul className="Article__notes">
                <li><code>setImmediate</code> is a Node.js API. Its callbacks run in the check phase, after poll.</li>
                <li>A zero-delay timer runs when it is eligible and Node reaches the timers phase.</li>
            </ul>
            <CodeBlock language="javascript">{immediateExample}</CodeBlock>
            <ul className="Article__notes">
                <li>At the top level, runtime timing can change the order of <code>setTimeout(..., 0)</code> and <code>setImmediate</code>.</li>
                <li>Inside the I/O callback shown above, <code>setImmediate</code> runs before the zero-delay timer.</li>
                <li>Use an explicit completion signal when one operation must wait for another.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="execution-order">
            <h2 id="execution-order" className="SectionTitle">How to find the execution order</h2>
            <ol className="Article__steps">
                <li>Write every synchronous log in call-stack order.</li>
                <li>Record each Promise reaction, <code>queueMicrotask</code> callback, and continuation after <code>await</code>.</li>
                <li>For Node.js, record <code>process.nextTick</code> callbacks separately.</li>
                <li>Record timers, events, I/O callbacks, and <code>setImmediate</code> in their host queues or phases.</li>
                <li>Run the applicable next-tick and microtask queues when the current callback ends.</li>
                <li>Take the next eligible host task or phase callback. Then check those queues again.</li>
            </ol>
            <JavaScriptRunner>{mixedOrderExample}</JavaScriptRunner>
            <ul className="Article__notes">
                <li>The timer that prints <code>5</code> is added after the timer that prints <code>2</code>, but before that first timer runs.</li>
                <li>The microtask that prints <code>3</code> runs after its timer callback and before the next task.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="starvation">
            <h2 id="starvation" className="SectionTitle">Starvation and blocking</h2>
            <ul className="Article__notes">
                <li>Starvation means that queued work cannot run because other work keeps running first.</li>
                <li>The runtime runs microtasks until their queue is empty.</li>
                <li>A microtask that keeps adding another microtask can prevent timers, input, I/O, and browser rendering from running.</li>
            </ul>
            <CodeBlock language="javascript">{starvationExample}</CodeBlock>
            <ul className="Article__notes">
                <li>Keep synchronous callbacks and microtasks short.</li>
                <li>Do not split CPU-heavy work into an endless microtask chain.</li>
                <li>Schedule the next part as a host task so other work can run first.</li>
                <li>Use browser workers or Node.js worker threads for suitable CPU-heavy work.</li>
            </ul>
        </section>

        <section className="Article__section" aria-labelledby="common-mistakes">
            <h2 id="common-mistakes" className="SectionTitle">Common mistakes</h2>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">Mistake</th><th scope="col">Correct rule</th></tr></thead>
                    <tbody>
                        <tr><th scope="row">A Promise runs everything asynchronously.</th><td>The executor runs now. Its reactions run as microtasks.</td></tr>
                        <tr><th scope="row">A zero-delay timer runs immediately.</th><td>It becomes eligible after a minimum delay and waits for earlier work.</td></tr>
                        <tr><th scope="row">All asynchronous callbacks share one queue.</th><td>Microtasks and host tasks use different queues. Node.js also uses phases and a next-tick queue.</td></tr>
                        <tr><th scope="row">Microtasks always improve responsiveness.</th><td>Long or recursive microtasks delay other work.</td></tr>
                        <tr><th scope="row"><code>setInterval</code> waits for an async callback.</th><td>It does not inspect the returned Promise. Async operations can overlap.</td></tr>
                        <tr><th scope="row"><code>setImmediate</code> is always before <code>setTimeout(0)</code>.</th><td>The order depends on where they are scheduled.</td></tr>
                        <tr><th scope="row"><code>await</code> blocks JavaScript.</th><td>It suspends one async function and schedules its continuation.</td></tr>
                    </tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li>Read the <a className="Link" href="https://html.spec.whatwg.org/multipage/webappapis.html#event-loops">HTML event-loop model</a> for browser specification details.</li>
                <li>Read the <a className="Link" href="https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick">Node.js event-loop guide</a> for Node.js details.</li>
            </ul>
        </section>
    </ArticleLayout>
);

export default JavaScriptEventLoop;
