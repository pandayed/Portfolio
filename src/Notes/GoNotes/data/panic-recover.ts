import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-8021-8e5c-c9f30520bd77",
    "slug": "panic-recover",
    "title": "Panic & Recover",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "245bbc3a-9df3-596b-948b-619572007414",
            "type": "text",
            "richText": [
                [
                    "panic stops ordinary execution in the current goroutine and unwinds its call stack, running registered deferred calls. recover can stop that unwinding when called directly by a deferred function in that goroutine."
                ]
            ]
        },
        {
            "id": "2071f57d-589d-54e5-b1b9-f5bd1a982b74",
            "type": "text",
            "richText": [
                [
                    "Registration, order and argument timing: "
                ],
                [
                    "Defer",
                    [
                        [
                            "a",
                            "#/notes/go/defer"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "966b4b81-044b-5595-a594-aeaf5e5f6233",
            "type": "sub_header",
            "richText": [
                [
                    "Choosing errors or panics"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80b0-9ed9-eab2ee0e1d85",
            "type": "table",
            "columnOrder": [
                "col-0",
                "col-1"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false,
            "children": [
                {
                    "id": "7d327627-e9c3-5e03-b465-8468915e21bb",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Mechanism"
                            ]
                        ],
                        "col-1": [
                            [
                                "Typical purpose"
                            ]
                        ]
                    }
                },
                {
                    "id": "8551e6e2-7c81-51ea-824b-7716c5b360fc",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Returned error"
                            ]
                        ],
                        "col-1": [
                            [
                                "Expected failures the caller can handle, such as invalid input or a missing file"
                            ]
                        ]
                    }
                },
                {
                    "id": "619c7012-4577-55e9-8858-0312c6da0f32",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "panic"
                            ]
                        ],
                        "col-1": [
                            [
                                "A broken invariant, programming error or an explicit must-style contract"
                            ]
                        ]
                    }
                },
                {
                    "id": "5ca6a468-5dd6-5b5c-bb37-6c99fa1bdb08",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "recover"
                            ]
                        ],
                        "col-1": [
                            [
                                "A boundary that can report or contain a panic and establish a valid outcome"
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "3efd133a-574f-5191-9a6e-926a359b43e6",
            "type": "text",
            "richText": [
                [
                    "Returned and wrapped errors: "
                ],
                [
                    "Errors",
                    [
                        [
                            "a",
                            "#/notes/go/errors"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "a7de9767-24e6-540e-b96b-117b93612844",
            "type": "sub_header",
            "richText": [
                [
                    "Recovery control flow"
                ]
            ]
        },
        {
            "id": "cebe6daf-19a6-5b30-b10c-059eb9f105aa",
            "type": "text",
            "richText": [
                [
                    "safe returns to its caller after recovery; execution never returns to the line following panic inside safe."
                ]
            ]
        },
        {
            "id": "066511f1-94b5-5272-89b8-f03725513960",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport \"fmt\"\n\nfunc safe() {\n    defer func() {\n        if r := recover(); r != nil {\n            fmt.Println(\"Recovered from:\", r)\n        }\n    }()\n\n    defer fmt.Println(\"Cleanup\")\n    panic(\"fail\")\n    // Ordinary statements and new defer statements here are not reached.\n}\n\nfunc main() {\n    fmt.Println(\"Start\")\n    safe()\n    fmt.Println(\"End\")\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "1759e5d3-21bc-5ca1-a128-a840b6ba5f11",
            "type": "text",
            "richText": [
                [
                    "Expected output:"
                ]
            ]
        },
        {
            "id": "1f5d8ccf-4abf-5326-ac16-c68263fcfdf3",
            "type": "code",
            "richText": [
                [
                    "Start\nCleanup\nRecovered from: fail\nEnd"
                ]
            ],
            "language": "Plain Text"
        },
        {
            "id": "24216aa4-a498-5c24-b735-dc53b14d30ee",
            "type": "text",
            "richText": [
                [
                    "Cleanup runs first because it was registered last. The recovery function handles the panic, remaining defers in safe finish, and safe returns. If no deferred function recovers the panic, an unrecovered panic terminates the program."
                ]
            ]
        },
        {
            "id": "100c23c0-4b74-5eb8-b6fe-4d381beeca3b",
            "type": "sub_header",
            "richText": [
                [
                    "Recovery boundaries and limits"
                ]
            ]
        },
        {
            "id": "de16cdbd-2c33-5965-b355-b4703e29fc29",
            "type": "bulleted_list",
            "richText": [
                [
                    "recover returns nil during ordinary execution. It cannot catch a panic in another goroutine. Each goroutine that needs a recovery boundary must establish its own deferred function."
                ]
            ]
        },
        {
            "id": "0aa52a33-0772-5ebb-8537-b97dcfd5ea99",
            "type": "bulleted_list",
            "richText": [
                [
                    "Call recover directly in the deferred function. A helper called by that function does not satisfy this requirement. A bare defer recover() is also ineffective."
                ]
            ]
        },
        {
            "id": "c73b293d-6f39-5c15-9d72-2f3d38df4623",
            "type": "bulleted_list",
            "richText": [
                [
                    "Only reached defer statements are registered. A panic does not execute later ordinary statements or register later defers in the panicking function."
                ]
            ]
        },
        {
            "id": "e17cfad8-f3ce-5b41-b128-0468582fae98",
            "type": "bulleted_list",
            "richText": [
                [
                    "Calling panic(r) again in the deferred function propagates the failure when the boundary cannot handle it. Do not silently recover and leave corrupted state in use."
                ]
            ]
        },
        {
            "id": "fd93554a-f99b-5cbf-bcc5-1879c5c35b60",
            "type": "text",
            "richText": [
                [
                    "Go 1.21+ default behavior turns panic(nil) into a non-nil *runtime.PanicNilError panic value. Legacy behavior can be selected with GODEBUG=panicnil=1 and may be selected automatically for a main module declaring Go 1.20 or earlier. Code using the usual r != nil check must understand this version/configuration difference."
                ]
            ]
        },
        {
            "id": "72dab2fd-2953-5323-9499-bb6382c5ded2",
            "type": "sub_header",
            "richText": [
                [
                    "Examples of a boundary and a contract"
                ]
            ]
        },
        {
            "id": "19d9c102-5f45-5b93-9f35-35b99187b242",
            "type": "text",
            "richText": [
                [
                    "The caller supplies work. This boundary reports a panic and returns; real request handlers must also define the response or error they produce."
                ]
            ]
        },
        {
            "id": "9b146835-a8e5-5a86-8651-4b8fd8266aa8",
            "type": "code",
            "richText": [
                [
                    "func runSafely(work func()) {\n    defer func() {\n        if r := recover(); r != nil {\n            log.Println(\"Recovered:\", r)\n        }\n    }()\n    work()\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "60da0d4f-1f81-5c3d-a302-227082adf78f",
            "type": "text",
            "richText": [
                [
                    "A must-style helper can document that nil is a caller programming error. For normal input validation, return an error instead."
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
            "id": "36b01e23-4fd1-50de-a930-5ae3a5e1b6c2",
            "type": "text",
            "richText": [
                [
                    "Source: "
                ],
                [
                    "Handling panics",
                    [
                        [
                            "a",
                            "https://go.dev/ref/spec#Handling_panics"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "94cb42ec-0bdf-59a2-999c-1cd29c3f26fc",
            "type": "text",
            "richText": [
                [
                    "Source: "
                ],
                [
                    "Built-in panic and recover",
                    [
                        [
                            "a",
                            "https://pkg.go.dev/builtin#recover"
                        ]
                    ]
                ]
            ]
        }
    ]
} as const satisfies GoNote;

export default note;
