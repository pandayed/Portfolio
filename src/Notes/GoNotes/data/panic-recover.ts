import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-8021-8e5c-c9f30520bd77",
    "slug": "panic-recover",
    "title": "Panic & Recover",
    "updatedOn": "2026-10-05",
    "blocks": [
        {
            "id": "245bbc3a-9df3-596b-948b-619572007414",
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
                    " stops normal execution in the current goroutine."
                ]
            ]
        },
        {
            "id": "c741adfb-130f-5943-acb6-040a8e58e9a7",
            "type": "bulleted_list",
            "richText": [
                [
                    "It works back through the active function calls and runs their saved defers. This is called stack unwinding."
                ]
            ]
        },
        {
            "id": "5a43efd0-e607-5f13-853d-791dedba0ff0",
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
                    " can stop this process when called directly inside a deferred function in that goroutine."
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
                                "A broken invariant (a rule that must stay true), a programming bug or a must-style helper"
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
                                "Handle a panic and report the failure at a chosen point"
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
            "type": "bulleted_list",
            "richText": [
                [
                    "After recovery, "
                ],
                [
                    "safe",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " returns to its caller."
                ]
            ]
        },
        {
            "id": "f6c5296f-c9d6-5683-9664-a169a2a1fd7f",
            "type": "bulleted_list",
            "richText": [
                [
                    "It does not continue at the line after "
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
                    " inside "
                ],
                [
                    "safe",
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Cleanup",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " runs first because it was deferred last."
                ]
            ]
        },
        {
            "id": "8ab03e58-c0b0-57e2-b43a-8157a99139e3",
            "type": "bulleted_list",
            "richText": [
                [
                    "The recovery function handles the panic."
                ]
            ]
        },
        {
            "id": "bf8bb090-b2b9-52ff-8949-31b75a16f2b6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Any remaining defers in "
                ],
                [
                    "safe",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " finish before "
                ],
                [
                    "safe",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " returns."
                ]
            ]
        },
        {
            "id": "49e7fb0d-eace-59ff-a7d1-b3a7e18220bd",
            "type": "bulleted_list",
            "richText": [
                [
                    "An unrecovered panic terminates the program."
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
                    "recover",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " returns "
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
                    " when the goroutine is not panicking."
                ]
            ]
        },
        {
            "id": "454ea716-74dd-562f-8b91-808a87df80ab",
            "type": "bulleted_list",
            "richText": [
                [
                    "It cannot catch a panic from another goroutine."
                ]
            ]
        },
        {
            "id": "2611420b-6479-5d88-b9dd-a1fddd37a11c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Each goroutine that must handle panics needs its own deferred recovery function."
                ]
            ]
        },
        {
            "id": "0aa52a33-0772-5ebb-8537-b97dcfd5ea99",
            "type": "bulleted_list",
            "richText": [
                [
                    "Call "
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
                    " directly inside the deferred function."
                ]
            ]
        },
        {
            "id": "6b739e17-a2cf-5345-9fb3-420bb12e895b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Calling it from a helper used by that deferred function does not recover the panic."
                ]
            ]
        },
        {
            "id": "cb28d44d-38db-58ad-afce-268e5d7e88a9",
            "type": "bulleted_list",
            "richText": [
                [
                    "A bare "
                ],
                [
                    "defer recover()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " does not work either."
                ]
            ]
        },
        {
            "id": "c73b293d-6f39-5c15-9d72-2f3d38df4623",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go saves a deferred call only when execution reaches its "
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
                    " statement."
                ]
            ]
        },
        {
            "id": "f19c188f-f10f-5227-beaf-c937b73ed51a",
            "type": "bulleted_list",
            "richText": [
                [
                    "A panic does not run the later normal statements or save the later defers in that function."
                ]
            ]
        },
        {
            "id": "e17cfad8-f3ce-5b41-b128-0468582fae98",
            "type": "bulleted_list",
            "richText": [
                [
                    "Call "
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
                    " again when the recovery function cannot handle the failure."
                ]
            ]
        },
        {
            "id": "050fad10-30aa-51aa-b77f-15c731d6fc23",
            "type": "bulleted_list",
            "richText": [
                [
                    "Do not hide a panic and keep using state that may be broken."
                ]
            ]
        },
        {
            "id": "fd93554a-f99b-5cbf-bcc5-1879c5c35b60",
            "type": "bulleted_list",
            "richText": [
                [
                    "By default, Go 1.21+ turns "
                ],
                [
                    "panic(nil)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " into a non-nil "
                ],
                [
                    "*runtime.PanicNilError",
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
            "id": "e1a0bcb2-c384-566e-b225-86c64501bf1e",
            "type": "bulleted_list",
            "richText": [
                [
                    "GODEBUG=panicnil=1",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " selects the older behavior, where recovering "
                ],
                [
                    "panic(nil)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " returns "
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
                    "."
                ]
            ]
        },
        {
            "id": "91dde520-2c4d-502c-8f13-cb1984219678",
            "type": "bulleted_list",
            "richText": [
                [
                    "The older behavior may be selected automatically when the main module declares Go 1.20 or earlier."
                ]
            ]
        },
        {
            "id": "d6f696f4-6e66-53e8-ac76-65999f5872a8",
            "type": "bulleted_list",
            "richText": [
                [
                    "If you check "
                ],
                [
                    "r != nil",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", account for the Go version and this setting."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "The caller supplies the "
                ],
                [
                    "work",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " function."
                ]
            ]
        },
        {
            "id": "5d067d04-0926-5a62-97eb-3fabb6d1138f",
            "type": "bulleted_list",
            "richText": [
                [
                    "runSafely",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " logs a panic and returns."
                ]
            ]
        },
        {
            "id": "55690406-c5c6-5de4-9336-d61d71d2b288",
            "type": "bulleted_list",
            "richText": [
                [
                    "A real request handler also needs to send a response or return an error after recovery."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A must-style helper promises to panic when its required condition is not met."
                ]
            ]
        },
        {
            "id": "c0ae9b94-b303-5447-a409-a58f297f48c3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Here, passing "
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
                    " breaks that condition and is treated as a caller bug."
                ]
            ]
        },
        {
            "id": "5099a1fa-15dd-5634-a496-5e85046827a2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Return an error for normal input validation."
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
