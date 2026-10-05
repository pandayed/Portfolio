/* Go study notes, refined from the original Notion import. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-80ff-bb0c-d5185ec41a80",
    "slug": "gmp-model",
    "title": "GMP Model",
    "updatedOn": "2026-10-05",
    "blocks": [
        {
            "id": "c4e86aee-2baf-5bf6-828a-2c85297b5519",
            "type": "bulleted_list",
            "richText": [
                [
                    "G, M and P are names used inside the Go runtime."
                ]
            ]
        },
        {
            "id": "1e57a9b1-942f-51cd-b7d2-c4e1fc113f75",
            "type": "bulleted_list",
            "richText": [
                [
                    "The runtime manages goroutines and chooses which ones run."
                ]
            ]
        },
        {
            "id": "09e18337-495e-5057-87fc-a28ba456b4a8",
            "type": "bulleted_list",
            "richText": [
                [
                    "The Go language does not promise particular queues, thread counts or scheduling order."
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
                                "A goroutine’s work and current execution state."
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
                                "Runs code. OS means operating system. The OS chooses which CPU runs the thread."
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
                                "Keeps the scheduling and memory-allocation state needed to run Go code."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "ed906c25-7c3e-5a2c-881d-f173414fbb99",
            "type": "bulleted_list",
            "richText": [
                [
                    "An M needs a P to run user Go code."
                ]
            ]
        },
        {
            "id": "1860c342-9963-5784-a4a9-65cb5eeb51cf",
            "type": "bulleted_list",
            "richText": [
                [
                    "One P supports one running goroutine at a time."
                ]
            ]
        },
        {
            "id": "ded06468-f88e-546e-92c8-6f4cd03a4f22",
            "type": "bulleted_list",
            "richText": [
                [
                    "The runtime manages the Ms."
                ]
            ]
        },
        {
            "id": "f1056190-c819-5bec-bf7e-28161b64c710",
            "type": "bulleted_list",
            "richText": [
                [
                    "There can be more Ms than Ps. Some threads may be idle or waiting inside an OS call."
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
                                "Ready to run, but waiting for the runtime to choose it."
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
                                "Executing code now."
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
                                "Waiting for an event, such as a send, lock release or timer."
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
                                "Making an OS call, or waiting for that call to finish."
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
                                "The goroutine has returned or exited."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "796df7c5-ed7d-5a10-a268-94ce98bcac01",
            "type": "bulleted_list",
            "richText": [
                [
                    "Local run queues hold ready goroutines for individual Ps. The global run queue is shared."
                ]
            ]
        },
        {
            "id": "70bf2f1c-4b61-528b-b4f5-b60d0a664907",
            "type": "bulleted_list",
            "richText": [
                [
                    "Work stealing means an idle P takes runnable work from another P."
                ]
            ]
        },
        {
            "id": "3438ce52-b42a-58ff-bfde-b01192dc8d31",
            "type": "bulleted_list",
            "richText": [
                [
                    "The runtime also finds work when timers expire or network operations become ready."
                ]
            ]
        },
        {
            "id": "c5695ad6-7a0a-54b7-b8b7-b5cc4ef5b3b7",
            "type": "bulleted_list",
            "richText": [
                [
                    "A goroutine does not always need to enter a particular P’s queue before it runs."
                ]
            ]
        },
        {
            "id": "94a7e6cd-98b2-5705-a3a7-a3bfac65cc68",
            "type": "bulleted_list",
            "richText": [
                [
                    "Queue choices and wake-up steps can change between Go versions."
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
                                "What happens"
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
                                "Channel, mutex or sleep wait"
                            ]
                        ],
                        "column-1": [
                            [
                                "The runtime can park G, meaning it pauses G until the needed event. Other runnable work can run."
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
                                "Network input/output (I/O) handled by the poller"
                            ]
                        ],
                        "column-1": [
                            [
                                "The poller waits for network readiness and wakes G. Each connection does not need its own blocked OS thread."
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
                                "M may wait inside the OS call. The runtime can let another M use its P."
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
                                "M needs a P to run Go code again. It may resume G directly, or put G back into scheduling when no P is available."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "81a548d6-2e84-5e47-bbb3-37e7ac9240f1",
            "type": "bulleted_list",
            "richText": [
                [
                    "An HTTP request or database query does not always block an OS thread."
                ]
            ]
        },
        {
            "id": "91e8426c-3da0-5330-92e7-d6919c64f914",
            "type": "bulleted_list",
            "richText": [
                [
                    "The behavior depends on the operation, driver, OS and Go runtime."
                ]
            ]
        },
        {
            "id": "f0623480-9efb-542f-8f91-af119945fda2",
            "type": "bulleted_list",
            "richText": [
                [
                    "A waiting goroutine does not prove that its P or the other work in its queue is stuck."
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
            "type": "bulleted_list",
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
                    " sets the number of Ps."
                ]
            ]
        },
        {
            "id": "a5e445b2-c9e1-5ece-b932-30b1bd20b64a",
            "type": "bulleted_list",
            "richText": [
                [
                    "It limits how much user Go code can run at the same time."
                ]
            ]
        },
        {
            "id": "363d0027-14cd-5c50-8782-9dd7ce8da1ed",
            "type": "bulleted_list",
            "richText": [
                [
                    "It does not limit the total number of goroutines, OS threads or waiting I/O operations."
                ]
            ]
        },
        {
            "id": "afa58221-52f1-5b97-946f-23defa85d19d",
            "type": "code",
            "richText": [
                [
                    "current := runtime.GOMAXPROCS(0) // read without changing the setting\nfmt.Println(current)"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "d16e8407-6f5f-5d3c-83ad-9b949ce7387f",
            "type": "bulleted_list",
            "richText": [
                [
                    "The default depends on the Go version and the environment."
                ]
            ]
        },
        {
            "id": "e60adffd-ac0e-50d6-966f-fc3d672c75bd",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go 1.25+ uses the logical CPU count and CPU affinity. CPU affinity limits which CPUs the program may use."
                ]
            ]
        },
        {
            "id": "d43b8037-d6a2-5100-9a74-ef3f7a3d83ad",
            "type": "bulleted_list",
            "richText": [
                [
                    "On Linux, it also considers CPU limits set by cgroups. A cgroup controls the resources available to a process."
                ]
            ]
        },
        {
            "id": "ee3c2fb2-a3a4-58c0-9499-37d2d0a1559b",
            "type": "bulleted_list",
            "richText": [
                [
                    "The runtime can update the default when available CPU resources change."
                ]
            ]
        },
        {
            "id": "80938dc5-f86c-5f61-bf50-4c84edf394f3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Programs declaring Go 1.24 or earlier normally disable these new defaults and updates through compatibility settings. Those settings can be overridden."
                ]
            ]
        },
        {
            "id": "8a995b63-d467-5855-8cb3-072274a10716",
            "type": "bulleted_list",
            "richText": [
                [
                    "Setting the "
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
                    " environment variable or calling "
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
                    " with "
                ],
                [
                    "n > 0",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " turns off automatic updates."
                ]
            ]
        },
        {
            "id": "18217b23-1726-5aba-96a5-6ad2b0db409c",
            "type": "bulleted_list",
            "richText": [
                [
                    "On Go 1.25+, "
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
                    " restores the runtime default and its updates."
                ]
            ]
        },
        {
            "id": "1c04d25a-9696-518c-9e01-42aa78ddd5bb",
            "type": "bulleted_list",
            "richText": [
                [
                    "Start with the runtime default."
                ]
            ]
        },
        {
            "id": "bcf8631e-f58f-5b35-b1a7-e8236800e29a",
            "type": "bulleted_list",
            "richText": [
                [
                    "Measure the actual workload before changing it."
                ]
            ]
        },
        {
            "id": "85573f30-1d41-5714-b9cf-03ae8dbed367",
            "type": "bulleted_list",
            "richText": [
                [
                    "Keeping the value at or below the logical CPU count does not guarantee the best performance."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "A crawler may have many goroutines, low CPU use and growing memory use."
                ]
            ]
        },
        {
            "id": "47bacb99-bedf-5753-9a3b-71c3827839d1",
            "type": "bulleted_list",
            "richText": [
                [
                    "These symptoms alone do not prove a scheduler problem."
                ]
            ]
        },
        {
            "id": "408071f1-4c3b-5d0e-bc09-4e213f2a65ea",
            "type": "bulleted_list",
            "richText": [
                [
                    "Work may be waiting for slow servers, connection limits, a full results channel or a lock."
                ]
            ]
        },
        {
            "id": "8d1ddb50-2071-580e-854d-1a8dc4ed8cc3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Some work may never stop because it does not check cancellation."
                ]
            ]
        },
        {
            "id": "b8e89a1a-2ab6-5dc6-8ab6-de34c5bba3c5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Look at goroutine stack traces to find where work is waiting."
                ]
            ]
        },
        {
            "id": "96c15fa6-f361-540f-ae77-77fe8c679664",
            "type": "bulleted_list",
            "richText": [
                [
                    "Compare several snapshots to see which waits never end."
                ]
            ]
        },
        {
            "id": "90b57820-af8f-5d61-b0c0-a878258edeb6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use execution traces and profiles to inspect waiting, CPU work and scheduling."
                ]
            ]
        },
        {
            "id": "58cb8485-7657-5f85-96a9-a93ddbb8f67e",
            "type": "bulleted_list",
            "richText": [
                [
                    "Count OS threads separately from goroutines."
                ]
            ]
        },
        {
            "id": "55ec1624-c881-501f-bbcf-c3f80b28168c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Limit how many requests run at once."
                ]
            ]
        },
        {
            "id": "7baa0f1c-254b-5300-8514-22119623424c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Give requests a timeout or a way to stop."
                ]
            ]
        },
        {
            "id": "35754985-bae6-5739-bd50-33741dae24d7",
            "type": "bulleted_list",
            "richText": [
                [
                    "More goroutines cannot make a slow server process requests faster."
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
