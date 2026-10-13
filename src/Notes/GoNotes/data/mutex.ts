/* Go study notes, refined from the original Notion import. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24e24eb1-ed54-80ef-92fc-e43daf413d10",
    "slug": "mutex",
    "title": "Mutex and RWMutex",
    "updatedOn": "2026-10-13",
    "blocks": [
        {
            "id": "mutex-meaning",
            "type": "bulleted_list",
            "richText": [
                [
                    "Mutex means mutual exclusion. A lock controls access to shared data."
                ]
            ]
        },
        {
            "id": "mutex-public-types",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go’s sync package provides two public mutex types: Mutex and RWMutex."
                ]
            ]
        },
        {
            "id": "mutex-comparison",
            "type": "sub_header",
            "richText": [
                [
                    "Mutex and RWMutex"
                ]
            ]
        },
        {
            "id": "mutex-types-table",
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
                    "id": "mutex-types-table-0",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Type"
                            ]
                        ],
                        "column-1": [
                            [
                                "Who can hold the lock"
                            ]
                        ],
                        "column-2": [
                            [
                                "Methods"
                            ]
                        ]
                    }
                },
                {
                    "id": "mutex-types-table-1",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "sync.Mutex"
                            ]
                        ],
                        "column-1": [
                            [
                                "One goroutine at a time, for reads or writes."
                            ]
                        ],
                        "column-2": [
                            [
                                "Lock / Unlock"
                            ]
                        ]
                    }
                },
                {
                    "id": "mutex-types-table-2",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "sync.RWMutex"
                            ]
                        ],
                        "column-1": [
                            [
                                "Several readers together, or one writer alone."
                            ]
                        ],
                        "column-2": [
                            [
                                "RLock / RUnlock for reads. Lock / Unlock for writes."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "mutex-exclusive",
            "type": "sub_header",
            "richText": [
                [
                    "Mutex"
                ]
            ]
        },
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
                    "Lock Rules"
                ]
            ]
        },
        {
            "id": "6a9ce3a6-5ae1-50c9-afb5-06f1428209f1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Both Mutex and RWMutex work from their zero value. They start unlocked."
                ]
            ]
        },
        {
            "id": "2db5ee5b-3a4c-55f0-8881-25552a03da30",
            "type": "bulleted_list",
            "richText": [
                [
                    "Do not copy either mutex type after first use."
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
            "id": "mutex-reader-writer",
            "type": "sub_header",
            "richText": [
                [
                    "RWMutex"
                ]
            ]
        },
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
                    "RWMutex Rules"
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
            "id": "24f24eb1-ed54-8088-8f1a-d9b70b8069bf",
            "type": "sub_header",
            "richText": [
                [
                    "Read a Shared Map"
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
            "id": "mutex-try-lock",
            "type": "sub_header",
            "richText": [
                [
                    "TryLock and TryRLock"
                ]
            ]
        },
        {
            "id": "mutex-try-version",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go 1.18 added Mutex.TryLock, RWMutex.TryLock and RWMutex.TryRLock."
                ]
            ]
        },
        {
            "id": "mutex-try-methods",
            "type": "bulleted_list",
            "richText": [
                [
                    "These are methods on the existing mutex types. They are not separate mutex types."
                ]
            ]
        },
        {
            "id": "mutex-try-result",
            "type": "bulleted_list",
            "richText": [
                [
                    "TryLock tries to take an exclusive lock without waiting. TryRLock tries to take a read lock without waiting."
                ]
            ]
        },
        {
            "id": "mutex-try-success",
            "type": "bulleted_list",
            "richText": [
                [
                    "A true result means you acquired the lock. Release it with Unlock or RUnlock as appropriate."
                ]
            ]
        },
        {
            "id": "mutex-try-failure",
            "type": "bulleted_list",
            "richText": [
                [
                    "A false result means you did not acquire the lock. Do not access the protected data through that failed attempt."
                ]
            ]
        },
        {
            "id": "mutex-try-choice",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use these methods when skipping the work is acceptable if the lock cannot be acquired. Correct uses are rare."
                ]
            ]
        },
        {
            "id": "mutex-try-no-loop",
            "type": "bulleted_list",
            "richText": [
                [
                    "Do not keep calling TryLock in a loop to replace Lock. That loop uses CPU time while waiting."
                ]
            ]
        },
        {
            "id": "mutex-other-variants",
            "type": "sub_header",
            "richText": [
                [
                    "Other Lock Variants"
                ]
            ]
        },
        {
            "id": "mutex-other-availability",
            "type": "bulleted_list",
            "richText": [
                [
                    "Other languages and libraries provide these lock variants. Go’s sync package has no public type for them."
                ]
            ]
        },
        {
            "id": "mutex-other-table",
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
                    "id": "mutex-other-table-0",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Variant"
                            ]
                        ],
                        "column-1": [
                            [
                                "Meaning"
                            ]
                        ],
                        "column-2": [
                            [
                                "Go behavior"
                            ]
                        ]
                    }
                },
                {
                    "id": "mutex-other-table-1",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Recursive / reentrant mutex"
                            ]
                        ],
                        "column-1": [
                            [
                                "The same owner can lock it again. Each successful lock needs an unlock."
                            ]
                        ],
                        "column-2": [
                            [
                                "Mutex and RWMutex do not support recursive locking."
                            ]
                        ]
                    }
                },
                {
                    "id": "mutex-other-table-2",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Timed mutex"
                            ]
                        ],
                        "column-1": [
                            [
                                "Stops waiting when a deadline expires."
                            ]
                        ],
                        "column-2": [
                            [
                                "Lock and RLock have no timeout or context parameter. TryLock returns immediately."
                            ]
                        ]
                    }
                },
                {
                    "id": "mutex-other-table-3",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Spinlock"
                            ]
                        ],
                        "column-1": [
                            [
                                "Repeatedly checks the lock while using CPU time."
                            ]
                        ],
                        "column-2": [
                            [
                                "No public sync spinlock type. Mutex may spin briefly inside its implementation."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "mutex-locker-interface",
            "type": "bulleted_list",
            "richText": [
                [
                    "sync.Locker is an interface with Lock and Unlock methods. It is not another mutex type."
                ]
            ]
        },
        {
            "id": "mutex-other-tools",
            "type": "bulleted_list",
            "richText": [
                [
                    "Channels, WaitGroup, Cond and sync/atomic are other synchronization tools. They are not mutex types."
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
            "id": "mutex-sources",
            "type": "sub_header",
            "richText": [
                [
                    "Sources"
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
                    "sync API",
                    [
                        [
                            "a",
                            "https://pkg.go.dev/sync#pkg-index"
                        ]
                    ]
                ],
                [
                    ", "
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
                    "Mutex source",
                    [
                        [
                            "a",
                            "https://go.dev/src/sync/mutex.go"
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
                    ", "
                ],
                [
                    "Go 1.18 sync changes",
                    [
                        [
                            "a",
                            "https://go.dev/doc/go1.18#sync"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "Mutex implementation",
                    [
                        [
                            "a",
                            "https://go.dev/src/internal/sync/mutex.go"
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
