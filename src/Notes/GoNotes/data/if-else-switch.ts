/* Focused Go study notes, refined from the imported source. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24924eb1-ed54-805c-8a49-e5cca2e4740b",
    "slug": "if-else-switch",
    "title": "If, else & switch",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "365ea839-3574-5072-940b-89c4078a4b2c",
            "type": "text",
            "richText": [
                [
                    "If chooses a branch by a boolean condition. Switch chooses a matching case and ends that case automatically unless fallthrough is explicit. Each example is an independent function-body fragment with "
                ],
                [
                    "fmt",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " imported."
                ]
            ]
        },
        {
            "id": "0be2b604-ec3b-5396-843f-b8e3b0ca4ed5",
            "type": "sub_header",
            "richText": [
                [
                    "if: one condition"
                ]
            ]
        },
        {
            "id": "0e4b3d21-3d09-57b2-be37-1eae91bf1bc0",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "x := 2\nif x > 0 {\n    fmt.Println(\"Positive\")\n}\n// Output: Positive"
                ]
            ]
        },
        {
            "id": "b8f33322-12ee-55e8-8726-c130fd1c06e2",
            "type": "sub_header",
            "richText": [
                [
                    "if and else"
                ]
            ]
        },
        {
            "id": "9e2b17a5-a7f5-5ebb-a7bd-c5d4ac0bd98c",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "x := 0\nif x > 0 {\n    fmt.Println(\"Positive\")\n} else {\n    fmt.Println(\"Non-positive\")\n}\n// Output: Non-positive"
                ]
            ]
        },
        {
            "id": "c25e0429-2a00-5712-af49-302f785434d4",
            "type": "sub_header",
            "richText": [
                [
                    "else if: several conditions"
                ]
            ]
        },
        {
            "id": "e201a6c2-84ed-588e-a8ff-9d1c630dc214",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "x := -2\nif x > 0 {\n    fmt.Println(\"Positive\")\n} else if x < 0 {\n    fmt.Println(\"Negative\")\n} else {\n    fmt.Println(\"Zero\")\n}\n// Output: Negative"
                ]
            ]
        },
        {
            "id": "1168c848-b70e-5030-98f5-c92734a04941",
            "type": "sub_header",
            "richText": [
                [
                    "if with an initializer"
                ]
            ]
        },
        {
            "id": "5ef33c6c-ce85-5caf-9f9f-1a71f54a2f54",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "if length := len(\"Go\"); length > 1 {\n    fmt.Println(length) // 2\n}\n// length is scoped to this if statement, including any else branch."
                ]
            ]
        },
        {
            "id": "5c970904-c7b3-567b-96bb-c528e4749ba5",
            "type": "sub_header",
            "richText": [
                [
                    "switch"
                ]
            ]
        },
        {
            "id": "63d90210-ef6d-5646-a5c0-3c826a20c81c",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "day := \"Tue\"\nswitch day {\ncase \"Mon\":\n    fmt.Println(\"Monday\")\ncase \"Tue\":\n    fmt.Println(\"Tuesday\")\ndefault:\n    fmt.Println(\"Other day\")\n}\n// Output: Tuesday"
                ]
            ]
        },
        {
            "id": "8e7cfc23-ea22-5429-8d15-40596fa7a2e4",
            "type": "text",
            "richText": [
                [
                    "Cases do not fall through automatically, so a trailing break is unnecessary. "
                ],
                [
                    "default",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " runs if no case matches. A switch without an expression acts as "
                ],
                [
                    "switch true",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " and can use boolean conditions in its cases."
                ]
            ]
        },
        {
            "id": "aad51524-290a-5e94-9775-06adae2590fb",
            "type": "text",
            "richText": [
                [
                    "Reference: "
                ],
                [
                    "Go specification: if and switch statements",
                    [
                        [
                            "a",
                            "https://go.dev/ref/spec#If_statements"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        }
    ]
} satisfies GoNote;

export default note;
