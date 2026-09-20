/* Copied from the Panic & Recover page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-8021-8e5c-c9f30520bd77",
    "slug": "panic-recover",
    "title": "Panic & Recover",
    "updatedOn": "2026-01-23",
    "blocks": [
        {
            "id": "24124eb1-ed54-806d-8a7d-d43149513b35",
            "type": "bulleted_list",
            "richText": [
                [
                    "panic",
                    [
                        [
                            "b"
                        ],
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ": Immediately stops normal execution and begins "
                ],
                [
                    "stack unwinding",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " (like throwing an exception)."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-805e-9a44-d1b9a40ee37e",
            "type": "bulleted_list",
            "richText": [
                [
                    "recover",
                    [
                        [
                            "b"
                        ],
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ": Regains control during a panic, but only "
                ],
                [
                    "within a ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "defer",
                    [
                        [
                            "b"
                        ],
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " function",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8095-a4b6-dafe37cec235",
            "type": "text",
            "richText": [
                [
                    "Together, they allow "
                ],
                [
                    "controlled failure handling",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80e1-bb31-f827f63ab72d",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-8031-8ebb-fe9095026629",
            "type": "sub_header",
            "richText": [
                [
                    "When to user?"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80b0-9ed9-eab2ee0e1d85",
            "type": "table",
            "children": [
                {
                    "id": "24124eb1-ed54-80f4-b384-c6d096b16ddb",
                    "type": "table_row",
                    "cells": {
                        "O[Xu": [
                            [
                                "Feature"
                            ]
                        ],
                        "KgN}": [
                            [
                                "Use When…"
                            ]
                        ]
                    }
                },
                {
                    "id": "24124eb1-ed54-8053-bf33-fd692e089943",
                    "type": "table_row",
                    "cells": {
                        "O[Xu": [
                            [
                                "panic",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "KgN}": [
                            [
                                "- unrecoverable error (e.g., out of bounds, nil pointer) - programmer bug or critical failure"
                            ]
                        ]
                    }
                },
                {
                    "id": "24124eb1-ed54-8000-86ed-d2bae084fbdd",
                    "type": "table_row",
                    "cells": {
                        "O[Xu": [
                            [
                                "recover",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "KgN}": [
                            [
                                "- want to gracefully handle a panic and prevent the program from crashing (e.g., in servers, middleware)"
                            ]
                        ]
                    }
                }
            ],
            "columnOrder": [
                "O[Xu",
                "KgN}"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false
        },
        {
            "id": "24124eb1-ed54-80df-8703-d51c1c42228a",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-801d-b709-e9a591c7470f",
            "type": "sub_header",
            "richText": [
                [
                    "Panic"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8047-a017-e018e4062123",
            "type": "bulleted_list",
            "richText": [
                [
                    "Function signature",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ": "
                ],
                [
                    "panic(v interface{})",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80ec-9164-fefdc59e4231",
            "type": "bulleted_list",
            "richText": [
                [
                    "Effect",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ":"
                ]
            ],
            "children": [
                {
                    "id": "24124eb1-ed54-809c-b65d-d070bb7e5edf",
                    "type": "numbered_list",
                    "richText": [
                        [
                            "Stops function execution."
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-8054-85f6-e88bf63a1365",
                    "type": "numbered_list",
                    "richText": [
                        [
                            "Anu code after the panic line is never executed."
                        ]
                    ]
                },
                {
                    "id": "24124eb1-ed54-807f-a14a-cb495a1993e4",
                    "type": "numbered_list",
                    "richText": [
                        [
                            "Runs any "
                        ],
                        [
                            "defer",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ],
                        [
                            " statements."
                        ]
                    ]
                },
                {
                    "id": "24124eb1-ed54-803e-8e03-ebe479e50d0e",
                    "type": "numbered_list",
                    "richText": [
                        [
                            "Propagates panic up the call stack."
                        ]
                    ]
                },
                {
                    "id": "24124eb1-ed54-8065-964b-cd409f7cf011",
                    "type": "numbered_list",
                    "richText": [
                        [
                            "Crashes the program "
                        ],
                        [
                            "if not recovered",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            "."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24124eb1-ed54-803f-bffa-d65a742e3e53",
            "type": "code",
            "richText": [
                [
                    "func main() {\n    panic(\"something went wrong\")\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-80a8-b05e-fd696c8935f8",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-8005-996b-c9f37d24de6b",
            "type": "sub_header",
            "richText": [
                [
                    "Recover"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80ba-90b4-dfa483557c22",
            "type": "bulleted_list",
            "richText": [
                [
                    "Function signature",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ": "
                ],
                [
                    "recover() interface{}",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8053-8ede-e3b0c9cd4ad1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Must be "
                ],
                [
                    "called inside a deferred function",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " to catch the panic."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8005-8e88-fe3f6d67ad68",
            "type": "bulleted_list",
            "richText": [
                [
                    "If called outside "
                ],
                [
                    "defer",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", it returns "
                ],
                [
                    "nil",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " and does nothing."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80a5-bbf3-d8117d4fdd57",
            "type": "code",
            "richText": [
                [
                    "func safe() {\n    defer func() {\n        if r := recover(); r != nil {\n            fmt.Println(\"Recovered from:\", r)\n        }\n    }()\n    panic(\"fail\")\n}\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-8003-8e72-d4f3aac05849",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-8055-b0ed-facdf0508673",
            "type": "sub_header",
            "richText": [
                [
                    "Combined Flow"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8098-a777-f11c026fef96",
            "type": "code",
            "richText": [
                [
                    "func main() {\n    fmt.Println(\"Start\")\n    safe()\n    fmt.Println(\"End\")\n}\n\nfunc safe() {\n    defer func() {\n        if r := recover(); r != nil {\n            fmt.Println(\"Recovered from:\", r)\n        }\n    }()\n    panic(\"fail\") // recovered, program continues\n}\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-80d5-a064-fd70e2da63bf",
            "type": "text",
            "richText": [
                [
                    "Output:",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8001-bdf7-febe6fc6d9b0",
            "type": "code",
            "richText": [
                [
                    "Start\nRecovered from: fail\nEnd"
                ]
            ],
            "language": "Plain Text"
        },
        {
            "id": "24124eb1-ed54-80b5-ba14-c31185c0c908",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-80f1-a41a-e75627862eaf",
            "type": "sub_header",
            "richText": [
                [
                    "Do not forget"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8063-b991-ff4cebc74b6e",
            "type": "bulleted_list",
            "richText": [
                [
                    "panic",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " "
                ],
                [
                    "executes all defers",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " before propagating."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80da-9993-f8fc6e6d0314",
            "type": "bulleted_list",
            "richText": [
                [
                    "recover",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " "
                ],
                [
                    "only works inside deferred functions",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "24a24eb1-ed54-80b0-9711-c081be56f598",
            "type": "bulleted_list",
            "richText": [
                [
                    "If no "
                ],
                [
                    "recover",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is present, panic will "
                ],
                [
                    "crash the program",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8080-b41e-f16d848840ad",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    "panic",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " for "
                ],
                [
                    "bugs",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " or "
                ],
                [
                    "non-recoverable errors",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "not for flow control",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "24a24eb1-ed54-8050-96cd-f8cb41c0d742",
            "type": "bulleted_list",
            "richText": [
                [
                    "recover()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " returns:"
                ]
            ],
            "children": [
                {
                    "id": "24124eb1-ed54-80b9-9ccd-eea395b14976",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "The panic value (if one exists)"
                        ]
                    ]
                },
                {
                    "id": "24124eb1-ed54-80ac-8e62-c40f71836386",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "nil",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ],
                        [
                            " otherwise"
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24124eb1-ed54-80e9-a906-f3e0dd7e7521",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-8089-9106-cf81ec206b5f",
            "type": "sub_header",
            "richText": [
                [
                    "Examples"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-800c-aab2-c8876cec07f8",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Catch unexpected bugs in a server:"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80ef-bd51-e1556a687c2b",
            "type": "code",
            "richText": [
                [
                    "func handler() {\n    defer func() {\n        if r := recover(); r != nil {\n            log.Println(\"Recovered:\", r)\n        }\n    }()\n    potentiallyDangerousCode()\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-80e1-adeb-de2e8ca4830c",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Validating input:"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80cf-8ea2-f321c6297a14",
            "type": "code",
            "richText": [
                [
                    "func mustNonNil(ptr *int) {\n    if ptr == nil {\n        panic(\"nil pointer not allowed\")\n    }\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-8038-a438-c7193d1040d6",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-8085-a7a2-fa2af8795c4e",
            "type": "sub_header",
            "richText": [
                [
                    "Internal Working"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8015-b3a0-f8a9b682aef4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Panic causes "
                ],
                [
                    "stack unwinding",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ": deferred calls execute in "
                ],
                [
                    "LIFO",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " order."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8040-b5c3-dd6472096af5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Once recovered, execution resumes "
                ],
                [
                    "after the ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "defer",
                    [
                        [
                            "b"
                        ],
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " block",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-809e-934a-f223c3418e3d",
            "type": "bulleted_list",
            "richText": [
                [
                    "You can "
                ],
                [
                    "re-panic",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " by calling "
                ],
                [
                    "panic(r)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " again inside the deferred function."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-809e-aa13-c4ceb22a8ff5",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-80a5-9890-c19cac009df0",
            "type": "sub_header",
            "richText": [
                [
                    "Bad practice"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8076-ae16-fa534a36bafd",
            "type": "bulleted_list",
            "richText": [
                [
                    "Don’t use panic/recover for regular error handling",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8094-9b1e-e82e028ea376",
            "type": "bulleted_list",
            "richText": [
                [
                    "Prefer "
                ],
                [
                    "error",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " values for expected failures."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8014-945e-e03c1c3680ec",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    "panic",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " sparingly—only for truly exceptional cases."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8051-adc6-ca7b69c9605a",
            "type": "divider"
        },
        {
            "id": "2f124eb1-ed54-807a-990c-d6b115193d0d",
            "type": "bulleted_list",
            "richText": [
                [
                    "defer",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " statements are "
                ],
                [
                    "registered only when execution reaches them",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8043-a3c5-ff2d8e566b98",
            "type": "bulleted_list",
            "richText": [
                [
                    "A panic "
                ],
                [
                    "immediately stops normal execution",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8036-b82c-da2767f76e6f",
            "type": "bulleted_list",
            "richText": [
                [
                    "Code "
                ],
                [
                    "after the panic line is never reached",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-80eb-b142-c12df737ade4",
            "type": "bulleted_list",
            "richText": [
                [
                    "So, whatever it be, normal lines or "
                ],
                [
                    "defer",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " statements, nothing is gonna execute after the panic. The "
                ],
                [
                    "defer",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " statements defined before are gonna execute, as they got registered."
                ]
            ]
        }
    ]
} as const satisfies GoNote;

export default note;
