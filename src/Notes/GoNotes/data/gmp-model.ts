/* Go study notes, refined from the original Notion import. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-80ff-bb0c-d5185ec41a80",
    "slug": "gmp-model",
    "title": "GMP Model",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "c4e86aee-2baf-5bf6-828a-2c85297b5519",
            "type": "text",
            "richText": [
                [
                    "G, M and P describe how the Go runtime schedules goroutines. This is a simplified implementation model, not a language guarantee about queues, thread counts, or scheduling order."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8044-b04b-dd8c5581306d",
            "type": "sub_header",
            "richText": [
                [
                    "G, M and P"
                ]
            ]
        },
        {
            "id": "754e0729-0ed7-5b78-a0bd-06ad0fdea22b",
            "type": "table",
            "columnOrder": [
                "column-0",
                "column-1"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false,
            "children": [
                {
                    "id": "b098876d-ec57-5f29-a4f3-e99079d869ec",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Name"
                            ]
                        ],
                        "column-1": [
                            [
                                "Role"
                            ]
                        ]
                    }
                },
                {
                    "id": "930e558c-5e56-5c55-8a21-48fe6a9ccff4",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "G: goroutine"
                            ]
                        ],
                        "column-1": [
                            [
                                "The work and execution state of a goroutine."
                            ]
                        ]
                    }
                },
                {
                    "id": "3d4292b0-7e18-5bcb-b86d-fdd36a8e90bd",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "M: OS thread"
                            ]
                        ],
                        "column-1": [
                            [
                                "The thread on which code executes; the OS schedules it onto CPUs."
                            ]
                        ]
                    }
                },
                {
                    "id": "f2e82b90-182e-56f9-b9c7-7a88bb7e6574",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "P: runtime processor"
                            ]
                        ],
                        "column-1": [
                            [
                                "The runtime resources needed to execute user Go code, including scheduler and allocator state."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "ed906c25-7c3e-5a2c-881d-f173414fbb99",
            "type": "text",
            "richText": [
                [
                    "An M needs a P to execute user Go code. A P can support one executing goroutine at a time. The runtime manages Ms, and their number can exceed the number of Ps because threads may be idle or blocked in syscalls."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8093-ba0c-cb39eb9ce5b4",
            "type": "sub_header",
            "richText": [
                [
                    "Runnable, Running and Waiting"
                ]
            ]
        },
        {
            "id": "b5b17699-2d7b-5dab-a9ca-6ae14caaa08f",
            "type": "table",
            "columnOrder": [
                "column-0",
                "column-1"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false,
            "children": [
                {
                    "id": "ae375fce-70ea-5522-8d7b-54c4340cee92",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "State"
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
                    "id": "6a1b04e8-ba9f-5406-97c7-39f47b17f2d5",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Runnable"
                            ]
                        ],
                        "column-1": [
                            [
                                "Ready to execute but waiting for scheduling."
                            ]
                        ]
                    }
                },
                {
                    "id": "6f857fee-b7d2-53c0-895c-bfe5c43d85aa",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Running"
                            ]
                        ],
                        "column-1": [
                            [
                                "Currently executing."
                            ]
                        ]
                    }
                },
                {
                    "id": "85f6f2ed-5951-5cb1-807d-034651edc288",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Waiting"
                            ]
                        ],
                        "column-1": [
                            [
                                "Parked until an event such as a channel operation, lock release or timer makes progress possible."
                            ]
                        ]
                    }
                },
                {
                    "id": "e4f07f40-a32b-5737-b9d6-6bd562012219",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "In a syscall"
                            ]
                        ],
                        "column-1": [
                            [
                                "Executing or waiting in an OS call; handled separately from a Go-managed wait."
                            ]
                        ]
                    }
                },
                {
                    "id": "f013db02-da6b-5318-bada-ae5d5aa76a84",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Finished"
                            ]
                        ],
                        "column-1": [
                            [
                                "The goroutine has returned or otherwise exited."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "796df7c5-ed7d-5a10-a268-94ce98bcac01",
            "type": "text",
            "richText": [
                [
                    "The scheduler uses local and global runnable queues, work stealing, timers and network polling. A runnable goroutine does not have to enter a particular local queue before it can execute. Queue placement and wake-up paths can change between runtime versions."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-807f-925a-c2ce48ddf7ac",
            "type": "sub_header",
            "richText": [
                [
                    "What Happens When G Blocks"
                ]
            ]
        },
        {
            "id": "7a968b87-272c-549b-9f63-bc9c771f263a",
            "type": "table",
            "columnOrder": [
                "column-0",
                "column-1"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false,
            "children": [
                {
                    "id": "49343780-65b2-52ad-a804-c49ba8ecc0f9",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Operation"
                            ]
                        ],
                        "column-1": [
                            [
                                "Simplified behavior"
                            ]
                        ]
                    }
                },
                {
                    "id": "2aefd1c3-fd61-5160-b57d-1491ae98c29f",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Go-managed wait: channel, mutex or sleep"
                            ]
                        ],
                        "column-1": [
                            [
                                "The runtime can park G and schedule other runnable work on the available execution resources."
                            ]
                        ]
                    }
                },
                {
                    "id": "c51c2b77-c1f9-5978-96bb-b859dd768255",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Pollable network I/O"
                            ]
                        ],
                        "column-1": [
                            [
                                "When data is unavailable, the network poller can park G and wake it on readiness without dedicating a blocked OS thread to each connection."
                            ]
                        ]
                    }
                },
                {
                    "id": "f8d6eebf-ac54-55d4-88d1-2b37f7c05574",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Blocking syscall or some external calls"
                            ]
                        ],
                        "column-1": [
                            [
                                "M may block. The runtime can make its P available to another M so other Go work can continue."
                            ]
                        ]
                    }
                },
                {
                    "id": "187f547b-9b39-5a9a-b2ce-649e080b4d03",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Syscall returns"
                            ]
                        ],
                        "column-1": [
                            [
                                "M must acquire a P before resuming user Go code. It may resume G directly or place G back into scheduling if no P is available."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "81a548d6-2e84-5e47-bbb3-37e7ac9240f1",
            "type": "text",
            "richText": [
                [
                    "Do not classify every HTTP request or database query as an OS-thread-blocking syscall. The actual behavior depends on the operation, driver, platform and runtime path. A blocked goroutine does not prove that its P is blocked or that all its queued work is stuck."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80be-a117-df84fe8f0090",
            "type": "sub_header",
            "richText": [
                [
                    "GOMAXPROCS"
                ]
            ]
        },
        {
            "id": "fd0411ff-2b8d-5ab0-8db6-293d3e0e9588",
            "type": "text",
            "richText": [
                [
                    "GOMAXPROCS",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " determines the number of Ps and limits simultaneous execution of user Go code. It does not limit the total number of goroutines, OS threads, or outstanding I/O operations."
                ]
            ]
        },
        {
            "id": "afa58221-52f1-5b97-946f-23defa85d19d",
            "type": "code",
            "richText": [
                [
                    "// Function-body reference; requires imports fmt and runtime.\ncurrent := runtime.GOMAXPROCS(0) // read without changing the setting\nfmt.Println(current)"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "d16e8407-6f5f-5d3c-83ad-9b949ce7387f",
            "type": "text",
            "richText": [
                [
                    "The default is version- and environment-dependent. Go 1.25+ added container-aware defaults and automatic updates based on logical CPUs, CPU affinity and Linux cgroup CPU limits. Programs declaring Go 1.24 or earlier default to compatibility settings that disable these behaviors unless overridden. An explicit environment setting or "
                ],
                [
                    "runtime.GOMAXPROCS(n)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " with n > 0 disables automatic updates; "
                ],
                [
                    "runtime.SetDefaultGOMAXPROCS()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " restores the runtime default on supported versions."
                ]
            ]
        },
        {
            "id": "1c04d25a-9696-518c-9e01-42aa78ddd5bb",
            "type": "text",
            "richText": [
                [
                    "Start with the runtime default. Tune only with workload measurements; setting it below or equal to the logical CPU count is not a universal performance rule."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-803e-a409-d90b94efb129",
            "type": "sub_header",
            "richText": [
                [
                    "Diagnose a Slow Crawler"
                ]
            ]
        },
        {
            "id": "f99216f0-353a-5d5e-994b-bdcc820d6532",
            "type": "text",
            "richText": [
                [
                    "Many goroutines, low CPU use and rising memory are symptoms. They do not establish a scheduler defect. A crawler may be waiting for slow servers, connection limits, a full results channel, a lock, or work that never observes cancellation."
                ]
            ]
        },
        {
            "id": "b8e89a1a-2ab6-5dc6-8ab6-de34c5bba3c5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Inspect goroutine stacks to locate waits. Compare repeated snapshots to distinguish normal outstanding requests from work that never exits."
                ]
            ]
        },
        {
            "id": "90b57820-af8f-5d61-b0c0-a878258edeb6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use traces and relevant profiles to investigate scheduling, blocking and CPU work. Measure thread count separately from goroutine count."
                ]
            ]
        },
        {
            "id": "55ec1624-c881-501f-bbcf-c3f80b28168c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Bound concurrent requests and provide timeouts or cancellation. More goroutines do not increase a server’s capacity or remove a downstream bottleneck."
                ]
            ]
        },
        {
            "id": "5ca7246f-fc62-53d7-a574-f0d3d04f2103",
            "type": "text",
            "richText": [
                [
                    "Application exit paths: "
                ],
                [
                    "Goroutines Blocking: Causes & Recovery",
                    [
                        [
                            "a",
                            "#/notes/go/goroutines-blocking-causes-recovery"
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
            "id": "260e3f1d-c7a3-5f76-9f4a-cee6047fca07",
            "type": "text",
            "richText": [
                [
                    "Sources: "
                ],
                [
                    "Runtime G/M/P model",
                    [
                        [
                            "a",
                            "https://go.dev/src/runtime/HACKING"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "Scheduler and syscall paths",
                    [
                        [
                            "a",
                            "https://go.dev/src/runtime/proc.go"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "Network poller",
                    [
                        [
                            "a",
                            "https://go.dev/src/runtime/netpoll.go"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "GOMAXPROCS documentation",
                    [
                        [
                            "a",
                            "https://pkg.go.dev/runtime#GOMAXPROCS"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "Go 1.25 container-aware defaults",
                    [
                        [
                            "a",
                            "https://go.dev/blog/container-aware-gomaxprocs"
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
                    "."
                ]
            ]
        }
    ]
} as const satisfies GoNote;

export default note;
