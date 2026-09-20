/* Copied from the Select page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24d24eb1-ed54-80bd-9a09-e4e249368ddf",
    "slug": "select",
    "title": "Select",
    "updatedOn": "2025-08-15",
    "blocks": [
        {
            "id": "25024eb1-ed54-8085-ba6d-f4650a729db9",
            "type": "bulleted_list",
            "richText": [
                [
                    "Switch-Case but only for channels"
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-80d4-910f-da4f7d601704",
            "type": "bulleted_list",
            "richText": [
                [
                    "Waits on multiple channel operations simultaneously."
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-8047-bd3b-e251bb91e7da",
            "type": "bulleted_list",
            "richText": [
                [
                    "Runs the first "
                ],
                [
                    "ready",
                    [
                        [
                            "i"
                        ]
                    ]
                ],
                [
                    " case (random if multiple are ready)."
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-801d-99d1-c86a7bdc2d39",
            "type": "bulleted_list",
            "richText": [
                [
                    "Useful for multiplexing channels, timeouts, cancellation."
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-80fb-863a-cd15f0fe4839",
            "type": "text",
            "richText": [
                [
                    "Syntax:",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-8015-b537-ff79d97e9880",
            "type": "code",
            "richText": [
                [
                    "select {\ncase v := <-ch1:\n    // received from ch1\ncase ch2 <- data:\n    // sent to ch2\ncase <-time.After(time.Second):\n    // timeout\ndefault:\n    // runs if no channel is ready\n}\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "25024eb1-ed54-802b-b682-d949d854dc65",
            "type": "text",
            "richText": [
                [
                    "Rules:",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-8043-8a87-dfac48b68fee",
            "type": "numbered_list",
            "richText": [
                [
                    "All "
                ],
                [
                    "case",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " statements must be channel send or receive."
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-800d-b3a5-eaaa1f0446fa",
            "type": "numbered_list",
            "richText": [
                [
                    "Blocks until one case can proceed (unless "
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
                    " present)."
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-809d-bb95-cb5c096f04c8",
            "type": "numbered_list",
            "richText": [
                [
                    "Randomly picks one case if several are ready."
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-8087-975e-cc6112c25308",
            "type": "numbered_list",
            "richText": [
                [
                    "Can be used in loops for continuous channel listening."
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-8054-a933-f3a4ba39427c",
            "type": "text",
            "richText": [
                [
                    "Common Use Cases:",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-8084-952f-f619e2ce7151",
            "type": "bulleted_list",
            "richText": [
                [
                    "Listen to multiple channels."
                ]
            ]
        },
        {
            "id": "25024eb1-ed54-8015-b93c-e291b4826abd",
            "type": "bulleted_list",
            "richText": [
                [
                    "Add timeouts with "
                ],
                [
                    "time.After",
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
            "id": "25024eb1-ed54-804b-abcf-e1f54a7d27e3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Cancel goroutines via "
                ],
                [
                    "context.Done()",
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
            "id": "25024eb1-ed54-803c-b96f-e32903917537",
            "type": "bulleted_list",
            "richText": [
                [
                    "Avoid blocking with "
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
                    "."
                ]
            ]
        }
    ]
} as const satisfies GoNote;

export default note;
