/* Copied from the Constants & Variables page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-8073-b1bd-cc1e8381338d",
    "slug": "constants-variables",
    "title": "Constants & Variables",
    "updatedOn": "2025-08-08",
    "blocks": [
        {
            "id": "24124eb1-ed54-80e8-b3a2-ee4df8b423e5",
            "type": "sub_header",
            "richText": [
                [
                    "Constants (",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "const",
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
                    ")",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80f4-a048-ddbea91290d3",
            "type": "bulleted_list",
            "richText": [
                [
                    "Named value",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " that "
                ],
                [
                    "doesn’t change",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-800a-8a50-fec944b16a7b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Declared using "
                ],
                [
                    "const",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8006-8dce-f509c363a43b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Value must be known at compile time",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80cd-9644-dcd40f0bd898",
            "type": "code",
            "richText": [
                [
                    "const name type = value  // `type` is optional"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-8075-a4f1-c0d3034fadfc",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-805e-b2e6-ed417c9d43c6",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Typed vs Untyped Constants",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80f7-9625-f8e77817783e",
            "type": "bulleted_list",
            "richText": [
                [
                    "Untyped",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ": More flexible"
                ]
            ],
            "children": [
                {
                    "id": "24124eb1-ed54-80a3-b1b1-feb139c5dce2",
                    "type": "code",
                    "richText": [
                        [
                            "const x = 42        // untyped int\nvar y int32 = x     // OK"
                        ]
                    ],
                    "language": "Go"
                }
            ]
        },
        {
            "id": "24124eb1-ed54-80bc-bf45-cecfe1f6620d",
            "type": "bulleted_list",
            "richText": [
                [
                    "Typed",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ": Restrictive"
                ]
            ],
            "children": [
                {
                    "id": "24124eb1-ed54-80c8-a1b6-e855d09318ba",
                    "type": "code",
                    "richText": [
                        [
                            "const x int32 = 42\nvar y int64 = x     // Error"
                        ]
                    ],
                    "language": "Go"
                }
            ]
        },
        {
            "id": "24124eb1-ed54-80e5-90fc-f8cfdea00949",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-80a3-8f76-fe2eee715660",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Constant Expressions",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8065-8dc1-c09e7b6f62cc",
            "type": "bulleted_list",
            "richText": [
                [
                    "Allowed only if computable at compile-time"
                ]
            ],
            "children": [
                {
                    "id": "24124eb1-ed54-8060-b0d3-e312ae364c11",
                    "type": "code",
                    "richText": [
                        [
                            "const a = 5 + 3\nconst b = \"Go\" + \"Lang\""
                        ]
                    ],
                    "language": "Go"
                }
            ]
        },
        {
            "id": "24124eb1-ed54-80b8-ab93-d97d257a3933",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-80ac-aebe-d9eede70b838",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Multiple Constants",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80db-9afd-c818c1b60145",
            "type": "code",
            "richText": [
                [
                    "const (\n    A = 1\n    B = 2\n    C = 3\n)"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-808b-86de-feddecce7d55",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-80ac-9ab3-f1e7e00014af",
            "type": "sub_sub_header",
            "richText": [
                [
                    "iota",
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
                    " – Constant Generator",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-803f-ac1b-dfdf9cdd6a99",
            "type": "bulleted_list",
            "richText": [
                [
                    "Starts at "
                ],
                [
                    "0",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " in each block, increments per line"
                ]
            ],
            "children": [
                {
                    "id": "24124eb1-ed54-80c3-b39c-f6d7e7dfdb6a",
                    "type": "code",
                    "richText": [
                        [
                            "const (\n    X = iota  // 0\n    Y         // 1\n    Z         // 2\n)"
                        ]
                    ],
                    "language": "Go"
                }
            ]
        },
        {
            "id": "24124eb1-ed54-803d-8138-f7db334c27fe",
            "type": "bulleted_list",
            "richText": [
                [
                    "With expressions:"
                ]
            ],
            "children": [
                {
                    "id": "24124eb1-ed54-80ad-ad80-c99fc77732ea",
                    "type": "code",
                    "richText": [
                        [
                            "const (\n    A = iota + 1  // 1\n    B             // 2\n    C             // 3\n)"
                        ]
                    ],
                    "language": "Go"
                }
            ]
        },
        {
            "id": "24124eb1-ed54-80ab-8563-e85b06c00fb7",
            "type": "bulleted_list",
            "richText": [
                [
                    "Skipping values:"
                ]
            ],
            "children": [
                {
                    "id": "24124eb1-ed54-80c2-9d7f-e944d5be44df",
                    "type": "code",
                    "richText": [
                        [
                            "const (\n    _  = iota\n    KB = 1 << (10 * iota)  // 1024\n    MB                     // 1048576\n    GB                     // 1073741824\n)"
                        ]
                    ],
                    "language": "Go"
                }
            ]
        },
        {
            "id": "24124eb1-ed54-8009-947f-eef3aac744f2",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-801f-b98c-e7ad94f6df48",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Disallowed in Constants",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8059-8a19-df5bc1bad6fa",
            "type": "bulleted_list",
            "richText": [
                [
                    "No variables",
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
                    "function calls",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ],
            "children": [
                {
                    "id": "24124eb1-ed54-8019-9fb5-d95b5ba58582",
                    "type": "code",
                    "richText": [
                        [
                            "var x = 10\nconst y = x              // Error\nconst z = math.Sin(1.0)  // Error"
                        ]
                    ],
                    "language": "Go"
                }
            ]
        },
        {
            "id": "24124eb1-ed54-809c-a68b-ebc228fb416a",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-80f6-921e-c7bbccbe3662",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Good Use Cases",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8002-bc2e-d2c1ccc5e081",
            "type": "bulleted_list",
            "richText": [
                [
                    "Configs, limits, enums ("
                ],
                [
                    "iota",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    "), version strings, math constants"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80e7-863d-dbd9eb503e7a",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-80a1-87da-e8b26adf4908",
            "type": "sub_header",
            "richText": [
                [
                    "Variables (",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "var",
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
                    ")",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80ac-9892-f344c72c9bc9",
            "type": "bulleted_list",
            "richText": [
                [
                    "Named value that can change",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80ca-8ebc-eda7e74e31f6",
            "type": "bulleted_list",
            "richText": [
                [
                    "Declared using "
                ],
                [
                    "var",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", can be initialized later"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-8052-9b50-eb6b31752c2b",
            "type": "code",
            "richText": [
                [
                    "var name type = value"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-80ff-9e3c-d111d0161e9b",
            "type": "bulleted_list",
            "richText": [
                [
                    "type",
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
                    "value",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " can be omitted if the other is present"
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-807c-b176-e18b13bc691c",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-808c-8a4f-dec4d6351ce9",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Short Declaration (Inside Functions Only)",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-807d-8cff-f9a068b5f8c3",
            "type": "code",
            "richText": [
                [
                    "x := 10  // infer type"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-8059-bd13-c96ee5ffc6b0",
            "type": "divider"
        },
        {
            "id": "24124eb1-ed54-8015-9e13-ca77d0065d1d",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Multiple Variable Declaration",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24124eb1-ed54-80a0-8f20-e5fe668df88b",
            "type": "code",
            "richText": [
                [
                    "var (\n    a int = 1\n    b     = \"Go\"\n    c     = true\n)"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24124eb1-ed54-8048-a92f-f947d6e51f3d",
            "type": "divider"
        }
    ]
} as const satisfies GoNote;

export default note;
