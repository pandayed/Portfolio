/* Copied from the GMP Model page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-80ff-bb0c-d5185ec41a80",
    "slug": "gmp-model",
    "title": "GMP Model",
    "updatedOn": "2025-08-03",
    "blocks": [
        {
            "id": "24224eb1-ed54-806e-b422-cc5acb254b90",
            "type": "callout",
            "children": [
                {
                    "id": "24224eb1-ed54-80b2-9bde-fa07b2a4ccde",
                    "type": "text",
                    "richText": [
                        [
                            "The GMP model in Go needs to be learned only if you're working on high-concurrency systems, performance-critical applications, or you're debugging issues like goroutine leaks, deadlocks, or unexpected latency."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24224eb1-ed54-8017-a984-d60cf4a7a64e",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-807b-86ea-e7dd47773371",
            "type": "bulleted_list",
            "richText": [
                [
                    "G = Goroutine",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ": Lightweight code unit."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-803e-ac1e-c1758aa4cb16",
            "type": "bulleted_list",
            "richText": [
                [
                    "M = OS Thread (Machine)",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ": Executes goroutines on behalf of P."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8030-addb-f77b6ac1afe9",
            "type": "bulleted_list",
            "richText": [
                [
                    "P = Processor",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ": Logical scheduler that holds and schedules goroutines using a queue, not to be confused with actual CPU."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8040-a1e6-ca7deb6272c1",
            "type": "text",
            "richText": [
                [
                    "There is also a "
                ],
                [
                    "global run queue ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "which can hold runnable Gs temporarily, but eventually, "
                ],
                [
                    "Gs must move into some P’s run queue ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "to be scheduled and executed."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-805a-9518-c3667fa8870b",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-8044-b04b-dd8c5581306d",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Key Relationships",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8007-be28-d57774308d67",
            "type": "bulleted_list",
            "richText": [
                [
                    "Each "
                ],
                [
                    "P",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ":"
                ]
            ],
            "children": [
                {
                    "id": "24224eb1-ed54-801b-8518-f4929b064dfd",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Holds a "
                        ],
                        [
                            "queue of runnable goroutines",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            "."
                        ]
                    ]
                },
                {
                    "id": "24224eb1-ed54-809f-8da0-ee9c476b8a3d",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Needs an "
                        ],
                        [
                            "M to execute one goroutine at a time",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            "."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24224eb1-ed54-80f7-b463-c70308cba873",
            "type": "bulleted_list",
            "richText": [
                [
                    "Each "
                ],
                [
                    "M",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ":"
                ]
            ],
            "children": [
                {
                    "id": "24224eb1-ed54-809d-9e7d-ecd3cfb04640",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Runs "
                        ],
                        [
                            "one P at a time",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            "."
                        ]
                    ]
                },
                {
                    "id": "24224eb1-ed54-808f-9136-fcfef887f999",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Is "
                        ],
                        [
                            "scheduled on one CPU core at a time",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            ", but may be moved across cores by the OS."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24224eb1-ed54-80a9-a118-e925453617ad",
            "type": "bulleted_list",
            "richText": [
                [
                    "Number of "
                ],
                [
                    "Ms",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ":"
                ]
            ],
            "children": [
                {
                    "id": "24224eb1-ed54-8084-ae1d-d19b57b0fa57",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Can exceed CPU cores."
                        ]
                    ]
                },
                {
                    "id": "24224eb1-ed54-80d7-b1ec-ec347824914f",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Is "
                        ],
                        [
                            "automatically managed",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            " by Go runtime."
                        ]
                    ]
                },
                {
                    "id": "24224eb1-ed54-8017-96be-da1b49786d69",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "No need to manage them in code at any point."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24224eb1-ed54-80ab-b3ef-fea9268b92b2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Number of "
                ],
                [
                    "Ps",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ":"
                ]
            ],
            "children": [
                {
                    "id": "24224eb1-ed54-8011-a372-ca394aaabdaf",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Set using "
                        ],
                        [
                            "GOMAXPROCS",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ],
                        [
                            " in code."
                        ]
                    ]
                },
                {
                    "id": "24224eb1-ed54-8065-84a4-d7dc8c33f744",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Should be "
                        ],
                        [
                            "≤ number of logical CPU cores",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            " for optimal performance."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24224eb1-ed54-8027-a593-e4c8073b4ad3",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-80be-a117-df84fe8f0090",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Execution Flow"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8054-9f05-eac0ead86c6d",
            "type": "numbered_list",
            "richText": [
                [
                    "Each "
                ],
                [
                    "P",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " holds a queue of "
                ],
                [
                    "runnable Gs",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8004-8559-df61a026a8bc",
            "type": "numbered_list",
            "richText": [
                [
                    "An "
                ],
                [
                    "M",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " is attached to a "
                ],
                [
                    "P",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " and picks a "
                ],
                [
                    "G",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " from P’s queue to run."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80f2-98f7-fef970c650ed",
            "type": "numbered_list",
            "richText": [
                [
                    "That "
                ],
                [
                    "G",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " is now "
                ],
                [
                    "running",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " — it is not in any queue."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8073-b787-d933ef9421ae",
            "type": "numbered_list",
            "richText": [
                [
                    "When G "
                ],
                [
                    "completes",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", M picks another G from P’s queue."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80cd-b2d3-ec8823618ffb",
            "type": "numbered_list",
            "richText": [
                [
                    "When G "
                ],
                [
                    "blocks",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " (e.g. I/O, syscall, channel), behavior depends on the type of block."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8035-a6c7-fd40f85ae025",
            "type": "divider"
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
            "id": "24224eb1-ed54-80dd-b8ec-f38f5404455b",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Case 1: Go-Managed Block"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-801a-9e0b-e9de67aa1a69",
            "type": "text",
            "richText": [
                [
                    "Examples: "
                ],
                [
                    "channel receive/send",
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
                    "time.Sleep",
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
                    "sync.Mutex",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8077-bd85-c140fac54f8d",
            "type": "bulleted_list",
            "richText": [
                [
                    "G tries an operation that cannot complete immediately."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8078-adf4-c5970608231b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go runtime "
                ],
                [
                    "parks G",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " — it is no longer runnable. (Based on scenario, G is parked in appropriate place, which is manage by Go, not required to get into that.)"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8046-a2a5-e1e572d72857",
            "type": "bulleted_list",
            "richText": [
                [
                    "G is "
                ],
                [
                    "not in any P",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " and "
                ],
                [
                    "not assigned to any M",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8093-936f-e68374aed237",
            "type": "bulleted_list",
            "richText": [
                [
                    "M is free",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", and "
                ],
                [
                    "P remains attached",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " to M."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80f8-b5f3-e98cf8359581",
            "type": "bulleted_list",
            "richText": [
                [
                    "M immediately picks another runnable G from P’s queue."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80d9-8bda-f72f26b423b6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Now, the "
                ],
                [
                    "blocking condition is eventually resolved",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80e4-9fc8-d014f6dd21d6",
            "type": "bulleted_list",
            "richText": [
                [
                    "The "
                ],
                [
                    "Go runtime detects this",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " and marks the parked G as "
                ],
                [
                    "runnable",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80fe-863b-d7bd49d5c2a6",
            "type": "bulleted_list",
            "richText": [
                [
                    "The G is placed into:"
                ]
            ],
            "children": [
                {
                    "id": "24224eb1-ed54-805f-ba1e-fbcae9fc2b93",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Either the "
                        ],
                        [
                            "local run queue",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            " of a P (if that P made the G runnable), or"
                        ]
                    ]
                },
                {
                    "id": "24224eb1-ed54-8002-9f99-d405697335f5",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "The "
                        ],
                        [
                            "global run queue",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            " if no specific P is involved."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24224eb1-ed54-805d-a697-f99ef7186d6b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Eventually, a "
                ],
                [
                    "P picks this G",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " from a run queue."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8004-af32-c652c9402bb4",
            "type": "bulleted_list",
            "richText": [
                [
                    "An M running that P",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " starts executing G."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80c1-b62c-c51a7a80b581",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Case 2: Syscall or External Blocking"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-804e-95fc-f890be2be04e",
            "type": "text",
            "richText": [
                [
                    "Examples: file I/O, network call, database query"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-800c-b4cc-fb3927ac2165",
            "type": "bulleted_list",
            "richText": [
                [
                    "G invokes a syscall and "
                ],
                [
                    "cannot proceed",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " until the OS finishes the call."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80b4-8af5-ef520531cefa",
            "type": "bulleted_list",
            "richText": [
                [
                    "The "
                ],
                [
                    "M becomes blocked",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " at the OS level, and the associated G too."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8069-9594-d70618f17566",
            "type": "bulleted_list",
            "richText": [
                [
                    "P is detached",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " from the blocked M so it can keep running other Gs."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80e3-b780-efb0e5ecb30a",
            "type": "bulleted_list",
            "richText": [
                [
                    "A "
                ],
                [
                    "new M",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " is assigned to P to continue scheduling."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8049-b62a-c742d3b17c2a",
            "type": "bulleted_list",
            "richText": [
                [
                    "The "
                ],
                [
                    "blocked G and M are held aside",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " by the runtime — neither is active."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80ec-9f24-d849797b3918",
            "type": "bulleted_list",
            "richText": [
                [
                    "Once the syscall completes:"
                ]
            ],
            "children": [
                {
                    "id": "24224eb1-ed54-8091-b287-eecb7019f58d",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Execution "
                        ],
                        [
                            "does not resume immediately on the same G and M",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            "."
                        ]
                    ]
                },
                {
                    "id": "24224eb1-ed54-808d-a346-c4accba01f77",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "G is "
                        ],
                        [
                            "marked runnable",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            " and placed in a run queue of some P or global queue."
                        ]
                    ]
                },
                {
                    "id": "24224eb1-ed54-809f-a36b-d7eba13d5e8c",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "M is now "
                        ],
                        [
                            "unblocked",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            " and becomes "
                        ],
                        [
                            "idle, ",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            "and will now be attached to some P."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24224eb1-ed54-80d9-a885-c697c1488029",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-8049-ba71-c01db64f566c",
            "type": "sub_header",
            "richText": [
                [
                    "Clarifying Terminology: Blocked vs Suspended"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8037-950c-c1e7d44293b7",
            "type": "text",
            "richText": [
                [
                    "These terms are interchangeably used, although have a subtle difference."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8045-a7de-e50d2dad50e1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Blocked: ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "Generally",
                    [
                        [
                            "b"
                        ],
                        [
                            "i"
                        ]
                    ]
                ],
                [
                    " used when the G goes into execution but the execution pauses for some reason."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80b6-9a79-ef791f6206b9",
            "type": "bulleted_list",
            "richText": [
                [
                    "Suspended: ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "Generally ",
                    [
                        [
                            "b"
                        ],
                        [
                            "i"
                        ]
                    ]
                ],
                [
                    "used when G is in queue, and ready to be executed."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8036-9c11-df16207852ca",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-8093-ba0c-cb39eb9ce5b4",
            "type": "sub_header",
            "richText": [
                [
                    "Goroutine States and Where It Resides"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8002-bece-e6db2a4b5f91",
            "type": "table",
            "children": [
                {
                    "id": "24224eb1-ed54-80b9-a84b-f471574964de",
                    "type": "table_row",
                    "cells": {
                        "]`d@": [
                            [
                                "Goroutine State"
                            ]
                        ],
                        "Yjt>": [
                            [
                                "Description"
                            ]
                        ],
                        ":wDT": [
                            [
                                "Held In"
                            ]
                        ],
                        "bu]^": [
                            [
                                "M State"
                            ]
                        ],
                        "P>[\\": [
                            [
                                "P State"
                            ]
                        ]
                    }
                },
                {
                    "id": "24224eb1-ed54-8050-95e9-d1be589f1473",
                    "type": "table_row",
                    "cells": {
                        "]`d@": [
                            [
                                "Runnable",
                                [
                                    [
                                        "b"
                                    ]
                                ]
                            ]
                        ],
                        "Yjt>": [
                            [
                                "Ready to be scheduled"
                            ]
                        ],
                        ":wDT": [
                            [
                                "P's run queue"
                            ]
                        ],
                        "bu]^": [
                            [
                                "Idle or running"
                            ]
                        ],
                        "P>[\\": [
                            [
                                "Active"
                            ]
                        ]
                    }
                },
                {
                    "id": "24224eb1-ed54-80de-8229-c701784e0c96",
                    "type": "table_row",
                    "cells": {
                        "]`d@": [
                            [
                                "Running",
                                [
                                    [
                                        "b"
                                    ]
                                ]
                            ]
                        ],
                        "Yjt>": [
                            [
                                "Actively executing"
                            ]
                        ],
                        ":wDT": [
                            [
                                "Not in any queue"
                            ]
                        ],
                        "bu]^": [
                            [
                                "Running"
                            ]
                        ],
                        "P>[\\": [
                            [
                                "Active"
                            ]
                        ]
                    }
                },
                {
                    "id": "24224eb1-ed54-80e3-955c-e1c1ff67e180",
                    "type": "table_row",
                    "cells": {
                        "]`d@": [
                            [
                                "Blocked (Go-managed)",
                                [
                                    [
                                        "b"
                                    ]
                                ]
                            ]
                        ],
                        "Yjt>": [
                            [
                                "Blocked on channel, sleep, lock"
                            ]
                        ],
                        ":wDT": [
                            [
                                "Go's internal wait list"
                            ]
                        ],
                        "bu]^": [
                            [
                                "Free to run"
                            ]
                        ],
                        "P>[\\": [
                            [
                                "Active"
                            ]
                        ]
                    }
                },
                {
                    "id": "24224eb1-ed54-8068-ab90-f7c3f3fa6773",
                    "type": "table_row",
                    "cells": {
                        "]`d@": [
                            [
                                "Blocked (Syscall)",
                                [
                                    [
                                        "b"
                                    ]
                                ]
                            ]
                        ],
                        "Yjt>": [
                            [
                                "Waiting on syscall or external I/O"
                            ]
                        ],
                        ":wDT": [
                            [
                                "Not runnable, not in queue"
                            ]
                        ],
                        "bu]^": [
                            [
                                "Blocked"
                            ]
                        ],
                        "P>[\\": [
                            [
                                "Detached from that M"
                            ]
                        ]
                    }
                },
                {
                    "id": "24224eb1-ed54-8015-a903-e2186b2480ce",
                    "type": "table_row",
                    "cells": {
                        "]`d@": [
                            [
                                "Terminated",
                                [
                                    [
                                        "b"
                                    ]
                                ]
                            ]
                        ],
                        "Yjt>": [
                            [
                                "Finished execution"
                            ]
                        ],
                        ":wDT": [
                            [
                                "Nowhere"
                            ]
                        ],
                        "bu]^": [
                            [
                                "Free to run"
                            ]
                        ],
                        "P>[\\": [
                            [
                                "Active or inactive"
                            ]
                        ]
                    }
                }
            ],
            "columnOrder": [
                "]`d@",
                "Yjt>",
                ":wDT",
                "bu]^",
                "P>[\\"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false
        },
        {
            "id": "24224eb1-ed54-80ac-95d8-e39eddc90acb",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-803e-a409-d90b94efb129",
            "type": "sub_header",
            "richText": [
                [
                    "Understanding GMP Knowledge with an example:"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80c7-9778-e6b0bb7bb8d4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Lets say a Go server is crawling thousands of sites using thousands of Goroutines."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80b7-8d40-d9885f3f1ed8",
            "type": "bulleted_list",
            "richText": [
                [
                    "Some sites are very slow to respond or never respond."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-804d-8b2a-e2ef4cbe09b5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Over time, the app:"
                ]
            ],
            "children": [
                {
                    "id": "24224eb1-ed54-80ac-8f96-ee723b841ac1",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Consumes more and more memory."
                        ]
                    ]
                },
                {
                    "id": "24224eb1-ed54-8007-ac88-c392e86b9a48",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Stops producing output."
                        ]
                    ]
                },
                {
                    "id": "24224eb1-ed54-80fd-897e-c96e5cf369c8",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "CPU usage is very low even though many goroutines are active."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24224eb1-ed54-8094-a228-f5962f02932b",
            "type": "sub_header",
            "richText": [
                [
                    "What is really happening internally (when many goroutines are used)",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80d3-be53-e9da969555a3",
            "type": "numbered_list",
            "richText": [
                [
                    "A large number of goroutines are started to crawl websites."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80d5-810c-d64b383386c6",
            "type": "numbered_list",
            "richText": [
                [
                    "Some websites respond slowly or never respond at all."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8000-b46f-c570c3391453",
            "type": "numbered_list",
            "richText": [
                [
                    "When a goroutine is blocked (e.g. waiting for a network response), the "
                ],
                [
                    "M (machine thread)",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " running it also becomes blocked."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-803e-af1c-c50922e1043a",
            "type": "numbered_list",
            "richText": [
                [
                    "The "
                ],
                [
                    "P (processor)",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " that scheduled this goroutine is still linked to the blocked M, so the P becomes idle, unable to schedule more goroutines until it gets a free M."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80fe-8666-c97cfb96d3e8",
            "type": "numbered_list",
            "richText": [
                [
                    "To keep things running, the Go runtime creates new Ms (threads) and assigns them to Ps."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80af-8616-eadee6fc9a76",
            "type": "numbered_list",
            "richText": [
                [
                    "As more goroutines block, more Ms may be created."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-809c-ae4b-dba118975258",
            "type": "numbered_list",
            "richText": [
                [
                    "Eventually:"
                ]
            ],
            "children": [
                {
                    "id": "24224eb1-ed54-8003-92c2-db55959f3e8b",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "The number of Ms grows large."
                        ]
                    ]
                },
                {
                    "id": "24224eb1-ed54-80fb-b6f5-d8967ba92636",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Many Ps are associated with blocked Ms and cannot schedule new goroutines."
                        ]
                    ]
                },
                {
                    "id": "24224eb1-ed54-8055-a884-c9bffd164d3c",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Many goroutines are still queued and waiting to run."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24224eb1-ed54-80c7-ae6a-f32c6342fe85",
            "type": "numbered_list",
            "richText": [
                [
                    "As a result:"
                ]
            ],
            "children": [
                {
                    "id": "24224eb1-ed54-8068-8263-e0e38c1b82e9",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "CPU usage remains low (because most threads are blocked and not doing actual work)."
                        ]
                    ]
                },
                {
                    "id": "24224eb1-ed54-80a6-a850-f4148bfb92cc",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Memory usage increases (due to too many goroutines and threads being held)."
                        ]
                    ]
                },
                {
                    "id": "24224eb1-ed54-80df-960c-e1abf2e76ea6",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Program appears slow or stuck, even though many goroutines are active."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24224eb1-ed54-8069-9a5b-da1f223d1e68",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-8051-ae69-e9637081ffc4",
            "type": "sub_header",
            "richText": [
                [
                    "What is confusing in this situation",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8040-9695-f81af20cd9b8",
            "type": "numbered_list",
            "richText": [
                [
                    "Goroutines are supposed to be lightweight and efficient, but the system feels slow."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80f2-bb07-f066529390e9",
            "type": "numbered_list",
            "richText": [
                [
                    "Metrics show hundreds or thousands of goroutines, but almost nothing is being processed."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80d3-831a-d06d592492cf",
            "type": "numbered_list",
            "richText": [
                [
                    "CPU usage is low even though the system is “busy.”"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-806d-a507-c4c726291332",
            "type": "numbered_list",
            "richText": [
                [
                    "The actual issue is with "
                ],
                [
                    "goroutine scheduling",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", not with the number of goroutines themselves."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8084-9766-f3cbd13702e9",
            "type": "numbered_list",
            "richText": [
                [
                    "Without understanding how Ps and Ms interact, the root cause of slowness is hard to identify."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80aa-a7bb-e0aa87ab9a83",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-8026-9792-c4948f00ac6d",
            "type": "sub_header",
            "richText": [
                [
                    "What GMP knowledge clarifies",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8013-a491-f3e5a86778ee",
            "type": "numbered_list",
            "richText": [
                [
                    "Goroutines are managed by the Go scheduler using a model involving G (goroutine), M (machine thread), and P (processor)."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8016-8d0f-d03d0918af2a",
            "type": "numbered_list",
            "richText": [
                [
                    "P",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " holds a queue of goroutines and is responsible for scheduling them."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80d2-a996-cb4d4df67c46",
            "type": "numbered_list",
            "richText": [
                [
                    "M",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " is the actual OS thread that runs the goroutines."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8050-b9f9-f936f2f52999",
            "type": "numbered_list",
            "richText": [
                [
                    "Each P needs one running M to execute its scheduled goroutines.",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80b0-96c9-ff1736d28d2e",
            "type": "numbered_list",
            "richText": [
                [
                    "When a goroutine blocks, its M is also blocked",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", and P cannot continue until it gets another M."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-800a-a511-e5ac5cc15d4f",
            "type": "numbered_list",
            "richText": [
                [
                    "Blocking operations (e.g. slow I/O, syscalls)",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " can cause Ps to become idle."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-803c-bbe8-fa85e610e052",
            "type": "numbered_list",
            "richText": [
                [
                    "Go creates new Ms when needed, but this increases thread count and memory usage."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80d7-8421-c3f0a93f0bac",
            "type": "numbered_list",
            "richText": [
                [
                    "More goroutines ≠ more concurrency",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " — concurrency is limited by how many Ps are active and how well Ms are utilized."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8038-8853-d84ace77f817",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-8013-aca1-ec5c448568a6",
            "type": "sub_header",
            "richText": [
                [
                    "When GMP-level understanding becomes necessary",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80f0-8935-c95818987efe",
            "type": "numbered_list",
            "richText": [
                [
                    "A program creates and manages many concurrent goroutines."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80fb-8567-cfb8ee31a913",
            "type": "numbered_list",
            "richText": [
                [
                    "The system shows:"
                ]
            ],
            "children": [
                {
                    "id": "24224eb1-ed54-808d-8452-e9cf65bd0665",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "High memory usage."
                        ]
                    ]
                },
                {
                    "id": "24224eb1-ed54-8061-807d-fc14d2e5a783",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Low CPU utilization."
                        ]
                    ]
                },
                {
                    "id": "24224eb1-ed54-80dd-b180-ea5b4feda943",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Many goroutines in a waiting or blocked state."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24224eb1-ed54-80c2-aa95-c43acc134022",
            "type": "numbered_list",
            "richText": [
                [
                    "Performance does not scale even with added goroutines."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80bd-a58f-dee1f7f8ea35",
            "type": "numbered_list",
            "richText": [
                [
                    "Debugging is needed for:"
                ]
            ],
            "children": [
                {
                    "id": "24224eb1-ed54-80a2-9c11-fd93208fe8b1",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Goroutine leaks."
                        ]
                    ]
                },
                {
                    "id": "24224eb1-ed54-807a-a332-e626fe373148",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Scheduler bottlenecks."
                        ]
                    ]
                },
                {
                    "id": "24224eb1-ed54-80ea-a296-d74b746c2c40",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Deadlocks or starvation (goroutines waiting indefinitely)."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24224eb1-ed54-804f-86c7-e7ab99ba3faa",
            "type": "numbered_list",
            "richText": [
                [
                    "External tools or logs show excessive number of threads or goroutines but very low actual work being done."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-807b-afac-e549ebe32768",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-806b-802c-c54395032799",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Important clarifications:"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-809f-974a-eff420582024",
            "type": "bulleted_list",
            "richText": [
                [
                    "P is not blocked.",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " Only the "
                ],
                [
                    "M",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " running the blocking goroutine may get blocked, based on type of block."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80fc-8a1d-f701c9678481",
            "type": "bulleted_list",
            "richText": [
                [
                    "Goroutines in P’s queue stay where they are.",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-802d-a285-d3e883c2b816",
            "type": "bulleted_list",
            "richText": [
                [
                    "The Go scheduler ensures the P always has an available M to keep executing its goroutines."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80d9-b0e5-fdd29d36299c",
            "type": "bulleted_list",
            "richText": [
                [
                    "So goroutines are "
                ],
                [
                    "not transferred to another P.",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80cf-8394-db10a33b407e",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-80c6-9e73-d8865639bae8",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Exception:"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80db-bbdd-e026a26d136b",
            "type": "text",
            "richText": [
                [
                    "Only "
                ],
                [
                    "stealing",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " happens:"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80d6-9f18-f7971bb3d9e7",
            "type": "bulleted_list",
            "richText": [
                [
                    "If one P is idle and another P has many goroutines in its queue, "
                ],
                [
                    "work stealing",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " may occur."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80b6-9062-fb5c3dbe0090",
            "type": "bulleted_list",
            "richText": [
                [
                    "This allows "
                ],
                [
                    "load balancing",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", but it’s not triggered by blocking — it’s for fairness."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8017-bf22-dc3a2ba47f46",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-8022-89c7-c983cc7ebdac",
            "type": "text"
        }
    ]
} as const satisfies GoNote;

export default note;
