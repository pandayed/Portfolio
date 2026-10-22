import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "loops-and-range",
    "title": "Loops and range",
    "summary": "Repeat work with for and while, control repetition, and detect a completed search.",
    "exampleLayout": "grouped",
    "updatedOn": "2026-10-15",
    "sections": [
        {
            "id": "for-loop",
            "title": "`for` loops",
            "bullets": [
                "A `for` loop takes values from an iterable one at a time.",
                "An iterable is an object that can supply values to a loop.",
                "Strings supply characters.",
                "Collection types introduced next can also supply their items.",
                "The loop variable receives each value before the indented block runs."
            ],
            "examples": [
                {
                    "title": "Visiting each character",
                    "code": "for letter in \"Go\":\n    print(letter)",
                    "result": "G\no",
                    "language": "python",
                    "description": [
                        "The loop receives one character per repetition."
                    ]
                }
            ]
        },
        {
            "id": "range",
            "title": "range",
            "bullets": [
                "`range(stop)` supplies integers from 0 up to, but excluding, stop.",
                "`range(start, stop, step)` selects the starting value and step.",
                "The default step is 1.",
                "A negative step counts downward.",
                "Step cannot be zero.",
                "A range is empty when its direction cannot reach the stop bound.",
                "`range` is a compact sequence object.",
                "It does not build a list containing every number."
            ],
            "examples": [
                {
                    "title": "Counting up and down",
                    "code": "for number in range(2, 7, 2):\n    print(number)\nfor number in range(3, 0, -1):\n    print(number)",
                    "result": "2\n4\n6\n3\n2\n1",
                    "language": "python",
                    "description": [
                        "The ranges supply values with positive and negative steps."
                    ]
                }
            ]
        },
        {
            "id": "while-loop",
            "title": "`while` loops",
            "bullets": [
                "`while` repeats its block while its condition remains truthy.",
                "It checks before each repetition.",
                "Update the state used by the condition when the loop should eventually finish.",
                "Otherwise it may repeat forever."
            ],
            "examples": [
                {
                    "title": "Repeating until a counter reaches its limit",
                    "code": "count = 0\nwhile count < 3:\n    print(count)\n    count += 1",
                    "result": "0\n1\n2",
                    "language": "python",
                    "description": [
                        "Each repetition increases the counter before the next condition check."
                    ]
                }
            ]
        },
        {
            "id": "break-continue",
            "title": "break and continue",
            "bullets": [
                "`break` exits the nearest enclosing loop.",
                "`continue` skips the rest of the current repetition and starts the next one.",
                "In nested loops, each inner loop runs within an outer repetition.",
                "break in the inner loop does not exit the outer loop."
            ],
            "examples": [
                {
                    "title": "Skipping one value and stopping early",
                    "code": "for number in range(6):\n    if number == 1:\n        continue\n    if number == 4:\n        break\n    print(number)",
                    "result": "0\n2\n3",
                    "language": "python",
                    "description": [
                        "One value skips the display, and another ends the loop."
                    ]
                }
            ]
        },
        {
            "id": "loop-else",
            "title": "Loop else",
            "bullets": [
                "A for or `while` loop can have an else block.",
                "It runs when the loop finishes normally, without `break`.",
                "For a `for` loop, finishing normally means exhausting its values.",
                "For a `while` loop, it means the condition became falsy.",
                "The else block also runs when the loop has zero repetitions.",
                "An exception or return that exits the loop bypasses else."
            ],
            "examples": [
                {
                    "title": "Detecting an unsuccessful search",
                    "code": "for letter in \"Ada\":\n    if letter == \"z\":\n        print(\"Found\")\n        break\nelse:\n    print(\"Not found\")",
                    "result": "Not found",
                    "explanation": [
                        "The loop visits every character without reaching break."
                    ],
                    "language": "python",
                    "description": [
                        "The search reaches the end without finding the requested character."
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
                        "text": "Python tutorial: for statements and loop control",
                        "href": "https://docs.python.org/3/tutorial/controlflow.html#for-statements"
                    }
                ]
            ]
        }
    ]
};

export default note;
