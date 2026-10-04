/* Go study notes, refined from the original Notion import. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-8077-ac46-f5730db152f5",
    "slug": "goroutines",
    "title": "Goroutines",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "670dd769-c4c6-5cc0-8459-8b0493a1de12",
            "type": "text",
            "richText": [
                [
                    "A goroutine runs a function concurrently with other goroutines in the same program. The Go runtime schedules goroutines on OS threads. Concurrency does not guarantee simultaneous execution on multiple CPUs."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8037-b7a3-fe0e62f26fbf",
            "type": "sub_header",
            "richText": [
                [
                    "Launching a Goroutine"
                ]
            ]
        },
        {
            "id": "196f8bb1-1e9e-542d-880a-20b51d3a770f",
            "type": "text",
            "richText": [
                [
                    "The "
                ],
                [
                    "go",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " statement starts a function call and lets the caller continue. Arguments are evaluated in the calling goroutine before the new goroutine starts."
                ]
            ]
        },
        {
            "id": "bb25639d-f1b4-5f9a-9d35-7534e8dd0bde",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport \"fmt\"\n\nfunc main() {\n    done := make(chan struct{})\n    go func(message string) {\n        fmt.Println(message)\n        close(done)\n    }(\"worker finished\")\n\n    <-done\n    fmt.Println(\"main finished\")\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "b5c9157a-18db-59b2-9f66-aef1c94b6598",
            "type": "text",
            "richText": [
                [
                    "Expected output: worker finished, then main finished. The receive waits for the worker to close "
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
                    ". Without that wait, "
                ],
                [
                    "main",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " could return before the worker prints."
                ]
            ]
        },
        {
            "id": "a59e8772-a5a2-5a36-839e-103e51e15c2c",
            "type": "sub_header",
            "richText": [
                [
                    "Lifetime and Shared State"
                ]
            ]
        },
        {
            "id": "0480fb61-2032-5118-83e6-ac39706d6afc",
            "type": "bulleted_list",
            "richText": [
                [
                    "Returning from "
                ],
                [
                    "main",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " ends the program. Go does not wait for other goroutines or run their deferred cleanup as part of that exit."
                ]
            ]
        },
        {
            "id": "d972ce26-ef21-5a73-b57e-fbb4e3f34259",
            "type": "bulleted_list",
            "richText": [
                [
                    "Plan both completion and cancellation when starting a goroutine. A goroutine waiting forever can retain its stack and referenced data."
                ]
            ]
        },
        {
            "id": "a70dba3a-143c-5bb3-9795-39f5ba9786df",
            "type": "bulleted_list",
            "richText": [
                [
                    "Goroutines share memory. Protect concurrent reads and writes with synchronization or transfer ownership through a channel."
                ]
            ]
        },
        {
            "id": "7c10a8dc-5f0f-50c4-a92f-f2939fa1edb0",
            "type": "bulleted_list",
            "richText": [
                [
                    "Goroutines use resources. Their number and memory cost depend on the workload; there is no general promise that launching millions is appropriate."
                ]
            ]
        },
        {
            "id": "5d7637e5-4ff8-590a-b818-e460468803a1",
            "type": "text",
            "richText": [
                [
                    "Related notes: "
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
                    "Channels",
                    [
                        [
                            "a",
                            "#/notes/go/channels"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "Mutex",
                    [
                        [
                            "a",
                            "#/notes/go/mutex"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "Context and Timeout",
                    [
                        [
                            "a",
                            "#/notes/go/context-and-timeout"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8066-a1df-ed2d305a58b1",
            "type": "sub_header",
            "richText": [
                [
                    "Loop Variables and Concurrent Calls"
                ]
            ]
        },
        {
            "id": "16f70b5f-f1b3-5386-a8c8-64bb1fbee649",
            "type": "text",
            "richText": [
                [
                    "With Go 1.22+ language semantics, loop variables declared with "
                ],
                [
                    ":=",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " have a separate variable for each iteration. Older language versions reuse that variable. Assignment to an existing variable with "
                ],
                [
                    "=",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " still shares it. Concurrent access to a shared loop variable can cause a data race."
                ]
            ]
        },
        {
            "id": "6f272514-1959-59ae-a431-2af93e0a0b21",
            "type": "text",
            "richText": [
                [
                    "This example passes the value as an argument. It also works with older language versions and waits for every print:"
                ]
            ]
        },
        {
            "id": "111c33bd-9aa6-540e-b034-b478d83b7ecf",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n)\n\nfunc main() {\n    var wg sync.WaitGroup\n    for i := 1; i <= 3; i++ {\n        wg.Add(1)\n        go func(value int) {\n            defer wg.Done()\n            fmt.Println(value)\n        }(i)\n    }\n    wg.Wait()\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "210f3c8a-c13a-5cf6-9b27-7e3f61fabfd5",
            "type": "text",
            "richText": [
                [
                    "The program prints 1, 2 and 3 once each. Their order is unspecified."
                ]
            ]
        },
        {
            "id": "a870ca67-d7d0-5290-ba2e-cd8cd9da288e",
            "type": "text",
            "richText": [
                [
                    "Captured-variable rules: "
                ],
                [
                    "Closures",
                    [
                        [
                            "a",
                            "#/notes/go/closures"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "c706b668-04cd-5c46-b8e2-809bdb5a59d3",
            "type": "text",
            "richText": [
                [
                    "Sources: "
                ],
                [
                    "Go statements",
                    [
                        [
                            "a",
                            "https://go.dev/ref/spec#Go_statements"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "Program execution",
                    [
                        [
                            "a",
                            "https://go.dev/ref/spec#Program_execution"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "Go 1.22 loop-variable change",
                    [
                        [
                            "a",
                            "https://go.dev/blog/loopvar-preview"
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
