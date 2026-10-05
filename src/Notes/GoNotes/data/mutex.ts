/* Go study notes, refined from the original Notion import. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24e24eb1-ed54-80ef-92fc-e43daf413d10",
    "slug": "mutex",
    "title": "Mutex",
    "updatedOn": "2026-10-05",
    "blocks": [
        {
            "id": "b5788241-9408-5b06-b92e-fa6743bbfef5",
            "type": "bulleted_list",
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
                    " lets one goroutine at a time access protected data."
                ]
            ]
        },
        {
            "id": "83bd969d-cb3e-58d0-b862-b64780408919",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use the same mutex for all accesses that might conflict, including reads while another goroutine writes."
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
            "type": "bulleted_list",
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
                    " waits until the mutex is available and then locks it."
                ]
            ]
        },
        {
            "id": "86f70a37-a878-5015-808a-f6aa87018b15",
            "type": "bulleted_list",
            "richText": [
                [
                    "Unlock",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " releases the mutex."
                ]
            ]
        },
        {
            "id": "c78409c3-71bd-566b-8c89-aeba7aa213a3",
            "type": "bulleted_list",
            "richText": [
                [
                    "defer mu.Unlock()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " releases it when the function returns."
                ]
            ]
        },
        {
            "id": "97ef2db5-4cd4-5f5a-81a1-484d7e8446c1",
            "type": "bulleted_list",
            "richText": [
                [
                    "In a loop, use a small helper function if each iteration needs to release the lock before the next iteration."
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
                    "A mutex works from its zero value. It starts unlocked."
                ]
            ]
        },
        {
            "id": "2db5ee5b-3a4c-55f0-8881-25552a03da30",
            "type": "bulleted_list",
            "richText": [
                [
                    "Do not copy it after first use."
                ]
            ]
        },
        {
            "id": "07a5ba2a-cff1-5394-be51-35070d1492ca",
            "type": "bulleted_list",
            "richText": [
                [
                    "Copying a struct that contains the mutex also copies the mutex."
                ]
            ]
        },
        {
            "id": "e41c3e07-8f78-57bd-ab85-c791a4d4578e",
            "type": "bulleted_list",
            "richText": [
                [
                    "A mutex is not recursive. It does not allow the holder to lock it again."
                ]
            ]
        },
        {
            "id": "f014a0f7-9868-59d3-a8ff-05300f848dfe",
            "type": "bulleted_list",
            "richText": [
                [
                    "The second "
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
                    " waits unless another goroutine unlocks it."
                ]
            ]
        },
        {
            "id": "62abe873-592b-5a83-b75c-808f0148e534",
            "type": "bulleted_list",
            "richText": [
                [
                    "Unlocking an unlocked mutex is a runtime error."
                ]
            ]
        },
        {
            "id": "cf80aaf3-3640-5cc3-8a62-4a62b8ea0766",
            "type": "bulleted_list",
            "richText": [
                [
                    "A mutex is not tied to the goroutine that locked it. Another goroutine can unlock it."
                ]
            ]
        },
        {
            "id": "11868453-c138-5482-ad9b-d2ca954cf199",
            "type": "bulleted_list",
            "richText": [
                [
                    "Keeping lock and unlock together is usually easier to understand."
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
            "type": "bulleted_list",
            "richText": [
                [
                    "Output: Final counter: 5."
                ]
            ]
        },
        {
            "id": "1e31953a-7972-5879-8105-1fc5c37ea684",
            "type": "bulleted_list",
            "richText": [
                [
                    "The mutex allows only one update at a time."
                ]
            ]
        },
        {
            "id": "117e0745-b797-5f5a-9307-c93c50e48345",
            "type": "bulleted_list",
            "richText": [
                [
                    "The WaitGroup makes "
                ],
                [
                    "main",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " wait for every worker before reading the final counter."
                ]
            ]
        },
        {
            "id": "785cc59b-224a-529c-b78a-735490f94484",
            "type": "bulleted_list",
            "richText": [
                [
                    "Removing the mutex causes a data race, even if a run happens to print 5."
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
                    "When using several locks, acquire them in a consistent order."
                ]
            ]
        },
        {
            "id": "c1993bc0-ca9b-5163-b3f1-e0db34df3414",
            "type": "bulleted_list",
            "richText": [
                [
                    "Taking locks in opposite orders can leave goroutines waiting on each other."
                ]
            ]
        },
        {
            "id": "411661e4-55da-5496-a9e3-f2f39792fa9c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Avoid holding a lock during unrelated slow work."
                ]
            ]
        },
        {
            "id": "6681a081-5e25-5d33-92ff-d0bd571f2a3f",
            "type": "bulleted_list",
            "richText": [
                [
                    "Waiting for work that needs the same lock can deadlock."
                ]
            ]
        },
        {
            "id": "f37097e0-136b-5288-a427-fa8259df532d",
            "type": "bulleted_list",
            "richText": [
                [
                    "Lock contention means goroutines wait for a lock that others are using."
                ]
            ]
        },
        {
            "id": "b78aca18-f4bd-5f2e-b2e7-263becfcc4cf",
            "type": "bulleted_list",
            "richText": [
                [
                    "Measure that waiting before changing the locking design."
                ]
            ]
        },
        {
            "id": "5cbbbee6-ec25-5326-bbd1-9f9eecaa4e80",
            "type": "bulleted_list",
            "richText": [
                [
                    "More locks or a different synchronization tool do not guarantee faster code."
                ]
            ]
        },
        {
            "id": "f53c4855-edb9-5da6-81ef-68a458faee8f",
            "type": "text",
            "richText": [
                [
                    "Other options: "
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
            "type": "bulleted_list",
            "richText": [
                [
                    "sync/atomic",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " can update an independent numeric counter."
                ]
            ]
        },
        {
            "id": "001b62f6-e50b-59d6-a818-d3b8988906db",
            "type": "bulleted_list",
            "richText": [
                [
                    "It does not automatically keep several related fields consistent with each other."
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
