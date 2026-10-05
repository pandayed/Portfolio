/* Go study notes, refined from the original Notion import. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-80be-9eeb-c1699387a64d",
    "slug": "goroutines-blocking-causes-recovery",
    "title": "Goroutines Blocking: Causes & Recovery",
    "updatedOn": "2026-10-05",
    "blocks": [
        {
            "id": "1ddef1dc-a5e8-5cdc-a2c3-0659fbb57459",
            "type": "bulleted_list",
            "richText": [
                [
                    "A blocked goroutine is waiting for an operation or another goroutine."
                ]
            ]
        },
        {
            "id": "1bf6ad85-68da-5d6d-a34d-47ea96b2dfe9",
            "type": "bulleted_list",
            "richText": [
                [
                    "Waiting is sometimes normal."
                ]
            ]
        },
        {
            "id": "6f2c116c-821f-53a4-8a33-b49aaf68e430",
            "type": "bulleted_list",
            "richText": [
                [
                    "Find what needs to happen before the goroutine can continue."
                ]
            ]
        },
        {
            "id": "4365bb08-2a98-5fba-ab91-fb0501e3d51f",
            "type": "bulleted_list",
            "richText": [
                [
                    "Give long-running tasks a way to stop before changing buffers, locks or runtime settings."
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
                                "Check"
                            ]
                        ],
                        "column-2": [
                            [
                                "What to fix"
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
                                "Is the receiver still receiving? Is the queue full?"
                            ]
                        ],
                        "column-2": [
                            [
                                "Keep receiving results, or let the sender stop on cancellation."
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
                                "Can a producer still send? Who closes the channel?"
                            ]
                        ],
                        "column-2": [
                            [
                                "Close after the last sender finishes, or let the receiver stop on cancellation."
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
                                "Does every added task call Done exactly once?"
                            ]
                        ],
                        "column-2": [
                            [
                                "Fix the task counter and give every task a way to return."
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
                                "Who holds the lock? Are goroutines taking locks in opposite orders?"
                            ]
                        ],
                        "column-2": [
                            [
                                "Release on every path. Keep lock scopes short and use a consistent lock order."
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
                                "Does the API support context or a timeout?"
                            ]
                        ],
                        "column-2": [
                            [
                                "Use the cancellation or timeout supported by that API."
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
                                "Is the work progressing, or looping without useful work?"
                            ]
                        ],
                        "column-2": [
                            [
                                "Limit the work and check cancellation during it."
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
                    "Rules and examples: "
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Deadlock: work cannot continue because a needed event never happens, or tasks wait on each other."
                ]
            ]
        },
        {
            "id": "782f8530-488b-5931-856e-693e059d4ec4",
            "type": "bulleted_list",
            "richText": [
                [
                    "One request can deadlock while other requests continue."
                ]
            ]
        },
        {
            "id": "8748a700-a013-54b5-bfad-abaf610d2fcd",
            "type": "bulleted_list",
            "richText": [
                [
                    "Goroutine leak: a goroutine stays alive after its work is no longer needed."
                ]
            ]
        },
        {
            "id": "1f5fb70d-75df-5a44-af5c-fb5bfff9c6da",
            "type": "bulleted_list",
            "richText": [
                [
                    "A leak often happens when the goroutine waits with no way to stop."
                ]
            ]
        },
        {
            "id": "509b75ca-5feb-5ebe-981e-c68c7de14ad3",
            "type": "code",
            "richText": [
                [
                    "// Deliberately deadlocking example.\nch := make(chan int)\nch <- 1 // this goroutine cannot reach the receive below\nvalue := <-ch\n_ = value"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "a4c80fce-96e3-5b4a-aad5-b97b369e9bf3",
            "type": "bulleted_list",
            "richText": [
                [
                    "The send above needs another goroutine to receive."
                ]
            ]
        },
        {
            "id": "0b2a1b7d-2385-50b7-b488-21bed0821f6b",
            "type": "bulleted_list",
            "richText": [
                [
                    "A one-value buffer would let this particular send finish."
                ]
            ]
        },
        {
            "id": "93893aa8-e01f-57f3-be10-c56a293ad07b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Any finite buffer eventually fills if a producer keeps sending and nobody receives."
                ]
            ]
        },
        {
            "id": "8c3cf9d0-3aad-5e77-83b9-47d9dfcca0de",
            "type": "bulleted_list",
            "richText": [
                [
                    "Decide who receives, who closes the channel and how the work stops."
                ]
            ]
        },
        {
            "id": "c800fa44-abe3-5678-9c3b-e2a84803bfd4",
            "type": "bulleted_list",
            "richText": [
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
                    " can reject a send instead of waiting."
                ]
            ]
        },
        {
            "id": "a591529b-4490-5118-aa3f-3a88f9edd352",
            "type": "bulleted_list",
            "richText": [
                [
                    "That may drop a value. Repeating it in a loop may keep the CPU busy without making progress."
                ]
            ]
        },
        {
            "id": "62a1d99f-e724-5266-b9a6-a968a95ca920",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use this behavior only when it is intended."
                ]
            ]
        },
        {
            "id": "30811c4e-e5a4-5945-9dd2-13751a4a8b8c",
            "type": "bulleted_list",
            "richText": [
                [
                    "The runtime does not report every deadlocked request or leaked goroutine."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Preemption means the runtime pauses one goroutine so other goroutines can run."
                ]
            ]
        },
        {
            "id": "e2438ae9-bc4e-5397-aebc-89affb1f9e55",
            "type": "bulleted_list",
            "richText": [
                [
                    "Modern Go supports preemption on supported platforms. A tight loop usually does not need "
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
                    " just to let other goroutines run."
                ]
            ]
        },
        {
            "id": "c0e41a6e-110d-5fe2-83dd-cec79322cdf2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Preemption does not stop unwanted work."
                ]
            ]
        },
        {
            "id": "21855397-9d8b-5334-b162-cf8f32a2b546",
            "type": "bulleted_list",
            "richText": [
                [
                    "A context sends a cancellation signal. The computation must check it."
                ]
            ]
        },
        {
            "id": "7c534e55-1e3e-5fba-b8ce-7227ef95281e",
            "type": "code",
            "richText": [
                [
                    "func count(ctx context.Context, limit uint64) (uint64, error) {\n    var completed uint64\n    for completed < limit {\n        if completed%1024 == 0 {\n            if err := ctx.Err(); err != nil {\n                return completed, err\n            }\n        }\n        completed++\n    }\n    return completed, nil\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "21feb72b-f234-532a-a432-a67eacf2c9bd",
            "type": "bulleted_list",
            "richText": [
                [
                    "The function checks cancellation every 1024 iterations."
                ]
            ]
        },
        {
            "id": "55f0347e-73cd-518c-8bde-2713752edc90",
            "type": "bulleted_list",
            "richText": [
                [
                    "Check more often when cancellation needs to be faster."
                ]
            ]
        },
        {
            "id": "2ae1236d-87dc-5ea6-87cc-23159b0e160a",
            "type": "bulleted_list",
            "richText": [
                [
                    "Also consider how long one iteration takes."
                ]
            ]
        },
        {
            "id": "3550e7a5-dc93-5ed0-ab71-68080a1e4b58",
            "type": "bulleted_list",
            "richText": [
                [
                    "Gosched",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " lets another goroutine run. It does not unlock a mutex, send a missing value or cancel the work."
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
                    "Record when tasks start and finish, queue sizes and operation deadlines."
                ]
            ]
        },
        {
            "id": "30f46e1b-95e6-5b92-a5f9-a8f98121f9ba",
            "type": "bulleted_list",
            "richText": [
                [
                    "A growing goroutine count suggests a problem but does not prove a leak."
                ]
            ]
        },
        {
            "id": "9f92b44c-e63e-508a-8b8f-dc5ee71c738d",
            "type": "bulleted_list",
            "richText": [
                [
                    "Goroutine stack traces show where work is waiting."
                ]
            ]
        },
        {
            "id": "aea40cd3-cbf6-539b-ae18-14d49de93dd6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Take several snapshots to find waits that remain after a request has ended."
                ]
            ]
        },
        {
            "id": "9bc77479-5d14-5cd4-ada8-5ae0ef845351",
            "type": "bulleted_list",
            "richText": [
                [
                    "CPU profiles show which functions use CPU time."
                ]
            ]
        },
        {
            "id": "c989e127-e4b6-5f72-bd73-696f7e742a0b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Block and mutex profiles show sampled waits when those profiles are enabled."
                ]
            ]
        },
        {
            "id": "3f668545-8e3e-576f-bf62-2cc65ed2b776",
            "type": "bulleted_list",
            "richText": [
                [
                    "Execution traces show when goroutines run, wait and wake up."
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
                    " checks selected suspicious code patterns."
                ]
            ]
        },
        {
            "id": "5d0cc6aa-bf14-5f58-a3cb-df7e49359269",
            "type": "bulleted_list",
            "richText": [
                [
                    "The race detector finds data races in code that actually runs."
                ]
            ]
        },
        {
            "id": "a8db28a8-3c22-5318-b650-447d9372f26a",
            "type": "bulleted_list",
            "richText": [
                [
                    "Neither tool proves that the program is free of deadlocks."
                ]
            ]
        },
        {
            "id": "1792e52a-0081-5cf4-95a6-a92e6f6d03d3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Neither tool repairs a blocked program."
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
