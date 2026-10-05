/* Go study notes, refined from the original Notion import. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-80e4-ae95-d890f035f808",
    "slug": "channels",
    "title": "Channels",
    "updatedOn": "2026-10-05",
    "blocks": [
        {
            "id": "ff025372-f4f7-5756-98a5-dc14120d4ab6",
            "type": "bulleted_list",
            "richText": [
                [
                    "A channel sends values of one type between goroutines."
                ]
            ]
        },
        {
            "id": "65b291ca-8bed-5998-adc2-9cdb4224ccae",
            "type": "bulleted_list",
            "richText": [
                [
                    "Sending copies the value."
                ]
            ]
        },
        {
            "id": "08db5b69-d269-59af-b382-30d9947f34f9",
            "type": "bulleted_list",
            "richText": [
                [
                    "Sending a pointer or slice does not copy the data it refers to."
                ]
            ]
        },
        {
            "id": "1128258d-fc63-5fa4-8d70-0b5233f6a5d2",
            "type": "bulleted_list",
            "richText": [
                [
                    "A channel can pass control of data to another goroutine."
                ]
            ]
        },
        {
            "id": "94bcfd9f-dad9-50b5-91bd-537f26acf7d8",
            "type": "bulleted_list",
            "richText": [
                [
                    "If goroutines share data and one writes, protect their accesses."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80e7-a11a-fa29aaf22140",
            "type": "sub_header",
            "richText": [
                [
                    "Declaring & Creating Channels in Go"
                ]
            ]
        },
        {
            "id": "0fbb7e4d-4264-5951-b310-753db2321501",
            "type": "code",
            "richText": [
                [
                    "// These create different channels.\nunbuffered := make(chan int)\nbuffered := make(chan int, 3)\n\n// Operation reference: a send needs a receiver or buffer space.\nbuffered <- 5\nvalue := <-buffered\n_ = value\n_ = unbuffered"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "d56c3e93-38a7-552f-aaba-6ea3a26455fd",
            "type": "bulleted_list",
            "richText": [
                [
                    "Send: "
                ],
                [
                    "ch <- value",
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
            "id": "ab08691f-0159-5884-bc79-a86b05101aae",
            "type": "bulleted_list",
            "richText": [
                [
                    "Receive: "
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
                    "."
                ]
            ]
        },
        {
            "id": "2b43af84-56d0-5fff-b850-de127759621d",
            "type": "bulleted_list",
            "richText": [
                [
                    "Receive and store: "
                ],
                [
                    "value := <-ch",
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
            "id": "374b60d1-6cbd-5193-b6ee-eb4c5d69f00f",
            "type": "bulleted_list",
            "richText": [
                [
                    "A buffered channel holds at most its capacity."
                ]
            ]
        },
        {
            "id": "17455973-9b08-5858-900f-34ad098be3f9",
            "type": "bulleted_list",
            "richText": [
                [
                    "len(ch)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " gives the number of queued values at that moment."
                ]
            ]
        },
        {
            "id": "933259b0-2123-542c-a1ac-d1162a893f66",
            "type": "bulleted_list",
            "richText": [
                [
                    "That number does not guarantee that a later send or receive will be ready."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-808c-975f-c7bd9177d559",
            "type": "sub_header",
            "richText": [
                [
                    "Blocking and Backpressure"
                ]
            ]
        },
        {
            "id": "7c9b0c88-02fd-536d-b22c-328f06696bd3",
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
                    "id": "afb55dd9-34c8-586c-be46-71ad3054106d",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Channel state"
                            ]
                        ],
                        "column-1": [
                            [
                                "Send"
                            ]
                        ],
                        "column-2": [
                            [
                                "Receive"
                            ]
                        ]
                    }
                },
                {
                    "id": "33deabee-3f84-5b36-b57f-64410982c95f",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Open, unbuffered"
                            ]
                        ],
                        "column-1": [
                            [
                                "Wait for a receiver."
                            ]
                        ],
                        "column-2": [
                            [
                                "Wait for a sender."
                            ]
                        ]
                    }
                },
                {
                    "id": "d1c042c2-746a-517b-8292-0b6de4771eef",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Open, buffered"
                            ]
                        ],
                        "column-1": [
                            [
                                "Wait if the buffer is full and no receiver makes space."
                            ]
                        ],
                        "column-2": [
                            [
                                "Wait if the buffer is empty and no sender supplies a value."
                            ]
                        ]
                    }
                },
                {
                    "id": "790de1f9-e8f2-5807-b9e0-8ce9c95bb43f",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Closed"
                            ]
                        ],
                        "column-1": [
                            [
                                "Panic."
                            ]
                        ],
                        "column-2": [
                            [
                                "Receive queued values first. Then return the zero value without waiting."
                            ]
                        ]
                    }
                },
                {
                    "id": "547a387a-0113-504e-af25-5883a43df8cc",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Nil"
                            ]
                        ],
                        "column-1": [
                            [
                                "Wait forever."
                            ]
                        ],
                        "column-2": [
                            [
                                "Wait forever."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "0f284ac4-b2dc-5d60-becf-703b9bca6eab",
            "type": "bulleted_list",
            "richText": [
                [
                    "Backpressure means a slow receiver makes the sender wait."
                ]
            ]
        },
        {
            "id": "acd047a2-8695-580d-886f-f513f0d32c8c",
            "type": "bulleted_list",
            "richText": [
                [
                    "An unbuffered channel needs a receiver for each send."
                ]
            ]
        },
        {
            "id": "f2f24d7a-36f2-586d-a177-ae74bd0afdab",
            "type": "bulleted_list",
            "richText": [
                [
                    "A buffer lets the sender queue some values before waiting."
                ]
            ]
        },
        {
            "id": "8eed765a-5e42-5308-a58a-d5670e4c9634",
            "type": "bulleted_list",
            "richText": [
                [
                    "A buffer does not make the receiver faster or fix a missing receiver."
                ]
            ]
        },
        {
            "id": "6670eea0-5b45-5924-ab45-a1a416f683e3",
            "type": "code",
            "richText": [
                [
                    "// Deliberately blocking example.\nch := make(chan int, 2)\nch <- 1\nch <- 2\nch <- 3 // blocks here unless another goroutine receives"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "4ee85b29-9b20-5105-bd74-08580ca10ce0",
            "type": "bulleted_list",
            "richText": [
                [
                    "Choose a buffer size that fits the expected bursts of values and the available memory."
                ]
            ]
        },
        {
            "id": "c81aaeb9-2da4-546f-a9ad-cd1a10f33cd5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Decide what to do when the queue is full: wait, reject the value, drop it or cancel the work."
                ]
            ]
        },
        {
            "id": "f7a5bbde-3643-52a2-8e60-3618e87bf82c",
            "type": "bulleted_list",
            "richText": [
                [
                    "A larger buffer does not guarantee faster processing."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-809f-86f8-c96d2af239d0",
            "type": "sub_header",
            "richText": [
                [
                    "Directional Channels (Type Safety)"
                ]
            ]
        },
        {
            "id": "58bf51ad-3c3c-5a1d-a4f9-701c71a1b07e",
            "type": "bulleted_list",
            "richText": [
                [
                    "A function parameter can allow only sending or only receiving."
                ]
            ]
        },
        {
            "id": "c764ec34-aacb-5334-b40e-f5e573082c4d",
            "type": "code",
            "richText": [
                [
                    "func produce(output chan<- int) { /* send only */ }\nfunc consume(input <-chan int) { /* receive only */ }"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "f1bc4eb5-36e7-5064-8a2d-81992dac3540",
            "type": "bulleted_list",
            "richText": [
                [
                    "chan<- T",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ": send values and close the channel."
                ]
            ]
        },
        {
            "id": "677e6d68-9934-563b-9dcb-a6b1da4496cb",
            "type": "bulleted_list",
            "richText": [
                [
                    "<-chan T",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ": receive values."
                ]
            ]
        },
        {
            "id": "f6aebe04-e03d-54d4-9111-225a9a12c708",
            "type": "bulleted_list",
            "richText": [
                [
                    "Changing the direction does not create a new channel."
                ]
            ]
        },
        {
            "id": "1ed83181-17f7-582a-83d9-69f62d527609",
            "type": "bulleted_list",
            "richText": [
                [
                    "The direction limits operations through that variable. It does not decide which sender should close the channel."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8009-9dae-c2ad460b8fae",
            "type": "sub_header",
            "richText": [
                [
                    "Closing Channels"
                ]
            ]
        },
        {
            "id": "30b668a0-f6bb-5be3-9727-b2de9e059616",
            "type": "bulleted_list",
            "richText": [
                [
                    "Close the channel when no more values will be sent."
                ]
            ]
        },
        {
            "id": "d234ea8e-a10f-5355-8395-d0246779136c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Let the sender close it, or use a coordinator that waits until every sender has finished."
                ]
            ]
        },
        {
            "id": "0b1a6cdf-131e-507f-b164-dd97dc059dc2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Sending to a closed channel panics."
                ]
            ]
        },
        {
            "id": "bed2aad6-91c4-519c-ab6d-ec33255e3e0a",
            "type": "bulleted_list",
            "richText": [
                [
                    "Closing an already closed channel panics."
                ]
            ]
        },
        {
            "id": "6456603e-e427-52d2-ad2e-355f38f2560b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Closing a nil channel panics."
                ]
            ]
        },
        {
            "id": "71ab8914-a410-5c13-9518-8008aee4a6c8",
            "type": "bulleted_list",
            "richText": [
                [
                    "A channel does not need to be closed for garbage collection."
                ]
            ]
        },
        {
            "id": "8a3d8f5f-642a-5b14-bc85-e9c7c26806a7",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    "value, ok := <-ch",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " to detect the end of a stream."
                ]
            ]
        },
        {
            "id": "c829aefd-1013-51b1-98ff-6d52fdb2acdb",
            "type": "bulleted_list",
            "richText": [
                [
                    "ok",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is true while receiving values that were sent, including buffered values."
                ]
            ]
        },
        {
            "id": "6842cf79-90d5-550b-b006-aa13644fc03c",
            "type": "bulleted_list",
            "richText": [
                [
                    "ok",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " becomes false after the channel is closed and all buffered values have been received."
                ]
            ]
        },
        {
            "id": "17a560ae-2d5d-546f-9a44-7d2d375b76f3",
            "type": "bulleted_list",
            "richText": [
                [
                    "range",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " receives values until the channel is closed and empty."
                ]
            ]
        },
        {
            "id": "a25faae9-af84-5773-b072-5ee337536ded",
            "type": "bulleted_list",
            "richText": [
                [
                    "If nobody sends or closes the channel, the range keeps waiting."
                ]
            ]
        },
        {
            "id": "a6b01cc5-14ee-5601-8aa7-0217c6589ac9",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport \"fmt\"\n\nfunc main() {\n    ch := make(chan int, 1)\n    ch <- 7\n    close(ch)\n    value, ok := <-ch\n    fmt.Println(value, ok)\n    value, ok = <-ch\n    fmt.Println(value, ok)\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "ed0cf350-3816-5ed1-aab0-b609baca2930",
            "type": "bulleted_list",
            "richText": [
                [
                    "Output: 7 true, then 0 false."
                ]
            ]
        },
        {
            "id": "f2abd55e-f308-5637-a2f7-4a4f6b4a9d05",
            "type": "bulleted_list",
            "richText": [
                [
                    "Zero can also be a real sent value. Use "
                ],
                [
                    "ok",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " to tell whether the stream has ended."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80cf-bf5f-d20b98a35b0d",
            "type": "sub_header",
            "richText": [
                [
                    "Choose a Synchronization Primitive"
                ]
            ]
        },
        {
            "id": "4150dbfe-0c69-50f7-850f-9c9acf133fe7",
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
                    "id": "cd346acd-8ca3-5b5f-8d23-eea909888ba1",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Primitive"
                            ]
                        ],
                        "column-1": [
                            [
                                "Use"
                            ]
                        ],
                        "column-2": [
                            [
                                "Limit"
                            ]
                        ]
                    }
                },
                {
                    "id": "9cf0997c-00b7-5d2b-8fe2-06896e1ddf8d",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Channel"
                            ]
                        ],
                        "column-1": [
                            [
                                "Send values, pass control of data, or signal an event."
                            ]
                        ],
                        "column-2": [
                            [
                                "Does not automatically protect data that goroutines still share."
                            ]
                        ]
                    }
                },
                {
                    "id": "72a4e0dc-2e9f-5a69-a453-d612958b8e9f",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Mutex / RWMutex"
                            ]
                        ],
                        "column-1": [
                            [
                                "Protect shared data while the lock is held."
                            ]
                        ],
                        "column-2": [
                            [
                                "All accesses that may conflict must follow the same locking rules."
                            ]
                        ]
                    }
                },
                {
                    "id": "f1912ba1-a80c-565e-882f-4394cfddb24e",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "WaitGroup"
                            ]
                        ],
                        "column-1": [
                            [
                                "Wait for added tasks to finish."
                            ]
                        ],
                        "column-2": [
                            [
                                "Does not send results or let only one worker update shared data at a time."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "b9cfac0b-5e0f-5e5e-8994-7ba606ec03be",
            "type": "text",
            "richText": [
                [
                    "Rules and examples: "
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
                    ", "
                ],
                [
                    "RWMutex",
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
                    "WaitGroup",
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
            "id": "24724eb1-ed54-80ba-8129-ecce6919c915",
            "type": "sub_header",
            "richText": [
                [
                    "Select Statement (Multiplexing)"
                ]
            ]
        },
        {
            "id": "channels-multiplexing-meaning",
            "type": "bulleted_list",
            "richText": [
                [
                    "Multiplexing means handling several channels through one select statement."
                ]
            ]
        },
        {
            "id": "750e95e6-23f3-578f-883e-bc04dedd82e8",
            "type": "bulleted_list",
            "richText": [
                [
                    "The queue below has room for one value. It already contains that value."
                ]
            ]
        },
        {
            "id": "05df06c9-85fb-5b83-b5fc-cacc5e2269e0",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport \"fmt\"\n\nfunc main() {\n    jobs := make(chan int, 1)\n    jobs <- 1\n    select {\n    case jobs <- 2:\n        fmt.Println(\"queued\")\n    default:\n        fmt.Println(\"queue full\")\n    }\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "cb4f623c-ca4f-5e4e-880b-b27d272e4160",
            "type": "bulleted_list",
            "richText": [
                [
                    "Output: queue full."
                ]
            ]
        },
        {
            "id": "7e647512-f6b9-5112-8d44-943db53e2584",
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
                    " rejects the second send instead of waiting."
                ]
            ]
        },
        {
            "id": "642846d6-377f-50b8-a913-88c54dd0fdf4",
            "type": "text",
            "richText": [
                [
                    "Ready-case choice, default and nil-channel disabling: "
                ],
                [
                    "Select",
                    [
                        [
                            "a",
                            "#/notes/go/select"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8092-93aa-ccf021ca3a54",
            "type": "sub_header",
            "richText": [
                [
                    "Worker Pool: Fan-Out and Fan-In"
                ]
            ]
        },
        {
            "id": "08ed5e3f-b395-5610-b9d7-1215177b7a5b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Fan-out: several workers receive from the same jobs channel."
                ]
            ]
        },
        {
            "id": "3fafe27f-48cc-5b16-9e59-527adc2bb4de",
            "type": "bulleted_list",
            "richText": [
                [
                    "Fan-in: the workers send their results to the same results channel."
                ]
            ]
        },
        {
            "id": "08975a31-7643-5c8e-9068-f7580626ea30",
            "type": "bulleted_list",
            "richText": [
                [
                    "The producer closes jobs after sending all jobs."
                ]
            ]
        },
        {
            "id": "c25128d2-1a57-557e-b4a1-12a907950440",
            "type": "bulleted_list",
            "richText": [
                [
                    "The coordinator closes results after every worker returns."
                ]
            ]
        },
        {
            "id": "c53de6ff-af95-58b5-bc60-9136009847c4",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport (\n    \"fmt\"\n    \"sync\"\n)\n\nfunc worker(jobs <-chan int, results chan<- int, wg *sync.WaitGroup) {\n    defer wg.Done()\n    for job := range jobs {\n        results <- job * job\n    }\n}\n\nfunc main() {\n    jobs := make(chan int)\n    results := make(chan int)\n    var wg sync.WaitGroup\n    for i := 0; i < 3; i++ {\n        wg.Add(1)\n        go worker(jobs, results, &wg)\n    }\n    go func() {\n        defer close(jobs)\n        for job := 1; job <= 5; job++ {\n            jobs <- job\n        }\n    }()\n    go func() {\n        wg.Wait()\n        close(results)\n    }()\n\n    for result := range results {\n        fmt.Println(result)\n    }\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "3f1dafd4-6c44-5f11-aa21-c328acccfb0b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Prints 1, 4, 9, 16 and 25. Their order can change."
                ]
            ]
        },
        {
            "id": "877b1cef-b5e9-5af3-9fde-12d1e578692b",
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
                    " receives results while the workers run, so their unbuffered sends can finish."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80c3-800b-c7dba3701696",
            "type": "sub_header",
            "richText": [
                [
                    "Pipeline"
                ]
            ]
        },
        {
            "id": "b42e2234-f49a-5e77-91bc-e6ae6a1d6821",
            "type": "bulleted_list",
            "richText": [
                [
                    "A pipeline passes the output of one stage to the next stage."
                ]
            ]
        },
        {
            "id": "5a8cd86c-8849-553a-bdba-0bf8dea41577",
            "type": "bulleted_list",
            "richText": [
                [
                    "Each stage closes its own output channel."
                ]
            ]
        },
        {
            "id": "c14a8462-9211-54ab-92e0-f5ab6e245311",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport \"fmt\"\n\nfunc generate() <-chan int {\n    output := make(chan int)\n    go func() {\n        defer close(output)\n        for value := 0; value < 5; value++ {\n            output <- value\n        }\n    }()\n    return output\n}\n\nfunc square(input <-chan int) <-chan int {\n    output := make(chan int)\n    go func() {\n        defer close(output)\n        for value := range input {\n            output <- value * value\n        }\n    }()\n    return output\n}\n\nfunc main() {\n    for value := range square(generate()) {\n        fmt.Println(value)\n    }\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "f185770e-e264-567d-9a4f-a2c6ae323caf",
            "type": "bulleted_list",
            "richText": [
                [
                    "Prints 0, 1, 4, 9 and 16, in that order."
                ]
            ]
        },
        {
            "id": "edc1ad7b-a200-562d-9d15-9ddaa39d8ea0",
            "type": "bulleted_list",
            "richText": [
                [
                    "If the receiver stops early, cancel the stages so they do not wait forever on their sends."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8087-92df-e5e8d939f411",
            "type": "sub_header",
            "richText": [
                [
                    "Real-World Example – Web Crawler"
                ]
            ]
        },
        {
            "id": "a3f07fa4-bce0-5701-ab0f-03b00007fa84",
            "type": "bulleted_list",
            "richText": [
                [
                    "The crawler fetches two pages at the same time."
                ]
            ]
        },
        {
            "id": "13b4e0c6-8db2-5890-b90d-31d047c72b4f",
            "type": "bulleted_list",
            "richText": [
                [
                    "It checks request errors, body-read errors and HTTP status errors."
                ]
            ]
        },
        {
            "id": "b56f83e6-8d92-5634-b8ad-170a1b4444ce",
            "type": "bulleted_list",
            "richText": [
                [
                    "The client timeout limits how long each fetch can take."
                ]
            ]
        },
        {
            "id": "2d338caa-506e-5395-987c-d004f9233344",
            "type": "bulleted_list",
            "richText": [
                [
                    "The caller receives every result. If it stops receiving early, it must also cancel the senders."
                ]
            ]
        },
        {
            "id": "8fb10ee5-a26f-55c5-8c09-c3d66153b145",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport (\n    \"fmt\"\n    \"io\"\n    \"net/http\"\n    \"sync\"\n    \"time\"\n)\n\ntype Result struct {\n    URL string\n    Body string\n    Err error\n}\n\nfunc fetch(client *http.Client, url string) Result {\n    result := Result{URL: url}\n    response, err := client.Get(url)\n    if err != nil {\n        result.Err = err\n        return result\n    }\n    defer response.Body.Close()\n    if response.StatusCode < 200 || response.StatusCode >= 300 {\n        result.Err = fmt.Errorf(\"HTTP status: %s\", response.Status)\n        return result\n    }\n    body, err := io.ReadAll(response.Body)\n    result.Body, result.Err = string(body), err\n    return result\n}\n\nfunc main() {\n    client := &http.Client{Timeout: 5 * time.Second}\n    urls := []string{\"https://example.com\", \"https://go.dev\"}\n    results := make(chan Result)\n    var wg sync.WaitGroup\n    for _, url := range urls {\n        wg.Add(1)\n        go func(url string) {\n            defer wg.Done()\n            results <- fetch(client, url)\n        }(url)\n    }\n    go func() {\n        wg.Wait()\n        close(results)\n    }()\n    for result := range results {\n        if result.Err != nil {\n            fmt.Println(result.URL, result.Err)\n            continue\n        }\n        fmt.Println(\"Fetched\", result.URL, len(result.Body), \"bytes\")\n    }\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "e786471f-a8bc-5c04-a796-a5b31a599cce",
            "type": "bulleted_list",
            "richText": [
                [
                    "Result order, page sizes and errors depend on the network and which goroutine runs first."
                ]
            ]
        },
        {
            "id": "264cf262-8d88-5c5f-bd5f-129fa4ed7594",
            "type": "bulleted_list",
            "richText": [
                [
                    "For many URLs, use a worker pool to limit how many fetches run at once."
                ]
            ]
        },
        {
            "id": "2f324eb1-ed54-800f-982a-d32bf36d9723",
            "type": "sub_header",
            "richText": [
                [
                    "Goroutine Leaks and Exit Paths"
                ]
            ]
        },
        {
            "id": "1f3ed4fa-24d7-5b56-8bf9-3305eb396c72",
            "type": "bulleted_list",
            "richText": [
                [
                    "An unbuffered sender keeps waiting if the receiver has stopped receiving."
                ]
            ]
        },
        {
            "id": "5af8ca2d-f8e4-57d2-beb0-556f330e0d33",
            "type": "bulleted_list",
            "richText": [
                [
                    "A receiver keeps waiting if the channel stays open and no sender remains."
                ]
            ]
        },
        {
            "id": "b9712b05-36f2-522f-a6b3-d2b3ff3ec4a8",
            "type": "bulleted_list",
            "richText": [
                [
                    "A finite buffer may delay the problem. It does not provide a way to stop the goroutines."
                ]
            ]
        },
        {
            "id": "9655cf9c-09c3-5805-b145-45dcf3565c4c",
            "type": "text",
            "richText": [
                [
                    "Cancellable send and receive examples: "
                ],
                [
                    "Context and Timeout",
                    [
                        [
                            "a",
                            "#/notes/go/context-and-timeout"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "0a52fb1c-2f56-5f99-9606-7bb54f685bf0",
            "type": "text",
            "richText": [
                [
                    "Finding why a goroutine is waiting: "
                ],
                [
                    "Goroutines Blocking: Causes & Recovery",
                    [
                        [
                            "a",
                            "#/notes/go/goroutines-blocking-causes-recovery"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "6ed9af15-01a8-5701-abcf-75be01b6dcf3",
            "type": "text",
            "richText": [
                [
                    "Timers and tickers used for scheduling or rate limiting: "
                ],
                [
                    "Date & Time",
                    [
                        [
                            "a",
                            "#/notes/go/date-time"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "aabfa646-c812-5189-94ce-603c34f0f041",
            "type": "text",
            "richText": [
                [
                    "Sources: "
                ],
                [
                    "Channel types",
                    [
                        [
                            "a",
                            "https://go.dev/ref/spec#Channel_types"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "Receive and closure",
                    [
                        [
                            "a",
                            "https://go.dev/ref/spec#Receive_operator"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "Pipeline ownership and cancellation",
                    [
                        [
                            "a",
                            "https://go.dev/blog/pipelines"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "HTTP client timeout",
                    [
                        [
                            "a",
                            "https://pkg.go.dev/net/http#Client"
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
