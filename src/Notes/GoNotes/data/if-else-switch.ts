/* Focused Go study notes, refined from the imported source. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24924eb1-ed54-805c-8a49-e5cca2e4740b",
    "slug": "if-else-switch",
    "title": "If, else & switch",
    "updatedOn": "2026-10-05",
    "blocks": [
        {
            "id": "365ea839-3574-5072-940b-89c4078a4b2c",
            "type": "bulleted_list",
            "richText": [
                [
                    "if",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " checks a condition that is true or false."
                ]
            ]
        },
        {
            "id": "e992803e-de83-52f6-9629-a14ca673e238",
            "type": "bulleted_list",
            "richText": [
                [
                    "switch",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " chooses a case that matches a value or condition."
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
                    "if length := len(\"Go\"); length > 1 {\n    fmt.Println(length) // 2\n}\n// length can be used only inside this if and its else branch."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Go stops the switch after running the matched case."
                ]
            ]
        },
        {
            "id": "873f3b93-2c4e-5c49-9335-bd676215266d",
            "type": "bulleted_list",
            "richText": [
                [
                    "You do not need "
                ],
                [
                    "break",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " at the end of that case."
                ]
            ]
        },
        {
            "id": "67e670f2-9614-5c0a-bdf5-debf62ed4f86",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    "fallthrough",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " to run the next case without checking its condition."
                ]
            ]
        },
        {
            "id": "72749dbb-90d1-5b1f-aa4b-de21463a8ad0",
            "type": "bulleted_list",
            "richText": [
                [
                    "The "
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
                    " case runs when no other case matches."
                ]
            ]
        },
        {
            "id": "128ac620-fead-5ea1-aafd-d674bf9a60c2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Without a value after "
                ],
                [
                    "switch",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", Go uses "
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
                    "."
                ]
            ]
        },
        {
            "id": "4b33a7ca-394b-5d4b-9f08-b2a3825ba8a3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Each case can check a true-or-false condition."
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
