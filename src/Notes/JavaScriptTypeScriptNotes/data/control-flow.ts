import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'control-flow',
    title: 'Control flow',
    summary: 'Choose branches, repeat work, and narrow TypeScript unions through checks.',
    scope: 'javascript-typescript',
    updatedOn: '2026-10-03',
    sections: [
        {
            id: 'if-and-truthiness',
            title: 'if chooses a branch',
            paragraphs: [
                'An if statement converts its condition to a boolean. false, 0, -0, 0n, an empty string, null, undefined, NaN, and the legacy browser value document.all are falsy. Other values, including empty arrays and empty objects, are truthy.',
                'Use an explicit comparison when zero or an empty string has a different meaning from a missing value.',
            ],
            examples: [{
                language: 'javascript',
                code: [
                    'const items = [];',
                    'const count = 0;',
                    '',
                    'console.log(items ? "array is truthy" : "falsy");',
                    'console.log(count === 0 ? "empty" : "has items");',
                ].join('\n'),
                result: 'The lines print array is truthy and empty.',
            }],
        },
        {
            id: 'switch',
            title: 'switch compares case values strictly',
            paragraphs: [
                'switch tests the expression against case values using strict equality. A break ends the matching case. Without break or return, execution continues into the following case.',
            ],
            examples: [{
                language: 'javascript',
                code: [
                    'const role = "editor";',
                    '',
                    'switch (role) {',
                    '    case "admin":',
                    '        console.log("all access");',
                    '        break;',
                    '    case "editor":',
                    '        console.log("edit access");',
                    '        break;',
                    '    default:',
                    '        console.log("read access");',
                    '}',
                ].join('\n'),
                result: 'The output is edit access.',
            }],
        },
        {
            id: 'for-of-and-for-in',
            title: 'Use for...of for values',
            paragraphs: [
                'for...of reads values from an iterable such as an array or string. for...in reads enumerable property keys. Use for...of for array values unless the property keys are the intended data.',
            ],
            examples: [{
                language: 'javascript',
                code: [
                    'const colors = ["red", "blue"];',
                    '',
                    'for (const color of colors) {',
                    '    console.log(color);',
                    '}',
                    '',
                    'for (const index in colors) {',
                    '    console.log(index);',
                    '}',
                ].join('\n'),
                result: 'The first loop prints red and blue. The second loop prints the property keys 0 and 1.',
            }],
        },
        {
            id: 'while-break-continue',
            title: 'Control a loop with break and continue',
            paragraphs: [
                'A while loop repeats while its condition is truthy. break ends the nearest loop. continue skips the rest of the current iteration and starts the next one.',
            ],
            examples: [{
                language: 'javascript',
                code: [
                    'let number = 0;',
                    '',
                    'while (number < 5) {',
                    '    number += 1;',
                    '    if (number === 2) continue;',
                    '    if (number === 4) break;',
                    '    console.log(number);',
                    '}',
                ].join('\n'),
                result: 'The loop prints 1 and 3. It skips 2 and ends when number becomes 4.',
            }],
        },
        {
            id: 'typescript-narrowing',
            title: 'Checks narrow TypeScript unions',
            paragraphs: [
                'TypeScript follows control flow and narrows a union after checks such as typeof, equality, instanceof, and the in operator. The narrower type applies only where the check proves it.',
            ],
            examples: [{
                language: 'typescript',
                code: [
                    'function format(value: string | number): string {',
                    '    if (typeof value === "number") {',
                    '        return value.toFixed(2);',
                    '    }',
                    '',
                    '    return value.toUpperCase();',
                    '}',
                    '',
                    'console.log(format(3));',
                    'console.log(format("ready"));',
                ].join('\n'),
                result: 'The emitted JavaScript prints 3.00 and READY.',
                typeCheck: 'Inside the if branch, value is number. After that branch returns, value is string.',
            }],
        },
    ],
};

export default note;
