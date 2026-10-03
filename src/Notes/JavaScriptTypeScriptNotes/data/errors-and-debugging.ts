import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'errors-and-debugging',
    title: 'Errors and debugging',
    summary: 'Read failures, throw useful errors, handle expected failures, and debug with evidence.',
    scope: 'javascript-typescript',
    updatedOn: '2026-10-03',
    sections: [
        {
            id: 'error-kinds',
            title: 'Syntax, type, and runtime errors happen at different stages',
            bullets: [
                'A syntax error means the source cannot be parsed as valid JavaScript.',
                'A TypeScript error means the checker found code that conflicts with its known types or compiler rules. The JavaScript runtime does not read that type error.',
                'A runtime error happens while JavaScript is executing. It may come from invalid input, an unavailable resource, or an operation that throws.',
                'A logic error produces the wrong result without necessarily throwing an error.',
            ],
            examples: [{
                language: 'javascript',
                code: [
                    'function divide(left, right) {',
                    '    return left / right;',
                    '}',
                    '',
                    'console.log(divide(10, 0));',
                ].join('\n'),
                result: 'The output is Infinity. JavaScript number division by zero does not throw, so the program must decide whether this input is valid.',
            }],
        },
        {
            id: 'throw-error',
            title: 'Throw an Error for an invalid operation',
            paragraphs: [
                'throw stops normal execution and sends a value up the call stack. JavaScript permits any thrown value, but an Error object supplies a standard name and message. Major engines also provide useful stack information, although its exact format is not standardized.',
                'Throw where the code can state the violated rule clearly. Include useful context without exposing secrets or personal data.',
            ],
            examples: [{
                language: 'javascript',
                code: [
                    'function divide(left, right) {',
                    '    if (right === 0) {',
                    '        throw new RangeError("right must not be zero");',
                    '    }',
                    '    return left / right;',
                    '}',
                    '',
                    'console.log(divide(10, 2));',
                ].join('\n'),
                result: 'The output is 5. Calling divide(10, 0) throws a RangeError with the message right must not be zero.',
            }],
        },
        {
            id: 'try-catch-finally',
            title: 'Catch only failures the code can handle',
            paragraphs: [
                'A catch block runs when code in its try block throws. finally runs before control leaves the full try statement, whether an exception occurred or not. Use finally for cleanup that must always run.',
                'Do not silently catch an unexpected error. Handle it, add useful context and throw again, or let it continue to a caller that can handle it.',
            ],
            examples: [{
                language: 'javascript',
                code: [
                    'try {',
                    '    throw new Error("not found");',
                    '} catch (error) {',
                    '    if (error instanceof Error) {',
                    '        console.log(error.message);',
                    '    }',
                    '} finally {',
                    '    console.log("finished");',
                    '}',
                ].join('\n'),
                result: 'The lines print not found and finished.',
            }],
            pitfalls: [
                'Avoid return, throw, break, or continue inside finally. It can replace a return or error from try or catch.',
            ],
        },
        {
            id: 'typescript-caught-values',
            title: 'Narrow a caught value before using it',
            paragraphs: [
                'JavaScript can throw any value, so caught values are not guaranteed to be Error objects. With useUnknownInCatchVariables enabled, TypeScript treats a catch variable as unknown and requires a check before reading properties.',
            ],
            examples: [{
                language: 'typescript',
                code: [
                    'function messageFrom(error: unknown): string {',
                    '    if (error instanceof Error) {',
                    '        return error.message;',
                    '    }',
                    '',
                    '    return String(error);',
                    '}',
                    '',
                    'console.log(messageFrom(new Error("failed")));',
                    'console.log(messageFrom("stopped"));',
                ].join('\n'),
                result: 'The emitted JavaScript prints failed and stopped.',
                typeCheck: 'Reading error.message before narrowing an unknown value is a type error.',
            }],
        },
        {
            id: 'debug-with-evidence',
            title: 'Debug from the failing value and call stack',
            paragraphs: [
                'Read the first relevant error message and its call stack. Start at your own application frame, reproduce the failure with the same input, and inspect the values that produced it.',
                'Browser and editor debuggers can pause on a line, step through execution, and inspect scope values. A console log records a value at one point; a breakpoint lets you inspect the full current state.',
            ],
            bullets: [
                'Reduce the failing case until it contains only the input and code needed to reproduce the result.',
                'Check the value and its runtime type before the failing operation.',
                'Use console.error for errors, console.table for rows, and console.assert for conditions that should be true.',
                'Remove temporary logs and breakpoints after the cause is confirmed.',
            ],
        },
        {
            id: 'type-checking-limits',
            title: 'Type checking does not replace runtime checks',
            paragraphs: [
                'TypeScript checks the information available in source code and declaration files. It cannot prove that unvalidated data from a user, network response, storage entry, or JavaScript dependency matches an asserted type.',
                'Validate untrusted data at runtime. After validation, use narrowing to give the checked value a precise TypeScript type.',
            ],
            examples: [{
                language: 'typescript',
                code: [
                    'function isUser(value: unknown): value is { name: string } {',
                    '    return typeof value === "object"',
                    '        && value !== null',
                    '        && "name" in value',
                    '        && typeof value.name === "string";',
                    '}',
                    '',
                    'const input: unknown = { name: "Mia" };',
                    'if (isUser(input)) {',
                    '    console.log(input.name.toUpperCase());',
                    '}',
                ].join('\n'),
                result: 'The emitted JavaScript prints MIA. The runtime checks run before the value is treated as a user.',
                typeCheck: 'Inside the if block, the type predicate narrows input to { name: string }.',
            }],
        },
    ],
};

export default note;
