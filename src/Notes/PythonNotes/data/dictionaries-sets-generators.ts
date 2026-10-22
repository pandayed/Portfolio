import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "dictionaries-sets-and-generators",
    "title": "Dictionaries",
    "summary": "Map keys to values, handle absent keys, update records, and iterate over entries.",
    "exampleLayout": "grouped",
    "updatedOn": "2026-10-15",
    "sections": [
        {
            "id": "dictionaries",
            "title": "Creating and reading dictionaries",
            "bullets": [
                "A dictionary maps unique keys to values.",
                "Use {} for an empty dictionary.",
                "Keys must be hashable: their hash value must remain stable, and equality must agree with hashing.",
                "Strings and integers are common keys.",
                "Lists cannot be keys.",
                "A tuple can be a key only when all its items are hashable.",
                "The equality and hashing note explains the full contract.",
                "A dictionary preserves insertion order.",
                "Lookup uses a key, not an item position.",
                "Values may repeat."
            ],
            "examples": [
                {
                    "title": "Reading a named value",
                    "code": "point = {\"x\": 1, \"y\": 2}\nprint(point[\"x\"])\nprint(len(point))",
                    "result": "1\n2",
                    "language": "python",
                    "description": [
                        "The coordinate name selects its stored value."
                    ]
                }
            ]
        },
        {
            "id": "missing-keys",
            "title": "Missing keys and membership",
            "bullets": [
                "`dictionary[key]` raises `KeyError` if the key is absent.",
                "Use it when a missing key is an error.",
                "`get(key, fallback)` returns a fallback when the key is absent.",
                "The default fallback `is None`.",
                "`key in dictionary` checks keys, not values."
            ],
            "examples": [
                {
                    "title": "Handling an optional field",
                    "code": "profile = {\"name\": \"Ada\"}\nprint(profile.get(\"city\"))\nprint(profile.get(\"city\", \"Unknown\"))\nprint(\"name\" in profile)",
                    "result": "None\nUnknown\nTrue",
                    "language": "python",
                    "description": [
                        "The missing city uses either the default fallback or an explicit fallback."
                    ]
                }
            ]
        },
        {
            "id": "modify",
            "title": "Adding, replacing, and removing entries",
            "bullets": [
                "Assigning a new key adds an entry.",
                "Assigning an existing key replaces its value without moving the key.",
                "`update` copies entries from another mapping or key/value pairs.",
                "Later values replace earlier values for matching keys.",
                "`pop` removes a key `and` returns its value.",
                "Supply a default to handle absence.",
                "del removes a key and raises `KeyError` if absent.",
                "`clear` empties the dictionary."
            ],
            "examples": [
                {
                    "title": "Updating a record",
                    "code": "profile = {\"name\": \"Ada\", \"city\": \"London\"}\nprofile[\"city\"] = \"Paris\"\nprofile.update({\"active\": True})\ncity = profile.pop(\"city\")\nprint(profile)\nprint(city)",
                    "result": "{'name': 'Ada', 'active': True}\nParis",
                    "language": "python",
                    "description": [
                        "The dictionary replaces a city, adds a field, and removes the city."
                    ]
                }
            ]
        },
        {
            "id": "iteration",
            "title": "Iterating over keys and values",
            "bullets": [
                "Iterating directly over a dictionary supplies keys.",
                "`values()` supplies values.",
                "`items()` supplies key/value pairs.",
                "`keys()`, `values()`, and `items()` return views that reflect later dictionary changes.",
                "Do not add or delete keys while iterating over the dictionary.",
                "Iterate over a copy when the key set must change."
            ],
            "examples": [
                {
                    "title": "Unpacking each key/value pair",
                    "code": "scores = {\"Ada\": 90, \"Grace\": 95}\nfor name, score in scores.items():\n    print(name, score)",
                    "result": "Ada 90\nGrace 95",
                    "language": "python",
                    "description": [
                        "Each iteration receives a name and its score."
                    ]
                }
            ]
        },
        {
            "id": "merge",
            "title": "Merging dictionaries",
            "bullets": [
                "`{**first, **second}` builds a new dictionary by expanding each mapping.",
                "Later values win for duplicate keys.",
                "On Python 3.9 and later, `first | second` also merges dictionaries.",
                "`first |= second` updates the first dictionary."
            ],
            "examples": [
                {
                    "title": "Overriding a default value",
                    "code": "defaults = {\"color\": \"blue\", \"size\": 10}\noverrides = {\"size\": 20}\ncombined = {**defaults, **overrides}\nprint(combined)",
                    "result": "{'color': 'blue', 'size': 20}",
                    "language": "python",
                    "description": [
                        "The second mapping replaces the default size in a new dictionary."
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
                        "text": "Python tutorial: dictionaries",
                        "href": "https://docs.python.org/3/tutorial/datastructures.html#dictionaries"
                    }
                ]
            ]
        }
    ]
};

export default note;
