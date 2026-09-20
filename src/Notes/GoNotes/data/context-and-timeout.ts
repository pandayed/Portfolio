/* Copied from the Context and Timeout page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-804f-9003-d174de99397f",
    "slug": "context-and-timeout",
    "title": "Context and Timeout",
    "updatedOn": "2026-01-23",
    "blocks": [
        {
            "id": "2f124eb1-ed54-80db-91fe-db9db580f21d",
            "type": "bulleted_list",
            "richText": [
                [
                    "context",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is a "
                ],
                [
                    "standard mechanism",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " to carry:"
                ]
            ],
            "children": [
                {
                    "id": "2f124eb1-ed54-8007-8eb5-f21b77e183e9",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "cancellation signals"
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-8088-ab36-c0220c795fb4",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "deadlines / timeouts"
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-80b2-90f2-eeffd2e6a195",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "request-scoped values"
                        ]
                    ]
                }
            ]
        },
        {
            "id": "2f124eb1-ed54-8049-8b1e-cc35e5029b81",
            "type": "bulleted_list",
            "richText": [
                [
                    "It is used to "
                ],
                [
                    "control the lifetime of operations",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " across function and goroutine boundaries."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80c3-99d5-c27d026d84d3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Helps in "
                ],
                [
                    "controlling goroutine lifecycles",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", avoiding memory leaks."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80c2-bb5a-e79f574e2fb0",
            "type": "divider"
        },
        {
            "id": "24724eb1-ed54-80ad-b1fd-f265c35ce39f",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Why?",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80dc-a5f4-ef43965b9045",
            "type": "bulleted_list",
            "richText": [
                [
                    "Cancel background work if the parent task is cancelled."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8089-b750-de27e661281d",
            "type": "bulleted_list",
            "richText": [
                [
                    "Set timeouts/deadlines for operations (e.g., HTTP request, DB query)."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8074-b42d-d739974ad674",
            "type": "bulleted_list",
            "richText": [
                [
                    "Pass request-scoped values (like auth token, user ID) without global state."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8000-9ecd-fad4d6c34f7c",
            "type": "divider"
        },
        {
            "id": "24724eb1-ed54-802a-8049-ee6ce6d1cc17",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Core Methods of ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "context.Context",
                    [
                        [
                            "b"
                        ],
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8062-8340-deba373c0031",
            "type": "table",
            "children": [
                {
                    "id": "24724eb1-ed54-80de-9027-d001dffccf19",
                    "type": "table_row",
                    "cells": {
                        "Fifu": [
                            [
                                "Method"
                            ]
                        ],
                        "TWLK": [
                            [
                                "Purpose"
                            ]
                        ]
                    }
                },
                {
                    "id": "24724eb1-ed54-805d-a0b0-eb5a4d509306",
                    "type": "table_row",
                    "cells": {
                        "Fifu": [
                            [
                                "Deadline()",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "TWLK": [
                            [
                                "Returns when the context times out"
                            ]
                        ]
                    }
                },
                {
                    "id": "24724eb1-ed54-8060-89fd-d127ca62efe4",
                    "type": "table_row",
                    "cells": {
                        "Fifu": [
                            [
                                "Done()",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "TWLK": [
                            [
                                "Returns a channel that is closed on cancel/timeout"
                            ]
                        ]
                    }
                },
                {
                    "id": "24724eb1-ed54-800c-8641-d1bf2bdc7821",
                    "type": "table_row",
                    "cells": {
                        "Fifu": [
                            [
                                "Err()",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "TWLK": [
                            [
                                "Returns reason for closure ("
                            ],
                            [
                                "Canceled",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ],
                            [
                                " or "
                            ],
                            [
                                "DeadlineExceeded",
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
                    }
                },
                {
                    "id": "24724eb1-ed54-80f9-a28f-c49a68ef280e",
                    "type": "table_row",
                    "cells": {
                        "Fifu": [
                            [
                                "Value(key)",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ],
                        "TWLK": [
                            [
                                "Gets values stored in the context"
                            ]
                        ]
                    }
                }
            ],
            "columnOrder": [
                "Fifu",
                "TWLK"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false
        },
        {
            "id": "24724eb1-ed54-800b-8d0c-fec54ffbcb28",
            "type": "divider"
        },
        {
            "id": "24724eb1-ed54-8091-bd20-d97f3cd8c84a",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Creating Contexts",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80a6-9992-de88e1235c99",
            "type": "text",
            "richText": [
                [
                    "Use these to create derived contexts:"
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8048-aa8c-fe15e65c7193",
            "type": "sub_sub_header",
            "richText": [
                [
                    "context.WithCancel(parent)",
                    [
                        [
                            "b"
                        ],
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80cf-9186-fdc93337ee0e",
            "type": "bulleted_list",
            "richText": [
                [
                    "Manual cancel trigger."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8052-9f83-e842c7810d0e",
            "type": "code",
            "richText": [
                [
                    "ctx, cancel := context.WithCancel(context.Background())\ndefer cancel()"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24724eb1-ed54-8029-9f13-d8b2d8625fc4",
            "type": "sub_sub_header",
            "richText": [
                [
                    "context.WithTimeout(parent, duration)",
                    [
                        [
                            "b"
                        ],
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8053-af02-ca816fa371ca",
            "type": "bulleted_list",
            "richText": [
                [
                    "Auto cancel after timeout."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8090-a496-ec1078331966",
            "type": "code",
            "richText": [
                [
                    "ctx, cancel := context.WithTimeout(context.Background(), 2*time.Second)\ndefer cancel()"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24724eb1-ed54-80f9-9ec5-ee4a5eae6180",
            "type": "sub_sub_header",
            "richText": [
                [
                    "context.WithDeadline(parent, time.Time)",
                    [
                        [
                            "b"
                        ],
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80e9-976e-ee6decc5dc4b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Like "
                ],
                [
                    "WithTimeout",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " but with absolute time."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80df-9dd8-d1f391da8643",
            "type": "sub_sub_header",
            "richText": [
                [
                    "context.WithValue(parent, key, value)",
                    [
                        [
                            "b"
                        ],
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80ec-a1b8-c223bc667c55",
            "type": "bulleted_list",
            "richText": [
                [
                    "Attaches key-value to context (use "
                ],
                [
                    "only for request-scoped data",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ")."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-808e-9dfb-ea81e4b54682",
            "type": "code",
            "richText": [
                [
                    "ctx := context.WithValue(context.Background(), \"userID\", 42)"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24724eb1-ed54-80be-a8b2-e68940c2cfc9",
            "type": "divider"
        },
        {
            "id": "24724eb1-ed54-804e-8fad-df5177cff20b",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Done()",
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
                    " Channel – The Cancellation Signal",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8002-a60c-ff374ce990ec",
            "type": "code",
            "richText": [
                [
                    "select {\ncase <-ctx.Done():\n    // Cancelled or timed out\ncase result := <-someWork:\n    // Proceed\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24724eb1-ed54-803f-8679-e8fcda34286a",
            "type": "bulleted_list",
            "richText": [
                [
                    "Done()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is closed when:"
                ]
            ],
            "children": [
                {
                    "id": "24724eb1-ed54-802a-b8b9-c9de2d715efd",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Timeout hits"
                        ]
                    ]
                },
                {
                    "id": "24724eb1-ed54-809a-8860-c1d532297dbd",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "cancel()",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ],
                        [
                            " is called"
                        ]
                    ]
                },
                {
                    "id": "24724eb1-ed54-80cb-b3c5-cf3dbc5c5a1e",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Parent context is cancelled"
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24724eb1-ed54-8083-9fa5-f460da0a6ac7",
            "type": "divider"
        },
        {
            "id": "24724eb1-ed54-804f-98d0-caee5bedbfc7",
            "type": "sub_sub_header",
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
            "id": "24724eb1-ed54-803b-8ab7-fe3d344d2bee",
            "type": "bulleted_list",
            "richText": [
                [
                    "Always "
                ],
                [
                    "defer cancel()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " when using "
                ],
                [
                    "WithCancel",
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
                    "WithTimeout",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", or "
                ],
                [
                    "WithDeadline",
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
            "id": "24724eb1-ed54-8042-9f83-f6985d9168b1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Don’t use context to carry optional parameters (e.g., not for config or logger)."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8080-ad57-f5cfab845de1",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use small-scoped context chains. Don't pass root context (e.g. "
                ],
                [
                    "context.Background()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ") deep into layers."
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8001-9c2c-d4c63a119994",
            "type": "divider"
        },
        {
            "id": "24724eb1-ed54-8086-b909-c6176c088f52",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Common Use Cases",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-809e-92b1-e03623e2b91e",
            "type": "table",
            "children": [
                {
                    "id": "24724eb1-ed54-8076-86f2-d776009453bb",
                    "type": "table_row",
                    "cells": {
                        "Qs<y": [
                            [
                                "Scenario"
                            ]
                        ],
                        "SmwX": [
                            [
                                "Use"
                            ]
                        ]
                    }
                },
                {
                    "id": "24724eb1-ed54-805f-b1b5-e21998f7a032",
                    "type": "table_row",
                    "cells": {
                        "Qs<y": [
                            [
                                "HTTP server timeout"
                            ]
                        ],
                        "SmwX": [
                            [
                                "WithTimeout()",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ],
                            [
                                " per request"
                            ]
                        ]
                    }
                },
                {
                    "id": "24724eb1-ed54-804c-94ed-ffcc2e455c7b",
                    "type": "table_row",
                    "cells": {
                        "Qs<y": [
                            [
                                "DB query with timeout"
                            ]
                        ],
                        "SmwX": [
                            [
                                "ctx",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ],
                            [
                                " passed into DB client"
                            ]
                        ]
                    }
                },
                {
                    "id": "24724eb1-ed54-80a3-9e83-ffd050d1f771",
                    "type": "table_row",
                    "cells": {
                        "Qs<y": [
                            [
                                "Graceful shutdown"
                            ]
                        ],
                        "SmwX": [
                            [
                                "Signal-based cancel context"
                            ]
                        ]
                    }
                },
                {
                    "id": "24724eb1-ed54-8021-8f02-e5cfc3db22f4",
                    "type": "table_row",
                    "cells": {
                        "Qs<y": [
                            [
                                "Value propagation"
                            ]
                        ],
                        "SmwX": [
                            [
                                "Auth info via "
                            ],
                            [
                                "WithValue",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ]
                    }
                }
            ],
            "columnOrder": [
                "Qs<y",
                "SmwX"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false
        },
        {
            "id": "24724eb1-ed54-8004-926e-df920bf73615",
            "type": "divider"
        },
        {
            "id": "24724eb1-ed54-804b-b045-f56a5d117533",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Example – Timeout-Aware Goroutine",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-8089-90b6-d56715a7b147",
            "type": "code",
            "richText": [
                [
                    "ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)\ndefer cancel()\n\nch := make(chan string)\ngo func() {\n    time.Sleep(2 * time.Second)\n    ch <- \"done\"\n}()\n\nselect {\ncase <-ctx.Done():\n    fmt.Println(\"timed out:\", ctx.Err())\ncase msg := <-ch:\n    fmt.Println(msg)\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24724eb1-ed54-8021-87b1-da418b8aabad",
            "type": "text",
            "richText": [
                [
                    "Output:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " "
                ],
                [
                    "timed out: context deadline exceeded",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-80f0-a35d-e85f142f07f4",
            "type": "divider"
        },
        {
            "id": "24724eb1-ed54-8050-9046-f524871cd434",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Child Cancels on Parent Cancel",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-800a-bcab-e40e7729351c",
            "type": "code",
            "richText": [
                [
                    "ctx := context.Background()\nctx1, cancel1 := context.WithCancel(ctx)\nctx2, cancel2 := context.WithCancel(ctx1)\ncancel1()\n// ctx2 is also cancelled"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24724eb1-ed54-8049-8adf-ce2eb20e2879",
            "type": "divider"
        },
        {
            "id": "24724eb1-ed54-8047-b63c-fa92f08f233f",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Important Types",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24724eb1-ed54-808c-8ed9-df944ebd5a37",
            "type": "table",
            "children": [
                {
                    "id": "24724eb1-ed54-80af-8882-c8955c960a8d",
                    "type": "table_row",
                    "cells": {
                        "aO[Q": [
                            [
                                "Description"
                            ]
                        ],
                        "rCFv": [
                            [
                                "Type"
                            ]
                        ]
                    }
                },
                {
                    "id": "24724eb1-ed54-803d-9ddd-dc53519cb38e",
                    "type": "table_row",
                    "cells": {
                        "aO[Q": [
                            [
                                "Interface, read-only"
                            ]
                        ],
                        "rCFv": [
                            [
                                "context.Context",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ]
                    }
                },
                {
                    "id": "24724eb1-ed54-807f-8f1c-c850fc9d0a98",
                    "type": "table_row",
                    "cells": {
                        "aO[Q": [
                            [
                                "Function to cancel context"
                            ]
                        ],
                        "rCFv": [
                            [
                                "CancelFunc",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ]
                    }
                },
                {
                    "id": "24724eb1-ed54-80a1-8c69-fdf8086f2fa4",
                    "type": "table_row",
                    "cells": {
                        "aO[Q": [
                            [
                                "Root context"
                            ]
                        ],
                        "rCFv": [
                            [
                                "context.Background()",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ]
                    }
                },
                {
                    "id": "24724eb1-ed54-8071-8137-d83c45409a29",
                    "type": "table_row",
                    "cells": {
                        "aO[Q": [
                            [
                                "Placeholder (for later logic)"
                            ]
                        ],
                        "rCFv": [
                            [
                                "context.TODO()",
                                [
                                    [
                                        "c"
                                    ]
                                ]
                            ]
                        ]
                    }
                }
            ],
            "columnOrder": [
                "rCFv",
                "aO[Q"
            ],
            "hasColumnHeader": true,
            "hasRowHeader": false
        },
        {
            "id": "24724eb1-ed54-80ef-a39a-ff48eb0292f1",
            "type": "divider"
        },
        {
            "id": "24d24eb1-ed54-8015-b57d-fcdfdfa1d496",
            "type": "text",
            "richText": [
                [
                    "QnA"
                ]
            ]
        },
        {
            "id": "2f124eb1-ed54-807d-b734-f74af99d9cce",
            "type": "callout",
            "children": [
                {
                    "id": "2f124eb1-ed54-80c9-9cdd-da25877ee6e8",
                    "type": "text",
                    "richText": [
                        [
                            "Why request scoped values?"
                        ]
                    ]
                },
                {
                    "id": "2f124eb1-ed54-80b8-a9a2-e07e06f958bb",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "It would be little cumbersome to pass all the required argument to the functions. So better we bundle the values in the context itself, so that the consumer can use everything in the request scope, and we would not have to manage the values individually."
                        ]
                    ]
                }
            ]
        }
    ]
} as const satisfies GoNote;

export default note;
