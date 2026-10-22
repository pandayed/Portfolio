import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "language-fundamentals",
    "title": "Language fundamentals",
    "summary": "Read statements, comments, calls, and indentation before studying values in detail.",
    "exampleLayout": "grouped",
    "updatedOn": "2026-10-15",
    "sections": [
        {
            "id": "comments",
            "title": "Comments",
            "bullets": [
                "Outside a string, # begins a comment lasting until the end of the line.",
                "Python does not execute comments.",
                "For several comment lines, begin each line with #.",
                "Triple-quoted text creates a string, not a multiline comment."
            ],
            "examples": [
                {
                    "title": "Separating comments from text",
                    "code": "# Display a greeting.\nprint(\"Hello\")  # A comment after code.\nprint(\"# is text here\")",
                    "result": "Hello\n# is text here",
                    "language": "python",
                    "description": [
                        "The calls display text while Python ignores the comments."
                    ]
                }
            ]
        },
        {
            "id": "indentation",
            "title": "Indentation",
            "bullets": [
                "A block is a group of statements belonging to a control statement, function, or class.",
                "A colon introduces an indented block.",
                "Use four spaces per level.",
                "Keep the indentation of statements in the same block consistent.",
                "A block needs at least one statement.",
                "Missing indentation can raise `IndentationError`; inconsistent tabs and spaces can raise `TabError`.",
                "`if` checks a condition.",
                "The next control-flow notes explain conditions in detail."
            ],
            "examples": [
                {
                    "title": "Reading an indented block",
                    "code": "if True:\n    print(\"Inside the block\")\n    print(\"Still inside\")\n\nprint(\"After the block\")",
                    "result": "Inside the block\nStill inside\nAfter the block",
                    "explanation": [
                        "`True` makes the block run.",
                        "The final call has no indentation, so it is outside the block."
                    ],
                    "language": "python",
                    "description": [
                        "The two indented calls belong to the same conditional block."
                    ]
                }
            ]
        },
        {
            "id": "continued-lines",
            "title": "Continued lines",
            "bullets": [
                "Inside parentheses, brackets, or braces, an expression can continue onto another physical line.",
                "Indentation within those delimiters helps readability.",
                "It does not by itself create a new block."
            ],
            "examples": [
                {
                    "title": "Splitting a call across lines",
                    "code": "print(\n    \"Total:\",\n    2 + 3,\n)",
                    "result": "Total: 5",
                    "explanation": [
                        "The closing parenthesis ends the one print call.",
                        "The final comma is allowed."
                    ],
                    "language": "python",
                    "description": [
                        "One call continues across several source lines."
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
