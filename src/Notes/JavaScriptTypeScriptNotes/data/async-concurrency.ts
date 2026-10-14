import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "async-concurrency",
    title: "Limiting asynchronous concurrency",
    summary: "Control how many operations start and define what workers do after failure.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN: Promise.all",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all"
        },
        {
            title: "MDN: Array.map",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map"
        }
    ],
    sections: [
        {
            id: "eager-starts",
            title: "A Promise group does not limit starts",
            bullets: [
                "Array.map calls its mapper immediately for every present item. Promise.all observes the returned Promises after those calls.",
                "For a large list, starting every request can exceed service capacity or use too much memory.",
                "A concurrency limit allows at most a chosen number of pending mapper calls at once."
            ],
            examples: [
                {
                    title: "Count starts before waiting",
                    description: [
                        "Map starts all three operations before Promise.all is called."
                    ],
                    language: "javascript",
                    code: `let starts = 0;
const promises = [1, 2, 3].map((value) => {
  starts += 1;
  return Promise.resolve(value);
});
console.log(starts); // 3: map already called every mapper
Promise.all(promises).then((values) => console.log(values.join(','))); // 1,2,3`,
                    result: "3\n1,2,3",
                    explanation: [
                        "The counter reaches 3 during map.",
                        "Wrapping the result array in Promise.all does not postpone those mapper calls."
                    ],
                    runnable: true
                }
            ]
        },
        {
            id: "worker-limit",
            title: "Give each async worker one item at a time",
            bullets: [
                "A worker here is an async function that takes one item, waits for its mapper result, then takes another. It is not a worker thread.",
                "Each worker reserves its next index before await. Workers on the same JavaScript thread therefore do not reserve the same index.",
                "Store each result under its input index to preserve input order. Completion order may differ.",
                "Validate the limit as a positive integer. An empty input starts no workers and returns an empty array.",
                "Decide the failure policy explicitly. This helper rejects when one worker fails, while other workers can finish and take more items."
            ],
            examples: [
                {
                    title: "Measure a two-operation limit and its failure behavior",
                    description: [
                        "The mapper waits on a timer so active operations can overlap.",
                        "The example also checks limit 0 and a mapper failure while another worker is pending."
                    ],
                    language: "javascript",
                    code: `async function mapWithConcurrency(items, limit, mapper) {
  if (!Number.isInteger(limit) || limit < 1) {
    throw new RangeError('Invalid limit'); // failure for limit 0
  }
  const results = new Array(items.length);
  let nextIndex = 0;
  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      results[index] = await mapper(items[index]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}
async function inspectFailures() {
  try {
    await mapWithConcurrency([1], 0, (number) => number);
  } catch (error) { console.log(error.name, error.message); }
  // RangeError Invalid limit: the mapper is not called

  let finishSecond;
  const failing = mapWithConcurrency([1, 2, 3], 2, (number) => {
    console.log('failure demo starts', number);
    if (number === 1) return Promise.reject(new Error('mapper failed'));
    if (number === 2) return new Promise((resolve) => { finishSecond = resolve; });
    return Promise.resolve(number);
  });
  try { await failing; }
  catch (error) { console.log(error.message); } // mapper failed
  finishSecond(2); // other worker completes item 2 and starts item 3
}
async function inspectConcurrency() {
  let active = 0;
  let highest = 0;
  const results = await mapWithConcurrency([1, 2, 3, 4], 2, async (number) => {
    active += 1;
    highest = Math.max(highest, active);
    await new Promise((resolve) => setTimeout(resolve, 0));
    active -= 1;
    return number * 10;
  });
  console.log(results.join(',')); // 10,20,30,40: input order
  console.log(highest); // 2
  await inspectFailures();
}
inspectConcurrency();
// Success: 10,20,30,40, then 2.
// Failure: RangeError Invalid limit, failure demo starts 1,
// failure demo starts 2, mapper failed, failure demo starts 3.
// A mapper failure does not stop other workers from taking more items.`,
                    result: "10,20,30,40\n2\nRangeError Invalid limit\nfailure demo starts 1\nfailure demo starts 2\nmapper failed\nfailure demo starts 3",
                    explanation: [
                        "The results array retains input order. highest records at most two active mapper calls.",
                        "A zero limit is rejected before any mapper call.",
                        "Failure of item 1 rejects the helper. Resolving item 2 then lets its surviving worker start item 3.",
                        "A shared stop flag could stop taking new items after failure. Cancelling work already started still needs operation-specific support."
                    ],
                    runnable: true
                }
            ]
        }
    ]
};

export default note;
