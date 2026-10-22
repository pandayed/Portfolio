import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "request-cancellation",
    title: "Cancellation and request races",
    summary: "Cancellation signals, request timeouts, and stale results.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    inlineCode: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN: AbortController",
            href: "https://developer.mozilla.org/en-US/docs/Web/API/AbortController"
        },
        {
            title: "MDN: AbortSignal",
            href: "https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal"
        }
    ],
    sections: [
        {
            id: "signals",
            title: "Cancellation signals",
            bullets: [
                "A Promise has no general `cancel` method.",
                "Cancellation must be supported by the operation that produces its result.",
                "`AbortController` provides a `signal`.",
                "The operation receives that `signal` through `fetch` or another API that supports it.",
                "`abort` marks the `signal` as aborted and supplies an `abort` reason.",
                "The default reason is a `DOMException` named `AbortError`.",
                "A `signal` stays aborted.",
                "A new operation needs a new controller if it may need cancellation.",
                "Aborting a request can stop the request or its body read.",
                "It does not guarantee the server undoes a write already performed."
            ],
            examples: [
                {
                    title: "Already-aborted signal",
                    description: [
                        "The example requires a browser or a Node.js version that provides `fetch`.",
                        "The `signal` is aborted before the request call."
                    ],
                    language: "javascript",
                    code: `async function inspect() {
  const controller = new AbortController();
  controller.abort();
  console.log(controller.signal.aborted); // true
  try {
    // An already-aborted signal rejects without starting this request.
    await fetch('https://example.com/', { signal: controller.signal });
  } catch (error) { console.log(error.name); } // AbortError
  console.log(typeof Promise.resolve().cancel); // undefined
}
inspect();`,
                    result: "true\nAbortError\nundefined",
                    explanation: [
                        "The request observes the already-aborted `signal`.",
                        "It does not start a new network request.",
                        "The final log confirms that an ordinary Promise has no `cancel` method."
                    ]
                }
            ]
        },
        {
            id: "timeouts",
            title: "Request timeouts",
            bullets: [
                "A timer can request cancellation if an operation takes too long.",
                "It runs when the event loop gives that callback a turn.",
                "Clear the timer when the owned operation settles, including its body read.",
                "Expected cancellation and failed operations are separate outcomes."
            ],
            examples: [
                {
                    title: "Slow request cancellation",
                    description: [
                        "Browser setup: GET /api/slow returns JSON, but takes more than five seconds.",
                        "Earlier service or network failure is also possible."
                    ],
                    language: "javascript",
                    code: `// Browser setup: /api/slow takes longer than 5 seconds to respond.
async function loadSlow() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch('/api/slow', { signal: controller.signal });
    if (!response.ok) throw new Error('HTTP ' + response.status);
    return await response.json();
  } finally {
    clearTimeout(timeoutId); // runs on success, failure, or cancellation
  }
}
loadSlow().catch((error) => console.log(error.name));
// AbortError when the timer aborts first. Network/server failures
// can happen sooner. The timeout is a timer delay, not an exact deadline.`,
                    result: "AbortError when the cancellation timer runs before the request and body finish.",
                    explanation: [
                        "`return await` keeps body reading inside the `try` until it settles.",
                        "`finally` then clears the timer.",
                        "The timeout is a requested timer delay, not a guarantee that cancellation runs at an exact clock time."
                    ],
                    possibleOutput: true
                }
            ]
        },
        {
            id: "stale-results",
            title: "Request races",
            bullets: [
                "Requests can finish in a different order from their start order.",
                "An older result can overwrite a newer result.",
                "Each request receives an increasing identifier.",
                "The displayed state changes only if that identifier is still the latest.",
                "Aborting the previous request and checking its identifier solve different parts of this problem.",
                "The identifier check applies to both success and failure updates."
            ],
            examples: [
                {
                    title: "Stale result checks",
                    description: [
                        "The example controls the two completions explicitly so the newer request finishes first."
                    ],
                    language: "javascript",
                    code: `let newest = 0;
let shown;
let unguarded;
async function search(operation) {
  const requestId = ++newest;
  const result = await operation();
  unguarded = result; // shows what an unconditional UI update would do
  if (requestId === newest) shown = result;
}
let finishOld;
let finishNew;
const old = search(() => new Promise((resolve) => { finishOld = resolve; }));
const recent = search(() => new Promise((resolve) => { finishNew = resolve; }));
async function inspect() {
  finishNew('new result');
  await recent;
  finishOld('old result');
  await old;
  console.log(unguarded); // old result: a stale completion replaced the new one
  console.log(shown); // new result: the identifier check ignored the old completion
}
inspect();`,
                    result: "old result\nnew result",
                    explanation: [
                        "`unguarded` is replaced by the older completion.",
                        "`shown` retains the newer result because `requestId` must match `newest`."
                    ],
                    runnable: true
                },
                {
                    title: "Search cancellation and result checks",
                    description: [
                        "Browser setup: /api/search?q=... returns JSON search results.",
                        "Calling search again cancels the previous request."
                    ],
                    language: "javascript",
                    code: `// Browser setup: /api/search?q=... returns JSON search results.
let activeController;
let newest = 0;
async function search(query) {
  activeController?.abort();
  const controller = new AbortController();
  activeController = controller;
  const requestId = ++newest;
  try {
    const response = await fetch('/api/search?q=' + encodeURIComponent(query), {
      signal: controller.signal,
    });
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const results = await response.json();
    if (requestId === newest) console.log('latest results:', results);
  } catch (error) {
    if (error?.name !== 'AbortError' && requestId === newest) console.log('Search failed');
  } finally {
    if (activeController === controller) activeController = undefined;
  }
}
search('a');
search('ava');
// The second call aborts the first. Only the latest successful result
// is printed. Aborting does not guarantee the server undoes work.`,
                    result: "latest results: followed by the JSON data for ava, if that latest request succeeds.",
                    explanation: [
                        "`encodeURIComponent` puts the query in the URL as data.",
                        "The identifier check prevents stale success and error messages.",
                        "`finally` clears the active controller only if it still belongs to that request.",
                        "A failure of the latest request prints Search failed."
                    ],
                    possibleOutput: true
                }
            ]
        }
    ]
};

export default note;
