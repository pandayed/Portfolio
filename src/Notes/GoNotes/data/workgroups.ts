/* Copied from the Workgroups page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-804e-98a7-ed95eaa0b4c2",
    "slug": "workgroups",
    "title": "Workgroups",
    "updatedOn": "2025-07-31",
    "blocks": [
        {
            "id": "24124eb1-ed54-8050-8180-f2bd6f093b67",
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
                    " is used to wait for a "
                ],
                [
                    "collection of goroutines",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " to finish."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80a8-8d95-e62e7702c0ee",
            "type": "text",
            "richText": [
                [
                    "It’s a thread-safe counter managed by the main goroutine and "
                ],
                [
                    "shared across multiple goroutines",
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
            "id": "24124eb1-ed54-80af-b406-d48cddbc4b49",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-8090-b198-df32ddb32ff3",
            "type": "sub_header",
            "richText": [
                [
                    "When to Use"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8065-bc35-dbab8e037474",
            "type": "bulleted_list",
            "richText": [
                [
                    "You are "
                ],
                [
                    "launching goroutines",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-807e-8df5-d64228c03d2f",
            "type": "bulleted_list",
            "richText": [
                [
                    "You want the "
                ],
                [
                    "main goroutine to wait",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " until "
                ],
                [
                    "all launched goroutines finish",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-809c-a817-d623a7bc1af5",
            "type": "bulleted_list",
            "richText": [
                [
                    "You don’t want to use channels just for synchronization"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80af-b104-da1eb1b4ac8a",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-8029-a0cb-cfddbe78e5e9",
            "type": "table",
            "children": [
                {
                    "id": "24124eb1-ed54-806e-b199-cec04601acd1",
                    "type": "table_row",
                    "cells": {
                        "?f:F": [
                            [
                                "Purpose"
                            ]
                        ],
                        "nPc@": [
                            [
                                "Method"
                            ]
                        ]
                    }
                },
                {
                    "id": "24124eb1-ed54-8072-8c16-d405bd9abf33",
                    "type": "table_row",
                    "cells": {
                        "?f:F": [
                            [
                                "Increases the counter by N (usually 1 per goroutine)"
                            ]
                        ],
                        "nPc@": [
                            [
                                "Add(int)",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ]
                    }
                },
                {
                    "id": "24124eb1-ed54-80b2-93bd-e7bbdad8e9b1",
                    "type": "table_row",
                    "cells": {
                        "?f:F": [
                            [
                                "Decreases the counter by 1 (usually at end of each goroutine)"
                            ]
                        ],
                        "nPc@": [
                            [
                                "Done()",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ]
                    }
                },
                {
                    "id": "24124eb1-ed54-80ff-9577-fcc2caf26868",
                    "type": "table_row",
                    "cells": {
                        "?f:F": [
                            [
                                "Blocks until counter becomes 0 (i.e., all "
                            ],
                            [
                                "Done()",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ],
                            [
                                "s called)"
                            ]
                        ],
                        "nPc@": [
                            [
                                "Wait()",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ]
                    }
                }
            ],
            "columnOrder": [
                "nPc@",
                "?f:F"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false
        },
        {
            "id": "24124eb1-ed54-80e1-aa91-f6c4add51ec0",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-806c-8e90-cfb739b9aa7f",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport (\n\t\"fmt\"\n\t\"sync\"\n)\n\nfunc worker(id int, wg *sync.WaitGroup) {\n\tdefer wg.Done() // Decrease counter when goroutine finishes\n\tfmt.Printf(\"Worker %d starting\\n\", id)\n\t// Simulate work\n\tfmt.Printf(\"Worker %d done\\n\", id)\n}\n\nfunc main() {\n\tvar wg sync.WaitGroup\n\n\tfor i := 1; i <= 3; i++ {\n\t\twg.Add(1) // Increase counter before launching goroutine\n\t\tgo worker(i, &wg)\n\t}\n\n\twg.Wait() // Wait until all workers are done\n\tfmt.Println(\"All workers completed\")\n}\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-8048-9dcb-d188964e8fec",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-8098-958f-fd48496aee40",
            "type": "sub_header",
            "richText": [
                [
                    "Execution Flow"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-802e-953d-f6f8d476bd87",
            "type": "numbered_list",
            "richText": [
                [
                    "Add(N)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " increases counter to N"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-808a-9224-d3e53a1bf2a0",
            "type": "numbered_list",
            "richText": [
                [
                    "Each goroutine runs and eventually calls "
                ],
                [
                    "Done()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " → counter -= 1"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80ca-88f3-c90cfbd9ea8b",
            "type": "numbered_list",
            "richText": [
                [
                    "Wait()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " blocks until counter == 0"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80e5-92fe-fd3bd4749317",
            "type": "numbered_list",
            "richText": [
                [
                    "Program continues"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80de-b972-e171c60896ca",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-8095-a0fe-d140b84f111d",
            "type": "sub_header",
            "richText": [
                [
                    "Best Practices"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8076-9c49-f1dfff61f652",
            "type": "bulleted_list",
            "richText": [
                [
                    "Always "
                ],
                [
                    "call ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "Add(1)",
                    [
                        [
                            "b"
                        ],
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " before",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " starting the goroutine."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80ee-a388-dfdb331823bd",
            "type": "bulleted_list",
            "richText": [
                [
                    "Always "
                ],
                [
                    "call ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "Done()",
                    [
                        [
                            "b"
                        ],
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " exactly once",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " per goroutine. Use "
                ],
                [
                    "defer",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " immediately inside the goroutine."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8055-9cfe-c72afc7c313b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Pass "
                ],
                [
                    "WaitGroup",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " by "
                ],
                [
                    "pointer",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", never by value."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-806d-a0f6-c72bab648ed6",
            "type": "bulleted_list",
            "richText": [
                [
                    "WaitGroup",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " should "
                ],
                [
                    "not be reused",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " before the previous "
                ],
                [
                    ".Wait()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " has completed."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8012-99cf-dd980fbb9206",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-8092-8af0-d3d9c8b4a662",
            "type": "sub_header",
            "richText": [
                [
                    "Common Pitfalls"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-800a-a450-e5f667618b1a",
            "type": "table",
            "children": [
                {
                    "id": "24124eb1-ed54-80cf-a42a-f0379c4fd312",
                    "type": "table_row",
                    "cells": {
                        "Czzb": [
                            [
                                "Problem"
                            ]
                        ],
                        "Id=M": [
                            [
                                "Mistake"
                            ]
                        ]
                    }
                },
                {
                    "id": "24124eb1-ed54-80bb-b013-df233ed23f05",
                    "type": "table_row",
                    "cells": {
                        "Czzb": [
                            [
                                "Risk: goroutine may run before counter is incremented"
                            ]
                        ],
                        "Id=M": [
                            [
                                "wg.Add",
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
                                "go",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ]
                    }
                },
                {
                    "id": "24124eb1-ed54-80b3-ad35-c72d4e58cd1b",
                    "type": "table_row",
                    "cells": {
                        "Czzb": [
                            [
                                "Wait()",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ],
                            [
                                " blocks forever (deadlock)"
                            ]
                        ],
                        "Id=M": [
                            [
                                "Forgetting "
                            ],
                            [
                                "Done()",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ]
                    }
                },
                {
                    "id": "24124eb1-ed54-8070-b86e-dc1754f169c9",
                    "type": "table_row",
                    "cells": {
                        "Czzb": [
                            [
                                "Each goroutine modifies a copy → no sync"
                            ]
                        ],
                        "Id=M": [
                            [
                                "Passing "
                            ],
                            [
                                "WaitGroup",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ],
                            [
                                " by value"
                            ]
                        ]
                    }
                },
                {
                    "id": "24124eb1-ed54-80b7-8a69-def38e6ad162",
                    "type": "table_row",
                    "cells": {
                        "Czzb": [
                            [
                                "Race conditions and undefined behavior"
                            ]
                        ],
                        "Id=M": [
                            [
                                "Reusing WaitGroup too early"
                            ]
                        ]
                    }
                }
            ],
            "columnOrder": [
                "Id=M",
                "Czzb"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false
        },
        {
            "id": "24124eb1-ed54-80b1-8d56-cb0b2cd00d47",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-8042-abb6-f40eacb710fd",
            "type": "sub_header",
            "richText": [
                [
                    "Can WaitGroups return results?"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-800f-9166-d7d2a2e6f3d5",
            "type": "text",
            "richText": [
                [
                    "No, WaitGroups are for "
                ],
                [
                    "sync only",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", not "
                ],
                [
                    "data sharing",
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
            "id": "24124eb1-ed54-801f-bfb0-e2c20cfd2d8f",
            "type": "text",
            "richText": [
                [
                    "To collect results from goroutines, use "
                ],
                [
                    "channels",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " alongside WaitGroups:"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80c8-ad3b-d7a90b314fcd",
            "type": "code",
            "richText": [
                [
                    "results := make(chan int, 3)\nvar wg sync.WaitGroup\n\nfor i := 0; i < 3; i++ {\n    wg.Add(1)\n    go func(n int) {\n        defer wg.Done()\n        results <- n * n\n    }(i)\n}\n\nwg.Wait()\nclose(results)\n\nfor r := range results {\n    fmt.Println(r)\n}\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-80e4-87dd-da26494fae3a",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-8001-bc68-caa9be9bcdcd",
            "type": "sub_header",
            "richText": [
                [
                    "Summary"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8044-aae8-df3936f24a24",
            "type": "table",
            "children": [
                {
                    "id": "24124eb1-ed54-802c-b5a3-d9068e144c26",
                    "type": "table_row",
                    "cells": {
                        ":vlG": [
                            [
                                "Concept"
                            ]
                        ],
                        "pUSw": [
                            [
                                "Quick Recap"
                            ]
                        ]
                    }
                },
                {
                    "id": "24124eb1-ed54-8060-8449-c035af45f265",
                    "type": "table_row",
                    "cells": {
                        ":vlG": [
                            [
                                "Purpose"
                            ]
                        ],
                        "pUSw": [
                            [
                                "Wait for goroutines to finish"
                            ]
                        ]
                    }
                },
                {
                    "id": "24124eb1-ed54-8066-9412-d50df017cf3e",
                    "type": "table_row",
                    "cells": {
                        ":vlG": [
                            [
                                "Key Methods"
                            ]
                        ],
                        "pUSw": [
                            [
                                "Add(n)",
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
                                "Done()",
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
                                "Wait()",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ]
                    }
                },
                {
                    "id": "24124eb1-ed54-8085-b2a8-f9ec1db851be",
                    "type": "table_row",
                    "cells": {
                        ":vlG": [
                            [
                                "Thread-safe?"
                            ]
                        ],
                        "pUSw": [
                            [
                                "Yes"
                            ]
                        ]
                    }
                },
                {
                    "id": "24124eb1-ed54-8021-b727-f214c76bbd4f",
                    "type": "table_row",
                    "cells": {
                        ":vlG": [
                            [
                                "Use Cases"
                            ]
                        ],
                        "pUSw": [
                            [
                                "Parallel tasks where main must wait"
                            ]
                        ]
                    }
                },
                {
                    "id": "24124eb1-ed54-80e7-865d-d65e01059a3e",
                    "type": "table_row",
                    "cells": {
                        ":vlG": [
                            [
                                "Not for"
                            ]
                        ],
                        "pUSw": [
                            [
                                "Passing data (use channels)"
                            ]
                        ]
                    }
                },
                {
                    "id": "24124eb1-ed54-8094-b036-c339910f61f4",
                    "type": "table_row",
                    "cells": {
                        ":vlG": [
                            [
                                "Danger"
                            ]
                        ],
                        "pUSw": [
                            [
                                "Deadlocks if "
                            ],
                            [
                                "Done()",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ],
                            [
                                " is missing"
                            ]
                        ]
                    }
                }
            ],
            "columnOrder": [
                ":vlG",
                "pUSw"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false
        },
        {
            "id": "24124eb1-ed54-804d-b7c7-c707c2c175a4",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-8090-96f6-e7914766bac3",
            "type": "text"
        }
    ]
} as const satisfies GoNote;

export default note;
