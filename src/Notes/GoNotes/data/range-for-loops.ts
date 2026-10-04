/* Focused Go study notes, refined from the imported source. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-8042-b4af-da4a7534739a",
    "slug": "range-for-loops",
    "title": "Range & For Loops",
    "updatedOn": "2026-10-04",
    "blocks": [
        {
            "id": "b2b7c0d9-7bc4-5246-af45-9c744a97d1b5",
            "type": "text",
            "richText": [
                [
                    "Go uses "
                ],
                [
                    "for",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " for counted loops, condition-only loops, infinite loops, and range iteration."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80ff-87da-e82b91dd7dc8",
            "type": "sub_header",
            "richText": [
                [
                    "for Loop – Basics"
                ]
            ]
        },
        {
            "id": "52285243-10d9-53b7-b3be-12a67f5e806c",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "for i := 0; i < 3; i++ {\n    fmt.Println(i)\n}\n// Output, one value per line: 0, 1, 2"
                ]
            ]
        },
        {
            "id": "27a6b7e6-6246-53b4-b47d-3e126832da6a",
            "type": "text",
            "richText": [
                [
                    "The initializer runs once. The condition is checked before each iteration. The post statement runs after each completed iteration."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8086-94b0-fb0cf52acd8d",
            "type": "sub_header",
            "richText": [
                [
                    "for as while"
                ]
            ]
        },
        {
            "id": "b54c6808-fd84-5e24-8b82-12977eb1c069",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "i := 0\nfor i < 3 {\n    fmt.Println(i)\n    i++\n}\n// Output, one value per line: 0, 1, 2"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80b6-ba64-d20d82f6c0f0",
            "type": "sub_header",
            "richText": [
                [
                    "Infinite Loop"
                ]
            ]
        },
        {
            "id": "d743409f-0d89-5fca-a2eb-9dfb9aae824f",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "i := 0\nfor {\n    if i == 3 {\n        break\n    }\n    fmt.Println(i)\n    i++\n}\n// Output, one value per line: 0, 1, 2"
                ]
            ]
        },
        {
            "id": "da266570-ffae-55b4-b1c3-a1db4dee3c61",
            "type": "sub_header",
            "richText": [
                [
                    "range: iteration values"
                ]
            ]
        },
        {
            "id": "8aad98bb-c0d2-5cec-8535-d5f7a37dc5bb",
            "type": "table",
            "columnOrder": [
                "col-0",
                "col-1",
                "col-2"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false,
            "children": [
                {
                    "id": "55b920ce-dad8-5da7-afef-b3ccc962d66e",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Range over"
                            ]
                        ],
                        "col-1": [
                            [
                                "First value"
                            ]
                        ],
                        "col-2": [
                            [
                                "Second value"
                            ]
                        ]
                    }
                },
                {
                    "id": "001390a3-73d0-5fd2-bfdf-afe909b1be61",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Array or slice"
                            ]
                        ],
                        "col-1": [
                            [
                                "Element index (int)."
                            ]
                        ],
                        "col-2": [
                            [
                                "Copy of the element value."
                            ]
                        ]
                    }
                },
                {
                    "id": "f31ab7e5-0405-5c8f-bc5c-fb8bc2c0af0e",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "String"
                            ]
                        ],
                        "col-1": [
                            [
                                "Starting byte index (int)."
                            ]
                        ],
                        "col-2": [
                            [
                                "Unicode code point (rune)."
                            ]
                        ]
                    }
                },
                {
                    "id": "14b50858-3de4-565f-9d1c-108ace1519ec",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Map"
                            ]
                        ],
                        "col-1": [
                            [
                                "Key."
                            ]
                        ],
                        "col-2": [
                            [
                                "Copy of the associated value."
                            ]
                        ]
                    }
                },
                {
                    "id": "ae0d9b9d-0621-56b1-bec6-ffe5120dbafb",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Channel"
                            ]
                        ],
                        "col-1": [
                            [
                                "Received element value."
                            ]
                        ],
                        "col-2": [
                            [
                                "No second value."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "24224eb1-ed54-80bf-be74-c156a2276137",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Slice/Array"
                ]
            ]
        },
        {
            "id": "bdb0dadf-73b5-5009-be9b-0deb66adad9f",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "nums := []int{10, 20, 30}\nfor index, value := range nums {\n    fmt.Println(index, value)\n}\n// Output:\n// 0 10\n// 1 20\n// 2 30"
                ]
            ]
        },
        {
            "id": "839a873b-2e70-52fa-a6f9-f77d2b745ae1",
            "type": "text",
            "richText": [
                [
                    "Use only "
                ],
                [
                    "index",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " for indices, or "
                ],
                [
                    "_",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " to ignore it and keep the value. Assigning to the value variable does not replace an element. Update through its index:"
                ]
            ]
        },
        {
            "id": "42887151-2436-5849-adb6-706b23b3b9e1",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "for index := range nums {\n    nums[index]++\n}\nfor _, value := range nums {\n    fmt.Println(value)\n}\n// Output, one value per line: 11, 21, 31"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8066-8642-dfebc21963c2",
            "type": "sub_sub_header",
            "richText": [
                [
                    "String"
                ]
            ]
        },
        {
            "id": "7d8bdd40-942e-5999-91e4-59e1243790a1",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "s := \"Géo\"\nfor index, ch := range s {\n    fmt.Printf(\"%d %c\\n\", index, ch)\n}\nfmt.Println(len(s))\n// Output:\n// 0 G\n// 1 é\n// 3 o\n// 4"
                ]
            ]
        },
        {
            "id": "44150f0f-418e-5095-adf0-85518394b6d7",
            "type": "text",
            "richText": [
                [
                    "The string has 4 UTF-8 bytes and 3 runes. The index is a byte offset, not a rune count. Range decodes runes rather than visiting each byte; it is not a count of displayed characters composed from multiple runes."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8098-8d63-ee6a128dc46f",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Map"
                ]
            ]
        },
        {
            "id": "d6de176b-7cac-5b8b-9f73-2b88900e6b31",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "m := map[string]int{\"a\": 1, \"b\": 2}\nfor key, value := range m {\n    fmt.Println(key, value)\n}\n// Prints a 1 and b 2, in an unspecified order.\n\nfor key := range m {\n    fmt.Println(key)\n}\n// Prints the keys, also in an unspecified order."
                ]
            ]
        },
        {
            "id": "41773933-a988-5330-80ed-98d3d83ad8d3",
            "type": "text",
            "richText": [
                [
                    "Map operation and concurrency rules are covered in "
                ],
                [
                    "Maps",
                    [
                        [
                            "a",
                            "#/notes/go/maps"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        },
        {
            "id": "826c0d8e-5bbe-5597-8d60-c7a5b3b1e088",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Channel"
                ]
            ]
        },
        {
            "id": "cad40785-b6af-545a-b1dd-5bb8c7373232",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "ch := make(chan int)\ngo func() {\n    ch <- 1\n    ch <- 2\n    close(ch)\n}()\n\nfor value := range ch {\n    fmt.Println(value)\n}\n// Output, one value per line: 1, 2"
                ]
            ]
        },
        {
            "id": "052fd9d6-17a8-5209-b0cd-92bd7ab8dc45",
            "type": "text",
            "richText": [
                [
                    "A channel range receives until the channel is closed and buffered values are drained. It blocks if an open channel has no value ready. Range over a nil channel blocks indefinitely."
                ]
            ]
        },
        {
            "id": "00569b1c-d983-5a57-aea5-c1c5114b08ab",
            "type": "text",
            "richText": [
                [
                    "See "
                ],
                [
                    "Channels",
                    [
                        [
                            "a",
                            "#/notes/go/channels"
                        ]
                    ]
                ],
                [
                    " for send, receive, and closure ownership."
                ]
            ]
        },
        {
            "id": "85f21aad-78fa-57df-8b65-8d65b68b2f79",
            "type": "sub_header",
            "richText": [
                [
                    "Loop variable lifetime"
                ]
            ]
        },
        {
            "id": "d221cd09-ef85-547d-9e2b-f5912bff8a4c",
            "type": "text",
            "richText": [
                [
                    "For Go language version 1.22 or later, variables declared by a loop’s "
                ],
                [
                    ":=",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " form are new for each iteration. Variables assigned with "
                ],
                [
                    "=",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " reuse existing variables. Earlier language versions reuse declared loop variables too."
                ]
            ]
        },
        {
            "id": "49d7b8a1-76d3-57e4-9370-759ac4f00292",
            "type": "text",
            "richText": [
                [
                    "See "
                ],
                [
                    "Closures",
                    [
                        [
                            "a",
                            "#/notes/go/closures"
                        ]
                    ]
                ],
                [
                    " for captured-variable examples and version details."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-803d-9620-d2aebf892c71",
            "type": "sub_header",
            "richText": [
                [
                    "break, continue, return"
                ]
            ]
        },
        {
            "id": "e75750bd-5d2d-5b89-b68c-1115385553a8",
            "type": "table",
            "columnOrder": [
                "col-0",
                "col-1"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false,
            "children": [
                {
                    "id": "28d4c954-49e9-5541-afc0-24cf605ad6ad",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "Statement"
                            ]
                        ],
                        "col-1": [
                            [
                                "Effect"
                            ]
                        ]
                    }
                },
                {
                    "id": "6a202d82-a79e-56c9-9b36-c8b6d2481436",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "break",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "Exit the innermost loop (or switch/select, when inside one)."
                            ]
                        ]
                    }
                },
                {
                    "id": "4e0cad14-1e0d-5f3f-8cd2-069282939e39",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "continue",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "Proceed to the next iteration of the innermost loop."
                            ]
                        ]
                    }
                },
                {
                    "id": "a3531b0b-44d4-58c9-b654-8c3913cb6d66",
                    "type": "table_row",
                    "cells": {
                        "col-0": [
                            [
                                "return",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "col-1": [
                            [
                                "Exit the enclosing function."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "24224eb1-ed54-8028-88a2-f651fae78ad3",
            "type": "sub_header",
            "richText": [
                [
                    "Loop Labels"
                ]
            ]
        },
        {
            "id": "00ddb894-90ce-5870-ad6f-8f3c8ac3ef6f",
            "type": "text",
            "richText": [
                [
                    "A labeled break or continue selects an enclosing loop. This example exits both loops when it reaches i == 1 and j == 1:"
                ]
            ]
        },
        {
            "id": "9a8f3ff3-be34-557a-bbb6-4a394aa40af6",
            "type": "code",
            "language": "Go",
            "richText": [
                [
                    "outer:\nfor i := 0; i < 3; i++ {\n    for j := 0; j < 3; j++ {\n        if i == 1 && j == 1 {\n            break outer\n        }\n        fmt.Println(i, j)\n    }\n}\n// Output:\n// 0 0\n// 0 1\n// 0 2\n// 1 0"
                ]
            ]
        },
        {
            "id": "542ffc10-e206-5d2b-b4ae-d8d5e69d5a3b",
            "type": "text",
            "richText": [
                [
                    "Reference: "
                ],
                [
                    "Go specification: for statements",
                    [
                        [
                            "a",
                            "https://go.dev/ref/spec#For_statements"
                        ]
                    ]
                ],
                [
                    "."
                ]
            ]
        }
    ]
} satisfies GoNote;

export default note;
