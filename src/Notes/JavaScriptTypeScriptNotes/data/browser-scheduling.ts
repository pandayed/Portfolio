import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "browser-scheduling",
    title: "Browser rendering and workers",
    summary: "Browser callbacks schedule visual updates. Workers run calculations on another thread.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    inlineCode: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN: requestAnimationFrame",
            href: "https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame"
        },
        {
            title: "MDN: using web workers",
            href: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers"
        }
    ],
    sections: [
        {
            id: "rendering",
            title: "DOM updates and painting",
            bullets: [
                "Rendering calculates a visual update.",
                "Painting draws its pixels.",
                "Changing the DOM does not prove the user has seen that change.",
                "The browser drains microtasks before the next rendering opportunity.",
                "Long synchronous work or microtasks can delay rendering.",
                "The browser can skip a rendering update.",
                "It does not promise to paint after every task."
            ],
            examples: [
                {
                    title: "Text changes before rendering",
                    description: [
                        "The example requires a visible browser page with a loaded body.",
                        "The short busy loop demonstrates blocking."
                    ],
                    language: "javascript",
                    code: `// Browser setup: run on a visible page with a loaded body.
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
// Long microtasks delay both that opportunity and later user tasks.`,
                    result: "Done",
                    explanation: [
                        "Working is assigned to the DOM before the microtask runs.",
                        "The microtask changes it to Done before the next rendering opportunity, so that assignment does not prove Working was painted."
                    ]
                }
            ]
        },
        {
            id: "animation-frames",
            title: "Animation frame callbacks",
            bullets: [
                "`requestAnimationFrame` requests a callback before a future repaint.",
                "Its callback can change the DOM for that visual update.",
                "Request another callback for the next animation update.",
                "A single call does not schedule a repeating animation.",
                "Hidden tabs can pause these callbacks.",
                "A callback does not prove that an earlier DOM value was already painted."
            ],
            examples: [
                {
                    title: "Three animation frames",
                    description: [
                        "The example requires a visible browser page with a loaded body."
                    ],
                    language: "javascript",
                    code: `// Browser setup: a visible page with a body; background tabs may pause rAF.
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
// The exact time between callbacks depends on the display and browser.`,
                    result: "animation callback 1\nanimation callback 2\nanimation callback 3",
                    explanation: [
                        "Each callback requests the next one until frame 3.",
                        "The page displays the changing counter.",
                        "Timing depends on the display and browser."
                    ]
                }
            ]
        },
        {
            id: "browser-workers",
            title: "Browser workers",
            bullets: [
                "A browser worker runs JavaScript in a separate execution environment on another thread.",
                "It cannot use the page’s DOM.",
                "`postMessage` sends data.",
                "A receiving message listener reads that data from the event’s data property.",
                "The page’s message callback updates the page.",
                "`terminate` stops a worker when its owner no longer needs the work."
            ],
            examples: [
                {
                    title: "Worker calculations",
                    description: [
                        "The example requires a browser page whose Content Security Policy permits `Blob` workers.",
                        "`Blob` holds the worker source text.",
                        "`URL.createObjectURL` provides a temporary URL for that source."
                    ],
                    language: "javascript",
                    code: `// Browser setup: a page whose policy permits Blob workers.
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
// The calculation runs in the worker; message handling runs on the page.`,
                    result: "main code continues\nworker result 500000500000",
                    explanation: [
                        "The worker calculates the sum from 1 through 1,000,000.",
                        "The message callback runs on the page, stops the worker, and releases the temporary URL."
                    ]
                }
            ]
        }
    ]
};

export default note;
