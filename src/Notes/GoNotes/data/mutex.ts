/* Go study notes, refined from the original Notion import. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24e24eb1-ed54-80ef-92fc-e43daf413d10",
    "slug": "mutex",
    "title": "Mutex",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "b5788241-9408-5b06-b92e-fa6743bbfef5",
            "type": "text",
            "richText": [
                [
                    "A "
                ],
                [
                    "sync.Mutex",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " gives exclusive access to shared data. Use the same mutex for every conflicting access, including reads while another goroutine may write."
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-8093-a847-fc517a36cc0b",
            "type": "sub_header",
            "richText": [
                [
                    "Basic Pattern"
                ]
            ]
        },
        {
            "id": "0fe8aecc-4986-5a9a-97f4-1032375e979e",
            "type": "code",
            "richText": [
                [
                    "// mu is a shared sync.Mutex.\nmu.Lock()\ndefer mu.Unlock()\n// Read or update the protected data before this function returns."
                ]
            ],
            "language": "Go"
        },
        {
            "id": "c437bc74-f697-5779-a9cd-8c209559d385",
            "type": "text",
            "richText": [
                [
                    "Lock",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " waits until it can acquire the lock. "
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
                    " releases it. A deferred unlock runs at function return, so use a short helper function if a loop needs a separate lock scope for each iteration."
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-80f5-9f45-d0321260a4de",
            "type": "sub_header",
            "richText": [
                [
                    "Key Properties"
                ]
            ]
        },
        {
            "id": "6a9ce3a6-5ae1-50c9-afb5-06f1428209f1",
            "type": "bulleted_list",
            "richText": [
                [
                    "The zero value is an unlocked, usable mutex. Do not copy it after first use, including by copying a struct that contains it."
                ]
            ]
        },
        {
            "id": "e41c3e07-8f78-57bd-ab85-c791a4d4578e",
            "type": "bulleted_list",
            "richText": [
                [
                    "A mutex is not recursive. Calling "
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
                    " again while the same goroutine holds it blocks unless another goroutine releases it."
                ]
            ]
        },
        {
            "id": "62abe873-592b-5a83-b75c-808f0148e534",
            "type": "bulleted_list",
            "richText": [
                [
                    "Unlocking an unlocked mutex is a runtime error. A locked mutex is not tied to one goroutine, although keeping lock and unlock together is usually easier to reason about."
                ]
            ]
        },
        {
            "id": "742ca8a5-0161-5319-8e43-7119f0fd86ba",
            "type": "sub_header",
            "richText": [
                [
                    "Protect a Counter"
                ]
            ]
        },
        {
            "id": "431f2719-c8cd-5ae4-a284-10868df374b5",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n)\n\nvar (\n    counter int\n    mu sync.Mutex\n)\n\nfunc increment(wg *sync.WaitGroup) {\n    defer wg.Done()\n    mu.Lock()\n    defer mu.Unlock()\n    counter++\n}\n\nfunc main() {\n    var wg sync.WaitGroup\n    for i := 0; i < 5; i++ {\n        wg.Add(1)\n        go increment(&wg)\n    }\n    wg.Wait()\n    fmt.Println(\"Final counter:\", counter)\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "97bff678-2ebe-536b-893d-18d0c52d5541",
            "type": "text",
            "richText": [
                [
                    "Expected output: Final counter: 5. The mutex serializes updates; the WaitGroup makes the final read happen after every worker finishes. Removing the mutex introduces a data race even if a particular run still prints 5."
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-8093-998e-dc4ecd22fd66",
            "type": "sub_header",
            "richText": [
                [
                    "Lock Scope and Alternatives"
                ]
            ]
        },
        {
            "id": "44b327aa-2a0e-5316-a799-7c6c6cacc97a",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use a consistent order when acquiring several locks. Opposite lock orders can create a cycle of waiting."
                ]
            ]
        },
        {
            "id": "411661e4-55da-5496-a9e3-f2f39792fa9c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Avoid holding a lock during unrelated slow operations. Waiting for work that itself needs the lock can deadlock."
                ]
            ]
        },
        {
            "id": "f37097e0-136b-5288-a427-fa8259df532d",
            "type": "bulleted_list",
            "richText": [
                [
                    "Measure contention before choosing a more complex design. More locks or a different primitive do not guarantee faster execution."
                ]
            ]
        },
        {
            "id": "f53c4855-edb9-5da6-81ef-68a458faee8f",
            "type": "text",
            "richText": [
                [
                    "Alternatives and their contracts: "
                ],
                [
                    "RWMutex for parallel reads",
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
                    "Channels for communication and ownership transfer",
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
                    "WaitGroup for completion",
                    [
                        [
                            "a",
                            "#/notes/go/workgroups"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "112b9cc1-1bbe-540b-8bef-2dc74d843d02",
            "type": "text",
            "richText": [
                [
                    "For an independent numeric counter, "
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
                    " can be appropriate. It does not automatically protect an invariant involving several fields."
                ]
            ]
        },
        {
            "id": "ee37dddb-c78a-5932-8191-39587eb80aad",
            "type": "text",
            "richText": [
                [
                    "Sources: "
                ],
                [
                    "Mutex contract",
                    [
                        [
                            "a",
                            "https://pkg.go.dev/sync#Mutex"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "Mutex source",
                    [
                        [
                            "a",
                            "https://go.dev/src/sync/mutex.go"
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
