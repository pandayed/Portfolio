/* Copied from the Channels page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-80e4-ae95-d890f035f808",
    "slug": "channels",
    "title": "Channels",
    "updatedOn": "2026-01-26",
    "blocks": [
        {
            "id": "24724eb1-ed54-8044-9a0c-e5e09a4e4d8b",
            "type": "text",
            "richText": [
                [
                    "Go says do not use shared memory to share data between the goroutines, rather, use channel which help the go routines communicate and share data."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80fc-a8a2-fd3b118375e5",
            "type": "divider"
        },
        {
            "id": "24724eb1-ed54-80f2-8cec-da3350b94ea6",
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
                    " are pipes through which goroutines communicate."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-801d-93ed-e6ba55e69c8d",
            "type": "bulleted_list",
            "richText": [
                [
                    "They allow "
                ],
                [
                    "safe data sharing without explicit locking",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " (no mutexes needed)."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8089-ab4e-d165a3c71645",
            "type": "bulleted_list",
            "richText": [
                [
                    "Direction: Data flows "
                ],
                [
                    "from sender to receiver",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " through a channel."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8008-985d-c4571ab6df8f",
            "type": "bulleted_list",
            "richText": [
                [
                    "Two Types: "
                ],
                [
                    "Buffered & Unbuffered",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-801d-a29b-f28db8aedced",
            "type": "divider"
        },
        {
            "id": "2f124eb1-ed54-8027-a2df-c539554fbc07",
            "type": "bulleted_list",
            "richText": [
                [
                    "A channel transmits "
                ],
                [
                    "typed",
                    [
                        [
                            "b"
                        ],
                        [
                            "i"
                        ]
                    ]
                ],
                [
                    " values between goroutines."
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-8057-8175-c513926588ef",
            "type": "bulleted_list",
            "richText": [
                [
                    "The intention of writing "
                ],
                [
                    "typed",
                    [
                        [
                            "b"
                        ],
                        [
                            "i"
                        ]
                    ]
                ],
                [
                    " is that a channel carries values of "
                ],
                [
                    "exactly one static type",
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
            "id": "2f124eb1-ed54-802d-a6c3-d4b69efcba19",
            "type": "callout",
            "children": [
                {
                    "id": "2f124eb1-ed54-80a4-86df-f4d5a6b92dfb",
                    "type": "text",
                    "richText": [
                        [
                            "Static type means the type is known at the compile time, unlike python programming language. Go is "
                        ],
                        [
                            "strictly statically typed",
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
                }
            ]
        },
        {
            "id": "24724eb1-ed54-808c-a247-f846ec437dee",
            "type": "divider"
        },
        {
            "id": "24724eb1-ed54-80e7-a11a-fa29aaf22140",
            "type": "sub_header",
            "richText": [
                [
                    "Declaring & Creating Channels in Go",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80f5-8818-f94e259c2637",
            "type": "code",
            "richText": [
                [
                    "ch := make(chan int)        // Unbuffered, bidirectional\nch := make(chan int, 3)     // Buffered, bidirectional, capacity = 3"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24724eb1-ed54-80db-b022-c2259580ab2b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Unbuffered Channel",
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
                    "make(chan T)",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-803d-ab58-d5aa38734aef",
            "type": "bulleted_list",
            "richText": [
                [
                    "Buffered Channel",
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
                    "make(chan T, capacity)",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80c2-9f0b-df541fbf61ab",
            "type": "divider"
        },
        {
            "id": "24724eb1-ed54-808d-98e5-f615ec862a1b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Send",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ": putting a value into the channel"
                ]
            ],
            "children": [
                {
                    "id": "24724eb1-ed54-8051-89df-dc1a81211cb2",
                    "type": "text",
                    "richText": [
                        [
                            "→ e.g., "
                        ],
                        [
                            "ch <- 5",
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
            "id": "24724eb1-ed54-800e-a03c-d9819143723d",
            "type": "bulleted_list",
            "richText": [
                [
                    "Receive",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ": reading a value from the channel"
                ]
            ],
            "children": [
                {
                    "id": "24724eb1-ed54-80dd-a937-df807ab87268",
                    "type": "text",
                    "richText": [
                        [
                            "→ e.g., "
                        ],
                        [
                            "x := <-ch",
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
            "id": "24724eb1-ed54-8002-b387-f68401a385a5",
            "type": "divider"
        },
        {
            "id": "24724eb1-ed54-8062-b3ce-f6bed8dd22e0",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Unbuffered Channels Working",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8036-9819-ec6c0e68b10b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Unbuffered channels have no storage.",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80d2-b122-fcf36ed635db",
            "type": "bulleted_list",
            "richText": [
                [
                    "When a goroutine does "
                ],
                [
                    "ch <- val",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", it "
                ],
                [
                    "blocks (waits)",
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
                    "another goroutine",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " does "
                ],
                [
                    "<-ch",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " to receive it."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8091-978c-e008ea405176",
            "type": "bulleted_list",
            "richText": [
                [
                    "Similarly, a receiver waits for someone to send."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80ec-8ef3-f08e734a8ce7",
            "type": "bulleted_list",
            "richText": [
                [
                    "Waiting means getting blocked, as it cannot proceed with execution."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8029-b06d-f5a1fc0fc130",
            "type": "divider"
        },
        {
            "id": "24724eb1-ed54-80e7-b66b-c6868fe81eae",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Buffered Channels Working",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8007-82ce-c1385cb8861d",
            "type": "code",
            "richText": [
                [
                    "ch := make(chan int, 3)"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24724eb1-ed54-804c-8b0b-c0b42df88aa0",
            "type": "bulleted_list",
            "richText": [
                [
                    "Buffered channels can "
                ],
                [
                    "store up to N values",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " internally."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-807c-ae44-fc2aa89fa354",
            "type": "bulleted_list",
            "richText": [
                [
                    "When you send using "
                ],
                [
                    "ch <- val",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ":"
                ]
            ],
            "children": [
                {
                    "id": "24724eb1-ed54-8022-939b-f34e14d65bbd",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "It stores the value in the buffer (if there’s space)."
                        ]
                    ]
                },
                {
                    "id": "24724eb1-ed54-80e4-9fe8-c5fb50bc76ea",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "It "
                        ],
                        [
                            "does NOT block immediately",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            " like unbuffered channels."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24724eb1-ed54-800d-8153-e30a98ff1be0",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Send Gets Blocked Only When Buffer Is Full",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-808f-a630-ee0759e7798a",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Example:"
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-809e-90f2-f3cd08f4e350",
            "type": "code",
            "richText": [
                [
                    "ch := make(chan int, 2) // capacity = 2\n\nch <- 1 // goes into buffer (slot 1)\nch <- 2 // goes into buffer (slot 2)\nch <- 3 // BLOCKS here: buffer is full\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24724eb1-ed54-8058-bc2b-fb8b887a2e69",
            "type": "bulleted_list",
            "richText": [
                [
                    "Each send adds a value to the buffer."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8041-822e-fdb1ec4b9327",
            "type": "bulleted_list",
            "richText": [
                [
                    "Once buffer is full (2 values here), the next send "
                ],
                [
                    "waits (blocks)",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " until a receiver removes at least one value."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8076-8ff9-d133a5ac0036",
            "type": "divider"
        },
        {
            "id": "24724eb1-ed54-809f-86f8-c96d2af239d0",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Directional Channels (Type Safety)",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8005-8a11-c792866e6ea2",
            "type": "text",
            "richText": [
                [
                    "You can restrict a channel to "
                ],
                [
                    "only send",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " or "
                ],
                [
                    "only receive",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ":"
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80fd-bd72-ee46764511d2",
            "type": "code",
            "richText": [
                [
                    "var sendOnly chan<- int     // can only send\nvar recvOnly <-chan int     // can only receive\n\nch := make(chan int)\nsendOnly = ch\nrecvOnly = ch\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24724eb1-ed54-808f-8700-d7f7c53bb5ca",
            "type": "bulleted_list",
            "richText": [
                [
                    "Helps prevent misuse inside functions."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80e3-bc70-e8b71ba23de0",
            "type": "divider"
        },
        {
            "id": "24724eb1-ed54-808c-975f-c7bd9177d559",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Summary Table",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80b6-86df-f6fb46ff14e4",
            "type": "table",
            "children": [
                {
                    "id": "24724eb1-ed54-8064-b286-d663e2383695",
                    "type": "table_row",
                    "cells": {
                        ":D:e": [
                            [
                                "Receive gets blocked when"
                            ]
                        ],
                        "DJq<": [
                            [
                                "Send gets blocked when"
                            ]
                        ],
                        "Jl]S": [
                            [
                                "Declaration"
                            ]
                        ],
                        "QMZx": [
                            [
                                "Type"
                            ]
                        ]
                    }
                },
                {
                    "id": "24724eb1-ed54-80ae-8c6d-f6885cf1ef03",
                    "type": "table_row",
                    "cells": {
                        ":D:e": [
                            [
                                "No sender ready"
                            ]
                        ],
                        "DJq<": [
                            [
                                "No receiver ready"
                            ]
                        ],
                        "Jl]S": [
                            [
                                "make(chan T)",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "QMZx": [
                            [
                                "Unbuffered"
                            ]
                        ]
                    }
                },
                {
                    "id": "24724eb1-ed54-801d-815f-ed473e59e30e",
                    "type": "table_row",
                    "cells": {
                        ":D:e": [
                            [
                                "Buffer is empty"
                            ]
                        ],
                        "DJq<": [
                            [
                                "Buffer is full"
                            ]
                        ],
                        "Jl]S": [
                            [
                                "make(chan T, N)",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "QMZx": [
                            [
                                "Buffered (N)"
                            ]
                        ]
                    }
                }
            ],
            "columnOrder": [
                "QMZx",
                "Jl]S",
                "DJq<",
                ":D:e"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false
        },
        {
            "id": "24724eb1-ed54-80b5-bef1-e679c8f641ac",
            "type": "divider"
        },
        {
            "id": "24724eb1-ed54-8009-9dae-c2ad460b8fae",
            "type": "sub_header",
            "richText": [
                [
                    "Closing Channels",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8011-a606-c16be0351c0f",
            "type": "code",
            "richText": [
                [
                    "close(ch)"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24724eb1-ed54-8001-acdf-d47f9d797099",
            "type": "bulleted_list",
            "richText": [
                [
                    "Used to indicate no more values will be sent."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80eb-b499-c8d179543640",
            "type": "bulleted_list",
            "richText": [
                [
                    "Only sender should close the channel.",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8060-82e9-ffacf0463571",
            "type": "bulleted_list",
            "richText": [
                [
                    "Receivers can detect closure",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ":"
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8039-8693-f78405148f61",
            "type": "code",
            "richText": [
                [
                    "v, ok := <-ch\nif !ok {\n  // channel is closed\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24724eb1-ed54-8030-8ee4-e9311078c62e",
            "type": "divider"
        },
        {
            "id": "24724eb1-ed54-804d-a326-e7200e45fd10",
            "type": "sub_header",
            "richText": [
                [
                    "Range over Channels",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8094-8f3e-d0b57d2a3aff",
            "type": "text",
            "richText": [
                [
                    "Reads values until the channel is closed."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8078-8689-c5170fe038b7",
            "type": "code",
            "richText": [
                [
                    "for val := range ch {\n    fmt.Println(val)\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24724eb1-ed54-8050-84ae-dd5d0e67a0d0",
            "type": "bulleted_list",
            "richText": [
                [
                    "Common pattern for worker pools and stream processing."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80bb-8ee6-e68676bade81",
            "type": "divider"
        },
        {
            "id": "24724eb1-ed54-8033-8b27-f5c5f64c06ef",
            "type": "sub_header",
            "richText": [
                [
                    "Buffered vs Unbuffered",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8035-a40a-f7ecbe7b3702",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Unbuffered",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8064-9a44-f1a1809f8bcd",
            "type": "bulleted_list",
            "richText": [
                [
                    "Good for "
                ],
                [
                    "synchronous communication",
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
            "id": "24724eb1-ed54-80ee-a646-d1b59da826f6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Used when you want "
                ],
                [
                    "tight coupling",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " between sender and receiver."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8034-84ef-d839f173ad23",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Buffered",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-803c-9425-e8307e3f89c7",
            "type": "bulleted_list",
            "richText": [
                [
                    "Good for "
                ],
                [
                    "decoupling",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " goroutines."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8047-bb1e-e405e2d515bd",
            "type": "bulleted_list",
            "richText": [
                [
                    "Useful in "
                ],
                [
                    "producer-consumer",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " scenarios."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-807e-8557-d74488212d33",
            "type": "text",
            "richText": [
                [
                    "Real Example",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ":"
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8047-98a6-c05c1c76e4d6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Logging system: log messages sent to buffered channel to decouple app logic and logging goroutine."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8001-bb5c-ef4a6c6bf9d9",
            "type": "divider"
        },
        {
            "id": "24724eb1-ed54-80ba-8129-ecce6919c915",
            "type": "sub_header",
            "richText": [
                [
                    "Select Statement (Multiplexing)",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80c0-9ddc-f460a0252905",
            "type": "text",
            "richText": [
                [
                    "Waits on multiple channel operations:"
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8086-823d-ed07956a0e22",
            "type": "code",
            "richText": [
                [
                    "select {\ncase msg1 := <-ch1:\n    fmt.Println(\"received\", msg1)\ncase ch2 <- msg2:\n    fmt.Println(\"sent\", msg2)\ndefault:\n    fmt.Println(\"no activity\")\n}\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24724eb1-ed54-80bd-9e62-f91fe7eb3d3e",
            "type": "bulleted_list",
            "richText": [
                [
                    "default",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " is optional."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-800e-8ec0-e01361e39661",
            "type": "bulleted_list",
            "richText": [
                [
                    "Helps avoid blocking."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-803c-9c91-c51eae249cf0",
            "type": "bulleted_list",
            "richText": [
                [
                    "Useful for "
                ],
                [
                    "timeouts, fan-in/out, cancellation.",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8019-be59-df65dcfd68ab",
            "type": "divider"
        },
        {
            "id": "24724eb1-ed54-8055-b7a3-edf27e5b2d5f",
            "type": "sub_header",
            "richText": [
                [
                    "Channel Use Cases (Real-World)",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8092-93aa-ccf021ca3a54",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Worker Pools",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8094-bdef-dbbf1329ba74",
            "type": "bulleted_list",
            "richText": [
                [
                    "Spawn multiple workers consuming from a common task channel."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80dc-944e-e5b9081f0413",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Rate Limiting",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80ef-b4e4-c8a478e4e145",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use ticker with channel to allow N operations per second."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-805a-9034-f21649708c80",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Cancellation",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80dd-8d14-d4194e0da14a",
            "type": "bulleted_list",
            "richText": [
                [
                    "Send signal on "
                ],
                [
                    "done",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " channel to cancel goroutines."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80be-905d-f8e4984ed98e",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Fan-In / Fan-Out",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8079-8d1c-d3c5ee63f076",
            "type": "bulleted_list",
            "richText": [
                [
                    "Merge results from multiple sources (fan-in)."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8061-8b78-c4a1bd07265c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Split work across multiple workers (fan-out)."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80e1-ab84-fe44a0a21145",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Streaming Data",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8064-b756-d315a9e95f01",
            "type": "bulleted_list",
            "richText": [
                [
                    "Data pipeline where each stage uses a channel to pass data to next stage."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8037-b9b4-c9d432bf6ad7",
            "type": "divider"
        },
        {
            "id": "24724eb1-ed54-80b7-9289-fdb15bf8cf42",
            "type": "sub_header",
            "richText": [
                [
                    "Synchronization via Channels",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80fe-ba26-f3dbd7584ea3",
            "type": "text",
            "richText": [
                [
                    "Alternative to WaitGroup or mutex."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8010-8d9d-ec2e98d27b2d",
            "type": "code",
            "richText": [
                [
                    "done := make(chan struct{})\ngo func() {\n    // work\n    done <- struct{}{}\n}()\n<-done // wait\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24724eb1-ed54-8066-80fa-cbef2e896861",
            "type": "bulleted_list",
            "richText": [
                [
                    "Common in tests and controlled goroutine shutdowns."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8080-8a2f-cdef53cfa7c7",
            "type": "divider"
        },
        {
            "id": "24724eb1-ed54-80b4-8c72-ff100b79c74c",
            "type": "sub_header",
            "richText": [
                [
                    "Timeouts & Deadlines",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80da-94c2-d6e34c1e08e6",
            "type": "code",
            "richText": [
                [
                    "select {\ncase res := <-ch:\n    // received\ncase <-time.After(1 * time.Second):\n    // timeout\n}\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24724eb1-ed54-8064-9072-d467bf654e90",
            "type": "bulleted_list",
            "richText": [
                [
                    "Essential for external APIs or slow ops."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80f1-b9e4-d7d3cf44f18c",
            "type": "divider"
        },
        {
            "id": "24724eb1-ed54-80e9-acfe-cb7eeb6d45d6",
            "type": "sub_header",
            "richText": [
                [
                    "Channel Pitfalls",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8084-b733-c9686a9a07c5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Writing to closed channel → panic",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8064-b81f-f280f53b2156",
            "type": "bulleted_list",
            "richText": [
                [
                    "Reading from nil channel → blocks forever",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-800f-9fcf-f749e2c8e104",
            "type": "bulleted_list",
            "richText": [
                [
                    "Deadlocks",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " if all goroutines block (no progress)"
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8083-b30e-ccd67101c020",
            "type": "bulleted_list",
            "richText": [
                [
                    "Leaking goroutines",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " if goroutines waiting forever on channel ops"
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80ef-ba57-c137f9046d75",
            "type": "divider"
        },
        {
            "id": "24724eb1-ed54-80e3-8238-c60ace86ebf7",
            "type": "sub_header",
            "richText": [
                [
                    "Patterns to Know",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80c3-800b-c7dba3701696",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Pipeline",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80aa-963d-e4a9a02ab193",
            "type": "code",
            "richText": [
                [
                    "gen := func() <-chan int {\n    ch := make(chan int)\n    go func() {\n        for i := 0; i < 5; i++ {\n            ch <- i\n        }\n        close(ch)\n    }()\n    return ch\n}\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24724eb1-ed54-807a-b001-d6830b535cdf",
            "type": "bulleted_list",
            "richText": [
                [
                    "Chain multiple stages."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-809c-93e9-f159ba8bedbc",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Fan-Out / Fan-In",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-804f-9bb8-e0dd24d858b6",
            "type": "code",
            "richText": [
                [
                    "jobs := make(chan int)\nresults := make(chan int)\n\n// Fan-out\nfor w := 0; w < 3; w++ {\n    go worker(jobs, results)\n}\n\n// Fan-in\ngo func() {\n    for r := range results {\n        fmt.Println(r)\n    }\n}()\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24724eb1-ed54-80d4-9c7b-ea7e01af37ba",
            "type": "bulleted_list",
            "richText": [
                [
                    "Good for "
                ],
                [
                    "parallelism and efficiency",
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
            "id": "24724eb1-ed54-8071-9ddf-ebf62c676542",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Ticker / Timer",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8021-9775-ce6e4545f5d3",
            "type": "code",
            "richText": [
                [
                    "ticker := time.NewTicker(1 * time.Second)\nfor t := range ticker.C {\n    fmt.Println(\"Tick at\", t)\n}\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24724eb1-ed54-80aa-8bff-c4ccd42e1306",
            "type": "bulleted_list",
            "richText": [
                [
                    "Used for "
                ],
                [
                    "scheduled tasks or rate limiting",
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
            "id": "24724eb1-ed54-80d5-b9df-c695d0f9b90e",
            "type": "divider"
        },
        {
            "id": "24724eb1-ed54-80cf-bf5f-d20b98a35b0d",
            "type": "sub_header",
            "richText": [
                [
                    "Channel vs Mutex vs WaitGroup",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80b7-9d76-d7b2a8e3b49c",
            "type": "table",
            "children": [
                {
                    "id": "24724eb1-ed54-80af-a569-e3cf9cf06616",
                    "type": "table_row",
                    "cells": {
                        "JE}m": [
                            [
                                "Feature"
                            ]
                        ],
                        "Mv[<": [
                            [
                                "Mutex"
                            ]
                        ],
                        "ZmYX": [
                            [
                                "WaitGroup"
                            ]
                        ],
                        "\\`kn": [
                            [
                                "Channel"
                            ]
                        ]
                    }
                },
                {
                    "id": "24724eb1-ed54-8057-b06d-ef8aa0e7afb0",
                    "type": "table_row",
                    "cells": {
                        "JE}m": [
                            [
                                "Purpose"
                            ]
                        ],
                        "Mv[<": [
                            [
                                "Data protection"
                            ]
                        ],
                        "ZmYX": [
                            [
                                "Goroutine sync"
                            ]
                        ],
                        "\\`kn": [
                            [
                                "Communication & sync"
                            ]
                        ]
                    }
                },
                {
                    "id": "24724eb1-ed54-8067-a179-efe21ad96d9d",
                    "type": "table_row",
                    "cells": {
                        "JE}m": [
                            [
                                "Use for"
                            ]
                        ],
                        "Mv[<": [
                            [
                                "Protect shared state"
                            ]
                        ],
                        "ZmYX": [
                            [
                                "Wait for N tasks"
                            ]
                        ],
                        "\\`kn": [
                            [
                                "Goroutines talking to each other"
                            ]
                        ]
                    }
                },
                {
                    "id": "24724eb1-ed54-80d1-a8a9-deba741cda11",
                    "type": "table_row",
                    "cells": {
                        "JE}m": [
                            [
                                "Blocking"
                            ]
                        ],
                        "Mv[<": [
                            [
                                "Yes (on lock)"
                            ]
                        ],
                        "ZmYX": [
                            [
                                "Yes (on "
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
                                ")"
                            ]
                        ],
                        "\\`kn": [
                            [
                                "Yes (on send/receive)"
                            ]
                        ]
                    }
                },
                {
                    "id": "24724eb1-ed54-80fe-bcd6-d39c9038dfdd",
                    "type": "table_row",
                    "cells": {
                        "JE}m": [
                            [
                                "Memory Safety"
                            ]
                        ],
                        "Mv[<": [
                            [
                                "Unsafe if misused"
                            ]
                        ],
                        "ZmYX": [
                            [
                                "Safe"
                            ]
                        ],
                        "\\`kn": [
                            [
                                "Safe"
                            ]
                        ]
                    }
                }
            ],
            "columnOrder": [
                "JE}m",
                "\\`kn",
                "Mv[<",
                "ZmYX"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false
        },
        {
            "id": "24724eb1-ed54-8035-9452-f21d15df1733",
            "type": "divider"
        },
        {
            "id": "24724eb1-ed54-8087-a3c4-d25ac9f58fe5",
            "type": "sub_header",
            "richText": [
                [
                    "Debugging Tips",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8059-9bc5-f1b957b2d107",
            "type": "bulleted_list",
            "richText": [
                [
                    "Prefer logging goroutine entry/exit."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-802d-96ee-ce539b2b9ba4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    "runtime.NumGoroutine()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " to detect leaks."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80c6-a7bc-e1b057704df8",
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
                    " with channels for better control."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80ba-a92f-ea2927216f31",
            "type": "divider"
        },
        {
            "id": "24724eb1-ed54-8087-92df-e5e8d939f411",
            "type": "sub_header",
            "richText": [
                [
                    "Real-World Example – Web Crawler",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80d9-8f61-eb4830ba4b87",
            "type": "code",
            "richText": [
                [
                    "type Result struct {\n    URL  string\n    Body string\n}\n\nurls := []string{\"https://site1.com\", \"https://site2.com\"}\nresults := make(chan Result)\n\nfor _, url := range urls {\n    go func(u string) {\n        body := fetch(u)\n        results <- Result{u, body}\n    }(url)\n}\n\nfor range urls {\n    res := <-results\n    fmt.Println(\"Fetched\", res.URL)\n}\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24724eb1-ed54-801f-9419-c5abd1f0ce93",
            "type": "bulleted_list",
            "richText": [
                [
                    "Concurrent HTTP fetch, results collected via channel."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-802c-8c0a-cffa42b45a12",
            "type": "divider"
        },
        {
            "id": "24724eb1-ed54-8059-b3c3-ddc8979c8707",
            "type": "sub_header",
            "richText": [
                [
                    "When NOT to Use Channels",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80fb-bc07-e6a9900669e6",
            "type": "bulleted_list",
            "richText": [
                [
                    "For "
                ],
                [
                    "shared memory/data",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " → use mutex"
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8020-a3a2-cdde8dd8e48b",
            "type": "bulleted_list",
            "richText": [
                [
                    "When performance is critical (channels introduce overhead)"
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8039-8519-ed6092522791",
            "type": "bulleted_list",
            "richText": [
                [
                    "When goroutines don’t need to communicate"
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80c7-8c8b-f5339ae3adec",
            "type": "divider"
        },
        {
            "id": "24724eb1-ed54-8096-9526-f1f85afe4e6f",
            "type": "sub_header",
            "richText": [
                [
                    "Best Practices",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-809f-bc86-cae6be4f9d70",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use channels to "
                ],
                [
                    "coordinate and synchronize goroutines",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", not to share memory like global variables."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80e2-b12e-fbfbd4816bf7",
            "type": "bulleted_list",
            "richText": [
                [
                    "Prefer "
                ],
                [
                    "unbuffered",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " for tightly-coupled goroutines."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80e6-aee5-e79bbe020dda",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    "close only by sender",
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
            "id": "24724eb1-ed54-80a0-86f5-f3bb8bbbea34",
            "type": "bulleted_list",
            "richText": [
                [
                    "Avoid "
                ],
                [
                    "select{}",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " without case – infinite block."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8072-8326-c1441a1649c8",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    "context",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " for cancellation, not bare channels."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8090-8e05-d6fab3cc7927",
            "type": "divider"
        },
        {
            "id": "2f324eb1-ed54-807f-8ce5-d5f5319d189d",
            "type": "header",
            "richText": [
                [
                    "Channels Interview Questions"
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-806d-8cad-d726434743af",
            "type": "sub_header",
            "richText": [
                [
                    "Buffered vs unbuffered: What blocks, when, and how it changes the backpressure.",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-80c1-a56c-f876990639ad",
            "type": "text",
            "richText": [
                [
                    "Backpressure — what it means here",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-8092-855f-fc113ca4801e",
            "type": "bulleted_list",
            "richText": [
                [
                    "Backpressure is "
                ],
                [
                    "a signal from a slow consumer to a fast producer to slow down or stop",
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
            "id": "2f424eb1-ed54-803e-859a-ce34f36f3586",
            "type": "bulleted_list",
            "richText": [
                [
                    "It exists to prevent "
                ],
                [
                    "unbounded memory growth, overload, or data loss",
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
            "id": "2f424eb1-ed54-8016-9e13-dd945bae0a1d",
            "type": "bulleted_list",
            "richText": [
                [
                    "In practice, backpressure answers this question:"
                ]
            ],
            "children": [
                {
                    "id": "2f424eb1-ed54-8019-950b-c846c4a50eda",
                    "type": "text",
                    "richText": [
                        [
                            "“If the receiver can’t keep up, what forces the sender to wait?”",
                            [
                                [
                                    "i"
                                ]
                            ]
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f424eb1-ed54-80a9-a9f7-d9dbd11a656e",
            "type": "callout",
            "children": [
                {
                    "id": "2f424eb1-ed54-80b0-a063-c5bc42aa00a5",
                    "type": "sub_sub_header",
                    "richText": [
                        [
                            "Where did the term backpressure come from?"
                        ]
                    ],
                    "children": [
                        {
                            "id": "2f424eb1-ed54-8022-87d4-d254d19e2624",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "The term “backpressure” comes from "
                                ],
                                [
                                    "fluid mechanics",
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
                            "id": "2f424eb1-ed54-80a3-b143-c7326aa78a11",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "In pipes, when flow is blocked downstream, "
                                ],
                                [
                                    "pressure builds up backward",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    " toward the source."
                                ]
                            ]
                        },
                        {
                            "id": "2f424eb1-ed54-80ac-ae57-ea2a30ca32bd",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "That backward force is called "
                                ],
                                [
                                    "back pressure",
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
                            "id": "2f424eb1-ed54-8089-a3ed-e6eb900ecc16",
                            "type": "text",
                            "richText": [
                                [
                                    "Applied to computing:"
                                ]
                            ]
                        },
                        {
                            "id": "2f424eb1-ed54-8066-8816-d343f55a547e",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Data flows from "
                                ],
                                [
                                    "producer → consumer",
                                    [
                                        [
                                            "b"
                                        ]
                                    ]
                                ],
                                [
                                    " like fluid in a pipe."
                                ]
                            ]
                        },
                        {
                            "id": "2f424eb1-ed54-8048-91da-d4a14ac165cb",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "If the consumer is slow or blocked, data accumulates."
                                ]
                            ]
                        },
                        {
                            "id": "2f424eb1-ed54-804f-b0e9-c07ed3b014d0",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "The system pushes a signal "
                                ],
                                [
                                    "back toward the producer",
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
                            "id": "2f424eb1-ed54-801e-a262-e7cab21d48e8",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "That signal forces the producer to slow down or stop."
                                ]
                            ]
                        },
                        {
                            "id": "2f424eb1-ed54-8024-ae99-da30500341fb",
                            "type": "text",
                            "richText": [
                                [
                                    "Why the name fits:"
                                ]
                            ]
                        },
                        {
                            "id": "2f424eb1-ed54-8069-9e39-ebe87cdba3fd",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Pressure originates at the consumer side."
                                ]
                            ]
                        },
                        {
                            "id": "2f424eb1-ed54-80c8-a1b6-d61cfd7aa6e9",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "It propagates "
                                ],
                                [
                                    "back",
                                    [
                                        [
                                            "i"
                                        ]
                                    ]
                                ],
                                [
                                    " to the producer."
                                ]
                            ]
                        },
                        {
                            "id": "2f424eb1-ed54-8087-9358-c4510cd5059c",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "The producer does not decide to slow down voluntarily."
                                ]
                            ]
                        },
                        {
                            "id": "2f424eb1-ed54-8042-868d-f2178fd8054b",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "It is forced to slow due to downstream resistance."
                                ]
                            ]
                        },
                        {
                            "id": "2f424eb1-ed54-8089-b4bc-dff378db0501",
                            "type": "text",
                            "richText": [
                                [
                                    "Key idea:"
                                ]
                            ]
                        },
                        {
                            "id": "2f424eb1-ed54-80fb-a17c-edfed5d9a7ab",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Backpressure is "
                                ],
                                [
                                    "downstream demand controlling upstream supply",
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
                        }
                    ]
                }
            ]
        },
        {
            "id": "2f424eb1-ed54-80f7-a3dd-fd2a18437794",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Unbuffered channel ("
                ],
                [
                    "make(chan T)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ")"
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-802b-82cf-f8af254e21bf",
            "type": "bulleted_list",
            "richText": [
                [
                    "Send blocks",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-808b-bf88-cf995549dfa7",
            "type": "bulleted_list",
            "richText": [
                [
                    "Blocks until another goroutine is ready to receive."
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-80c4-880e-d8d372d0a9a2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Reason: no storage; value is handed off directly."
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-80d8-9462-c52c0540cccd",
            "type": "bulleted_list",
            "richText": [
                [
                    "Receive blocks",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-804e-8f83-df8989502e23",
            "type": "bulleted_list",
            "richText": [
                [
                    "Blocks until another goroutine sends."
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-80eb-8cb9-d710eedce01b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Reason: nothing to read unless a send happens."
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-80e5-8897-dd478b4834ed",
            "type": "bulleted_list",
            "richText": [
                [
                    "Backpressure",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-80b3-bc5f-ef09d88cbe3e",
            "type": "bulleted_list",
            "richText": [
                [
                    "Immediate and strict."
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-803f-b146-cab55b24fcdd",
            "type": "bulleted_list",
            "richText": [
                [
                    "Producer speed is "
                ],
                [
                    "exactly limited",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " by consumer speed."
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-805b-a613-e20e41a81d3c",
            "type": "bulleted_list",
            "richText": [
                [
                    "If consumer slows or stops, producer blocks instantly."
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-808a-b84c-e97e2d1da982",
            "type": "bulleted_list",
            "richText": [
                [
                    "Effect",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-8034-a18f-c11f3af1d803",
            "type": "bulleted_list",
            "richText": [
                [
                    "Enforces synchronization."
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-80d7-8a3c-cb143d34dcea",
            "type": "bulleted_list",
            "richText": [
                [
                    "Guarantees no value exists without a receiver."
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-80cd-85b0-e9eb246e18df",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Buffered channel ("
                ],
                [
                    "make(chan T, N)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ")"
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-809c-be35-db1b85928541",
            "type": "bulleted_list",
            "richText": [
                [
                    "Send blocks",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-8083-aaed-c1a3b4be6fe5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Does "
                ],
                [
                    "not",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " block while buffer has free slots."
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-803c-8a06-c042ff7f4c50",
            "type": "bulleted_list",
            "richText": [
                [
                    "Blocks only when buffer is full."
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-8081-a6d8-e4b87557ac3f",
            "type": "bulleted_list",
            "richText": [
                [
                    "Receive blocks",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-8086-94d0-ef8fb7088706",
            "type": "bulleted_list",
            "richText": [
                [
                    "Does "
                ],
                [
                    "not",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " block while buffer has values."
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-8015-b1c6-fcf75be02658",
            "type": "bulleted_list",
            "richText": [
                [
                    "Blocks only when buffer is empty."
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-806d-b771-cba4058f7559",
            "type": "bulleted_list",
            "richText": [
                [
                    "Backpressure",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-8043-824b-ec7dc6a3d59f",
            "type": "bulleted_list",
            "richText": [
                [
                    "Delayed."
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-80a0-a550-e1465e9c8b1d",
            "type": "bulleted_list",
            "richText": [
                [
                    "Producer can run ahead by up to "
                ],
                [
                    "N",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " values."
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-8066-9724-d123e55cba41",
            "type": "bulleted_list",
            "richText": [
                [
                    "Backpressure appears "
                ],
                [
                    "only after buffer fills",
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
            "id": "2f424eb1-ed54-80a6-89eb-cfb29f9405fb",
            "type": "bulleted_list",
            "richText": [
                [
                    "Effect",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-80dd-99fc-c7b90c3376ab",
            "type": "bulleted_list",
            "richText": [
                [
                    "Decouples producer and consumer temporarily."
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-80cf-a2f7-e79e52def197",
            "type": "bulleted_list",
            "richText": [
                [
                    "Trades memory for throughput."
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-8044-80fa-fdcd91ba0990",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Direct comparison (what changes)"
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-8050-83bc-c9a234522cf8",
            "type": "bulleted_list",
            "richText": [
                [
                    "Blocking point",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-8025-a0c6-e446006cf54f",
            "type": "bulleted_list",
            "richText": [
                [
                    "Unbuffered: at every send/receive."
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-804b-b256-ccb40b4c77d4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Buffered: only at buffer limits (full or empty)."
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-805b-846e-f4a09535115d",
            "type": "bulleted_list",
            "richText": [
                [
                    "Backpressure timing",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-800a-96bd-ff890bc10dea",
            "type": "bulleted_list",
            "richText": [
                [
                    "Unbuffered: immediate."
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-80ea-816f-ea7a553cadd6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Buffered: deferred until buffer exhaustion."
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-80f0-95bf-eaf4f445a98f",
            "type": "bulleted_list",
            "richText": [
                [
                    "Flow control",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-803a-a81c-f99ba33cd3cd",
            "type": "bulleted_list",
            "richText": [
                [
                    "Unbuffered: pull-based (consumer-driven)."
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-80f0-a9e7-ff125f86daee",
            "type": "bulleted_list",
            "richText": [
                [
                    "Buffered: burst-based (producer can burst up to "
                ],
                [
                    "N",
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
            "id": "2f424eb1-ed54-80c0-8772-ccc65abe6d60",
            "type": "bulleted_list",
            "richText": [
                [
                    "Failure mode",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-80d6-b5c2-c7c26d0a3215",
            "type": "bulleted_list",
            "richText": [
                [
                    "Unbuffered: deadlock appears early and clearly."
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-80de-96e6-fd4242adb0c1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Buffered: deadlock or overload appears later, after buffer fills."
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-8046-b0b0-f1002c0ee031",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Key rule to remember"
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-802c-8c14-f1162ef857de",
            "type": "bulleted_list",
            "richText": [
                [
                    "Buffering "
                ],
                [
                    "does not remove backpressure",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-80ca-848f-c2627fd863f2",
            "type": "bulleted_list",
            "richText": [
                [
                    "It "
                ],
                [
                    "moves it later",
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
                    "hides it temporarily",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-804a-b900-dc3fef1dd93c",
            "type": "divider"
        },
        {
            "id": "2f324eb1-ed54-80ca-8744-e059a85da471",
            "type": "sub_header",
            "richText": [
                [
                    "select",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ": what happens with multiple ready cases."
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-8092-aba1-c226ba9f9a7f",
            "type": "bulleted_list",
            "richText": [
                [
                    "If more than one case can proceed immediately:"
                ]
            ],
            "children": [
                {
                    "id": "2f424eb1-ed54-806b-b007-e3bf593fb86f",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Go selects "
                        ],
                        [
                            "exactly one",
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
                    "id": "2f424eb1-ed54-8066-8a4d-dfb19a75ae65",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Selection is "
                        ],
                        [
                            "pseudo-random",
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
                }
            ]
        },
        {
            "id": "2f424eb1-ed54-8054-a407-c002ac72e97c",
            "type": "bulleted_list",
            "richText": [
                [
                    "No priority."
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-80ec-b6a4-f4873e19ce1d",
            "type": "bulleted_list",
            "richText": [
                [
                    "No ordering guarantee."
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-80f6-b283-ed4fd52a8eb5",
            "type": "bulleted_list",
            "richText": [
                [
                    "You must assume "
                ],
                [
                    "any",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " ready case can run."
                ]
            ]
        },
        {
            "id": "2f424eb1-ed54-8095-b41c-fea71cd87e22",
            "type": "bulleted_list",
            "richText": [
                [
                    "default",
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
                    " case",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ],
            "children": [
                {
                    "id": "2f424eb1-ed54-80d1-8fd8-dbf42b271864",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Runs "
                        ],
                        [
                            "only if no other case is ready",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            " at that moment."
                        ]
                    ]
                },
                {
                    "id": "2f424eb1-ed54-8077-a225-d1b3d161b586",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "default",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ],
                        [
                            " makes "
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
                            " "
                        ],
                        [
                            "non-blocking",
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
                    "id": "2f424eb1-ed54-809b-a9d7-c308b7e34900",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "If at least one non-"
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
                            " case is ready:"
                        ]
                    ],
                    "children": [
                        {
                            "id": "2f424eb1-ed54-80eb-870d-f0f67b52c9d0",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "default",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " is "
                                ],
                                [
                                    "ignored",
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
                        }
                    ]
                },
                {
                    "id": "2f424eb1-ed54-8032-9b4f-f90303306cd0",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Common use:"
                        ]
                    ],
                    "children": [
                        {
                            "id": "2f424eb1-ed54-80c5-8bdd-d3b9057bceda",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Polling."
                                ]
                            ]
                        },
                        {
                            "id": "2f424eb1-ed54-80aa-bd77-d2738c361bde",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Avoiding blocking."
                                ]
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2f424eb1-ed54-80cc-af8f-d215dff26c8d",
            "type": "bulleted_list",
            "richText": [
                [
                    "nil",
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
                    " channels",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ],
            "children": [
                {
                    "id": "2f424eb1-ed54-80e1-b99d-dc7a47347e81",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Send or receive on a "
                        ],
                        [
                            "nil",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ],
                        [
                            " channel:"
                        ]
                    ],
                    "children": [
                        {
                            "id": "2f424eb1-ed54-806c-989f-de35a2672856",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Blocks forever",
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
                        }
                    ]
                },
                {
                    "id": "2f424eb1-ed54-8062-8693-f251585c908b",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "In "
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
                            ":"
                        ]
                    ],
                    "children": [
                        {
                            "id": "2f424eb1-ed54-8031-8ee0-d567970fcea1",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "A case with a "
                                ],
                                [
                                    "nil",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " channel is "
                                ],
                                [
                                    "never ready",
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
                            "id": "2f424eb1-ed54-804b-8665-e6865998af72",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "It is effectively "
                                ],
                                [
                                    "disabled",
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
                        }
                    ]
                },
                {
                    "id": "2f424eb1-ed54-8045-8757-eb8465fcde5f",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "If all cases use "
                        ],
                        [
                            "nil",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ],
                        [
                            " channels and no "
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
                            ":"
                        ]
                    ],
                    "children": [
                        {
                            "id": "2f424eb1-ed54-80fc-881b-e0872fabd01a",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "select",
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
                        }
                    ]
                },
                {
                    "id": "2f424eb1-ed54-8062-b33c-c7e40c5438cd",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "If all cases use "
                        ],
                        [
                            "nil",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ],
                        [
                            " channels and a "
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
                            " exists:"
                        ]
                    ],
                    "children": [
                        {
                            "id": "2f424eb1-ed54-805e-aa61-daef2180a663",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "default",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " always runs."
                                ]
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2f424eb1-ed54-8006-9927-cc0d7d18b806",
            "type": "bulleted_list",
            "richText": [
                [
                    "Combining them",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ],
            "children": [
                {
                    "id": "2f424eb1-ed54-8018-b3b8-c860baa73bcc",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Multiple ready cases + "
                        ],
                        [
                            "default",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2f424eb1-ed54-807b-a005-fbfd2c42a796",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "One of the ready cases is chosen."
                                ]
                            ]
                        },
                        {
                            "id": "2f424eb1-ed54-8043-aa47-fbfa1174cfc1",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "default",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " does not run."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2f424eb1-ed54-8044-8424-cfb9c28d063b",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Ready cases + some "
                        ],
                        [
                            "nil",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ],
                        [
                            " channels"
                        ]
                    ],
                    "children": [
                        {
                            "id": "2f424eb1-ed54-80eb-b0eb-ce7eb3c0bd20",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "nil",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " cases are ignored."
                                ]
                            ]
                        },
                        {
                            "id": "2f424eb1-ed54-803b-a1e8-eddc8d8e7d83",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "Selection happens among non-"
                                ],
                                [
                                    "nil",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " ready cases."
                                ]
                            ]
                        }
                    ]
                },
                {
                    "id": "2f424eb1-ed54-800c-aeb4-e7b50936bf5d",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Only "
                        ],
                        [
                            "nil",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ],
                        [
                            " cases + "
                        ],
                        [
                            "default",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ]
                    ],
                    "children": [
                        {
                            "id": "2f424eb1-ed54-8024-8ace-c4b44fbb0c16",
                            "type": "bulleted_list",
                            "richText": [
                                [
                                    "default",
                                    [
                                        [
                                            "c"
                                        ]
                                    ]
                                ],
                                [
                                    " runs immediately."
                                ]
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2f424eb1-ed54-8090-a4a5-e64f937767a2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Key rule to remember",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ],
            "children": [
                {
                    "id": "2f424eb1-ed54-807f-a11a-dc3a9f36013b",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "select",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ],
                        [
                            " considers "
                        ],
                        [
                            "only cases that can proceed now",
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
                    "id": "2f424eb1-ed54-80c0-bf6f-c7dfa4ce9288",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "nil",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ],
                        [
                            " channels never proceed."
                        ]
                    ]
                },
                {
                    "id": "2f424eb1-ed54-8065-8611-d0c3dd257015",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "default",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ],
                        [
                            " proceeds only when nothing else can."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f324eb1-ed54-800f-982a-d32bf36d9723",
            "type": "sub_header",
            "richText": [
                [
                    "Goroutine leaks: Show me the code path that blocks forever on send/recv."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-806a-9422-e7ac4295e88a",
            "type": "sub_header",
            "richText": [
                [
                    "Context cancellation where do you check "
                ],
                [
                    "ctx.Done()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " and how do you make send/recv cancellable."
                ]
            ]
        }
    ]
} as const satisfies GoNote;

export default note;
