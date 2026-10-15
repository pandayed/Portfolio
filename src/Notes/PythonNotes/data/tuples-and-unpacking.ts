import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "tuples-and-unpacking",
    "title": "Tuples and unpacking",
    "summary": "Store fixed sequences and unpack iterable values into names or calls.",
    "exampleLayout": "grouped",
    "updatedOn": "2026-10-15",
    "sections": [
        {
            "id": "tuples",
            "title": "Tuple basics",
            "bullets": [
                "A tuple is an immutable sequence. It preserves order and duplicate values.",
                "Commas create a non-empty tuple. Parentheses usually make it easier to read. Use () for an empty tuple and (value,) for a one-item tuple.",
                "Indexing, slicing, len, concatenation with +, and repetition with * work as they do for other sequences."
            ],
            "examples": [
                {
                    "title": "Creating a tuple and accessing its items",
                    "code": "point = (10, 20)\nsingle = (10,)\nprint(point[0], point[-1])\nprint(point + (30,))\nprint(single * 2)",
                    "result": "10 20\n(10, 20, 30)\n(10, 10)"
                }
            ]
        },
        {
            "id": "mutability",
            "title": "Immutable structure, possibly mutable items",
            "bullets": [
                "A tuple cannot replace, add, or remove its own items. A mutable object inside it can still change.",
                "Use a tuple for a fixed record whose positions have meaning. Use a list for a collection that grows or changes."
            ],
            "examples": [
                {
                    "title": "Changing a list held by a tuple",
                    "code": "record = ([\"a\"], 1)\nrecord[0].append(\"b\")\nprint(record)",
                    "result": "(['a', 'b'], 1)",
                    "explanation": [
                        "The tuple still contains the same list object. The list contents changed."
                    ]
                }
            ]
        },
        {
            "id": "swap",
            "title": "Packing, unpacking, and swapping",
            "bullets": [
                "Packing groups values into a tuple. Unpacking assigns iterable values to separate targets.",
                "Without a starred target, the number of values must match the number of targets. Otherwise assignment raises ValueError.",
                "Python evaluates the right side before assigning the left targets. This allows swapping names."
            ],
            "examples": [
                {
                    "title": "Unpacking a pair and swapping names",
                    "code": "point = 10, 20\nx, y = point\nx, y = y, x\nprint(x, y)",
                    "result": "20 10"
                }
            ]
        },
        {
            "id": "star-target",
            "title": "Collecting remaining items",
            "bullets": [
                "One starred assignment target collects remaining values into a list. Other targets still require their own values.",
                "Unpacking works with any iterable, including lists and strings. It is not limited to tuples."
            ],
            "examples": [
                {
                    "title": "Keeping the first and last values",
                    "code": "first, *middle, last = [1, 2, 3, 4]\nprint(first, middle, last)",
                    "result": "1 [2, 3] 4"
                }
            ]
        },
        {
            "id": "star-unpacking",
            "title": "Expanding values into a call or collection",
            "bullets": [
                "In a call, * expands iterable values into positional arguments. This differs from a starred assignment target, which collects values.",
                "In a list or tuple display, * expands items into the new collection. Dictionary merging is covered in Dictionaries."
            ],
            "examples": [
                {
                    "title": "Expanding existing sequences",
                    "code": "numbers = [1, 2, 3]\nprint(*numbers)\ncombined = [0, *numbers, 4]\nprint(combined)",
                    "result": "1 2 3\n[0, 1, 2, 3, 4]"
                }
            ]
        },
        {
            "id": "references",
            "title": "References",
            "bullets": [
                [
                    {
                        "text": "Python tutorial: tuples and sequences",
                        "href": "https://docs.python.org/3/tutorial/datastructures.html#tuples-and-sequences"
                    }
                ]
            ]
        }
    ]
};

export default note;
