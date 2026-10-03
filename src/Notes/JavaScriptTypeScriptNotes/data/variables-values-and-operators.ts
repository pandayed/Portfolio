import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'variables-values-and-operators',
    title: 'Variables, values, and operators',
    summary: 'Declare values, use operators, and avoid common coercion mistakes.',
    scope: 'javascript-typescript',
    updatedOn: '2026-10-03',
    sections: [
        {
            id: 'const-and-let',
            title: 'Use const by default and let for reassignment',
            paragraphs: [
                'const and let create block-scoped variables. A const variable must be initialized and cannot be assigned again. A let variable can be assigned a new value.',
                'var is function-scoped and follows older hoisting rules. Existing code may use it, but const and let make the intended scope clearer.',
            ],
            examples: [{
                language: 'javascript',
                code: [
                    'const taxRate = 0.1;',
                    'let subtotal = 20;',
                    'subtotal += 5;',
                    '',
                    'console.log(subtotal * (1 + taxRate));',
                ].join('\n'),
                result: 'The output is 27.500000000000004 because JavaScript numbers use binary floating-point arithmetic.',
            }],
        },
        {
            id: 'arithmetic',
            title: 'Arithmetic operators work on numeric values',
            bullets: [
                '+ adds numbers but concatenates when an operand is a string.',
                '-, *, /, %, and ** perform subtraction, multiplication, division, remainder, and exponentiation.',
                'JavaScript uses number for most numeric work and bigint for integers outside the safe number range. Do not mix number and bigint in arithmetic.',
            ],
            examples: [{
                language: 'javascript',
                code: [
                    'console.log(10 + 3);',
                    'console.log(10 / 4);',
                    'console.log(10 % 3);',
                    'console.log(2 ** 4);',
                    'console.log("Total: " + 13);',
                ].join('\n'),
                result: 'The lines print 13, 2.5, 1, 16, and Total: 13.',
            }],
        },
        {
            id: 'strict-equality',
            title: 'Prefer strict equality',
            paragraphs: [
                '=== and !== compare without converting operand types. == and != can convert values before comparing them, which can hide a type mismatch.',
                'Objects compare by identity. Two separate objects with the same properties are not strictly equal.',
            ],
            examples: [{
                language: 'javascript',
                code: [
                    'console.log(5 === "5");',
                    'console.log(5 == "5");',
                    'console.log({ value: 1 } === { value: 1 });',
                    '',
                    'const item = { value: 1 };',
                    'console.log(item === item);',
                ].join('\n'),
                result: 'The lines print false, true, false, and true.',
            }],
        },
        {
            id: 'logical-and-nullish',
            title: 'Logical operators return operand values',
            paragraphs: [
                '&& returns the first falsy operand or the last operand. || returns the first truthy operand or the last operand. ?? returns its right operand only when the left operand is null or undefined.',
                'Use ?? when 0, false, and an empty string are valid values that must be kept.',
            ],
            examples: [{
                language: 'javascript',
                code: [
                    'console.log(0 || 10);',
                    'console.log(0 ?? 10);',
                    'console.log("ready" && 7);',
                    'console.log(undefined ?? "missing");',
                ].join('\n'),
                result: 'The lines print 10, 0, 7, and missing.',
            }],
        },
        {
            id: 'strings',
            title: 'Template literals build strings',
            paragraphs: [
                'Strings can use single quotes, double quotes, or backticks. A template literal uses backticks and can insert an expression with ${...}. Strings are immutable.',
            ],
            examples: [{
                language: 'javascript',
                code: [
                    'const name = "Mia";',
                    'const score = 8;',
                    '',
                    'console.log(`${name} scored ${score + 2}`);',
                ].join('\n'),
                result: 'The output is Mia scored 10.',
            }],
        },
        {
            id: 'typescript-annotations',
            title: 'TypeScript checks assignments and operators',
            paragraphs: [
                'TypeScript uses the inferred or declared types of operands to check an expression. The checker can reject an invalid assignment or operation before the JavaScript runs.',
                'Use the lowercase primitive type names string, number, boolean, bigint, and symbol. The capitalized names describe boxed objects and are rarely the intended types.',
            ],
            examples: [{
                language: 'typescript',
                code: [
                    'let quantity: number = 2;',
                    'quantity += 3;',
                    '',
                    'const label: string = `Quantity: ${quantity}`;',
                    'console.log(label);',
                ].join('\n'),
                result: 'The emitted JavaScript prints Quantity: 5.',
                typeCheck: 'quantity = "five" is a type error. The number annotation does not convert a string into a number at runtime.',
            }],
        },
    ],
};

export default note;
