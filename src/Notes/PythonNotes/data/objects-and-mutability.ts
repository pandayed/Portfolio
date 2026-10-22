import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "objects-and-mutability",
    "title": "Object identity and mutability",
    "summary": "Compare values and identity, follow shared references, and distinguish mutation from rebinding.",
    "updatedOn": "2026-10-15",
    "exampleLayout": "grouped",
    "sections": [
        {
            "id": "equality-identity",
            "title": "Equality and identity",
            "examples": [
                {
                    "title": "Comparing equal lists and shared references",
                    "description": [
                        "Compare two separate lists with two names for the same list."
                    ],
                    "code": "a = [1, 2]\nb = [1, 2]\nsame_list = a\nprint(a == b)        # True: equal items\nprint(a is b)        # False: two list objects\nprint(a is same_list)  # True: one list object\n\nmissing = None\nprint(missing is None)  # True",
                    "result": "True\nFalse\nTrue\nTrue",
                    "language": "python"
                }
            ],
            "bullets": [
                "`==` asks whether two objects have equal values.",
                "For lists, it compares their items.",
                "is asks whether two names refer to the exact same object.",
                "Use `==` to compare values.",
                "Use `is` for identity checks, most often `x is None` or `x is not None`.",
                "Do not use `is` to compare strings or numbers: Python may reuse some objects, so identity is not a reliable value comparison.",
                "A class can define what `==` means for its objects.",
                "`is` always checks object identity.",
                "id returns an identity value that is unique while an object exists.",
                "It is not a permanent memory address; its meaning depends on the Python implementation."
            ]
        },
        {
            "id": "identity-mutability",
            "title": "Mutable and immutable objects",
            "bullets": [
                "A mutable object can change in place after it is created.",
                "An immutable object cannot change in place.",
                "A name can still be assigned to a different object; that is rebinding the name, not changing the old object.",
                "Mutable examples: list, dictionary, and set.",
                "Their contents can change through methods or item assignment.",
                "Immutable examples: `int`, `float`, `bool`, `str`, tuple, and `frozenset`.",
                "An operation that appears to change one produces or reuses another object instead.",
                "A tuple cannot replace its items.",
                "If an item is a mutable object, such as a list, that object can still change."
            ],
            "examples": [
                {
                    "title": "Changing an object versus rebinding a name",
                    "code": "items = [1, 2]\nother_name = items\nitems.append(3)\nprint(other_name)  # [1, 2, 3]\n\ntext = \"hi\"\nold_text = text\ntext += \"!\"\nprint(old_text)  # hi\nprint(text)      # hi!",
                    "result": "[1, 2, 3]\nhi\nhi!",
                    "explanation": [
                        "The list changed in place, so `other_name` sees the change. text names a new string; `old_text` still names the original string."
                    ],
                    "language": "python",
                    "description": [
                        "A shared list changes in place, while adding to a string rebinds its name."
                    ]
                },
                {
                    "title": "An immutable tuple with a mutable item",
                    "code": "record = ([\"a\"], 1)\nrecord[0].append(\"b\")\nprint(record)  # (['a', 'b'], 1)",
                    "result": "(['a', 'b'], 1)",
                    "explanation": [
                        "The tuple still contains the same list object.",
                        "That list can change."
                    ],
                    "language": "python",
                    "description": [
                        "The tuple retains the same list while that list changes."
                    ]
                }
            ]
        },
        {
            "id": "shallow-deep-copy",
            "title": "Nested lists and deep copying",
            "bullets": [
                "A shallow copy shares nested mutable objects.",
                "Changing a shared nested list affects both outer lists.",
                "`copy.deepcopy` recursively copies nested objects and tracks objects already copied.",
                "It supports independent nested lists in ordinary data structures.",
                "Deep copying does not make every kind of object independent.",
                "Some objects are reused, and classes can customize copying."
            ],
            "examples": [
                {
                    "title": "Comparing shallow and deep copies",
                    "code": "import copy\n\noriginal = [[1, 2], [3]]\nshallow = original.copy()\ndeep = copy.deepcopy(original)\noriginal[0].append(4)\nprint(shallow)\nprint(deep)",
                    "result": "[[1, 2, 4], [3]]\n[[1, 2], [3]]",
                    "language": "python",
                    "description": [
                        "A nested mutation reveals which copied lists still share inner objects."
                    ]
                }
            ]
        }
    ]
};

export default note;
