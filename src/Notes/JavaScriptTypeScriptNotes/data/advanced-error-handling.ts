import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "advanced-error-handling",
    title: "Error propagation and cleanup",
    summary: "Preserve failures when recovering, adding context, or running cleanup.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    pointwise: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN JavaScript guide",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch"
        }
    ],
    sections: [
        {
            id: "error-context-and-rethrow",
            title: "A handler can recover, rethrow, or add context",
            bullets: [
                "A catch that finishes normally treats the error as handled. The caller does not receive the original error.",
                "throw error sends the same error to the caller.",
                "Throwing a new Error with { cause: error } adds a message while keeping the original thrown value in the cause property.",
                "The cause option requires a runtime with Error cause support, standardized in ES2022. catch without (error), as in recover, handles a throw without binding its value to a variable."
            ],
            examples: [
                {
                    language: "javascript",
                    code: "function recover(text) {\n    try { return JSON.parse(text); }\n    catch { return null; } // Defines null as the failure result.\n}\nfunction rethrow(text) {\n    try { return JSON.parse(text); }\n    catch (error) { throw error; }\n}\nfunction withContext(text) {\n    try { return JSON.parse(text); }\n    catch (error) {\n        throw new Error(\"Could not read settings\", { cause: error });\n    }\n}\nconsole.log(recover(\"invalid\")); // null\ntry { rethrow(\"invalid\"); }\ncatch (error) { console.log(error.name); } // \"SyntaxError\"\ntry { withContext(\"invalid\"); }\ncatch (error) {\n    console.log(error.message);    // \"Could not read settings\"\n    console.log(error.cause.name); // \"SyntaxError\"\n}",
                    result: "null\nSyntaxError\nCould not read settings\nSyntaxError",
                    title: "A handler can recover, rethrow, or add context",
                    description: [
                        "Apply three handling policies to the same invalid JSON input."
                    ],
                    explanation: [
                        "recover turns failure into the defined fallback null.",
                        "rethrow forwards the same caught value.",
                        "withContext throws a new message and retains the parser’s SyntaxError in cause."
                    ]
                }
            ],
            pitfalls: [
                "Use a fallback such as null only if the caller understands that result. Otherwise preserve the failure by rethrowing or adding context.",
                "State the failed operation in the message, as with Could not read settings. Avoid including the raw settings text, which could contain private data."
            ]
        },
        {
            id: "finally-control-flow",
            title: "Control flow in finally can replace a pending return or error",
            bullets: [
                "A return in finally replaces a return or thrown error from try or catch.",
                "A throw in finally replaces a pending return or earlier error.",
                "A break or continue in finally can also replace a pending error when the statement is inside a loop."
            ],
            examples: [
                {
                    title: "return and throw replace the earlier result",
                    language: "javascript",
                    code: "function replacedReturn() {\n    try { return \"try result\"; }\n    finally { return \"finally result\"; }\n}\nfunction hiddenError() {\n    try { throw new Error(\"original failure\"); }\n    finally { return \"success\"; }\n}\nfunction replacedError() {\n    try { throw new Error(\"original failure\"); }\n    finally { throw new Error(\"cleanup failure\"); }\n}\nfunction replacedReturnWithError() {\n    try { return \"try result\"; }\n    finally { throw new Error(\"return replaced\"); }\n}\nconsole.log(replacedReturn()); // \"finally result\"\nconsole.log(hiddenError());    // \"success\"; error is suppressed.\ntry { replacedError(); }\ncatch (error) { console.log(error.message); } // \"cleanup failure\"\ntry { replacedReturnWithError(); }\ncatch (error) { console.log(error.message); } // \"return replaced\"",
                    result: "finally result\nsuccess\ncleanup failure\nreturn replaced",
                    description: [
                        "Use intentionally overriding finally statements to inspect what the caller receives."
                    ],
                    explanation: [
                        "A return in finally can replace a pending return or suppress a pending error.",
                        "A throw in finally can replace the earlier error or a successful pending return."
                    ]
                },
                {
                    title: "break and continue can suppress a throw too",
                    language: "javascript",
                    code: "for (let index = 0; index < 2; index += 1) {\n    try { throw new Error(\"failure\"); }\n    finally { break; } // Exits the loop instead of propagating error.\n}\nconsole.log(\"after break\"); // Runs.\n\nfor (let index = 0; index < 2; index += 1) {\n    try { throw new Error(\"failure\"); }\n    finally {\n        console.log(index);\n        continue; // Moves to the next iteration; error is suppressed.\n    }\n}\n// Prints 0 and 1 without throwing to the caller.",
                    result: "after break\n0\n1",
                    description: [
                        "Place loop control inside finally to observe a suppressed error."
                    ],
                    explanation: [
                        "break and continue replace the pending throw.",
                        "These examples intentionally suppress the errors to show why cleanup should normally avoid loop control."
                    ]
                }
            ],
            pitfalls: [
                "Keep finally for cleanup that completes normally. Avoid return, throw, break, and continue there unless replacing the earlier result is intentional."
            ]
        }
    ]
};

export default note;
