/* Go study notes, refined from the original Notion import. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-804e-98a7-ed95eaa0b4c2",
    "slug": "workgroups",
    "title": "WaitGroup",
    "updatedOn": "2026-10-05",
    "blocks": [
        {
            "id": "83dc4671-7caf-5b21-94b3-94555b47fede",
            "type": "bulleted_list",
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
                    " waits for a group of tasks to finish."
                ]
            ]
        },
        {
            "id": "6c716114-db82-5046-8185-98ab0c366ca2",
            "type": "bulleted_list",
            "richText": [
                [
                    "It does not carry results or stop workers from racing while changing shared data."
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
                                "Add n tasks to the counter. A negative resulting counter causes a panic."
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
                                "Mark one task done. Same as "
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
                                "Wait until the task counter reaches zero."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Each worker prints starting before done."
                ]
            ]
        },
        {
            "id": "263a17cb-b4d9-525b-aeda-1427ed0c7452",
            "type": "bulleted_list",
            "richText": [
                [
                    "Lines from different workers may appear between each other’s lines."
                ]
            ]
        },
        {
            "id": "8706a2c5-0ccf-5132-b254-c7a886392579",
            "type": "bulleted_list",
            "richText": [
                [
                    "All workers completed is always the last line."
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
                    "Call "
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
                    " before starting each goroutine."
                ]
            ]
        },
        {
            "id": "b19e8311-9623-50dd-bbbe-5e3b40f33163",
            "type": "bulleted_list",
            "richText": [
                [
                    "If "
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
                    " runs before the task is added, it may see zero and return too early."
                ]
            ]
        },
        {
            "id": "94b358b3-d29f-50f9-b856-4b214ff5d4fb",
            "type": "bulleted_list",
            "richText": [
                [
                    "Call "
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
                    " exactly once for each added task."
                ]
            ]
        },
        {
            "id": "eeb40453-5c0b-51d1-b0cb-14a8f2b3dc0b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Missing "
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
                    " leaves "
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
                    " blocked."
                ]
            ]
        },
        {
            "id": "8ef38b86-4801-526d-a89d-bce46971ea8f",
            "type": "bulleted_list",
            "richText": [
                [
                    "An extra "
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
                    " can make the counter negative and cause a panic."
                ]
            ]
        },
        {
            "id": "bf8afe79-8106-58aa-8579-a82bf8da9e28",
            "type": "bulleted_list",
            "richText": [
                [
                    "Do not copy a WaitGroup after first use."
                ]
            ]
        },
        {
            "id": "15505d90-a82f-570b-9502-6e5bdae0bd8e",
            "type": "bulleted_list",
            "richText": [
                [
                    "Pass a pointer when another function needs to use the same WaitGroup."
                ]
            ]
        },
        {
            "id": "5d0a08af-4b4c-5235-af5a-5a534bb6c5a9",
            "type": "bulleted_list",
            "richText": [
                [
                    "Start a new independent group of tasks only after every previous "
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
                    " call has returned."
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
                    " does not accept a context or cancellation signal."
                ]
            ]
        },
        {
            "id": "c503744e-af29-54eb-ae22-83dfa8ade22c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Each task must have a way to return."
                ]
            ]
        },
        {
            "id": "3f8d3915-e989-5d51-a1f2-f95d34f44cf8",
            "type": "bulleted_list",
            "richText": [
                [
                    "Cancelling a context does not reduce the WaitGroup counter."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Use a channel to send results."
                ]
            ]
        },
        {
            "id": "f077ba19-0c60-5656-8110-a160fbcd3e1b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use the WaitGroup to know when every sender has finished."
                ]
            ]
        },
        {
            "id": "890c85a6-6df7-5745-98aa-6000c5ff1e37",
            "type": "bulleted_list",
            "richText": [
                [
                    "Receive results while workers run."
                ]
            ]
        },
        {
            "id": "553cd511-ae54-5d44-958f-ef4392d194a0",
            "type": "bulleted_list",
            "richText": [
                [
                    "Waiting first can deadlock if workers are still waiting to send on an unbuffered channel."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Prints 0, 1 and 4. Their order can change."
                ]
            ]
        },
        {
            "id": "3106944e-dd03-539b-8883-580dbaba6af0",
            "type": "bulleted_list",
            "richText": [
                [
                    "The coordinator closes results only after every send has finished."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Go 1.25 added "
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
                    "."
                ]
            ]
        },
        {
            "id": "2d395881-8aa8-5db9-a889-3a6c505ac4cc",
            "type": "bulleted_list",
            "richText": [
                [
                    "It adds a task, starts a goroutine and marks the task done when "
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
                    " returns."
                ]
            ]
        },
        {
            "id": "f68a8bff-eaec-51b6-ad3d-fdd6b131d039",
            "type": "bulleted_list",
            "richText": [
                [
                    "f",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " must not panic."
                ]
            ]
        },
        {
            "id": "090948fa-ecbe-5be6-91f8-a4b3d2444e02",
            "type": "bulleted_list",
            "richText": [
                [
                    "Start the initial tasks before calling "
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
                    "."
                ]
            ]
        },
        {
            "id": "df207311-efc2-5b17-95e4-0719210cf491",
            "type": "bulleted_list",
            "richText": [
                [
                    "Do not call "
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
                    " yourself inside "
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
