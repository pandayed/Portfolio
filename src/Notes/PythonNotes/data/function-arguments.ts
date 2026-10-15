import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "function-arguments",
    "title": "Function arguments",
    "summary": "Pass positional and keyword arguments, set defaults, and collect or unpack arguments.",
    "updatedOn": "2026-10-15",
    "exampleLayout": "grouped",
    "sections": [
        {
            "id": "arguments",
            "title": "Positional, keyword, and default arguments",
            "bullets": [
                "Python matches positional arguments by position. A keyword argument names its parameter.",
                "A default supplies a value when the caller omits that argument.",
                "A required positional parameter cannot follow a positional parameter with a default.",
                "An argument cannot supply the same parameter twice."
            ],
            "examples": [
                {
                    "title": "Choosing how to pass arguments",
                    "code": "def full_name(first, last=\"Pandey\"):\n    return f\"{first} {last}\"\n\nprint(full_name(\"Lal\"))\nprint(full_name(last=\"George\", first=\"Ayushi\"))",
                    "result": "Lal Pandey\nAyushi George"
                }
            ]
        },
        {
            "id": "parameter-kinds",
            "title": "Positional-only and keyword-only parameters",
            "bullets": [
                "Parameters before / are positional-only. Callers must supply them by position.",
                "Parameters after * are keyword-only. Callers must name them.",
                "Parameters between / and * accept either form."
            ],
            "examples": [
                {
                    "title": "Making call requirements explicit",
                    "code": "def describe(name, /, greeting=\"Hello\", *, punctuation=\"!\"):\n    return f\"{greeting}, {name}{punctuation}\"\n\nprint(describe(\"Ava\", greeting=\"Hi\", punctuation=\".\"))",
                    "result": "Hi, Ava.",
                    "explanation": [
                        "name must be positional. punctuation must be named.",
                        "greeting accepts either a positional or a keyword argument."
                    ]
                }
            ]
        },
        {
            "id": "mutable-default-arguments",
            "title": "Defaults are evaluated once",
            "bullets": [
                "Python evaluates a default when it executes the function definition.",
                "Calls that omit the argument reuse that same object. Mutable defaults can retain changes across calls.",
                "Use None as the default when an omitted argument should create a fresh collection."
            ],
            "examples": [
                {
                    "title": "A default list keeps earlier changes",
                    "code": "def collect(items=[]):\n    items.append(1)\n    return items\n\nprint(collect())\nprint(collect())",
                    "result": "[1]\n[1, 1]"
                },
                {
                    "title": "Creating a fresh list when the argument is omitted",
                    "code": "def collect(items=None):\n    if items is None:\n        items = []\n    items.append(1)\n    return items\n\nprint(collect())\nprint(collect())",
                    "result": "[1]\n[1]",
                    "explanation": [
                        "A caller that passes a list still has that list changed by append()."
                    ]
                }
            ]
        },
        {
            "id": "args-kwargs",
            "title": "args and kwargs",
            "bullets": [
                "In a definition, *args collects extra positional arguments into a tuple. **kwargs collects extra keyword arguments into a dictionary.",
                "args and kwargs are conventional names. The * and ** determine the behavior.",
                "In a call, * unpacks an iterable into positional arguments. ** unpacks a mapping into keyword arguments."
            ],
            "examples": [
                {
                    "title": "Collecting extra arguments",
                    "code": "def add(*numbers):\n    return sum(numbers)\n\ndef print_name(**parts):\n    print(parts[\"first\"], parts[\"last\"])\n\nprint(add(1, 2, 3, 4))\nprint_name(first=\"Lal\", last=\"Pandey\")",
                    "result": "10\nLal Pandey"
                }
            ]
        },
        {
            "id": "references",
            "title": "Tutorial reference",
            "bullets": [
                [
                    {
                        "text": "Python tutorial: More on defining functions",
                        "href": "https://docs.python.org/3/tutorial/controlflow.html#more-on-defining-functions"
                    }
                ]
            ]
        }
    ]
};

export default note;
