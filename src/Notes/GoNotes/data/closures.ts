/* Copied from the Closures page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-8099-9df4-e4e544ae459d",
    "slug": "closures",
    "title": "Closures",
    "updatedOn": "2025-08-09",
    "blocks": [
        {
            "id": "24a24eb1-ed54-80a3-a44c-ea210c056160",
            "type": "callout",
            "children": [
                {
                    "id": "24a24eb1-ed54-80e8-9284-e01dbf327abe",
                    "type": "text",
                    "richText": [
                        [
                            "https://en.wikipedia.org/wiki/Closure_(computer_programming)",
                            [
                                [
                                    "a",
                                    "https://en.wikipedia.org/wiki/Closure_(computer_programming)"
                                ]
                            ]
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24a24eb1-ed54-809b-9253-eb9df0bb7cef",
            "type": "divider"
        },
        {
            "id": "24a24eb1-ed54-80be-9872-e99d4c22f836",
            "type": "text",
            "richText": [
                [
                    "A "
                ],
                [
                    "closure",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " is a function defined inside another function that "
                ],
                [
                    "captures and keeps access to the outer function’s variables",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", even "
                ],
                [
                    "after the outer function has finished executing",
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
            "id": "24224eb1-ed54-8090-8173-f0afe7ef3b6c",
            "type": "bulleted_list",
            "richText": [
                [
                    "Captures by reference",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", not by value."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80b4-accf-cb442f4aa828",
            "type": "bulleted_list",
            "richText": [
                [
                    "Each call to the outer function gets its "
                ],
                [
                    "own copy",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " of the captured variables."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80aa-a88f-fb22a68199e2",
            "type": "bulleted_list",
            "richText": [
                [
                    "Useful for "
                ],
                [
                    "encapsulation",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", "
                ],
                [
                    "stateful functions",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", and "
                ],
                [
                    "function factories",
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
            "id": "24224eb1-ed54-80cd-bd7e-d607f3904ba9",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-80ad-80bf-d72e33a00fff",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport \"fmt\"\n\nfunc makeCounter() func() int {\n    count := 0\n    return func() int {\n        count++\n        return count\n    }\n}\n\nfunc main() {\n    counterA := makeCounter()\n    fmt.Println(counterA()) // 1\n    fmt.Println(counterA()) // 2\n    fmt.Println(counterA()) // 3\n\n    counterB := makeCounter()\n    fmt.Println(counterB()) // 1 (new closure, new count)\n    fmt.Println(counterA()) // 4 (original closure continues from 3)\n}"
                ]
            ],
            "language": "C"
        },
        {
            "id": "24224eb1-ed54-80c9-8380-c3d949c4e15b",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Explanation",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80eb-8ee5-f24ef67a8767",
            "type": "bulleted_list",
            "richText": [
                [
                    "makeCounter",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " creates a closure that captures "
                ],
                [
                    "count",
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
            "id": "24224eb1-ed54-80e1-b074-e9eee3fd9c65",
            "type": "bulleted_list",
            "richText": [
                [
                    "Each "
                ],
                [
                    "counterA()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " call "
                ],
                [
                    "remembers and updates",
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
                    "count",
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
            "id": "24224eb1-ed54-80a0-a442-fc015abdff56",
            "type": "bulleted_list",
            "richText": [
                [
                    "counterB()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " starts fresh because it gets a "
                ],
                [
                    "new instance",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " of "
                ],
                [
                    "count",
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
            "id": "24224eb1-ed54-805e-944b-c87d1e20dcc1",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-80a1-9cf0-d85be7379376",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Common Patterns",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-802c-a0a5-ebdb8e84ec58",
            "type": "bulleted_list",
            "richText": [
                [
                    "Function generators",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ": Create customized functions with internal state."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-801f-88f0-cf120fae7632",
            "type": "bulleted_list",
            "richText": [
                [
                    "Callback functions",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ": Used in goroutines, handlers, etc."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80b5-aa4f-defd7fca2768",
            "type": "bulleted_list",
            "richText": [
                [
                    "Testing and mocking",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ": Return functions with embedded test logic."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-807d-8fb7-f9fb733a8bf4",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-806a-8f39-cab8dd603ef1",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Closures in Loops – Common Mistake",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8024-a36a-ea17363de018",
            "type": "code",
            "richText": [
                [
                    "for i := 0; i < 3; i++ {\n    go func() {\n        fmt.Println(i) // BAD: i is captured by reference\n    }()\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-8013-a8f6-d93c2dfb9666",
            "type": "text",
            "richText": [
                [
                    "Fix:"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80dd-9940-ecc104d2dfeb",
            "type": "code",
            "richText": [
                [
                    "for i := 0; i < 3; i++ {\n    go func(n int) {\n        fmt.Println(n)\n    }(i) // Pass i as argument\n}\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-80df-bacf-f1e11f4c68f1",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-8070-bdbd-c2714eb91db4",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Garbage Collection Note",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80db-9c8b-e358548911f7",
            "type": "text",
            "richText": [
                [
                    "Variables captured in closures "
                ],
                [
                    "stay alive",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " as long as the closure is reachable. This can affect memory usage."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8007-b612-c0787730599e",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-8052-8aeb-e49b0671a972",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Closures are functions + environment",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80a9-b8d3-c679dafe93ce",
            "type": "text",
            "richText": [
                [
                    "A closure = function code + access to surrounding lexical scope (aka "
                ],
                [
                    "environment",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " of captured variables)."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8036-ab63-d3860c33a972",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-80f0-9844-d1acaa06c689",
            "type": "text"
        }
    ]
} as const satisfies GoNote;

export default note;
