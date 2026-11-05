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
            "title": "Creating strings",
            "bullets": [
                "Single and double quotes create strings.",
                "Use the other quote style or an escape to include a quote.",
                "\\n represents a newline.",
                "\\t represents a tab.",
                "\\\\ represents one backslash.",
                "Triple quotes allow text across multiple lines.",
                "They create strings, not comments.",
                "A string is an immutable sequence of Unicode characters."
            ],
            "examples": [
                {
                    "title": "Quotes, escapes, and multiple lines",
                    "code": "message = 'Python is \"cool\"'\npath = \"C:\\\\notes\"\nlines = \"\"\"Line one\nLine two\"\"\"\nprint(message)\nprint(path)\nprint(lines)",
                    "result": "Python is \"cool\"\nC:\\notes\nLine one\nLine two",
                    "language": "python",
                    "description": [
                        "The strings contain quotation marks, a backslash, and multiple lines."
                    ]
                }
            ]
        },
        {
            "id": "indexing-slicing",
            "title": "Indexing and slicing",
            "bullets": [
                "An index selects one character.",
                "Index 0 is first; -1 is last.",
                "An out-of-range index raises `IndexError`.",
                "`text[start:stop:step]` selects characters from `start` toward `stop`. The `stop` position is excluded.",
                "An omitted `step` defaults to `1`. Positive steps move forward; negative steps move backward. A step of `0` raises `ValueError`.",
                "With a positive step, an omitted `start` defaults to `0`, and an omitted `stop` defaults to `len(text)`.",
                "With a negative step, an omitted `start` defaults to the last character. An omitted `stop` means the boundary before the first character, so index `0` can be included.",
                "The default bounds depend on the step direction. An omitted backward `stop` is not the same as writing `-1`, which selects the last character as the excluded stopping position.",
                "Slice bounds are clipped to the available text."
            ],
            "examples": [
                {
                    "title": "Reading parts of a string",
                    "code": "word = \"Python\"\nprint(word[0], word[-1])\nprint(word[:])\nprint(word[1:4])\nprint(word[::2])\nprint(word[::-1])\nprint(repr(word[:-1:-1]))",
                    "result": "P n\nPython\nyth\nPto\nnohtyP\n''",
                    "language": "python",
                    "description": [
                        "Indexes select individual characters, and slices select parts of the text."
                    ],
                    "explanation": [
                        "`word[:]` omits all three values. Here `start` is `0`, `stop` is `len(word)` (`6`), and `step` is `1`. It behaves like `word[0:6:1]` and returns the whole string.",
                        "`word[1:4]` reads indexes `1`, `2`, and `3`. Index `4` is excluded.",
                        "`word[::2]` uses `start=0` and `stop=6`. The step of `2` selects indexes `0`, `2`, and `4`.",
                        "`word[::-1]` starts at index `5` and moves backward past index `0`. The omitted stop allows the whole string to be reversed.",
                        "`word[:-1:-1]` starts at the last character but also stops before that same character. The result is empty. `repr` displays it as `''`."
                    ]
                }
            ]
        },
        {
            "id": "operations",
            "title": "Combining and searching text",
            "bullets": [
                "`+` joins strings.",
                "`*` repeats a string.",
                "`in` checks whether text occurs within another string.",
                "Strings are immutable: their characters cannot be changed after creation.",
                "To replace a character, create a new string from the replacement text and the parts you want to keep. The original string stays unchanged."
            ],
            "examples": [
                {
                    "title": "Building a new string",
                    "code": "word = \"Python\"\nchanged = \"J\" + word[1:]\nprint(changed, word)\nprint(\"Py\" in word)",
                    "result": "Jython Python\nTrue",
                    "explanation": [
                        "word still refers to the original string."
                    ],
                    "language": "python",
                    "description": [
                        "A new prefix combines with a slice of the original string."
                    ]
                }
            ]
        },
        {
            "id": "formatted-strings",
            "title": "Formatted strings",
            "bullets": [
                "Prefix a string with `f` to evaluate expressions inside braces.",
                "A format after : controls how a value appears."
            ],
            "examples": [
                {
                    "title": "Inserting values and formatting decimals",
                    "code": "name = \"Ada\"\nprice = 12.5\nprint(f\"{name}: {price:.2f}\")\nprint(f\"2 + 3 = {2 + 3}\")",
                    "result": "Ada: 12.50\n2 + 3 = 5",
                    "language": "python",
                    "description": [
                        "The formatted strings insert values and limit a price to two decimal places."
                    ]
                }
            ]
        },
        {
            "id": "methods",
            "title": "Commonly used string methods",
            "bullets": [
                "A method is an operation called through a value, such as `text.upper()`.",
                "String methods do not change the original string.",
                "Methods that transform text return a new string value.",
                "`len`(text) is a built-in function, called without a dot.",
                "It counts Unicode code points: `len`(\"Python\") returns 6.",
                "A visible character can contain several code points.",
                "`split` returns a list.",
                "join accepts strings from a collection.",
                "Read Lists for collection operations."
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
                        "`upper()`",
                        "Convert letters to uppercase.",
                        "`\"Ada\".upper()`",
                        "`\"ADA\"`"
                    ],
                    [
                        "`lower()`",
                        "Convert letters to lowercase.",
                        "`\"Ada\".lower()`",
                        "`\"ada\"`"
                    ],
                    [
                        "`title()`",
                        "Capitalize words and lowercase their remaining letters.",
                        "`\"ada lovelace\".title()`",
                        "`\"Ada Lovelace\"`"
                    ],
                    [
                        "`strip()`",
                        "Remove leading and trailing whitespace.",
                        "`\"  Ada  \".strip()`",
                        "`\"Ada\"`"
                    ],
                    [
                        "`lstrip() / rstrip()`",
                        "Remove whitespace from the left `/` right end.",
                        "`\"  Ada  \".lstrip()`",
                        "`\"Ada  \"`"
                    ],
                    [
                        "`replace(old, new)`",
                        "Replace all occurrences by default.",
                        "`\"banana\".replace(\"a\", \"o\")`",
                        "`\"bonono\"`"
                    ],
                    [
                        "`find(text)`",
                        "Return the first matching index, or -1 if absent.",
                        "`\"Python\".find(\"th\")`",
                        "`2`"
                    ],
                    [
                        "`index(text)`",
                        "Return the first matching index; raise `ValueError` if absent.",
                        "`\"Python\".index(\"th\")`",
                        "`2`"
                    ],
                    [
                        "`count(text)`",
                        "Count non-overlapping occurrences.",
                        "`\"banana\".count(\"an\")`",
                        "`2`"
                    ],
                    [
                        "`startswith(text)`",
                        "Check whether the string starts with text.",
                        "`\"Python\".startswith(\"Py\")`",
                        "`True`"
                    ],
                    [
                        "`endswith(text)`",
                        "Check whether the string ends with text.",
                        "`\"notes.py\".endswith(\".py\")`",
                        "`True`"
                    ],
                    [
                        "`split(separator)`",
                        "Split into a list. With no separator, split on whitespace.",
                        "`\"a,b,c\".split(\",\")`",
                        "`[\"a\", \"b\", \"c\"]`"
                    ],
                    [
                        "`separator.join(parts)`",
                        "Join strings using a separator.",
                        "`\"-\".join([\"a\", \"b\"])`",
                        "`\"a-b\"`"
                    ],
                    [
                        "`isalpha()`",
                        "Check for non-empty text containing only letters.",
                        "`\"Ada\".isalpha()`",
                        "`True`"
                    ],
                    [
                        "`isdigit()`",
                        "Check for non-empty text containing only digit characters.",
                        "`\"123\".isdigit()`",
                        "`True`"
                    ],
                    [
                        "`isalnum()`",
                        "Check for non-empty text containing only letters or numeric characters.",
                        "`\"Ada123\".isalnum()`",
                        "`True`"
                    ]
                ]
            },
            "examples": [
                {
                    "title": "Cleaning and searching text",
                    "code": "name = \"  Ada Lovelace  \"\nclean = name.strip()\nprint(clean.upper())\nprint(clean.find(\"Love\"))\nprint(clean.replace(\"Ada\", \"A.\"))",
                    "result": "ADA LOVELACE\n4\nA. Lovelace",
                    "language": "python",
                    "description": [
                        "The calls trim whitespace, change letter case, find text, and replace text."
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
                        "text": "Python tutorial: strings",
                        "href": "https://docs.python.org/3/tutorial/introduction.html#strings"
                    }
                ]
            ]
        }
    ]
};

export default note;
