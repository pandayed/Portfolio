import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "files-and-json",
    "title": "Files and JSON",
    "summary": "Read and write text files, close them with with, and save structured values as JSON.",
    "updatedOn": "2026-10-15",
    "exampleLayout": "grouped",
    "sections": [
        {
            "id": "text-files",
            "title": "Reading and writing text files",
            "bullets": [
                "open returns a file object.",
                "A relative path starts from the current working directory.",
                "Use mode \"r\" to read, \"w\" to write, and \"a\" to append.",
                "Mode \"w\" creates a file or replaces its existing contents.",
                "Use encoding=\"utf-8\" for text.",
                "Binary modes such as \"rb\" read bytes instead of strings.",
                "A with block closes the file when the block ends, including when an exception leaves the block.",
                "`read()` returns the remaining text.",
                "Iterating over a text file reads it line by line."
            ],
            "examples": [
                {
                    "title": "Writing two lines, then reading them",
                    "description": [
                        "Run in a directory where you can create `names.txt`.",
                        "This replaces an existing file with that name."
                    ],
                    "code": "with open(\"names.txt\", \"w\", encoding=\"utf-8\") as file:\n    file.write(\"Ada\\nLin\\n\")\n\nwith open(\"names.txt\", \"r\", encoding=\"utf-8\") as file:\n    for line in file:\n        print(line.rstrip(\"\\n\"))",
                    "result": "Ada\nLin",
                    "explanation": [
                        "write does not add a newline automatically.",
                        "The string supplies each newline.",
                        "rstrip removes the line ending before print adds its own newline."
                    ]
                }
            ]
        },
        {
            "id": "json",
            "title": "Saving structured data as JSON",
            "bullets": [
                "JSON is a text format for exchanging structured data.",
                "Import json from the standard library.",
                "`json.dump` writes a value to a file. `json.load` reads a value from a file.",
                "`json.dumps` returns a JSON string. `json.loads` reads a JSON string.",
                "JSON supports objects, arrays, strings, numbers, true, false, and null.",
                "Python uses dictionaries, lists, strings, numbers, `True`, `False`, and `None` for these values.",
                "Use string dictionary keys for JSON objects.",
                "Tuples become JSON arrays and load back as lists.",
                "Sets and arbitrary class instances need explicit conversion."
            ],
            "examples": [
                {
                    "title": "Saving and loading a settings dictionary",
                    "description": [
                        "Run in a directory where you can create `settings.json`.",
                        "This replaces an existing file with that name."
                    ],
                    "code": "import json\n\nsettings = {\"theme\": \"dark\", \"enabled\": True}\nwith open(\"settings.json\", \"w\", encoding=\"utf-8\") as file:\n    json.dump(settings, file, indent=2)\n\nwith open(\"settings.json\", encoding=\"utf-8\") as file:\n    loaded = json.load(file)\n\nprint(loaded[\"theme\"])\nprint(loaded[\"enabled\"])",
                    "result": "dark\nTrue",
                    "explanation": [
                        "The file contains JSON true.",
                        "Loading it produces the Python Boolean `True`."
                    ]
                }
            ]
        },
        {
            "id": "failures",
            "title": "Handling failures at the caller",
            "bullets": [
                [
                    "Related note: ",
                    {
                        "text": "Exceptions",
                        "href": "#/notes/python/exceptions"
                    },
                    "."
                ],
                [
                    "Related note: ",
                    {
                        "text": "Context managers and with",
                        "href": "#/notes/python/context-managers"
                    },
                    "."
                ],
                "Reading a missing file raises `FileNotFoundError`.",
                "Other file operations can raise `OSError` subclasses.",
                "Invalid JSON raises `json.JSONDecodeError`.",
                "Handle the errors you can recover from rather than hiding every exception."
            ]
        },
        {
            "id": "references",
            "title": "References",
            "bullets": [
                [
                    {
                        "text": "Python input and output tutorial",
                        "href": "https://docs.python.org/3/tutorial/inputoutput.html"
                    }
                ]
            ]
        }
    ]
};

export default note;
