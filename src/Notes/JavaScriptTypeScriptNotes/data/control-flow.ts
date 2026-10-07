import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'control-flow',
    title: 'Control flow',
    summary: 'Choose branches, repeat work, and narrow TypeScript unions through checks.',
    scope: 'javascript-typescript',
    updatedOn: '2026-10-07',
    sections: [
        {
            id: 'if-and-truthiness',
            title: 'if chooses a branch',
            bullets: [
                'An if statement converts its condition to a boolean.',
                'Falsy values become false: false, 0, -0, 0n, an empty string, null, undefined, and NaN.',
                'The legacy browser value document.all is also falsy.',
                'Other values are truthy. They become true, including empty arrays and empty objects.',
                'Use an explicit comparison when zero or an empty string means something different from a missing value.',
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
            bullets: [
                'switch compares its expression with each case value using strict equality.',
                'break ends the switch.',
                'Without break or return, execution continues into the next case. This is called fallthrough.',
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
            bullets: [
                'for...of reads values from an iterable, such as an array or string.',
                'An iterable provides values one at a time for code to read.',
                'for...in reads enumerable property keys. These include inherited enumerable keys.',
                'Enumerable properties are properties marked for inclusion in this kind of loop.',
                'Use for...of for array values unless you need the property keys.',
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
            bullets: [
                'A while loop repeats while its condition is truthy.',
                'break ends the nearest loop.',
                'continue skips the remaining code in the current iteration. The loop then starts the next iteration.',
                'An iteration is one run of the loop body.',
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
            bullets: [
                'A union type allows more than one type, such as string | number.',
                'TypeScript follows control flow to determine which types remain possible after a check. This is called narrowing.',
                'Checks such as typeof, equality, instanceof, and the in operator can narrow a union.',
                'The narrower type applies only where the check proves it.',
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
