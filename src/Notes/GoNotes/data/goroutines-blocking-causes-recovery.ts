/* Go study notes, refined from the original Notion import. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-80be-9eeb-c1699387a64d",
    "slug": "goroutines-blocking-causes-recovery",
    "title": "Goroutines Blocking: Causes & Recovery",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "1ddef1dc-a5e8-5cdc-a2c3-0659fbb57459",
            "type": "text",
            "richText": [
                [
                    "A blocked goroutine is waiting for progress from an operation or another goroutine. Blocking can be intentional. Diagnose the missing event and give every long-lived task an exit path before changing buffers, locks, or scheduling."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-809a-9628-d6f9aa6bab2e",
            "type": "sub_header",
            "richText": [
                [
                    "Locate the Wait"
                ]
            ]
        },
        {
            "id": "eb1ab1d3-c5b8-51f0-8276-f03fe53f9c2f",
            "type": "table",
            "columnOrder": [
                "column-0",
                "column-1",
                "column-2"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false,
            "children": [
                {
                    "id": "f980cf4d-c0c7-5ae8-8bbb-3946b8017289",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Observed wait"
                            ]
                        ],
                        "column-1": [
                            [
                                "Inspect"
                            ]
                        ],
                        "column-2": [
                            [
                                "Repair or exit path"
                            ]
                        ]
                    }
                },
                {
                    "id": "31c76379-5b18-5513-81d9-dafdfd03bbb3",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Channel send"
                            ]
                        ],
                        "column-1": [
                            [
                                "Is there a consumer? Did it return early? Is the queue full?"
                            ]
                        ],
                        "column-2": [
                            [
                                "Drain results or make the send cancellable; define who owns consumer shutdown."
                            ]
                        ]
                    }
                },
                {
                    "id": "df51042a-9c3f-5a52-8ba9-8d80499fb333",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Channel receive"
                            ]
                        ],
                        "column-1": [
                            [
                                "Can a producer still send? Who closes the stream?"
                            ]
                        ],
                        "column-2": [
                            [
                                "Close after the last sender finishes, or allow cancellation when waiting."
                            ]
                        ]
                    }
                },
                {
                    "id": "09304f2d-52f8-5bf5-a8b9-b27d17c018ec",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "WaitGroup.Wait"
                            ]
                        ],
                        "column-1": [
                            [
                                "Does every registered task reach Done exactly once?"
                            ]
                        ],
                        "column-2": [
                            [
                                "Fix registration/completion balance and make each task able to return."
                            ]
                        ]
                    }
                },
                {
                    "id": "f83a6eb6-0c69-5ab8-940f-07e759414182",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Mutex or RWMutex"
                            ]
                        ],
                        "column-1": [
                            [
                                "Who owns the lock? Is it held across a wait? Is there a lock-order cycle?"
                            ]
                        ],
                        "column-2": [
                            [
                                "Release on every path, shorten the scope, and use a consistent lock order."
                            ]
                        ]
                    }
                },
                {
                    "id": "1be648a8-489e-5a2f-83be-980114c80b72",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Network or external operation"
                            ]
                        ],
                        "column-1": [
                            [
                                "Does the API observe context or have a timeout?"
                            ]
                        ],
                        "column-2": [
                            [
                                "Use the API’s supported cancellation or deadline mechanism."
                            ]
                        ]
                    }
                },
                {
                    "id": "834353f7-c8c9-505b-8977-e2b3eb516738",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "CPU work"
                            ]
                        ],
                        "column-1": [
                            [
                                "Is work progressing, or looping without useful progress?"
                            ]
                        ],
                        "column-2": [
                            [
                                "Bound the work and check cancellation at suitable points."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "26622e92-761a-5537-b2e1-262f665eb4e7",
            "type": "text",
            "richText": [
                [
                    "Primitive contracts and examples: "
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
                    "RWMutex",
                    [
                        [
                            "a",
                            "#/notes/go/rwmutex"
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
            "id": "24024eb1-ed54-80b2-a4ac-dff287bab030",
            "type": "sub_header",
            "richText": [
                [
                    "Deadlock and Leak Are Different"
                ]
            ]
        },
        {
            "id": "b35a64ff-8e87-56e8-8b89-a5fe5b2e7686",
            "type": "text",
            "richText": [
                [
                    "A deadlock is a dependency cycle or missing event that prevents the affected work from progressing. The entire program need not be blocked: a request can deadlock while other requests still work. A goroutine leak is work that remains alive after it is no longer needed, often because a wait has no exit path."
                ]
            ]
        },
        {
            "id": "509b75ca-5feb-5ebe-981e-c68c7de14ad3",
            "type": "code",
            "richText": [
                [
                    "// Deliberately deadlocking function-body fragment.\nch := make(chan int)\nch <- 1 // this goroutine cannot reach the receive below\nvalue := <-ch\n_ = value"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "a4c80fce-96e3-5b4a-aad5-b97b369e9bf3",
            "type": "text",
            "richText": [
                [
                    "The send needs another goroutine to receive. Buffering one value makes this particular fragment progress, but does not solve an unbounded producer with no consumer. Fix the communication lifecycle instead of assuming a larger buffer proves deadlock freedom."
                ]
            ]
        },
        {
            "id": "c800fa44-abe3-5678-9c3b-e2a84803bfd4",
            "type": "text",
            "richText": [
                [
                    "A "
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
                    " with "
                ],
                [
                    "default",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " can reject work instead of waiting, but that changes the behavior: it may drop a value or busy-loop on retries. Use it only when that policy is intended. A runtime deadlock report does not detect every application-level deadlock or leak."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-806d-9fcb-d309ad8210dc",
            "type": "sub_header",
            "richText": [
                [
                    "Cancellation Does Not Interrupt Arbitrary Work"
                ]
            ]
        },
        {
            "id": "52f0655f-515c-53f6-b675-3135afb29adf",
            "type": "text",
            "richText": [
                [
                    "Modern Go runtimes can preempt goroutines on supported platforms, so a tight loop does not generally require "
                ],
                [
                    "runtime.Gosched()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " to let the scheduler run. Preemption still does not end useless computation. A context provides a signal; the computation must observe it."
                ]
            ]
        },
        {
            "id": "7c534e55-1e3e-5fba-b8ce-7227ef95281e",
            "type": "code",
            "richText": [
                [
                    "// Package-level helper; requires import \"context\".\nfunc count(ctx context.Context, limit uint64) (uint64, error) {\n    var completed uint64\n    for completed < limit {\n        if completed%1024 == 0 {\n            if err := ctx.Err(); err != nil {\n                return completed, err\n            }\n        }\n        completed++\n    }\n    return completed, nil\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "21feb72b-f234-532a-a432-a67eacf2c9bd",
            "type": "text",
            "richText": [
                [
                    "The helper checks every 1024 iterations. Choose check frequency from acceptable cancellation latency and the cost of one iteration. "
                ],
                [
                    "Gosched",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " yields execution; it does not release an application lock, produce a missing channel value, or cancel an operation."
                ]
            ]
        },
        {
            "id": "f7a9fa20-113d-5cec-a37f-094d3091245f",
            "type": "sub_header",
            "richText": [
                [
                    "Collect Evidence Before Choosing a Fix"
                ]
            ]
        },
        {
            "id": "fb0d6496-c12e-5f31-aa11-3f420f2ff5ec",
            "type": "bulleted_list",
            "richText": [
                [
                    "Record task entry and exit, queue sizes and operation deadlines. A rising goroutine count is a clue, not proof of a leak."
                ]
            ]
        },
        {
            "id": "9f92b44c-e63e-508a-8b8f-dc5ee71c738d",
            "type": "bulleted_list",
            "richText": [
                [
                    "Inspect goroutine stacks to find blocked call sites and their owners. Repeated snapshots help identify waits that persist after a request ends."
                ]
            ]
        },
        {
            "id": "9bc77479-5d14-5cd4-ada8-5ae0ef845351",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use CPU profiles for computation, block or mutex profiles for enabled wait samples, and execution traces for scheduling and events."
                ]
            ]
        },
        {
            "id": "a1bb1a50-8f54-5d23-9018-fe5efb63def2",
            "type": "bulleted_list",
            "richText": [
                [
                    "go vet",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " reports selected suspicious code patterns. The race detector finds data races on executed paths. Neither tool proves absence of deadlocks or fixes a blocked program."
                ]
            ]
        },
        {
            "id": "88b8be32-f036-5f9d-8ffb-51d316e66c82",
            "type": "text",
            "richText": [
                [
                    "Runtime scheduling and Go-managed versus OS-thread waits: "
                ],
                [
                    "GMP Model",
                    [
                        [
                            "a",
                            "#/notes/go/gmp-model"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "c4e9fba0-445e-5db1-a601-1a966eda20ad",
            "type": "text",
            "richText": [
                [
                    "Sources: "
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
                    ", "
                ],
                [
                    "Diagnostics",
                    [
                        [
                            "a",
                            "https://go.dev/doc/diagnostics"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "Race detector limits",
                    [
                        [
                            "a",
                            "https://go.dev/doc/articles/race_detector"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "Vet checks",
                    [
                        [
                            "a",
                            "https://pkg.go.dev/cmd/vet"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "Go 1.14 preemption change",
                    [
                        [
                            "a",
                            "https://go.dev/doc/go1.14"
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
