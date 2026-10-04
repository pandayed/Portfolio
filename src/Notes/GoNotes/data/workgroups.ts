/* Go study notes, refined from the original Notion import. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-804e-98a7-ed95eaa0b4c2",
    "slug": "workgroups",
    "title": "WaitGroup",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "83dc4671-7caf-5b21-94b3-94555b47fede",
            "type": "text",
            "richText": [
                [
                    "A "
                ],
                [
                    "sync.WaitGroup",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " waits for a set of tasks to finish. It tracks completion; it does not carry results or prevent workers from racing with each other."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8090-b198-df32ddb32ff3",
            "type": "sub_header",
            "richText": [
                [
                    "Methods"
                ]
            ]
        },
        {
            "id": "be76ddc7-0c09-556c-b1d8-3a0700dd22ed",
            "type": "table",
            "columnOrder": [
                "column-0",
                "column-1"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false,
            "children": [
                {
                    "id": "8c6e0829-ddfb-58be-b15c-267e2e6caa8d",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Method"
                            ]
                        ],
                        "column-1": [
                            [
                                "Purpose"
                            ]
                        ]
                    }
                },
                {
                    "id": "f5fd863a-e2f7-51d3-a335-c19c3b63f454",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Add(n)",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "column-1": [
                            [
                                "Add n outstanding tasks. A negative resulting counter panics."
                            ]
                        ]
                    }
                },
                {
                    "id": "71280396-4ce0-5a9e-a635-d7beac4a0fcf",
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
                                "Complete one task; equivalent to "
                            ],
                            [
                                "Add(-1)",
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
                    "id": "7434b80d-4e2b-59d0-8722-dbd6199b116c",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Wait()",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "column-1": [
                            [
                                "Block until the outstanding task count reaches zero."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "792bc4b0-87ef-5e33-8963-2a456998b67d",
            "type": "sub_header",
            "richText": [
                [
                    "Wait for Workers"
                ]
            ]
        },
        {
            "id": "1c8ed295-5750-5959-ac16-603af36035d9",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n)\n\nfunc worker(id int, wg *sync.WaitGroup) {\n    defer wg.Done()\n    fmt.Printf(\"Worker %d starting\\n\", id)\n    fmt.Printf(\"Worker %d done\\n\", id)\n}\n\nfunc main() {\n    var wg sync.WaitGroup\n    for id := 1; id <= 3; id++ {\n        wg.Add(1)\n        go worker(id, &wg)\n    }\n    wg.Wait()\n    fmt.Println(\"All workers completed\")\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "a3a9e582-6482-5478-9eb0-85fe74a7871d",
            "type": "text",
            "richText": [
                [
                    "Each worker prints starting before done. Lines from different workers may interleave. All workers completed is always the last line."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8095-a0fe-d140b84f111d",
            "type": "sub_header",
            "richText": [
                [
                    "Rules and Pitfalls"
                ]
            ]
        },
        {
            "id": "4739eedd-f3a5-541c-98a3-fc673587548e",
            "type": "bulleted_list",
            "richText": [
                [
                    "Register a new batch before waiting. With the "
                ],
                [
                    "Add",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "/"
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
                    " pattern, call "
                ],
                [
                    "Add(1)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " before launching each goroutine so "
                ],
                [
                    "Wait",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " cannot observe zero too early."
                ]
            ]
        },
        {
            "id": "94b358b3-d29f-50f9-b856-4b214ff5d4fb",
            "type": "bulleted_list",
            "richText": [
                [
                    "Each registered task must call "
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
                    " exactly once. A missing call leaves "
                ],
                [
                    "Wait",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " blocked; an extra call can make the counter negative."
                ]
            ]
        },
        {
            "id": "bf8afe79-8106-58aa-8579-a82bf8da9e28",
            "type": "bulleted_list",
            "richText": [
                [
                    "Do not copy a WaitGroup after first use. Pass a pointer when another function needs the same group."
                ]
            ]
        },
        {
            "id": "5d0a08af-4b4c-5235-af5a-5a534bb6c5a9",
            "type": "bulleted_list",
            "richText": [
                [
                    "Reuse for a new independent batch only after all previous "
                ],
                [
                    "Wait",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " calls return."
                ]
            ]
        },
        {
            "id": "fb21349b-0305-5d24-b2b0-fdc1edf77568",
            "type": "bulleted_list",
            "richText": [
                [
                    "Wait",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " has no cancellation parameter. The tasks themselves must have exit paths; cancelling a context does not change the counter."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8042-abb6-f40eacb710fd",
            "type": "sub_header",
            "richText": [
                [
                    "Collect Results"
                ]
            ]
        },
        {
            "id": "659286dd-cb6b-588b-b466-2061d4495320",
            "type": "text",
            "richText": [
                [
                    "A channel transports results while the WaitGroup tells the closer when all senders have finished. Consume results while workers run; waiting first could deadlock with an unbuffered results channel."
                ]
            ]
        },
        {
            "id": "c6fe4e1c-d0c1-56e0-a1e1-3c2e94fc4436",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n)\n\nfunc main() {\n    results := make(chan int)\n    var wg sync.WaitGroup\n    for i := 0; i < 3; i++ {\n        wg.Add(1)\n        go func(n int) {\n            defer wg.Done()\n            results <- n * n\n        }(i)\n    }\n    go func() {\n        wg.Wait()\n        close(results)\n    }()\n\n    for result := range results {\n        fmt.Println(result)\n    }\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "c18f22c6-a64b-560a-b89d-a369f77dc466",
            "type": "text",
            "richText": [
                [
                    "The values are 0, 1 and 4, in unspecified order. The closer cannot close "
                ],
                [
                    "results",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " until every send has completed."
                ]
            ]
        },
        {
            "id": "e7a83794-c494-59d2-ae2f-29226c9913e5",
            "type": "sub_header",
            "richText": [
                [
                    "Go 1.25+ Alternative"
                ]
            ]
        },
        {
            "id": "a5a1ed69-2502-57aa-9df8-10d705c09a2e",
            "type": "text",
            "richText": [
                [
                    "Go 1.25 introduced "
                ],
                [
                    "wg.Go(f)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", which registers a task, starts its goroutine, and removes the task when "
                ],
                [
                    "f",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " returns. The function must not panic. Start the initial tasks before calling "
                ],
                [
                    "Wait",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "; do not add a separate "
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
                    " inside "
                ],
                [
                    "f",
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
            "id": "68115a6e-2aef-5f7c-8648-2cb34d16a015",
            "type": "code",
            "richText": [
                [
                    "// Go 1.25+\nvar wg sync.WaitGroup\nwg.Go(func() { fmt.Println(\"task finished\") })\nwg.Wait()"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "7f122570-0ba5-599c-aca4-34984e98ecab",
            "type": "text",
            "richText": [
                [
                    "Related notes: "
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
            "id": "b6cdda0e-e268-5edb-9b65-f1e98a042414",
            "type": "text",
            "richText": [
                [
                    "Sources: "
                ],
                [
                    "WaitGroup documentation",
                    [
                        [
                            "a",
                            "https://pkg.go.dev/sync#WaitGroup"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "WaitGroup implementation and contracts",
                    [
                        [
                            "a",
                            "https://go.dev/src/sync/waitgroup.go"
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
