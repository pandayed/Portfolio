import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "promise-combinators",
    title: "Promise combinators",
    summary: "Completion rules for groups of asynchronous operations.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    inlineCode: true,
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
            id: "all",
            title: "Promise.all",
            bullets: [
                "`Promise.all` accepts an iterable of values and Promises. These examples use arrays.",
                "It fulfills after every input fulfills.",
                "Its result is an array of values in input order, even when the inputs finish in a different order.",
                "It rejects on the first rejection it observes.",
                "Empty input fulfills with an empty array.",
                "The method observes the Promises passed to it. It does not start the operations itself."
            ],
            examples: [
                {
                    title: "Results in input order",
                    description: [
                        "The second operation finishes before the first operation."
                    ],
                    language: "javascript",
                    code: "const first = new Promise((resolve) => {\n  setTimeout(() => resolve('first input'), 20);\n});\nconst second = Promise.resolve('second input');\n\nPromise.all([first, second]).then((values) => {\n  console.log(values.join(', '));\n});",
                    result: "first input, second input",
                    explanation: [
                        "`second` is already fulfilled while `first` is still pending.",
                        "The result still places the value from `first` before the value from `second`."
                    ],
                    runnable: true
                },
                {
                    title: "Rejected input",
                    description: [
                        "One operation fulfills and another rejects."
                    ],
                    language: "javascript",
                    code: "Promise.all([\n  Promise.resolve('user loaded'),\n  Promise.reject(new Error('settings failed')),\n]).catch((error) => {\n  console.log(error.message);\n});",
                    result: "settings failed",
                    explanation: [
                        "The rejection makes the combined Promise reject.",
                        "The combined Promise does not provide a successful results array."
                    ],
                    runnable: true
                },
                {
                    title: "Dependent branches",
                    description: [
                        "Orders and permissions each require part of the user result."
                    ],
                    language: "javascript",
                    code: `const getUser = () => Promise.resolve({ id: 7, role: 'reader' });
const getOrders = (id) => { console.log('orders for', id); return Promise.resolve(['book']); };
const getPermissions = (role) => { console.log('role', role); return Promise.resolve(['read']); };
async function load() {
  const user = await getUser(); // id and role must exist before these calls
  const [orders, permissions] = await Promise.all([
    getOrders(user.id),
    getPermissions(user.role),
  ]);
  console.log(orders[0], permissions[0]);
}
load();
// orders for 7, role reader, book read`,
                    result: "orders for 7\nrole reader\nbook read",
                    explanation: [
                        "The user request finishes before either dependent call starts.",
                        "Orders and permissions can then wait concurrently."
                    ],
                    runnable: true
                }
            ]
        },
        {
            id: "all-settled",
            title: "Promise.allSettled",
            bullets: [
                "A Promise settles when it fulfills or rejects.",
                "`Promise.allSettled` waits for every input to settle.",
                "It fulfills with one outcome record per input, in input order.",
                "A fulfilled record has `status: \"fulfilled\"` and a `value`.",
                "A rejected record has `status: \"rejected\"` and a `reason`.",
                "An input rejection becomes a record rather than rejecting the combined Promise.",
                "Empty input fulfills with an empty array."
            ],
            examples: [
                {
                    title: "Fulfilled and rejected records",
                    description: [
                        "The two inputs have different outcomes."
                    ],
                    language: "javascript",
                    code: "Promise.allSettled([\n  Promise.resolve('user loaded'),\n  Promise.reject(new Error('settings failed')),\n]).then((results) => {\n  const [user, settings] = results;\n  console.log(user.status, user.value);\n  console.log(settings.status, settings.reason.message);\n});",
                    result: "fulfilled user loaded\nrejected settings failed",
                    explanation: [
                        "The callback receives both records after both inputs settle.",
                        "The first record contains the fulfillment value.",
                        "The second record contains the rejection reason."
                    ],
                    runnable: true
                }
            ]
        },
        {
            id: "race",
            title: "Promise.race",
            bullets: [
                "`Promise.race` follows the first input to settle.",
                "A first fulfillment fulfills the combined Promise.",
                "A first rejection rejects the combined Promise, even if another input could fulfill later.",
                "Its result is one value or rejection reason, not an array of results.",
                "Empty input leaves the combined Promise pending."
            ],
            examples: [
                {
                    title: "First fulfillment",
                    description: [
                        "One operation is already fulfilled. The other finishes later."
                    ],
                    language: "javascript",
                    code: "const slow = new Promise((resolve) => {\n  setTimeout(() => {\n    console.log('slow operation finished');\n    resolve('slow result');\n  }, 20);\n});\n\nPromise.race([slow, Promise.resolve('fast result')]).then((value) => {\n  console.log(value);\n});",
                    result: "fast result\nslow operation finished",
                    explanation: [
                        "The already fulfilled input wins despite appearing second in the array.",
                        "The slower operation still finishes. Settling the race does not cancel it."
                    ],
                    runnable: true
                },
                {
                    title: "First rejection",
                    description: [
                        "A rejected input settles before a pending successful operation."
                    ],
                    language: "javascript",
                    code: "const slow = new Promise((resolve) => {\n  setTimeout(() => resolve('success'), 20);\n});\n\nPromise.race([\n  Promise.reject(new Error('fast failure')),\n  slow,\n]).catch((error) => {\n  console.log(error.message);\n});",
                    result: "fast failure",
                    explanation: [
                        "The first settlement is a rejection, so the combined Promise rejects.",
                        "The later success does not change that result."
                    ],
                    runnable: true
                }
            ]
        },
        {
            id: "any",
            title: "Promise.any",
            bullets: [
                "`Promise.any` fulfills with the first input fulfillment.",
                "Earlier rejections do not prevent a later input from fulfilling it.",
                "Its fulfillment value is one value, not an array.",
                "If every input rejects, it rejects with an `AggregateError`.",
                "The error’s `errors` array contains the rejection reasons in input order.",
                "Empty input also rejects with an `AggregateError`. Its `errors` array is empty."
            ],
            examples: [
                {
                    title: "Success after a rejection",
                    description: [
                        "One input rejects immediately. Another fulfills later."
                    ],
                    language: "javascript",
                    code: "const success = new Promise((resolve) => {\n  setTimeout(() => resolve('available result'), 20);\n});\n\nPromise.any([\n  Promise.reject(new Error('unavailable result')),\n  success,\n]).then((value) => {\n  console.log(value);\n});",
                    result: "available result",
                    explanation: [
                        "The rejected input does not end the wait for a fulfillment."
                    ],
                    runnable: true
                },
                {
                    title: "All inputs rejected",
                    description: [
                        "Both inputs reject with string reasons."
                    ],
                    language: "javascript",
                    code: "Promise.any([\n  Promise.reject('A'),\n  Promise.reject('B'),\n]).catch((error) => {\n  console.log(error.name);\n  console.log(error.errors.join(', '));\n});",
                    result: "AggregateError\nA, B",
                    explanation: [
                        "The combined Promise rejects because no input fulfills.",
                        "`errors` preserves the input order of the reasons."
                    ],
                    runnable: true
                }
            ]
        },
        {
            id: "choices",
            title: "Combinator comparisons",
            bullets: [
                "The required outcomes determine which combinator fits an operation.",
                "The examples below compare waiting rules explicitly.",
                "Sequential calls wait before starting the next operation.",
                "Concurrent calls start independent operations before waiting for their results."
            ],
            examples: [
                {
                    title: "Promise.race and Promise.any",
                    description: [
                        "Both combinators receive the same early rejection and later fulfillment."
                    ],
                    language: "javascript",
                    code: "const success = new Promise((resolve) => {\n  setTimeout(() => resolve('success'), 20);\n});\nconst inputs = [Promise.reject(new Error('early failure')), success];\n\nPromise.race(inputs).catch((error) => {\n  console.log('race:', error.message);\n});\nPromise.any(inputs).then((value) => {\n  console.log('any:', value);\n});",
                    result: "race: early failure\nany: success",
                    explanation: [
                        "`Promise.race` follows the first settlement, which is a rejection.",
                        "`Promise.any` continues waiting for the successful input."
                    ],
                    runnable: true
                },
                {
                    title: "Sequential and concurrent calls",
                    description: [
                        "The example compares sequential calls with calls passed to `Promise.all`."
                    ],
                    language: "javascript",
                    code: `function load(label) {
  console.log('start', label);
  return new Promise((resolve) => setTimeout(() => {
    console.log('finish', label);
    resolve(label);
  }, 0));
}
async function compare() {
  console.log('sequential');
  const user = await load('user');
  const settings = await load('settings');
  console.log(user, settings);
  // start user, finish user, start settings, finish settings, user settings

  console.log('concurrent');
  const both = await Promise.all([load('user'), load('settings')]);
  console.log(both.join(' '));
  // start user, start settings, then their finishes, then user settings
}
compare();`,
                    result: "sequential\nstart user\nfinish user\nstart settings\nfinish settings\nuser settings\nconcurrent\nstart user\nstart settings\nfinish user\nfinish settings\nuser settings",
                    explanation: [
                        "Both concurrent calls start before either finishes.",
                        "The result array keeps the order of the inputs.",
                        "Concurrent waiting does not mean simultaneous JavaScript execution."
                    ],
                    runnable: true
                }
            ],
            table: {
                columns: [
                    "Method",
                    "Fulfillment",
                    "Rejection"
                ],
                rows: [
                    [
                        "`Promise.all`",
                        "Every input fulfills; returns values",
                        "First observed rejection"
                    ],
                    [
                        "`Promise.allSettled`",
                        "Every input settles; returns outcome records",
                        "No rejection from an input outcome"
                    ],
                    [
                        "`Promise.race`",
                        "First settled input fulfills",
                        "First settled input rejects"
                    ],
                    [
                        "`Promise.any`",
                        "First input fulfillment",
                        "Every input rejects"
                    ]
                ]
            }
        },
        {
            id: "arrays",
            title: "Array iteration comparison",
            bullets: [
                "`forEach` discards callback `return` values and returns `undefined`.",
                "Awaiting that `return` cannot wait for the callback Promises.",
                "`map` collects callback `return` values.",
                "The resulting Promise array becomes the input to `Promise.all`.",
                "Awaiting an array returns the array itself.",
                "It does not `await` entries inside that array.",
                "A `for...of` loop with `await` waits for each operation before starting the next."
            ],
            examples: [
                {
                    title: "Array iteration choices",
                    description: [
                        "Each save returns a timer-backed Promise.",
                        "The example shows what each form waits for."
                    ],
                    language: "javascript",
                    code: `const save = (id) => new Promise((resolve) => setTimeout(() => {
  console.log('saved', id);
  resolve(id);
}, 0));
async function inspect() {
  const returned = [1, 2].forEach((id) => save(id));
  console.log(returned); // undefined: forEach discards callback results
  await returned;
  console.log('forEach wait ended'); // before saved 1 and saved 2

  const promises = [3, 4].map((id) => save(id));
  console.log(Array.isArray(await promises)); // true: await does not await array entries
  await Promise.all(promises);
  console.log('all saved'); // after saved 3 and saved 4

  for (const id of [5, 6]) await save(id);
  // saved 5 precedes starting and saving 6
}
inspect();`,
                    result: "undefined\nforEach wait ended\ntrue\nsaved 1\nsaved 2\nsaved 3\nsaved 4\nall saved\nsaved 5\nsaved 6",
                    explanation: [
                        "`forEach` and awaiting the `map` array do not wait for the individual saves.",
                        "`Promise.all` waits for saves 3 and 4.",
                        "The final loop waits for 5 before starting 6."
                    ],
                    runnable: true
                }
            ]
        },
        {
            id: "continuing-work",
            title: "Remaining operations",
            bullets: [
                "A combined Promise’s settlement does not stop input operations.",
                "Those operations continue unless their own API supports cancellation.",
                "A race can select a timeout result while the original operation keeps running.",
                "Cancellation is a separate request to that operation."
            ],
            examples: [
                {
                    title: "Pending work after rejection",
                    description: [
                        "One input fails while a timer-backed operation is still pending."
                    ],
                    language: "javascript",
                    code: "const slow = new Promise((resolve) => {\n  setTimeout(() => {\n    console.log('slow still finished');\n    resolve('slow');\n  }, 20);\n});\n\nPromise.all([\n  slow,\n  Promise.reject(new Error('early failure')),\n]).catch((error) => {\n  console.log(error.message);\n});",
                    result: "early failure\nslow still finished",
                    explanation: [
                        "The combined Promise rejects before the timer finishes.",
                        "The rejection does not cancel the timer or its operation."
                    ],
                    runnable: true
                }
            ]
        }
    ]
};

export default note;
