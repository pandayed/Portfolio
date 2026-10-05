/* Focused Go study notes, refined from the imported source. */

import type { GoNote } from '../types';

const note = {
    "notionId": "2ef24eb1-ed54-80e2-8aa2-dbdc21358c81",
    "slug": "const-iota",
    "title": "Iota & Flags",
    "updatedOn": "2026-10-05",
    "blocks": [
        {
            "id": "8e9807a2-3ebd-5634-8adf-3cdfa0349dd3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Read "
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
                    " for const declarations and typed versus untyped constants."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Inside a "
                ],
                [
                    "const",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " declaration, "
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
                    " is an untyped integer constant."
                ]
            ]
        },
        {
            "id": "5ff4844c-5ea9-5999-ac5a-0b917e7214c6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Its value is the position of the current constant specification, starting at 0."
                ]
            ]
        },
        {
            "id": "a083a486-3163-5646-8a77-6bc246fb535c",
            "type": "bulleted_list",
            "richText": [
                [
                    "A new "
                ],
                [
                    "const",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " declaration starts the count again at 0."
                ]
            ]
        },
        {
            "id": "1448631b-a2d9-514a-86c5-6c350e44d19b",
            "type": "bulleted_list",
            "richText": [
                [
                    "A constant specification is one entry in the declaration. It can contain more than one name."
                ]
            ]
        },
        {
            "id": "43ceb550-58f6-5f9e-b079-ff1299c758a5",
            "type": "bulleted_list",
            "richText": [
                [
                    "iota",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " counts these entries. It does not count physical lines or names."
                ]
            ]
        },
        {
            "id": "7d70113c-4e0f-53da-88d5-188cd90a6ad6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Names in the same entry use the same "
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
            "type": "bulleted_list",
            "richText": [
                [
                    "If an entry leaves out its expressions, Go repeats the previous expressions and their type, if given."
                ]
            ]
        },
        {
            "id": "f625214e-2ff9-5493-9ff7-02a6bfcc6b2b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go uses the current entry’s "
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
                    " value in those expressions."
                ]
            ]
        },
        {
            "id": "05b178a9-509d-5379-b21b-aaa4931c8ac6",
            "type": "bulleted_list",
            "richText": [
                [
                    "iota",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is not a variable that you can change at runtime."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Use named constants for states or modes."
                ]
            ]
        },
        {
            "id": "2d7bb6c2-b36b-5610-a2ba-299eb61e9b41",
            "type": "bulleted_list",
            "richText": [
                [
                    "Status",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is a defined type, separate from "
                ],
                [
                    "int",
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
            "id": "aca742f3-4c92-5963-a5e2-ba5efd3a223d",
            "type": "bulleted_list",
            "richText": [
                [
                    "A "
                ],
                [
                    "Status",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " value is not limited to the three constants shown here."
                ]
            ]
        },
        {
            "id": "665c04b2-4e49-5af3-8b45-2341391cd445",
            "type": "bulleted_list",
            "richText": [
                [
                    "Adding or moving an entry can change the numbers of later constants."
                ]
            ]
        },
        {
            "id": "adbe1dfd-12f1-581a-b328-ff5cf3518ff3",
            "type": "bulleted_list",
            "richText": [
                [
                    "If stored data or a protocol depends on those numbers, give the constants fixed numbers instead."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    "_",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " to discard a value. The entry still counts toward "
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
                    "."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Each flag sets a different bit."
                ]
            ]
        },
        {
            "id": "adbcb9c2-8c42-5b58-9cbd-fbc81050ebf9",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
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
                    " to combine flags."
                ]
            ]
        },
        {
            "id": "3a20b08b-54a0-5e3b-8774-bd2fd6016be7",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
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
                    " to check whether a flag is set."
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
