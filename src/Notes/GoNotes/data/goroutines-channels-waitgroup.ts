import type { GoNote } from '../types';

const note = {
    "notionId": "575d96aa-7664-4603-b6a4-35af7208ce3d",
    "slug": "goroutines-channels-waitgroup",
    "title": "Goroutines, Channels and WaitGroup",
    "updatedOn": "2026-10-05",
    "blocks": [
        {
            "id": "together-roles",
            "type": "sub_header",
            "richText": [
                [
                    "What each part does"
                ]
            ]
        },
        {
            "id": "together-role-table",
            "type": "table",
            "columnOrder": [
                "part",
                "job"
            ],
            "hasColumnHeader": true,
            "children": [
                {
                    "id": "together-role-row-0",
                    "type": "table_row",
                    "cells": {
                        "part": [
                            [
                                "Part"
                            ]
                        ],
                        "job": [
                            [
                                "Job in this example"
                            ]
                        ]
                    }
                },
                {
                    "id": "together-role-row-1",
                    "type": "table_row",
                    "cells": {
                        "part": [
                            [
                                "Goroutine"
                            ]
                        ],
                        "job": [
                            [
                                "Squares one number and sends the result."
                            ]
                        ]
                    }
                },
                {
                    "id": "together-role-row-2",
                    "type": "table_row",
                    "cells": {
                        "part": [
                            [
                                "Channel"
                            ]
                        ],
                        "job": [
                            [
                                "Carries the results from the workers to main."
                            ]
                        ]
                    }
                },
                {
                    "id": "together-role-row-3",
                    "type": "table_row",
                    "cells": {
                        "part": [
                            [
                                "WaitGroup"
                            ]
                        ],
                        "job": [
                            [
                                "Tracks when all three workers are done."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "together-worker-meaning",
            "type": "bulleted_list",
            "richText": [
                [
                    "A worker is a goroutine that does a task. Here, its task is to square one number."
                ]
            ]
        },
        {
            "id": "together-flow",
            "type": "code",
            "richText": [
                [
                    "worker 1 --+\nworker 2 --+--> results channel --> main\nworker 3 --+\n\nworkers done --> wg.Wait() returns --> close(results)"
                ]
            ],
            "language": "text"
        },
        {
            "id": "together-example",
            "type": "sub_header",
            "richText": [
                [
                    "Example: square three numbers"
                ]
            ]
        },
        {
            "id": "together-program",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n)\n\nfunc main() {\n    numbers := []int{1, 2, 3}\n    results := make(chan int)\n    var wg sync.WaitGroup\n\n    for _, number := range numbers {\n        wg.Add(1)\n        go func(n int) {\n            defer wg.Done()\n            results <- n * n\n        }(number)\n    }\n\n    go func() {\n        wg.Wait()\n        close(results)\n    }()\n\n    total := 0\n    for result := range results {\n        fmt.Println(result)\n        total += result\n    }\n    fmt.Println(\"Total:\", total)\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "together-output-order",
            "type": "bulleted_list",
            "richText": [
                [
                    "The first three lines can appear in any order. One possible output is:"
                ]
            ]
        },
        {
            "id": "together-output",
            "type": "code",
            "richText": [
                [
                    "4\n1\n9\nTotal: 14"
                ]
            ],
            "language": "text"
        },
        {
            "id": "together-total",
            "type": "bulleted_list",
            "richText": [
                [
                    "The results are always 1, 4 and 9. Their total is always 14."
                ]
            ]
        },
        {
            "id": "together-steps",
            "type": "sub_header",
            "richText": [
                [
                    "How the example runs"
                ]
            ]
        },
        {
            "id": "together-step-1",
            "type": "numbered_list",
            "richText": [
                [
                    "wg.Add(1)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " adds one worker to the counter before that worker starts."
                ]
            ]
        },
        {
            "id": "together-step-2",
            "type": "numbered_list",
            "richText": [
                [
                    "go func(n int)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " starts a worker. Passing "
                ],
                [
                    "number",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " gives that call its own parameter value."
                ]
            ]
        },
        {
            "id": "together-step-3",
            "type": "numbered_list",
            "richText": [
                [
                    "Each worker calculates "
                ],
                [
                    "n * n",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " and sends the result through "
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
                    "."
                ]
            ]
        },
        {
            "id": "together-step-4",
            "type": "numbered_list",
            "richText": [
                [
                    "main",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " receives and prints the results while the workers run."
                ]
            ]
        },
        {
            "id": "together-step-5",
            "type": "numbered_list",
            "richText": [
                [
                    "Before the worker returns, "
                ],
                [
                    "defer wg.Done()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " subtracts one from the counter."
                ]
            ]
        },
        {
            "id": "together-step-6",
            "type": "numbered_list",
            "richText": [
                [
                    "When the counter reaches zero, "
                ],
                [
                    "wg.Wait()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " returns. The waiting goroutine closes "
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
                    "."
                ]
            ]
        },
        {
            "id": "together-step-7",
            "type": "numbered_list",
            "richText": [
                [
                    "range results",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " stops after the channel is closed and all sent values have been received."
                ]
            ]
        },
        {
            "id": "together-step-8",
            "type": "numbered_list",
            "richText": [
                [
                    "main",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " prints the total and returns. Only "
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
                    " changes "
                ],
                [
                    "total",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", so the workers do not share that update."
                ]
            ]
        },
        {
            "id": "together-waiting",
            "type": "sub_header",
            "richText": [
                [
                    "Why wait in another goroutine?"
                ]
            ]
        },
        {
            "id": "together-unbuffered",
            "type": "bulleted_list",
            "richText": [
                [
                    "make(chan int)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " creates an unbuffered channel. It has no space to store values."
                ]
            ]
        },
        {
            "id": "together-send-waits",
            "type": "bulleted_list",
            "richText": [
                [
                    "A send waits until a receiver is ready. Each worker waits for "
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
                    " to receive its result."
                ]
            ]
        },
        {
            "id": "together-wait-first",
            "type": "bulleted_list",
            "richText": [
                [
                    "If "
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
                    " calls "
                ],
                [
                    "wg.Wait()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " before receiving, it waits for the workers to finish."
                ]
            ]
        },
        {
            "id": "together-deadlock",
            "type": "bulleted_list",
            "richText": [
                [
                    "The workers cannot finish their sends. "
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
                    " cannot finish waiting. This is a deadlock: they cannot move forward."
                ]
            ]
        },
        {
            "id": "together-separate-wait",
            "type": "bulleted_list",
            "richText": [
                [
                    "The separate waiting goroutine lets "
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
                    " keep receiving while "
                ],
                [
                    "wg.Wait()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " waits for the workers."
                ]
            ]
        },
        {
            "id": "together-closing",
            "type": "sub_header",
            "richText": [
                [
                    "Why close after Wait?"
                ]
            ]
        },
        {
            "id": "together-wait-not-close",
            "type": "bulleted_list",
            "richText": [
                [
                    "A WaitGroup does not close a channel. The waiting goroutine calls "
                ],
                [
                    "close(results)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " after "
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
                    " returns."
                ]
            ]
        },
        {
            "id": "together-last-send",
            "type": "bulleted_list",
            "richText": [
                [
                    "At that point, every worker has sent its result. No worker will send again."
                ]
            ]
        },
        {
            "id": "together-worker-close",
            "type": "bulleted_list",
            "richText": [
                [
                    "A worker must not close this shared channel. Another worker may still be sending."
                ]
            ]
        },
        {
            "id": "together-send-closed",
            "type": "bulleted_list",
            "richText": [
                [
                    "Sending to a closed channel causes a panic (a runtime failure)."
                ]
            ]
        },
        {
            "id": "together-no-close",
            "type": "bulleted_list",
            "richText": [
                [
                    "Without "
                ],
                [
                    "close(results)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", "
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
                    " waits for another value after receiving the three results. The range loop cannot end."
                ]
            ]
        },
        {
            "id": "together-related",
            "type": "sub_header",
            "richText": [
                [
                    "Related notes and sources"
                ]
            ]
        },
        {
            "id": "together-related-pages",
            "type": "bulleted_list",
            "richText": [
                [
                    "Goroutines",
                    [
                        [
                            "a",
                            "#/notes/go/goroutines"
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
                    " and "
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
                    "."
                ]
            ]
        },
        {
            "id": "together-source-sync",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go documentation: WaitGroup",
                    [
                        [
                            "a",
                            "https://pkg.go.dev/sync#WaitGroup"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "together-source-channels",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go specification: channel types",
                    [
                        [
                            "a",
                            "https://go.dev/ref/spec#Channel_types"
                        ]
                    ]
                ],
                [
                    " and "
                ],
                [
                    "close",
                    [
                        [
                            "a",
                            "https://go.dev/ref/spec#Close"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "together-source-flow",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go blog: pipelines and cancellation",
                    [
                        [
                            "a",
                            "https://go.dev/blog/pipelines"
                        ]
                    ]
                ]
            ]
        }
    ]
} as const satisfies GoNote;

export default note;
