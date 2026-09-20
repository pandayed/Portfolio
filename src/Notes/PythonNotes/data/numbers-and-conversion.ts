import type { PythonNote } from '../types';

const note: PythonNote = {
    slug: 'numbers-and-conversion',
    title: 'Numbers and conversion',
    summary: 'Use numeric literals, operators, math helpers, conversion, and truth values.',
    updatedOn: '2026-09-20',
    sections: [
        {
            id: 'numeric-literals',
            title: 'Numeric literals',
            examples: [{
                code: [
                    'binary = 0b101       # 5',
                    'hexadecimal = 0x12C  # 300',
                    'complex_no = 1 + 2j',
                    '',
                    'print(bin(10))       # 0b1010',
                    'print(hex(10))       # 0xa',
                ].join('\n'),
            }],
        },
        {
            id: 'operators',
            title: 'Arithmetic operators',
            bullets: [
                '/ performs true division and returns a float for integer operands.',
                '// performs floor division. It rounds down, not toward zero.',
                '% returns the remainder associated with floor division.',
                '** raises the left operand to the power of the right operand.',
                'Python has no ++ or -- operator. Use += 1 or -= 1.',
            ],
            examples: [{
                code: [
                    'print(10 / 3)    # 3.3333333333333335',
                    'print(10 // 3)   # 3',
                    'print(-10 // 3)  # -4',
                    'print(10 % 3)    # 1',
                    'print(10 ** 2)   # 100',
                ].join('\n'),
            }],
        },
        {
            id: 'math',
            title: 'Built-ins and math',
            examples: [{
                code: [
                    'import math',
                    '',
                    'print(round(3.145))',
                    'print(abs(-10))',
                    'print(math.floor(3.14))',
                    'print(math.ceil(3.14))',
                ].join('\n'),
            }],
            exceptions: [
                'round uses bankers rounding for exact halfway cases. Floating-point representation can also make decimal-looking values round in unexpected ways.',
            ],
        },
        {
            id: 'conversion',
            title: 'Input and conversion',
            paragraphs: ['input always returns a string. Convert it when the program needs another type.'],
            examples: [{
                code: [
                    'raw = input("x: ")',
                    'whole = int(raw)',
                    'decimal = float(raw)',
                ].join('\n'),
            }],
            exceptions: [
                'int and float raise ValueError when the string is not valid for that conversion. bool("False") is True because every non-empty string is truthy.',
            ],
        },
        {
            id: 'truthiness',
            title: 'Truthy and falsy values',
            bullets: [
                'False and None are falsy.',
                'Numeric zero values are falsy.',
                'Empty strings and empty containers are falsy.',
                'Most other objects are truthy unless their type defines otherwise.',
            ],
        },
    ],
};

export default note;
