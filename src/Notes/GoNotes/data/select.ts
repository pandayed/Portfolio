/* Go study notes, refined from the original Notion import. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24d24eb1-ed54-80bd-9a09-e4e249368ddf",
    "slug": "select",
    "title": "Select",
    "updatedOn": "2026-10-05",
    "blocks": [
        {
            "id": "28d5d4cf-1b1e-5680-963e-ef8cdce5da55",
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
                    " chooses one channel send or receive that can run now."
                ]
            ]
        },
        {
            "id": "d2973f37-b317-576b-9dcc-d81372eb7256",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use it to wait on several channels, avoid waiting, or respond to cancellation."
                ]
            ]
        },
        {
            "id": "277d0313-1343-5fdd-aeea-19b335c6598c",
            "type": "text",
            "richText": [
                [
                    "Prerequisite: "
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
                    "."
                ]
            ]
        },
        {
            "id": "7cf4e02c-e6c4-5d3a-9ee6-0e22bd325375",
            "type": "sub_header",
            "richText": [
                [
                    "Ready Cases and Default"
                ]
            ]
        },
        {
            "id": "335ca33a-34e6-5162-a699-74e033fa0d61",
            "type": "table",
            "columnOrder": [
                "column-0",
                "column-1"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false,
            "children": [
                {
                    "id": "9b9f98c8-425a-50ca-9366-c903ad1e6211",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Situation"
                            ]
                        ],
                        "column-1": [
                            [
                                "Behavior"
                            ]
                        ]
                    }
                },
                {
                    "id": "d6ad65f6-269e-5871-842b-7ef5e93fc5c9",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "One communication is ready"
                            ]
                        ],
                        "column-1": [
                            [
                                "Run that case."
                            ]
                        ]
                    }
                },
                {
                    "id": "c6a07d2c-0196-5b2f-8607-ae6c005f1e34",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "Several communications are ready"
                            ]
                        ],
                        "column-1": [
                            [
                                "Choose one by uniform pseudo-random selection. Each ready case has the same chance. Source order gives no priority."
                            ]
                        ]
                    }
                },
                {
                    "id": "599ad5b1-f53f-5daa-b8c9-9c5038fbc870",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "None is ready, with "
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
                        "column-1": [
                            [
                                "Run "
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
                                " immediately."
                            ]
                        ]
                    }
                },
                {
                    "id": "aa69cab6-07c6-54a6-afcc-bc10a99e42b0",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "None is ready, without "
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
                        "column-1": [
                            [
                                "Wait until a communication can run."
                            ]
                        ]
                    }
                },
                {
                    "id": "f65dc921-99b2-53ce-b4cc-9d82d9e85b2d",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "A case uses a nil channel"
                            ]
                        ],
                        "column-1": [
                            [
                                "That case cannot run."
                            ]
                        ]
                    }
                },
                {
                    "id": "352ff04c-a514-598e-99e4-3e494b759519",
                    "type": "table_row",
                    "cells": {
                        "column-0": [
                            [
                                "All channels are nil, without "
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
                        "column-1": [
                            [
                                "Wait forever."
                            ]
                        ]
                    }
                }
            ]
        },
        {
            "id": "0b097fa0-49a5-51af-98f1-438d196d9af5",
            "type": "bulleted_list",
            "richText": [
                [
                    "Receiving from a closed channel is ready, even after its buffer is empty."
                ]
            ]
        },
        {
            "id": "94c905c6-0837-5b43-bc5b-f54eabc1b884",
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
                    " may choose a send to a closed channel. That send then panics."
                ]
            ]
        },
        {
            "id": "29321202-1346-51da-a8e8-0139440ee838",
            "type": "bulleted_list",
            "richText": [
                [
                    "Handle channel closure before selecting the same channel again in a loop."
                ]
            ]
        },
        {
            "id": "e0245016-62de-53fa-ad98-618929192905",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport \"fmt\"\n\nfunc main() {\n    ch := make(chan int, 1)\n    select {\n    case value := <-ch:\n        fmt.Println(value)\n    default:\n        fmt.Println(\"no value ready\")\n    }\n\n    ch <- 7\n    select {\n    case value := <-ch:\n        fmt.Println(value)\n    default:\n        fmt.Println(\"no value ready\")\n    }\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "207e294a-46ca-54d9-ba5a-b1b3c8ab8776",
            "type": "bulleted_list",
            "richText": [
                [
                    "Output: no value ready, then 7."
                ]
            ]
        },
        {
            "id": "21469aa7-96a0-58aa-a2a4-f48f897f0c91",
            "type": "bulleted_list",
            "richText": [
                [
                    "Repeatedly running "
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
                    " in a loop can use CPU without doing useful work."
                ]
            ]
        },
        {
            "id": "59776e64-1dbc-5070-a051-cfc78aa76342",
            "type": "bulleted_list",
            "richText": [
                [
                    "Let the operation wait when repeated checking is unnecessary."
                ]
            ]
        },
        {
            "id": "b08d39a0-e517-52d5-ab2e-ea6a0a0ff9e2",
            "type": "sub_header",
            "richText": [
                [
                    "Disable a Finished Channel"
                ]
            ]
        },
        {
            "id": "4489d0aa-d71c-5217-a2e3-9e3c300584c4",
            "type": "bulleted_list",
            "richText": [
                [
                    "After a channel closes, set its local variable to nil."
                ]
            ]
        },
        {
            "id": "e1e34e55-e6ff-5f6e-a53b-1ac46a668972",
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
                    " then skips that input instead of receiving zero values repeatedly."
                ]
            ]
        },
        {
            "id": "2669dd92-9aee-54a0-b6a8-0604e46714d4",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport \"fmt\"\n\nfunc main() {\n    first := make(chan int, 1)\n    second := make(chan int, 1)\n    first <- 10\n    second <- 20\n    close(first)\n    close(second)\n\n    for first != nil || second != nil {\n        select {\n        case value, ok := <-first:\n            if !ok {\n                first = nil\n                continue\n            }\n            fmt.Println(value)\n        case value, ok := <-second:\n            if !ok {\n                second = nil\n                continue\n            }\n            fmt.Println(value)\n        }\n    }\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "374fa693-e10a-54ee-a6a2-497d1933640d",
            "type": "bulleted_list",
            "richText": [
                [
                    "Prints 10 and 20 once each, in either order, then exits."
                ]
            ]
        },
        {
            "id": "f6ed5de6-0819-59d1-95c5-3093dbf3162c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Setting one channel variable to nil does not change other variables that refer to that channel."
                ]
            ]
        },
        {
            "id": "1921f009-f98e-50c9-8b4e-77acabf6e683",
            "type": "sub_header",
            "richText": [
                [
                    "Evaluation and Cancellation"
                ]
            ]
        },
        {
            "id": "c5a18cc6-3589-5315-8200-9b6cd32f3643",
            "type": "bulleted_list",
            "richText": [
                [
                    "On entry, "
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
                    " evaluates the channel expressions and send values once, in source order."
                ]
            ]
        },
        {
            "id": "1ed56aa5-006e-5a0a-aa0e-7cc047395ce0",
            "type": "bulleted_list",
            "richText": [
                [
                    "It evaluates them even for cases it does not choose."
                ]
            ]
        },
        {
            "id": "8e74f5ed-ca96-5e3a-b30d-1cc452fb56a8",
            "type": "bulleted_list",
            "richText": [
                [
                    "A function call in a send expression therefore runs even if that case is not chosen."
                ]
            ]
        },
        {
            "id": "4a8f64e2-8620-5f69-94c4-587512b41653",
            "type": "bulleted_list",
            "richText": [
                [
                    "Calculate a costly send value before "
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
                    " when that makes its timing clearer."
                ]
            ]
        },
        {
            "id": "0cadd8e6-3a50-52c1-8cd5-f4601d5e851c",
            "type": "bulleted_list",
            "richText": [
                [
                    "A cancellation case does not take priority over another ready case."
                ]
            ]
        },
        {
            "id": "3ee2f564-b9fc-50f3-bc61-10c67218dbbb",
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
                    " cannot interrupt work already running inside the chosen case."
                ]
            ]
        },
        {
            "id": "0c1c8968-d4ec-5c08-93da-4b45ad43ce96",
            "type": "text",
            "richText": [
                [
                    "Cancellation and timeout examples: "
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
                    ", "
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
            "id": "6f492890-71a3-5e70-920e-a8b78d714c18",
            "type": "text",
            "richText": [
                [
                    "Source: "
                ],
                [
                    "Select statements",
                    [
                        [
                            "a",
                            "https://go.dev/ref/spec#Select_statements"
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
