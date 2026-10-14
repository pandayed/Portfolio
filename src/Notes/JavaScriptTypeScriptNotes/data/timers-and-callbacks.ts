import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "timers-and-callbacks",
    title: "Timers and delayed callbacks",
    summary: "Schedule, cancel, repeat, and debounce a callback.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    pointwise: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN JavaScript guide",
            href: "https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout"
        }
    ],
    sections: [
        {
            id: "set-timeout",
            title: "setTimeout schedules a later callback",
            bullets: [
                "setTimeout(callback, delay) schedules the callback after at least the requested delay in milliseconds.",
                "The current synchronous code finishes before the timer callback runs. A timer is not an exact execution deadline.",
                "Keep the returned timer handle to cancel pending work with clearTimeout.",
                "Browsers and Node.js provide timer APIs. Their handles can have different representations."
            ],
            examples: [
                {
                    title: "Run after the current script",
                    description: [
                        "Schedule with zero delay to observe ordering rather than elapsed time."
                    ],
                    language: "javascript",
                    code: "console.log(\"start\");\nsetTimeout(() => console.log(\"timer\"), 0);\nconsole.log(\"end\");",
                    result: "start\nend\ntimer",
                    explanation: [
                        "A zero delay does not call the callback in the middle of the current script."
                    ],
                    runnable: true
                },
                {
                    title: "Cancel pending work",
                    description: [
                        "Cancel the timer before its callback can run."
                    ],
                    language: "javascript",
                    code: "const timer = setTimeout(() => console.log(\"not reached\"), 1000);\nclearTimeout(timer);\nconsole.log(\"cancelled\");",
                    result: "cancelled",
                    explanation: [
                        "clearTimeout removes the pending callback."
                    ],
                    runnable: true
                }
            ]
        },
        {
            id: "set-interval",
            title: "setInterval repeats until cancelled",
            bullets: [
                "setInterval schedules repeated callbacks. clearInterval cancels future scheduled runs.",
                "The delay is not a guarantee of exact spacing. Long work and runtime scheduling can delay callbacks.",
                "Keep the callback short. Later async lessons cover repeated work that must wait for an operation to finish."
            ],
            examples: [
                {
                    title: "Stop after three ticks",
                    description: [
                        "Keep one timer handle and clear it in the final callback."
                    ],
                    language: "javascript",
                    code: "let count = 0;\nconst timer = setInterval(() => {\n    count += 1;\n    console.log(count);\n    if (count === 3) clearInterval(timer);\n}, 100);",
                    result: "1\n2\n3",
                    explanation: [
                        "The callback increments the same outer count.",
                        "Clearing the interval stops future ticks."
                    ],
                    runnable: true
                }
            ]
        },
        {
            id: "debounce",
            title: "Debounce waits for a quiet period",
            bullets: [
                "Debouncing replaces a pending timer each time the returned function is called.",
                "Only the final call runs after no new call arrives during the delay.",
                "A closure retains the timer handle across calls."
            ],
            examples: [
                {
                    title: "Keep the last typed value",
                    description: [
                        "Call the wrapper several times before its delay expires."
                    ],
                    language: "javascript",
                    code: "function debounce(callback, delay) {\n    let timer;\n    return (...argumentsList) => {\n        clearTimeout(timer);\n        timer = setTimeout(() => callback(...argumentsList), delay);\n    };\n}\nconst search = debounce((text) => console.log(text), 100);\nsearch(\"j\");\nsearch(\"ja\");\nsearch(\"javascript\");",
                    result: "javascript",
                    explanation: [
                        "Each call cancels the previous pending timer.",
                        "This value-only wrapper passes arguments. It does not preserve a dynamic method receiver.",
                        "A page or component should also cancel its pending work when its owner is removed."
                    ],
                    runnable: true
                }
            ]
        }
    ]
};

export default note;
