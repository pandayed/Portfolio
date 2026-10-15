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
                "A variable is a name bound to an object. An object is a value Python keeps in memory.",
                "Assignment evaluates the right side, then binds the name on the left. It does not copy the object.",
                "Use descriptive snake_case names. Names are case-sensitive, cannot start with a digit, and cannot be reserved keywords."
            ],
            "examples": [
                {
                    "title": "Assign and reassign a name",
                    "code": "score = 10\nscore = score + 5\nprint(score)",
                    "result": "15",
                    "explanation": [
                        "The second assignment reads the old value before binding score to the result."
                    ]
                }
            ]
        },
        {
            "id": "dynamic-typing",
            "title": "Objects have types",
            "bullets": [
                "A type determines which operations a value supports. type(value) returns its type.",
                "Python is dynamically typed: a name can later refer to an object of another type.",
                "Common scalar types are int, float, complex, bool, and str. None represents an absent value and has type NoneType.",
                "Collections group values. Lists, tuples, sets, and dictionaries have separate notes after control flow."
            ],
            "examples": [
                {
                    "title": "Inspect the current value",
                    "code": "value = 10\nprint(type(value))\nvalue = \"ten\"\nprint(type(value))",
                    "result": "<class 'int'>\n<class 'str'>"
                }
            ]
        },
        {
            "id": "multiple-assignment",
            "title": "Assign several names",
            "bullets": [
                "Chained assignment binds each name to the same object. It does not create separate copies.",
                "Multiple assignment can give different values to several names. Detailed unpacking belongs in Tuples and unpacking."
            ],
            "examples": [
                {
                    "title": "Two assignment forms",
                    "code": "left = right = 0\nx, y = 10, 20\nprint(left, right, x, y)",
                    "result": "0 0 10 20"
                }
            ]
        },
        {
            "id": "identity-mutability",
            "title": "Rebinding and mutability",
            "bullets": [
                "Rebinding changes which object a name refers to. Mutating changes an existing object.",
                "Numbers, strings, and tuples are immutable: their own contents cannot change. Lists, dictionaries, and sets are mutable.",
                "Assigning another name to a mutable object shares that object. The Lists note shows changes and copying.",
                "Use == for equal values. is checks whether two references point to the same object. Use value is None for an absence check. Detailed identity and hashing belong in the object-model notes."
            ]
        },
        {
            "id": "type-hints",
            "title": "Type hints",
            "bullets": [
                "A type hint records an expected type for editors and static type checkers. Python does not enforce it by itself."
            ],
            "examples": [
                {
                    "title": "Annotate an assignment",
                    "code": "age: int = 20\nage = \"twenty\"\nprint(age)",
                    "result": "twenty",
                    "explanation": [
                        "Python executes the assignment. A static type checker can report the incompatible type."
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
