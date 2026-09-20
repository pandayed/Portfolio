/* Copied from the Functions page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24a24eb1-ed54-807f-82ae-e73c3476d760",
    "slug": "functions",
    "title": "Functions",
    "updatedOn": "2025-08-09",
    "blocks": [
        {
            "id": "24a24eb1-ed54-80d9-b4a8-df2e6011ff7a",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Basic Syntax",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24a24eb1-ed54-80e2-8bd7-c1f02ca1a857",
            "type": "code",
            "richText": [
                [
                    "func functionName(param1 type1, param2 type2) returnType {\n    // body\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24a24eb1-ed54-80fd-8a76-ca1c740dd41e",
            "type": "bulleted_list",
            "richText": [
                [
                    "func",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " keyword starts the declaration."
                ]
            ]
        },
        {
            "id": "24a24eb1-ed54-8003-a3f8-d889e3c53904",
            "type": "bulleted_list",
            "richText": [
                [
                    "Parameters: name + type."
                ]
            ]
        },
        {
            "id": "24a24eb1-ed54-80c3-a429-d6fb23f47f8c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Return type after parameter list."
                ]
            ]
        },
        {
            "id": "24a24eb1-ed54-8082-aa42-e1b3b488e307",
            "type": "divider"
        },
        {
            "id": "24a24eb1-ed54-8073-b8af-e0f669718657",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Single Return Value",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24a24eb1-ed54-804e-b7eb-c002e5fc5724",
            "type": "code",
            "richText": [
                [
                    "func add(a int, b int) int {\n    return a + b\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24a24eb1-ed54-8097-91f9-db942fb47338",
            "type": "divider"
        },
        {
            "id": "24a24eb1-ed54-8007-bbac-c4edd698688a",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Multiple Return Values",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24a24eb1-ed54-801c-bf96-fd130c3cb0e7",
            "type": "code",
            "richText": [
                [
                    "func divide(a, b int) (int, int) {\n    return a / b, a % b\n}\n\nq, r := divide(10, 3) // q=3, r=1"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24a24eb1-ed54-80e2-9434-e0da0e2df6be",
            "type": "bulleted_list",
            "richText": [
                [
                    "Commonly used for returning a value and an error."
                ]
            ]
        },
        {
            "id": "24a24eb1-ed54-80e7-bc72-d0b532d70a4a",
            "type": "divider"
        },
        {
            "id": "24a24eb1-ed54-8057-8e70-fea185826a69",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Named Return Values",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24a24eb1-ed54-807e-ac38-cafe8b76165c",
            "type": "code",
            "richText": [
                [
                    "func rectProps(length, width float64) (area, perimeter float64) {\n    area = length * width\n    perimeter = 2 * (length + width)\n    return // implicit return of named values\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24a24eb1-ed54-8046-bd9a-e4dc694af743",
            "type": "bulleted_list",
            "richText": [
                [
                    "Return variables are declared in the signature."
                ]
            ]
        },
        {
            "id": "24a24eb1-ed54-80d7-8ddd-d689aff6489a",
            "type": "bulleted_list",
            "richText": [
                [
                    "A plain "
                ],
                [
                    "return",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " returns them as they are."
                ]
            ]
        },
        {
            "id": "24a24eb1-ed54-8073-b775-c841e9793512",
            "type": "divider"
        },
        {
            "id": "24a24eb1-ed54-80ec-b807-d8cb91d448a0",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Parameter Notes",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24a24eb1-ed54-8058-b444-cc5717194962",
            "type": "bulleted_list",
            "richText": [
                [
                    "Type grouping:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " If parameters share a type, write it once:"
                ]
            ],
            "children": [
                {
                    "id": "24a24eb1-ed54-8053-93fa-eca279bccffb",
                    "type": "code",
                    "richText": [
                        [
                            "func add(a, b int) int { return a + b }"
                        ]
                    ],
                    "language": "Go"
                }
            ]
        },
        {
            "id": "24a24eb1-ed54-8066-8ce8-fc54a8949ba9",
            "type": "bulleted_list",
            "richText": [
                [
                    "Pass by value:",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " Arguments are copied into parameters."
                ]
            ]
        },
        {
            "id": "24a24eb1-ed54-80e4-bb90-dcf1b50c6972",
            "type": "bulleted_list",
            "richText": [
                [
                    "For large data or to modify original, use pointers:"
                ]
            ],
            "children": [
                {
                    "id": "24a24eb1-ed54-8054-9350-fac1d4e305bd",
                    "type": "code",
                    "richText": [
                        [
                            "func update(val *int) { *val = 100 }"
                        ]
                    ],
                    "language": "Go"
                }
            ]
        },
        {
            "id": "24a24eb1-ed54-8084-8a16-ec1d84742b7e",
            "type": "divider"
        },
        {
            "id": "24a24eb1-ed54-8043-9b1a-e873838313e6",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Calling Functions",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24a24eb1-ed54-8091-a070-c765eb955aed",
            "type": "bulleted_list",
            "richText": [
                [
                    "Normal call: "
                ],
                [
                    "result := add(2, 3)",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24a24eb1-ed54-8070-ab61-f40a4d97b260",
            "type": "bulleted_list",
            "richText": [
                [
                    "Ignoring values:"
                ]
            ],
            "children": [
                {
                    "id": "24a24eb1-ed54-80c2-983e-cc10cb1c51f8",
                    "type": "code",
                    "richText": [
                        [
                            "_, remainder := divide(10, 3)"
                        ]
                    ],
                    "language": "Go"
                }
            ]
        },
        {
            "id": "24a24eb1-ed54-80af-890c-ef2ed6e74bfb",
            "type": "divider"
        },
        {
            "id": "24a24eb1-ed54-80a7-b0c7-f31f6195e612",
            "type": "text"
        }
    ]
} as const satisfies GoNote;

export default note;
