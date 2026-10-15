import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "comprehensions",
    "title": "Comprehensions",
    "summary": "Build lists, sets, and dictionaries with a short transformation and optional filter.",
    "exampleLayout": "grouped",
    "updatedOn": "2026-10-15",
    "sections": [
        {
            "id": "list-comprehension-vs-loop",
            "title": "Building a list from a loop",
            "bullets": [
                "A comprehension constructs a collection from iterable values. Put the output expression before for.",
                "An optional if clause filters the input values before the output expression runs."
            ],
            "examples": [
                {
                    "title": "Comparing a loop with a comprehension",
                    "code": "numbers = [1, 2, 3, 4]\nwith_loop = []\nfor number in numbers:\n    if number % 2 == 0:\n        with_loop.append(number * number)\n\nwith_comprehension = [number * number for number in numbers if number % 2 == 0]\nprint(with_loop)\nprint(with_comprehension)",
                    "result": "[4, 16]\n[4, 16]",
                    "explanation": [
                        "The condition keeps even inputs. The expression squares each remaining value."
                    ]
                }
            ]
        },
        {
            "id": "comprehensions",
            "title": "Set and dictionary comprehensions",
            "bullets": [
                "A set comprehension uses braces with one output expression. The set keeps distinct results.",
                "A dictionary comprehension uses key: value before for. If a key appears again, its later value replaces the earlier one."
            ],
            "examples": [
                {
                    "title": "Building two collection types",
                    "code": "unique_doubles = {number * 2 for number in [1, 1, 2]}\nsquares = {number: number * number for number in range(4)}\nprint(sorted(unique_doubles))\nprint(squares)",
                    "result": "[2, 4]\n{0: 0, 1: 1, 2: 4, 3: 9}"
                }
            ]
        },
        {
            "id": "nested",
            "title": "Independent nested lists",
            "bullets": [
                "Each evaluation of a list expression creates a fresh list. A comprehension can use this to create independent rows.",
                "Multiple for clauses run in the same order as nested loops. Keep nesting short enough to read."
            ],
            "examples": [
                {
                    "title": "Creating separate rows",
                    "code": "rows = [[0] * 2 for _ in range(2)]\nrows[0][0] = 1\nprint(rows)",
                    "result": "[[1, 0], [0, 0]]",
                    "explanation": [
                        "Each repetition creates a new inner list. _ is an ordinary name used here for a value the expression does not need."
                    ]
                }
            ]
        },
        {
            "id": "generators",
            "title": "Choosing a generator for deferred values",
            "bullets": [
                [
                    "List, set, and dictionary comprehensions build their result immediately. A generator expression produces values on demand. Read ",
                    {
                        "text": "Iteration and generators",
                        "href": "#/notes/python/iteration-and-generators"
                    },
                    " after functions for its one-pass behavior and generator functions."
                ]
            ]
        },
        {
            "id": "references",
            "title": "References",
            "bullets": [
                [
                    {
                        "text": "Python tutorial: list comprehensions",
                        "href": "https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions"
                    }
                ]
            ]
        }
    ]
};

export default note;
