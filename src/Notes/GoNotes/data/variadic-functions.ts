import type { GoNote } from '../types';

const note = {
    "notionId": "24a24eb1-ed54-8030-b2e0-e5685daa55e6",
    "slug": "variadic-functions",
    "title": "Variadic Functions",
    "updatedOn": "2026-10-05",
    "blocks": [
        {
            "id": "507f2a4c-0d76-5136-97ab-6d729df21546",
            "type": "bulleted_list",
            "richText": [
                [
                    "A variadic function accepts zero or more arguments for its last parameter."
                ]
            ]
        },
        {
            "id": "5a89b651-5df7-5d0d-a8f3-4e478edca031",
            "type": "bulleted_list",
            "richText": [
                [
                    "Write this parameter as "
                ],
                [
                    "...T",
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
            "id": "867598cd-5906-52f1-9d31-c6cb2c569f50",
            "type": "bulleted_list",
            "richText": [
                [
                    "Inside the function, the parameter is a slice of type "
                ],
                [
                    "[]T",
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
            "id": "6c467ad7-4654-5037-a37e-7c1c46e117ee",
            "type": "sub_header",
            "richText": [
                [
                    "Declaration and calls"
                ]
            ]
        },
        {
            "id": "0426c50f-0b95-5f3d-a23d-c7444f31bf09",
            "type": "code",
            "richText": [
                [
                    "func sum(nums ...int) int {\n    total := 0\n    for _, n := range nums {\n        total += n\n    }\n    return total\n}\n\nfunc sumExample() {\n    fmt.Println(sum(1, 2, 3)) // 6\n    fmt.Println(sum())        // 0\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "3b54d64b-c1c6-57a3-b8d3-f9d130634594",
            "type": "bulleted_list",
            "richText": [
                [
                    "Only one parameter can be variadic, and it must come last."
                ]
            ]
        },
        {
            "id": "86ed4a7c-a0a1-541c-920c-f944366f738c",
            "type": "bulleted_list",
            "richText": [
                [
                    "If you pass no arguments for it, the slice inside the function is "
                ],
                [
                    "nil",
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
            "id": "f4dc6048-6d62-5ff3-a470-882a1d78d029",
            "type": "sub_header",
            "richText": [
                [
                    "Passing an existing slice"
                ]
            ]
        },
        {
            "id": "53eb9c6f-ebde-5f17-857a-67f1f7bf8f3b",
            "type": "bulleted_list",
            "richText": [
                [
                    "Write "
                ],
                [
                    "...",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " after the slice argument."
                ]
            ]
        },
        {
            "id": "a7c6e939-1d8a-5294-a902-f2e12b8781e9",
            "type": "code",
            "richText": [
                [
                    "nums := []int{1, 2, 3}\nfmt.Println(sum(nums...)) // 6"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "bc57401a-252f-5ab7-9527-9de700118f1f",
            "type": "bulleted_list",
            "richText": [
                [
                    "Passing "
                ],
                [
                    "nums...",
                    [
                        [
                            "c"
                        ]
                    ]
                ],
                [
                    " does not copy the slice’s underlying array."
                ]
            ]
        },
        {
            "id": "52e5bd8d-a10f-5036-8a2f-a2d49fafaea4",
            "type": "bulleted_list",
            "richText": [
                [
                    "Changing an element inside the function can change that element for the caller too."
                ]
            ]
        },
        {
            "id": "d341bfa7-ee9f-5f18-8c5f-904916d21730",
            "type": "sub_header",
            "richText": [
                [
                    "Fixed and variadic parameters"
                ]
            ]
        },
        {
            "id": "25b305c2-620a-5757-a6d8-31767ace24e8",
            "type": "code",
            "richText": [
                [
                    "func greet(prefix string, names ...string) {\n    for _, n := range names {\n        fmt.Println(prefix, n)\n    }\n}\n\nfunc greetingExample() {\n    greet(\"Hello\", \"Alice\", \"Bob\")\n}"
                ]
            ],
            "language": "Go"
        },
        {
            "id": "127bca8c-e68b-55a6-99ba-089e1ec7cb89",
            "type": "text",
            "richText": [
                [
                    "Expected output:"
                ]
            ]
        },
        {
            "id": "5fcabe06-ecf3-575a-96f7-2e67adde74b1",
            "type": "code",
            "richText": [
                [
                    "Hello Alice\nHello Bob"
                ]
            ],
            "language": "Plain Text"
        },
        {
            "id": "a1156031-e1c2-538c-ab07-82e28f34fe87",
            "type": "text",
            "richText": [
                [
                    "Source: "
                ],
                [
                    "Passing arguments to variadic parameters",
                    [
                        [
                            "a",
                            "https://go.dev/ref/spec#Passing_arguments_to_..._parameters"
                        ]
                    ]
                ]
            ]
        }
    ]
} as const satisfies GoNote;

export default note;
