/* Copied from the Defer page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-80eb-8bed-c90a4e5d795f",
    "slug": "defer",
    "title": "Defer",
    "updatedOn": "2025-08-09",
    "blocks": [
        {
            "id": "24224eb1-ed54-80aa-bc80-fbcdd8b9a1e8",
            "type": "bulleted_list",
            "richText": [
                [
                    "defer",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " tells Go to "
                ],
                [
                    "wait to run a function until the current function finishes",
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
            "id": "24224eb1-ed54-804f-ac9d-eab1e1346230",
            "type": "bulleted_list",
            "richText": [
                [
                    "You write "
                ],
                [
                    "defer",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " before a function call, and Go will remember it."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-801c-9a67-d7a5d003150f",
            "type": "bulleted_list",
            "richText": [
                [
                    "Once your current function is "
                ],
                [
                    "about to return",
                    [
                        [
                            "b"
                        ],
                        [
                            "i"
                        ]
                    ]
                ],
                [
                    " (either because it finished or panicked), Go runs all the deferred functions."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-804e-8d9f-f60caead788b",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-80ac-a4f4-fbd508e69cb7",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Why use ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "defer",
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
                    "?",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80d5-8585-d399feb7578c",
            "type": "bulleted_list",
            "richText": [
                [
                    "It's mostly used for "
                ],
                [
                    "cleanup tasks",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", like:"
                ]
            ],
            "children": [
                {
                    "id": "24224eb1-ed54-80cc-9f62-c03a2109af7b",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Closing a file after you're done reading/writing it."
                        ]
                    ]
                },
                {
                    "id": "24224eb1-ed54-80b5-b16e-e0fe957d1d89",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Unlocking something you locked earlier."
                        ]
                    ]
                },
                {
                    "id": "24224eb1-ed54-8055-8fc0-fe56ad4509fb",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Releasing a resource (like a network connection)."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24224eb1-ed54-8088-9313-cb6914940afc",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-8083-af1c-f50e8d22f015",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Example",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8050-bad5-c297ffdb5a4b",
            "type": "code",
            "richText": [
                [
                    "func main() {\n    fmt.Println(\"Start\")\n    defer fmt.Println(\"This runs last\")\n    fmt.Println(\"End\")\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-80d6-89a1-f1751f5e8d51",
            "type": "text",
            "richText": [
                [
                    "Output:",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8082-9ff5-ec487c8545f8",
            "type": "code",
            "richText": [
                [
                    "Start\nEnd\nThis runs last"
                ]
            ],
            "language": "Plain Text"
        },
        {
            "id": "24224eb1-ed54-806c-9357-d6d351017722",
            "type": "bulleted_list",
            "richText": [
                [
                    "defer fmt.Println(\"This runs last\")",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is saved for later."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-809b-b704-c538c8c6f329",
            "type": "bulleted_list",
            "richText": [
                [
                    "It's only run "
                ],
                [
                    "after everything else",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", right before "
                ],
                [
                    "main()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " finishes."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80bf-8d44-d8e5ecafca65",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-8080-88b8-c183fe181f30",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Example: Function with ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "defer",
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
                    " and ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "return",
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
            "id": "24224eb1-ed54-80ad-b35d-fa30c1d000c4",
            "type": "code",
            "richText": [
                [
                    "package main\n\nimport \"fmt\"\n\nfunc sayHello() {\n    fmt.Println(\"Hello\")\n}\n\nfunc greetAndReturn() int {\n    defer fmt.Println(\"Deferred: Goodbye\")\n    fmt.Println(\"In Function: Greeting\")\n    return 42\n}\n\nfunc main() {\n    sayHello()\n    result := greetAndReturn()\n    fmt.Println(\"Returned:\", result)\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-80e8-bb52-c2c5ee728ae1",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Output:",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80e9-ad9b-f5f9abf22234",
            "type": "code",
            "richText": [
                [
                    "Hello\nIn Function: Greeting\nDeferred: Goodbye\nReturned: 42"
                ]
            ],
            "language": "Plain Text"
        },
        {
            "id": "24224eb1-ed54-8024-ad30-cabfe9e0f094",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Explanation (Step by Step)",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80ed-828c-c209d6c6255a",
            "type": "numbered_list",
            "richText": [
                [
                    "main()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " calls "
                ],
                [
                    "sayHello()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", which prints "
                ],
                [
                    "\"Hello\"",
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
            "id": "24224eb1-ed54-8057-a783-c2558a2aa733",
            "type": "numbered_list",
            "richText": [
                [
                    "main()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " then calls "
                ],
                [
                    "greetAndReturn()",
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
            "id": "24224eb1-ed54-8022-a1e2-ff3bfa23db15",
            "type": "numbered_list",
            "richText": [
                [
                    "Inside "
                ],
                [
                    "greetAndReturn()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ":"
                ]
            ],
            "children": [
                {
                    "id": "24224eb1-ed54-80a3-971b-f4892fe8f720",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "defer fmt.Println(\"Deferred: Goodbye\")",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ],
                        [
                            " is "
                        ],
                        [
                            "registered to run later",
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
                    "id": "24224eb1-ed54-8041-838c-e786a541933f",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "Then "
                        ],
                        [
                            "\"In Function: Greeting\"",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ],
                        [
                            " is printed."
                        ]
                    ]
                },
                {
                    "id": "24224eb1-ed54-8015-a6b0-e9311f23f090",
                    "type": "bulleted_list",
                    "richText": [
                        [
                            "return 42",
                            [
                                [
                                    "c"
                                ]
                            ]
                        ],
                        [
                            " tells Go to return 42, "
                        ],
                        [
                            "but before it does",
                            [
                                [
                                    "b"
                                ]
                            ]
                        ],
                        [
                            ", the deferred code runs."
                        ]
                    ]
                }
            ]
        },
        {
            "id": "24224eb1-ed54-8050-b4e6-f3527c7a8767",
            "type": "numbered_list",
            "richText": [
                [
                    "So, "
                ],
                [
                    "\"Deferred: Goodbye\"",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " prints "
                ],
                [
                    "before",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " the return finishes."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8050-9c62-f1fd0979cd9d",
            "type": "numbered_list",
            "richText": [
                [
                    "Then "
                ],
                [
                    "main()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " prints "
                ],
                [
                    "\"Returned: 42\"",
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
            "id": "24224eb1-ed54-80ba-8604-c3a542e10e22",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-80af-9cf8-f671234d2fab",
            "type": "sub_sub_header",
            "richText": [
                [
                    "What if you use multiple ",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "defer",
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
                    " statements?",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80b4-8091-dece470fb763",
            "type": "bulleted_list",
            "richText": [
                [
                    "Go runs them in "
                ],
                [
                    "reverse order",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " — like a stack."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-804d-b501-f13a20d90248",
            "type": "bulleted_list",
            "richText": [
                [
                    "The "
                ],
                [
                    "last one you deferred runs first",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", then the one before that, and so on."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-807b-b831-ed0330bf252e",
            "type": "text",
            "richText": [
                [
                    "Example:",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8003-b1cf-d7b031240ce1",
            "type": "code",
            "richText": [
                [
                    "func example() {\n    defer fmt.Println(\"first\")\n    defer fmt.Println(\"second\")\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-8038-83a4-c86aa8e1134b",
            "type": "text",
            "richText": [
                [
                    "Output:",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8097-9cef-c01fa73bfc07",
            "type": "code",
            "richText": [
                [
                    "second\nfirst"
                ]
            ],
            "language": "Plain Text"
        },
        {
            "id": "24224eb1-ed54-80cf-a658-c7ca8f7c8f38",
            "type": "text",
            "richText": [
                [
                    "Because:"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-803d-9e60-f86183def30c",
            "type": "bulleted_list",
            "richText": [
                [
                    "\"first\"",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " was deferred "
                ],
                [
                    "before",
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
                    "\"second\"",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ","
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-805b-aa05-e821a3df4d07",
            "type": "bulleted_list",
            "richText": [
                [
                    "But Go executes deferred calls in reverse — "
                ],
                [
                    "last in, first out",
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
            "id": "24224eb1-ed54-80ff-8b29-efd221313d0b",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-809a-a67a-f60465d673ea",
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
            "id": "24224eb1-ed54-80ad-9e36-d146d3cf2a82",
            "type": "numbered_list",
            "richText": [
                [
                    "defer file.Close()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " → after opening a file."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8037-881f-f255d8b97768",
            "type": "numbered_list",
            "richText": [
                [
                    "defer mu.Unlock()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " → after acquiring a lock."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8004-a2ce-c74d52f88efc",
            "type": "numbered_list",
            "richText": [
                [
                    "defer recover()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " → inside a panic handler."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8066-81b3-c0ec3c4ef14b",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-80a6-a191-de4bb44fe225",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Evaluation Timing",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8034-9488-e0ec9dd8338e",
            "type": "bulleted_list",
            "richText": [
                [
                    "Arguments are evaluated immediately",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", but "
                ],
                [
                    "execution is delayed",
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
            "id": "24224eb1-ed54-8075-a98d-ff689bfb4433",
            "type": "text",
            "richText": [
                [
                    "Example:",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8072-9ae0-fee202b335c8",
            "type": "code",
            "richText": [
                [
                    "x := 10\ndefer fmt.Println(x) // 10 is captured immediately\nx = 20"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-80a8-9a06-f43bb685f04a",
            "type": "text",
            "richText": [
                [
                    "Output: "
                ],
                [
                    "10",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8074-9e2b-de36ecdf47fe",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-80a4-9f4a-ec3a1fe4615b",
            "type": "sub_sub_header",
            "richText": [
                [
                    "With Named Return Values",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80ae-8dfb-fc767dd544e4",
            "type": "text",
            "richText": [
                [
                    "defer",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " can modify named return variables:"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80ff-ae16-f68cc0781878",
            "type": "code",
            "richText": [
                [
                    "func f() (result int) {\n    defer func() {\n        result += 1\n    }()\n    return 5\n}\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-8005-8628-c191143b8553",
            "type": "text",
            "richText": [
                [
                    "Returns: "
                ],
                [
                    "6",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80cb-8242-d52120ee9863",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-80c4-b78f-ef9ef7ba8250",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Deferred Functions and Panic",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-808d-97cb-c5a6b66c406f",
            "type": "bulleted_list",
            "richText": [
                [
                    "Deferred functions still execute",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " even if a panic occurs."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8094-9951-e282ce8d0522",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use "
                ],
                [
                    "recover()",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " inside deferred function to handle panic."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80ce-b3d7-c25a895f13fd",
            "type": "text",
            "richText": [
                [
                    "Example:",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80cc-a80f-dcd1de9eeee6",
            "type": "code",
            "richText": [
                [
                    "func safe() {\n    defer func() {\n        if r := recover(); r != nil {\n            fmt.Println(\"Recovered:\", r)\n        }\n    }()\n    panic(\"error\")\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-80e7-8efa-e4f792db95e6",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-8008-a27b-dbe10722eb37",
            "type": "sub_sub_header",
            "richText": [
                [
                    "defer inside loops",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80d3-a581-de8ccf9743ed",
            "type": "bulleted_list",
            "richText": [
                [
                    "Common mistake: using "
                ],
                [
                    "defer",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " in loops thinking it will execute each time just after the loop iteration, is not a correct understanding of "
                ],
                [
                    "defer",
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
            "id": "24224eb1-ed54-8042-8509-d687c84b8c3e",
            "type": "code",
            "richText": [
                [
                    "for i := 0; i < 3; i++ {\n    defer fmt.Println(i)\n}\nfmt.Println(\"Hi there\")"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-80c2-9932-ed393ab9f466",
            "type": "text",
            "richText": [
                [
                    "Output:"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-800f-816e-da1272dc4fe5",
            "type": "code",
            "richText": [
                [
                    "Hi there\n2\n1\n0"
                ]
            ],
            "language": "Plain Text"
        },
        {
            "id": "24224eb1-ed54-8053-ad4a-c2598ee24e2c",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-80c8-b5cf-de1f424a2da2",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Performance Note",
                    [
                        [
                            "b"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8085-9968-c8d2b5928f0b",
            "type": "bulleted_list",
            "richText": [
                [
                    "defer",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " has "
                ],
                [
                    "overhead",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    "; not free."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80f0-a473-c794b7af1075",
            "type": "bulleted_list",
            "richText": [
                [
                    "Avoid in "
                ],
                [
                    "tight loops",
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
                    "performance-critical",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    " code."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-808c-b9c5-caea5da005b5",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-80eb-b668-e22fed924647",
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
            "id": "24224eb1-ed54-8069-9829-f9c7b3101211",
            "type": "bulleted_list",
            "richText": [
                [
                    "Use for "
                ],
                [
                    "readability and safety",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ", not for performance."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8018-b472-ff88c008ab35",
            "type": "bulleted_list",
            "richText": [
                [
                    "Keep deferred calls at top-of-function after resource acquisition."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80f8-9043-e4aa20a5956e",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-800c-ba1f-d883fc4b88f4",
            "type": "text"
        }
    ]
} as const satisfies GoNote;

export default note;
