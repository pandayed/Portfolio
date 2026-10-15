import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "numbers-and-conversion",
    "title": "Numbers and conversion",
    "summary": "Use numeric types, arithmetic, rounding, input, and explicit conversion.",
    "exampleLayout": "grouped",
    "updatedOn": "2026-10-15",
    "sections": [
        {
            "id": "numeric-literals",
            "title": "Numeric types and literals",
            "bullets": [
                "int stores whole numbers. Its size grows as needed, subject to available memory.",
                "float stores approximate binary floating-point values. Many decimal fractions are not exact.",
                "complex stores real and imaginary parts. Write the imaginary part with j.",
                "Use 0b for binary, 0o for octal, and 0x for hexadecimal integer literals. Underscores can separate digits."
            ],
            "examples": [
                {
                    "title": "Write and display numeric values",
                    "code": "count = 1_000\nbinary = 0b101\nhexadecimal = 0x12C\nnumber = 1 + 2j\nprint(count, binary, hexadecimal, number)\nprint(bin(10), hex(10))",
                    "result": "1000 5 300 (1+2j)\n0b1010 0xa"
                }
            ]
        },
        {
            "id": "operators",
            "title": "Arithmetic operators",
            "bullets": [
                "Use +, -, and * for addition, subtraction, and multiplication. ** raises a number to a power.",
                "/ gives true division. Integer operands produce a float. // gives floor division, which rounds down.",
                "% gives the remainder associated with floor division. Division or remainder by zero raises ZeroDivisionError.",
                "Multiplication and division run before addition and subtraction. Use parentheses to state a different order.",
                "Use += 1 or -= 1 to update a counter. Python has no increment or decrement operator."
            ],
            "examples": [
                {
                    "title": "Compare division and grouping",
                    "code": "print(10 / 4)\nprint(10 // 3, -10 // 3)\nprint(10 % 3, 2 ** 3)\nprint((2 + 3) * 4)",
                    "result": "2.5\n3 -4\n1 8\n20"
                }
            ]
        },
        {
            "id": "math",
            "title": "Rounding and numeric helpers",
            "bullets": [
                "abs returns absolute value. round rounds to a requested number of digits.",
                "Exact halfway cases use the even result. Floating-point approximation can affect decimal-looking halfway cases.",
                "math.floor rounds down. math.ceil rounds up. import makes a module available; modules have a later chapter."
            ],
            "examples": [
                {
                    "title": "Round in different directions",
                    "code": "import math\n\nprint(abs(-10))\nprint(round(2.5), round(3.5))\nprint(math.floor(-3.2), math.ceil(-3.2))",
                    "result": "10\n2 4\n-4 -3"
                }
            ]
        },
        {
            "id": "conversion",
            "title": "Input and explicit conversion",
            "bullets": [
                "input displays its prompt and returns the entered text as a string.",
                "int converts valid whole-number text or truncates a float toward zero. float converts valid numeric text to a float. str converts a value to text.",
                "int(\"3.5\") raises ValueError. Convert decimal text with float when appropriate. Invalid numeric text also raises ValueError.",
                "Conversion to bool follows truth-value rules. Read those rules in Conditionals."
            ],
            "examples": [
                {
                    "title": "Convert a typed number",
                    "code": "raw = input(\"Quantity: \")\nquantity = int(raw)\nprint(quantity + 1)",
                    "explanation": [
                        "For input 4, the final line displays 5. A non-integer input raises ValueError."
                    ]
                }
            ]
        },
        {
            "id": "references",
            "title": "References",
            "bullets": [
                [
                    {
                        "text": "Python tutorial: numbers",
                        "href": "https://docs.python.org/3/tutorial/introduction.html#numbers"
                    }
                ]
            ]
        }
    ]
};

export default note;
