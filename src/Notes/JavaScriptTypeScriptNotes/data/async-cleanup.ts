import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "async-cleanup",
    title: "Owning asynchronous work",
    summary: "Record request outcomes, prevent overlapping refreshes, and release owned resources.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN: setInterval",
            href: "https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval"
        },
        {
            title: "MDN: removeEventListener",
            href: "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener"
        },
        {
            title: "MDN: AbortController",
            href: "https://developer.mozilla.org/en-US/docs/Web/API/AbortController"
        }
    ],
    sections: [
        {
            id: "outcomes",
            title: "Record the application’s request state",
            bullets: [
                "An application can store one status for idle, loading, success, empty, error, or cancelled.",
                "These statuses are application data. A Promise does not automatically update the screen’s state.",
                "Record loading before starting work and its outcome after settlement. A user-facing error message can differ from internal failure details."
            ],
            examples: [
                {
                    title: "Record success, empty data, failure, and cancellation",
                    description: [
                        "The operation parameter supplies each simulated result. No service is required.",
                        "DOMException supplies the AbortError used for the cancellation case."
                    ],
                    language: "javascript",
                    code: `let state = { status: 'idle' };
async function loadItems(operation) {
  state = { status: 'loading' };
  try {
    const items = await operation();
    state = { status: items.length === 0 ? 'empty' : 'success', items };
  } catch (error) {
    state = error?.name === 'AbortError'
      ? { status: 'cancelled' }
      : { status: 'error', message: 'Could not load items' };
  }
  console.log(state.status);
}
async function inspect() {
  await loadItems(() => Promise.resolve(['book'])); // success
  await loadItems(() => Promise.resolve([])); // empty
  await loadItems(() => Promise.reject(new Error('internal server detail'))); // error
  await loadItems(() => Promise.reject(new DOMException('Aborted', 'AbortError'))); // cancelled
}
inspect();
// state becomes loading during each wait. The displayed error message
// is application text; it does not expose internal server detail.`,
                    result: "success\nempty\nerror\ncancelled",
                    explanation: [
                        "Each call records loading during its wait.",
                        "The error state stores an application message. The internal server-detail message is not displayed."
                    ],
                    runnable: true
                }
            ]
        },
        {
            id: "periodic-work",
            title: "Wait before scheduling the next refresh",
            bullets: [
                "setInterval does not wait for a Promise returned by its callback. A later tick can start while the previous async callback is awaiting work.",
                "A recursive timeout can schedule the next delay only after the current operation finishes.",
                "Stopping future timer callbacks and cancelling a pending operation are separate actions."
            ],
            examples: [
                {
                    title: "Observe overlapping async interval callbacks",
                    description: [
                        "Save each pending callback’s completion function. The second tick supplies both completions."
                    ],
                    language: "javascript",
                    code: `let tick = 0;
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
// JavaScript callbacks did not execute simultaneously.`,
                    result: "start 1\nstart 2\nfinish 1\nfinish 2",
                    explanation: [
                        "The second tick starts before the first await completes.",
                        "clearInterval prevents another tick. It does not settle either pending Promise."
                    ],
                    runnable: true
                },
                {
                    title: "Schedule the next refresh after completion",
                    description: [
                        "Run two refreshes and stop. Each timer-started refresh handles its returned Promise’s rejection."
                    ],
                    language: "javascript",
                    code: `let run = 0;
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
// Clearing a timer does not cancel an operation already awaiting work.`,
                    result: "start 1\nfinish 1\nstart 2\nfinish 2",
                    explanation: [
                        "The second delay begins only after the first operation finishes.",
                        "An external owner can set stopped and clear timeoutId during cleanup. It must separately cancel an operation already waiting."
                    ],
                    runnable: true
                }
            ]
        },
        {
            id: "owner",
            title: "Return one cleanup function for owned resources",
            bullets: [
                "The owner starts work and decides when it is no longer needed. It can return a cleanup function for that work.",
                "Cleanup can clear timers, remove listeners, and abort requests. Each resource requires its corresponding API call.",
                "Settling a Promise does not release every resource owned by the surrounding feature."
            ],
            examples: [
                {
                    title: "Release a timer, listener, and request together",
                    description: [
                        "Browser setup: /api/updates returns JSON.",
                        "startUpdates registers a timer and online listener and starts a request. Call its returned cleanup function when that feature closes."
                    ],
                    language: "javascript",
                    code: `function startUpdates() {
  const controller = new AbortController();
  let timeoutId;
  const listener = () => console.log('online event');
  window.addEventListener('online', listener); // event subscription
  const pending = fetch('/api/updates', { signal: controller.signal });
  timeoutId = setTimeout(() => console.log('refresh due'), 1000);
  pending.catch((error) => {
    if (error.name !== 'AbortError') console.log('Updates failed');
  });
  return () => {
    clearTimeout(timeoutId);
    window.removeEventListener('online', listener);
    controller.abort();
  };
}
const cleanup = startUpdates();
cleanup();`,
                    result: "No refresh due or online-event logs from these removed resources. Expected request cancellation is handled without an error log.",
                    explanation: [
                        "cleanup clears the pending timer, removes the same listener reference, and aborts the controller.",
                        "The request’s catch handles cancellation and reports other request failures."
                    ]
                }
            ]
        }
    ]
};

export default note;
