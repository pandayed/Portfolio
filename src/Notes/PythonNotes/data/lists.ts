import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "lists",
    "title": "Lists",
    "summary": "Store an ordered collection, change items, search and sort, and understand shared references.",
    "exampleLayout": "grouped",
    "updatedOn": "2026-10-15",
    "sections": [
        {
            "id": "create-access",
            "title": "Creating and accessing lists",
            "bullets": [
                "A list is a mutable sequence.",
                "It keeps insertion order and allows duplicate values.",
                "Use square brackets for literals and `list(iterable)` to collect values.",
                "`len` returns the number of items.",
                "Indexing and slicing follow the same start-inclusive, stop-exclusive rules as strings.",
                "An invalid single index raises `IndexError`.",
                "`range(3)` supplies the integers 0, 1, and 2.",
                "The Loops and range note explains its bounds and step."
            ],
            "examples": [
                {
                    "title": "Creating and reading a list",
                    "code": "names = [\"Ada\", \"Grace\", \"Ada\"]\nprint(names[0], names[-1])\nprint(names[1:])\nprint(list(range(3)))\nprint(len(names))",
                    "result": "Ada Ada\n['Grace', 'Ada']\n[0, 1, 2]\n3",
                    "language": "python",
                    "description": [
                        "The list preserves repeated names and supports indexing, slicing, and length checks."
                    ]
                }
            ]
        },
        {
            "id": "modify",
            "title": "Changing, adding, and removing items",
            "bullets": [
                "Assign to an index to replace an item.",
                "Assign to a slice to replace a range of items.",
                "`append` adds one item.",
                "`extend` adds each value from an iterable.",
                "`insert` adds one item at a position.",
                "`pop` removes `and` returns an item, using the last position by default.",
                "An invalid position raises `IndexError`.",
                "`remove` deletes the first equal value and raises `ValueError` if absent.",
                "del removes an item or slice.",
                "`clear` empties the list.",
                "Methods that only change a list, such as `append`, return `None`.",
                "Do not assign their result back to the list name."
            ],
            "examples": [
                {
                    "title": "Updating a task list",
                    "code": "tasks = [\"read\", \"write\"]\ntasks[0] = \"study\"\ntasks.append(\"review\")\ntasks.extend([\"save\", \"close\"])\nlast = tasks.pop()\ntasks.remove(\"write\")\nprint(tasks)\nprint(last)",
                    "result": "['study', 'review', 'save']\nclose",
                    "language": "python",
                    "description": [
                        "The operations replace, add, and remove tasks."
                    ]
                }
            ]
        },
        {
            "id": "search-sort",
            "title": "Searching and sorting",
            "bullets": [
                "in checks membership.",
                "`index` returns the first matching position and raises `ValueError` if absent.",
                "`count` returns the number of equal items.",
                "`sort` changes a list in place `and` returns `None`.",
                "`sorted`(iterable) returns a new `sorted` list.",
                "`reverse=True` sorts in descending order.",
                "Compared values must support ordering.",
                "Custom sorting keys are covered after functions."
            ],
            "examples": [
                {
                    "title": "Finding items and sorting without losing the original order",
                    "code": "numbers = [3, 1, 3, 2]\nprint(3 in numbers, numbers.index(3), numbers.count(3))\nordered = sorted(numbers)\nprint(numbers)\nprint(ordered)\nnumbers.sort(reverse=True)\nprint(numbers)",
                    "result": "True 0 2\n[3, 1, 3, 2]\n[1, 2, 3, 3]\n[3, 3, 2, 1]",
                    "language": "python",
                    "description": [
                        "A separate sorted list preserves the original order before an in-place descending sort."
                    ]
                }
            ]
        },
        {
            "id": "shared-reference",
            "title": "Shared references",
            "bullets": [
                "Assigning a list to another name does not copy it.",
                "Both names refer to the same list.",
                "A shallow copy makes a new outer list, while keeping references to its items.",
                "To create a shallow copy of a list named items, use `items.copy()`, items[:], or `list(items)`.",
                [
                    "For nested objects and deep copying, read ",
                    {
                        "text": "Objects and mutability",
                        "href": "#/notes/python/objects-and-mutability"
                    },
                    "."
                ]
            ],
            "examples": [
                {
                    "title": "Comparing a shared reference and a shallow copy",
                    "code": "original = [1, 2]\nshared = original\ncopied = original.copy()\nshared.append(3)\nprint(original)\nprint(copied)",
                    "result": "[1, 2, 3]\n[1, 2]",
                    "explanation": [
                        "Changing shared also changes the list seen through original. copied has a different outer list."
                    ],
                    "language": "python",
                    "description": [
                        "One name shares the original list, while another refers to a shallow copy."
                    ]
                }
            ]
        },
        {
            "id": "repeat",
            "title": "Repeated nested references",
            "bullets": [
                "Multiplying a list repeats references to its items.",
                "It does not copy nested lists.",
                "Use a comprehension to create an independent inner list for each row.",
                "Comprehensions have a separate note after dictionaries and sets."
            ],
            "examples": [
                {
                    "title": "Observing repeated references",
                    "code": "rows = [[0]] * 2\nrows[0].append(1)\nprint(rows)",
                    "result": "[[0, 1], [0, 1]]",
                    "explanation": [
                        "Both positions refer to the same inner list."
                    ],
                    "language": "python",
                    "description": [
                        "Both rows initially refer to one inner list."
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
                        "text": "Python tutorial: lists",
                        "href": "https://docs.python.org/3/tutorial/datastructures.html#more-on-lists"
                    }
                ]
            ]
        }
    ]
};

export default note;
