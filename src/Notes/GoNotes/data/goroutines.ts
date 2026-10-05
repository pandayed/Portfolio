/* Go study notes, refined from the original Notion import. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-8077-ac46-f5730db152f5",
    "slug": "goroutines",
    "title": "Goroutines",
    "updatedOn": "2026-10-05",
    "blocks": [
        {
            "id": "670dd769-c4c6-5cc0-8459-8b0493a1de12",
            "type": "bulleted_list",
            "richText": [
                [
                    "A goroutine runs a function independently of the caller."
                ]
            ]
        },
        {
            "id": "0e471899-9086-5449-83ef-73daeca42c02",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go manages goroutines and runs them on operating-system (OS) threads."
                ]
            ]
        },
        {
            "id": "a3816b26-5ac1-5610-bc85-a7b3e89ac084",
            "type": "bulleted_list",
            "richText": [
                [
                    "Concurrency means tasks can make progress during the same period. They do not always run at the same instant on different CPUs."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Put "
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
                    " before a function call to start a goroutine."
                ]
            ]
        },
        {
            "id": "33e3ed51-11e1-568c-8b80-2994e6438679",
            "type": "bulleted_list",
            "richText": [
                [
                    "The caller continues without waiting for that function to finish."
                ]
            ]
        },
        {
            "id": "ca28106c-662f-5e46-81dd-63a22812bd0d",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go evaluates the arguments in the caller before starting the goroutine."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Output: worker finished, then main finished."
                ]
            ]
        },
        {
            "id": "de4e63d1-ea21-5f10-a4ce-e865d4e39243",
            "type": "bulleted_list",
            "richText": [
                [
                    "<-done",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " waits for the worker to close "
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
                    "."
                ]
            ]
        },
        {
            "id": "a97a3693-450c-52d7-bc8d-c5509bbb1e1a",
            "type": "bulleted_list",
            "richText": [
                [
                    "Without this wait, "
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
                    "When "
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
                    " returns, the program ends."
                ]
            ]
        },
        {
            "id": "58886dfc-bcea-588c-8c7f-2e860a9bcb73",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go does not wait for other goroutines or run their deferred cleanup during program exit."
                ]
            ]
        },
        {
            "id": "d972ce26-ef21-5a73-b57e-fbb4e3f34259",
            "type": "bulleted_list",
            "richText": [
                [
                    "Decide how each goroutine finishes and how it stops when its work is no longer needed."
                ]
            ]
        },
        {
            "id": "a876503a-2f7d-5a1c-8f80-ab8c67caf517",
            "type": "bulleted_list",
            "richText": [
                [
                    "A goroutine that waits forever can keep its stack and the data it uses in memory."
                ]
            ]
        },
        {
            "id": "a70dba3a-143c-5bb3-9795-39f5ba9786df",
            "type": "bulleted_list",
            "richText": [
                [
                    "Goroutines share the program’s memory."
                ]
            ]
        },
        {
            "id": "e7b2ac75-02be-5737-b9c9-9c9d332ee7fd",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use locks to protect shared reads and writes, or let one goroutine own the data and communicate through channels."
                ]
            ]
        },
        {
            "id": "7c10a8dc-5f0f-50c4-a92f-f2939fa1edb0",
            "type": "bulleted_list",
            "richText": [
                [
                    "Each goroutine uses memory and runtime resources."
                ]
            ]
        },
        {
            "id": "92d77d00-4bcb-55db-b224-3217cfc4a184",
            "type": "bulleted_list",
            "richText": [
                [
                    "Check the workload before launching very large numbers of goroutines."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Go 1.22+ language rules give each iteration its own loop variables when the loop declares them with "
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
                    "."
                ]
            ]
        },
        {
            "id": "c5f11aab-50b8-532d-9b4b-e29e102dcde3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Older Go language versions reuse the same loop variables."
                ]
            ]
        },
        {
            "id": "6a782a78-be5b-5ded-96b4-0c7aa8ce3fbe",
            "type": "bulleted_list",
            "richText": [
                [
                    "A loop that assigns to existing variables with "
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
                    " still shares those variables."
                ]
            ]
        },
        {
            "id": "78f1301e-1b1e-5f53-ba0d-b08b5bdccdf6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Concurrent reads and writes to a shared loop variable can cause a data race."
                ]
            ]
        },
        {
            "id": "6f272514-1959-59ae-a431-2af93e0a0b21",
            "type": "bulleted_list",
            "richText": [
                [
                    "Passing the loop value as an argument also works with older Go versions."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Prints 1, 2 and 3 once each."
                ]
            ]
        },
        {
            "id": "c149cafc-07f6-58b9-a9c5-604016a643c0",
            "type": "bulleted_list",
            "richText": [
                [
                    "The order can change between runs."
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
