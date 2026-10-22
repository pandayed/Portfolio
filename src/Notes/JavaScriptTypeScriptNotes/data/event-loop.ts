import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "event-loop",
    title: "The JavaScript event loop",
    summary: "Synchronous calls, microtasks, host tasks, and Node.js scheduling.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    inlineCode: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN: tasks and microtasks",
            href: "https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide"
        },
        {
            title: "HTML specification: event loops",
            href: "https://html.spec.whatwg.org/multipage/webappapis.html#event-loops"
        },
        {
            title: "Node.js: event loop, timers, and nextTick",
            href: "https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick"
        },
        {
            title: "Node.js: setImmediate and module ordering",
            href: "https://nodejs.org/en/learn/asynchronous-work/understanding-setimmediate"
        }
    ],
    sections: [
        {
            id: "event-loop",
            title: "Event loop",
            bullets: [
                "The event loop is the host’s mechanism for scheduling queued work after currently running JavaScript finishes.",
                "Its scheduling cycle repeats as more work becomes ready.",
                "The host is the environment running JavaScript, such as a browser or Node.js.",
                "A callback is a function supplied to another function or API for it to call.",
                "The host supplies APIs for timers, network requests, and other operations.",
                "It can track those operations while JavaScript runs. Their callbacks still need a turn to run JavaScript.",
                "In a browser, the event loop coordinates tasks, microtasks, and opportunities to update the screen.",
                "Tasks and microtasks are two kinds of scheduled work with different waiting rules. Neither interrupts the JavaScript already running."
            ]
        },
        {
            id: "call-stack",
            title: "Synchronous calls",
            bullets: [
                "The call stack records function calls that have started and have not returned.",
                "A nested call finishes before its caller resumes.",
                "One JavaScript thread runs one piece of JavaScript at a time.",
                "An ordinary function call runs immediately on this stack. It does not create a task or microtask.",
                "The called function may separately use an API that schedules later work."
            ]
        },
        {
            id: "task-sources",
            title: "Browser tasks",
            bullets: [
                "A task is a unit of work scheduled by the host, such as running a timer callback or delivering user input.",
                "Calling a timer API registers the timer. The host queues its callback as task work when the timer becomes eligible.",
                "A `0` delay does not make a timer callback run immediately. Current JavaScript and queued microtasks can delay it.",
                "A callback is not automatically a task. The API and how it invokes the callback determine the scheduling."
            ],
            table: {
                columns: ["Source", "Scheduled work"],
                rows: [
                    ["`setTimeout(callback, delay)`", "A timer callback after the delay has elapsed and the host can run it."],
                    ["`setInterval(callback, delay)`", "Repeated timer callbacks when their timer becomes eligible."],
                    ["A real user click or key press", "Browser input processing that dispatches the event to its listeners."]
                ]
            }
        },
        {
            id: "microtask-sources",
            title: "Browser microtasks",
            bullets: [
                "A microtask is queued work processed at a microtask checkpoint, before the browser takes another task.",
                "A checkpoint is the point where the host runs queued microtasks until the queue is empty.",
                "A Promise reaction is queued work that processes fulfillment or rejection and calls the matching handler.",
                "These APIs schedule callbacks or resumed code as microtasks. The whole asynchronous operation is not a microtask.",
                "For a pending Promise, registering a handler does not run it yet. Its reaction is queued when the Promise settles.",
                "For an already settled Promise, registering a handler queues the reaction without running the handler inline."
            ],
            table: {
                columns: ["Source", "Microtask work"],
                rows: [
                    ["`queueMicrotask(callback)`", "The supplied callback is added directly to the microtask queue."],
                    ["Promise `.then`, `.catch`, and `.finally`", "Promise reactions that run the matching handlers after fulfillment or rejection."],
                    ["`await`", "The code that resumes an async function after the awaited value fulfills or rejects."],
                    ["`fetch(url).then(handler)`", "The Promise handler after the request Promise fulfills. The network request itself is not a microtask."]
                ]
            },
            examples: [
                {
                    title: "Promise executor and handler",
                    description: [
                        "The example separates immediate Promise construction from its queued handler."
                    ],
                    language: "javascript",
                    code: "console.log('script start');\n\nconst promise = new Promise((resolve) => {\n  console.log('executor');\n  resolve('ready');\n});\n\npromise.then((value) => console.log('handler', value));\nconsole.log('script end');",
                    result: "script start\nexecutor\nscript end\nhandler ready",
                    explanation: [
                        "The executor passed to `new Promise` runs synchronously. It is not queued as a microtask.",
                        "`resolve` fulfills this Promise with `\"ready\"`.",
                        "Registering `.then` on that fulfilled Promise queues its handler reaction.",
                        "The handler runs after the current synchronous script finishes."
                    ],
                    runnable: true
                }
            ]
        },
        {
            id: "queues",
            title: "Browser execution order",
            bullets: [
                "The current task runs its synchronous JavaScript first.",
                "After the task finishes, the browser performs a microtask checkpoint.",
                "At a checkpoint, queued microtasks run in their queue order.",
                "A microtask added by another microtask joins the queue being drained.",
                "The browser drains that queue before taking another task.",
                "Microtask checkpoints also occur after script callbacks when the JavaScript execution stack becomes empty.",
                "The browser can update rendering at rendering opportunities. It does not paint after every task.",
                "A chain’s next handler is queued when its preceding Promise becomes settled.",
                "Different host task sources are not one universal priority list.",
                "Input events do not always run before timers."
            ],
            examples: [
                {
                    title: "Nested calls and a timer",
                    description: [
                        "The example records when each function enters and leaves its caller."
                    ],
                    language: "javascript",
                    code: `function inner() { console.log('inner'); }
function outer() {
  console.log('outer start');
  inner(); // outer has not returned while inner is on the stack
  console.log('outer end');
}
setTimeout(() => console.log('timer'), 0);
outer();
console.log('script end');
// outer start, inner, outer end, script end, timer`,
                    result: "outer start\ninner\nouter end\nscript end\ntimer",
                    explanation: [
                        "`inner` returns before `outer` prints `outer end`.",
                        "The timer callback waits until the synchronous script finishes."
                    ],
                    runnable: true
                },
                {
                    title: "Synchronous work and callback delays",
                    description: [
                        "The example intentionally keeps the thread busy for about 30 ms."
                    ],
                    language: "javascript",
                    code: `const start = performance.now();
setTimeout(() => console.log('timer'), 0);
while (performance.now() - start < 30) { /* brief blocking demo */ }
console.log('calculation finished');
// calculation finished, then timer
// The host can track the timer while JavaScript is busy,
// but its JavaScript callback cannot interrupt this calculation.`,
                    result: "calculation finished\ntimer",
                    explanation: [
                        "The timer can become eligible while the loop runs.",
                        "Its JavaScript callback cannot interrupt the running calculation."
                    ],
                    runnable: true
                },
                {
                    title: "Synchronous work, microtasks, and timers",
                    description: [
                        "The example runs as a browser script."
                    ],
                    language: "javascript",
                    code: `console.log('script start');
setTimeout(() => console.log('timeout'), 0);
Promise.resolve().then(() => console.log('promise'));
queueMicrotask(() => console.log('microtask'));
console.log('script end');
// script start, script end, promise, microtask, timeout`,
                    result: "script start\nscript end\npromise\nmicrotask\ntimeout",
                    explanation: [
                        "The two synchronous logs finish first.",
                        "The Promise handler was queued before `queueMicrotask`.",
                        "Both run before the timer task."
                    ],
                    runnable: true
                },
                {
                    title: "Nested microtasks",
                    description: [
                        "The example queues another callback from the first Promise handler."
                    ],
                    language: "javascript",
                    code: `setTimeout(() => console.log('task'), 0);
Promise.resolve().then(() => {
  console.log('microtask 1');
  queueMicrotask(() => console.log('microtask 3'));
});
queueMicrotask(() => console.log('microtask 2'));
// microtask 1, microtask 2, microtask 3, task`,
                    result: "microtask 1\nmicrotask 2\nmicrotask 3\ntask",
                    explanation: [
                        "microtask 2 was already queued when microtask 3 was added.",
                        "The queue drains completely before the timer callback."
                    ],
                    runnable: true
                },
                {
                    title: "Promise chains and timer microtasks",
                    description: [
                        "The example traces a Promise chain and a microtask created inside a timer."
                    ],
                    language: "javascript",
                    code: `console.log('1');
setTimeout(() => {
  console.log('5');
  queueMicrotask(() => console.log('6'));
}, 0);
Promise.resolve().then(() => console.log('3')).then(() => console.log('4'));
console.log('2');
// Browser: 1, 2, 3, 4, 5, 6
// The second then handler is queued after the first handler completes.
// The microtask inside the timer runs after that timer callback ends.`,
                    result: "1\n2\n3\n4\n5\n6",
                    explanation: [
                        "The second chain handler is queued when the first finishes.",
                        "The microtask created by the timer runs after that timer callback ends."
                    ],
                    runnable: true
                }
            ]
        },
        {
            id: "await-continuation",
            title: "Continuation after await",
            bullets: [
                "The continuation is the code that resumes an `async` function after `await`.",
                "It resumes through Promise microtask scheduling.",
                "An available fulfillment value does not make `await` continue inline.",
                "The caller’s current synchronous work finishes first."
            ],
            examples: [
                {
                    title: "Caller and continuation order",
                    description: [
                        "The example awaits an already available string and inspects the caller’s order."
                    ],
                    language: "javascript",
                    code: `async function run() {
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
// inside 2 available, function completed`,
                    result: "outside 1\ninside 1\ntrue\noutside 2\ninside 2 available\nfunction completed",
                    explanation: [
                        "`run` executes through `inside 1` before suspending.",
                        "The continuation logs `inside 2`.",
                        "Completing `run` then queues its final handler."
                    ],
                    runnable: true
                }
            ]
        },
        {
            id: "node-phases",
            title: "Node.js event-loop phases",
            bullets: [
                "Node.js has no browser paint cycle.",
                "Its event loop handles timers, input/output, and other callbacks through phases.",
                "Selected phases include timers for eligible timers, poll for input/output, check for `setImmediate`, and close callbacks for selected close events.",
                "Starting with Node.js 20 and libuv 1.45, timers run after poll. libuv is the library Node.js uses for its event loop and many input/output operations.",
                "Selected APIs use a worker pool, a set of host-managed threads: file-system operations, `dns.lookup`, selected crypto operations, and compression.",
                "Their completion callbacks run JavaScript on the event-loop thread.",
                "Network operations and other DNS APIs do not all use that pool.",
                "The following examples use `.cjs` files, Node.js’s CommonJS module form.",
                "`__filename` is the current file’s path.",
                "A `try`/`catch` around an input/output registration cannot `catch` a `throw` from its later callback.",
                "The callback handles its own error."
            ],
            examples: [
                {
                    title: "File completion and the check phase",
                    description: [
                        "The example runs as `phases.cjs` in Node.js.",
                        "The file reads itself."
                    ],
                    language: "javascript",
                    code: `// Node.js CommonJS file: phases.cjs. Run with node phases.cjs.
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
// callbacks still run on the event-loop thread.`,
                    result: "script\nfile callback\ncheck callback\ntimer callback",
                    explanation: [
                        "`setImmediate` uses the check phase after this input/output callback.",
                        "The zero-delay timer registered in that same callback runs later.",
                        "A file-read failure is handled by the callback’s error check."
                    ]
                },
                {
                    title: "Top-level and I/O callbacks",
                    description: [
                        "The example runs as `immediate.cjs` in Node.js."
                    ],
                    language: "javascript",
                    code: `// Node.js CommonJS file; top-level order is not guaranteed.
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
// They may interleave with the unrelated top-level logs.`,
                    result: "A possible order:\ntop-level timeout\ntop-level immediate\nimmediate after I/O\ntimeout after I/O",
                    explanation: [
                        "The two top-level callbacks can appear in either order and can interleave with the file callback’s work.",
                        "Within the two callbacks registered after file completion, immediate after I/O precedes timeout after I/O."
                    ],
                    possibleOutput: true
                }
            ]
        },
        {
            id: "node-next-tick",
            title: "Node.js next-tick scheduling",
            bullets: [
                "`process.nextTick` uses a separate Node.js queue.",
                "It is not a browser API or an event-loop phase.",
                "After ordinary callback work, Node.js drains next-tick callbacks before Promise microtasks.",
                "ES-module top-level evaluation already runs through asynchronous scheduling.",
                "Its queued microtasks can precede its top-level `nextTick` callbacks.",
                "A `nextTick` added while microtasks are draining waits for that drain to finish.",
                "It does not interrupt the microtask queue.",
                "The `queueMicrotask` API is available in browsers and Node.js.",
                "The `nextTick` API provides the Node.js ordering described here."
            ],
            examples: [
                {
                    title: "CommonJS and ES-module scheduling",
                    description: [
                        "The same statements run as `order.cjs` and as `order.mjs` in Node.js."
                    ],
                    language: "javascript",
                    code: `// Save as order.cjs and run with node order.cjs.
console.log('start');
process.nextTick(() => console.log('nextTick'));
queueMicrotask(() => console.log('microtask'));
Promise.resolve().then(() => console.log('promise'));
console.log('end');
// CommonJS: start, end, nextTick, microtask, promise

// Save the same statements as order.mjs and run with node order.mjs.
// ES module top level: start, end, microtask, promise, nextTick
// Module evaluation already runs through asynchronous scheduling.
// Its queued microtasks run before this top-level nextTick callback.`,
                    result: "CommonJS: start, end, nextTick, microtask, promise\nES module: start, end, microtask, promise, nextTick",
                    explanation: [
                        "The file extension selects a different module context.",
                        "The `nextTick` callback’s order depends on where it was scheduled."
                    ]
                },
                {
                    title: "Next-tick callbacks inside microtasks",
                    description: [
                        "The example runs in a Node.js file."
                    ],
                    language: "javascript",
                    code: `// Node.js. This order also holds when written inside a .cjs file.
Promise.resolve().then(() => {
  console.log('promise');
  process.nextTick(() => console.log('nextTick from promise'));
  queueMicrotask(() => console.log('nested microtask'));
});
queueMicrotask(() => console.log('existing microtask'));
// promise, existing microtask, nested microtask, nextTick from promise
// The nextTick added during a microtask does not interrupt the
// microtask queue that Node is currently draining.`,
                    result: "promise\nexisting microtask\nnested microtask\nnextTick from promise",
                    explanation: [
                        "The added `nextTick` waits until existing and nested microtasks finish."
                    ]
                }
            ]
        },
        {
            id: "starvation",
            title: "Queue starvation",
            bullets: [
                "Starvation means work keeps waiting because other work continues to run first.",
                "A microtask can add another microtask.",
                "A queue that never empties postpones later tasks and browser rendering opportunities.",
                "A recursive `nextTick` can similarly postpone Promise handlers, timers, and input/output in Node.js.",
                "The example schedules long work in separate tasks when it can be split.",
                "A worker thread runs calculations on another thread."
            ],
            examples: [
                {
                    title: "Finite microtask chains",
                    description: [
                        "The limit lets the example finish."
                    ],
                    language: "javascript",
                    code: `setTimeout(() => console.log('task'), 0);
let count = 0;
function again() {
  console.log('microtask', ++count);
  if (count < 3) queueMicrotask(again);
}
queueMicrotask(again);
// microtask 1, microtask 2, microtask 3, task
// Without the count limit the queue never becomes empty,
// so the task cannot run.`,
                    result: "microtask 1\nmicrotask 2\nmicrotask 3\ntask",
                    explanation: [
                        "Each callback adds another until the limit is reached.",
                        "Without the limit the task would keep waiting."
                    ],
                    runnable: true
                },
                {
                    title: "Finite next-tick chains",
                    description: [
                        "The example runs as a `.cjs` file in Node.js.",
                        "The limit keeps the queue finite."
                    ],
                    language: "javascript",
                    code: `// Finite Node.js demonstration. Read as a .cjs file.
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
// queue and prevent these Promise and timer callbacks from running.`,
                    result: "nextTick 1\nnextTick 2\nnextTick 3\npromise\ntimer",
                    explanation: [
                        "The next-tick queue finishes before these Promise and timer callbacks.",
                        "Removing the limit would keep that queue non-empty."
                    ]
                },
                {
                    title: "Work across separate tasks",
                    description: [
                        "Timer callbacks run later parts of this finite operation."
                    ],
                    language: "javascript",
                    code: `let part = 0;
setTimeout(() => console.log('other task'), 0);
function workInParts() {
  console.log('part', ++part);
  if (part < 3) setTimeout(workInParts, 0);
}
workInParts();
// part 1, other task, part 2, part 3
// Each later part is a task. The previously queued timer can run
// between parts. This does not guarantee a paint after every part.`,
                    result: "part 1\nother task\npart 2\npart 3",
                    explanation: [
                        "The already queued timer gets a turn between parts.",
                        "This task split does not guarantee a paint after every part."
                    ],
                    runnable: true
                },
                {
                    title: "Node.js worker threads",
                    description: [
                        "The example runs as `worker.cjs` in Node.js.",
                        "The same file selects its main-thread or worker branch.",
                        "Worker from `node:worker_threads` starts another JavaScript thread, separate from the host input/output worker pool."
                    ],
                    language: "javascript",
                    code: `// Node.js CommonJS file worker.cjs; no browser APIs.
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
// runs on the main event-loop thread.`,
                    result: "main code continues\nworker result 500000500000",
                    explanation: [
                        "The worker branch performs the calculation and sends its result through `parentPort`.",
                        "The worker exits when its work is complete.",
                        "The main-thread message callback runs through the main event loop."
                    ]
                }
            ]
        }
    ]
};

export default note;
