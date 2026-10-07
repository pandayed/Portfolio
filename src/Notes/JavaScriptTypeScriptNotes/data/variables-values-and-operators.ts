import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'variables-values-and-operators',
    title: 'Variables, values, and operators',
    summary: 'Declare variables, use operators, and check when JavaScript converts values.',
    scope: 'javascript-typescript',
    updatedOn: '2026-10-07',
    sections: [
        {
            id: 'const-and-let',
            title: 'Use const by default and let for reassignment',
            bullets: [
                'const and let create block-scoped variables. A block is the code inside braces.',
                'A block-scoped variable is available inside its block and any nested blocks.',
                'A const variable needs an initial value. You cannot assign another value to it.',
                'A let variable can receive a new value.',
                'var is function-scoped. It is available throughout its enclosing function.',
                'var follows different hoisting rules. Hoisting affects when code can use a declaration.',
                'Existing code may use var. Use const and let to make the intended scope clearer.',
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
                result: 'The output is 27.500000000000004. JavaScript uses binary floating-point arithmetic: it stores numbers in base 2 with limited precision. Some decimal values are not exact in this format.',
            }],
        },
        {
            id: 'arithmetic',
            title: 'Arithmetic operators work on numeric values',
            bullets: [
                '+ adds numbers. When an operand is a string, + joins the values into a string.',
                'An operand is a value that an operator uses.',
                '-, *, and / perform subtraction, multiplication, and division.',
                '% gives the remainder after division. ** raises a value to a power.',
                'JavaScript uses number for most numeric work.',
                'Use bigint for integers outside the safe integer range of number.',
                'Within the safe integer range, number represents every integer exactly.',
                'Outside that range, some integers lose precision.',
                'Do not mix number and bigint in arithmetic.',
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
            bullets: [
                '=== and !== compare values without converting their types.',
                '== and != can convert values before comparing them. This can hide a type mismatch.',
                'Objects compare by identity. They are equal only when both values refer to the same object.',
                'Two separate objects with the same properties are not strictly equal.',
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
            bullets: [
                'A falsy value becomes false when JavaScript converts it to a boolean. A truthy value becomes true.',
                '&& returns the first falsy operand. If no operand is falsy, it returns the last operand.',
                '|| returns the first truthy operand. If no operand is truthy, it returns the last operand.',
                '?? returns its right operand only when the left operand is null or undefined.',
                'Use ?? when you need to keep 0, false, or an empty string.',
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
            bullets: [
                'Strings can use single quotes, double quotes, or backticks.',
                'A template literal uses backticks. It inserts the result of an expression with ${...}.',
                'Strings are immutable. You cannot change a string value itself.',
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
            bullets: [
                'TypeScript checks an expression using the inferred or declared types of its operands.',
                'The checker can reject an invalid assignment or operation before JavaScript runs.',
                'Use the lowercase primitive type names string, number, boolean, bigint, and symbol.',
                'The capitalized names describe boxed objects. These are object wrappers around primitive values.',
                'You rarely need boxed object types for ordinary values.',
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
