/* Focused Go study notes, refined from the imported source. */

import type { GoNote } from '../types';

const note = {
    "notionId": "2ef24eb1-ed54-80e2-8aa2-dbdc21358c81",
    "slug": "const-iota",
    "title": "Iota & Flags",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "8e9807a2-3ebd-5634-8adf-3cdfa0349dd3",
            "type": "text",
            "richText": [
                [
                    "Prerequisite: "
                ],
                [
                    "Constants & Variables",
                    [
                        [
                            "a",
                            "#/notes/go/constants-variables"
                        ]
                    ]
                ],
                [
                    " explains const declarations and typed versus untyped constants."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-80be-acc8-f715d57ff506",
            "type": "sub_header",
            "richText": [
                [
                    "iota in Go"
                ]
            ]
        },
        {
            "id": "2bf6ad1a-d086-59a7-b45c-8d9f092bcb4e",
            "type": "text",
            "richText": [
                [
                    "Within a const declaration, "
                ],
                [
                    "iota",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is an untyped integer constant equal to the index of the current constant specification. The first specification has index 0. Each new const declaration starts again at 0."
                ]
            ]
        },
        {
            "id": "1448631b-a2d9-514a-86c5-6c350e44d19b",
            "type": "text",
            "richText": [
                [
                    "A specification is one declaration entry, rather than one physical line or one constant name. Multiple names in the same entry use the same "
                ],
                [
                    "iota",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " value."
                ]
            ]
        },
        {
            "id": "c3ad803f-c94a-5a21-8124-786e72ecab0c",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "const (\n    A, B = iota, iota // both 0: specification 0\n    C, D             // both 1: specification 1\n)\nconst E = iota // 0: a separate const declaration"
                ]
            ]
        },
        {
            "id": "fc7f4afe-aa17-5d3c-a24e-fa19e171ec7f",
            "type": "text",
            "richText": [
                [
                    "An entry without expressions repeats the preceding expression list and optional type. Those expressions are evaluated with the new specification’s "
                ],
                [
                    "iota",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " value. "
                ],
                [
                    "iota",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is not a runtime variable."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8040-aa9d-d3037b45d996",
            "type": "sub_header",
            "richText": [
                [
                    "Enum-like values"
                ]
            ]
        },
        {
            "id": "438e06b5-ab08-54b1-802a-acb532cdace2",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "type Status int\n\nconst (\n    Pending Status = iota // 0\n    Approved              // 1\n    Rejected              // 2\n)"
                ]
            ]
        },
        {
            "id": "e5361627-5442-5250-8049-4de51323cfd7",
            "type": "text",
            "richText": [
                [
                    "Named values describe states or modes. The defined type distinguishes them from ordinary int variables, but it does not restrict values to these three constants."
                ]
            ]
        },
        {
            "id": "665c04b2-4e49-5af3-8b45-2341391cd445",
            "type": "text",
            "richText": [
                [
                    "Inserting or reordering a specification can renumber later constants. Use explicit stable numbers for stored values or protocol fields when compatibility requires it."
                ]
            ]
        },
        {
            "id": "2ef24eb1-ed54-8098-afd9-c48c00b7d18a",
            "type": "sub_header",
            "richText": [
                [
                    "Skipping values"
                ]
            ]
        },
        {
            "id": "0d62b38c-9555-581e-827d-64dc6e0ff5e3",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "const (\n    _ = iota // discard 0\n    Read     // 1\n    Write    // 2\n)"
                ]
            ]
        },
        {
            "id": "503e53d7-5b36-5f3c-908b-ac18f9a5bdb0",
            "type": "text",
            "richText": [
                [
                    "The blank identifier discards a name without skipping the specification count."
                ]
            ]
        },
        {
            "id": "220d975b-8545-569f-992b-f01ca81a04cb",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Expressions with iota"
                ]
            ]
        },
        {
            "id": "7803a29f-df45-58a5-b182-5b58e55d8fd3",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "const (\n    First = iota + 1 // 1\n    Second           // 2\n    Third            // 3\n)\n\nconst (\n    _ = iota\n    KB = 1 << (10 * iota) // 1024\n    MB                    // 1048576\n    GB                    // 1073741824\n)"
                ]
            ]
        },
        {
            "id": "214803f2-33ab-5f6f-9277-61afd9b4bf40",
            "type": "sub_header",
            "richText": [
                [
                    "Bit flags"
                ]
            ]
        },
        {
            "id": "f15b2d44-9faf-55d8-8cf7-8edbbfcb558a",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "type Permission uint\n\nconst (\n    CanRead Permission = 1 << iota // 1 (001)\n    CanWrite                       // 2 (010)\n    CanExecute                     // 4 (100)\n)"
                ]
            ]
        },
        {
            "id": "0bec5d77-2de9-528d-a1bc-f511bafb0743",
            "type": "text",
            "richText": [
                [
                    "Each flag sets a different bit. Combine flags with "
                ],
                [
                    "|",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " and check a flag with "
                ],
                [
                    "&",
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
            "id": "22a5e0af-ff5d-5573-ba0e-634d4eef7320",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "permissions := CanRead | CanWrite\nfmt.Println(permissions)                  // 3\nfmt.Println(permissions&CanRead != 0)       // true\nfmt.Println(permissions&CanExecute != 0)    // false"
                ]
            ]
        },
        {
            "id": "56619fa9-4e34-5396-b0bc-a342508e78b2",
            "type": "text",
            "richText": [
                [
                    "Reference: "
                ],
                [
                    "Go specification: iota",
                    [
                        [
                            "a",
                            "https://go.dev/ref/spec#Iota"
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
