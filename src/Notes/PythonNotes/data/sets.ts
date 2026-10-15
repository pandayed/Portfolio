import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "sets",
    "title": "Sets",
    "summary": "Store unique values, change membership, and compare groups with set operations.",
    "exampleLayout": "grouped",
    "updatedOn": "2026-10-15",
    "sections": [
        {
            "id": "sets",
            "title": "Creating sets",
            "bullets": [
                "A set stores distinct hashable values. Repeated equal values become one member.",
                "Use {value, ...} for a non-empty set and set() for an empty set. {} creates a dictionary.",
                "A set has no guaranteed iteration order and does not support indexing. Use sorted when you need an ordered display of comparable values.",
                "Set members follow the same hashability rules as dictionary keys. Lists, dictionaries, and mutable sets cannot be members."
            ],
            "examples": [
                {
                    "title": "Removing duplicates and checking membership",
                    "code": "tags = {\"python\", \"notes\", \"python\"}\nprint(sorted(tags))\nprint(\"python\" in tags)",
                    "result": "['notes', 'python']\nTrue"
                }
            ]
        },
        {
            "id": "modify",
            "title": "Adding and removing members",
            "bullets": [
                "add inserts one value. update adds values from an iterable.",
                "discard removes a value if present. remove raises KeyError when absent.",
                "pop removes and returns an arbitrary member. It raises KeyError on an empty set. clear removes every member."
            ],
            "examples": [
                {
                    "title": "Updating membership",
                    "code": "numbers = {1, 2}\nnumbers.add(3)\nnumbers.update([3, 4])\nnumbers.discard(9)\nnumbers.remove(1)\nprint(sorted(numbers))",
                    "result": "[2, 3, 4]"
                }
            ]
        },
        {
            "id": "operations",
            "title": "Set operations",
            "bullets": [
                "a | b gives union: members in either set. a & b gives intersection: members in both sets.",
                "a - b gives difference: members in a but not b. a ^ b gives symmetric difference: members in exactly one set.",
                "a <= b checks whether a is a subset of b. a < b checks for a proper subset. >= and > reverse those comparisons.",
                "isdisjoint checks whether two collections have no members in common."
            ],
            "examples": [
                {
                    "title": "Comparing two groups",
                    "code": "first = {1, 2, 3}\nsecond = {3, 4, 5}\nprint(sorted(first | second))\nprint(sorted(first & second))\nprint(sorted(first - second))\nprint(sorted(first ^ second))\nprint({1, 2} <= first)",
                    "result": "[1, 2, 3, 4, 5]\n[3]\n[1, 2]\n[1, 2, 4, 5]\nTrue"
                }
            ]
        },
        {
            "id": "frozenset",
            "title": "Immutable sets",
            "bullets": [
                "frozenset(iterable) creates an immutable set. It supports membership and non-mutating set operations.",
                "A frozenset is hashable, so it can be a dictionary key or a member of another set."
            ],
            "examples": [
                {
                    "title": "Using a set of values as a dictionary key",
                    "code": "pair = frozenset([\"read\", \"write\"])\npermissions = {pair: \"editor\"}\nprint(permissions[frozenset([\"write\", \"read\"])])",
                    "result": "editor",
                    "explanation": [
                        "The order used to create an equal frozenset does not affect lookup."
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
                        "text": "Python tutorial: sets",
                        "href": "https://docs.python.org/3/tutorial/datastructures.html#sets"
                    }
                ]
            ]
        }
    ]
};

export default note;
