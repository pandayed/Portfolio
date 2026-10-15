import type { PythonNote } from '../types';

const note: PythonNote = {
    "slug": "conditionals",
    "title": "Conditionals",
    "summary": "Compare values, understand truth values, and choose which block runs.",
    "exampleLayout": "grouped",
    "updatedOn": "2026-10-15",
    "sections": [
        {
            "id": "comparisons",
            "title": "Comparisons",
            "bullets": [
                "== compares values. != means not equal. <, <=, >, and >= compare ordering where the types support it.",
                "A comparison usually produces True or False. Do not confuse assignment = with comparison ==.",
                "Chain comparisons to state a range, such as 10 < score < 20.",
                "Use is None and is not None for absence checks. is checks object identity, rather than value equality."
            ],
            "examples": [
                {
                    "title": "Comparing values",
                    "code": "score = 15\nprint(score == 15)\nprint(10 < score < 20)\nprint(\"15\" == 15)",
                    "result": "True\nTrue\nFalse",
                    "explanation": [
                        "A string and an integer are different values."
                    ]
                }
            ]
        },
        {
            "id": "truthiness",
            "title": "Truthy and falsy values",
            "bullets": [
                "Conditions do not need an explicit comparison. Python checks the truth value of the supplied object.",
                "False, None, numeric zero, empty strings, and empty collections are falsy. Most other values are truthy.",
                "bool(value) returns the Boolean truth value. A non-empty string is truthy even if its text is \"False\" or \"0\".",
                "Custom classes can define truth behavior. Their methods are covered in the object-model chapter."
            ],
            "examples": [
                {
                    "title": "Checking whether text is present",
                    "code": "name = \"\"\nif name:\n    print(\"Name supplied\")\nelse:\n    print(\"Name missing\")\nprint(bool(\"False\"))",
                    "result": "Name missing\nTrue"
                }
            ]
        },
        {
            "id": "if-elif-else",
            "title": "if, elif, and else",
            "bullets": [
                "if runs its block when a condition is truthy. elif checks another condition when earlier branches did not match.",
                "else runs when no earlier condition matches. elif and else are optional.",
                "Python runs only the first matching branch in one if/elif/else chain. Put a more specific condition before a broader one.",
                "End a branch header with a colon. Indent its block by four spaces. pass can serve as a statement that does nothing when a block needs a placeholder."
            ],
            "examples": [
                {
                    "title": "Choosing one age group",
                    "code": "age = 46\nif age >= 45:\n    print(\"45 or older\")\nelif age >= 18:\n    print(\"Adult\")\nelse:\n    print(\"Under 18\")",
                    "result": "45 or older",
                    "explanation": [
                        "The first condition matches, so the later branches are skipped."
                    ]
                }
            ]
        },
        {
            "id": "boolean-operators",
            "title": "Combining conditions",
            "bullets": [
                "and evaluates its right operand only if the left operand is truthy. or evaluates its right operand only if the left operand is falsy. This is short-circuit evaluation.",
                "not returns the opposite Boolean truth value.",
                "and and or return an operand, which may not be a Boolean. Use parentheses to make mixed conditions clear."
            ],
            "examples": [
                {
                    "title": "Combining checks and choosing a fallback",
                    "code": "age = 20\nhas_ticket = True\nprint(age >= 18 and has_ticket)\nprint(not has_ticket)\nname = \"\"\nprint(name or \"Guest\")",
                    "result": "True\nFalse\nGuest"
                }
            ]
        },
        {
            "id": "conditional-expression",
            "title": "Choosing between two values",
            "bullets": [
                "value_if_true if condition else value_if_false evaluates one of two expressions.",
                "Use an if statement when a branch needs multiple steps."
            ],
            "examples": [
                {
                    "title": "Storing a selected message",
                    "code": "age = 20\nmessage = \"Eligible\" if age >= 18 else \"Not eligible\"\nprint(message)",
                    "result": "Eligible"
                }
            ]
        },
        {
            "id": "references",
            "title": "References",
            "bullets": [
                [
                    {
                        "text": "Python tutorial: if statements",
                        "href": "https://docs.python.org/3/tutorial/controlflow.html#if-statements"
                    }
                ]
            ]
        }
    ]
};

export default note;
