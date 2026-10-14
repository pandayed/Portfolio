import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "promise-combinators",
    title: "Promise combinators",
    summary: "Choose which outcomes a group of operations must provide.",
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
            id: "all",
            title: "Wait for every success with Promise.all",
            bullets: [
                "Promise.all accepts an iterable of values and Promises. It fulfills after every input fulfills, returning results in input order.",
                "It rejects on the first rejection it observes. Empty input fulfills with an empty array.",
                "The method observes work passed to it. Function calls in its argument start work before it receives their returned Promises.",
                "Sequential calls wait before starting the next operation. Concurrent calls start independent operations before waiting for their group."
            ],
            examples: [
                {
                    title: "Start independent work together",
                    description: [
                        "Compare sequential calls with calls passed to Promise.all."
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
                        "The result array keeps the order of the inputs. Concurrent waiting does not mean simultaneous JavaScript execution."
                    ],
                    runnable: true
                },
                {
                    title: "Start independent branches after their prerequisite",
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
            id: "choices",
            title: "Choose the completion rule",
            bullets: [
                "A settlement is either fulfillment or rejection. Choose a combinator according to the outcomes the caller needs.",
                "Promise.any rejects with AggregateError when every input rejects. Its errors array follows input order.",
                "Promise.race with empty input stays pending. Promise.any with empty input rejects. Promise.allSettled with empty input fulfills with an empty array."
            ],
            examples: [
                {
                    title: "Compare allSettled, race, and any",
                    description: [
                        "The delayed helper can fulfill or reject. Compare the same fast-failure and slow-success pattern."
                    ],
                    language: "javascript",
                    code: `const delayed = (ms, value, fails = false) => new Promise((resolve, reject) => {
  setTimeout(() => fails ? reject(new Error(value)) : resolve(value), ms);
});
async function inspect() {
  const first = delayed(20, 'first input');
  const second = delayed(0, 'second input');
  console.log(await Promise.all([first, second]));
  // ['first input', 'second input']: input order, not completion order

  const settled = await Promise.allSettled([
    Promise.resolve('ok'), Promise.reject(new Error('bad')),
  ]);
  console.log(settled[0].status, settled[0].value); // fulfilled ok
  console.log(settled[1].status, settled[1].reason.message); // rejected bad

  try {
    await Promise.race([delayed(0, 'fast failure', true), delayed(20, 'success')]);
  } catch (error) { console.log(error.message); } // fast failure
  console.log(await Promise.any([
    delayed(0, 'fast failure', true), delayed(20, 'success'),
  ])); // success: ignores the earlier rejection

  try {
    await Promise.any([Promise.reject('A'), Promise.reject('B')]);
  } catch (error) {
    console.log(error.name, error.errors.join(',')); // AggregateError A,B
  }
}
inspect();`,
                    result: "['first input', 'second input']\nfulfilled ok\nrejected bad\nfast failure\nsuccess\nAggregateError A,B",
                    explanation: [
                        "all returns values in input order rather than completion order.",
                        "allSettled supplies one status record per input. race accepts the first outcome. any waits for a success despite an earlier failure."
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
                        "all",
                        "Every input fulfills",
                        "First observed rejection"
                    ],
                    [
                        "allSettled",
                        "Every input settles; returns status records",
                        "No rejection from an input outcome"
                    ],
                    [
                        "race",
                        "First settled input fulfills",
                        "First settled input rejects"
                    ],
                    [
                        "any",
                        "First fulfillment",
                        "Every input rejects"
                    ]
                ]
            }
        },
        {
            id: "arrays",
            title: "Collect callback Promises before waiting",
            bullets: [
                "forEach discards callback return values and returns undefined. Awaiting that return cannot wait for the callback Promises.",
                "map collects callback return values. Pass its resulting Promise array to Promise.all.",
                "Awaiting an array returns the array itself. It does not await entries inside that array.",
                "Use a for...of loop with await when each operation must finish before the next starts."
            ],
            examples: [
                {
                    title: "Compare array iteration choices",
                    description: [
                        "Each save returns a timer-backed Promise. Observe what each form waits for."
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
                        "forEach and awaiting the map array do not wait for the individual saves.",
                        "Promise.all waits for saves 3 and 4. The final loop waits for 5 before starting 6."
                    ],
                    runnable: true
                }
            ]
        },
        {
            id: "continuing-work",
            title: "A combinator does not cancel other work",
            bullets: [
                "A combined Promise’s settlement does not stop input operations. Those operations continue unless their own API supports cancellation.",
                "A race can select a timeout result while the original operation keeps running. Cancellation is a separate request to that operation."
            ],
            examples: [
                {
                    title: "Watch a remaining operation finish",
                    description: [
                        "Use the same pending operation in all and race."
                    ],
                    language: "javascript",
                    code: `async function inspect() {
  const slow = new Promise((resolve) => setTimeout(() => {
    console.log('slow still finished');
    resolve('slow');
  }, 20));
  try {
    await Promise.all([slow, Promise.reject(new Error('early failure'))]);
  } catch (error) { console.log(error.message); } // early failure
  console.log(await Promise.race([Promise.resolve('winner'), slow])); // winner
  await slow; // slow still finished: neither combinator cancelled it
}
inspect();`,
                    result: "early failure\nwinner\nslow still finished",
                    explanation: [
                        "Rejecting all and settling race do not cancel the slow timer.",
                        "The final await observes slow finishing."
                    ],
                    runnable: true
                }
            ]
        }
    ]
};

export default note;
