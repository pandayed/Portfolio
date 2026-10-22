import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "context-managers",
    "title": "Context managers and with",
    "summary": "Follow the context manager protocol and define setup and cleanup for a block.",
    "updatedOn": "2026-10-15",
    "exampleLayout": "grouped",
    "sections": [
        {
            "id": "with-file",
            "title": "with defines a managed block",
            "bullets": [
                [
                    "For opening, reading, and writing files, see ",
                    {
                        "text": "Files and JSON",
                        "href": "#/notes/python/files-and-json"
                    },
                    ". The protocol below explains how that cleanup works."
                ],
                "A context manager provides setup before a block and cleanup when the block exits.",
                "The with statement calls these operations.",
                "A file object is a context manager.",
                "Its cleanup closes the file even when the block raises an exception."
            ]
        },
        {
            "id": "protocol",
            "title": "What with calls",
            "bullets": [
                "Python evaluates the expression after with to obtain a context manager.",
                "It calls `__enter__()`.",
                "The returned value is assigned to the name after as.",
                "It need not be the manager itself.",
                "If `__enter__()` raises, the block does not start and Python does not call that manager’s `__exit__()`.",
                "After the body starts, Python calls `__exit__(exc_type, exc_value, traceback)` when the body leaves, including on return or an exception.",
                "On normal completion, the three exception arguments are `None`.",
                "On an exception, they describe the error.",
                "A true return value from `__exit__` suppresses an exception from the body.",
                "`False` or `None` lets it propagate."
            ]
        },
        {
            "id": "custom",
            "title": "Defining setup and cleanup",
            "examples": [
                {
                    "title": "Running cleanup on success and failure",
                    "description": [
                        "Define a manager and exercise both paths in one program."
                    ],
                    "code": "class Session:\n    def __enter__(self):\n        print(\"start\")\n        return self\n\n    def __exit__(self, exc_type, exc_value, traceback):\n        print(\"finish\")\n        return False\n\nwith Session() as session:\n    print(isinstance(session, Session))\n\ntry:\n    with Session():\n        raise ValueError(\"bad value\")\nexcept ValueError as error:\n    print(error)",
                    "result": "start\nTrue\nfinish\nstart\nfinish\nbad value",
                    "explanation": [
                        "`__enter__` returns the `Session` instance for the as binding.",
                        "`__exit__` runs in both paths.",
                        "Returning `False` lets `ValueError` reach the except block."
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
                        "text": "Python with statement reference",
                        "href": "https://docs.python.org/3/reference/compound_stmts.html#the-with-statement"
                    }
                ]
            ]
        }
    ]
};

export default note;
