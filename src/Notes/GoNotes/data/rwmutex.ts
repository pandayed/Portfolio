/* Go study notes, refined from the original Notion import. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24f24eb1-ed54-8044-8f81-f2d7e87bf938",
    "slug": "rwmutex",
    "title": "RWMutex",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "898ef37b-7753-5066-8d54-0d78e54eb831",
            "type": "text",
            "richText": [
                [
                    "A "
                ],
                [
                    "sync.RWMutex",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " protects shared state with either several readers or one exclusive writer. Readers must not modify the protected state."
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-8024-bdfe-f4ed78e6ff7c",
            "type": "sub_header",
            "richText": [
                [
                    "Read and Write Locks"
                ]
            ]
        },
        {
            "id": "c3006745-7e37-5387-8090-0a1dd2383c8b",
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
                    "id": "665d093e-bde1-5c5b-9e42-abe2f75f853b",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Operation"
                            ]
                        ],
                        "column-1": [
                            [
                                "Matching release"
                            ]
                        ],
                        "column-2": [
                            [
                                "Use"
                            ]
                        ]
                    }
                },
                {
                    "id": "fec74906-abb1-5fe4-8c4e-d37daa5733b7",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "RLock()",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "column-1": [
                            [
                                "RUnlock()",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "column-2": [
                            [
                                "Read shared state without changing it."
                            ]
                        ]
                    }
                },
                {
                    "id": "7d115cff-4bd7-5ed3-97a3-ada71401544b",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Lock()",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "column-1": [
                            [
                                "Unlock()",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "column-2": [
                            [
                                "Change shared state with exclusive access."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "24f24eb1-ed54-80ba-80a6-e70b6187fc06",
            "type": "sub_header",
            "richText": [
                [
                    "Key Properties"
                ]
            ]
        },
        {
            "id": "30e8fa85-ba79-595c-8dd2-ab7bd5ce3e85",
            "type": "bulleted_list",
            "richText": [
                [
                    "The zero value is usable. Do not copy an RWMutex after first use."
                ]
            ]
        },
        {
            "id": "4bea81f0-d890-562f-9bb5-065efc6774e3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Readers can hold the lock together. When a writer is waiting behind existing readers, new read-lock attempts block until that writer acquires and releases the lock."
                ]
            ]
        },
        {
            "id": "0a800d04-b0ab-56bc-94ea-493226aa33b2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Do not recursively acquire read locks: a pending writer can cause a second "
                ],
                [
                    "RLock",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " to block while the first still prevents the writer from proceeding."
                ]
            ]
        },
        {
            "id": "43a8ea20-5ea6-5ebb-9ac4-953c357fc867",
            "type": "bulleted_list",
            "richText": [
                [
                    "Read locks cannot be upgraded to write locks, and write locks cannot be downgraded to read locks. Release first, then reacquire and recheck any assumption that may have changed."
                ]
            ]
        },
        {
            "id": "d8638bb7-9636-5a93-8075-574d4b340b18",
            "type": "bulleted_list",
            "richText": [
                [
                    "Pair each lock with the matching unlock. Reacquiring the write lock while holding it blocks; repeated read locking is not accurately described as always deadlocking."
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-8088-8f1a-d9b70b8069bf",
            "type": "sub_header",
            "richText": [
                [
                    "Example"
                ]
            ]
        },
        {
            "id": "ca654946-225d-52d5-a9bb-ced150243d8c",
            "type": "text",
            "richText": [
                [
                    "This complete example waits for the write to finish before launching the readers. An explicit completion channel provides the ordering; a sleep would not."
                ]
            ]
        },
        {
            "id": "1bc215d8-a73f-5d45-93a9-96ddecc5bd0b",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n)\n\nvar (\n    data = make(map[string]string)\n    rw sync.RWMutex\n)\n\nfunc write(key, value string) {\n    rw.Lock()\n    defer rw.Unlock()\n    data[key] = value\n    fmt.Println(\"Wrote:\", key, \"=>\", value)\n}\n\nfunc read(key string, wg *sync.WaitGroup) {\n    defer wg.Done()\n    rw.RLock()\n    defer rw.RUnlock()\n    fmt.Println(\"Read:\", key, \"=>\", data[key])\n}\n\nfunc main() {\n    written := make(chan struct{})\n    go func() {\n        write(\"foo\", \"bar\")\n        close(written)\n    }()\n    <-written\n\n    var wg sync.WaitGroup\n    for i := 0; i < 3; i++ {\n        wg.Add(1)\n        go read(\"foo\", &wg)\n    }\n    wg.Wait()\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "2b67da4b-5b65-5695-9571-253f43032ecd",
            "type": "text",
            "richText": [
                [
                    "Expected output: Wrote: foo => bar first, then three Read: foo => bar lines. The readers may run concurrently; their scheduling order is unspecified."
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-8035-bd5a-ea405a33ec06",
            "type": "sub_header",
            "richText": [
                [
                    "When to Use"
                ]
            ]
        },
        {
            "id": "649f7560-8cc0-5824-bb17-5c3534ad13b9",
            "type": "text",
            "richText": [
                [
                    "Consider an RWMutex when reads can safely overlap and the workload has enough read work to benefit. It is not automatically faster than a Mutex; measure the actual access pattern and contention."
                ]
            ]
        },
        {
            "id": "f727ddca-aaa7-5e53-b903-0cf399fd2156",
            "type": "text",
            "richText": [
                [
                    "For exclusive access and lock-order rules: "
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
                    "."
                ]
            ]
        },
        {
            "id": "7b800728-0d4b-523f-a844-03677a0cba4f",
            "type": "text",
            "richText": [
                [
                    "Sources: "
                ],
                [
                    "RWMutex contract",
                    [
                        [
                            "a",
                            "https://pkg.go.dev/sync#RWMutex"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "RWMutex source",
                    [
                        [
                            "a",
                            "https://go.dev/src/sync/rwmutex.go"
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
