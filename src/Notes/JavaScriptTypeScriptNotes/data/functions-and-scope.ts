import type { LearningNote } from '../../LearningNotes/types';

const note: LearningNote = {
    slug: 'functions-and-scope',
    title: 'Functions and scope',
    summary: 'Define functions, pass them as values, and understand lexical scope and closures.',
    scope: 'javascript-typescript',
    updatedOn: '2026-10-03',
    sections: [
        {
            id: 'declarations-and-return',
            title: 'A function can receive and return values',
            paragraphs: [
                'A function declaration defines a reusable callable value. return ends the current call and supplies its result. A function that reaches its end without return produces undefined.',
                'JavaScript allows a call with fewer or more arguments than the declared parameters. Missing arguments become undefined, and extra arguments are still passed even when named parameters do not read them.',
            ],
            examples: [{
                language: 'javascript',
                code: [
                    'function add(left, right) {',
                    '    return left + right;',
                    '}',
                    '',
                    'console.log(add(2, 3));',
                    'console.log(add(2));',
                ].join('\n'),
                result: 'The lines print 5 and NaN. The missing right argument is undefined, and 2 + undefined produces NaN.',
            }],
        },
        {
            id: 'functions-as-values',
            title: 'Functions are values',
            paragraphs: [
                'A function can be assigned to a variable, stored in an object, passed to another function, or returned from a function. Array methods often receive callback functions.',
                'An arrow function is a short function expression. Arrow functions do not create their own this, arguments, or new.target bindings.',
            ],
            examples: [{
                language: 'javascript',
                code: [
                    'const prices = [5, 10, 15];',
                    'const discounted = prices.map((price) => price - 2);',
                    '',
                    'console.log(discounted);',
                ].join('\n'),
                result: 'The output is [3, 8, 13]. map calls the arrow function once for each array value and returns a new array.',
            }],
        },
        {
            id: 'parameters',
            title: 'Default and rest parameters handle call input',
            paragraphs: [
                'A default parameter supplies a value when an argument is missing or explicitly undefined. A rest parameter gathers the remaining arguments into an array and must be the last parameter.',
            ],
            examples: [{
                language: 'javascript',
                code: [
                    'function total(discount = 0, ...prices) {',
                    '    const sum = prices.reduce((current, price) => current + price, 0);',
                    '    return sum - discount;',
                    '}',
                    '',
                    'console.log(total(2, 10, 5));',
                    'console.log(total(undefined, 10, 5));',
                ].join('\n'),
                result: 'The lines print 13 and 15.',
            }],
        },
        {
            id: 'block-and-function-scope',
            title: 'Scope controls where a name is available',
            paragraphs: [
                'let and const belong to the nearest enclosing block. A function creates a scope for its parameters and local variables. Code inside a scope can read names from its outer scopes unless a closer declaration uses the same name.',
            ],
            examples: [{
                language: 'javascript',
                code: [
                    'const label = "outer";',
                    '',
                    'function showLabel() {',
                    '    const label = "function";',
                    '    if (true) {',
                    '        const label = "block";',
                    '        console.log(label);',
                    '    }',
                    '    console.log(label);',
                    '}',
                    '',
                    'showLabel();',
                    'console.log(label);',
                ].join('\n'),
                result: 'The lines print block, function, and outer.',
            }],
        },
        {
            id: 'closures',
            title: 'A closure keeps access to outer variables',
            paragraphs: [
                'A function closes over names from the lexical scope where it was created. It can keep using those names after the outer function has returned.',
            ],
            examples: [{
                language: 'javascript',
                code: [
                    'function createCounter() {',
                    '    let count = 0;',
                    '    return () => {',
                    '        count += 1;',
                    '        return count;',
                    '    };',
                    '}',
                    '',
                    'const next = createCounter();',
                    'console.log(next());',
                    'console.log(next());',
                ].join('\n'),
                result: 'The lines print 1 and 2. The returned function keeps access to the same count variable.',
            }],
        },
        {
            id: 'this-and-call-site',
            title: 'A call determines this for a regular function',
            paragraphs: [
                'A regular function gets this from the way it is called. Calling an object method with object.method() makes that object the receiver for that call.',
                'An arrow function does not create its own this. It keeps the this value from the surrounding scope. This makes an arrow useful for a callback created inside a method, but unsuitable when the callback needs its own receiver.',
            ],
            examples: [{
                language: 'typescript',
                code: [
                    'const user = {',
                    '    name: "Mia",',
                    '    showName() {',
                    '        return this.name;',
                    '    },',
                    '    makeUppercaseLabel() {',
                    '        return () => this.name.toUpperCase();',
                    '    },',
                    '};',
                    '',
                    'const label = user.makeUppercaseLabel();',
                    'console.log(user.showName());',
                    'console.log(label());',
                ].join('\n'),
                result: 'The emitted JavaScript prints Mia and MIA. The method call receives user as this, and the arrow keeps that same receiver.',
                typeCheck: 'TypeScript infers the object shape and checks that this.name is a string inside these methods. The JavaScript call site still determines the runtime receiver for a regular function.',
            }],
            pitfalls: [
                'Detaching a method and calling it as a plain function loses its object receiver. Pass a wrapper or bind the receiver when the method needs this.',
            ],
        },
        {
            id: 'typescript-functions',
            title: 'TypeScript checks function contracts',
            paragraphs: [
                'TypeScript can annotate parameter types, a return type, and the type of a variable that stores a function. A parameter can be omitted only when it uses ? or has a default value. Adding undefined to a parameter type still requires the caller to pass an argument.',
            ],
            examples: [{
                language: 'typescript',
                code: [
                    'type Formatter = (value: number) => string;',
                    '',
                    'const formatPrice: Formatter = (value) => {',
                    '    return `$${value.toFixed(2)}`;',
                    '};',
                    '',
                    'console.log(formatPrice(4));',
                ].join('\n'),
                result: 'The emitted JavaScript prints $4.00.',
                typeCheck: 'formatPrice("4") and a Formatter that returns number are type errors.',
            }],
        },
    ],
};

export default note;
