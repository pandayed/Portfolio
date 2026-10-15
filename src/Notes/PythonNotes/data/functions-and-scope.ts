import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "functions-and-scope",
    "title": "Function basics",
    "summary": "Define a function, call it with arguments, and return a result.",
    "updatedOn": "2026-10-15",
    "exampleLayout": "grouped",
    "sections": [
        {
            "id": "define-return",
            "title": "Defining and calling a function",
            "bullets": [
                "Use def, a function name, and parentheses to define a function. Indent its body.",
                "A parameter is a name in the definition. An argument is a value supplied in a call.",
                "Defining a function does not run its body. Calling it runs the body.",
                "Use return to send a result to the caller and end the current call."
            ],
            "examples": [
                {
                    "title": "Returning a greeting",
                    "code": "def greet(name):\n    return f\"Hello, {name}\"\n\nprint(greet(\"Ava\"))",
                    "result": "Hello, Ava",
                    "explanation": [
                        "name is the parameter. \"Ava\" is the argument.",
                        "The call returns a string. print() displays that string."
                    ]
                }
            ]
        },
        {
            "id": "return-values",
            "title": "Return values and None",
            "bullets": [
                "A function returns None if it reaches the end without returning a value. A bare return also returns None.",
                "Printing displays a value. Returning makes a value available to the caller.",
                "Returning comma-separated values creates a tuple. The caller can unpack it."
            ],
            "examples": [
                {
                    "title": "Returning two related values",
                    "code": "def divide(number, divisor):\n    return number // divisor, number % divisor\n\nquotient, remainder = divide(17, 5)\nprint(quotient, remainder)",
                    "result": "3 2"
                }
            ]
        },
        {
            "id": "docstrings",
            "title": "Documenting a function",
            "bullets": [
                "A docstring is a string placed first in a function body. It describes what the function does.",
                "help() and documentation tools can read the docstring."
            ],
            "examples": [
                {
                    "title": "Describing the return value",
                    "code": "def square(number):\n    \"\"\"Return number multiplied by itself.\"\"\"\n    return number * number\n\nprint(square(4))",
                    "result": "16"
                }
            ]
        },
        {
            "id": "annotations",
            "title": "Function type annotations",
            "bullets": [
                "Annotations describe expected parameter and return types. Python does not enforce these types by itself.",
                "A type checker can check annotated calls before the program runs."
            ],
            "examples": [
                {
                    "title": "Annotating parameters and the return value",
                    "code": "def pair(number: int, label: str) -> tuple[int, str]:\n    return number, label\n\nprint(pair(3, \"ready\"))",
                    "result": "(3, 'ready')"
                }
            ]
        },
        {
            "id": "references",
            "title": "Tutorial reference",
            "bullets": [
                [
                    {
                        "text": "Python tutorial: Defining functions",
                        "href": "https://docs.python.org/3/tutorial/controlflow.html#defining-functions"
                    }
                ]
            ]
        }
    ]
};

export default note;
