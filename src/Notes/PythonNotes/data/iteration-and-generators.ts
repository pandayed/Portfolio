import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "iteration-and-generators",
    "title": "Iterables, iterators, and generators",
    "summary": "Read values with iter() and next(), then produce them lazily with yield and generator expressions.",
    "updatedOn": "2026-10-15",
    "exampleLayout": "grouped",
    "sections": [
        {
            "id": "iterables-and-iterators",
            "title": "Get an iterator from an iterable",
            "bullets": [
                "An iterable can provide an iterator. Lists, strings, dictionaries, and range objects are iterables.",
                "An iterator keeps its position and supplies the next value on request. Every iterator is iterable, but a list is not itself an iterator.",
                "iter(iterable) gets an iterator. next(iterator) advances it and returns one value.",
                "When no values remain, next() raises StopIteration. next(iterator, default) returns the default instead.",
                "A for loop obtains an iterator and advances it until StopIteration ends the loop."
            ],
            "examples": [
                {
                    "title": "Read values one at a time",
                    "description": [
                        "Read values one at a time."
                    ],
                    "code": "numbers = [10, 20]\ncursor = iter(numbers)\nprint(next(cursor))\nprint(next(cursor))\nprint(next(cursor, \"No values left\"))",
                    "result": "10\n20\nNo values left"
                }
            ]
        },
        {
            "id": "iterator-lifetime",
            "title": "An iterator keeps its current position",
            "bullets": [
                "Calling iter() on a list gives a new iterator. Calling iter() on an iterator returns that same iterator.",
                "An exhausted iterator does not restart. Get a new iterator from a reusable iterable or recreate the source."
            ],
            "examples": [
                {
                    "title": "A new iterator starts a new pass",
                    "description": [
                        "A new iterator starts a new pass."
                    ],
                    "code": "numbers = [10, 20]\ncursor = iter(numbers)\nprint(list(cursor))\nprint(list(cursor))\nprint(list(iter(numbers)))\nprint(iter(cursor) is cursor)",
                    "result": "[10, 20]\n[]\n[10, 20]\nTrue"
                }
            ]
        },
        {
            "id": "generator-functions",
            "title": "Produce values with a generator function",
            "bullets": [
                "A function containing yield is a generator function. Calling it returns a generator iterator without running its body yet.",
                "Each next() resumes the function until it yields a value. The generator keeps local variables and its execution position between yields.",
                "yield provides one value and pauses. return ends the generator and causes iteration to stop.",
                "A generator supports one pass. Calling the generator function again creates a new generator."
            ],
            "examples": [
                {
                    "title": "Pause and resume at yield",
                    "description": [
                        "Pause and resume at yield."
                    ],
                    "code": "def count_to_three():\n    print(\"started\")\n    for number in range(1, 4):\n        yield number\n    print(\"done\")\n\nnumbers = count_to_three()\nprint(\"created\")\nprint(next(numbers))\nprint(list(numbers))\nprint(list(numbers))",
                    "result": "created\nstarted\n1\ndone\n[2, 3]\n[]",
                    "explanation": [
                        "Creating numbers does not run the body. The first next() reaches the first yield.",
                        "The first list() consumes the remaining values and finishes the body. The second list() finds an exhausted generator."
                    ]
                }
            ]
        },
        {
            "id": "list-versus-generator-expression",
            "title": "Choose a generator expression or a list",
            "bullets": [
                "A generator expression uses parentheses and computes results as its iterator advances.",
                "A list comprehension computes and stores all its results immediately. Its syntax is covered with collection operations.",
                "Choose a list for indexing or repeated passes. Choose a generator when one pass is enough and you can consume results one at a time.",
                "A generator avoids storing all produced values at once. Collecting its output with list() still uses memory for that list. Its input may also already occupy memory."
            ],
            "examples": [
                {
                    "title": "Consume a generator expression once",
                    "description": [
                        "Consume a generator expression once."
                    ],
                    "code": "values = (number * 2 for number in range(3))\nprint(next(values))\nprint(list(values))\nprint(list(values))\n\nsaved = [number * 2 for number in range(3)]\nprint(saved)\nprint(saved)",
                    "result": "0\n[2, 4]\n[]\n[0, 2, 4]\n[0, 2, 4]",
                    "explanation": [
                        "The generator computes each doubled value when requested. The list keeps its computed values for reuse."
                    ]
                }
            ]
        },
        {
            "id": "references",
            "title": "Tutorial reference",
            "bullets": [
                [
                    {
                        "text": "Python tutorial: Iterators and generators",
                        "href": "https://docs.python.org/3/tutorial/classes.html#iterators"
                    }
                ]
            ]
        }
    ]
};

export default note;
