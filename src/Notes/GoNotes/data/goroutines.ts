/* Copied from the Goroutines page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24024eb1-ed54-8077-ac46-f5730db152f5",
    "slug": "goroutines",
    "title": "Goroutines",
    "updatedOn": "2025-07-31",
    "blocks": [
        {
            "id": "24024eb1-ed54-80f1-9da3-d466366868e3",
            "type": "bulleted_list",
            "richText": [
                [
                    "A "
                ],
                [
                    "lightweight thread",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " managed by Go runtime."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8077-a039-dfc4fcd2cf68",
            "type": "bulleted_list",
            "richText": [
                [
                    "Created using the "
                ],
                [
                    "go",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " keyword before a function."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80f0-9809-d0513fc51f34",
            "type": "bulleted_list",
            "richText": [
                [
                    "Enables "
                ],
                [
                    "concurrent",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " function execution."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80a7-b959-e4017544bb6d",
            "type": "bulleted_list",
            "richText": [
                [
                    "Much cheaper than OS threads — you can spawn "
                ],
                [
                    "millions",
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
            "id": "24024eb1-ed54-80db-b7e6-dc5d84742742",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-8037-b7a3-fe0e62f26fbf",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Launching a Goroutine",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-8056-8019-e6bf2fa7766d",
            "type": "code",
            "richText": [
                [
                    "go someFunction()"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-80c8-9375-e60f16846e1f",
            "type": "bulleted_list",
            "richText": [
                [
                    "Starts "
                ],
                [
                    "someFunction()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " as a new goroutine."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80bc-83f1-d3d621c1c325",
            "type": "bulleted_list",
            "richText": [
                [
                    "Invoker function won't wait — the goroutine may not finish before the program exits."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-801c-8e58-fa6fe79c922f",
            "type": "divider"
        },
        {
            "id": "24024eb1-ed54-8066-a1df-ed2d305a58b1",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Common Pitfall: Loop Variable Capture",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-803d-8bb0-fe024e4615d8",
            "type": "text",
            "richText": [
                [
                    "Incorrect:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80bc-9673-cf1635137e53",
            "type": "code",
            "richText": [
                [
                    "for i := 1; i <= 3; i++ {\n    go func() {\n        fmt.Println(i)\n    }()\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-808b-af5c-e92ca2ea6e80",
            "type": "bulleted_list",
            "richText": [
                [
                    "All goroutines may print the same (unexpected) value."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-806d-88c6-e575855a4b98",
            "type": "text",
            "richText": [
                [
                    "Correct:"
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-809e-ac8e-f7a71e5c167b",
            "type": "code",
            "richText": [
                [
                    "for i := 1; i <= 3; i++ {\n    go func(val int) {\n        fmt.Println(val)\n    }(i)\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24024eb1-ed54-808e-8a15-e4a1dbf350f2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Always "
                ],
                [
                    "pass loop variables",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " explicitly."
                ]
            ]
        },
        {
            "id": "24024eb1-ed54-80c6-a401-ffc3d6372d84",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-802f-8955-fe17da755461",
            "type": "text",
            "richText": [
                [
                    "Remember if the "
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
                    " function finishes early, all the go routines will be killed, that must be handled. Refer to Workgroups."
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8030-a2c5-ce8d815ceace",
            "type": "text",
            "richText": [
                [
                    "‣",
                    [
                        [
                            "p",
                            "24124eb1-ed54-804e-98a7-ed95eaa0b4c2"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80c4-84c9-fb144eb9eef9",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-80ee-b1f8-c07723f0d4a1",
            "type": "text"
        }
    ]
} as const satisfies GoNote;

export default note;
