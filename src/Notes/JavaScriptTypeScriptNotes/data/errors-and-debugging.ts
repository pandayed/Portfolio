import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: "errors-and-debugging",
    title: "Errors and error handling",
    summary: "Identify failures and follow throw, catch, and finally.",
    scope: "javascript",
    updatedOn: "2026-10-14",
    pointwise: true,
    exampleLayout: "grouped",
    references: [
        {
            title: "MDN JavaScript guide",
            href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling"
        }
    ],
    sections: [
        {
            id: "error-kinds",
            title: "Syntax, runtime, and logic errors",
            bullets: [
                "A syntax error means a source file cannot be parsed. That file does not start running.",
                "An exception is a thrown value that interrupts the current execution path. A runtime error throws while the code executes.",
                "SyntaxError can also occur during execution, such as when JSON.parse receives invalid text.",
                "A logic error gives the wrong intended result even when the program runs without throwing.",
                "TypeError commonly indicates an invalid operation for a value. ReferenceError indicates an unavailable name or binding."
            ],
            examples: [
                {
                    title: "Syntax error: the source cannot be parsed",
                    language: "javascript",
                    code: "// Intentionally invalid syntax. This file cannot run.\nconsole.log(\"starting\");\nconst total = ;",
                    result: "SyntaxError",
                    description: [
                        "Treat this as a separate, intentionally invalid script."
                    ],
                    explanation: [
                        "The missing expression after = prevents the whole file from parsing.",
                        "Even the first console.log does not run. The diagnostic message varies by runtime."
                    ]
                },
                {
                    title: "Runtime error: run this failing example separately",
                    language: "javascript",
                    code: "const text = \"not JSON\";\nconsole.log(\"before parse\");\nJSON.parse(text); // Throws a SyntaxError at this call.\nconsole.log(\"after parse\"); // Not reached.",
                    result: "before parse\nSyntaxError",
                    description: [
                        "Run this valid source with invalid JSON input. The parse call intentionally throws."
                    ],
                    explanation: [
                        "The source is valid, so before parse prints.",
                        "JSON.parse throws during execution because its argument is not valid JSON.",
                        "Without a catch, the after parse statement is not reached. The diagnostic message varies."
                    ]
                },
                {
                    title: "Logic error: the program runs but the calculation is wrong",
                    language: "javascript",
                    code: "function average(left, right) {\n    return left + right / 2; // Wrong grouping for an average.\n}\nconsole.log(average(4, 6)); // 7; the expected average is 5.\nconsole.log(10 / 0);        // Infinity; no exception is thrown.",
                    result: "7\nInfinity",
                    description: [
                        "Calculate an average with incorrect grouping, then inspect division by zero."
                    ],
                    explanation: [
                        "Division runs before addition, so the average expression calculates 4 + (6 / 2).",
                        "Use (left + right) / 2 to compute the intended average of 5.",
                        "Division by zero produces Infinity rather than throwing."
                    ]
                }
            ]
        },
        {
            id: "try-catch-finally",
            title: "catch handles a throw; finally runs before leaving the statement",
            bullets: [
                "try runs its block. If that block or a function called from it throws, catch receives the thrown value.",
                "If nothing throws, catch is skipped. Statements after the whole try/catch continue when the handler completes normally.",
                "An Error object has a name and message.",
                "finally runs before leaving try or catch, including when a return or throw is pending.",
                "With no catch, finally runs and the error continues to the caller."
            ],
            examples: [
                {
                    title: "Success and failure take different paths",
                    language: "javascript",
                    code: "function read(text) {\n    try {\n        console.log(JSON.parse(text));\n    } catch (error) {\n        console.log(\"caught\", error.name);\n    } finally {\n        console.log(\"finished\");\n    }\n}\nread(\"42\");      // 42, then \"finished\". No catch output.\nread(\"invalid\"); // \"caught SyntaxError\", then \"finished\".",
                    result: "42\nfinished\ncaught SyntaxError\nfinished",
                    description: [
                        "Parse one valid input and one invalid input through the same handler."
                    ],
                    explanation: [
                        "The valid input skips catch.",
                        "The invalid input throws while evaluating the console.log argument. catch handles it; finally runs for both calls."
                    ]
                },
                {
                    title: "A return waits for finally; an uncaught throw passes through it",
                    language: "javascript",
                    code: "function succeed() {\n    try { return \"result\"; }\n    finally { console.log(\"success cleanup\"); }\n}\nfunction fail() {\n    try { throw new Error(\"failed\"); }\n    finally { console.log(\"failure cleanup\"); }\n}\nconsole.log(succeed()); // \"success cleanup\", then \"result\".\ntry { fail(); }\ncatch (error) { console.log(error.message); }\n// \"failure cleanup\", then \"failed\".",
                    result: "success cleanup\nresult\nfailure cleanup\nfailed",
                    description: [
                        "Run cleanup once during a return and once during a propagated failure."
                    ],
                    explanation: [
                        "finally runs before the return reaches succeed’s caller.",
                        "fail’s finally performs cleanup but does not catch the pending error. The caller’s handler receives it."
                    ]
                }
            ]
        },
        {
            id: "throw-error",
            title: "throw stops the current path and looks for a catch",
            bullets: [
                "throw stops the current execution path. Later statements on that path do not run.",
                "A surrounding catch can receive a throw from a function called within its try block.",
                "The call stack contains calls that have started but have not returned. An error can pass through these calls to a handler.",
                "new Error(message) creates an error object. throw sends that value out of the current path.",
                "RangeError is an Error subclass for a value outside an accepted range.",
                "Major engines also expose error.stack. Its formatting varies."
            ],
            examples: [
                {
                    language: "javascript",
                    code: "function divide(left, right) {\n    if (right === 0) {\n        throw new RangeError(\"right must not be zero\");\n    }\n    return left / right;\n}\nfunction calculate() {\n    const result = divide(10, 0);\n    console.log(\"after divide\"); // Not reached.\n    return result;\n}\nconsole.log(divide(10, 2)); // 5\ntry {\n    calculate();\n    console.log(\"after calculate\"); // Not reached.\n} catch (error) {\n    console.log(error.name);    // \"RangeError\"\n    console.log(error.message); // \"right must not be zero\"\n    console.log(error.stack);   // Engine-dependent stack text.\n}\nconsole.log(\"continued\"); // Runs after the catch.",
                    result: "5\nRangeError\nright must not be zero\n[stack trace varies by runtime]\ncontinued",
                    title: "throw stops the current path and looks for a catch",
                    description: [
                        "Reject a zero divisor and catch the error in the caller."
                    ],
                    explanation: [
                        "The explicit RangeError rejects zero; JavaScript division itself would produce Infinity.",
                        "The error passes through calculate into its caller’s catch. Neither later statement inside those calls runs.",
                        "error.stack formatting varies by engine; the result shows its position rather than an exact stack."
                    ],
                    possibleOutput: true
                }
            ]
        },
        {
            id: "caught-values",
            title: "A thrown value need not be an Error",
            bullets: [
                "JavaScript permits throw with any value. catch receives that value unchanged.",
                "Prefer Error objects for meaningful messages and stack information.",
                "Check instanceof Error before using Error properties on an arbitrary caught value."
            ],
            examples: [
                {
                    title: "Handle an Error and a plain thrown value",
                    description: [
                        "Catch two different values without assuming both have a message."
                    ],
                    language: "javascript",
                    code: "function showThrown(value) {\n    try { throw value; }\n    catch (error) {\n        console.log(error instanceof Error ? error.message : String(error));\n    }\n}\nshowThrown(new Error(\"failed\"));\nshowThrown(\"stopped\");\nshowThrown(null);",
                    result: "failed\nstopped\nnull",
                    explanation: [
                        "The null case cannot support error.message.",
                        "String handles the non-Error values without that property read."
                    ]
                }
            ]
        }
    ]
};

export default note;
