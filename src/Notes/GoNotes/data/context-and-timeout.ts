/* Go study notes, refined from the original Notion import. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-804f-9003-d174de99397f",
    "slug": "context-and-timeout",
    "title": "Context and Timeout",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "edcec9f3-ae36-5427-ac4a-86e1f7f798ed",
            "type": "text",
            "richText": [
                [
                    "A "
                ],
                [
                    "context.Context",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " carries cancellation, a deadline, and request-scoped values across API boundaries. Cancellation is cooperative: an operation must check the signal or call an API that observes it."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-802a-8049-ee6ce6d1cc17",
            "type": "sub_header",
            "richText": [
                [
                    "Context Methods"
                ]
            ]
        },
        {
            "id": "3fbff375-bd56-5b9f-b18b-fd02edbfc61b",
            "type": "table",
            "columnOrder": [
                "column-0",
                "column-1"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false,
            "children": [
                {
                    "id": "a64ce9d1-7613-598b-93ed-8c7968e98bf7",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Method"
                            ]
                        ],
                        "column-1": [
                            [
                                "Meaning"
                            ]
                        ]
                    }
                },
                {
                    "id": "b97a6db7-431b-5964-b161-a9fa95451217",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Deadline()",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "column-1": [
                            [
                                "Return the deadline and whether one exists."
                            ]
                        ]
                    }
                },
                {
                    "id": "7c32c7b7-f37c-5732-8f19-6b5127aaf6e0",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Done()",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "column-1": [
                            [
                                "Return a channel that closes on cancellation; it may be nil for a context that cannot be cancelled."
                            ]
                        ]
                    }
                },
                {
                    "id": "2e5b3070-a4dd-5154-a538-692f40238d41",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Err()",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "column-1": [
                            [
                                "Return nil before cancellation, then "
                            ],
                            [
                                "context.Canceled",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ],
                            [
                                " or "
                            ],
                            [
                                "context.DeadlineExceeded",
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
                    }
                },
                {
                    "id": "870c64fc-6b8a-5129-bdc2-a2fcc6b7834a",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Value(key)",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "column-1": [
                            [
                                "Look up request-scoped data."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "24724eb1-ed54-8091-bd20-d97f3cd8c84a",
            "type": "sub_header",
            "richText": [
                [
                    "Creating Contexts"
                ]
            ]
        },
        {
            "id": "983e9fbe-0e44-507d-91b3-f56045f4b673",
            "type": "table",
            "columnOrder": [
                "column-0",
                "column-1"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false,
            "children": [
                {
                    "id": "72cf5f26-3ae4-5e10-9afc-7d29bc0a90d9",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Constructor"
                            ]
                        ],
                        "column-1": [
                            [
                                "Use"
                            ]
                        ]
                    }
                },
                {
                    "id": "fb908da8-c351-5ff0-8a30-b5025137cf46",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Background()",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "column-1": [
                            [
                                "Start a top-level operation with no cancellation or values."
                            ]
                        ]
                    }
                },
                {
                    "id": "47f8ea33-5aeb-5204-a1d9-ef54cee09248",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "TODO()",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "column-1": [
                            [
                                "Temporary placeholder when the appropriate context is not yet available."
                            ]
                        ]
                    }
                },
                {
                    "id": "0dbfa7a0-7620-5c90-b19a-667fa613ab58",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "WithCancel(parent)",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "column-1": [
                            [
                                "Derive a context with an explicit cancellation function."
                            ]
                        ]
                    }
                },
                {
                    "id": "65d54081-1a3a-5a65-baeb-5eae17534adf",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "WithTimeout(parent, duration)",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "column-1": [
                            [
                                "Derive a context with a relative deadline."
                            ]
                        ]
                    }
                },
                {
                    "id": "03ec337f-808a-5f9e-932d-61ea7645b263",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "WithDeadline(parent, time)",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "column-1": [
                            [
                                "Derive a context with an absolute deadline."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "ff3c49b7-1265-534f-b2d8-eb92ad629a99",
            "type": "text",
            "richText": [
                [
                    "Parent cancellation reaches derived contexts. Cancelling a child does not cancel its parent. A child cannot extend an earlier parent deadline. Call the returned cancel function when the operation ends to release resources, even if the deadline will eventually expire."
                ]
            ]
        },
        {
            "id": "d1e1c51c-52d5-5b6e-a434-0e2e8fc9272f",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport (\n    \"context\"\n    \"fmt\"\n)\n\nfunc main() {\n    parent, cancelParent := context.WithCancel(context.Background())\n    defer cancelParent()\n    child, cancelChild := context.WithCancel(parent)\n    defer cancelChild()\n\n    cancelParent()\n    <-child.Done()\n    fmt.Println(child.Err())\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "6960ba08-0c44-5572-99f8-9c9d5a7c2849",
            "type": "text",
            "richText": [
                [
                    "Expected output: context canceled. Waiting for "
                ],
                [
                    "Done",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " observes the cancellation signal; it does not wait for all workers using the context to finish."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-804b-b045-f56a5d117533",
            "type": "sub_header",
            "richText": [
                [
                    "Timeout-Aware Work and Send"
                ]
            ]
        },
        {
            "id": "2edf5a50-4d30-591f-b848-baa1a0a5a08d",
            "type": "text",
            "richText": [
                [
                    "Timing out only the receiver leaves a producer blocked if it later sends to an unbuffered channel. This example lets the producer exit both during its simulated wait and while sending its result. A completion channel lets the caller wait for that exit."
                ]
            ]
        },
        {
            "id": "0ad07e3d-7c65-52fc-8882-73d6cc03fabb",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport (\n    \"context\"\n    \"fmt\"\n    \"time\"\n)\n\nfunc delayedResult(ctx context.Context) (<-chan string, <-chan struct{}) {\n    results := make(chan string)\n    stopped := make(chan struct{})\n    go func() {\n        defer close(stopped)\n        defer close(results)\n        timer := time.NewTimer(2 * time.Second)\n        defer timer.Stop()\n\n        select {\n        case <-ctx.Done():\n            return\n        case <-timer.C:\n        }\n\n        select {\n        case <-ctx.Done():\n            return\n        case results <- \"done\":\n        }\n    }()\n    return results, stopped\n}\n\nfunc main() {\n    ctx, cancel := context.WithTimeout(context.Background(), time.Second)\n    defer cancel()\n    results, stopped := delayedResult(ctx)\n\n    select {\n    case <-ctx.Done():\n        fmt.Println(\"timed out:\", ctx.Err())\n    case result, ok := <-results:\n        if ok {\n            fmt.Println(result)\n        } else {\n            fmt.Println(\"stopped:\", ctx.Err())\n        }\n    }\n    cancel()\n    <-stopped\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "907c07fb-ea1e-5a7f-9a59-4b7683a7c1f3",
            "type": "text",
            "richText": [
                [
                    "Normally the one-second deadline ends the two-second wait. If cancellation and channel closure are both ready, the caller may print timed out or stopped, followed by context deadline exceeded. Severe scheduling delays can change which event is observed first; the example promises an exit path, not a fixed timing transcript."
                ]
            ]
        },
        {
            "id": "b45b2f20-70fd-59c5-bbc1-d6d292fdfd70",
            "type": "text",
            "richText": [
                [
                    "The second "
                ],
                [
                    "select",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " also prevents a blocked send when a caller stops receiving. Checking "
                ],
                [
                    "ctx.Err()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " once before an ordinary blocking send is insufficient: cancellation can happen after the check."
                ]
            ]
        },
        {
            "id": "82b84db2-f382-5c88-a907-61308ff910f0",
            "type": "sub_header",
            "richText": [
                [
                    "Cancellable Receive"
                ]
            ]
        },
        {
            "id": "46bf5168-20d4-5f6f-9ea2-b1a37b650e15",
            "type": "text",
            "richText": [
                [
                    "This helper returns on cancellation, a received value, or channel closure. It does not start a goroutine or own the producer; the caller must also arrange producer shutdown if it abandons the input."
                ]
            ]
        },
        {
            "id": "61577e3e-730b-504a-8569-fb4a4621406f",
            "type": "code",
            "richText": [
                [
                    "// Package-level helper; requires import \"context\".\nfunc receive(ctx context.Context, input <-chan int) (int, bool, error) {\n    select {\n    case <-ctx.Done():\n        return 0, false, ctx.Err()\n    case value, ok := <-input:\n        return value, ok, nil\n    }\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "dc8ca252-f536-5379-b007-232ce4c567f2",
            "type": "text",
            "richText": [
                [
                    "When both cases are ready, either may be chosen. Cancellation does not automatically take priority over a value."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80df-9dd8-d1f391da8643",
            "type": "sub_header",
            "richText": [
                [
                    "Request-Scoped Values"
                ]
            ]
        },
        {
            "id": "b8661d50-1f53-5935-832c-d858faaf5f19",
            "type": "text",
            "richText": [
                [
                    "Use context values for request metadata that crosses API boundaries, such as an authenticated user ID. Keep required business inputs and configuration as explicit parameters. A private key type avoids collisions with other packages."
                ]
            ]
        },
        {
            "id": "60630bf8-9e85-5c40-8ab8-0f7a834cf93b",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport (\n    \"context\"\n    \"fmt\"\n)\n\ntype userIDKey struct{}\n\nfunc withUserID(ctx context.Context, id int) context.Context {\n    return context.WithValue(ctx, userIDKey{}, id)\n}\n\nfunc userID(ctx context.Context) (int, bool) {\n    id, ok := ctx.Value(userIDKey{}).(int)\n    return id, ok\n}\n\nfunc main() {\n    ctx := withUserID(context.Background(), 42)\n    id, ok := userID(ctx)\n    fmt.Println(id, ok)\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "37c0b3cb-85e9-56ef-860e-c96cf544f291",
            "type": "text",
            "richText": [
                [
                    "Expected output: 42 true. The accessor makes the type assertion and missing-value case explicit."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-804f-98d0-caee5bedbfc7",
            "type": "sub_header",
            "richText": [
                [
                    "Passing Context and Stopping Work"
                ]
            ]
        },
        {
            "id": "c6be61c5-3f64-53a9-ba25-b721a3483f3f",
            "type": "bulleted_list",
            "richText": [
                [
                    "Pass "
                ],
                [
                    "ctx",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " as the first parameter to functions that need it. Prefer a per-operation context over storing one in a long-lived struct."
                ]
            ]
        },
        {
            "id": "e69643c2-dbf3-55af-9718-74ac16b84c3c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Pass the caller’s context into context-aware HTTP or database APIs. Starting a new Background context inside those operations discards the caller’s cancellation."
                ]
            ]
        },
        {
            "id": "bfebeed7-7dbc-5be9-88d2-f7f57410c885",
            "type": "bulleted_list",
            "richText": [
                [
                    "Do not pass nil. Use "
                ],
                [
                    "TODO",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " only while the appropriate context is unresolved."
                ]
            ]
        },
        {
            "id": "b17f2548-93f7-54e0-84e2-7b4a1c984e6b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Check cancellation at useful points in long computation. A context does not interrupt an arbitrary function, a mutex lock, or "
                ],
                [
                    "time.Sleep",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " by itself."
                ]
            ]
        },
        {
            "id": "7c286fb4-8b47-5655-aa66-d690d45cf134",
            "type": "bulleted_list",
            "richText": [
                [
                    "Cancellation and joining are separate. Use a WaitGroup or completion channel when the caller must wait for cleanup."
                ]
            ]
        },
        {
            "id": "a2f8d37e-1f5e-5ead-9ade-d5f9155267af",
            "type": "text",
            "richText": [
                [
                    "Related notes: "
                ],
                [
                    "Select",
                    [
                        [
                            "a",
                            "#/notes/go/select"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "WaitGroup",
                    [
                        [
                            "a",
                            "#/notes/go/workgroups"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "Date & Time",
                    [
                        [
                            "a",
                            "#/notes/go/date-time"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "6701a4ef-21a4-547e-872a-f868067d5111",
            "type": "text",
            "richText": [
                [
                    "Sources: "
                ],
                [
                    "Context API",
                    [
                        [
                            "a",
                            "https://pkg.go.dev/context"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "Context propagation",
                    [
                        [
                            "a",
                            "https://go.dev/blog/context"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "Contexts and structs",
                    [
                        [
                            "a",
                            "https://go.dev/blog/context-and-structs"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "Pipeline cancellation",
                    [
                        [
                            "a",
                            "https://go.dev/blog/pipelines"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        }
    ]
} as const satisfies GoNote;

export default note;
