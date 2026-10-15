import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "strings",
    "title": "Strings",
    "summary": "Create text, read characters and slices, and format or transform strings.",
    "exampleLayout": "grouped",
    "updatedOn": "2026-10-15",
    "sections": [
        {
            "id": "literals-escapes",
            "title": "Create strings",
            "bullets": [
                "Single and double quotes create strings. Use the other quote style or an escape to include a quote.",
                "\\n represents a newline. \\t represents a tab. \\\\ represents one backslash.",
                "Triple quotes allow text across multiple lines. They create strings, not comments.",
                "A string is an immutable sequence of Unicode characters."
            ],
            "examples": [
                {
                    "title": "Quotes, escapes, and multiple lines",
                    "code": "message = 'Python is \"cool\"'\npath = \"C:\\\\notes\"\nlines = \"\"\"Line one\nLine two\"\"\"\nprint(message)\nprint(path)\nprint(lines)",
                    "result": "Python is \"cool\"\nC:\\notes\nLine one\nLine two"
                }
            ]
        },
        {
            "id": "indexing-slicing",
            "title": "Indexing and slicing",
            "bullets": [
                "An index selects one character. Index 0 is first; -1 is last. An out-of-range index raises IndexError.",
                "text[start:stop] includes start and excludes stop. Omitted bounds use the beginning or end.",
                "A slice may include a step. Negative steps move backward. Slice bounds are clipped to the available text."
            ],
            "examples": [
                {
                    "title": "Read parts of a string",
                    "code": "word = \"Python\"\nprint(word[0], word[-1])\nprint(word[1:4])\nprint(word[::2])\nprint(word[::-1])",
                    "result": "P n\nyth\nPto\nnohtyP"
                }
            ]
        },
        {
            "id": "operations",
            "title": "Combine and search text",
            "bullets": [
                "+ joins strings. * repeats a string. in checks whether text occurs within another string.",
                "Strings cannot replace a character by index. Build a new string instead."
            ],
            "examples": [
                {
                    "title": "Build a new string",
                    "code": "word = \"Python\"\nchanged = \"J\" + word[1:]\nprint(changed, word)\nprint(\"Py\" in word)",
                    "result": "Jython Python\nTrue",
                    "explanation": [
                        "word still refers to the original string."
                    ]
                }
            ]
        },
        {
            "id": "formatted-strings",
            "title": "Formatted strings",
            "bullets": [
                "Prefix a string with f to evaluate expressions inside braces. A format after : controls how a value appears."
            ],
            "examples": [
                {
                    "title": "Insert values and format decimals",
                    "code": "name = \"Ada\"\nprice = 12.5\nprint(f\"{name}: {price:.2f}\")\nprint(f\"2 + 3 = {2 + 3}\")",
                    "result": "Ada: 12.50\n2 + 3 = 5"
                }
            ]
        },
        {
            "id": "methods",
            "title": "Commonly used string methods",
            "bullets": [
                "A method is an operation called through a value, such as text.upper().",
                "String methods do not change the original string. Methods that transform text return a new string value.",
                "len(text) is a built-in function, called without a dot. It counts Unicode code points: len(\"Python\") returns 6. A visible character can contain several code points.",
                "split returns a list. join accepts strings from a collection. Read Lists for collection operations."
            ],
            "table": {
                "columns": [
                    "Method",
                    "Purpose",
                    "Example",
                    "Result"
                ],
                "rows": [
                    [
                        "upper()",
                        "Convert letters to uppercase.",
                        "\"Ada\".upper()",
                        "\"ADA\""
                    ],
                    [
                        "lower()",
                        "Convert letters to lowercase.",
                        "\"Ada\".lower()",
                        "\"ada\""
                    ],
                    [
                        "title()",
                        "Capitalize words and lowercase their remaining letters.",
                        "\"ada lovelace\".title()",
                        "\"Ada Lovelace\""
                    ],
                    [
                        "strip()",
                        "Remove leading and trailing whitespace.",
                        "\"  Ada  \".strip()",
                        "\"Ada\""
                    ],
                    [
                        "lstrip() / rstrip()",
                        "Remove whitespace from the left / right end.",
                        "\"  Ada  \".lstrip()",
                        "\"Ada  \""
                    ],
                    [
                        "replace(old, new)",
                        "Replace all occurrences by default.",
                        "\"banana\".replace(\"a\", \"o\")",
                        "\"bonono\""
                    ],
                    [
                        "find(text)",
                        "Return the first matching index, or -1 if absent.",
                        "\"Python\".find(\"th\")",
                        "2"
                    ],
                    [
                        "index(text)",
                        "Return the first matching index; raise ValueError if absent.",
                        "\"Python\".index(\"th\")",
                        "2"
                    ],
                    [
                        "count(text)",
                        "Count non-overlapping occurrences.",
                        "\"banana\".count(\"an\")",
                        "2"
                    ],
                    [
                        "startswith(text)",
                        "Check whether the string starts with text.",
                        "\"Python\".startswith(\"Py\")",
                        "True"
                    ],
                    [
                        "endswith(text)",
                        "Check whether the string ends with text.",
                        "\"notes.py\".endswith(\".py\")",
                        "True"
                    ],
                    [
                        "split(separator)",
                        "Split into a list. With no separator, split on whitespace.",
                        "\"a,b,c\".split(\",\")",
                        "[\"a\", \"b\", \"c\"]"
                    ],
                    [
                        "separator.join(parts)",
                        "Join strings using a separator.",
                        "\"-\".join([\"a\", \"b\"])",
                        "\"a-b\""
                    ],
                    [
                        "isalpha()",
                        "Check for non-empty text containing only letters.",
                        "\"Ada\".isalpha()",
                        "True"
                    ],
                    [
                        "isdigit()",
                        "Check for non-empty text containing only digit characters.",
                        "\"123\".isdigit()",
                        "True"
                    ],
                    [
                        "isalnum()",
                        "Check for non-empty text containing only letters or numeric characters.",
                        "\"Ada123\".isalnum()",
                        "True"
                    ]
                ]
            },
            "examples": [
                {
                    "title": "Clean and search text",
                    "code": "name = \"  Ada Lovelace  \"\nclean = name.strip()\nprint(clean.upper())\nprint(clean.find(\"Love\"))\nprint(clean.replace(\"Ada\", \"A.\"))",
                    "result": "ADA LOVELACE\n4\nA. Lovelace"
                }
            ]
        },
        {
            "id": "references",
            "title": "References",
            "bullets": [
                [
                    {
                        "text": "Python tutorial: strings",
                        "href": "https://docs.python.org/3/tutorial/introduction.html#strings"
                    }
                ]
            ]
        }
    ]
};

export default note;
