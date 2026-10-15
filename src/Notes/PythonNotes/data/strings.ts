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
                "A string is an immutable sequence of Unicode characters. len returns its length."
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
                    "code": "word = \"Python\"\nchanged = \"J\" + word[1:]\nprint(changed, word)\nprint(\"Py\" in word, len(word))",
                    "result": "Jython Python\nTrue 6",
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
            "title": "String methods",
            "bullets": [
                "A method is an operation called through a value, such as text.upper().",
                "upper, lower, and title return transformed strings. strip removes leading and trailing whitespace by default. replace returns text with replacements.",
                "find returns the first matching index, or -1 when absent. index raises ValueError when absent.",
                "split returns a list of parts. separator.join(parts) combines strings from a collection. Read Lists for collection operations."
            ],
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
