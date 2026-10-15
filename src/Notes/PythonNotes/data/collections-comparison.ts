import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "collections-comparison",
    "title": "Choosing a collection",
    "summary": "Compare sequence, set, and mapping behavior after learning each collection separately.",
    "exampleLayout": "grouped",
    "updatedOn": "2026-10-15",
    "sections": [
        {
            "id": "differences",
            "title": "Order, duplicates, and lookup",
            "bullets": [
                "List: ordered, mutable sequence. Keeps duplicates. Reads and replaces values by position.",
                "Tuple: ordered, immutable sequence. Keeps duplicates. Reads values by position.",
                "Set: mutable collection of distinct hashable values. Tests membership without positional lookup. No guaranteed iteration order.",
                "Dictionary: mutable mapping from unique hashable keys to values. Keeps key insertion order. Looks up values by key. Values may repeat."
            ]
        },
        {
            "id": "choose",
            "title": "Choose by the operation you need",
            "bullets": [
                "Use a list for an ordered collection that may grow or change, such as pending tasks.",
                "Use a tuple for a fixed record whose positions have meaning, such as coordinates.",
                "Use a set for uniqueness, membership, union, intersection, or difference.",
                "Use a dictionary when a name or identifier selects a value, such as student ID to score."
            ]
        },
        {
            "id": "limits",
            "title": "Shared rules and limits",
            "bullets": [
                "Empty forms are [], (), set(), and {} for list, tuple, set, and dictionary respectively.",
                "Assignment shares an object rather than copying it. Shallow copying creates a new outer collection but retains references to its items.",
                "Tuple immutability applies to its own items. A mutable object inside a tuple can still change.",
                "All four types support len and iteration. Iterating over a dictionary yields keys. Membership in a dictionary also checks keys."
            ]
        },
        {
            "id": "details",
            "title": "Operation details",
            "bullets": [
                [
                    {
                        "text": "Lists",
                        "href": "#/notes/python/lists"
                    },
                    ": mutation, sorting, shared references, and copying."
                ],
                [
                    {
                        "text": "Tuples and unpacking",
                        "href": "#/notes/python/tuples-and-unpacking"
                    },
                    ": fixed sequences and assignment targets."
                ],
                [
                    {
                        "text": "Dictionaries",
                        "href": "#/notes/python/dictionaries-sets-and-generators"
                    },
                    ": key lookup, views, updates, and merging."
                ],
                [
                    {
                        "text": "Sets",
                        "href": "#/notes/python/sets"
                    },
                    ": unique members and set operations."
                ]
            ]
        },
        {
            "id": "references",
            "title": "References",
            "bullets": [
                [
                    {
                        "text": "Python tutorial: data structures",
                        "href": "https://docs.python.org/3/tutorial/datastructures.html"
                    }
                ]
            ]
        }
    ]
};

export default note;
