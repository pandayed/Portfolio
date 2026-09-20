/* Copied from the Anonymous/Inline Functions page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-801b-af91-ec0564709d69",
    "slug": "anonymous-inline-functions",
    "title": "Anonymous/Inline Functions",
    "updatedOn": "2025-08-09",
    "blocks": [
        {
            "id": "24a24eb1-ed54-80b3-9aa1-d7941f1c5f9f",
            "type": "callout",
            "children": [
                {
                    "id": "24a24eb1-ed54-8013-8ca8-de1cf93d2656",
                    "type": "text",
                    "richText": [
                        [
                            "https://en.wikipedia.org/wiki/Anonymous_function",
                            [
                                [
                                    "a",
                                    "https://en.wikipedia.org/wiki/Anonymous_function"
                                ]
                            ]
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24a24eb1-ed54-800f-8bd0-e1dd73477b1e",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-80b1-9665-fcfd92d37a4f",
            "type": "bulleted_list",
            "richText": [
                [
                    "Functions "
                ],
                [
                    "without a name",
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
            "id": "24224eb1-ed54-80a3-9831-e7c640faad06",
            "type": "bulleted_list",
            "richText": [
                [
                    "Can be:"
                ]
            ],
            "children": [
                {
                    "id": "24224eb1-ed54-80c2-81e3-dab0b4569acb",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Immediately invoked",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ]
                },
                {
                    "id": "24224eb1-ed54-80a1-9868-c79c00222f02",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Assigned to variables",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ]
                },
                {
                    "id": "24224eb1-ed54-8034-8c40-f8667e934804",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Passed as arguments",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ]
                },
                {
                    "id": "24224eb1-ed54-80dc-99fc-da441e1a9779",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Returned from functions",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24224eb1-ed54-8058-b992-fffb8d9ffbd7",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-8043-987f-caeaa994664e",
            "type": "sub_header",
            "richText": [
                [
                    "Syntax",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8097-b4ee-c27e93874b1e",
            "type": "code",
            "richText": [
                [
                    "func(paramList) returnType {\n    // body\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-80c6-bb0e-ca7608e8db9f",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-8028-82d3-c78331450deb",
            "type": "sub_header",
            "richText": [
                [
                    "Immediately Invoked Function Expression ",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-805d-b418-ef1a3e3d95a8",
            "type": "code",
            "richText": [
                [
                    "result := func(a, b int) int {\n    return a + b\n}(5, 3) // result = 8"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-8043-90cb-cef8271277a9",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-80f0-b955-f2426f7000df",
            "type": "sub_header",
            "richText": [
                [
                    "Assigning to a Variable",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-806f-80db-e9e50f98dbb8",
            "type": "code",
            "richText": [
                [
                    "add := func(x, y int) int {\n    return x + y\n}\nfmt.Println(add(2, 3)) // Output: 5"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-80ba-a2e2-ef3174f52503",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-8009-95c0-d14df76dbee9",
            "type": "sub_header",
            "richText": [
                [
                    "Passing Anonymous Function as Argument",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-804b-92e0-cf41e8703ed5",
            "type": "code",
            "richText": [
                [
                    "func operate(x, y int, op func(int, int) int) int {\n    return op(x, y)\n}\n\nresult := operate(4, 2, func(a, b int) int {\n    return a * b\n})\n// result = 8\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-8091-b7ba-cfa161976399",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-80fe-a43d-f8c81b316841",
            "type": "sub_header",
            "richText": [
                [
                    "Returning Anonymous Function",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8076-ab6e-ca03286295db",
            "type": "code",
            "richText": [
                [
                    "func multiplier(factor int) func(int) int {\n    return func(x int) int {\n        return x * factor\n    }\n}\n\ndouble := multiplier(2)\nfmt.Println(double(5)) // Output: 10\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-801e-a1de-f37fe47deee9",
            "type": "divider"
        }
    ]
} as const satisfies GoNote;

export default note;
