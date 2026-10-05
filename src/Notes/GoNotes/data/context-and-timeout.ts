/* Go study notes, refined from the original Notion import. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-804f-9003-d174de99397f",
    "slug": "context-and-timeout",
    "title": "Context and Timeout",
    "updatedOn": "2026-10-05",
    "blocks": [
        {
            "id": "edcec9f3-ae36-5427-ac4a-86e1f7f798ed",
            "type": "bulleted_list",
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
                    " carries a cancellation signal, a deadline and request-scoped values."
                ]
            ]
        },
        {
            "id": "c5911ac6-6a7d-513c-8c08-f36c8dc0cfa2",
            "type": "bulleted_list",
            "richText": [
                [
                    "A deadline is the time when an operation should stop."
                ]
            ]
        },
        {
            "id": "0f004ce5-9afb-552d-9f8b-a2cb8e1d097d",
            "type": "bulleted_list",
            "richText": [
                [
                    "Request-scoped values belong to one request, such as its authenticated user ID."
                ]
            ]
        },
        {
            "id": "15ab9ea9-2431-5028-9237-fead1e19813c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Pass the context between functions that take part in the same operation."
                ]
            ]
        },
        {
            "id": "7a80d980-6e25-5f0e-80c3-1f1ea54d55db",
            "type": "bulleted_list",
            "richText": [
                [
                    "The work must check cancellation or use an API that checks it. The signal does not force work to stop."
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
                                "Return the deadline and a boolean that says whether one exists."
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
                                "A channel that closes on cancellation. It can be nil when the context cannot be cancelled."
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
                                "Nil before cancellation. Then "
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
                                "Find request-scoped data for this key."
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
                                "Start top-level work with no cancellation or values."
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
                                "Use while deciding which context to pass."
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
                                "Create a child context and a cancel function."
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
                                "Create a child context with a deadline after this duration."
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
                                "Create a child context with a deadline at this time."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "ff3c49b7-1265-534f-b2d8-eb92ad629a99",
            "type": "bulleted_list",
            "richText": [
                [
                    "Cancelling a parent also cancels its child contexts."
                ]
            ]
        },
        {
            "id": "22667e35-8341-59c9-af04-a75b43685e43",
            "type": "bulleted_list",
            "richText": [
                [
                    "Cancelling a child does not cancel its parent."
                ]
            ]
        },
        {
            "id": "0f9dce5e-2a49-5648-abb9-0d26a7f31cc8",
            "type": "bulleted_list",
            "richText": [
                [
                    "A child cannot extend an earlier parent deadline."
                ]
            ]
        },
        {
            "id": "47af76d7-2fef-5939-9e19-d7b77c7daefd",
            "type": "bulleted_list",
            "richText": [
                [
                    "Call the returned cancel function when the operation ends to release its resources."
                ]
            ]
        },
        {
            "id": "e79433be-0d23-567e-b149-29a1db4c6da4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Do this even when a deadline would cancel it later."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Output: context canceled."
                ]
            ]
        },
        {
            "id": "c4d03241-be9b-50eb-a755-547e55d50a44",
            "type": "bulleted_list",
            "richText": [
                [
                    "Done",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " tells you that cancellation has been signalled."
                ]
            ]
        },
        {
            "id": "c73f2052-0605-54ba-be69-dabcd8b3dacf",
            "type": "bulleted_list",
            "richText": [
                [
                    "It does not tell you that every worker has finished."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "If only the receiver times out, the producer may later wait forever while sending."
                ]
            ]
        },
        {
            "id": "2b8be8f8-a364-5e92-b767-6ec829040315",
            "type": "bulleted_list",
            "richText": [
                [
                    "The producer below checks cancellation while waiting and while sending."
                ]
            ]
        },
        {
            "id": "fe6be5d5-86fd-5b56-910a-0b821683c45c",
            "type": "bulleted_list",
            "richText": [
                [
                    "It closes "
                ],
                [
                    "stopped",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " when it exits. The caller waits for that signal."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "The context timeout is one second. The work timer waits two seconds."
                ]
            ]
        },
        {
            "id": "2418c875-3f33-57d8-af35-47d47de62d50",
            "type": "bulleted_list",
            "richText": [
                [
                    "The usual output is timed out: context deadline exceeded or stopped: context deadline exceeded."
                ]
            ]
        },
        {
            "id": "f7f12ffc-8118-5909-a8f3-225c3dca155e",
            "type": "bulleted_list",
            "richText": [
                [
                    "Either cancellation or the closed results channel may be chosen when both are ready."
                ]
            ]
        },
        {
            "id": "6e2fe593-edce-58b2-91cb-dedbfa1dc390",
            "type": "bulleted_list",
            "richText": [
                [
                    "Long delays in running the goroutines can change which event happens first, so "
                ],
                [
                    "done",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " may also be printed."
                ]
            ]
        },
        {
            "id": "b45b2f20-70fd-59c5-bbc1-d6d292fdfd70",
            "type": "bulleted_list",
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
                    " lets the producer stop even if nobody receives its result."
                ]
            ]
        },
        {
            "id": "aacf2197-5b05-56df-97e0-bd73a75e8d91",
            "type": "bulleted_list",
            "richText": [
                [
                    "Checking "
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
                    " once before a normal send is not enough."
                ]
            ]
        },
        {
            "id": "84bf2476-cb86-5c25-b1e8-ff797e2f8b30",
            "type": "bulleted_list",
            "richText": [
                [
                    "Cancellation can happen after that check, while the send is still waiting."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "receive",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " returns a value, reports a closed input channel, or returns a cancellation error."
                ]
            ]
        },
        {
            "id": "9c1f1bd3-280c-5a97-8170-e101d2e460a6",
            "type": "bulleted_list",
            "richText": [
                [
                    "It does not start or stop the producer."
                ]
            ]
        },
        {
            "id": "fcd16201-0632-5c1d-80c4-3c3258d71e25",
            "type": "bulleted_list",
            "richText": [
                [
                    "If the caller stops receiving, it must arrange for the producer to stop too."
                ]
            ]
        },
        {
            "id": "61577e3e-730b-504a-8569-fb4a4621406f",
            "type": "code",
            "richText": [
                [
                    "func receive(ctx context.Context, input <-chan int) (int, bool, error) {\n    select {\n    case <-ctx.Done():\n        return 0, false, ctx.Err()\n    case value, ok := <-input:\n        return value, ok, nil\n    }\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "dc8ca252-f536-5379-b007-232ce4c567f2",
            "type": "bulleted_list",
            "richText": [
                [
                    "When a value and cancellation are both ready, either case may run."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Use context values for request data that needs to pass between APIs, such as an authenticated user ID."
                ]
            ]
        },
        {
            "id": "90c2bdff-ca34-5f39-8a4a-7ad81b98cf87",
            "type": "bulleted_list",
            "richText": [
                [
                    "Pass required business inputs and configuration as normal function arguments."
                ]
            ]
        },
        {
            "id": "9c7784d9-6f58-5cc8-8f14-536ae163280c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use a private key type so other packages do not accidentally use the same key."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Output: 42 true."
                ]
            ]
        },
        {
            "id": "c292141d-57e9-5903-b026-a574b37d093e",
            "type": "bulleted_list",
            "richText": [
                [
                    "userID",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " returns the ID and a boolean that says whether an ID was found."
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
                    " as the first argument to functions that need it."
                ]
            ]
        },
        {
            "id": "b6c36a8c-deb5-5b48-afe2-511350b58ef7",
            "type": "bulleted_list",
            "richText": [
                [
                    "Prefer a context for each operation over keeping one in a long-lived struct."
                ]
            ]
        },
        {
            "id": "e69643c2-dbf3-55af-9718-74ac16b84c3c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Pass the caller’s context to HTTP and database APIs that support context."
                ]
            ]
        },
        {
            "id": "ad410840-a05e-5098-baed-bcf28a070fb7",
            "type": "bulleted_list",
            "richText": [
                [
                    "Creating a new "
                ],
                [
                    "Background",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " context there loses the caller’s cancellation signal."
                ]
            ]
        },
        {
            "id": "bfebeed7-7dbc-5be9-88d2-f7f57410c885",
            "type": "bulleted_list",
            "richText": [
                [
                    "Do not pass a nil context."
                ]
            ]
        },
        {
            "id": "636c5793-4054-53b6-bcd5-48bee3e8f114",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
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
                    " while you have not yet decided which context should be passed."
                ]
            ]
        },
        {
            "id": "b17f2548-93f7-54e0-84e2-7b4a1c984e6b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Check cancellation during long computations."
                ]
            ]
        },
        {
            "id": "8207c15c-b246-51f0-b61f-39d8947159fd",
            "type": "bulleted_list",
            "richText": [
                [
                    "A context does not interrupt an ordinary function call, a mutex lock or "
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
                    "Sending a cancellation signal and waiting for work to finish are separate steps."
                ]
            ]
        },
        {
            "id": "a2c0f459-071e-58d9-8590-b28c5c6c628d",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use a WaitGroup or a completion channel if the caller must wait for cleanup."
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
