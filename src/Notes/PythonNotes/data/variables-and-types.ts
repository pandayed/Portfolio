import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "variables-and-types",
    "title": "Variables and types",
    "summary": "Assign names, inspect built-in types, and distinguish rebinding from changing an object.",
    "exampleLayout": "grouped",
    "updatedOn": "2026-10-15",
    "sections": [
        {
            "id": "bindings",
            "title": "Names and assignment",
            "bullets": [
                "A variable is a name bound to an object.",
                "An object is a value Python keeps in memory.",
                "Assignment evaluates the right side, then binds the name on the left.",
                "It does not copy the object.",
                "Use descriptive `snake_case` names.",
                "Names are case-sensitive, cannot start with a digit, `and` cannot be reserved keywords."
            ],
            "examples": [
                {
                    "title": "Assigning and reassigning a name",
                    "code": "score = 10\nscore = score + 5\nprint(score)",
                    "result": "15",
                    "explanation": [
                        "The second assignment reads the old value before binding score to the result."
                    ],
                    "language": "python",
                    "description": [
                        "The second assignment uses the current score to calculate its replacement."
                    ]
                }
            ]
        },
        {
            "id": "dynamic-typing",
            "title": "Dynamic typing",
            "bullets": [
                "A type determines which operations a value supports.",
                "`type(value)` returns its type.",
                "Python is dynamically typed: a name can later refer to an object of another type.",
                "Common scalar types are `int`, `float`, `complex`, `bool`, and `str`.",
                "`None` represents an absent value and has type `NoneType`."
            ],
            "examples": [
                {
                    "title": "Inspecting the current value",
                    "code": "value = 10\nprint(type(value))\nvalue = \"ten\"\nprint(type(value))",
                    "result": "<class 'int'>\n<class 'str'>",
                    "language": "python",
                    "description": [
                        "The same name refers to an integer and then a string."
                    ]
                }
            ]
        },
        {
            "id": "numeric-literals",
            "title": "Numeric types and literals",
            "bullets": [
                "`float` stores approximate binary floating-point values.",
                "Many decimal fractions are not exact.",
                "Write the imaginary part of a `complex` number with `j`.",
                "Use `0b` for binary, `0o` for octal, and `0x` for hexadecimal integer literals.",
                "Underscores can separate digits."
            ],
            "table": {
                "columns": [
                    "Type",
                    "Values",
                    "Examples",
                    "Range"
                ],
                "rows": [
                    [
                        "`int`",
                        "Whole numbers",
                        "`-10, 0, 1_000, 0b101, 0o17, 0x12C`",
                        "No fixed minimum or maximum; limited by available memory."
                    ],
                    [
                        "`float`",
                        "Approximate real numbers",
                        "`-3.5, 0.0, 2.5, 1e3`",
                        "Usually about -1.8 × 10^308 to +1.8 × 10^308 for finite values. Also supports infinity and NaN (not a number)."
                    ],
                    [
                        "`complex`",
                        "Real and imaginary parts, each stored as a `float`",
                        "`1 + 2j, -3j`",
                        "Each part has the same range and precision limits as `float`."
                    ]
                ]
            },
            "examples": [
                {
                    "title": "Writing and displaying numeric values",
                    "code": "count = 1_000\nbinary = 0b101\nhexadecimal = 0x12C\nnumber = 1 + 2j\nprint(count, binary, hexadecimal, number)\nprint(bin(10), hex(10))",
                    "result": "1000 5 300 (1+2j)\n0b1010 0xa",
                    "language": "python",
                    "description": [
                        "Integer literals use several bases, and a complex literal includes an imaginary part."
                    ]
                }
            ]
        },
        {
            "id": "multiple-assignment",
            "title": "Multiple assignment",
            "bullets": [
                "Chained assignment binds each name to the same object.",
                "It does not create separate copies.",
                "Multiple assignment can give different values to several names.",
                "Detailed unpacking belongs in Tuples and unpacking."
            ],
            "examples": [
                {
                    "title": "Two assignment forms",
                    "code": "left = right = 0\nx, y = 10, 20\nprint(left, right, x, y)",
                    "result": "0 0 10 20",
                    "language": "python",
                    "description": [
                        "Chained assignment shares one value, while unpacking assigns separate values."
                    ]
                }
            ]
        },
        {
            "id": "identity-mutability",
            "title": "Rebinding and mutability",
            "bullets": [
                "Rebinding changes which object a name refers to.",
                "Mutating changes an existing object.",
                "Numbers, strings, and tuples are immutable: their own contents cannot change.",
                "Lists, dictionaries, and sets are mutable.",
                "Assigning another name to a mutable object shares that object.",
                "The Lists note shows changes and copying.",
                "Use `==` for equal values.",
                "`is` checks whether two references point to the same object.",
                "Use `value is None` for an absence check.",
                "Detailed identity and hashing belong in the object-model notes."
            ]
        },
        {
            "id": "type-hints",
            "title": "Type hints",
            "bullets": [
                "A type hint records an expected type for editors and static type checkers.",
                "Python does not enforce it by itself."
            ],
            "examples": [
                {
                    "title": "Annotating an assignment",
                    "code": "age: int = 20\nage = \"twenty\"\nprint(age)",
                    "result": "twenty",
                    "explanation": [
                        "Python executes the assignment.",
                        "A static type checker can report the incompatible type."
                    ],
                    "language": "python",
                    "description": [
                        "The second assignment conflicts with the annotation but still runs."
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
                        "text": "Python tutorial: an informal introduction",
                        "href": "https://docs.python.org/3/tutorial/introduction.html"
                    }
                ]
            ]
        }
    ]
};

export default note;
