/* Copied from the Mutex page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24e24eb1-ed54-80ef-92fc-e43daf413d10",
    "slug": "mutex",
    "title": "Mutex",
    "updatedOn": "2025-08-14",
    "blocks": [
        {
            "id": "24f24eb1-ed54-8017-9394-c69ca41aaa59",
            "type": "bulleted_list",
            "richText": [
                [
                    "A "
                ],
                [
                    "mutex",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " (mutual exclusion lock) is used to protect shared data from "
                ],
                [
                    "concurrent access",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " by multiple goroutines."
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-80df-aab5-f3a59abfab19",
            "type": "bulleted_list",
            "richText": [
                [
                    "Without a mutex, simultaneous reads/writes can cause "
                ],
                [
                    "data races",
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
            "id": "24f24eb1-ed54-80d5-a2e4-e93f4dfb7034",
            "type": "divider"
        },
        {
            "id": "24f24eb1-ed54-8008-a330-e9666caada59",
            "type": "code",
            "richText": [
                [
                    "import \"sync\"\n\nvar mu sync.Mutex"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24f24eb1-ed54-80cd-8df6-d53ecc92997c",
            "type": "bulleted_list",
            "richText": [
                [
                    "sync.Mutex",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is a struct type with "
                ],
                [
                    "two main methods",
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
                    "id": "24f24eb1-ed54-80ec-8b83-c7fc9f6b1e76",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Lock()",
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
                            " – Blocks until the mutex is acquired."
                        ]
                    ]
                },
                {
                    "id": "24f24eb1-ed54-8081-9d80-ce6541ef8cb8",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Unlock()",
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
                            " – Releases the mutex; must be called after "
                        ],
                        [
                            "Lock()",
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
            ]
        },
        {
            "id": "24f24eb1-ed54-800c-ab65-e7d8d2abfb96",
            "type": "divider"
        },
        {
            "id": "24f24eb1-ed54-8093-a847-fc517a36cc0b",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Basic Pattern",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-80bb-bf58-f458b526c0d7",
            "type": "code",
            "richText": [
                [
                    "mu.Lock()\n// Critical section: read/write shared data here\nmu.Unlock()\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24f24eb1-ed54-802d-89a4-f685e2ff2217",
            "type": "bulleted_list",
            "richText": [
                [
                    "Always ensure "
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
                    " is called — use "
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
                    " immediately after locking:"
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-8040-b69f-de5b79a39627",
            "type": "code",
            "richText": [
                [
                    "mu.Lock()\ndefer mu.Unlock()"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24f24eb1-ed54-8012-8ded-ee2873e5aa38",
            "type": "divider"
        },
        {
            "id": "24f24eb1-ed54-80f5-9f45-d0321260a4de",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Key Properties",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-807c-9697-ec263e3a84c5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Exclusive lock",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ": Only one goroutine can hold the lock at a time."
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-80af-87e9-f3deb1e58ae8",
            "type": "bulleted_list",
            "richText": [
                [
                    "Not recursive",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ": A goroutine cannot lock the same mutex twice without unlocking; doing so causes a deadlock."
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-80f3-98b9-e854e8f03f9b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Zero value is usable",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ": No "
                ],
                [
                    "new",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " or "
                ],
                [
                    "init",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " required before first use."
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-8065-8e78-ca1d36ad8bdb",
            "type": "bulleted_list",
            "richText": [
                [
                    "Copying is unsafe",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ": Never copy a mutex after first use."
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-80ff-8454-cc18833ced5b",
            "type": "divider"
        },
        {
            "id": "24f24eb1-ed54-80be-b3d5-fe6a0ac8e0f7",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n)\n\nvar (\n    counter int\n    mu      sync.Mutex\n)\n\nfunc increment(wg *sync.WaitGroup) {\n    defer wg.Done()\n\n    mu.Lock()\n    defer mu.Unlock() // ensures unlock happens even if function exits early\n\n    counter++\n}\n\nfunc main() {\n    var wg sync.WaitGroup\n\n    for i := 0; i < 5; i++ {\n        wg.Add(1)\n        go increment(&wg)\n    }\n\n    wg.Wait()\n    fmt.Println(\"Final counter:\", counter) // would print 5\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24f24eb1-ed54-80ab-a275-d1cf165b5927",
            "type": "text",
            "richText": [
                [
                    "Here’s why:"
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-8052-9588-eaaeed29287e",
            "type": "bulleted_list",
            "richText": [
                [
                    "counter",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " starts at "
                ],
                [
                    "0",
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
            "id": "24f24eb1-ed54-802e-982d-e0de6356f72a",
            "type": "bulleted_list",
            "richText": [
                [
                    "We launch "
                ],
                [
                    "5 goroutines",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", each calling "
                ],
                [
                    "increment()",
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
            "id": "24f24eb1-ed54-800e-9f26-c6f2a169d4bc",
            "type": "bulleted_list",
            "richText": [
                [
                    "The mutex ensures "
                ],
                [
                    "only one goroutine increments at a time",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", so no increments are lost."
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-80c7-9058-e3d12306af7b",
            "type": "bulleted_list",
            "richText": [
                [
                    "After all goroutines finish, "
                ],
                [
                    "counter",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " has been incremented exactly 5 times."
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-808e-91d9-eedb49c87989",
            "type": "text",
            "richText": [
                [
                    "If we removed the mutex, you might see results like "
                ],
                [
                    "3",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " or "
                ],
                [
                    "4",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " due to "
                ],
                [
                    "race conditions",
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
            "id": "24f24eb1-ed54-803b-8a55-dab01103e785",
            "type": "divider"
        },
        {
            "id": "24f24eb1-ed54-8084-81cb-e5c8626435f2",
            "type": "sub_sub_header",
            "richText": [
                [
                    "When to Use",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-808c-a076-f5c9ba1a54eb",
            "type": "bulleted_list",
            "richText": [
                [
                    "When "
                ],
                [
                    "multiple goroutines",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " read/write "
                ],
                [
                    "shared state",
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
            "id": "24f24eb1-ed54-8096-85a9-f6b45d54c068",
            "type": "bulleted_list",
            "richText": [
                [
                    "When you need "
                ],
                [
                    "simple, full mutual exclusion",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " (not partial or read-only)."
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-8001-a856-edf1992a6a67",
            "type": "divider"
        },
        {
            "id": "24f24eb1-ed54-8088-90af-f02720b07001",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Alternatives",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-8061-a1db-db39408daf58",
            "type": "bulleted_list",
            "richText": [
                [
                    "sync.RWMutex",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " – Allows multiple readers but one writer."
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-808d-9553-fab363dc5dcc",
            "type": "bulleted_list",
            "richText": [
                [
                    "Channels",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " – Can also coordinate access without explicit locks."
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-8028-9df0-e0ffbe2e83de",
            "type": "bulleted_list",
            "richText": [
                [
                    "Atomic operations",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " – For simple numeric counters ("
                ],
                [
                    "sync/atomic",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ")."
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-80d5-acd6-fe5b0200dcd7",
            "type": "divider"
        },
        {
            "id": "24f24eb1-ed54-8093-998e-dc4ecd22fd66",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Common Pitfalls",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-802f-bbbf-e64b0f09769d",
            "type": "bulleted_list",
            "richText": [
                [
                    "Deadlock",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " – Forgetting to "
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
                    " or locking in inconsistent order between goroutines."
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-8064-a4c3-f3ba47806433",
            "type": "bulleted_list",
            "richText": [
                [
                    "Lock contention",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " – Too much locking can slow down performance."
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-802d-a664-fb3b73897c61",
            "type": "bulleted_list",
            "richText": [
                [
                    "Overprotecting",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " – Locking more data than necessary reduces concurrency."
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-8099-821f-cb8839ae1197",
            "type": "divider"
        }
    ]
} as const satisfies GoNote;

export default note;
