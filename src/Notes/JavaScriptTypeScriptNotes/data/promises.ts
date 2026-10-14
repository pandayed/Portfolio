import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "promises",
    title: "Promises",
    summary: "Read one eventual result, chain dependent steps, and convert callback APIs.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN: using promises",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises"
        },
        {
            title: "MDN: Promise reference",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise"
        }
    ],
    sections: [
        {
            id: "outcomes",
            title: "Read a successful or failed result",
            bullets: [
                "A Promise represents one eventual result. Pending means the result is not settled yet.",
                "Fulfilled means success with a value. Rejected means failure with a reason. Either outcome is called settled.",
                "A settled Promise keeps its outcome. It can have several handlers, including handlers registered after settlement.",
                "A handler is a callback registered for an outcome. then registers a fulfillment handler. catch registers a rejection handler.",
                "Promise.resolve wraps a plain value in a fulfilled Promise. Promise.reject creates a rejected Promise.",
                "Handlers run after the current synchronous code. The event-loop lesson explains their scheduling."
            ],
            examples: [
                {
                    title: "Read two separate outcomes",
                    description: [
                        "Read an available result and handle an available failure."
                    ],
                    language: "javascript",
                    code: "const success = Promise.resolve('ready');\nconst failure = Promise.reject(new Error('failed'));\nsuccess.then((value) => console.log(value));\nfailure.catch((error) => console.log(error.message));",
                    result: "ready\nfailed",
                    explanation: [
                        "then receives the fulfillment value.",
                        "catch receives the rejection reason. Error objects provide a message and stack trace."
                    ],
                    runnable: true
                }
            ]
        },
        {
            id: "constructor",
            title: "Create a Promise for a later result",
            bullets: [
                "new Promise takes an executor function. The constructor calls that function immediately.",
                "The executor receives resolve and reject. Call resolve with the result or reject with the failure.",
                "The constructor ignores the executor’s return value. A synchronous throw from an ordinary executor rejects the Promise.",
                "Use the constructor when adapting a callback API. Return existing Promises directly when no adaptation is needed."
            ],
            examples: [
                {
                    title: "Settle the result once",
                    description: [
                        "Keep the supplied resolve function and call it after constructing the Promise."
                    ],
                    language: "javascript",
                    code: "let complete;\nconst pending = new Promise((resolve) => {\n  console.log('executor');\n  complete = resolve;\n});\npending.then((value) => console.log(value));\ncomplete('first');\ncomplete('second');\npending.then((value) => console.log('late handler:', value));\nconsole.log('caller finished');",
                    result: "executor\ncaller finished\nfirst\nlate handler: first",
                    explanation: [
                        "The executor runs during construction.",
                        "The second resolve call cannot replace the first result.",
                        "Both handlers receive first, including the handler attached after settlement."
                    ],
                    runnable: true
                }
            ]
        },
        {
            id: "chains",
            title: "Pass results through a chain",
            bullets: [
                "then and catch each return a new Promise. A chain connects those returned Promises.",
                "Returning a plain value fulfills the next Promise. Returning a Promise makes the next step wait for its outcome.",
                "Throwing rejects the next Promise. A missing rejection handler passes that rejection onward.",
                "Returning a value from catch recovers from failure. Throwing inside catch keeps the chain rejected.",
                "A handler with no return supplies undefined. Return an operation’s Promise when later steps need its result."
            ],
            examples: [
                {
                    title: "Transform, fail, and recover",
                    description: [
                        "Follow the result of each handler through one chain."
                    ],
                    language: "javascript",
                    code: `const original = Promise.resolve(2);
const next = original
  .then((number) => number + 1) // plain value: 3
  .then((number) => Promise.resolve(number * 2)) // follows Promise: 6
  .then((number) => {
    console.log(number); // 6
    throw new Error('step failed'); // rejects the next Promise here
  })
  .then(() => console.log('skipped')) // no rejection handler here
  .catch((error) => {
    console.log(error.message); // step failed
    return 'recovered'; // new Promise fulfills
  })
  .then(console.log); // recovered
console.log(original === next); // false: a different Promise`,
                    result: "false\n6\nstep failed\nrecovered",
                    explanation: [
                        "original and next are different Promises.",
                        "The first two handlers produce 3, then 6. Throwing skips the success-only handler.",
                        "catch returns recovered, so the final then runs."
                    ],
                    runnable: true
                },
                {
                    title: "Return the next operation",
                    description: [
                        "Convert a known result into a delayed result without losing the Promise."
                    ],
                    language: "javascript",
                    code: "function appendLater(value) {\n  return new Promise((resolve) => {\n    setTimeout(() => resolve(value + ' done'), 0);\n  });\n}\nPromise.resolve('work')\n  .then((value) => appendLater(value))\n  .then((value) => console.log(value));",
                    result: "work done",
                    explanation: [
                        "The arrow handler returns appendLater’s Promise.",
                        "The final handler waits for that Promise. Using a block body without return would supply undefined instead."
                    ],
                    runnable: true
                }
            ]
        },
        {
            id: "following",
            title: "Follow another Promise or thenable",
            bullets: [
                "Resolving with another Promise makes the outer Promise follow its eventual outcome.",
                "Resolved does not always mean fulfilled. The outer Promise can be resolved to a Promise that is still pending.",
                "A thenable is an object with a callable then method. Promise resolution also follows that method’s supplied outcome.",
                "Once resolution starts, a later resolve or reject call cannot replace it."
            ],
            examples: [
                {
                    title: "Adopt another result",
                    description: [
                        "Compare a thenable with a pending inner Promise."
                    ],
                    language: "javascript",
                    code: `const thenable = {
  then(resolve) {
    resolve('from thenable');
  },
};
Promise.resolve(thenable).then(console.log); // from thenable

let finishInner;
const inner = new Promise((resolve) => { finishInner = resolve; });
const outer = new Promise((resolve, reject) => {
  resolve(inner); // outer follows inner, which is still pending
  reject(new Error('ignored')); // cannot undo that resolution
});
outer.then((value) => console.log('outer:', value));
console.log('inner still pending');
finishInner('ready');
// inner still pending appears before outer: ready.`,
                    result: "inner still pending\nfrom thenable\nouter: ready",
                    explanation: [
                        "Promise.resolve follows the custom then method.",
                        "outer remains pending until inner supplies ready. Its later reject call is ignored."
                    ],
                    runnable: true
                }
            ]
        },
        {
            id: "finally",
            title: "Run cleanup for either outcome",
            bullets: [
                "finally returns a new Promise and calls its handler with no result arguments.",
                "A successful cleanup preserves the earlier value or rejection. A plain return value from the cleanup does not replace it.",
                "A cleanup that throws or returns a rejected Promise replaces the earlier outcome with that failure.",
                "A cleanup that returns a pending Promise delays the next step until that Promise settles."
            ],
            examples: [
                {
                    title: "Preserve success or replace it with cleanup failure",
                    description: [
                        "Compare a successful cleanup with a failed cleanup."
                    ],
                    language: "javascript",
                    code: "Promise.resolve('kept')\n  .finally(() => 'ignored')\n  .then((value) => {\n    console.log(value);\n    return Promise.reject(new Error('original'))\n      .finally(() => 'ignored');\n  })\n  .catch((error) => {\n    console.log(error.message);\n    return Promise.resolve('success').finally(() => {\n      throw new Error('cleanup failed');\n    });\n  })\n  .catch((error) => console.log(error.message));",
                    result: "kept\noriginal\ncleanup failed",
                    explanation: [
                        "The successful finally handlers preserve kept and original.",
                        "The thrown cleanup failure replaces success. Returning Promise.reject from that handler would also replace it."
                    ],
                    runnable: true
                }
            ]
        },
        {
            id: "callback-conversion",
            title: "Convert an error-first callback",
            bullets: [
                "An error-first callback receives an error as its first argument and a result as its second.",
                "The adapter rejects for an error and resolves for a successful value.",
                "One Promise represents one outcome. Repeated event notifications need an event subscription rather than one Promise."
            ],
            examples: [
                {
                    title: "Adapt a legacy callback API",
                    description: [
                        "Use a self-contained callback API that reads a theme or reports a missing key."
                    ],
                    language: "javascript",
                    code: `function legacyGetValue(key, callback) {
  setTimeout(() => {
    if (key === 'theme') callback(null, 'dark');
    else callback(new Error('Missing key'));
  }, 0);
}
function getValueAsPromise(key) {
  return new Promise((resolve, reject) => {
    legacyGetValue(key, (error, value) => {
      if (error) reject(error);
      else resolve(value);
    });
  });
}
getValueAsPromise('theme').then(console.log); // dark
getValueAsPromise('missing').catch((error) => console.log(error.message));
// Missing key`,
                    result: "dark\nMissing key",
                    explanation: [
                        "The caller uses then or catch after the adapter returns.",
                        "The callback settles the Promise when the timer calls it."
                    ],
                    runnable: true
                }
            ]
        }
    ]
};

export default note;
