/* Copied from the Range & For Loops page in Notion without changing its content. */

import type { GoNote } from '../types';

const note = {
    "notionId": "24124eb1-ed54-8042-b4af-da4a7534739a",
    "slug": "range-for-loops",
    "title": "Range & For Loops",
    "updatedOn": "2025-08-09",
    "blocks": [
        {
            "id": "24224eb1-ed54-80ff-87da-e82b91dd7dc8",
            "type": "sub_header",
            "richText": [
                [
                    "for",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " Loop – Basics"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80f1-8356-ccf3f5aad7d5",
            "type": "text",
            "richText": [
                [
                    "Go has "
                ],
                [
                    "only one looping construct",
                    [
                        [
                            "b"
                        ]
                    ]
                ],
                [
                    ": "
                ],
                [
                    "for",
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
            "id": "24224eb1-ed54-801c-8fd6-f9f3c9ad31e5",
            "type": "text",
            "richText": [
                [
                    "It can be used like a traditional "
                ],
                [
                    "for",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", a "
                ],
                [
                    "while",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ", or an infinite loop."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80f3-89d9-d80e24621828",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Syntax:"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8021-a8b6-f088ecb76f2c",
            "type": "code",
            "richText": [
                [
                    "for init; condition; post {\n    // code\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-80b8-befc-c35915f06672",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Example:"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80e4-9762-fb37c433f2a0",
            "type": "code",
            "richText": [
                [
                    "for i := 0; i < 5; i++ {\n    fmt.Println(i)\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-8041-845e-def3ef3058e0",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-8086-94b0-fb0cf52acd8d",
            "type": "sub_header",
            "richText": [
                [
                    "for",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " as "
                ],
                [
                    "while",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80f3-8380-c8468483ca7d",
            "type": "text",
            "richText": [
                [
                    "You can skip init and post."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8000-a823-d1626b107127",
            "type": "code",
            "richText": [
                [
                    "i := 0\nfor i < 5 {\n    fmt.Println(i)\n    i++\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-8032-9c79-f01f0286929a",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-80b6-ba64-d20d82f6c0f0",
            "type": "sub_header",
            "richText": [
                [
                    "Infinite Loop"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80e2-b167-f109f3bc687d",
            "type": "text",
            "richText": [
                [
                    "You can skip all three parts."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8091-8d40-fd39730ff59a",
            "type": "code",
            "richText": [
                [
                    "for {\n    fmt.Println(\"infinite\")\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-80c3-a68f-e7d42563ff17",
            "type": "text",
            "richText": [
                [
                    "Use "
                ],
                [
                    "break",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " to exit or "
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
                    " to end the function."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-809b-90fc-d1fedce5444b",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-8010-bc0d-ec7707f4ea87",
            "type": "sub_header",
            "richText": [
                [
                    "range",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " Loop – Iterating over Data Structures"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8085-b2de-d3e619967fad",
            "type": "text",
            "richText": [
                [
                    "The "
                ],
                [
                    "range",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " keyword is used to "
                ],
                [
                    "iterate over arrays, slices, maps, strings, and channels",
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
            "id": "24224eb1-ed54-80bf-be74-c156a2276137",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Slice/Array"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8012-8d07-d7d57eb2a56e",
            "type": "code",
            "richText": [
                [
                    "nums := []int{10, 20, 30}\nfor index, value := range nums {\n    fmt.Println(index, value)\n}\n"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-8001-a369-dff94e93633a",
            "type": "bulleted_list",
            "richText": [
                [
                    "index",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is the current index"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80b5-8ad9-f3cd096fe922",
            "type": "bulleted_list",
            "richText": [
                [
                    "value",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " is the element at that index"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80fe-aecf-fc4fdca4e0d3",
            "type": "text",
            "richText": [
                [
                    "To ignore the index:"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8049-a2e9-c7e17e483ca1",
            "type": "code",
            "richText": [
                [
                    "for _, value := range nums {\n    fmt.Println(value)\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-8078-aba9-c25be70f8df3",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-8066-8642-dfebc21963c2",
            "type": "sub_sub_header",
            "richText": [
                [
                    "String"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-804e-98d9-d039b6cab491",
            "type": "code",
            "richText": [
                [
                    "s := \"hello\"\nfor i, ch := range s {\n    fmt.Println(i, string(ch))\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-80db-a7e2-e755e99dcf97",
            "type": "bulleted_list",
            "richText": [
                [
                    "Iterates by Unicode code points (runes), not bytes."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80b1-a509-c7229a21c32c",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-8098-8d63-ee6a128dc46f",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Map"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80ef-88cb-e3392a6b6586",
            "type": "code",
            "richText": [
                [
                    "m := map[string]int{\"a\": 1, \"b\": 2}\nfor key, value := range m {\n    fmt.Println(key, value)\n}\n\n// Maps allow iteration over just keys too\nfor key := range m {\n\t\tfmt.Println(key)\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-80b4-9a5c-ed2a051e327d",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-8028-9735-f16d2eae854d",
            "type": "sub_sub_header",
            "richText": [
                [
                    "Channel (used with goroutines)"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-801d-a847-c97341ff1b12",
            "type": "code",
            "richText": [
                [
                    "ch := make(chan int)\ngo func() {\n    ch <- 1\n    ch <- 2\n    close(ch)\n}()\n\nfor v := range ch {\n    fmt.Println(v)\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-809d-8b97-d22e95bfd042",
            "type": "bulleted_list",
            "richText": [
                [
                    "Loops until channel is closed."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80e5-a1a2-df3d19558a92",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-803d-9620-d2aebf892c71",
            "type": "sub_header",
            "richText": [
                [
                    "break",
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
                    "continue",
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
                    "return",
                    [
                        [
                            "c"
                        ]
                    ]
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8033-8716-fa493118f3c8",
            "type": "bulleted_list",
            "richText": [
                [
                    "break",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ": exits loop"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80e3-93e4-da837a0b517d",
            "type": "bulleted_list",
            "richText": [
                [
                    "continue",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ": skips current iteration"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80d9-b9f3-f50a08c99ef3",
            "type": "bulleted_list",
            "richText": [
                [
                    "return",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    ": exits the function"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80d8-bb14-ec4648a5a711",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-8028-88a2-f651fae78ad3",
            "type": "sub_header",
            "richText": [
                [
                    "Loop Labels"
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-80f4-833b-cdc9fcbdcd10",
            "type": "text",
            "richText": [
                [
                    "Use labels to control nested loops."
                ]
            ]
        },
        {
            "id": "24224eb1-ed54-8017-b294-c647852d1534",
            "type": "code",
            "richText": [
                [
                    "outer: //label can be anything, not necessarily outer\nfor i := 0; i < 3; i++ {\n    for j := 0; j < 3; j++ {\n        if i == j {\n            break outer\n        }\n    }\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "24224eb1-ed54-8012-bd72-f50c2cde72ec",
            "type": "divider"
        },
        {
            "id": "24224eb1-ed54-801b-91d4-d50ab2a7d8f4",
            "type": "text"
        }
    ]
} as const satisfies GoNote;

export default note;
