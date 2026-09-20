/* Copied from the RWMutex page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24f24eb1-ed54-8044-8f81-f2d7e87bf938",
    "slug": "rwmutex",
    "title": "RWMutex",
    "updatedOn": "2025-08-14",
    "blocks": [
        {
            "id": "24f24eb1-ed54-8024-bdfe-f4ed78e6ff7c",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Purpose",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-806d-ba8d-eada3dd58764",
            "type": "bulleted_list",
            "richText": [
                [
                    "Read-Write Mutex",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " for protecting shared data."
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-8044-84cc-c22e7f3f0bac",
            "type": "bulleted_list",
            "richText": [
                [
                    "Allows:"
                ]
            ],
            "children": [
                {
                    "id": "24f24eb1-ed54-800f-99b4-e03f8e915b60",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Multiple concurrent readers",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            " (when no writer holds the lock)."
                        ]
                    ]
                },
                {
                    "id": "24f24eb1-ed54-80ac-8a53-f6eeef1fba62",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Only one writer",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            " at a time (exclusive access)."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24f24eb1-ed54-807c-ba76-f9cec290f39f",
            "type": "divider"
        },
        {
            "id": "24f24eb1-ed54-803b-a3b5-d98af31fe415",
            "type": "code",
            "richText": [
                [
                    "import \"sync\"\n\nvar rw sync.RWMutex"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24f24eb1-ed54-8033-94e4-e2a5fd1a2dbd",
            "type": "bulleted_list",
            "richText": [
                [
                    "Methods:"
                ]
            ],
            "children": [
                {
                    "id": "24f24eb1-ed54-808a-bade-d7d15c239ad8",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "RLock()",
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
                            " – Acquire shared (read) lock."
                        ]
                    ]
                },
                {
                    "id": "24f24eb1-ed54-80f0-bb9e-e1bad9d967f7",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "RUnlock()",
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
                            " – Release read lock."
                        ]
                    ]
                },
                {
                    "id": "24f24eb1-ed54-8034-aead-ff27064617d6",
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
                            " – Acquire exclusive (write) lock."
                        ]
                    ]
                },
                {
                    "id": "24f24eb1-ed54-8051-ab79-e79db5890c1e",
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
                            " – Release write lock."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24f24eb1-ed54-809f-ae1e-d6b3d7e7d0bb",
            "type": "divider"
        },
        {
            "id": "24f24eb1-ed54-80ed-a2f0-fca839405c89",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Read Lock"
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-801e-89d7-e5c2a29543a2",
            "type": "code",
            "richText": [
                [
                    "rw.RLock()\ndefer rw.RUnlock()\n// Safe concurrent reads here"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24f24eb1-ed54-8054-9480-c99ec86bdeb3",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Write Lock"
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-80d7-b3f7-faad5106c3f8",
            "type": "code",
            "richText": [
                [
                    "rw.Lock()\ndefer rw.Unlock()\n// Safe writes here"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24f24eb1-ed54-80b8-9866-f7e507df26d0",
            "type": "divider"
        },
        {
            "id": "24f24eb1-ed54-80ba-80a6-e70b6187fc06",
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
            "id": "24f24eb1-ed54-80ca-9f59-ef7002dd1225",
            "type": "bulleted_list",
            "richText": [
                [
                    "Readers don’t block each other",
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
            "id": "24f24eb1-ed54-80b7-ac5c-ea7c71ddbb64",
            "type": "bulleted_list",
            "richText": [
                [
                    "Writers block everyone",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " (readers and writers)."
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-807d-9325-cc817345d560",
            "type": "bulleted_list",
            "richText": [
                [
                    "Zero value usable",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ": no init required."
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-80b4-ac5a-c6f318c0bd39",
            "type": "bulleted_list",
            "richText": [
                [
                    "Copying after use is unsafe",
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
            "id": "24f24eb1-ed54-8065-bdcf-dac7d352ca3d",
            "type": "bulleted_list",
            "richText": [
                [
                    "Not recursive — locking twice in same goroutine without unlocking deadlocks."
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-8071-904f-e47b19ac9dbf",
            "type": "divider"
        },
        {
            "id": "24f24eb1-ed54-8088-8f1a-d9b70b8069bf",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Example",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-803d-8ab1-f4cefde758e2",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n    \"time\"\n)\n\nvar (\n    data = make(map[string]string)\n    rw   sync.RWMutex\n)\n\nfunc read(key string, wg *sync.WaitGroup) {\n    defer wg.Done()\n    rw.RLock()\n    defer rw.RUnlock()\n    fmt.Println(\"Read:\", key, \"=>\", data[key])\n}\n\nfunc write(key, value string, wg *sync.WaitGroup) {\n    defer wg.Done()\n    rw.Lock()\n    defer rw.Unlock()\n    data[key] = value\n    fmt.Println(\"Wrote:\", key, \"=>\", value)\n}\n\nfunc main() {\n    var wg sync.WaitGroup\n\n    wg.Add(1)\n    go write(\"foo\", \"bar\", &wg)\n\n    time.Sleep(100 * time.Millisecond) // ensure write starts first\n\n    for i := 0; i < 3; i++ {\n        wg.Add(1)\n        go read(\"foo\", &wg)\n    }\n\n    wg.Wait()\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24f24eb1-ed54-8070-a562-d1d2616812ae",
            "type": "bulleted_list",
            "richText": [
                [
                    "Write locks out all readers until done."
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-8043-933d-fae46044bf31",
            "type": "bulleted_list",
            "richText": [
                [
                    "Multiple readers can run together if no writer is active."
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-808a-a775-cd740e0f75a8",
            "type": "divider"
        },
        {
            "id": "24f24eb1-ed54-8035-bd5a-ea405a33ec06",
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
            "id": "24f24eb1-ed54-8016-9b7a-cfb8c8826b55",
            "type": "bulleted_list",
            "richText": [
                [
                    "You have "
                ],
                [
                    "frequent reads",
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
                    "infrequent writes",
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
            "id": "24f24eb1-ed54-8065-b695-fabdc2ad0c9c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Reads are safe to run in parallel and don’t modify data."
                ]
            ]
        },
        {
            "id": "24f24eb1-ed54-8029-a967-feaf7cc3b78a",
            "type": "divider"
        }
    ]
} as const satisfies GoNote;

export default note;
