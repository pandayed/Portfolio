import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "async-await",
    title: "async and await",
    summary: "Async functions use Promises for results and failures.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    inlineCode: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN: async functions",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function"
        },
        {
            title: "MDN: await",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await"
        }
    ],
    sections: [
        {
            id: "async-functions",
            title: "Async function results",
            bullets: [
                "An `async` function always returns a `Promise`.",
                "A returned value fulfills it.",
                "A `throw` rejects it.",
                "Returning another `Promise` makes the returned `Promise` follow its outcome.",
                "An `async` function starts running when called.",
                "Adding `async` does not move synchronous calculations to another thread."
            ],
            examples: [
                {
                    title: "Fulfilled and rejected results",
                    description: [
                        "The two `async` functions return different `Promise` outcomes."
                    ],
                    language: "javascript",
                    code: `async function answer() { return 42; }
async function fail() { throw new Error('failed'); }
const result = answer();
console.log(result instanceof Promise); // true
result.then(console.log); // 42, later
fail().catch((error) => console.log(error.message)); // failed, later
// true, 42, failed`,
                    result: "true\n42\nfailed",
                    explanation: [
                        "`answer` returns a `Promise` fulfilled with 42.",
                        "`fail` returns a rejected `Promise` rather than throwing to its caller synchronously."
                    ],
                    runnable: true
                }
            ]
        },
        {
            id: "await-results",
            title: "Awaited results",
            bullets: [
                "`await` reads a `Promise`’s fulfillment value.",
                "A rejection throws its reason at the `await` expression.",
                "While this function waits, the caller can continue.",
                "Code after `await` resumes later, even for an available value.",
                "`await` is allowed inside an `async` function and at the top level of a module.",
                "A classic script cannot use top-level `await`.",
                "An `async` function or a module allows `await`."
            ],
            examples: [
                {
                    title: "Dependent operations",
                    description: [
                        "The user lookup finishes before the order lookup starts."
                    ],
                    language: "javascript",
                    code: "const getUser = () => Promise.resolve({ id: 7 });\nconst getOrders = (id) => Promise.resolve(['order for ' + id]);\nasync function load() {\n  const user = await getUser();\n  const orders = await getOrders(user.id);\n  console.log(orders[0]);\n}\nload().catch((error) => console.log(error.message));",
                    result: "order for 7",
                    explanation: [
                        "The second call requires the first call’s `id`.",
                        "The final `catch` handles rejection from the returned `load` `Promise`."
                    ],
                    runnable: true
                },
                {
                    title: "Top-level await",
                    description: [
                        "The file is `answer.js`.",
                        "The HTML page loads it with `<script type=\"module\" src=\"answer.js\"></script>`."
                    ],
                    language: "javascript",
                    code: "const answer = await Promise.resolve(42);\nconsole.log(answer);",
                    result: "42",
                    explanation: [
                        "Module loading allows `await` outside a function.",
                        "The same source in a classic script causes a `SyntaxError` before execution."
                    ]
                }
            ]
        },
        {
            id: "rejections",
            title: "Awaited rejections",
            bullets: [
                "`try`/`catch` catches an awaited rejection inside the function.",
                "Calling a `Promise`-returning function without awaiting it does not catch that rejection.",
                "A rejection handler can recover or add useful context.",
                "Without a local handler, the function’s returned `Promise` rejects for its caller.",
                "Every started `Promise` needs an owner.",
                "The owner awaits it, returns it, or attaches a rejection handler for background work.",
                "An unhandled rejection is reported according to the browser or Node.js policy."
            ],
            examples: [
                {
                    title: "Local rejection handling",
                    description: [
                        "The rejected `Promise` interrupts the function at `await`."
                    ],
                    language: "javascript",
                    code: `async function inspect() {
  try {
    await Promise.reject(new Error('request failed'));
    console.log('not reached');
  } catch (error) {
    console.log(error.message); // request failed
  }
}
inspect();`,
                    result: "request failed",
                    explanation: [
                        "`await` throws the rejection reason to `catch`.",
                        "The statement after the rejected `await` is skipped."
                    ],
                    runnable: true
                },
                {
                    title: "Background operation failures",
                    description: [
                        "The current function starts background work without waiting for it."
                    ],
                    language: "javascript",
                    code: "const save = () => Promise.reject(new Error('save failed'));\nsave().catch((error) => console.log('background:', error.message));",
                    result: "background: save failed",
                    explanation: [
                        "The attached `catch` handles rejection from `save`.",
                        "The caller continues without awaiting this handled background operation."
                    ],
                    runnable: true
                }
            ]
        },
        {
            id: "cleanup",
            title: "Failure context and cleanup",
            bullets: [
                "`finally` runs when the function leaves its `try`/`catch` after success or failure.",
                "Returning a different result from cleanup replaces the earlier result.",
                "`return await` inside `try` keeps the operation’s settlement inside the local `catch` or `finally`.",
                "A plain `return` passes its `Promise` onward immediately."
            ],
            examples: [
                {
                    title: "Original error causes",
                    description: [
                        "The example loads two dependent results.",
                        "The first lookup fails on the second call."
                    ],
                    language: "javascript",
                    code: `async function loadDashboard(fails = false) {
  console.log('loading');
  try {
    const user = await (fails
      ? Promise.reject(new Error('user offline'))
      : Promise.resolve({ id: 7 }));
    const orders = await Promise.resolve(['book']);
    return { user, orders };
  } catch (error) {
    throw new Error('Could not load dashboard', { cause: error });
  } finally {
    console.log('cleanup');
  }
}
async function inspectDashboard() {
  const data = await loadDashboard();
  console.log(data.user.id, data.orders[0]);
  try { await loadDashboard(true); }
  catch (error) { console.log(error.message, error.cause.message); }
}
inspectDashboard();
// loading, cleanup, 7 book
// loading, cleanup, Could not load dashboard user offline`,
                    result: "loading\ncleanup\n7 book\nloading\ncleanup\nCould not load dashboard user offline",
                    explanation: [
                        "The `cause` property keeps the original `user offline` error.",
                        "The orders step is skipped after the user failure.",
                        "`finally` runs for both calls."
                    ],
                    runnable: true
                }
            ]
        },
        {
            id: "executor",
            title: "Async Promise executors",
            bullets: [
                "An `async` executor returns a separate `Promise`.",
                "The `Promise` constructor ignores that return value.",
                "A rejection of that separate `Promise` does not reject the outer `Promise`.",
                "The outer `Promise` may stay pending.",
                "An ordinary executor can convert a callback API to a `Promise`.",
                "An `async` function can use `Promise`-based work directly."
            ],
            examples: [
                {
                    title: "Direct async failures",
                    description: [
                        "The commented construction is an incorrect pattern.",
                        "The example calls the direct `async` function."
                    ],
                    language: "javascript",
                    code: "// Incorrect: the executor's rejected Promise is ignored.\n// const outer = new Promise(async (resolve) => {\n//   throw new Error('executor failed');\n// });\nasync function load() {\n  throw new Error('load failed');\n}\nload().catch((error) => console.log(error.message));",
                    result: "load failed",
                    explanation: [
                        "In the commented pattern neither `resolve` nor `reject` settles `outer`.",
                        "Its `catch` would not handle the executor’s separate rejection.",
                        "The direct `async` function returns its own rejected `Promise` to the caller."
                    ],
                    runnable: true
                }
            ]
        }
    ]
};

export default note;
