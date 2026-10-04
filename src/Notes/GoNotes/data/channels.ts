/* Go study notes, refined from the original Notion import. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-80e4-ae95-d890f035f808",
    "slug": "channels",
    "title": "Channels",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "ff025372-f4f7-5756-98a5-dc14120d4ab6",
            "type": "text",
            "richText": [
                [
                    "A channel sends values of one element type between goroutines. Sending a value copies that value; sending a pointer or slice does not copy the data it refers to. Channel communication can coordinate ownership, but shared mutable data still needs a consistent synchronization plan."
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
            "type": "text",
            "richText": [
                [
                    "ch <- value",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " sends a value. "
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
                    " receives one; "
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
                    " stores it. A buffered channel holds at most its capacity. "
                ],
                [
                    "len(ch)",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " reports queued values at that moment, not a guarantee that a later send or receive will proceed."
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
                                "Wait if the buffer is full and no receiver can make space."
                            ]
                        ],
                        "column-2": [
                            [
                                "Wait if the buffer is empty and no sender can supply a value."
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
                                "Drain queued values, then return the element zero value without blocking."
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
                                "Block indefinitely."
                            ]
                        ],
                        "column-2": [
                            [
                                "Block indefinitely."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "0f284ac4-b2dc-5d60-becf-703b9bca6eab",
            "type": "text",
            "richText": [
                [
                    "Backpressure means that downstream capacity limits how quickly a producer can submit work. An unbuffered channel requires a receiver for each send. A buffer lets the producer enqueue some work before waiting; it does not increase the consumer’s processing capacity or fix an absent consumer."
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
            "type": "text",
            "richText": [
                [
                    "Choose buffer capacity from the expected burst and resource limits. A full queue needs an explicit policy: wait, reject, drop, or cancel. None of those policies is a general throughput guarantee."
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
            "type": "text",
            "richText": [
                [
                    "Function parameters can restrict access to a bidirectional channel."
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
            "type": "text",
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
                    " permits sends and closing. "
                ],
                [
                    "<-chan T",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " permits receives. Direction restricts the operations available through that variable; it does not create another channel or enforce which sender owns closure."
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
                    "Close when no more values will be sent. The sender or a coordinator that knows every sender has finished should own that decision."
                ]
            ]
        },
        {
            "id": "0b1a6cdf-131e-507f-b164-dd97dc059dc2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Sending after close or closing an already closed channel panics. Closing a nil channel also panics. You do not need to close every channel for garbage collection."
                ]
            ]
        },
        {
            "id": "8a3d8f5f-642a-5b14-bc85-e9c7c26806a7",
            "type": "bulleted_list",
            "richText": [
                [
                    "For "
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
                    ", "
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
                    " remains true for queued values. It becomes false only after the channel is closed and drained."
                ]
            ]
        },
        {
            "id": "17a560ae-2d5d-546f-9a44-7d2d375b76f3",
            "type": "bulleted_list",
            "richText": [
                [
                    "A channel range receives until closure and drainage. It waits indefinitely if the input stays open without future sends."
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
            "type": "text",
            "richText": [
                [
                    "Expected output: 7 true, then 0 false. The zero value can also be sent as real data, so use "
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
                    " to distinguish a drained channel from a real zero."
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
                                "Owns"
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
                                "Communicate values, transfer ownership, or signal an event."
                            ]
                        ],
                        "column-2": [
                            [
                                "Does not automatically protect objects that goroutines still share."
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
                                "Protect shared state during an agreed lock scope."
                            ]
                        ],
                        "column-2": [
                            [
                                "Every conflicting access must follow the same locking rules."
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
                                "Wait for registered tasks to finish."
                            ]
                        ],
                        "column-2": [
                            [
                                "Does not carry results or serialize workers’ shared updates."
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
                    "Detailed contracts: "
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
            "id": "750e95e6-23f3-578f-883e-bc04dedd82e8",
            "type": "text",
            "richText": [
                [
                    "This program rejects a send when its one-slot queue is already full:"
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
            "type": "text",
            "richText": [
                [
                    "Expected output: queue full. Using "
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
                    " chooses rejection here; it does not make a receiver appear."
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
            "type": "text",
            "richText": [
                [
                    "Three workers share one jobs channel (fan-out) and send to one results channel (fan-in). The producer closes jobs. A coordinator closes results only after every worker returns."
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
            "type": "text",
            "richText": [
                [
                    "The values are 1, 4, 9, 16 and 25, in unspecified order. Main drains results while workers run, so an unbuffered results send has a receiver."
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
            "type": "text",
            "richText": [
                [
                    "A pipeline feeds the output of one stage into the next. This example drains the whole stream; each stage closes only its own output."
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
            "type": "text",
            "richText": [
                [
                    "Expected values in order: 0, 1, 4, 9, 16. If a consumer returns early, the stages need cancellation instead of continuing their ordinary blocking sends."
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
            "type": "text",
            "richText": [
                [
                    "This program fetches two pages concurrently and handles request, body-read and HTTP-status errors. The client timeout bounds each fetch. The caller consumes every result; a caller that abandons results also needs a cancellation path."
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
            "type": "text",
            "richText": [
                [
                    "Order, page sizes and errors depend on scheduling and the network. For many URLs, bound concurrent work with a pool rather than starting one goroutine for every URL."
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
            "type": "text",
            "richText": [
                [
                    "A producer blocked on an unbuffered send cannot return if its consumer has stopped receiving. An open-channel receive likewise has no exit when no sender remains. Adding finite buffer space may postpone the failure but does not provide shutdown."
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
                    "Diagnosis and operation ownership: "
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
