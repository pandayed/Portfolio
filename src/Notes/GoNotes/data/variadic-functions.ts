/* Copied from the Variadic Functions page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24a24eb1-ed54-8030-b2e0-e5685daa55e6",
    "slug": "variadic-functions",
    "title": "Variadic Functions",
    "updatedOn": "2025-08-09",
    "blocks": [
        {
            "id": "24a24eb1-ed54-8015-af87-e8edd390e1dd",
            "type": "bulleted_list",
            "richText": [
                [
                    "A function that can take "
                ],
                [
                    "zero or more arguments",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " of the same type."
                ]
            ]
        },
        {
            "id": "24a24eb1-ed54-80ea-b905-f2e0db61466c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Syntax: "
                ],
                [
                    "...type",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " as the "
                ],
                [
                    "last parameter",
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
            "id": "24a24eb1-ed54-80ba-ad45-d08f7bf3ba11",
            "type": "code",
            "richText": [
                [
                    "func sum(nums ...int) int {\n    total := 0\n    for _, n := range nums {\n        total += n\n    }\n    return total\n}\n\nfmt.Println(sum(1, 2, 3))    // 6\nfmt.Println(sum())           // 0\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24a24eb1-ed54-808e-84d3-d2a7d94ec65b",
            "type": "divider"
        },
        {
            "id": "24a24eb1-ed54-8044-a3f7-d53f3bee10a6",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Rules",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24a24eb1-ed54-8037-817d-d19ff7a86a4d",
            "type": "bulleted_list",
            "richText": [
                [
                    "Only "
                ],
                [
                    "one variadic parameter",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", and it must be last."
                ]
            ]
        },
        {
            "id": "24a24eb1-ed54-806a-9dd2-dc658e3cb0aa",
            "type": "bulleted_list",
            "richText": [
                [
                    "Inside the function, it behaves like a "
                ],
                [
                    "slice",
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
            "id": "24a24eb1-ed54-80d3-954d-e23046bc6f84",
            "type": "divider"
        },
        {
            "id": "24a24eb1-ed54-809f-b137-c7409799b708",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Passing a Slice to a Variadic Function",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24a24eb1-ed54-8010-9650-d545f04fa920",
            "type": "code",
            "richText": [
                [
                    "nums := []int{1, 2, 3}\nfmt.Println(sum(nums...)) // unpack slice"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24a24eb1-ed54-80c1-ba96-e1757955e18a",
            "type": "divider"
        },
        {
            "id": "24a24eb1-ed54-809b-a523-f6f502cee0c1",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Mixing Fixed and Variadic Parameters",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24a24eb1-ed54-80ac-8603-cc6f65633f44",
            "type": "code",
            "richText": [
                [
                    "func greet(prefix string, names ...string) {\n    for _, n := range names {\n        fmt.Println(prefix, n)\n    }\n}\n\ngreet(\"Hello\", \"Alice\", \"Bob\")"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24a24eb1-ed54-8034-b7dc-e393d24bf44f",
            "type": "divider"
        }
    ]
} as const satisfies GoNote;

export default note;
