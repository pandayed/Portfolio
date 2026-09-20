/* Copied from the Goroutines Blocking: Causes & Recovery page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-80be-9eeb-c1699387a64d",
    "slug": "goroutines-blocking-causes-recovery",
    "title": "Goroutines Blocking: Causes & Recovery",
    "updatedOn": "2025-08-10",
    "blocks": [
        {
            "id": "24024eb1-ed54-809a-9628-d6f9aa6bab2e",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Blocking on Channel Operations",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-804b-bbab-ed2205c03288",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Sending to Unbuffered Channel",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-807c-aaa2-caa4f2b9e9e3",
            "type": "code",
            "richText": [
                [
                    "ch := make(chan int)\nch <- 10  // blocks until a receiver is ready"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-807b-af9f-e5f3c1caa578",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Receiving from Empty Channel",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80c9-8152-d453a4746251",
            "type": "code",
            "richText": [
                [
                    "val := <-ch  // blocks until a sender sends"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-8051-8610-dd01ce65a6d3",
            "type": "text",
            "richText": [
                [
                    "Recovery:",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8072-8f1f-fbdafc429382",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    "buffered channels",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ": "
                ],
                [
                    "make(chan int, 1)",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80b4-94b5-cf396e84aea4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
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
                    " with a "
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
                    " for non-blocking:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8033-b12d-eada5b450a9b",
            "type": "code",
            "richText": [
                [
                    "select {\ncase ch <- val:\n    // sent\ndefault:\n    // skip or retry later\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-80d0-9bea-e4b94355fce1",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-809d-8ede-e7ee9802f8da",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Blocking on ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "sync.WaitGroup",
                    [
                        [
                            "b"
                        ],
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-809c-a095-f15cacfd5312",
            "type": "code",
            "richText": [
                [
                    "wg.Add(1)\ngo func() {\n\tdefer wg.Done()\n\t// work\n}()\nwg.Wait()  // blocks until Done is called"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-8035-85f7-c6b1538ae629",
            "type": "text",
            "richText": [
                [
                    "Risk:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " If "
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
                    " isn’t called, "
                ],
                [
                    "Wait()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " blocks forever."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80fc-b16f-c5effdb45f71",
            "type": "text",
            "richText": [
                [
                    "Recovery:",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80f9-8dab-eb0bf6c98fbd",
            "type": "bulleted_list",
            "richText": [
                [
                    "Always call "
                ],
                [
                    "Add()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " "
                ],
                [
                    "before",
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
            "id": "24024eb1-ed54-8010-af30-fe73ebc42c3c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
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
                    " inside the goroutine."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-801b-9775-f90798ecc241",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-80ee-9ae4-da623206d4ad",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Blocking on Mutex (",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "sync.Mutex",
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
                    ")",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80b9-9c64-c5b745de6ee0",
            "type": "code",
            "richText": [
                [
                    "mu.Lock()   // blocks if another goroutine holds the lock"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-80cd-b64e-f78f4f0764d5",
            "type": "text",
            "richText": [
                [
                    "Risk:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " If "
                ],
                [
                    "Unlock()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is not called, other goroutines block forever."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8069-9d96-c4e66bdc4efb",
            "type": "text",
            "richText": [
                [
                    "Recovery:",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80e9-bcae-f5f8fdad3d88",
            "type": "bulleted_list",
            "richText": [
                [
                    "Always "
                ],
                [
                    "defer mu.Unlock()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " after locking."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-806a-b8aa-e8652c681eb6",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-80b2-a4ac-dff287bab030",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Deadlocks",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8051-95b6-caf954497102",
            "type": "text",
            "richText": [
                [
                    "Occurs when all goroutines are blocked and none can proceed."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80ca-8b18-ffdec3175288",
            "type": "text",
            "richText": [
                [
                    "Example:",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80bf-958d-c92c04e62af9",
            "type": "code",
            "richText": [
                [
                    "ch := make(chan int)\nch <- 1  // deadlock if no receiver exists"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-807d-af54-c1a880334916",
            "type": "text",
            "richText": [
                [
                    "Recovery:",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80b0-b5a6-fa7730b81a63",
            "type": "bulleted_list",
            "richText": [
                [
                    "Ensure at least one goroutine is "
                ],
                [
                    "always ready",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " to receive/send."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-800d-bb69-ddeead50a844",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use tools like:"
                ]
            ],
            "children": [
                {
                    "id": "24024eb1-ed54-80c4-a5a5-c51cde6d3c4f",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "go vet",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ]
                    ]
                },
                {
                    "id": "24024eb1-ed54-8050-bca1-c69296d95d39",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "go run -race",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24024eb1-ed54-80a8-b87d-eeb65d12355e",
            "type": "bulleted_list",
            "richText": [
                [
                    "Structure communication clearly."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8082-a7a1-f1d33adcbcfd",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-806d-9fcb-d309ad8210dc",
            "type": "sub_sub_header",
            "richText": [
                [
                    "CPU Starvation (Not True Blocking)",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-808f-b1a0-e3b3541499ef",
            "type": "text",
            "richText": [
                [
                    "Caused by:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8041-b031-ccf1599feb15",
            "type": "bulleted_list",
            "richText": [
                [
                    "Infinite loops"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8024-a09e-fb180ce3c4b8",
            "type": "bulleted_list",
            "richText": [
                [
                    "Long computation"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80be-81d0-e7533c69fcef",
            "type": "bulleted_list",
            "richText": [
                [
                    "No yield to scheduler"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80c6-b864-f16f46bca4d9",
            "type": "text",
            "richText": [
                [
                    "Recovery:",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-801d-bb1c-e8a4cb36c9a3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Split into smaller tasks."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-805d-856e-fa7f08bd69ca",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
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
                    " to yield."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8017-9d49-f04d378d422d",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    "context.Context",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " for timeout/cancellation control."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80b0-b3e6-c39942d3e05b",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-80ed-bdf7-e70f92d7b45b",
            "type": "text"
        }
    ]
} as const satisfies GoNote;

export default note;
