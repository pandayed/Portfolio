/* Go study notes, refined from the original Notion import. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24f24eb1-ed54-8044-8f81-f2d7e87bf938",
    "slug": "rwmutex",
    "title": "RWMutex",
    "updatedOn": "2026-10-05",
    "blocks": [
        {
            "id": "898ef37b-7753-5066-8d54-0d78e54eb831",
            "type": "bulleted_list",
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
                    " allows several readers or one writer to access protected data."
                ]
            ]
        },
        {
            "id": "2d315b9f-e519-5f0c-96b3-bf4baa7e33df",
            "type": "bulleted_list",
            "richText": [
                [
                    "Code holding a read lock must not change the protected data."
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
                                "Read shared data without changing it."
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
                                "Change shared data while other readers and writers wait."
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
                    "The zero value is ready to use."
                ]
            ]
        },
        {
            "id": "0f338b15-6f65-5e93-b1c8-a5075f56b904",
            "type": "bulleted_list",
            "richText": [
                [
                    "Do not copy an RWMutex after first use."
                ]
            ]
        },
        {
            "id": "4bea81f0-d890-562f-9bb5-065efc6774e3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Several readers can hold the read lock together."
                ]
            ]
        },
        {
            "id": "e2c03beb-86a5-5ed7-bbd9-ec225bbf3167",
            "type": "bulleted_list",
            "richText": [
                [
                    "If a writer waits behind those readers, new readers also wait."
                ]
            ]
        },
        {
            "id": "e97803e0-b5dd-5d1b-959f-ec2f38c2ab1a",
            "type": "bulleted_list",
            "richText": [
                [
                    "New readers can enter after that writer gets and releases the write lock."
                ]
            ]
        },
        {
            "id": "0a800d04-b0ab-56bc-94ea-493226aa33b2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Do not take a read lock again while already holding a read lock."
                ]
            ]
        },
        {
            "id": "22f1d41c-8df6-55e4-a880-06fa93d8c365",
            "type": "bulleted_list",
            "richText": [
                [
                    "The second "
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
                    " may wait for a pending writer."
                ]
            ]
        },
        {
            "id": "9197bc8b-4248-503f-a7f1-3a2db6c335dd",
            "type": "bulleted_list",
            "richText": [
                [
                    "That writer cannot continue until the first read lock is released. This can deadlock."
                ]
            ]
        },
        {
            "id": "43a8ea20-5ea6-5ebb-9ac4-953c357fc867",
            "type": "bulleted_list",
            "richText": [
                [
                    "You cannot change a held read lock directly into a write lock, or a write lock into a read lock."
                ]
            ]
        },
        {
            "id": "a1c59eca-472a-50a3-9a71-5747c12193ea",
            "type": "bulleted_list",
            "richText": [
                [
                    "Release the lock before taking the other kind of lock."
                ]
            ]
        },
        {
            "id": "287fde6f-db96-572b-94c5-7450009d7b8c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Check the data again after taking the new lock. Another goroutine may have changed it while you were unlocked."
                ]
            ]
        },
        {
            "id": "d8638bb7-9636-5a93-8075-574d4b340b18",
            "type": "bulleted_list",
            "richText": [
                [
                    "Pair "
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
                    " with "
                ],
                [
                    "RUnlock",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", and "
                ],
                [
                    "Lock",
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
                    "Unlock",
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
            "id": "0dd6e46c-3e4d-507b-824b-7f323c44866c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Taking the write lock again while holding it makes the goroutine wait."
                ]
            ]
        },
        {
            "id": "07f69cf0-2c3f-508e-804f-eae95b83df74",
            "type": "bulleted_list",
            "richText": [
                [
                    "Taking a read lock twice does not always deadlock, but it is unsafe when a writer may be waiting."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "The writer closes "
                ],
                [
                    "written",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " after its write has finished."
                ]
            ]
        },
        {
            "id": "b836d14e-1c51-5d76-bdb2-17b6ff8c3961",
            "type": "bulleted_list",
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
                    " waits for that signal before starting the readers."
                ]
            ]
        },
        {
            "id": "93c8206f-e862-51a2-a3b2-c21f19b4a645",
            "type": "bulleted_list",
            "richText": [
                [
                    "Sleeping for a fixed time would not guarantee that the write has finished."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Output: Wrote: foo => bar first, then three Read: foo => bar lines."
                ]
            ]
        },
        {
            "id": "854a0644-af53-5a21-8500-8ab1fe15b7b6",
            "type": "bulleted_list",
            "richText": [
                [
                    "The readers may run together. Their order is not fixed."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Consider an RWMutex when reads can run together without changing data."
                ]
            ]
        },
        {
            "id": "1e3b3123-0bc9-591f-be3a-424543d9ff91",
            "type": "bulleted_list",
            "richText": [
                [
                    "It is not always faster than a Mutex."
                ]
            ]
        },
        {
            "id": "ddb34b1b-0287-5f65-9290-49c84063a908",
            "type": "bulleted_list",
            "richText": [
                [
                    "Measure the actual reads, writes and lock waiting before choosing."
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
