import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "exceptions",
    "title": "Exceptions",
    "summary": "Handle expected failures without hiding unrelated errors.",
    "updatedOn": "2026-10-01",
    "sections": [
        {
            "id": "else-finally",
            "title": "try, except, else, and finally",
            "bullets": [
                "Put the operation that may fail in try.",
                "A matching except handles an exception raised there.",
                "If no exception occurs in try, else runs.",
                "Finally runs after the handled path or the successful path, so use it for cleanup that must happen in either case.",
                "Keep the try block narrow so it covers only the operation expected to fail.",
                "An exception that no except handles still propagates after finally runs."
            ],
            "examples": [
                {
                    "title": "Valid input",
                    "code": "try:\n    age = int(\"20\")\nexcept ValueError:\n    print(\"Invalid age\")\nelse:\n    print(age)\nfinally:\n    print(\"Finished\")",
                    "result": "20 and Finished print on separate lines. The except block does not run."
                },
                {
                    "title": "Invalid input",
                    "code": "try:\n    age = int(\"bad\")\nexcept ValueError:\n    print(\"Invalid age\")\nelse:\n    print(age)\nfinally:\n    print(\"Finished\")",
                    "result": "Invalid age and Finished print on separate lines. The else block does not run."
                }
            ]
        },
        {
            "id": "exception-object",
            "title": "Inspecting the exception",
            "examples": [
                {
                    "code": "try:\n    age = int(\"unknown\")\nexcept ValueError as error:\n    print(error)  # invalid literal for int() with base 10: 'unknown'\n    print(type(error))  # <class 'ValueError'>",
                    "title": "Inspecting a captured exception",
                    "description": [
                        "The `except ValueError as error` clause binds the exception to `error`."
                    ]
                }
            ]
        },
        {
            "id": "raise",
            "title": "Raising an exception",
            "examples": [
                {
                    "code": "def set_age(age):\n    if age < 0:\n        raise ValueError(\"age cannot be negative\")",
                    "title": "Rejecting a negative age",
                    "description": [
                        "The function raises `ValueError` when `age` is negative."
                    ]
                }
            ]
        }
    ],
    "exampleLayout": "grouped"
};

export default note;
