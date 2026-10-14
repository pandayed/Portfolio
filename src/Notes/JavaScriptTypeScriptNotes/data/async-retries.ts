import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "async-retries",
    title: "Retrying asynchronous operations",
    summary: "Start another attempt only when the operation and failure policy allow it.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN: Retry-After",
            href: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Retry-After"
        },
        {
            title: "MDN: HTTP idempotency",
            href: "https://developer.mozilla.org/en-US/docs/Glossary/Idempotent"
        },
        {
            title: "MDN: AbortSignal",
            href: "https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal"
        }
    ],
    sections: [
        {
            id: "attempts",
            title: "Call the operation again",
            bullets: [
                "A retry starts a new attempt after failure. Awaiting the same rejected Promise again does not start new work.",
                "Pass a function that starts the operation. Calling that function again creates the next attempt.",
                "Limit attempts and decide which failures can be retried. JavaScript does not classify failures as temporary.",
                "Stop for a permanent failure or when the attempt limit is reached. Preserve the final failure for the caller."
            ],
            examples: [
                {
                    title: "Retry temporary failures with a limit",
                    description: [
                        "The application adds temporary: true to errors it allows this helper to retry.",
                        "The helper uses three attempts and increasing delays. It also demonstrates permanent and exhausted failures."
                    ],
                    language: "javascript",
                    code: `const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function retry(operation, attempts = 3) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try { return await operation(); }
    catch (error) {
      if (attempt === attempts || !error?.temporary) throw error;
      const delay = 10 * 2 ** (attempt - 1);
      console.log('retry after', delay);
      await sleep(delay);
    }
  }
}
async function inspectRetries() {
  let calls = 0;
  const result = await retry(() => {
    calls += 1;
    console.log('attempt', calls);
    if (calls < 3) throw Object.assign(new Error('temporary'), { temporary: true });
    return 'ready';
  });
  console.log(result);
  // attempt 1, retry after 10, attempt 2, retry after 20, attempt 3, ready

  let permanentCalls = 0;
  try {
    await retry(() => {
      permanentCalls += 1;
      throw new Error('permanent');
    });
  } catch (error) { console.log(error.message, permanentCalls); }
  // permanent 1: no retry

  let exhaustedCalls = 0;
  try {
    await retry(() => {
      exhaustedCalls += 1;
      throw Object.assign(new Error('still temporary'), { temporary: true });
    });
  } catch (error) { console.log(error.message, exhaustedCalls); }
  // retry after 10, retry after 20, still temporary 3
}
inspectRetries();
// Each demonstration waits for the preceding demonstration to finish.`,
                    result: "attempt 1\nretry after 10\nattempt 2\nretry after 20\nattempt 3\nready\npermanent 1\nretry after 10\nretry after 20\nstill temporary 3",
                    explanation: [
                        "The operation is called again for each attempt.",
                        "A permanent failure stops after one call. Three temporary failures exhaust the attempt limit.",
                        "The sample policy and delays are application choices rather than language rules."
                    ],
                    runnable: true
                }
            ]
        },
        {
            id: "backoff",
            title: "Choose retry timing from a policy",
            bullets: [
                "Backoff increases the delay between attempts. Exponential backoff multiplies the delay by a growing power.",
                "Jitter adds a random delay so clients do not all retry at the same time.",
                "A Retry-After response header can supply a wait in seconds or as an HTTP date. A client can account for that instruction in its retry policy.",
                "A policy may retry 429 or selected temporary server failures. An unchanged invalid request or missing authentication usually needs correction first."
            ],
            examples: [
                {
                    title: "Read server timing and add jitter",
                    description: [
                        "This sample policy selects statuses 429, 502, 503, and 504. A different operation may require a different policy."
                    ],
                    language: "javascript",
                    code: `// This is an application policy, not a JavaScript rule.
const retryableStatus = (status) => [429, 502, 503, 504].includes(status);
console.log(retryableStatus(503)); // true
console.log(retryableStatus(400)); // false: validation failure
console.log(retryableStatus(401)); // false: authentication failure

// Parse Retry-After as seconds or a date.
function retryAfterMs(value, now = Date.now()) {
  if (/^\\d+$/.test(value)) return Number(value) * 1000;
  const date = Date.parse(value);
  return Number.isNaN(date) ? 0 : Math.max(0, date - now);
}
console.log(retryAfterMs('2')); // 2000
console.log(retryAfterMs('Wed, 07 Oct 2026 00:00:02 GMT', Date.parse('2026-10-07T00:00:00Z'))); // 2000

const baseDelay = 250;
const attempt = 2;
const exponentialDelay = baseDelay * 2 ** (attempt - 1); // 500
const jitter = Math.floor(Math.random() * 100); // integer from 0 through 99
console.log(exponentialDelay + jitter); // 500 through 599, variable`,
                    result: "true\nfalse\nfalse\n2000\n2000\nA number from 500 through 599",
                    explanation: [
                        "/^\\d+$/ is a regular expression. It checks that the whole header contains only digits. Date.parse handles the date form.",
                        "The deterministic waits are 2000 ms. The final random addition makes its exact output variable."
                    ],
                    possibleOutput: true,
                    runnable: true
                }
            ]
        },
        {
            id: "writes",
            title: "Make repeated writes safe through a service contract",
            bullets: [
                "A write may succeed even when its response is lost. Retrying can then create duplicate data.",
                "An idempotent operation has the same intended effect when repeated.",
                "An idempotency key works only when the service records and honors it. Reuse one key for every attempt at the same logical write."
            ],
            examples: [
                {
                    title: "Reuse one order key",
                    description: [
                        "Browser setup: HTTPS or localhost supplies crypto.randomUUID.",
                        "Service setup: POST /api/orders accepts an Idempotency-Key, records the first successful order for it, and returns that same order for repeats.",
                        "This contract must be implemented by the service. The two calls deliberately repeat one logical order."
                    ],
                    language: "javascript",
                    code: `const key = crypto.randomUUID(); // create once for this logical order
const sendOrder = () => fetch('/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Idempotency-Key': key },
  body: JSON.stringify({ productId: 7 }),
});
async function compare() {
  const first = await sendOrder();
  if (!first.ok) throw new Error('HTTP ' + first.status);
  const original = await first.json();
  const second = await sendOrder(); // same key, same logical order
  if (!second.ok) throw new Error('HTTP ' + second.status);
  const repeated = await second.json();
  console.log(original.id === repeated.id); // true under the stated contract
}
compare().catch((error) => console.log(error.message));
`,
                    result: "true under the stated service contract.",
                    explanation: [
                        "The same random key is reused for both calls. A service that ignores it may create two orders.",
                        "The HTTP status checks still handle unsuccessful responses. A lost first response is why retrying a write needs this contract."
                    ]
                }
            ]
        },
        {
            id: "abortable-waits",
            title: "Stop the retry wait as well as the request",
            bullets: [
                "A retry delay is another pending operation. Cancelling a request does not automatically clear that delay.",
                "An abortable delay listens to the same signal, clears its timer, and rejects with the signal’s reason.",
                "Pass the signal through both request attempts and waits. An aborted wait then prevents the next attempt from starting."
            ],
            examples: [
                {
                    title: "Cancel a pending delay",
                    description: [
                        "Call sleep with an AbortSignal and abort it before its timer fires."
                    ],
                    language: "javascript",
                    code: `function sleep(ms, signal) {
  return new Promise((resolve, reject) => {
    const onAbort = () => { clearTimeout(id); reject(signal.reason); };
    if (signal?.aborted) { reject(signal.reason); return; }
    const id = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      resolve();
    }, ms);
    signal?.addEventListener('abort', onAbort, { once: true });
  });
}
const controller = new AbortController();
sleep(1000, controller.signal)
  .then(() => console.log('delay finished'))
  .catch((error) => console.log(error.name));
controller.abort(); // AbortError, not delay finished
// A retry loop can await sleep(delay, signal) and pass the same
// signal to fetch. The caller can then stop both the delay and request.`,
                    result: "AbortError",
                    explanation: [
                        "The abort listener clears the timer and rejects the pending Promise.",
                        "Normal timer completion removes the abort listener. The same helper can be awaited between retry attempts."
                    ],
                    runnable: true
                }
            ]
        }
    ]
};

export default note;
