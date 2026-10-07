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
    { id: 'execution-model', title: 'Synchronous calls finish before queued callbacks' },
    { id: 'tasks-and-microtasks', title: 'Tasks and microtasks run at different times' },
    { id: 'promises', title: 'Promise executors run now; handlers run later' },
    { id: 'async-await', title: 'await resumes through a Promise microtask' },
    { id: 'timers', title: 'Timers wait for an eligible callback turn' },
    { id: 'browser-loop', title: 'The browser drains microtasks before rendering' },
    { id: 'node-loop', title: 'Node.js schedules I/O and callbacks through phases' },
    { id: 'next-tick', title: 'nextTick ordering depends on the scheduling context' },
    { id: 'set-immediate', title: 'setImmediate and zero-delay timers have context-dependent order' },
    { id: 'execution-order', title: 'Follow when each handler is queued' },
    { id: 'starvation', title: 'A queue that never empties postpones other work' },
    { id: 'common-mistakes', title: 'Compare the behavior shown by the examples' },
];

const executionExample = `function inner() { console.log('inner'); }
function outer() {
  console.log('outer start');
  inner(); // outer has not returned while inner is on the stack
  console.log('outer end');
}
setTimeout(() => console.log('timer'), 0);
outer();
console.log('script end');
// outer start, inner, outer end, script end, timer`;

const blockingExample = `const start = performance.now();
setTimeout(() => console.log('timer'), 0);
while (performance.now() - start < 30) { /* brief blocking demo */ }
console.log('calculation finished');
// calculation finished, then timer
// The host can track the timer while JavaScript is busy,
// but its JavaScript callback cannot interrupt this calculation.`;

const browserOrderExample = `console.log('script start');
setTimeout(() => console.log('timeout'), 0);
Promise.resolve().then(() => console.log('promise'));
queueMicrotask(() => console.log('microtask'));
console.log('script end');
// script start, script end, promise, microtask, timeout`;

const nestedMicrotaskExample = `setTimeout(() => console.log('task'), 0);
Promise.resolve().then(() => {
  console.log('microtask 1');
  queueMicrotask(() => console.log('microtask 3'));
});
queueMicrotask(() => console.log('microtask 2'));
// microtask 1, microtask 2, microtask 3, task`;

const eventDispatchExample = `const target = new EventTarget();
target.addEventListener('update', () => console.log('listener'));
console.log('before dispatch');
target.dispatchEvent(new Event('update'));
console.log('after dispatch');
// before dispatch, listener, after dispatch
// Programmatic dispatch is synchronous. It does not queue
// the listener as a new task just because it is an event listener.`;

const differentSourcesExample = `// Browser setup: run on a page with a loaded body, then click the button.
const button = document.createElement('button');
button.textContent = 'Click';
document.body.append(button);
button.addEventListener('click', () => console.log('user click task'));
setTimeout(() => console.log('timer task'), 1000);
// Clicking before the timer callback runs prints the click first.
// Clicking after it runs prints the timer first.
// Different task sources do not give every event a universal priority.`;

const environmentExample = `// Run these checks on a standard browser page:
console.log(typeof document); // object
console.log(typeof process); // undefined
console.log(typeof setImmediate); // undefined
console.log(typeof queueMicrotask); // function

// Run the same checks in a normal Node.js file without DOM shims:
// undefined, object, function, function
// Node provides process.nextTick and setImmediate. A browser page
// provides document. Promise and queueMicrotask exist in both.`;

const promiseExecutorExample = `console.log('A');
const promise = new Promise((resolve) => {
  console.log('B');
  resolve('result');
});
promise.then((value) => console.log('D', value));
console.log('C');
// A, B, C, D result: resolving did not call the handler inline.`;

const promiseChainExample = `Promise.resolve('ready'); // no application callback supplied
const fulfilled = Promise.resolve('value');
fulfilled.then((value) => console.log('then', value));
Promise.reject(new Error('failure'))
  .catch((error) => console.log('catch', error.message))
  .finally(() => console.log('finally'));
console.log('synchronous end');
// synchronous end, then value, catch failure, finally
// finally is queued after catch completes; it is not queued
// at the same time as catch just because the chain was written together.`;

const awaitExample = `async function run() {
  console.log('inside 1');
  const value = await 'available';
  console.log('inside 2', value);
}
console.log('outside 1');
const pending = run();
console.log(pending instanceof Promise); // true
console.log('outside 2');
pending.then(() => console.log('function completed'));
// outside 1, inside 1, true, outside 2,
// inside 2 available, function completed`;

const timerExample = `const start = performance.now();
const cancelled = setTimeout(() => console.log('cancelled callback'), 0);
clearTimeout(cancelled);
setTimeout(() => {
  console.log('timer waited for the current work');
  console.log(performance.now() - start >= 30); // true
}, 0);
while (performance.now() - start < 30) { /* brief blocking demo */ }
console.log('script finished');
// script finished, timer waited for the current work, true
// cancelled callback never prints. Exact elapsed time is variable.`;

const intervalExample = `let tick = 0;
const completions = [];
const intervalId = setInterval(async () => {
  const current = ++tick;
  console.log('start', current);
  const pending = new Promise((resolve) => completions.push(resolve));
  if (current === 2) {
    clearInterval(intervalId);
    completions.forEach((resolve) => resolve());
  }
  await pending;
  console.log('finish', current);
}, 10);
// start 1, start 2, finish 1, finish 2
// Tick 2 started while tick 1 was suspended at await.
// JavaScript callbacks did not execute simultaneously.`;

const recursiveTimeoutExample = `let run = 0;
let stopped = false;
let timeoutId;
async function refresh() {
  const current = ++run;
  console.log('start', current);
  await new Promise((resolve) => setTimeout(resolve, 10));
  console.log('finish', current);
  if (current === 2) stopped = true;
  if (!stopped) timeoutId = setTimeout(() => refresh().catch(console.error), 10);
}
refresh().catch(console.error);
// start 1, finish 1, start 2, finish 2
// The next delay begins after the previous operation finishes.
// Owner cleanup can also set stopped = true and clearTimeout(timeoutId).
// Clearing a timer does not cancel an operation already awaiting work.`;

const renderingExample = `// Browser setup: run on a visible page with a loaded body.
const status = document.createElement('p');
document.body.append(status);
status.textContent = 'Working';
queueMicrotask(() => {
  const start = performance.now();
  while (performance.now() - start < 40) { /* brief expensive work */ }
  status.textContent = 'Done';
  console.log(status.textContent); // Done
});
// The DOM changes to Working immediately, but this microtask runs
// before the next rendering opportunity. The intermediate Working
// update is not painted before this microtask changes it to Done.
// Long microtasks delay both that opportunity and later user tasks.`;

const animationFrameExample = `// Browser setup: a visible page with a body; background tabs may pause rAF.
const counter = document.createElement('p');
document.body.append(counter);
let frame = 0;
function update() {
  counter.textContent = String(++frame);
  console.log('animation callback', frame);
  if (frame < 3) requestAnimationFrame(update);
}
requestAnimationFrame(update);
// Logs animation callback 1, 2, 3 over rendering updates.
// requestAnimationFrame runs before a rendering update, not after paint.
// The exact time between callbacks depends on the display and browser.`;

const workerExample = `// Browser setup: a page whose policy permits Blob workers.
const source = \`self.onmessage = ({ data }) => {
  let total = 0;
  for (let i = 1; i <= data; i += 1) total += i;
  self.postMessage(total);
};\`;
const url = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }));
const worker = new Worker(url);
worker.onmessage = ({ data }) => {
  console.log('worker result', data); // worker result 500000500000
  worker.terminate();
  URL.revokeObjectURL(url);
};
worker.postMessage(1000000);
console.log('main code continues');
// main code continues prints before the result.
// The calculation runs in the worker; message handling runs on the page.`;

const nodePhaseExample = `// Node.js CommonJS file: phases.cjs. Run with node phases.cjs.
const fs = require('node:fs');
console.log('script');
fs.readFile(__filename, (error) => {
  if (error) throw error; // a file-read failure is thrown here
  console.log('file callback'); // I/O completion callback
  setImmediate(() => console.log('check callback'));
  setTimeout(() => console.log('timer callback'), 0);
});
// script, file callback, check callback, timer callback
// The file operation can use the worker pool. These JavaScript
// callbacks still run on the event-loop thread.`;

const nodePoolExample = `// Node.js CommonJS file. Completion order is not fixed.
const { lookup } = require('node:dns');
const { pbkdf2 } = require('node:crypto');
const { gzip } = require('node:zlib');
lookup('localhost', (error) => console.log('DNS', error ? 'failed' : 'done'));
pbkdf2('password', 'salt', 1, 16, 'sha256', (error) => {
  console.log('crypto', error ? 'failed' : 'done');
});
gzip('text', (error) => console.log('compression', error ? 'failed' : 'done'));
console.log('calls returned');
// calls returned precedes DNS/crypto/compression completion logs.
// These selected APIs use the worker pool. This is not a claim that
// every network operation or every DNS API uses that pool.`;

const nodeCloseExample = `// Node.js setup: a local service listens on 127.0.0.1:3000
// and closes each accepted connection. Run as a CommonJS file.
const net = require('node:net');
const socket = net.createConnection({ host: '127.0.0.1', port: 3000 });
socket.on('connect', () => console.log('connected'));
socket.on('close', () => console.log('closed'));
socket.on('error', (error) => console.log('socket error', error.code));
// With that service: connected, then closed.
// Without it: a connection error, then closed.
// Node delivers close events using its host scheduling. Selected
// close callbacks are handled in the close-callback phase; not every
// API named close is guaranteed to use that phase.`;

const nextTickExample = `// Save as order.cjs and run with node order.cjs.
console.log('start');
process.nextTick(() => console.log('nextTick'));
queueMicrotask(() => console.log('microtask'));
Promise.resolve().then(() => console.log('promise'));
console.log('end');
// CommonJS: start, end, nextTick, microtask, promise

// Save the same statements as order.mjs and run with node order.mjs.
// ES module top level: start, end, microtask, promise, nextTick
// Module evaluation already runs through asynchronous scheduling.
// Its queued microtasks run before this top-level nextTick callback.`;

const nextTickInsideMicrotaskExample = `// Node.js. This order also holds when written inside a .cjs file.
Promise.resolve().then(() => {
  console.log('promise');
  process.nextTick(() => console.log('nextTick from promise'));
  queueMicrotask(() => console.log('nested microtask'));
});
queueMicrotask(() => console.log('existing microtask'));
// promise, existing microtask, nested microtask, nextTick from promise
// The nextTick added during a microtask does not interrupt the
// microtask queue that Node is currently draining.`;

const nextTickStarvationExample = `// Finite Node.js demonstration. Read as a .cjs file.
let count = 0;
function again() {
  console.log('nextTick', ++count);
  if (count < 3) process.nextTick(again);
}
process.nextTick(again);
Promise.resolve().then(() => console.log('promise'));
setTimeout(() => console.log('timer'), 0);
// nextTick 1, nextTick 2, nextTick 3, promise, timer
// Removing the count limit would continually refill the next-tick
// queue and prevent these Promise and timer callbacks from running.`;

const immediateExample = `// Node.js CommonJS file; top-level order is not guaranteed.
setTimeout(() => console.log('top-level timeout'), 0);
setImmediate(() => console.log('top-level immediate'));
// Either order is possible here. Do not infer I/O-callback order
// from whichever result one top-level run happens to produce.

const fs = require('node:fs');
fs.readFile(__filename, (error) => {
  if (error) throw error; // a file-read failure is thrown here
  setTimeout(() => console.log('timeout after I/O'), 0);
  setImmediate(() => console.log('immediate after I/O'));
});
// Of these last two logs: immediate after I/O precedes timeout after I/O.
// They may interleave with the unrelated top-level logs.`;

const completionExample = `// Node.js CommonJS: actual completion orders the next operation.
const { readFile } = require('node:fs/promises');
async function load() {
  const text = await readFile(__filename, 'utf8');
  console.log('file loaded', text.length > 0); // file loaded true
  console.log('dependent work starts');
}
load().catch((error) => console.log(error.message));
// The second log follows actual read completion. No chosen timer
// delay or phase priority is used as evidence that the file is ready.`;

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
// Browser: 1, 7, 4, 6, 2, 3, 5`;

const starvationExample = `setTimeout(() => console.log('task'), 0);
let count = 0;
function again() {
  console.log('microtask', ++count);
  if (count < 3) queueMicrotask(again);
}
queueMicrotask(again);
// microtask 1, microtask 2, microtask 3, task
// Without the count limit the queue never becomes empty,
// so the task cannot run.`;

const endlessExample = `// Intentional non-terminating code. Read it; do not run it.
function neverYield() {
  queueMicrotask(neverYield);
}
neverYield();
// The queue keeps refilling. Timers and browser rendering do not
// receive a turn through this event loop while it keeps draining.`;

const chunkExample = `let part = 0;
setTimeout(() => console.log('other task'), 0);
function workInParts() {
  console.log('part', ++part);
  if (part < 3) setTimeout(workInParts, 0);
}
workInParts();
// part 1, other task, part 2, part 3
// Each later part is a task. The previously queued timer can run
// between parts. This does not guarantee a paint after every part.`;

const nodeWorkerExample = `// Node.js CommonJS file worker.cjs; no browser APIs.
const { Worker, isMainThread, parentPort } = require('node:worker_threads');
if (isMainThread) {
  const worker = new Worker(__filename);
  worker.on('message', (total) => console.log('worker result', total));
  worker.on('error', (error) => console.log(error.message));
  console.log('main code continues');
} else {
  let total = 0;
  for (let i = 1; i <= 1000000; i += 1) total += i;
  parentPort.postMessage(total);
}
// main code continues, then worker result 500000500000
// The calculation runs on a worker thread. The message callback
// runs on the main event-loop thread.`;

const JavaScriptEventLoop = () => (
    <ArticleLayout
        title="JavaScript Event Loop and Task Queues"
        route={JAVASCRIPT_EVENT_LOOP_ROUTE}
        sections={sections}
        backRoute={JAVASCRIPT_TYPESCRIPT_NOTES_ROUTE}
        backLabel="Back to JavaScript and TypeScript notes"
    >
        <section className="Article__section" aria-labelledby="execution-model">
            <h2 id="execution-model" className="SectionTitle">Synchronous calls finish before queued callbacks</h2>
            <ul className="Article__notes">
                <li>The event loop controls when queued JavaScript callbacks run. A callback is a function passed to an API to run at a time that API chooses.</li>
                <li>A thread runs one JavaScript statement at a time. The examples first use the browser page thread.</li>
                <li>The call stack records function calls that have started but have not returned. Calling <code>inner()</code> adds its call while <code>outer()</code> is still active.</li>
                <li>The host runtime is the browser or Node.js environment. It supplies APIs such as <code>setTimeout</code>.</li>
                <li>A queued callback on the same thread cannot interrupt synchronous work. It runs after that work ends.</li>
                <li><code>setTimeout(callback, 0)</code> registers a callback for later. The delay is in milliseconds. Registering it does not run it immediately.</li>
                <li>I/O means input or output, such as reading a file or receiving network data. The host can wait for it while other JavaScript runs.</li>
                <li>A JavaScript calculation still uses its thread. Registering a timer does not move that calculation to another thread.</li>
                <li>Read the <a className="Link" href={toHref(JAVASCRIPT_ASYNC_ROUTE)}>Promise and async/await explanations</a> before the queue examples. Those examples use <code>then</code>, <code>catch</code>, and <code>await</code>.</li>
            </ul>
            <JavaScriptRunner>{executionExample}</JavaScriptRunner>
            <ol className="Article__steps">
                <li>The timer registration prints nothing.</li>
                <li><code>outer()</code> prints <code>outer start</code>. <code>inner()</code> then prints <code>inner</code> and returns.</li>
                <li><code>outer</code> prints <code>outer end</code> and returns. The script prints <code>script end</code>.</li>
                <li>The queued timer callback runs after the synchronous script and prints <code>timer</code>.</li>
            </ol>
            <ul className="Article__notes">
                <li><code>performance.now()</code> reads an elapsed-time clock. The loop below keeps this thread busy for about 30 ms.</li>
                <li>The timer callback waits for that loop to end. It cannot interrupt the calculation.</li>
            </ul>
            <JavaScriptRunner>{blockingExample}</JavaScriptRunner>
        </section>
        <section className="Article__section" aria-labelledby="tasks-and-microtasks">
            <h2 id="tasks-and-microtasks" className="SectionTitle">Tasks and microtasks run at different times</h2>
            <ul className="Article__notes">
                <li>A queue stores work until the runtime can run it. Work added to the end of one queue follows work already in that queue.</li>
                <li>A browser <strong>task</strong> is host-scheduled work, such as a timer callback or user-input handling. Some tutorials call it a macrotask.</li>
                <li>A <strong>microtask</strong> is work placed in the microtask queue. It runs after the current synchronous work and before the next task.</li>
                <li>Promise handlers and <code>queueMicrotask(callback)</code> use the microtask queue.</li>
                <li>A <strong>checkpoint</strong> is a point where the browser runs pending microtasks. It drains the queue, meaning it keeps running microtasks until none remain.</li>
                <li>Microtasks added while the queue is draining join its end. They run before the next task too.</li>
            </ul>
            <JavaScriptRunner>{browserOrderExample}</JavaScriptRunner>
            <ol className="Article__steps">
                <li>The current script prints <code>script start</code> and <code>script end</code>.</li>
                <li><code>.then(...)</code> on the fulfilled Promise queues the callback that prints <code>promise</code>.</li>
                <li><code>queueMicrotask(...)</code> queues <code>microtask</code> after it. Both run before the timer's task.</li>
                <li>The timer callback then prints <code>timeout</code>.</li>
            </ol>
            <JavaScriptRunner>{nestedMicrotaskExample}</JavaScriptRunner>
            <ul className="Article__notes">
                <li>When <code>microtask 1</code> runs, <code>microtask 2</code> is already waiting. Adding <code>microtask 3</code> puts it after <code>microtask 2</code>.</li>
                <li>The timer's <code>task</code> log waits until all three microtasks finish.</li>
            </ul>
            <h3 className="Article__subTitle">An event listener is not automatically a new task</h3>
            <ul className="Article__notes">
                <li>An event listener is a callback registered for a notification. <code>EventTarget</code> provides registration and dispatch methods.</li>
                <li><code>new Event('update')</code> creates the notification. <code>target.dispatchEvent(...)</code> calls its registered listeners before returning.</li>
                <li>That exact call explains <code>before dispatch, listener, after dispatch</code>. It did not create a separate listener task.</li>
                <li>Real user input is processed by the browser using host tasks.</li>
                <li>A task source identifies a category of browser work, such as timers or user input.</li>
                <li>Browsers can select work from different task sources. Do not treat every timer, user event, and network event as one universal queue.</li>
                <li>The button example needs a browser page with a loaded body. The DOM is the browser's in-memory representation of that page.</li>
            </ul>
            <JavaScriptRunner>{eventDispatchExample}</JavaScriptRunner>
            <CodeBlock language="javascript">{differentSourcesExample}</CodeBlock>
            <h3 className="Article__subTitle">Browser and Node.js host APIs differ</h3>
            <ul className="Article__notes">
                <li>Node.js runs JavaScript outside a browser page. It provides file and process APIs instead of a page DOM.</li>
                <li><code>process</code> holds Node.js process information and APIs. <code>process.nextTick</code> and <code>setImmediate</code> are Node.js scheduling APIs explained in later sections.</li>
                <li><code>typeof name</code> checks whether a global is available without failing when that name is undeclared.</li>
            </ul>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">Work or API</th><th scope="col">Browser page</th><th scope="col">Node.js</th></tr></thead>
                    <tbody>
                        <tr><th scope="row">Promise handler, await continuation, queueMicrotask</th><td>Microtasks.</td><td>Microtasks; nextTick context is explained below.</td></tr>
                        <tr><th scope="row">setTimeout / setInterval</th><td>Timer tasks.</td><td>Timer callbacks in event-loop processing.</td></tr>
                        <tr><th scope="row">Page DOM and real user input</th><td>Provided by the browser.</td><td>No page DOM in a normal Node.js process.</td></tr>
                        <tr><th scope="row">process.nextTick</th><td>No standard process global.</td><td>Separate next-tick queue.</td></tr>
                        <tr><th scope="row">setImmediate</th><td>No standard browser API.</td><td>Check phase callback.</td></tr>
                    </tbody>
                </table>
            </div>
            <CodeBlock language="javascript">{environmentExample}</CodeBlock>
        </section>
        <section className="Article__section" aria-labelledby="promises">
            <h2 id="promises" className="SectionTitle">Promise executors run now; handlers run later</h2>
            <ul className="Article__notes">
                <li>The executor is the function passed to <code>new Promise</code>. The constructor calls it immediately.</li>
                <li><code>resolve('result')</code> fulfills this Promise. Fulfilled means it has a successful result.</li>
                <li><code>.then(callback)</code> registers a success handler. Calling <code>resolve</code> does not call that handler immediately.</li>
                <li>A handler on an already-fulfilled Promise is still a microtask. Calling Promise.resolve alone does not call an application handler.</li>
                <li><code>catch</code> handles rejection, a failed Promise outcome. <code>finally</code> runs after either success or failure.</li>
                <li>In a chain, each method returns a new Promise. The next callback waits until that preceding Promise settles.</li>
            </ul>
            <JavaScriptRunner>{promiseExecutorExample}</JavaScriptRunner>
            <JavaScriptRunner>{promiseChainExample}</JavaScriptRunner>
            <ul className="Article__notes">
                <li><code>Promise.reject(new Error('failure'))</code> creates a rejected Promise. It does not throw synchronously into the script.</li>
                <li>The <code>catch</code> callback prints <code>catch failure</code>. Once it finishes, the next Promise settles and <code>finally</code> can be queued.</li>
                <li>The script's <code>synchronous end</code> therefore prints before all the handlers.</li>
            </ul>
        </section>
        <section className="Article__section" aria-labelledby="async-await">
            <h2 id="async-await" className="SectionTitle">await resumes through a Promise microtask</h2>
            <ul className="Article__notes">
                <li>An async function always returns a Promise. It starts running synchronously until its first <code>await</code>.</li>
                <li><code>await</code> pauses this function until its value is ready. The caller receives the Promise and can continue.</li>
                <li>Code after await resumes through a Promise microtask, even for a plain value. The caller can keep running before that continuation.</li>
                <li>await suspends this function. It does not block the entire thread or start another thread.</li>
            </ul>
            <JavaScriptRunner>{awaitExample}</JavaScriptRunner>
            <ol className="Article__steps">
                <li>The script prints <code>outside 1</code>. Calling <code>run()</code> immediately prints <code>inside 1</code>.</li>
                <li><code>await 'available'</code> pauses <code>run</code>, even though that value already exists.</li>
                <li>The caller receives a Promise, prints <code>true</code>, and prints <code>outside 2</code>.</li>
                <li>The continuation prints <code>inside 2 available</code>. Finishing <code>run</code> fulfills its Promise and queues the final handler.</li>
                <li>That handler prints <code>function completed</code>.</li>
            </ol>
        </section>
        <section className="Article__section" aria-labelledby="timers">
            <h2 id="timers" className="SectionTitle">Timers wait for an eligible callback turn</h2>
            <ul className="Article__notes">
                <li>setTimeout schedules a future callback. A delay of zero cannot interrupt current synchronous work.</li>
                <li>The delay is the requested wait before a timer can become ready. It is not a promise of the exact execution time.</li>
                <li>Busy code and queued microtasks can postpone it. Browsers can also slow timers in background tabs.</li>
                <li>clearTimeout prevents a timer callback that has not started. It cannot undo a callback already running.</li>
            </ul>
            <JavaScriptRunner>{timerExample}</JavaScriptRunner>
            <h3 className="Article__subTitle">An async interval callback can overlap another tick</h3>
            <ul className="Article__notes">
                <li><code>setInterval(callback, delay)</code> schedules repeated calls. Each call is called a tick.</li>
                <li><code>setInterval</code> does not wait for a Promise returned by its callback. Another tick can start while the earlier callback is paused at <code>await</code>.</li>
                <li>The example saves each Promise's resolve function in <code>completions</code>. Tick 2 calls both saved functions, then both paused callbacks can finish.</li>
                <li>This overlap is waiting at the same time. The callbacks do not execute JavaScript simultaneously on one thread.</li>
                <li>clearInterval prevents future ticks. It does not cancel async operations started by earlier ticks.</li>
                <li>The recursive timeout below schedules its next delay after the preceding async operation finishes.</li>
            </ul>
            <JavaScriptRunner>{intervalExample}</JavaScriptRunner>
            <JavaScriptRunner>{recursiveTimeoutExample}</JavaScriptRunner>
            <ul className="Article__notes">
                <li>The next <code>setTimeout</code> registration runs after the awaited operation. That placement prevents overlapping refreshes.</li>
                <li>The first call and each timer-started call attach <code>catch(console.error)</code>. A real refresh failure is therefore handled even though <code>setTimeout</code> ignores returned Promises.</li>
            </ul>
            <h3 className="Article__subTitle">When to use this</h3>
            <ul className="Article__notes">
                <li>Use a recursive timeout when refreshes must wait for the preceding refresh. Clear owned timers during cleanup, and cancel any pending operation separately if its API supports cancellation.</li>
            </ul>
        </section>
        <section className="Article__section" aria-labelledby="browser-loop">
            <h2 id="browser-loop" className="SectionTitle">The browser drains microtasks before rendering</h2>
            <ul className="Article__notes">
                <li>After a task ends, the browser reaches a microtask checkpoint. It drains microtasks before the next rendering opportunity.</li>
                <li><code>textContent</code> sets a DOM element's text. The DOM is the browser's representation of the page.</li>
                <li>Rendering computes a visual update. Painting draws the resulting pixels. A DOM change alone does not prove that the reader has seen it.</li>
                <li>The browser can skip a rendering update. It does not promise to paint after each task.</li>
                <li>A long microtask postpones the next rendering opportunity and later task callbacks.</li>
            </ul>
            <CodeBlock language="javascript">{renderingExample}</CodeBlock>
            <h3 className="Article__subTitle">Animation callbacks run before a visual update</h3>
            <ul className="Article__notes">
                <li><code>requestAnimationFrame(callback)</code> requests a callback during a future rendering update, before repaint.</li>
                <li>Its callback can update the DOM for that visual update. It does not prove an earlier DOM value has already been painted.</li>
                <li>Repeated animation needs another requestAnimationFrame call. Hidden tabs can pause those callbacks.</li>
            </ul>
            <CodeBlock language="javascript">{animationFrameExample}</CodeBlock>
            <h3 className="Article__subTitle">A worker moves a calculation to another thread</h3>
            <ul className="Article__notes">
                <li>A worker is a separate JavaScript execution environment. A browser worker runs on a different thread from the page.</li>
                <li><code>postMessage(value)</code> sends data between the page and worker. The receiving <code>onmessage</code> callback reads it from the event's <code>data</code> property.</li>
                <li>The example creates worker source text in a <code>Blob</code>, an object containing file-like data. <code>URL.createObjectURL</code> creates a temporary URL for it.</li>
                <li><code>new Worker(url)</code> starts that source. <code>terminate()</code> stops the worker after its result arrives. <code>revokeObjectURL</code> releases the temporary URL.</li>
                <li>The worker does not have the page DOM. Send its result back and update the page in the page's callback.</li>
            </ul>
            <CodeBlock language="javascript">{workerExample}</CodeBlock>
            <h3 className="Article__subTitle">When to use this</h3>
            <ul className="Article__notes">
                <li>Use requestAnimationFrame for work tied to visual updates. Keep animation callbacks short. Use a worker for suitable long calculations, as the sum example demonstrates.</li>
            </ul>
        </section>
        <section className="Article__section" aria-labelledby="node-loop">
            <h2 id="node-loop" className="SectionTitle">Node.js schedules I/O and callbacks through phases</h2>
            <ul className="Article__notes">
                <li>The following examples require Node.js files. Browser runners cannot supply Node.js globals such as <code>require</code> and <code>process</code>.</li>
                <li>A CommonJS file uses Node's <code>require('node:fs')</code> to load an API. Its <code>.cjs</code> extension selects CommonJS rules.</li>
                <li><code>__filename</code> is that CommonJS file's full path. Reading it makes the file-read example independent of another input file.</li>
                <li>An event-loop phase is a stage where Node handles a category of callbacks. Node does not have a browser paint cycle.</li>
                <li>These are selected phases, not the complete Node.js implementation. Node versions can change phase details; Starting with Node 20 and libuv 1.45, timer processing changed to run after poll. libuv is the library Node uses for its event loop and many I/O operations.</li>
                <li>A worker pool is a set of threads Node uses for selected operations. File reads, <code>dns.lookup</code>, password-key calculation, and compression are examples.</li>
                <li>These APIs below demonstrate completion callbacks. Their results can arrive in different orders. Their JavaScript callbacks still run on the event-loop thread.</li>
                <li><code>lookup</code> looks up a host's address. <code>pbkdf2</code> derives bytes from a password. <code>gzip</code> compresses data. Their algorithms are separate topics.</li>
                <li>The socket example opens a network connection. <code>socket.on(name, callback)</code> subscribes to connection, error, and close events.</li>
            </ul>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">Selected phase</th><th scope="col">Work handled</th></tr></thead>
                    <tbody>
                        <tr><th scope="row">Timers</th><td>Eligible timer callbacks.</td></tr>
                        <tr><th scope="row">Poll</th><td>I/O callbacks and waiting for I/O.</td></tr>
                        <tr><th scope="row">Check</th><td>setImmediate callbacks.</td></tr>
                        <tr><th scope="row">Close callbacks</th><td>Selected close-event callbacks.</td></tr>
                    </tbody>
                </table>
            </div>
            <CodeBlock language="javascript">{nodePhaseExample}</CodeBlock>
            <ul className="Article__notes">
                <li>If file reading fails, the exact throw is <code>if (error) throw error</code> inside the completion callback. It reports the original file error.</li>
                <li>A <code>try/catch</code> around <code>fs.readFile(...)</code> cannot catch a throw from that later callback. Handle <code>error</code> in the callback, or use the Promise-based version in the completion example.</li>
            </ul>
            <CodeBlock language="javascript">{nodePoolExample}</CodeBlock>
            <CodeBlock language="javascript">{nodeCloseExample}</CodeBlock>
            <h3 className="Article__subTitle">When to use this</h3>
            <ul className="Article__notes">
                <li>Wait for the callback, Promise, or event that reports completion. The completion example in the setImmediate section shows this without depending on an internal phase diagram.</li>
            </ul>
        </section>
        <section className="Article__section" aria-labelledby="next-tick">
            <h2 id="next-tick" className="SectionTitle">nextTick ordering depends on the scheduling context</h2>
            <ul className="Article__notes">
                <li>process.nextTick is a Node.js API. Its queue is separate from Promise microtasks and event-loop phases.</li>
                <li>After ordinary callback work, Node drains next-tick callbacks before Promise microtasks. The CommonJS top-level example below follows that order.</li>
                <li>An ES module is a file using JavaScript module rules. Node's <code>.mjs</code> extension selects those rules.</li>
                <li>ES-module top-level evaluation already runs through asynchronous scheduling. In that context, the example's queued Promise microtasks run before its next-tick callback.</li>
                <li>Use the stated file extension when checking an output. A browser script, <code>.cjs</code>, and <code>.mjs</code> are different contexts.</li>
            </ul>
            <CodeBlock language="javascript">{nextTickExample}</CodeBlock>
            <h3 className="Article__subTitle">A nextTick inside a microtask does not interrupt the queue</h3>
            <ul className="Article__notes">
                <li>While Node is draining microtasks, a nextTick added by a microtask waits for that drain to finish.</li>
                <li>A recursive nextTick can keep its queue non-empty and postpone Promise handlers, timers, and I/O.</li>
            </ul>
            <CodeBlock language="javascript">{nextTickInsideMicrotaskExample}</CodeBlock>
            <CodeBlock language="javascript">{nextTickStarvationExample}</CodeBlock>
            <h3 className="Article__subTitle">When to use this</h3>
            <ul className="Article__notes">
                <li>Use queueMicrotask for Promise-style scheduling shared by browsers and Node.js. Use nextTick only when the Node.js ordering is required. Keep both finite; the recursive example shows what delays other work.</li>
            </ul>
        </section>
        <section className="Article__section" aria-labelledby="set-immediate">
            <h2 id="set-immediate" className="SectionTitle">setImmediate and zero-delay timers have context-dependent order</h2>
            <ul className="Article__notes">
                <li><code>setImmediate(callback)</code> is a Node.js API whose callback runs in the check phase. Its name does not mean it interrupts current code.</li>
                <li><code>setTimeout(callback, 0)</code> uses timer processing. Which one runs first depends on where they were registered.</li>
                <li>At top level, timing can change which callback runs first. There is no guaranteed immediate-before-timeout order there.</li>
                <li>Inside the file I/O callback below, setImmediate runs before the zero-delay timer created in that callback.</li>
            </ul>
            <CodeBlock language="javascript">{immediateExample}</CodeBlock>
            <h3 className="Article__subTitle">Actual completion orders dependent work</h3>
            <CodeBlock language="javascript">{completionExample}</CodeBlock>
            <h3 className="Article__subTitle">When to use this</h3>
            <ul className="Article__notes">
                <li>Await the actual result when a later operation depends on it. Do not choose an arbitrary timer delay as evidence of completion.</li>
            </ul>
        </section>
        <section className="Article__section" aria-labelledby="execution-order">
            <h2 id="execution-order" className="SectionTitle">Follow when each handler is queued</h2>
            <ul className="Article__notes">
                <li>The script below first prints 1 and 7 synchronously.</li>
                <li>The first Promise handler prints 4 and registers the second timer. Completing that handler queues the handler that prints 6.</li>
                <li>The earlier timer prints 2. Its Promise microtask prints 3 before the next timer can print 5.</li>
            </ul>
            <JavaScriptRunner>{mixedOrderExample}</JavaScriptRunner>
            <h3 className="Article__subTitle">When to use this</h3>
            <ul className="Article__notes">
                <li>Record synchronous work first, microtasks next, and eligible host tasks after the microtask checkpoint. For Node.js, also account for nextTick context and phases shown above.</li>
            </ul>
        </section>
        <section className="Article__section" aria-labelledby="starvation">
            <h2 id="starvation" className="SectionTitle">A queue that never empties postpones other work</h2>
            <ul className="Article__notes">
                <li>Starvation means queued work keeps waiting because other work continues to run first.</li>
                <li>A microtask can add another microtask. A finite chain delays a timer until the chain ends.</li>
                <li>A chain that never ends prevents the event loop from taking another task or reaching the next rendering opportunity.</li>
            </ul>
            <JavaScriptRunner>{starvationExample}</JavaScriptRunner>
            <CodeBlock language="javascript">{endlessExample}</CodeBlock>
            <h3 className="Article__subTitle">Tasks allow other eligible tasks between parts</h3>
            <ul className="Article__notes">
                <li>Scheduling the next part as a timer task lets already-queued timer work run between parts. It does not guarantee a paint between every part.</li>
                <li>Browser workers and Node.js worker threads can run a CPU calculation on another thread. Their message callbacks still run on the receiving thread.</li>
            </ul>
            <JavaScriptRunner>{chunkExample}</JavaScriptRunner>
            <CodeBlock language="javascript">{nodeWorkerExample}</CodeBlock>
            <h3 className="Article__subTitle">When to use this</h3>
            <ul className="Article__notes">
                <li>Keep synchronous parts and microtasks short. Split long work into tasks when that fits the operation, or use the browser/Node worker examples for suitable calculations.</li>
            </ul>
        </section>
        <section className="Article__section" aria-labelledby="common-mistakes">
            <h2 id="common-mistakes" className="SectionTitle">Compare the behavior shown by the examples</h2>
            <div className="Article__tableWrap">
                <table className="Article__table">
                    <thead><tr><th scope="col">Assumption</th><th scope="col">Observed rule in these examples</th><th scope="col">Example above</th></tr></thead>
                    <tbody>
                        <tr><th scope="row">A Promise executor runs later.</th><td>It runs during construction; handlers run later.</td><td>Promise executor: A, B, C, D.</td></tr>
                        <tr><th scope="row">A zero-delay timer runs immediately.</th><td>It waits for the current work and microtasks.</td><td>Timer: script finished precedes callback.</td></tr>
                        <tr><th scope="row">An event listener always runs in a new task.</th><td>dispatchEvent calls listeners synchronously.</td><td>before dispatch, listener, after dispatch.</td></tr>
                        <tr><th scope="row">An async interval waits for its callback.</th><td>The second tick starts while the first is suspended.</td><td>start 1, start 2, finish 1, finish 2.</td></tr>
                        <tr><th scope="row">A microtask yields to browser painting.</th><td>The microtask checkpoint finishes before rendering.</td><td>Working changes to Done before the rendering opportunity.</td></tr>
                        <tr><th scope="row">nextTick always precedes Promise callbacks.</th><td>Module top level and an already-running microtask change the order.</td><td>The .cjs, .mjs, and nested microtask examples.</td></tr>
                        <tr><th scope="row">setImmediate always precedes a timer.</th><td>That ordering holds in the shown I/O callback; top-level order varies.</td><td>The file I/O and top-level examples.</td></tr>
                    </tbody>
                </table>
            </div>
            <ul className="Article__notes">
                <li>For Promise results, retries, cancellation, and application races, read the <a className="Link" href={toHref(JAVASCRIPT_ASYNC_ROUTE)}>asynchronous programming note</a>.</li>
                <li>Reference: <a className="Link" href="https://html.spec.whatwg.org/multipage/webappapis.html#event-loops">HTML event-loop specification</a>.</li>
                <li>Reference: <a className="Link" href="https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick">Node.js event-loop guide</a>.</li>
                <li>Reference: <a className="Link" href="https://nodejs.org/en/learn/asynchronous-work/understanding-setimmediate">Node.js CommonJS and ES-module ordering examples</a>.</li>
                <li>Reference: <a className="Link" href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers">browser worker execution and message passing</a>.</li>
            </ul>
        </section>
    </ArticleLayout>
);

export default JavaScriptEventLoop;
